"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from "lucide-react";

export default function OfflineIndicator() {
  const { isOnline, setOnlineStatus } = useAppStore();
  const [showIndicator, setShowIndicator] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleOnline = () => {
      setOnlineStatus(true);
      setShowIndicator(true);
      setTimeout(() => setShowIndicator(false), 3000);
    };

    const handleOffline = () => {
      setOnlineStatus(false);
      setShowIndicator(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Set initial status
    setOnlineStatus(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [setOnlineStatus, isClient]);

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
