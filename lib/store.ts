import { create } from "zustand";
import { persist } from "zustand/middleware";
import { safeDate } from "./utils";

// Re-export the hybrid store as the main store
export { useHybridStore as useAppStore } from "./hybrid-store";

export interface WalletState {
  accountId: string | null;
  isConnected: boolean;
  connect: (accountId: string) => void;
  disconnect: () => void;
}

export interface FarmData {
  id: string;
  cropType: string;
  location: string;
  soilMoisture: number;
  weatherNotes: string;
  photo?: string;
  timestamp: Date;
}

export interface YieldPrediction {
  cropType: string;
  predictedYield: number;
  riskLevel: number;
  confidence: number;
  timestamp: Date;
}

export interface Loan {
  id: string;
  amount: number;
  interestRate: number;
  status: "active" | "pending" | "completed";
  collateral: string[];
  startDate: Date;
  endDate: Date;
}

export interface HarvestToken {
  id: string;
  cropType: string;
  amount: number;
  tokenizedAmount: number;
  status: "pending" | "tokenized" | "sold";
  qrCode: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  earnedDate?: Date;
}

export interface AppState {
  // Wallet
  wallet: WalletState;

  // Farm Data
  farmData: FarmData[];
  addFarmData: (data: Omit<FarmData, "id" | "timestamp">) => void;

  // Yield Predictions
  yieldPredictions: YieldPrediction[];
  addYieldPrediction: (prediction: Omit<YieldPrediction, "timestamp">) => void;

  // Loans
  loans: Loan[];
  addLoan: (loan: Omit<Loan, "id">) => void;
  updateLoanStatus: (loanId: string, status: Loan["status"]) => void;

  // Harvest Tokens
  harvestTokens: HarvestToken[];
  addHarvestToken: (token: Omit<HarvestToken, "id" | "qrCode">) => void;
  updateTokenStatus: (tokenId: string, status: HarvestToken["status"]) => void;

  // Badges
  badges: Badge[];
  earnBadge: (badgeId: string) => void;

  // Offline
  isOnline: boolean;
  setOnlineStatus: (status: boolean) => void;
}

// The useAppStore is now exported from hybrid-store.ts
