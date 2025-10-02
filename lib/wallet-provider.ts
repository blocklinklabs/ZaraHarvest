"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WalletAccount {
  address: string;
  accountId: string;
  balance?: string;
}

export interface WalletState {
  account: WalletAccount | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  connect: (account: WalletAccount) => void;
  disconnect: () => void;
  setConnecting: (connecting: boolean) => void;
  setError: (error: string | null) => void;
}

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
      name: "wallet-storage",
      partialize: (state) => ({
        account: state.account,
        isConnected: state.isConnected,
      }),
    }
  )
);

// Web3 wallet connection utilities
export class WalletProvider {
  private static instance: WalletProvider;

  static getInstance(): WalletProvider {
    if (!WalletProvider.instance) {
      WalletProvider.instance = new WalletProvider();
    }
    return WalletProvider.instance;
  }

  async connectWallet(): Promise<WalletAccount> {
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error(
        "No Web3 wallet found. Please install MetaMask or another Web3 wallet."
      );
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found. Please unlock your wallet.");
      }

      const address = accounts[0];

      // Get balance
      let balance = "0";
      try {
        const balanceHex = await window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        });
        balance = (parseInt(balanceHex, 16) / Math.pow(10, 18)).toFixed(4);
      } catch (error) {
        console.warn("Could not fetch balance:", error);
      }

      const account: WalletAccount = {
        address,
        accountId: address, // Using address as accountId for compatibility
        balance,
      };

      return account;
    } catch (error: any) {
      throw new Error(error.message || "Failed to connect wallet");
    }
  }

  async getAccountInfo(address: string): Promise<WalletAccount> {
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("No Web3 wallet found");
    }

    let balance = "0";
    try {
      const balanceHex = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      balance = (parseInt(balanceHex, 16) / Math.pow(10, 18)).toFixed(4);
    } catch (error) {
      console.warn("Could not fetch balance:", error);
    }

    return {
      address,
      accountId: address,
      balance,
    };
  }

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
      // If the chain doesn't exist, add it
      if (error.code === 4902) {
        await this.addNetwork();
      } else {
        throw error;
      }
    }
  }

  private async addNetwork() {
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("No Web3 wallet found");
    }

    // Add Hedera Testnet
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x128", // 296 in hex
          chainName: "Hedera Testnet",
          nativeCurrency: {
            name: "HBAR",
            symbol: "HBAR",
            decimals: 18,
          },
          rpcUrls: ["https://testnet.hashio.io/api"],
          blockExplorerUrls: ["https://hashscan.io/testnet"],
        },
      ],
    });
  }
}

// Export singleton instance
export const walletProvider = WalletProvider.getInstance();
