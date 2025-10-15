"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from "lucide-react";

/**
 * `OfflineIndicator` is a client-side component that displays a badge
 * indicating the application's online or offline status.
 * It listens to `online` and `offline` browser events and updates a global store.
 * An 'Online' indicator briefly appears for 3 seconds when connectivity is restored.
 */
export default function OfflineIndicator() {
  // Access global online status and setter from the Zustand store.
  const { isOnline, setOnlineStatus } = useAppStore();
  // Local state to control the visibility of the online/offline indicator.
  const [showIndicator, setShowIndicator] = useState(false);
  // Local state to ensure effects run only after client-side hydration.
  const [isClient, setIsClient] = useState(false);

  /**
   * Effect to mark the component as having mounted on the client side.
   * This prevents server-side rendering issues with browser-specific APIs.
   */
  useEffect(() => {
    setIsClient(true);
  }, []);

  /**
   * Effect to manage online/offline event listeners and update global status.
   * This effect only runs once the component is confirmed to be on the client.
   */
  useEffect(() => {
    // Ensure this effect only runs on the client to avoid SSR issues.
    if (!isClient) return;

    /**
     * Handler for the 'online' event. Updates status to online
     * and briefly shows the indicator before hiding it after 3 seconds.
     */
    const handleOnline = () => {
      setOnlineStatus(true);
      setShowIndicator(true);
      // Hide the indicator after a brief period to confirm online status.
      setTimeout(() => setShowIndicator(false), 3000);
    };

    /**
     * Handler for the 'offline' event. Updates status to offline
     * and displays the indicator.
     */
    const handleOffline = () => {
      setOnlineStatus(false);
      setShowIndicator(true);
    };

    // Add event listeners for online/offline status changes.
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Set initial online status based on the browser's current state.
    setOnlineStatus(navigator.onLine);

    /**
     * Cleanup function: Removes event listeners when the component unmounts
     * to prevent memory leaks.
     */
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [setOnlineStatus, isClient]);

  // Do not render the indicator if not on the client, or if online and not meant to be shown.
  if (!isClient || (!showIndicator && isOnline)) {
    return null;
  }

  return ( 
    <div className="fixed top-4 right-4 z-50">
      <Badge
        variant={isOnline ? "default" : "destructive"}
        className="flex items-center gap-2 px-3 py-2"
      >
        {isOnline ? (
          <>
            <Wifi className="h-4 w-4" />
            Online
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" />
            Offline
          </>
        )}
      </Badge>
    </div>
  );
}
