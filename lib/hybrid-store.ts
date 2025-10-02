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
  addFarmData: (data: Omit<FarmData, "id" | "timestamp">) => Promise<void>;

  // Yield Predictions
  yieldPredictions: YieldPrediction[];
  addYieldPrediction: (
    prediction: Omit<YieldPrediction, "timestamp">
  ) => Promise<void>;

  // Loans
  loans: Loan[];
  addLoan: (loan: Omit<Loan, "id">) => Promise<void>;
  updateLoanStatus: (loanId: string, status: Loan["status"]) => Promise<void>;

  // Harvest Tokens
  harvestTokens: HarvestToken[];
  addHarvestToken: (
    token: Omit<HarvestToken, "id" | "qrCode">
  ) => Promise<void>;
  updateTokenStatus: (
    tokenId: string,
    status: HarvestToken["status"]
  ) => Promise<void>;

  // Badges
  badges: Badge[];
  earnBadge: (badgeId: string) => Promise<void>;

  // Offline
  isOnline: boolean;
  setOnlineStatus: (status: boolean) => void;

  // Database sync
  syncWithDatabase: () => Promise<void>;
  isDatabaseConnected: boolean;
}

export const useHybridStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Wallet
      wallet: {
        accountId: null,
        isConnected: false,
        connect: async (accountId: string) => {
          set((state) => ({
            wallet: { ...state.wallet, accountId, isConnected: true },
          }));

          // Initialize user in database
          try {
            await fetch("/api/user/initialize", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ walletAddress: accountId }),
            });
            await get().syncWithDatabase();
          } catch (error) {
            console.error("Failed to sync with database:", error);
          }
        },
        disconnect: () =>
          set((state) => ({
            wallet: { ...state.wallet, accountId: null, isConnected: false },
          })),
      },

      // Farm Data
      farmData: [],
      addFarmData: async (data) => {
        const newData = {
          ...data,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        };

        set((state) => ({
          farmData: [...state.farmData, newData],
        }));

        // Save to database
        try {
          await fetch("/api/farm-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
        } catch (error) {
          console.error("Failed to save farm data to database:", error);
        }
      },

      // Yield Predictions
      yieldPredictions: [],
      addYieldPrediction: async (prediction) => {
        const newPrediction = {
          ...prediction,
          timestamp: new Date(),
        };

        set((state) => ({
          yieldPredictions: [...state.yieldPredictions, newPrediction],
        }));

        // Save to database
        try {
          await fetch("/api/yield-predictions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(prediction),
          });
        } catch (error) {
          console.error("Failed to save yield prediction to database:", error);
        }
      },

      // Loans
      loans: [],
      addLoan: async (loan) => {
        const newLoan = {
          ...loan,
          id: crypto.randomUUID(),
        };

        set((state) => ({
          loans: [...state.loans, newLoan],
        }));

        // Save to database
        try {
          await fetch("/api/loans", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loan),
          });
        } catch (error) {
          console.error("Failed to save loan to database:", error);
        }
      },
      updateLoanStatus: async (loanId, status) => {
        set((state) => ({
          loans: state.loans.map((loan) =>
            loan.id === loanId ? { ...loan, status } : loan
          ),
        }));

        // Update in database
        try {
          // Database update would go here
        } catch (error) {
          console.error("Failed to update loan status in database:", error);
        }
      },

      // Harvest Tokens
      harvestTokens: [],
      addHarvestToken: async (token) => {
        const newToken = {
          ...token,
          id: crypto.randomUUID(),
          qrCode: `https://agriyield.app/token/${crypto.randomUUID()}`,
        };

        set((state) => ({
          harvestTokens: [...state.harvestTokens, newToken],
        }));

        // Save to database
        try {
          await fetch("/api/harvest-tokens", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(token),
          });
        } catch (error) {
          console.error("Failed to save harvest token to database:", error);
        }
      },
      updateTokenStatus: async (tokenId, status) => {
        set((state) => ({
          harvestTokens: state.harvestTokens.map((token) =>
            token.id === tokenId ? { ...token, status } : token
          ),
        }));

        // Update in database
        try {
          // Database update would go here
        } catch (error) {
          console.error("Failed to update token status in database:", error);
        }
      },

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
      earnBadge: async (badgeId) => {
        const badge = get().badges.find((b) => b.id === badgeId);
        if (!badge) return;

        set((state) => ({
          badges: state.badges.map((badge) =>
            badge.id === badgeId
              ? { ...badge, earned: true, earnedDate: new Date() }
              : badge
          ),
        }));

        // Save to database
        try {
          await fetch("/api/badges", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              badgeId,
              name: badge.name,
              description: badge.description,
            }),
          });
        } catch (error) {
          console.error("Failed to save badge to database:", error);
        }
      },

      // Offline
      isOnline: true,
      setOnlineStatus: (status) => set({ isOnline: status }),

      // Database sync
      isDatabaseConnected: false,
      syncWithDatabase: async () => {
        try {
          const response = await fetch("/api/user/data");
          const userData = await response.json();
          set({
            farmData: userData.farmData,
            yieldPredictions: userData.yieldPredictions,
            loans: userData.loans,
            harvestTokens: userData.harvestTokens,
            badges: userData.badges,
            isDatabaseConnected: true,
          });
        } catch (error) {
          console.error("Failed to sync with database:", error);
          set({ isDatabaseConnected: false });
        }
      },
    }),
    {
      name: "agriyield-hybrid-storage",
      partialize: (state) => ({
        wallet: state.wallet,
        farmData: state.farmData,
        yieldPredictions: state.yieldPredictions,
        loans: state.loans,
        harvestTokens: state.harvestTokens,
        badges: state.badges,
        isDatabaseConnected: state.isDatabaseConnected,
      }),
    }
  )
);
