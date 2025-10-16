"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Represents a connected wallet account.
 */
export interface WalletAccount {
  /**
   * The public address of the connected wallet account (e.g., EIP-55 compliant Ethereum address).
   */
  address: string;
  /**
   * A unique identifier for the account, often the same as the address for EVM chains.
   */
  accountId: string;
  /**
   * The current balance of the account, typically in a human-readable format (e.g., Ether, HBAR).
   * It is optional as it might not be fetched or available immediately.
   */
  balance?: string;
}

/**
 * Defines the structure of the wallet's global state managed by the Zustand store.
 */
export interface WalletState {
  /**
   * The currently connected wallet account, or null if no account is connected.
   */
  account: WalletAccount | null;
  /**
   * Indicates whether a wallet is currently connected.
   */
  isConnected: boolean;
  /**
   * Indicates whether a connection attempt is in progress.
   */
  isConnecting: boolean;
  /**
   * Stores any error message that occurred during wallet operations.
   */
  error: string | null;
  /**
   * Connects a wallet by setting the provided account information and updating connection status.
   * @param account The WalletAccount object representing the connected account.
   */
  connect: (account: WalletAccount) => void;
  /**
   * Disconnects the wallet, clearing account information and resetting connection status.
   */
  disconnect: () => void;
  /**
   * Sets the `isConnecting` flag to indicate an ongoing connection attempt.
   * @param connecting True if connecting, false otherwise.
   */
  setConnecting: (connecting: boolean) => void;
  /**
   * Sets an error message in the store.
   * @param error The error message string, or null to clear any existing error.
   */
  setError: (error: string | null) => void;
}

/**
 * A Zustand store for managing the global state of the wallet connection.
 * It provides a centralized place to track connection status, current account, and errors,
 * with persistence middleware to store essential data across sessions.
 */
export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      account: null,
      isConnected: false,
      isConnecting: false,
      error: null,

      connect: (account: WalletAccount) => {
        set({
          account,
          isConnected: true,
          isConnecting: false,
          error: null,
        });
      },

      disconnect: () => {
        set({
          account: null,
          isConnected: false,
          isConnecting: false,
          error: null,
        });
      },

      setConnecting: (connecting: boolean) => {
        set({ isConnecting: connecting });
      },

      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      // Unique name for the storage item in localStorage.
      name: "wallet-storage",
      // Specifies which parts of the state should be persisted across sessions.
      // In this case, only `account` and `isConnected` are stored to maintain session state.
      partialize: (state) => ({
        account: state.account,
        isConnected: state.isConnected,
      }),
    }
  )
);

/**
 * A singleton utility class for interacting with Web3 wallets (e.g., MetaMask).
 * It encapsulates common wallet operations like connecting, getting account info,
 * managing network switches, and automatic reconnection.
 */
export class WalletProvider {
  /**
   * The single instance of the WalletProvider class, enforcing the singleton pattern.
   * @private
   */
  private static instance: WalletProvider;

  /**
   * Event listeners for wallet events
   * @private
   */
  private eventListeners: (() => void)[] = [];

  /**
   * Flag to track if the provider has been initialized
   * @private
   */
  private initialized = false;

  /**
   * Returns the singleton instance of WalletProvider.
   * If an instance does not already exist, it creates one.
   * @returns The singleton WalletProvider instance.
   */
  static getInstance(): WalletProvider {
    if (!WalletProvider.instance) {
      WalletProvider.instance = new WalletProvider();
    }
    return WalletProvider.instance;
  }

  /**
   * Initializes the wallet provider with event listeners for automatic reconnection
   * This should be called once when the app starts
   */
  initialize() {
    if (this.initialized || typeof window === "undefined") {
      return;
    }

    this.initialized = true;
    this.setupEventListeners();
    this.attemptAutoReconnection();
  }

