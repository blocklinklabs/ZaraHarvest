"use client";

import { useEffect } from "react";
import { walletProvider } from "@/lib/wallet-provider";

/**
 * Component responsible for initializing the wallet provider when the app starts.
 * This ensures automatic reconnection and proper event handling.
 */
export default function WalletInitializer() {
  useEffect(() => {
    // Initialize the wallet provider when the component mounts
    // This sets up event listeners and attempts auto-reconnection
    walletProvider.initialize();

    // Cleanup when component unmounts (though this shouldn't happen often in a SPA)
    return () => {
      walletProvider.destroy();
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}






