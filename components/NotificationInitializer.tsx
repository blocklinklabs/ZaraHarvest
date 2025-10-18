"use client";

import { useEffect } from "react";
import { useWalletStore } from "@/lib/wallet-provider";

export default function NotificationInitializer() {
  const { account } = useWalletStore();

  useEffect(() => {
    // Request notification permission when user connects wallet
    if (account && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
          console.log("Notification permission:", permission);
        });
      }
    }
  }, [account]);

  // This component doesn't render anything, it just initializes notifications
  return null;
}