  /**
   * Sets up event listeners for wallet state changes
   * @private
   */
  private setupEventListeners() {
    if (typeof window === "undefined" || !window.ethereum) {
      return;
    }

    // Listen for account changes (user switches accounts in wallet)
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected wallet
        useWalletStore.getState().disconnect();
      } else {
        // User switched accounts, update with new account
        this.handleAccountSwitch(accounts[0]);
      }
    };

    // Listen for network changes
    const handleChainChanged = (chainId: string) => {
      console.log("Network changed to:", chainId);
      this.handleNetworkChange(chainId);
    };

    // Listen for wallet connection/disconnection
    const handleConnect = (connectInfo: { chainId: string }) => {
      console.log("Wallet connected:", connectInfo);
    };

    const handleDisconnect = (error: any) => {
      console.log("Wallet disconnected:", error);
      useWalletStore.getState().disconnect();
    };

    // Add event listeners
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);
    window.ethereum.on("connect", handleConnect);
    window.ethereum.on("disconnect", handleDisconnect);

    // Store cleanup functions
    this.eventListeners = [
      () =>
        window.ethereum?.removeListener(
          "accountsChanged",
          handleAccountsChanged
        ),
      () => window.ethereum?.removeListener("chainChanged", handleChainChanged),
      () => window.ethereum?.removeListener("connect", handleConnect),
      () => window.ethereum?.removeListener("disconnect", handleDisconnect),
    ];
  }

  /**
   * Attempts to automatically reconnect to a previously connected wallet
   * @private
   */
  private async attemptAutoReconnection() {
    const { isConnected, account } = useWalletStore.getState();

    // Only attempt reconnection if we have a stored connection
    if (!isConnected || !account || !window.ethereum) {
      return;
    }

    try {
      // Check if the wallet is still connected and accessible
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length === 0) {
        // Wallet is no longer connected, clear our state
        useWalletStore.getState().disconnect();
        return;
      }

      // Check if the current account is still the same
      const currentAccount = accounts[0];
      if (currentAccount.toLowerCase() !== account.address.toLowerCase()) {
        // Account changed, update our state
        await this.handleAccountSwitch(currentAccount);
        return;
      }

      // Verify the account is still accessible by getting updated info
      const updatedAccount = await this.getAccountInfo(currentAccount);
      useWalletStore.getState().connect(updatedAccount);

      console.log("Wallet automatically reconnected");
    } catch (error) {
      console.warn("Failed to auto-reconnect wallet:", error);
      // Clear the connection state if auto-reconnection fails
      useWalletStore.getState().disconnect();
    }
  }

  /**
   * Handles account switching when user changes accounts in their wallet
   * @private
   */
  private async handleAccountSwitch(newAddress: string) {
    try {
      const updatedAccount = await this.getAccountInfo(newAddress);
      useWalletStore.getState().connect(updatedAccount);
      console.log("Account switched to:", newAddress);
    } catch (error) {
      console.error("Failed to handle account switch:", error);
      useWalletStore.getState().disconnect();
    }
  }

  /**
   * Handles network changes when user switches networks in their wallet
   * @private
   */
  private handleNetworkChange(chainId: string) {
    const { isConnected } = useWalletStore.getState();

    if (!isConnected) {
      return;
    }

    // Define supported networks (you can customize these)
    const supportedNetworks = {
      "0x128": "Hedera Testnet", // 296 in decimal
      "0x1": "Ethereum Mainnet", // 1 in decimal
      "0x89": "Polygon Mainnet", // 137 in decimal
    };

    const networkName =
      supportedNetworks[chainId as keyof typeof supportedNetworks];

    if (networkName) {
      console.log(`Switched to supported network: ${networkName}`);
      // Optionally show a toast notification
      // toast.success(`Connected to ${networkName}`);
    } else {
      console.warn(`Switched to unsupported network: ${chainId}`);
      // Optionally show a warning and suggest switching to a supported network
      // toast.warning("Please switch to a supported network (Hedera Testnet recommended)");
    }
  }

  /**
   * Cleans up event listeners when the provider is destroyed
   */
  destroy() {
    this.eventListeners.forEach((cleanup) => cleanup());
    this.eventListeners = [];
    this.initialized = false;
  }

  /**
   * Initiates a connection request to the user's Web3 wallet.
   * This method requests account access and fetches the primary account's balance.
   *
   * @returns A Promise that resolves with the connected `WalletAccount` information.
   * @throws {Error} If no Web3 wallet is found or if the connection fails (e.g., user rejects connection).
   */
  async connectWallet(): Promise<WalletAccount> {
    // Ensure the code is running in a browser environment and a Web3 provider (like MetaMask) is available.
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error(
        "No Web3 wallet found. Please install MetaMask or another Web3 wallet."
      );
    }

    try {
      // Request account access from the Web3 provider.
      // This will prompt the user to connect their wallet.
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found. Please unlock your wallet.");
      }

      const address = accounts[0]; // Take the first connected account as the primary one.

      // Attempt to get the balance for the connected account.
      // This is an optional step and failure should not prevent connection.
      let balance = "0";
      try {
        const balanceHex = await window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"], // 'latest' refers to the most recent block
        });
        // Convert hexadecimal balance to a human-readable format (e.g., Wei to Ether/HBAR).
        balance = (parseInt(balanceHex, 16) / Math.pow(10, 18)).toFixed(4);
      } catch (error) {
        console.warn("Could not fetch balance:", error);
        // Balance will remain "0" or default, as defined.
      }

      const account: WalletAccount = {
        address,
        accountId: address, // For compatibility, using address as accountId for EVM chains.
        balance,
      };

      return account;
    } catch (error: any) {
      // Re-throw with a more descriptive error message if available, otherwise a generic one.
      throw new Error(error.message || "Failed to connect wallet");
    }
  }

  /**
   * Fetches the account information for a given Ethereum address.
   * Specifically, it retrieves the balance.
   *
   * @param address The Ethereum-style address of the account to query.
   * @returns A Promise that resolves with the `WalletAccount` information including balance.
   * @throws {Error} If no Web3 wallet is found.
   */
  async getAccountInfo(address: string): Promise<WalletAccount> {
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("No Web3 wallet found");
    }

    // Attempt to get the balance for the specified account.
    let balance = "0";
    try {
      const balanceHex = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      // Convert hexadecimal balance to a human-readable format.
      balance = (parseInt(balanceHex, 16) / Math.pow(10, 18)).toFixed(4);
    } catch (error) {
      console.warn("Could not fetch balance:", error);
    }

    return {
      address,
      accountId: address, // For compatibility, using address as accountId.
      balance,
    };
  }

  /**
   * Checks if the current network is supported by the application
   * @returns The network name if supported, null otherwise
   */
  async getCurrentNetwork(): Promise<string | null> {
    if (typeof window === "undefined" || !window.ethereum) {
      return null;
    }

    try {
      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      const supportedNetworks = {
        "0x128": "Hedera Testnet",
        "0x1": "Ethereum Mainnet",
        "0x89": "Polygon Mainnet",
      };

      return (
        supportedNetworks[chainId as keyof typeof supportedNetworks] || null
      );
    } catch (error) {
      console.error("Failed to get current network:", error);
      return null;
    }
  }

  /**
   * Requests the user's wallet to switch to a specified Ethereum chain ID.
   * If the chain is not recognized by the wallet, it attempts to add the Hedera Testnet.
   *
   * @param chainId The hexadecimal chain ID of the network to switch to (e.g., "0x128" for Hedera Testnet).
   * @throws {Error} If no Web3 wallet is found or if switching/adding the network fails.
   */
  async switchNetwork(chainId: string) {
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("No Web3 wallet found");
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
    } catch (error: any) {
      // Error code 4902 indicates that the chain has not been added to MetaMask.
      if (error.code === 4902) {
        await this.addNetwork(); // Attempt to add the predefined Hedera Testnet.
      } else {
        throw error; // Re-throw other types of errors.
      }
    }
  }

  /**
   * Switches to the recommended network (Hedera Testnet) for the application
   */
  async switchToRecommendedNetwork() {
    await this.switchNetwork("0x128"); // Hedera Testnet
  }

  /**
   * Prompts the user's Web3 wallet to add a predefined network (currently Hedera Testnet).
   * This is typically called when `switchNetwork` fails because the target chain is unknown.
   *
   * @throws {Error} If no Web3 wallet is found or if adding the network fails.
   */
  private async addNetwork() {
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("No Web3 wallet found");
    }

    // Parameters for adding the Hedera Testnet to the wallet using `wallet_addEthereumChain` RPC method.
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x128", // Hedera Testnet chain ID (296 in decimal)
          chainName: "Hedera Testnet",
          nativeCurrency: {
            name: "HBAR",
            symbol: "HBAR",
            decimals: 18, // Standard for many EVM-compatible tokens (e.g., Ether, HBAR)
          },
          rpcUrls: ["https://testnet.hashio.io/api"],
          blockExplorerUrls: ["https://hashscan.io/testnet"],
        },
      ],
    });
  }
}

/**
 * The globally accessible singleton instance of the WalletProvider.
 * This ensures that all parts of the application use the same instance
 * for interacting with the Web3 wallet without re-initialization.
 */
export const walletProvider = WalletProvider.getInstance();
