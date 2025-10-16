export type NotificationType =
  | "harvest_prediction"
  | "weather_alert"
  | "loan_approved"
  | "loan_due"
  | "data_submitted"
  | "yield_achieved"
  | "market_price"
  | "system_update"
  | "reward_earned"
  | "reminder";

export type NotificationPriority = "low" | "medium" | "high" | "urgent";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  icon?: string;
  data?: Record<string, any>;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  harvestAlerts: boolean;
  weatherAlerts: boolean;
  loanAlerts: boolean;
  marketAlerts: boolean;
  reminderAlerts: boolean;
}

// Notification templates for different types
export const notificationTemplates = {
  harvest_prediction: {
    title: "New Harvest Prediction Available",
    icon: "🌾",
    priority: "high" as NotificationPriority,
  },
  weather_alert: {
    title: "Weather Alert",
    icon: "🌦️",
    priority: "urgent" as NotificationPriority,
  },
  loan_approved: {
    title: "Loan Application Approved",
    icon: "💰",
    priority: "high" as NotificationPriority,
  },
  loan_due: {
    title: "Loan Payment Due",
    icon: "⏰",
    priority: "urgent" as NotificationPriority,
  },
  data_submitted: {
    title: "Farm Data Submitted",
    icon: "📊",
    priority: "low" as NotificationPriority,
  },
  yield_achieved: {
    title: "Yield Target Achieved",
    icon: "🎯",
    priority: "medium" as NotificationPriority,
  },
  market_price: {
    title: "Market Price Update",
    icon: "📈",
    priority: "medium" as NotificationPriority,
  },
  system_update: {
    title: "System Update",
    icon: "🔧",
    priority: "low" as NotificationPriority,
  },
  reward_earned: {
    title: "Reward Earned",
    icon: "🏆",
    priority: "medium" as NotificationPriority,
  },
  reminder: {
    title: "Reminder",
    icon: "⏰",
    priority: "low" as NotificationPriority,
  },
};
