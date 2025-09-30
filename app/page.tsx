"use client";

import { useState } from "react";
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
import { hederaWallet } from "@/lib/hedera";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Wallet,
  Leaf,
  TrendingUp,
  Shield,
  Globe,
  Info,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Users,
  BarChart3,
  DollarSign,
  Upload,
  Clock,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { wallet, isOnline } = useAppStore();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      const account = await hederaWallet.connect();
      wallet.connect(account.accountId);
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  if (wallet.isConnected) {
    return (
      <TooltipProvider>
        <div className="space-y-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Leaf className="h-12 w-12 text-primary mr-4" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Welcome to AgriYield
                </h1>
                <p className="text-lg text-muted-foreground">
                  Your agricultural dashboard is ready
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <Card
              className="dashboard-card hover-lift cursor-pointer"
              onClick={() => router.push("/dashboard")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  <BarChart3
                    className="h-8 w-8 text-primary"
                    style={{ color: "#10b981" }}
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2">Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  View your farm overview and analytics
                </p>
              </CardContent>
            </Card>

            <Card
              className="dashboard-card hover-lift cursor-pointer"
              onClick={() => router.push("/submit-data")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  <Upload
                    className="h-8 w-8 text-primary"
                    style={{ color: "#10b981" }}
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2">Submit Data</h3>
                <p className="text-sm text-muted-foreground">
                  Share farm information and earn rewards
                </p>
              </CardContent>
            </Card>

            <Card
              className="dashboard-card hover-lift cursor-pointer"
              onClick={() => router.push("/prediction")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  <TrendingUp
                    className="h-8 w-8 text-primary"
                    style={{ color: "#10b981" }}
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2">Predictions</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered yield forecasts
                </p>
              </CardContent>
            </Card>

            <Card
              className="dashboard-card hover-lift cursor-pointer"
              onClick={() => router.push("/lending")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  <DollarSign
                    className="h-8 w-8 text-primary"
                    style={{ color: "#10b981" }}
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2">Lending</h3>
                <p className="text-sm text-muted-foreground">
                  Access DeFi loans with your harvest
                </p>
              </CardContent>
            </Card>

            <Card
              className="dashboard-card hover-lift cursor-pointer"
              onClick={() => router.push("/tracker")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  <Clock
                    className="h-8 w-8 text-primary"
                    style={{ color: "#10b981" }}
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2">Tracker</h3>
                <p className="text-sm text-muted-foreground">
                  Track your harvest from farm to market
                </p>
              </CardContent>
            </Card>

            <Card
              className="dashboard-card hover-lift cursor-pointer"
              onClick={() => router.push("/dashboard")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  <Shield
                    className="h-8 w-8 text-primary"
                    style={{ color: "#10b981" }}
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2">Security</h3>
                <p className="text-sm text-muted-foreground">
                  Blockchain-powered transparency
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center justify-center mb-8">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <Leaf className="h-20 w-20 text-primary mr-6" />
              </motion.div>
              <div>
                <h1 className="text-6xl font-bold text-foreground mb-3">
                  AgriYield
                </h1>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  <span className="text-lg text-primary font-medium">
                    Grow Wealth on Blockchain
                  </span>
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Predict your crop yields, get loans, and track your harvest on
              blockchain. Empowering African smallholder farmers with AI-powered
              yield prediction and decentralized financing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-center justify-center gap-6 mb-12"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No fees to start</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Earn HBAR rewards</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Mobile-friendly</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <Card className="dashboard-card hover-lift">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  <TrendingUp
                    className="h-10 w-10 text-primary"
                    style={{ color: "#10b981" }}
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  AI Yield Prediction
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get accurate crop yield predictions using AI and satellite
                  data to optimize your farming decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="dashboard-card hover-lift">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  <Shield
                    className="h-10 w-10 text-primary"
                    style={{ color: "#10b981" }}
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  DeFi Lending
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Access loans using your future harvest as collateral on Hedera
                  blockchain with competitive rates.
                </p>
              </CardContent>
            </Card>

            <Card className="dashboard-card hover-lift">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  <Globe
                    className="h-10 w-10 text-primary"
                    style={{ color: "#10b981" }}
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  Supply Chain Tracking
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track your harvest from farm to market with blockchain
                  transparency and QR code verification.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-center"
          >
            <Card className="max-w-2xl mx-auto dashboard-card">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-primary mr-3" />
                  <h2 className="text-2xl font-bold text-foreground">
                    Join the Agricultural Revolution
                  </h2>
                </div>

                <p className="text-muted-foreground mb-8">
                  Connect your Hedera wallet to start earning rewards, getting
                  predictions, and accessing DeFi loans.
                </p>

                <Button
                  size="lg"
                  className="btn-primary text-xl px-12 py-6 hover-glow"
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
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

                <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Supports HashPack and other Hedera wallets</p>
                      </TooltipContent>
                    </Tooltip>
                    <span>HashPack Compatible</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Secure & Decentralized</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  );
}
