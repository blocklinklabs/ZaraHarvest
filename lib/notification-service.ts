import { useNotificationStore } from "./notification-store";

/**
 * Notification service that handles real-time farming event notifications
 */
export class NotificationService {
  private static instance: NotificationService;
  private notificationStore: ReturnType<typeof useNotificationStore.getState>;

  private constructor() {
    this.notificationStore = useNotificationStore.getState();
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  /**
   * Initialize notification service with permission request
   */
  async initialize() {
    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }

    // Start periodic checks for farming events
    this.startPeriodicChecks();

    // Disable automatic weather and market alerts for now to prevent spam
    console.log("Weather and market alerts disabled to prevent notification spam");
    
    // Uncomment below to enable automatic alerts (currently disabled)
    /*
    // Set up weather alerts
    this.setupWeatherAlerts();

    // Set up market price monitoring
    this.setupMarketMonitoring();
    */
  }

  /**
   * Start periodic checks for farming events
   */
  private startPeriodicChecks() {
    // Disable automatic periodic notifications for now to prevent spam
    // In production, these would be more controlled and based on real events
    console.log("Periodic notification checks disabled to prevent spam");
    
    // Uncomment below to enable periodic checks (currently disabled)
    /*
    // Check every hour for various farming events
    setInterval(() => {
      this.checkHarvestPredictions();
      this.checkLoanStatus();
      this.checkYieldAchievements();
    }, 60 * 60 * 1000); // 1 hour

    // Check every 6 hours for reminders
    setInterval(() => {
      this.checkReminders();
    }, 6 * 60 * 60 * 1000); // 6 hours
    */
  }

  /**
   * Check for new harvest predictions
   */
  private async checkHarvestPredictions() {
    try {
      // Simulate checking for new predictions
      // In a real app, this would call your AI prediction service
      const hasNewPredictions = Math.random() > 0.8; // 20% chance

      if (hasNewPredictions) {
        const crops = ["Maize", "Wheat", "Rice", "Soybeans"];
        const crop = crops[Math.floor(Math.random() * crops.length)];
        const predictedYield = Math.round((Math.random() * 3 + 2) * 10) / 10; // 2-5 tons

        this.notificationStore.createHarvestPredictionNotification(
          crop,
          predictedYield
        );
      }
    } catch (error) {
      console.error("Error checking harvest predictions:", error);
    }
  }

