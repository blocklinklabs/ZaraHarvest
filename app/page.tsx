"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppStore } from "@/lib/store";
import { useHybridStore } from "@/lib/hybrid-store";
import { hederaWallet } from "@/lib/hedera";
import {
  Wallet,
  Leaf,
  TrendingUp,
  Shield,
  Globe,
  Info,
  ArrowRight,
  CheckCircle,
  Users,
  BarChart3,
  Upload,
  DollarSign,
  Clock,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const store = useAppStore();

  // Check if store is properly initialized
  if (!store || typeof store !== "object") {
    console.error("Store is not properly initialized:", store);
  }

  const wallet = store?.wallet || {
    accountId: null,
    isConnected: false,
    connect: async (accountId: string) => {
      console.log("Fallback wallet connect called with:", accountId);
      // This is a fallback - the real store should handle this
    },
    disconnect: () => {
      console.log("Fallback wallet disconnect called");
    },
  };
  const isOnline = store?.isOnline || true;

  // Debug logging
  console.log("Store:", store);
  console.log("Wallet from store:", wallet);
  console.log("Store keys:", Object.keys(store));
  console.log("Store wallet:", store.wallet);
  console.log("Store wallet type:", typeof store.wallet);
  console.log(
    "Store wallet keys:",
    store.wallet ? Object.keys(store.wallet) : "store.wallet is null/undefined"
  );
  console.log(
    "Wallet keys:",
    wallet ? Object.keys(wallet) : "wallet is null/undefined"
  );
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasWeb3, setHasWeb3] = useState(false);
  const [storeReady, setStoreReady] = useState(false);

  // Check for Web3 availability
  useEffect(() => {
    setHasWeb3(typeof window !== "undefined" && !!window.ethereum);
  }, []);

  // Check if store is ready
  useEffect(() => {
    console.log("useEffect triggered with store:", store);
    console.log("Store type:", typeof store);
    console.log(
      "Store keys:",
      store ? Object.keys(store) : "store is null/undefined"
    );

    if (store && store.wallet && typeof store.wallet.connect === "function") {
      setStoreReady(true);
      console.log("Store is ready with proper wallet object");
    } else {
      console.log("Store not ready yet:", store);
      console.log("Store wallet:", store?.wallet);
      console.log("Store wallet type:", typeof store?.wallet);
      console.log("Store wallet connect:", store?.wallet?.connect);
      setStoreReady(false);
    }
  }, [store]);

  const handleConnectWallet = async () => {
    if (!storeReady) {
      setError("Store is not ready yet. Please wait a moment and try again.");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      console.log("Starting wallet connection...");
      console.log("Wallet object:", wallet);
      console.log("Wallet type:", typeof wallet);
      console.log("Store ready:", storeReady);

      if (!wallet) {
        throw new Error("Wallet object is not available");
      }

      if (typeof wallet.connect !== "function") {
        console.error(
          "wallet.connect is not a function. Wallet object:",
          wallet
        );
        throw new Error(
          "wallet.connect is not a function. Please check the store implementation."
        );
      }

      const account = await hederaWallet.connect();
      console.log("Hedera account:", account);

      wallet.connect(account.accountId);
      console.log("Wallet connected successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setError(
        error instanceof Error ? error.message : "Failed to connect wallet"
      );
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDemoMode = async () => {
    if (!storeReady) {
      setError("Store is not ready yet. Please wait a moment and try again.");
      return;
    }

    // Use a demo wallet address for demo mode
    console.log("Demo mode - wallet object:", wallet);
    console.log("Demo mode - wallet.connect:", wallet.connect);
    wallet.connect("0x1234567890123456789012345678901234567890");
    router.push("/dashboard");
  };

  if (wallet.isConnected) {
    return (
      <TooltipProvider>
        <div className="fixed inset-0 bg-background z-50 overflow-auto">
          <div className="min-h-screen w-full">
            <div className="max-w-6xl mx-auto px-4 py-8">
              <div className="space-y-8">
                {/* Welcome Section */}
                <div className="text-center">
                  <div className="flex items-center justify-center mb-6">
                    <Leaf className="h-12 w-12 text-primary mr-4" />
                    <div>
                      <h1 className="text-4xl font-bold text-foreground mb-2">
                        Welcome to AgriYield
                      </h1>
                      <p className="text-lg text-muted-foreground">
                        Your agricultural dashboard is ready
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  <Card
                    className=" hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => router.push("/dashboard")}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                        <BarChart3 className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">Dashboard</h3>
                      <p className="text-sm text-muted-foreground">
                        View your farm overview and analytics
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className=" hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => router.push("/submit-data")}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                        <Upload className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        Submit Data
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Share farm information and earn rewards
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className=" hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => router.push("/prediction")}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        Predictions
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        AI-powered yield forecasts
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className=" hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => router.push("/lending")}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                        <DollarSign className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">Lending</h3>
                      <p className="text-sm text-muted-foreground">
                        Access DeFi loans with your harvest
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className=" hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => router.push("/tracker")}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                        <Clock className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">Tracker</h3>
                      <p className="text-sm text-muted-foreground">
                        Track your harvest from farm to market
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className=" hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => router.push("/dashboard")}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">Security</h3>
                      <p className="text-sm text-muted-foreground">
                        Blockchain-powered transparency
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="fixed inset-0 bg-background z-50 overflow-auto">
        <div className="min-h-screen w-full">
          <div className="max-w-6xl mx-auto text-center px-4 py-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-8">
                <Leaf className="h-16 w-16 text-primary mr-4" />
                <div>
                  <h1 className="text-5xl font-bold text-foreground mb-2">
                    AgriYield
                  </h1>
                  <p className="text-lg text-primary font-medium">
                    AI-Powered Yield Prediction for African Farmers
                  </p>
                </div>
              </div>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Predict your crop yields, get loans, and track your harvest on
                blockchain. Empowering African smallholder farmers with AI and
                decentralized financing.
              </p>

              <div className="flex items-center justify-center gap-6 mb-12">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No fees to start</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Earn rewards</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Mobile-friendly</span>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-2">
                      500+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Active Farmers
                    </div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-2">
                      $2.5M
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Loans Disbursed
                    </div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-2">
                      95%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Prediction Accuracy
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full">
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    AI Yield Prediction
                  </h3>
                  <p className="text-muted-foreground">
                    Get accurate crop yield predictions using AI and satellite
                    data to optimize your farming decisions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    DeFi Lending
                  </h3>
                  <p className="text-muted-foreground">
                    Access loans using your future harvest as collateral on
                    blockchain with competitive rates.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    Supply Chain Tracking
                  </h3>
                  <p className="text-muted-foreground">
                    Track your harvest from farm to market with blockchain
                    transparency and QR code verification.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Testimonial Section */}
            <div className="mb-16">
              <Card className="w-full">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      What Farmers Are Saying
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <blockquote className="text-muted-foreground italic mb-4">
                        "AgriYield helped me predict my maize yield with 95%
                        accuracy. The loan I got using my harvest as collateral
                        was a game-changer for my farm."
                      </blockquote>
                      <div className="text-sm font-medium text-foreground">
                        Kwame Asante
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Maize Farmer, Kumasi
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-8 w-8 text-primary" />
                      </div>
                      <blockquote className="text-muted-foreground italic mb-4">
                        "The blockchain tracking gives me confidence that my
                        cocoa reaches buyers safely. I can see every step of the
                        journey."
                      </blockquote>
                      <div className="text-sm font-medium text-foreground">
                        Ama Osei
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Cocoa Farmer, Takoradi
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <Card className="w-full max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-primary mr-3" />
                    <h2 className="text-2xl font-bold text-foreground">
                      Join the Agricultural Revolution
                    </h2>
                  </div>

                  <p className="text-muted-foreground mb-8">
                    Connect your Web3 wallet (MetaMask, WalletConnect, etc.) to
                    start earning rewards, getting predictions, and accessing
                    DeFi loans.
                  </p>

                  <Button
                    size="lg"
                    className="btn-primary text-xl px-12 py-6 hover-glow"
                    onClick={handleConnectWallet}
                    disabled={isConnecting || !storeReady}
                  >
                    {isConnecting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Connecting to Hedera...
                      </>
                    ) : (
                      <>
                        <Wallet className="mr-3 h-6 w-6" />
                        Connect Wallet
                        <ArrowRight className="ml-3 h-5 w-5" />
                      </>
                    )}
                  </Button>

                  {!storeReady && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <p className="text-blue-600 dark:text-blue-400 text-sm">
                        Initializing store... Please wait a moment.
                      </p>
                    </div>
                  )}

                  {!hasWeb3 && storeReady && (
                    <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                        No Web3 wallet detected. Please install MetaMask or
                        another Web3 wallet to continue.
                      </p>
                      <p className="text-yellow-500 dark:text-yellow-500 text-xs mt-2">
                        <a
                          href="https://metamask.io"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Install MetaMask
                        </a>{" "}
                        or use another Web3-compatible wallet.
                      </p>
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDemoMode}
                          className="text-yellow-600 border-yellow-300 hover:bg-yellow-100 dark:text-yellow-400 dark:border-yellow-700 dark:hover:bg-yellow-900/20"
                        >
                          Try Demo Mode
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            console.log("Debug - wallet:", wallet);
                            console.log("Debug - store:", store);
                            console.log(
                              "Debug - wallet.connect:",
                              wallet?.connect
                            );
                          }}
                          className="mt-2"
                        >
                          Debug Wallet
                        </Button>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-red-600 dark:text-red-400 text-sm">
                        {error}
                      </p>
                      <p className="text-red-500 dark:text-red-500 text-xs mt-2">
                        Make sure you have MetaMask or another Web3 wallet
                        installed and unlocked.
                      </p>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Supports MetaMask, WalletConnect, and other Web3
                            wallets
                          </p>
                        </TooltipContent>
                      </Tooltip>
                      <span>Web3 Compatible</span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Secure & Decentralized</span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-blue-500" />
                      <span>Built for African Farmers</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Footer Section */}
            <div className="mt-16 pt-8 border-t border-border">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-primary mr-2" />
                  <span className="text-lg font-semibold text-foreground">
                    AgriYield
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Empowering African farmers with AI-powered yield prediction
                  and blockchain technology
                </p>
                <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                  <span>© 2024 AgriYield</span>
                  <Separator orientation="vertical" className="h-3" />
                  <span>Built with ❤️ for African Farmers</span>
                  <Separator orientation="vertical" className="h-3" />
                  <span>Powered by Hedera Hashgraph</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
