"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NotificationItem, NotificationSettings } from "@/types/notifications";

interface NotificationState {
  // Notifications
  notifications: NotificationItem[];
  unreadCount: number;

  // Settings
  settings: NotificationSettings;

  // Actions
  addNotification: (
    notification: Omit<NotificationItem, "id" | "timestamp" | "read">
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;

  // Settings actions
  updateSettings: (settings: Partial<NotificationSettings>) => void;

  // Real-time notifications
  createHarvestPredictionNotification: (
    cropType: string,
    predictedYield: number
  ) => void;
  createWeatherAlertNotification: (alert: string) => void;
  createLoanApprovalNotification: (amount: number) => void;
  createLoanDueNotification: (amount: number, dueDate: string) => void;
  createMarketPriceNotification: (
    cropType: string,
    price: number,
    change: number
  ) => void;
  createRewardNotification: (amount: number, reason: string) => void;
  createReminderNotification: (title: string, message: string) => void;
}

const defaultSettings: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  harvestAlerts: true,
  weatherAlerts: true,
  loanAlerts: true,
  marketAlerts: true,
  reminderAlerts: true,
};

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      settings: defaultSettings,

      addNotification: (notificationData) => {
        const newNotification: NotificationItem = {
          ...notificationData,
          id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date(),
          read: false,
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        }));

        // Show browser notification if enabled
        if (get().settings.pushNotifications && "Notification" in window) {
          if (Notification.permission === "granted") {
            new Notification(newNotification.title, {
              body: newNotification.message,
              icon: "/favicon.ico",
              tag: newNotification.id,
            });
          }
        }
      },

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((notif) =>
            notif.id === id ? { ...notif, read: true } : notif
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        }));
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notif) => ({
            ...notif,
            read: true,
          })),
          unreadCount: 0,
        }));
      },

      deleteNotification: (id) => {
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          return {
            notifications: state.notifications.filter(
              (notif) => notif.id !== id
            ),
            unreadCount:
              notification && !notification.read
                ? state.unreadCount - 1
                : state.unreadCount,
          };
        });
      },

      clearAllNotifications: () => {
        set({
          notifications: [],
          unreadCount: 0,
        });
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      // Real-time notification creators
      createHarvestPredictionNotification: (cropType, predictedYield) => {
        get().addNotification({
          type: "harvest_prediction",
          priority: "high",
          title: "New Harvest Prediction Available",
          message: `Your ${cropType} crop is predicted to yield ${predictedYield} tons per acre this season. View detailed analysis.`,
          actionUrl: "/prediction",
          actionText: "View Prediction",
          icon: "🌾",
        });
      },

      createWeatherAlertNotification: (alert) => {
        get().addNotification({
          type: "weather_alert",
          priority: "urgent",
          title: "Weather Alert",
          message: alert,
          actionUrl: "/dashboard",
          actionText: "View Details",
          icon: "🌦️",
        });
      },

      createLoanApprovalNotification: (amount) => {
        get().addNotification({
          type: "loan_approved",
          priority: "high",
          title: "Loan Application Approved",
          message: `Your loan application for $${amount.toLocaleString()} has been approved! Funds will be available within 24 hours.`,
          actionUrl: "/lending",
          actionText: "View Loan Details",
          icon: "💰",
        });
      },

      createLoanDueNotification: (amount, dueDate) => {
        get().addNotification({
          type: "loan_due",
          priority: "urgent",
          title: "Loan Payment Due",
          message: `Your loan payment of $${amount.toLocaleString()} is due on ${dueDate}. Click to make payment.`,
          actionUrl: "/lending",
          actionText: "Make Payment",
          icon: "⏰",
        });
      },

      createMarketPriceNotification: (cropType, price, change) => {
        const changeText =
          change > 0
            ? `increased by $${change.toFixed(2)}`
            : `decreased by $${Math.abs(change).toFixed(2)}`;
        get().addNotification({
          type: "market_price",
          priority: "medium",
          title: "Market Price Update",
          message: `${cropType} prices have ${changeText} per ton. Current price: $${price.toFixed(
            2
          )}`,
          actionUrl: "/dashboard",
          actionText: "View Market Data",
          icon: "📈",
        });
      },

      createRewardNotification: (amount, reason) => {
        get().addNotification({
          type: "reward_earned",
          priority: "medium",
          title: "Reward Earned",
          message: `You earned $${amount.toFixed(
            2
          )} for ${reason}. Check your rewards dashboard.`,
          actionUrl: "/dashboard",
          actionText: "View Rewards",
          icon: "🏆",
        });
      },

      createReminderNotification: (title, message) => {
        get().addNotification({
          type: "reminder",
          priority: "low",
          title,
          message,
          icon: "⏰",
        });
      },
    }),
    {
      name: "notification-storage",
      partialize: (state) => ({
        notifications: state.notifications.slice(0, 50), // Keep only last 50 notifications
        settings: state.settings,
      }),
    }
  )
);

// Helper function to request notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};
