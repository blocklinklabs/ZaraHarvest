// Polish wording in docs/comments.
// chore: non-functional doc tweak start 2025-10-13T08:10:17.675Z
// chore(auto): non-functional doc tweak start 2025-10-13T08:07:09.118Z
"use client";

import { useEffect, useState } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useWalletStore } from "@/lib/wallet-provider";
import {
  formatCurrency,
  formatDate,
  generateMockYieldPrediction,
} from "@/lib/utils";
import WeatherControlCenter from "@/components/WeatherControlCenter";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  Leaf,
  Plus,
  Award,
  BarChart3,
  AlertCircle,
  Activity,
  Target,
  Zap,
  Clock,
  CheckCircle2,
  TrendingDown,
  Info,
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const { isConnected, account } = useWalletStore();

  // User data state
  const [userData, setUserData] = useState<any>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Dashboard data state
  const [dashboardData, setDashboardData] = useState({
    farmData: [] as any[],
    yieldPredictions: [] as any[],
    loans: [] as any[],
    harvestTokens: [] as any[],
  });
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Market prices state
  const [marketPrices, setMarketPrices] = useState<any[]>([]);
  const [isLoadingPrices, setIsLoadingPrices] = useState(true);
  const [userCountry, setUserCountry] = useState("Ghana");
  const [currency, setCurrency] = useState("GHS");

  // Use real data from database
  const farmData = dashboardData.farmData;
  const yieldPredictions = dashboardData.yieldPredictions;
  const loans = dashboardData.loans;
  const harvestTokens = dashboardData.harvestTokens;

  // Calculate harvest data from real database
  const calculateHarvestData = () => {
    if (yieldPredictions.length === 0) {
      return {
        totalTons: 0,
        primaryCrop: userData?.cropType || "Maize",
        recentHarvest: null,
      };
    }

    // Get the most recent prediction
    const latestPrediction = yieldPredictions[yieldPredictions.length - 1];
    const totalTons = latestPrediction.predictedYield || 0;
    const primaryCrop =
      latestPrediction.cropType || userData?.cropType || "Maize";

    return {
      totalTons: totalTons,
      primaryCrop: primaryCrop,
      recentHarvest: latestPrediction,
    };
  };

  const harvestData = calculateHarvestData();

  const badges = [
    {
      id: "1",
      name: "First Prediction",
      description: "Made your first yield prediction",
      earned: true,
    },
    {
      id: "2",
      name: "Data Contributor",
      description: "Submitted farm data 5 times",
      earned: true,
    },
    {
      id: "3",
      name: "DeFi Pioneer",
      description: "Used DeFi lending feature",
      earned: false,
    },
  ];

  const addYieldPrediction = (prediction: any) => {
    console.log("Adding yield prediction:", prediction);
  };

  const earnBadge = (badgeId: string) => {
    console.log("Earning badge:", badgeId);
  };

  // Function to detect user country from location data
  const detectUserCountry = (location: string) => {
    if (!location) return "Ghana"; // Default fallback

    const locationLower = location.toLowerCase();
    if (
      locationLower.includes("nigeria") ||
      locationLower.includes("lagos") ||
      locationLower.includes("abuja")
    ) {
      return "Nigeria";
    } else if (
      locationLower.includes("kenya") ||
      locationLower.includes("nairobi")
    ) {
      return "Kenya";
    } else if (
      locationLower.includes("uganda") ||
      locationLower.includes("kampala")
    ) {
      return "Uganda";
    } else if (
      locationLower.includes("tanzania") ||
      locationLower.includes("dar es salaam")
    ) {
      return "Tanzania";
    } else if (
      locationLower.includes("ethiopia") ||
      locationLower.includes("addis ababa")
    ) {
      return "Ethiopia";
    }
    return "Ghana"; // Default to Ghana
  };

  // Function to fetch market prices
  const fetchMarketPrices = async (country: string) => {
    try {
      const response = await fetch(
        `/api/market-prices?country=${encodeURIComponent(country)}`
      );
      if (response.ok) {
        const data = await response.json();
        setMarketPrices(data.data || []);
        setCurrency(data.currency || "GHS");
      } else {
        console.error("Failed to fetch market prices");
        setMarketPrices([]);
      }
    } catch (error) {
      console.error("Error fetching market prices:", error);
      setMarketPrices([]);
    } finally {
      setIsLoadingPrices(false);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  // Fetch user data from database
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isConnected || !account?.address) {
        setIsLoadingUser(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/user/profile?walletAddress=${account.address}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
        } else {
          console.log("User not found in database, using fallback data");
          // Try to get data from localStorage as fallback
          const localData = localStorage.getItem("farmerData");
          if (localData) {
            const parsedData = JSON.parse(localData);
            setUserData({
              name: parsedData.fullName,
              email: parsedData.email,
              location: parsedData.location,
              farmSize: parsedData.farmSize,
              experience: parsedData.farmingExperience,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // Try to get data from localStorage as fallback
        const localData = localStorage.getItem("farmerData");
        if (localData) {
          const parsedData = JSON.parse(localData);
          setUserData({
            name: parsedData.fullName,
            email: parsedData.email,
            location: parsedData.location,
            farmSize: parsedData.farmSize,
            experience: parsedData.farmingExperience,
          });
        }
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUserData();
  }, [isConnected, account?.address]);

  // Fetch dashboard data from database
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!isConnected || !account?.address) {
        setIsLoadingData(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/dashboard/data?walletAddress=${account.address}`
        );
        if (response.ok) {
          const data = await response.json();
          setDashboardData({
            farmData: data.farmData || [],
            yieldPredictions: data.yieldPredictions || [],
            loans: data.loans || [],
            harvestTokens: data.harvestTokens || [],
          });
        } else {
          console.log("No dashboard data found, using empty arrays");
          setDashboardData({
            farmData: [],
            yieldPredictions: [],
            loans: [],
            harvestTokens: [],
          });
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setDashboardData({
          farmData: [],
          yieldPredictions: [],
          loans: [],
          harvestTokens: [],
        });
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchDashboardData();
  }, [isConnected, account?.address]);

  // Fetch market prices when user data is available
  useEffect(() => {
    if (userData && userData.location) {
      const country = detectUserCountry(userData.location);
      setUserCountry(country);
      fetchMarketPrices(country);
    }
  }, [userData]);

  const handleRequestPrediction = async () => {
    setIsLoading(true);
    try {
      // Simulate AI prediction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const latestFarmData = farmData[farmData.length - 1];
      if (latestFarmData) {
        const prediction = generateMockYieldPrediction(latestFarmData.cropType);
        addYieldPrediction({
          cropType: latestFarmData.cropType,
          predictedYield: prediction.predictedYield,
          riskLevel: prediction.riskLevel,
          confidence: prediction.confidence,
        });

        // Earn badge for first prediction
        if (yieldPredictions.length === 0) {
          earnBadge("yield-predictor");
        }
      }
    } catch (error) {
      console.error("Failed to generate prediction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const activeLoan = loans.find((loan) => loan.status === "active");
  const earnedBadges = badges.filter((badge) => badge.earned);
  const recentTokens = harvestTokens.slice(-3);

  if (!isConnected) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="space-y-8 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left mb-12"
        >
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter leading-[1.1]">
            Farm Dashboard
          </h1>
          {isLoadingUser ? (
            <Skeleton className="h-6 w-96 rounded-xl" />
          ) : (
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl font-light leading-relaxed">
              Welcome back{userData?.name ? `, ${userData.name}` : ""}! Here's
              your agricultural overview and real-time insights.
            </p>
          )}
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
            <CardContent className="p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                    {isLoadingUser ? (
                      <Skeleton className="h-10 w-64 rounded-xl" />
                    ) : (
                      `Welcome back, ${userData?.name || "Farmer"}!`
                    )}
                  </h2>
                  <div className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                    {isLoadingUser ? (
                      <Skeleton className="h-6 w-80 rounded-xl" />
                    ) : (
                      `Your ${
                        userData?.farmSize
                          ? `${userData.farmSize} acre`
                          : "farm"
                      } in ${
                        userData?.location || "your location"
                      } is performing ${
                        (Number(harvestData.totalTons) || 0) > 0
                          ? `excellently with ${
                              Number(harvestData.totalTons) || 0
                            } tons of ${harvestData.primaryCrop} predicted`
                          : "ready for your first yield prediction"
                      }`
                    )}
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <div className="text-5xl lg:text-6xl font-black text-green-600 dark:text-green-400 mb-2 tracking-tight">
                    {isLoadingData ? (
                      <Skeleton className="h-16 w-20 rounded-xl mx-auto lg:mx-0" />
                    ) : (
                      (Number(harvestData.totalTons) || 0).toFixed(1)
                    )}
                  </div>
                  <div className="text-sm lg:text-base text-gray-500 dark:text-gray-400 font-medium">
                    {isLoadingData ? (
                      <Skeleton className="h-4 w-24 rounded-xl mx-auto lg:mx-0" />
                    ) : (Number(harvestData.totalTons) || 0) > 0 ? (
                      "tons predicted"
                    ) : (
                      "no predictions"
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Test Notification Button */}

        {/* Weather Control Center */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mb-6"
        >
          <WeatherControlCenter />
        </motion.div>

        {/* Farm Profile - Similar to Welcome Banner */}
        {userData && !isLoadingUser && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-xl border-green-200/50 dark:border-green-800/50 shadow-xl shadow-green-900/5 dark:shadow-green-900/20 rounded-3xl overflow-hidden">
              <CardContent className="p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  <div className="flex-1">
                    <h2 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-950/50 rounded-2xl flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      Your Farm Profile
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                      {userData.farmSize
                        ? `${userData.farmSize} acres`
                        : "Farm"}{" "}
                      in {userData.location || "your location"} •{" "}
                      {userData.experience
                        ? `${userData.experience} years`
                        : "New"}{" "}
                      experience • Growing{" "}
                      {userData.cropType || "various crops"}
                    </p>
                  </div>
                  <div className="text-center lg:text-right">
                    <div className="text-5xl lg:text-6xl font-black text-green-600 dark:text-green-400 mb-2 tracking-tight">
                      {farmData.length +
                        yieldPredictions.length +
                        harvestTokens.length}
                    </div>
                    <div className="text-sm lg:text-base text-gray-500 dark:text-gray-400 font-medium">
                      total activities
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden transform-gpu will-change-transform hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 p-6">
              <CardTitle className="text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wide uppercase">
                Farm Data Entries
              </CardTitle>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-950/50 rounded-2xl flex items-center justify-center">
                <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              {isLoadingData ? (
                <div className="space-y-3">
                  <Skeleton className="h-12 w-20 rounded-xl" />
                  <Skeleton className="h-5 w-32 rounded-xl" />
                </div>
              ) : (
                <>
                  <div className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                    {farmData.length}
                  </div>
                  <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    {farmData.length > 0
                      ? `Latest: ${farmData[farmData.length - 1].cropType}${
                          userData?.farmSize
                            ? ` • ${userData.farmSize} acres`
                            : ""
                        }`
                      : `No data yet${
                          userData?.farmSize
                            ? ` • ${userData.farmSize} acres`
                            : ""
                        }`}
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden transform-gpu will-change-transform hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 p-6">
              <CardTitle className="text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wide uppercase">
                Yield Predictions
              </CardTitle>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              {isLoadingData ? (
                <div className="space-y-3">
                  <Skeleton className="h-12 w-20 rounded-xl" />
                  <Skeleton className="h-5 w-32 rounded-xl" />
                </div>
              ) : (
                <>
                  <div className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                    {yieldPredictions.length}
                  </div>
                  <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    {yieldPredictions.length > 0
                      ? `${
                          yieldPredictions[yieldPredictions.length - 1]
                            .confidence
                        }% confidence`
                      : "No predictions yet"}
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden transform-gpu will-change-transform hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 p-6">
              <CardTitle className="text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wide uppercase">
                Active Loans
              </CardTitle>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950/50 rounded-2xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              {isLoadingData ? (
                <div className="space-y-3">
                  <Skeleton className="h-12 w-20 rounded-xl" />
                  <Skeleton className="h-5 w-32 rounded-xl" />
                </div>
              ) : (
                <>
                  <div className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                    {loans.filter((l) => l.status === "active").length}
                  </div>
                  <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    {activeLoan
                      ? formatCurrency(activeLoan.amount)
                      : "No active loans"}
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden transform-gpu will-change-transform hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 p-6">
              <CardTitle className="text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wide uppercase">
                Harvest Tokens
              </CardTitle>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950/50 rounded-2xl flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              {isLoadingData ? (
                <div className="space-y-3">
                  <Skeleton className="h-12 w-20 rounded-xl" />
                  <Skeleton className="h-5 w-32 rounded-xl" />
                </div>
              ) : (
                <>
                  <div className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                    {harvestTokens.length}
                  </div>
                  <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    {harvestTokens.length > 0
                      ? `${
                          harvestTokens.filter((t) => t.status === "tokenized")
                            .length
                        } tokenized`
                      : "No tokens yet"}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Yield Prediction */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
              <CardHeader className="p-8 pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl lg:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-950/50 rounded-2xl flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  Current Yield Prediction
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl rounded-xl p-3">
                      <p className="font-medium text-gray-900 dark:text-white">
                        AI-powered yield predictions based on your farm data
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                {isLoadingData ? (
                  <div className="space-y-6">
                    <Skeleton className="h-40 w-full rounded-2xl" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                  </div>
                ) : yieldPredictions.length > 0 ? (
                  <div className="space-y-6">
                    {yieldPredictions.slice(-1).map((prediction, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="p-8 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-3xl border border-green-200/50 dark:border-green-800/50"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-green-600" />
                            <h3 className="font-semibold text-lg">
                              {prediction.cropType}
                            </h3>
                          </div>
                          <Badge
                            variant="default"
                            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          >
                            {prediction.confidence}% confidence
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                              Predicted Yield
                            </p>
                            <p className="text-3xl font-bold text-green-600">
                              {prediction.predictedYield} tons
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                              Risk Level
                            </p>
                            <p className="text-3xl font-bold text-orange-600">
                              {prediction.riskLevel}%
                            </p>
                          </div>
                        </div>

                        {/* Risk Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                            <span>Risk Assessment</span>
                            <span>{prediction.riskLevel}%</span>
                          </div>
                          <Progress
                            value={prediction.riskLevel}
                            className="h-2"
                            style={{
                              background: `linear-gradient(90deg, 
                                  ${
                                    prediction.riskLevel < 15
                                      ? "#10b981"
                                      : prediction.riskLevel < 25
                                      ? "#f59e0b"
                                      : "#ef4444"
                                  } 0%, 
                                  ${
                                    prediction.riskLevel < 15
                                      ? "#34d399"
                                      : prediction.riskLevel < 25
                                      ? "#fbbf24"
                                      : "#f87171"
                                  } 100%)`,
                            }}
                          />
                        </div>

                        <Button
                          className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-2xl px-8 py-4 font-semibold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-[1.02] active:scale-[0.98]"
                          onClick={() => router.push("/prediction")}
                        >
                          <TrendingUp className="mr-3 h-5 w-5" />
                          View All Predictions
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                        No Predictions Yet
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-sm mx-auto leading-relaxed">
                        Submit farm data to get AI-powered yield predictions
                      </p>
                      <Button
                        onClick={handleRequestPrediction}
                        disabled={isLoading || farmData.length === 0}
                        className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-2xl px-8 py-4 font-semibold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            <Zap className="mr-3 h-5 w-5" />
                            Request Prediction
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Loan Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
              <CardHeader className="p-8 pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl lg:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  Loan Status
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl rounded-xl p-3">
                      <p className="font-medium text-gray-900 dark:text-white">
                        Manage your DeFi loans and collateral
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                {isLoadingData ? (
                  <div className="space-y-6">
                    <Skeleton className="h-40 w-full rounded-2xl" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                  </div>
                ) : activeLoan ? (
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="p-8 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm rounded-3xl border border-blue-200/50 dark:border-blue-800/50"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-blue-600" />
                          <h3 className="font-semibold text-lg">Active Loan</h3>
                        </div>
                        <Badge
                          variant="default"
                          className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          Active
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            Loan Amount
                          </span>
                          <span className="font-bold text-xl text-blue-600">
                            {formatCurrency(activeLoan.amount)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            Interest Rate
                          </span>
                          <span className="font-semibold text-lg">
                            {activeLoan.interestRate}% APR
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            Due Date
                          </span>
                          <span className="font-semibold">
                            {activeLoan.endDate
                              ? formatDate(activeLoan.endDate)
                              : "N/A"}
                          </span>
                        </div>
                      </div>

                      {/* Progress to due date */}
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                          <span>Loan Progress</span>
                          <span>On Track</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    </motion.div>

                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 dark:shadow-blue-600/20 rounded-2xl px-8 py-4 font-semibold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-[1.02] active:scale-[0.98]"
                      onClick={() => router.push("/lending")}
                    >
                      <Activity className="mr-3 h-5 w-5" />
                      Manage Loans
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <DollarSign className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                        No Active Loans
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-sm mx-auto leading-relaxed">
                        Apply for a loan using your harvest as collateral
                      </p>
                      <Button
                        onClick={() => router.push("/lending")}
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 dark:shadow-blue-600/20 rounded-2xl px-8 py-4 font-semibold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <DollarSign className="mr-3 h-5 w-5" />
                        Apply for Loan
                      </Button>
                    </motion.div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Harvest Tokens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
            <CardHeader className="p-8 pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl lg:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950/50 rounded-2xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                Harvest Tokens
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl rounded-xl p-3">
                    <p className="font-medium text-gray-900 dark:text-white">
                      Your tokenized harvest assets on blockchain
                    </p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-light mt-2">
                Your tokenized harvest assets
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              {isLoadingData ? (
                <div className="space-y-6">
                  <Skeleton className="h-24 w-full rounded-2xl" />
                  <Skeleton className="h-24 w-full rounded-2xl" />
                </div>
              ) : harvestTokens.length > 0 ? (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-4"
                >
                  {recentTokens.map((token, index) => (
                    <motion.div
                      key={token.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <AccordionItem
                        value={token.id}
                        className="border border-gray-200/50 dark:border-gray-700/50 rounded-2xl mb-4 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20 backdrop-blur-sm overflow-hidden"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:bg-white/50 dark:hover:bg-gray-900/50 rounded-2xl transition-all duration-200">
                          <div className="flex items-center justify-between w-full mr-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950/50 rounded-2xl flex items-center justify-center">
                                <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                              </div>
                              <div>
                                <span className="font-bold text-xl text-gray-900 dark:text-white">
                                  {token.cropType}
                                </span>
                                <Badge
                                  variant={
                                    token.status === "tokenized"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="ml-3 px-3 py-1 rounded-full font-semibold bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-0"
                                >
                                  {token.status}
                                </Badge>
                              </div>
                            </div>
                            <span className="text-lg text-gray-600 dark:text-gray-300 font-bold">
                              {token.amount} tons
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-center">
                              <span className="text-base text-gray-600 dark:text-gray-300 font-medium">
                                Tokenized Amount:
                              </span>
                              <span className="font-bold text-lg text-purple-600 dark:text-purple-400">
                                {token.tokenizedAmount} tokens
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-base text-gray-600 dark:text-gray-300 font-medium">
                                QR Code:
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push("/tracker")}
                                className="border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 rounded-xl px-4 py-2 font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                              >
                                View QR
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Award className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                      No Harvest Tokens Yet
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-sm mx-auto leading-relaxed">
                      Tokenize your harvest to start trading on blockchain
                    </p>
                    <Button
                      onClick={() => router.push("/lending")}
                      className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white shadow-xl shadow-purple-600/30 dark:shadow-purple-600/20 rounded-2xl px-8 py-4 font-semibold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Award className="mr-3 h-5 w-5" />
                      Tokenize Harvest
                    </Button>
                  </motion.div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Market Prices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
            <CardHeader className="p-8 pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl lg:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/50 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                Market Prices
                <div className="ml-auto flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchMarketPrices(userCountry)}
                    disabled={isLoadingPrices}
                    className="h-10 px-4 rounded-xl border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                  >
                    {isLoadingPrices ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600"></div>
                    ) : (
                      <TrendingUp className="h-4 w-4" />
                    )}
                  </Button>
                  <Badge className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-0 px-3 py-1 rounded-full font-semibold">
                    Live
                  </Badge>
                </div>
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-light mt-2">
                Current crop prices in {userCountry} ({currency})
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              {isLoadingPrices ? (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="p-6 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl text-center bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-950/20 dark:to-green-950/20"
                    >
                      <Skeleton className="h-6 w-16 mx-auto mb-3 rounded-xl" />
                      <Skeleton className="h-10 w-20 mx-auto mb-3 rounded-xl" />
                      <Skeleton className="h-5 w-12 mx-auto rounded-xl" />
                    </div>
                  ))}
                </div>
              ) : marketPrices.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {marketPrices.map((item, index) => (
                    <motion.div
                      key={item.crop}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-6 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl text-center bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-950/20 dark:to-green-950/20 backdrop-blur-sm transform-gpu will-change-transform hover:scale-105 transition-all duration-300"
                    >
                      <h3 className="font-bold text-lg lg:text-xl text-gray-900 dark:text-white mb-2">
                        {item.crop}
                      </h3>
                      <p className="text-2xl lg:text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-2">
                        {currency} {item.price}
                      </p>
                      <p
                        className={`text-sm lg:text-base font-semibold ${
                          item.change > 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {item.change > 0 ? "+" : ""}
                        {item.change.toFixed(1)}%
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="h-10 w-10 text-gray-400" />
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                    Unable to load market prices. Please try again later.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Badges */}
        <AnimatePresence>
          {earnedBadges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
                <CardHeader className="p-8 pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl lg:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-950/50 rounded-2xl flex items-center justify-center">
                      <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    Achievements
                    <Badge className="ml-auto bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300 border-0 px-4 py-2 rounded-full font-bold text-lg">
                      {earnedBadges.length} earned
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="flex flex-wrap gap-4">
                    {earnedBadges.map((badge, index) => (
                      <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge
                              variant="default"
                              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white cursor-pointer rounded-2xl font-bold text-base shadow-lg shadow-yellow-500/30 dark:shadow-yellow-500/20 transform-gpu will-change-transform transition-all duration-200"
                            >
                              <Award className="h-5 w-5" />
                              {badge.name}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl rounded-xl p-3">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {badge.description}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="fixed bottom-20 right-6 z-40"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="lg"
                className="rounded-full h-16 w-16 shadow-xl shadow-green-600/30 dark:shadow-green-600/20 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white transform-gpu will-change-transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => router.push("/submit-data")}
              >
                <Plus className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl rounded-xl p-3">
              <p className="font-semibold text-gray-900 dark:text-white">
                Submit Farm Data
              </p>
            </TooltipContent>
          </Tooltip>
        </motion.div>
      </div>
    </TooltipProvider>
  );
}
