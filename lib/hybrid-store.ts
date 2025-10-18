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

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
  readAt?: string;
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

  // Notifications
  notifications: Notification[];
  unreadNotificationCount: number;
  addNotification: (
    notification: Omit<Notification, "id" | "createdAt">
  ) => Promise<void>;
  markNotificationAsRead: (notificationId: string) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
  fetchNotifications: () => Promise<void>;

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

        // Trigger notification
        await get().addNotification({
          type: "yield_prediction",
          title: "📊 Yield Prediction Ready!",
          message: `Your ${prediction.cropType} yield prediction is ready. Predicted yield: ${prediction.predictedYield} tons with ${prediction.confidence}% confidence.`,
          read: false,
          actionUrl: "/prediction",
        });
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

        // Trigger notification
        await get().addNotification({
          type: "loan_approved",
          title: "💰 Loan Approved!",
          message: `Your loan request for $${loan.amount} has been approved and is now active.`,
          read: false,
          actionUrl: "/lending",
        });
      },
      updateLoanStatus: async (loanId, status) => {
        const loan = get().loans.find((l) => l.id === loanId);

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

        // Trigger notification for status changes
        if (loan && status === "completed") {
          await get().addNotification({
            type: "loan_due",
            title: "✅ Loan Completed!",
            message: `Congratulations! Your loan for $${loan.amount} has been successfully repaid.`,
            read: false,
            actionUrl: "/lending",
          });
        } else if (loan && status === "defaulted") {
          await get().addNotification({
            type: "loan_due",
            title: "⚠️ Loan Defaulted",
            message: `Your loan for $${loan.amount} has been marked as defaulted. Please contact support.`,
            read: false,
            actionUrl: "/lending",
          });
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

        // Trigger notification
        await get().addNotification({
          type: "badge_earned",
          title: "🏆 Badge Earned!",
          message: `Congratulations! You've earned the "${badge.name}" badge. ${badge.description}`,
          read: false,
          actionUrl: "/dashboard",
        });
      },

      // Notifications
      notifications: [],
      unreadNotificationCount: 0,
      addNotification: async (notification) => {
        const newNotification = {
          ...notification,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadNotificationCount: state.unreadNotificationCount + 1,
        }));

        // Save to database
        try {
          await fetch("/api/notifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              walletAddress: get().wallet.accountId,
              ...notification,
            }),
          });
        } catch (error) {
          console.error("Failed to save notification to database:", error);
        }
      },
      markNotificationAsRead: async (notificationId) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId
              ? { ...n, read: true, readAt: new Date().toISOString() }
              : n
          ),
          unreadNotificationCount: Math.max(
            0,
            state.unreadNotificationCount - 1
          ),
        }));

        try {
          await fetch(`/api/notifications/${notificationId}/read`, {
            method: "PUT",
          });
        } catch (error) {
          console.error("Failed to mark notification as read:", error);
        }
      },
      markAllNotificationsAsRead: async () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({
            ...n,
            read: true,
            readAt: new Date().toISOString(),
          })),
          unreadNotificationCount: 0,
        }));

        try {
          await fetch("/api/notifications/read-all", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ walletAddress: get().wallet.accountId }),
          });
        } catch (error) {
          console.error("Failed to mark all notifications as read:", error);
        }
      },
      fetchNotifications: async () => {
        if (!get().wallet.accountId) return;

        try {
          const response = await fetch(
            `/api/notifications?walletAddress=${
              get().wallet.accountId
            }&limit=50`
          );
          const data = await response.json();

          if (data.success) {
            set({
              notifications: data.notifications,
              unreadNotificationCount: data.unreadCount,
            });
          }
        } catch (error) {
          console.error("Failed to fetch notifications:", error);
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

          // Also fetch notifications
          await get().fetchNotifications();
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
        notifications: state.notifications,
        unreadNotificationCount: state.unreadNotificationCount,
        isDatabaseConnected: state.isDatabaseConnected,
      }),
    }
  )
);
