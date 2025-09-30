// Mock Hedera SDK integration for MVP
// In production, this would use the actual @hashgraph/sdk

export interface HederaAccount {
  accountId: string;
  publicKey: string;
  balance: number;
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
    // Mock connection - in production this would connect to HashPack or other wallet
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockAccount: HederaAccount = {
          accountId: `0.0.${Math.floor(Math.random() * 1000000)}`,
          publicKey: `302a300506032b6570032100${Math.random()
            .toString(16)
            .substring(2, 66)}`,
          balance: Math.random() * 1000 + 100, // 100-1100 HBAR
        };
        this.account = mockAccount;
        resolve(mockAccount);
      }, 1000);
    });
  }

  async disconnect(): Promise<void> {
    this.account = null;
  }

  getAccount(): HederaAccount | null {
    return this.account;
  }

  async getBalance(): Promise<number> {
    if (!this.account) throw new Error("Not connected");
    return this.account.balance;
  }

  async transferHBAR(to: string, amount: number): Promise<string> {
    if (!this.account) throw new Error("Not connected");

    // Mock transaction - in production this would create actual HBAR transfer
    return new Promise((resolve) => {
      setTimeout(() => {
        const txId = `0.0.${Math.floor(Math.random() * 1000000)}@${Date.now()}`;
        resolve(txId);
      }, 2000);
    });
  }

  async createToken(
    name: string,
    symbol: string,
    decimals: number
  ): Promise<string> {
    if (!this.account) throw new Error("Not connected");

    // Mock token creation - in production this would create HTS token
    return new Promise((resolve) => {
      setTimeout(() => {
        const tokenId = `0.0.${Math.floor(Math.random() * 1000000)}`;
        resolve(tokenId);
      }, 3000);
    });
  }

  async mintToken(tokenId: string, amount: number): Promise<string> {
    if (!this.account) throw new Error("Not connected");

    // Mock token minting
    return new Promise((resolve) => {
      setTimeout(() => {
        const txId = `0.0.${Math.floor(Math.random() * 1000000)}@${Date.now()}`;
        resolve(txId);
      }, 2000);
    });
  }
}

export const hederaWallet = HederaWallet.getInstance();
