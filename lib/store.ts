import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Wallet
      wallet: {
        accountId: null,
        isConnected: false,
        connect: (accountId: string) =>
          set((state) => ({
            wallet: { ...state.wallet, accountId, isConnected: true },
          })),
        disconnect: () =>
          set((state) => ({
            wallet: { ...state.wallet, accountId: null, isConnected: false },
          })),
      },

      // Farm Data
      farmData: [],
      addFarmData: (data) =>
        set((state) => ({
          farmData: [
            ...state.farmData,
            {
              ...data,
              id: crypto.randomUUID(),
              timestamp: new Date(),
            },
          ],
        })),

      // Yield Predictions
      yieldPredictions: [],
      addYieldPrediction: (prediction) =>
        set((state) => ({
          yieldPredictions: [
            ...state.yieldPredictions,
            {
              ...prediction,
              timestamp: new Date(),
            },
          ],
        })),

      // Loans
      loans: [],
      addLoan: (loan) =>
        set((state) => ({
          loans: [
            ...state.loans,
            {
              ...loan,
              id: crypto.randomUUID(),
            },
          ],
        })),
      updateLoanStatus: (loanId, status) =>
        set((state) => ({
          loans: state.loans.map((loan) =>
            loan.id === loanId ? { ...loan, status } : loan
          ),
        })),

      // Harvest Tokens
      harvestTokens: [],
      addHarvestToken: (token) =>
        set((state) => ({
          harvestTokens: [
            ...state.harvestTokens,
            {
              ...token,
              id: crypto.randomUUID(),
              qrCode: `https://agriyield.app/token/${crypto.randomUUID()}`,
            },
          ],
        })),
      updateTokenStatus: (tokenId, status) =>
        set((state) => ({
          harvestTokens: state.harvestTokens.map((token) =>
            token.id === tokenId ? { ...token, status } : token
          ),
        })),

      // Badges
      badges: [
        {
          id: "data-contributor",
          name: "Data Contributor",
          description: "Submit 3+ farm data entries",
          earned: false,
        },
        {
          id: "yield-predictor",
          name: "Yield Predictor",
          description: "Get your first yield prediction",
          earned: false,
        },
        {
          id: "token-holder",
          name: "Token Holder",
          description: "Tokenize your first harvest",
          earned: false,
        },
        {
          id: "loan-borrower",
          name: "Loan Borrower",
          description: "Take your first loan",
          earned: false,
        },
      ],
      earnBadge: (badgeId) =>
        set((state) => ({
          badges: state.badges.map((badge) =>
            badge.id === badgeId
              ? { ...badge, earned: true, earnedDate: new Date() }
              : badge
          ),
        })),

      // Offline
      isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
      setOnlineStatus: (status) => set({ isOnline: status }),
    }),
    {
      name: "agriyield-storage",
      partialize: (state) => ({
        wallet: state.wallet,
        farmData: state.farmData,
        yieldPredictions: state.yieldPredictions,
        loans: state.loans,
        harvestTokens: state.harvestTokens,
        badges: state.badges,
      }),
    }
  )
);
