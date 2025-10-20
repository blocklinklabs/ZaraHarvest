"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { useWalletStore } from "@/lib/wallet-provider";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  CheckCircle,
  Cloud,
  Droplets,
  Leaf,
  MapPin,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

interface FarmData {
  id: string;
  cropType: string;
  location: string;
  soilMoisture: number;
  weatherNotes?: string;
  temperature?: number;
  humidity?: number;
  rainfall?: number;
  createdAt: string;
}

interface YieldPrediction {
  id: string;
  cropType: string;
  predictedYield: number;
  riskLevel: number;
  confidence: number;
  modelVersion?: string;
  inputData?: any;
  createdAt: string;
  farmDataId?: string;
}

export default function Prediction() {
  const router = useRouter();
  const { isConnected, account } = useWalletStore();

  const [farmData, setFarmData] = useState<FarmData[]>([]);
  const [yieldPredictions, setYieldPredictions] = useState<YieldPrediction[]>(
    []
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFarmData, setSelectedFarmData] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Effect to handle wallet connection status and data fetching
  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    } else {
      fetchData();
    }
  }, [isConnected, router, account]);

  /**
   * Fetches farm data and yield predictions for the connected wallet address.
   * Sets loading state during the fetch operation.
   */
  const fetchData = async () => {
    if (!account?.address) return;

    setIsLoading(true);
    try {
      // Fetch farm data submitted by the user
      const farmDataResponse = await fetch(
        `/api/farm-data?walletAddress=${account.address}`
      );
      if (farmDataResponse.ok) {
        const farmDataResult = await farmDataResponse.json();
        setFarmData(farmDataResult.data || []);
      }

      // Fetch yield predictions associated with the user's farm data
      const predictionsResponse = await fetch(
        `/api/yield-predictions?walletAddress=${account.address}`
      );
      if (predictionsResponse.ok) {
        const predictionsResult = await predictionsResponse.json();
        setYieldPredictions(predictionsResult.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles the generation of a new yield prediction.
   * Requires selected farm data and a connected wallet.
   */
  const handleGeneratePrediction = async () => {
    if (!selectedFarmData) {
      toast.error("Please select farm data to analyze");
      return;
    }

    if (!account?.address) {
      toast.error("Wallet not connected");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/yield-predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: account.address,
          farmDataId: selectedFarmData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate prediction");
      }

      const result = await response.json();

      if (result.success) {
        // Prepend the new prediction to the existing list to show it first
        setYieldPredictions((prev) => [result.data, ...prev]);
        toast.success("Yield prediction generated successfully!");
        setSelectedFarmData(""); // Reset selected farm data after successful generation
      } else {
        throw new Error(result.error || "Failed to generate prediction");
      }
    } catch (error) {
      console.error("Failed to generate prediction:", error);
      toast.error("Failed to generate prediction. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Prepare data for the yield vs. risk chart
  const yieldData = yieldPredictions.map((pred, index) => ({
    name: `${pred.cropType} ${index + 1}`,
    yield: pred.predictedYield,
    risk: pred.riskLevel,
    confidence: pred.confidence * 100,
    date: new Date(pred.createdAt).toLocaleDateString(),
  }));

  // Calculate distribution of risk levels for the pie chart
  const riskData = [
    {
      name: "Low Risk",
      value: yieldPredictions.filter((p) => p.riskLevel < 15).length,
      color: "#10b981",
    },
    {
      name: "Medium Risk",
      value: yieldPredictions.filter(
        (p) => p.riskLevel >= 15 && p.riskLevel < 25
      ).length,
      color: "#f59e0b",
    },
    {
      name: "High Risk",
      value: yieldPredictions.filter((p) => p.riskLevel >= 25).length,
      color: "#ef4444",
    },
  ].filter((item) => item.value > 0); // Only include risk categories that have predictions

  if (!isConnected) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              Yield Predictions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mt-2">
              Loading your data...
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center py-16">
          <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header section for the Yield Predictions page */}
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Yield Predictions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mt-2">
            AI-powered crop yield predictions and risk analysis
          </p>
        </div>
      </div>

      {/* Card to generate new yield predictions */}
      <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
        <CardHeader className="p-8 pb-6">
          <CardTitle className="flex items-center gap-3 text-3xl font-black text-gray-900 dark:text-white">
            <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            Generate New Prediction
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
            Get AI-powered yield predictions based on your submitted farm data
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          {farmData.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Leaf className="h-10 w-10 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                No Farm Data Available
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mb-8 max-w-md mx-auto">
                You need to submit farm data first to generate predictions.
              </p>
              <Button
                onClick={() => router.push("/submit-data")}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-2xl px-8 py-4 font-semibold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
              >
                Submit Farm Data
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-base font-semibold text-gray-900 dark:text-white">
                  Select Farm Data to Analyze
                </label>
                <select
                  className="w-full h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                  value={selectedFarmData}
                  onChange={(e) => setSelectedFarmData(e.target.value)}
                >
                  <option value="">Choose farm data...</option>
                  {farmData.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.cropType} - {data.location} (
                      {new Date(data.createdAt).toLocaleDateString()})
                    </option>
                  ))}
                </select>
              </div>

              {selectedFarmData && (
                <div className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                  {/* Display details of the currently selected farm data */}
                  {(() => {
                    const selectedData = farmData.find(
                      (d) => d.id === selectedFarmData
                    );
                    if (!selectedData) return null;

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                            <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                              Crop
                            </span>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              {selectedData.cropType}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                              Location
                            </span>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              {selectedData.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                            <Droplets className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                              Soil Moisture
                            </span>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              {selectedData.soilMoisture}%
                            </p>
                          </div>
                        </div>
                        {selectedData.temperature && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                              <Cloud className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                Temperature
                              </span>
                              <p className="text-lg font-bold text-gray-900 dark:text-white">
                                {selectedData.temperature}°C
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              <Button
                onClick={handleGeneratePrediction}
                disabled={isGenerating || !selectedFarmData}
                className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-2xl px-8 py-4 font-semibold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                    Generating AI Prediction...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-3 h-6 w-6" />
                    Generate AI Prediction
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {yieldPredictions.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Yield vs Risk Chart */}
          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
            <CardHeader className="p-8 pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-900 dark:text-white">
                <div className="w-10 h-10 rounded-2xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                Yield vs Risk Analysis
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                Predicted yield and risk levels for your crops
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yieldData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "1px solid rgba(229, 231, 235, 0.5)",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar
                      dataKey="yield"
                      fill="#10b981"
                      name="Yield (tons/ha)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="risk"
                      fill="#ef4444"
                      name="Risk (%)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Risk Distribution Chart */}
          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
            <CardHeader className="p-8 pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-900 dark:text-white">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                Risk Distribution
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                Distribution of risk levels across your predictions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="h-80">
                {riskData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value, percent }: any) =>
                          `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {riskData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [value, name]}
                        labelFormatter={(label) => `Risk Level: ${label}`}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "1px solid rgba(229, 231, 235, 0.5)",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <BarChart3 className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                      </div>
                      <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mb-2">
                        No risk data available
                      </p>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        Generate predictions to see risk distribution
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
          <CardContent className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="h-10 w-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
              No Predictions Yet
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mb-8 max-w-md mx-auto">
              Generate your first AI-powered yield prediction to see detailed
              analytics
            </p>
            {farmData.length > 0 && (
              <Button
                onClick={() => document.querySelector("select")?.focus()}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-2xl px-8 py-4 font-semibold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
              >
                Generate First Prediction
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recent Predictions List */}
      <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
        <CardHeader className="p-8 pb-6">
          <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-900 dark:text-white">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            Recent Predictions
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
            Your latest yield predictions and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          {yieldPredictions.length > 0 ? (
            <div className="space-y-6">
              {/* Display the 5 most recent predictions, newest first */}
              {yieldPredictions
                .slice(-5)
                .reverse()
                .map((prediction, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 transform-gpu will-change-transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">
                          {prediction.cropType}
                        </h3>
                        <Badge
                          className={`${
                            prediction.riskLevel < 15
                              ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300"
                              : prediction.riskLevel < 25
                              ? "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300"
                              : "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300"
                          } border-0 px-4 py-2 rounded-xl font-bold`}
                        >
                          {prediction.riskLevel < 15
                            ? "Low Risk"
                            : prediction.riskLevel < 25
                            ? "Medium Risk"
                            : "High Risk"}
                        </Badge>
                      </div>
                      <span className="text-base text-gray-600 dark:text-gray-400 font-medium">
                        {prediction.createdAt
                          ? formatDate(prediction.createdAt)
                          : "N/A"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center p-6 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-2xl border border-green-200/50 dark:border-green-800/50">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                          Predicted Yield
                        </p>
                        <p className="text-3xl font-black text-green-600 dark:text-green-400">
                          {prediction.predictedYield} tons
                        </p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-orange-50/80 to-yellow-50/80 dark:from-orange-950/30 dark:to-yellow-950/30 backdrop-blur-sm rounded-2xl border border-orange-200/50 dark:border-orange-800/50">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                          Risk Level
                        </p>
                        <p className="text-3xl font-black text-orange-600 dark:text-orange-400">
                          {prediction.riskLevel}%
                        </p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                          Confidence
                        </p>
                        <p className="text-3xl font-black text-blue-600 dark:text-blue-400">
                          {prediction.confidence}%
                        </p>
                      </div>
                    </div>

                    {/* AI Insights and Recommendations */}
                    <div className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center flex-shrink-0 mt-1">
                          {prediction.riskLevel < 15 ? (
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            {prediction.riskLevel < 15
                              ? "Excellent conditions! Your crop is expected to perform well."
                              : prediction.riskLevel < 25
                              ? "Good conditions with some risk factors to monitor."
                              : "High risk detected. Consider additional measures to protect your crop."}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-4">
                            AI Confidence:{" "}
                            {(prediction.confidence * 100).toFixed(0)}% | Model:{" "}
                            {prediction.modelVersion || "Gemini AI"}
                          </p>

                          {/* Show AI factors if available */}
                          {prediction.inputData?.aiFactors && (
                            <div>
                              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                Key Factors:
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {prediction.inputData.aiFactors
                                  .slice(0, 3)
                                  .map((factor: string, idx: number) => (
                                    <div
                                      key={idx}
                                      className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-4 py-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50 font-medium"
                                    >
                                      {factor}
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-10 w-10 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                No predictions available. Generate your first AI-powered
                prediction above.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Insights Summary Card */}
      {yieldPredictions.length > 0 && (
        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
          <CardHeader className="p-8 pb-6">
            <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-900 dark:text-white">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              AI Insights Summary
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
              Key insights from your yield predictions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-2xl border border-green-200/50 dark:border-green-800/50 transform-gpu will-change-transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-black text-green-600 dark:text-green-400 mb-2">
                  {yieldPredictions.length}
                </div>
                <div className="text-base font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Total Predictions
                </div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-800/50 transform-gpu will-change-transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2">
                  {(
                    (yieldPredictions.reduce(
                      (acc, p) => acc + p.confidence,
                      0
                    ) /
                      yieldPredictions.length) *
                    100
                  ).toFixed(0)}
                  %
                </div>
                <div className="text-base font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Average AI Confidence
                </div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50/80 to-violet-50/80 dark:from-purple-950/30 dark:to-violet-950/30 backdrop-blur-sm rounded-2xl border border-purple-200/50 dark:border-purple-800/50 transform-gpu will-change-transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-2">
                  {(
                    yieldPredictions.reduce(
                      (acc, p) => acc + p.predictedYield,
                      0
                    ) / yieldPredictions.length
                  ).toFixed(1)}{" "}
                  tons/ha
                </div>
                <div className="text-base font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Average Predicted Yield
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
