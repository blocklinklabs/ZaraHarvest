"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useWalletStore, walletProvider } from "@/lib/wallet-provider";

import { AlertCircle, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function NetworkStatus() {
  const { isConnected } = useWalletStore();
  const [currentNetwork, setCurrentNetwork] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Monitors wallet connection status and triggers a network check when connected.
   */
  useEffect(() => {
    if (isConnected) {
      checkNetwork();
    }
  }, [isConnected]);

  /**
   * Asynchronously checks the current network the wallet is connected to and updates state.
   * Handles potential errors by logging and setting the network to null.
   */
  const checkNetwork = async () => {
    try {
      const network = await walletProvider.getCurrentNetwork();
      setCurrentNetwork(network);
    } catch (error) {
      console.error("Failed to check network:", error);
      setCurrentNetwork(null);
    }
  };

  /**
   * Handles the network switching process, attempting to switch to the recommended network (Hedera Testnet).
   * Provides user feedback via toasts for success or failure and manages loading state.
   */
  const handleSwitchNetwork = async () => {
    setIsLoading(true);
    try {
      await walletProvider.switchToRecommendedNetwork();
      await checkNetwork(); // Re-check network after switching
      toast.success("Network switched to Hedera Testnet");
    } catch (error: any) {
      toast.error("Failed to switch network", {
        description: error.message || "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // If the wallet is not connected, this component does not render any UI.
  if (!isConnected) {
    return null;
  }

  const isSupportedNetwork = currentNetwork !== null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2">
          <Badge
            variant={isSupportedNetwork ? "default" : "destructive"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-xs shadow-sm ${
              isSupportedNetwork
                ? "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                : "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
            }`}
          >
            {isSupportedNetwork ? (
              <Wifi className="h-3 w-3" />
            ) : (
              <WifiOff className="h-3 w-3" />
            )}
            <span className="text-xs">
              {currentNetwork || "Unsupported Network"}
            </span>
          </Badge>

          {!isSupportedNetwork && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleSwitchNetwork}
              disabled={isLoading}
              className="h-8 px-3 text-xs font-semibold bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-950/50 hover:border-red-300 dark:hover:border-red-700 rounded-xl transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-sm hover:shadow-md"
            >
              {isLoading ? (
                <RefreshCw className="h-3 w-3 animate-spin mr-1" />
              ) : (
                <AlertCircle className="h-3 w-3 mr-1" />
              )}
              Switch
            </Button>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl rounded-xl p-3">
        <p className="font-medium text-gray-900 dark:text-white">
          {isSupportedNetwork
            ? `Connected to ${currentNetwork}`
            : "Please switch to Hedera Testnet for full functionality"}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
