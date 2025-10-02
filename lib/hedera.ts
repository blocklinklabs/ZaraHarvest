// Web3 wallet integration for AgriYield
// Supports MetaMask, WalletConnect, and other Web3 providers

export interface HederaAccount {
  accountId: string;
  publicKey: string;
  balance: number;
  address: string;
}

export class HederaWallet {
  private static instance: HederaWallet;
  private account: HederaAccount | null = null;

  static getInstance(): HederaWallet {
    if (!HederaWallet.instance) {
      HederaWallet.instance = new HederaWallet();
    }
    return HederaWallet.instance;
  }

  async connect(): Promise<HederaAccount> {
    // Check if Web3 is available
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error(
        "No Web3 provider found. Please install MetaMask or another Web3 wallet."
      );
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const address = accounts[0];

      // Get account balance
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });

      // Convert balance from wei to ETH
      const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18);

      const account: HederaAccount = {
        accountId: address,
        publicKey: address, // Using address as public key for simplicity
        balance: balanceInEth,
        address: address,
      };

      this.account = account;
      return account;
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw new Error("Failed to connect wallet. Please try again.");
    }
  }

  async disconnect(): Promise<void> {
    this.account = null;
  }

  getAccount(): HederaAccount | null {
    return this.account;
  }

  async getBalance(): Promise<number> {
    if (!this.account) throw new Error("Not connected");

    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [this.account.address, "latest"],
      });

      return parseInt(balance, 16) / Math.pow(10, 18);
    } catch (error) {
      console.error("Failed to get balance:", error);
      return this.account.balance;
    }
  }

  async transferHBAR(to: string, amount: number): Promise<string> {
    if (!this.account) throw new Error("Not connected");

    try {
      // Convert amount to wei
      const amountInWei = (amount * Math.pow(10, 18)).toString(16);

      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: this.account.address,
            to: to,
            value: `0x${amountInWei}`,
          },
        ],
      });

      return txHash;
    } catch (error) {
      console.error("Failed to transfer:", error);
      throw new Error("Transaction failed");
    }
  }

  async createToken(
    name: string,
    symbol: string,
    decimals: number
  ): Promise<string> {
    if (!this.account) throw new Error("Not connected");

    // For now, return a mock token ID
    // In production, this would deploy an ERC-20 token contract
    return new Promise((resolve) => {
      setTimeout(() => {
        const tokenId = `0x${Math.random().toString(16).substring(2, 42)}`;
        resolve(tokenId);
      }, 3000);
    });
  }

  async mintToken(tokenId: string, amount: number): Promise<string> {
    if (!this.account) throw new Error("Not connected");

    // Mock token minting - in production this would call the token contract
    return new Promise((resolve) => {
      setTimeout(() => {
        const txId = `0x${Math.random().toString(16).substring(2, 66)}`;
        resolve(txId);
      }, 2000);
    });
  }

  // Check if wallet is connected
  async isConnected(): Promise<boolean> {
    if (typeof window === "undefined" || !window.ethereum) {
      return false;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      return accounts.length > 0;
    } catch (error) {
      return false;
    }
  }

  // Listen for account changes
  onAccountsChanged(callback: (accounts: string[]) => void) {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", callback);
    }
  }

  // Listen for network changes
  onChainChanged(callback: (chainId: string) => void) {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("chainChanged", callback);
    }
  }
}

export const hederaWallet = HederaWallet.getInstance();
