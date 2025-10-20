"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ethers } from "ethers";
import { AlertTriangle, CheckCircle, Copy } from "lucide-react";
import { toast } from "sonner";

export default function NetworkSetup() {
  const [networkStatus, setNetworkStatus] = useState<{
    connected: boolean;
    chainId?: string;
    balance?: string;
    address?: string;
    error?: string;
  }>({ connected: false });

  const checkNetwork = async () => {
    try {
      if (!window.ethereum) {
        setNetworkStatus({ connected: false, error: "MetaMask not installed" });
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);

      setNetworkStatus({
        connected: true,
        chainId: network.chainId.toString(),
        balance: ethers.formatEther(balance),
        address,
      });
    } catch (error: any) {
      setNetworkStatus({ connected: false, error: error.message });
    }
  };

  const addHederaTestnet = async () => {
    try {
      await window.ethereum?.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x128", // 296 in hex (Hedera Testnet)
            chainName: "Hedera Testnet",
            nativeCurrency: {
              name: "HBAR",
              symbol: "HBAR",
              decimals: 18,
            },
            rpcUrls: ["https://testnet.hashio.io/api"],
            blockExplorerUrls: ["https://hashscan.io/testnet"],
          },
        ],
      });
      toast.success("Hedera Testnet network added to MetaMask!");
      checkNetwork();
    } catch (error: any) {
      toast.error("Failed to add network: " + error.message);
    }
  };

  const switchToHedera = async () => {
    try {
      await window.ethereum?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x128" }], // 296 in hex (Hedera Testnet)
      });
      toast.success("Switched to Hedera Testnet network!");
      checkNetwork();
    } catch (error: any) {
      if (error.code === 4902) {
        // Network not added yet
        addHederaTestnet();
      } else {
        toast.error("Failed to switch network: " + error.message);
      }
    }
  };

  const copyTestAccount = () => {
    // This should be your actual Hedera Testnet account private key
    const message =
      "Please use your own Hedera Testnet account private key. You can get testnet HBAR from the Hedera faucet.";
    navigator.clipboard.writeText(message);
    toast.success("Instructions copied to clipboard!");
  };

  useEffect(() => {
    checkNetwork();
  }, []);

  const isCorrectNetwork = networkStatus.chainId === "296"; // Hedera Testnet
  const hasBalance = parseFloat(networkStatus.balance || "0") > 0;

  return (
    <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden mb-8">
      <CardHeader className="p-8 pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-900 dark:text-white">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              isCorrectNetwork && hasBalance
                ? "bg-green-100 dark:bg-green-950/50"
                : "bg-yellow-100 dark:bg-yellow-950/50"
            }`}
          >
            {isCorrectNetwork && hasBalance ? (
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            )}
          </div>
          Blockchain Network Setup
        </CardTitle>
        <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
          Configure MetaMask for Hedera Testnet
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0 space-y-6">
        {networkStatus.error && (
          <Alert className="border-red-200/50 dark:border-red-800/50 bg-gradient-to-br from-red-50/80 to-pink-50/80 dark:from-red-950/30 dark:to-pink-950/30 backdrop-blur-sm rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-950/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <AlertDescription className="text-red-800 dark:text-red-300 font-medium leading-relaxed">
                {networkStatus.error}
              </AlertDescription>
            </div>
          </Alert>
        )}

        {networkStatus.connected && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                </div>
                <span className="text-base font-semibold text-gray-900 dark:text-white">
                  Network
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Chain ID
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-black text-gray-900 dark:text-white">
                    {networkStatus.chainId}
                  </p>
                  {isCorrectNetwork ? (
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-green-600 dark:bg-green-400"></div>
                </div>
                <span className="text-base font-semibold text-gray-900 dark:text-white">
                  Balance
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  HBAR
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-black text-gray-900 dark:text-white">
                    {parseFloat(networkStatus.balance || "0").toFixed(8)}
                  </p>
                  {hasBalance ? (
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {!isCorrectNetwork && (
            <div className="p-6 bg-gradient-to-br from-yellow-50/80 to-orange-50/80 dark:from-yellow-950/30 dark:to-orange-950/30 backdrop-blur-sm rounded-2xl border border-yellow-200/50 dark:border-yellow-800/50">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 rounded-xl bg-yellow-100 dark:bg-yellow-950/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Network Configuration Required
                  </h4>
                  <p className="text-base text-gray-700 dark:text-gray-300 font-medium mb-4">
                    You need to connect to Hedera Testnet (Chain ID: 296) to use
                    blockchain features.
                  </p>
                  <Button
                    onClick={switchToHedera}
                    className="bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white shadow-xl shadow-yellow-600/30 dark:shadow-yellow-600/20 rounded-2xl px-6 py-3 font-semibold text-base transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                  >
                    Add/Switch to Hedera Testnet
                  </Button>
                </div>
              </div>
            </div>
          )}

          {isCorrectNetwork && !hasBalance && (
            <div className="p-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Insufficient HBAR Balance
                  </h4>
                  <p className="text-base text-gray-700 dark:text-gray-300 font-medium mb-4">
                    You need HBAR to pay for transactions. Get testnet HBAR from
                    the Hedera faucet.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() =>
                        window.open(
                          "https://portal.hedera.com/faucet",
                          "_blank"
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 dark:shadow-blue-600/20 rounded-2xl px-6 py-3 font-semibold text-base transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                    >
                      Get Testnet HBAR
                    </Button>
                    <Button
                      onClick={copyTestAccount}
                      className="h-12 px-6 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                      variant="outline"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Instructions
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-3">
                    Use the Hedera faucet to get testnet HBAR for free
                  </p>
                </div>
              </div>
            </div>
          )}

          {isCorrectNetwork && hasBalance && (
            <div className="p-6 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-2xl border border-green-200/50 dark:border-green-800/50">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Ready for Blockchain Transactions!
                  </h4>
                  <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
                    You're connected to Hedera Testnet with sufficient HBAR. All
                    blockchain features are now available.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={checkNetwork}
            className="h-12 px-6 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
            variant="outline"
          >
            Refresh Status
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
