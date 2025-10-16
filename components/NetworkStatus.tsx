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
            className="flex items-center gap-1"
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
              className="h-6 px-2 text-xs"
            >
              {isLoading ? (
                <RefreshCw className="h-3 w-3 animate-spin" />
              ) : (
                <AlertCircle className="h-3 w-3" />
              )}
            </Button>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          {isSupportedNetwork
            ? `Connected to ${currentNetwork}`
            : "Please switch to Hedera Testnet for full functionality"}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
