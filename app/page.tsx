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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useWalletStore, walletProvider } from "@/lib/wallet-provider";
import {
  Wallet,
  Leaf,
  TrendingUp,
  Shield,
  Globe,
  ArrowRight,
  CheckCircle,
  Users,
  BarChart3,
  DollarSign,
  Clock,
  Sprout,
  Lock,
  Zap,
  Award,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const {
    account,
    isConnected,
    isConnecting,
    error,
    connect,
    setConnecting,
    setError,
  } = useWalletStore();

  const [isClient, setIsClient] = useState(false);
  const [hasWeb3, setHasWeb3] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if Web3 provider is available
    if (typeof window !== "undefined" && window.ethereum) {
      setHasWeb3(true);
    }
  }, []);

  const handleConnectWallet = async () => {
    try {
      setConnecting(true);
      setError(null);

      if (!window.ethereum) {
        throw new Error(
          "MetaMask or another Web3 wallet is not installed. Please install one to continue."
        );
      }

      const account = await walletProvider.connectWallet();
      connect(account);

      toast.success("Wallet Connected!", {
        description: `Connected to ${account.address.slice(
          0,
          6
        )}...${account.address.slice(-4)}`,
        icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      });
    } catch (err: any) {
      const errorMessage =
        err.message || "Failed to connect wallet. Please try again.";
      setError(errorMessage);
      toast.error("Connection Failed", {
        description: errorMessage,
        icon: <AlertCircle className="h-4 w-4 text-red-500" />,
      });
    } finally {
      setConnecting(false);
    }
  };

  const handleGetStarted = () => {
    if (isConnected) {
      router.push("/dashboard");
    } else {
      router.push("/onboarding");
    }
  };

  const features = [
    {
      icon: BarChart3,
      title: "Stop Guessing Your Harvest",
      description:
        "Will you get 2 tons or 5 tons this season? Our AI looks at your soil, weather, and past harvests to give you a real answer.",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: DollarSign,
      title: "Get Cash Before Harvest",
      description:
        "Need money for seeds or school fees? Use your future harvest to get a loan today. No bank visits, no endless paperwork.",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Shield,
      title: "Your Records Can't Be Lost",
      description:
        "Everything is saved on the blockchain forever. No one can delete your farm records or change your harvest history.",
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      icon: Clock,
      title: "Buyers Know Your Crops Are Real",
      description:
        "Show buyers exactly where your maize came from and when you harvested it. Better trust means better prices for you.",
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Sprout,
      title: "See What's Working on Your Farm",
      description:
        "Simple charts show you which fields are doing well and which ones need help. Make decisions based on real numbers.",
      color: "text-indigo-600 dark:text-indigo-400",
    },
    {
      icon: Award,
      title: "Get Paid for Sharing Data",
      description:
        "Help other farmers by sharing what works on your farm. The more you share, the more rewards you earn.",
      color: "text-pink-600 dark:text-pink-400",
    },
  ];

  const stats = [
    { label: "Farmers Using ZaraHarvest", value: "150+", icon: Users },
    { label: "Total Loans Given", value: "$45K", icon: DollarSign },
    { label: "Harvests Predicted", value: "320+", icon: TrendingUp },
    { label: "African Countries", value: "3", icon: Globe },
  ];

  if (!isClient) {
    return null; // Prevent SSR mismatch
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-950 dark:via-black dark:to-gray-950 scroll-smooth">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none will-change-transform">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 dark:bg-green-500/5 rounded-full blur-3xl transform-gpu"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/10 dark:bg-green-500/5 rounded-full blur-3xl transform-gpu"></div>
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div className="text-center space-y-8">
              {/* Badge */}
              <Badge
                variant="outline"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border-green-500/50 bg-green-50 dark:bg-green-950/30"
              >
                <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-green-700 dark:text-green-300">
                  Built by farmers, for farmers
                </span>
              </Badge>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="text-gray-900 dark:text-white">
                    Farming shouldn't be a{" "}
                  </span>
                  <span className="text-green-600 dark:text-green-400">
                    gamble
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  Know what you'll harvest. Get money when you need it. Sell for
                  better prices.
                </p>
              </div>

              {/* Subtitle */}
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                ZaraHarvest helps African farmers make smarter decisions, access
                fair loans, and connect directly with buyers. No middlemen, no
                guesswork.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button
                  size="lg"
                  onClick={handleGetStarted}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-lg shadow-green-600/30 dark:shadow-green-600/20 group min-w-[200px] transform-gpu will-change-transform"
                >
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform transform-gpu will-change-transform" />
                </Button>

                {!isConnected && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={handleConnectWallet}
                        disabled={isConnecting || !hasWeb3}
                        className="border-green-600/50 hover:bg-green-50 dark:hover:bg-green-950/30 dark:border-green-600/50 min-w-[200px] transform-gpu will-change-transform"
                      >
                        <Wallet className="mr-2 h-5 w-5" />
                        <span>
                          {isConnecting ? "Connecting..." : "Connect Wallet"}
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Connect your Web3 wallet to get started</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {isConnected && (
                  <Badge
                    variant="default"
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 text-sm"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    <span>Wallet Connected</span>
                  </Badge>
                )}
              </div>

              {/* Error Alert */}
              {error && (
                <Alert
                  variant="destructive"
                  className="max-w-md mx-auto border-red-500/50"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Web3 Warning */}
              {!hasWeb3 && (
                <Alert className="max-w-md mx-auto border-amber-500/50 bg-amber-50 dark:bg-amber-950/30">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800 dark:text-amber-300">
                    Please install MetaMask or another Web3 wallet to connect
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card
                    key={index}
                    className="text-center border-green-500/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 transform-gpu will-change-transform"
                  >
                    <CardContent className="pt-6 space-y-2">
                      <Icon className="h-8 w-8 mx-auto text-green-600 dark:text-green-400" />
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Here's how we help you farm better
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Real solutions for real problems that African farmers face every
                day
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className="border-green-500/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1 transition-all duration-300 group transform-gpu will-change-transform"
                  >
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-950/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform transform-gpu will-change-transform">
                        <Icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-xl text-gray-900 dark:text-white">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Getting started is easy
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Three simple steps to start making better farming decisions
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-600 dark:bg-green-600 flex items-center justify-center shadow-lg shadow-green-600/30 transform-gpu will-change-transform">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Set Up Your Account
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect your wallet - it's like your digital ID for the farm
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-600 dark:bg-green-600 flex items-center justify-center shadow-lg shadow-green-600/30 transform-gpu will-change-transform">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Tell Us About Your Farm
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Share basic info about your land, crops, and location
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-600 dark:bg-green-600 flex items-center justify-center shadow-lg shadow-green-600/30 transform-gpu will-change-transform">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Start Making Better Decisions
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get predictions, apply for loans, and track your harvests
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-green-500/30 bg-gradient-to-br from-green-50 to-white dark:from-green-950/30 dark:to-gray-900 shadow-2xl shadow-green-500/10 transform-gpu will-change-transform">
              <CardContent className="p-12 text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-600 dark:bg-green-600 flex items-center justify-center shadow-lg shadow-green-600/30 transform-gpu will-change-transform">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Ready to stop guessing and start knowing?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Join 150+ African farmers who are already using ZaraHarvest to
                  make smarter decisions and earn better profits.
                </p>
                <Button
                  size="lg"
                  onClick={handleGetStarted}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-lg shadow-green-600/30 dark:shadow-green-600/20 group transform-gpu will-change-transform"
                >
                  <span>
                    {isConnected ? "Go to Dashboard" : "Get Started Now"}
                  </span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform transform-gpu will-change-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto">
            <Separator className="mb-8 bg-green-500/20" />
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ZaraHarvest
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © 2025 ZaraHarvest. Built by farmers who understand the
                struggle.
              </p>
              <div className="flex items-center gap-4">
                <Lock className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Secured by Blockchain
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}
