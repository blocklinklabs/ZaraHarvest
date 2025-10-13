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
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  Leaf,
  Plus,
  Award,
  BarChart3,
  Wallet,
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
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Farm Dashboard
            </h1>
            {isLoadingUser ? (
              <Skeleton className="h-4 w-64" />
            ) : (
              <p className="text-muted-foreground">
                `Welcome back${userData?.name ? `, ${userData.name}` : ""}!
                Here's your agricultural overview.`
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="default"
              className="flex items-center gap-2 px-3 py-1"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <Wallet className="h-3 w-3" />
              <span className="text-xs">
                {account?.address?.slice(0, 8)}...
              </span>
            </Badge>
          </div>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <Card className="dashboard-card bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                    {isLoadingUser ? (
                      <Skeleton className="h-8 w-48" />
                    ) : (
                      `Welcome back, ${userData?.name || "Farmer"}!`
                    )}
                  </h2>
                  <p className="text-green-700 dark:text-green-300">
                    {isLoadingUser ? (
                      <Skeleton className="h-4 w-64" />
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
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">
                    {isLoadingData ? (
                      <Skeleton className="h-8 w-12" />
                    ) : (
                      (Number(harvestData.totalTons) || 0).toFixed(1)
                    )}
                  </div>
                  <div className="text-sm text-green-600">
                    {isLoadingData ? (
                      <Skeleton className="h-3 w-16" />
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

        {/* Farm Profile - Similar to Welcome Banner */}
        {userData && !isLoadingUser && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <Card className="dashboard-card bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                      <BarChart3 className="h-6 w-6 text-blue-600" />
                      Your Farm Profile
                    </h2>
                    <p className="text-blue-700 dark:text-blue-300">
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
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">
                      {farmData.length +
                        yieldPredictions.length +
                        harvestTokens.length}
                    </div>
                    <div className="text-sm text-blue-600">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="metric-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary">
                Farm Data Entries
              </CardTitle>
              <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                <Leaf className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingData ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ) : (
                <>
                  <div className="metric-value">{farmData.length}</div>
                  <p className="metric-label">
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

          <Card className="metric-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary">
                Yield Predictions
              </CardTitle>
              <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingData ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ) : (
                <>
                  <div className="metric-value">{yieldPredictions.length}</div>
                  <p className="metric-label">
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

          <Card className="metric-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary">
                Active Loans
              </CardTitle>
              <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingData ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ) : (
                <>
                  <div className="metric-value">
                    {loans.filter((l) => l.status === "active").length}
                  </div>
                  <p className="metric-label">
                    {activeLoan
                      ? formatCurrency(activeLoan.amount)
                      : "No active loans"}
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="metric-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary">
                Harvest Tokens
              </CardTitle>
              <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                <Award className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingData ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ) : (
                <>
                  <div className="metric-value">{harvestTokens.length}</div>
                  <p className="metric-label">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Yield Prediction */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <BarChart3 className="h-5 w-5" />
                  Current Yield Prediction
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        AI-powered yield predictions based on your farm data
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingData ? (
                  <div className="space-y-4">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : yieldPredictions.length > 0 ? (
                  <div className="space-y-4">
                    {yieldPredictions.slice(-1).map((prediction, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-xl border border-green-200 dark:border-green-800"
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
                          className="w-full btn-primary"
                          onClick={() => router.push("/prediction")}
                        >
                          <TrendingUp className="mr-2 h-4 w-4" />
                          View All Predictions
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                        No Predictions Yet
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Submit farm data to get AI-powered yield predictions
                      </p>
                      <Button
                        onClick={handleRequestPrediction}
                        disabled={isLoading || farmData.length === 0}
                        className="btn-primary"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            <Zap className="mr-2 h-4 w-4" />
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
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <DollarSign className="h-5 w-5" />
                  Loan Status
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Manage your DeFi loans and collateral</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingData ? (
                  <div className="space-y-4">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : activeLoan ? (
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-xl border border-blue-200 dark:border-blue-800"
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
                      className="w-full btn-primary"
                      onClick={() => router.push("/lending")}
                    >
                      <Activity className="mr-2 h-4 w-4" />
                      Manage Loans
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <DollarSign className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                        No Active Loans
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Apply for a loan using your harvest as collateral
                      </p>
                      <Button
                        onClick={() => router.push("/lending")}
                        className="btn-primary"
                      >
                        <DollarSign className="mr-2 h-4 w-4" />
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
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Award className="h-5 w-5" />
                Harvest Tokens
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your tokenized harvest assets on blockchain</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
              <CardDescription>Your tokenized harvest assets</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingData ? (
                <div className="space-y-4">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ) : harvestTokens.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {recentTokens.map((token, index) => (
                    <motion.div
                      key={token.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <AccordionItem
                        value={token.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg mb-2"
                      >
                        <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between w-full mr-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-agri-primary/10 rounded-full flex items-center justify-center">
                                <Award className="h-4 w-4 text-agri-primary" />
                              </div>
                              <div>
                                <span className="font-semibold text-lg">
                                  {token.cropType}
                                </span>
                                <Badge
                                  variant={
                                    token.status === "tokenized"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="ml-2"
                                >
                                  {token.status}
                                </Badge>
                              </div>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                              {token.amount} tons
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3">
                          <div className="space-y-3 pt-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                Tokenized Amount:
                              </span>
                              <span className="font-semibold text-agri-primary">
                                {token.tokenizedAmount} tokens
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                QR Code:
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push("/tracker")}
                                className="border-primary text-primary hover:bg-primary bg-opacity-10"
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
                <div className="text-center py-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                      No Harvest Tokens Yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Tokenize your harvest to start trading on blockchain
                    </p>
                    <Button
                      onClick={() => router.push("/lending")}
                      className="btn-primary"
                    >
                      <Award className="mr-2 h-4 w-4" />
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
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <TrendingUp className="h-5 w-5" />
                Market Prices
                <Badge variant="secondary" className="ml-auto">
                  Live
                </Badge>
              </CardTitle>
              <CardDescription>
                Current crop prices in Ghana Cedis (GHS)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { crop: "Maize", price: 450, change: 5.2, color: "green" },
                  { crop: "Cocoa", price: 1200, change: -2.1, color: "orange" },
                  { crop: "Rice", price: 380, change: 3.8, color: "blue" },
                  { crop: "Wheat", price: 520, change: 1.5, color: "purple" },
                  { crop: "Cassava", price: 280, change: 4.3, color: "red" },
                ].map((item, index) => (
                  <motion.div
                    key={item.crop}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-center"
                  >
                    <h3 className="font-semibold text-lg">{item.crop}</h3>
                    <p className="text-2xl font-bold text-primary">
                      GHS {item.price}
                    </p>
                    <p
                      className={`text-sm ${
                        item.change > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.change > 0 ? "+" : ""}
                      {item.change}%
                    </p>
                  </motion.div>
                ))}
              </div>
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
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Award className="h-5 w-5" />
                    Achievements
                    <Badge variant="secondary" className="ml-auto">
                      {earnedBadges.length} earned
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
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
                              className="flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary/90 cursor-pointer"
                            >
                              <Award className="h-3 w-3" />
                              {badge.name}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{badge.description}</p>
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
                className="rounded-full h-16 w-16 shadow-lg bg-primary hover:bg-primary/90 text-white animate-bounce-gentle"
                onClick={() => router.push("/submit-data")}
              >
                <Plus className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Submit Farm Data</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>
      </div>
    </TooltipProvider>
  );
}
