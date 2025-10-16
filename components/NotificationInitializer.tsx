"use client";

import { useEffect } from "react";
import { notificationService } from "@/lib/notification-service";

/**
 * Component responsible for initializing the notification service when the app starts.
 * This ensures all real-time farming notifications are active.
 */
export default function NotificationInitializer() {
  useEffect(() => {
    // Initialize the notification service when the component mounts
    // This starts all the periodic checks and real-time notifications
    notificationService.initialize();

    // Add some sample notifications for demo purposes (only if none exist)
    const addSampleNotifications = () => {
      const currentNotifications = notificationService.notificationStore.notifications;
      
      // Only add sample notifications if there are none
      if (currentNotifications.length === 0) {
        // Add a welcome notification
        notificationService.notifySystemUpdate(
          "Welcome to ZaraHarvest! Your notification center is now active. You'll receive updates about your farming activities here."
        );

        // Add a sample harvest prediction
        setTimeout(() => {
          notificationService.notificationStore.createHarvestPredictionNotification(
            "Maize",
            4.2
          );
        }, 2000);

        // Add a sample weather alert
        setTimeout(() => {
          notificationService.notificationStore.createWeatherAlertNotification(
            "Moderate rainfall expected in your area tomorrow. Consider adjusting your irrigation schedule."
          );
        }, 5000);

        // Add a sample market price update
        setTimeout(() => {
          notificationService.notificationStore.createMarketPriceNotification(
            "Maize",
            185.5,
            12.3
          );
        }, 8000);
      }
    };

    // Add sample notifications after a short delay
    const timer = setTimeout(addSampleNotifications, 1000);

    // Cleanup timer on unmount
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}