  /**
   * Check loan status and due dates
   */
  private async checkLoanStatus() {
    try {
      // Simulate loan status checks
      // In a real app, this would check your loan contracts
      const hasNewLoanApproval = Math.random() > 0.9; // 10% chance
      const hasLoanDue = Math.random() > 0.85; // 15% chance

      if (hasNewLoanApproval) {
        const amount = Math.floor(Math.random() * 5000) + 1000; // $1000-$6000
        this.notificationStore.createLoanApprovalNotification(amount);
      }

      if (hasLoanDue) {
        const amount = Math.floor(Math.random() * 3000) + 500; // $500-$3500
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 7)); // Due in 0-7 days
        this.notificationStore.createLoanDueNotification(
          amount,
          dueDate.toLocaleDateString()
        );
      }
    } catch (error) {
      console.error("Error checking loan status:", error);
    }
  }

  /**
   * Check for yield achievements
   */
  private async checkYieldAchievements() {
    try {
      // Simulate yield achievement checks
      const hasYieldAchievement = Math.random() > 0.95; // 5% chance

      if (hasYieldAchievement) {
        const crops = ["Maize", "Wheat", "Rice"];
        const crop = crops[Math.floor(Math.random() * crops.length)];
        const achievedYield = Math.round((Math.random() * 2 + 3) * 10) / 10; // 3-5 tons

        this.notificationStore.addNotification({
          type: "yield_achieved",
          priority: "medium",
          title: "Yield Target Achieved!",
          message: `Congratulations! You've achieved ${achievedYield} tons per acre for ${crop}, exceeding your target by 15%.`,
          icon: "🎯",
          actionUrl: "/dashboard",
          actionText: "View Performance",
        });
      }
    } catch (error) {
      console.error("Error checking yield achievements:", error);
    }
  }

  /**
   * Set up weather alerts
   */
  private setupWeatherAlerts() {
    // Check weather every 4 hours
    setInterval(async () => {
      try {
        const hasWeatherAlert = Math.random() > 0.9; // 10% chance

        if (hasWeatherAlert) {
          const alerts = [
            "Heavy rainfall expected in your area over the next 48 hours. Consider delaying harvest activities.",
            "Drought conditions predicted for the next week. Ensure proper irrigation planning.",
            "High winds expected tomorrow. Secure any loose equipment and structures.",
            "Frost warning for tonight. Cover sensitive crops if possible.",
            "Heat wave expected for the next 3 days. Monitor soil moisture levels.",
          ];

          const alert = alerts[Math.floor(Math.random() * alerts.length)];
          this.notificationStore.createWeatherAlertNotification(alert);
        }
      } catch (error) {
        console.error("Error checking weather alerts:", error);
      }
    }, 4 * 60 * 60 * 1000); // 4 hours
  }

  /**
   * Set up market price monitoring
   */
  private setupMarketMonitoring() {
    // Check market prices every 8 hours
    setInterval(async () => {
      try {
        const hasPriceChange = Math.random() > 0.8; // 20% chance

        if (hasPriceChange) {
          const crops = ["Maize", "Wheat", "Rice", "Soybeans"];
          const crop = crops[Math.floor(Math.random() * crops.length)];
          const basePrice = Math.random() * 200 + 100; // $100-$300 per ton
          const changePercent = (Math.random() - 0.5) * 20; // ±10% change
          const newPrice = basePrice * (1 + changePercent / 100);
          const change = newPrice - basePrice;

          this.notificationStore.createMarketPriceNotification(
            crop,
            newPrice,
            change
          );
        }
      } catch (error) {
        console.error("Error checking market prices:", error);
      }
    }, 8 * 60 * 60 * 1000); // 8 hours
  }

  /**
   * Check for reminders
   */
  private async checkReminders() {
    try {
      const hasReminder = Math.random() > 0.7; // 30% chance

      if (hasReminder) {
        const reminders = [
          {
            title: "Soil Testing Due",
            message:
              "It's time for your quarterly soil testing. Book an appointment with your local agricultural extension office.",
          },
          {
            title: "Equipment Maintenance",
            message:
              "Schedule maintenance for your farming equipment to ensure optimal performance during harvest season.",
          },
          {
            title: "Insurance Renewal",
            message:
              "Your crop insurance policy expires next month. Consider renewing to protect your investment.",
          },
          {
            title: "Seed Order Reminder",
            message:
              "Order seeds for the next planting season to ensure availability and get early bird discounts.",
          },
          {
            title: "Record Keeping",
            message:
              "Update your farm records with recent activities and expenses for better financial tracking.",
          },
        ];

        const reminder =
          reminders[Math.floor(Math.random() * reminders.length)];
        this.notificationStore.createReminderNotification(
          reminder.title,
          reminder.message
        );
      }
    } catch (error) {
      console.error("Error checking reminders:", error);
    }
  }

  /**
   * Create a notification when farm data is submitted
   */
  notifyDataSubmitted(cropType: string, location: string) {
    this.notificationStore.addNotification({
      type: "data_submitted",
      priority: "low",
      title: "Farm Data Submitted",
      message: `Your ${cropType} data from ${location} has been successfully submitted and is being processed.`,
      icon: "📊",
      actionUrl: "/my-submissions",
      actionText: "View Submission",
    });
  }

  /**
   * Create a notification when a reward is earned
   */
  notifyRewardEarned(amount: number, reason: string) {
    this.notificationStore.createRewardNotification(amount, reason);
  }

  /**
   * Create a system update notification
   */
  notifySystemUpdate(message: string) {
    this.notificationStore.addNotification({
      type: "system_update",
      priority: "low",
      title: "System Update",
      message,
      icon: "🔧",
      actionUrl: "/dashboard",
      actionText: "Learn More",
    });
  }
}

// Export singleton instance
export const notificationService = NotificationService.getInstance();
