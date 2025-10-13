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
  const [yieldPredictions, setYieldPredictions] = useState<YieldPrediction[]>([]);
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
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Yield Predictions
            </h1>
            <p className="text-muted-foreground">Loading your data...</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header section for the Yield Predictions page */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Yield Predictions
          </h1>
          <p className="text-muted-foreground">
            AI-powered crop yield predictions and risk analysis
          </p>
        </div>
      </div>

      {/* Card to generate new yield predictions */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Generate New Prediction
          </CardTitle>
          <CardDescription>
            Get AI-powered yield predictions based on your submitted farm data
          </CardDescription>
        </CardHeader>
        <CardContent>
          {farmData.length === 0 ? (
            <div className="text-center py-8">
              <Leaf className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No Farm Data Available
              </h3>
              <p className="text-muted-foreground mb-4">
                You need to submit farm data first to generate predictions.
              </p>
              <Button
                onClick={() => router.push("/submit-data")}
                className="btn-primary"
              >
                Submit Farm Data
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Farm Data to Analyze
                </label>
                <select
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
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
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  {/* Display details of the currently selected farm data */}
                  {(() => {
                    const selectedData = farmData.find(
                      (d) => d.id === selectedFarmData
                    );
                    if (!selectedData) return null;

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-green-600" />
                          <span className="font-medium">Crop:</span>
                          <span>{selectedData.cropType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Location:</span>
                          <span>{selectedData.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Soil Moisture:</span>
                          <span>{selectedData.soilMoisture}%</span>
                        </div>
                        {selectedData.temperature && (
                          <div className="flex items-center gap-2">
                            <Cloud className="h-4 w-4 text-gray-600" />
                            <span className="font-medium">Temperature:</span>
                            <span>{selectedData.temperature}°C</span>
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
                className="w-full btn-primary"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating AI Prediction...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate AI Prediction
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {yieldPredictions.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Yield vs Risk Chart */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Yield vs Risk Analysis</CardTitle>
              <CardDescription>
                Predicted yield and risk levels for your crops
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yieldData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="yield"
                      fill="#10b981"
                      name="Yield (tons/ha)"
                    />
                    <Bar dataKey="risk" fill="#ef4444" name="Risk (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Risk Distribution Chart */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Risk Distribution</CardTitle>
              <CardDescription>
                Distribution of risk levels across your predictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {riskData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value, percent }) =>
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
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📊</div>
                      <p className="text-muted-foreground">
                        No risk data available
                      </p>
                      <p className="text-sm text-muted-foreground">
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
        <Card className="dashboard-card">
          <CardContent className="text-center py-12">
            <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Predictions Yet</h3>
            <p className="text-muted-foreground mb-4">
              Generate your first AI-powered yield prediction to see detailed
              analytics
            </p>
            {farmData.length > 0 && (
              <Button
                onClick={() => document.querySelector("select")?.focus()}
                className="btn-primary"
              >
                Generate First Prediction
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recent Predictions List */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Recent Predictions</CardTitle>
          <CardDescription>
            Your latest yield predictions and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {yieldPredictions.length > 0 ? (
            <div className="space-y-4">
              {/* Display the 5 most recent predictions, newest first */}
              {yieldPredictions
                .slice(-5)
                .reverse()
                .map((prediction, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{prediction.cropType}</h3>
                        <Badge
                          variant={
                            prediction.riskLevel < 15
                              ? "default"
                              : prediction.riskLevel < 25
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {prediction.riskLevel < 15
                            ? "Low Risk"
                            : prediction.riskLevel < 25
                            ? "Medium Risk"
                            : "High Risk"}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">
                        {/* Note: The interface defines 'createdAt', but the code uses 'timestamp'. */}
                        {/* This might result in 'N/A' if prediction.timestamp is not provided by the API. */}
                        {prediction.timestamp
                          ? formatDate(prediction.timestamp)
                          : "N/A"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Predicted Yield
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          {prediction.predictedYield} tons
                        </p>
                      </div>
                      <div className="text-center p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Risk Level
                        </p>
                        <p className="text-2xl font-bold text-orange-600">
                          {prediction.riskLevel}%
                        </p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Confidence
                        </p>
                        <p className="text-2xl font-bold text-blue-600">
                          {prediction.confidence}%
                        </p>
                      </div>
                    </div>

                    {/* AI Insights and Recommendations */}
                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-start gap-2">
                        {prediction.riskLevel < 15 ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {prediction.riskLevel < 15
                              ? "Excellent conditions! Your crop is expected to perform well."
                              : prediction.riskLevel < 25
                              ? "Good conditions with some risk factors to monitor."
                              : "High risk detected. Consider additional measures to protect your crop."}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                            AI Confidence:{" "}
                            {(prediction.confidence * 100).toFixed(0)}% | Model:{" "}
                            {prediction.modelVersion || "Gemini AI"}
                          </p>

                          {/* Show AI factors if available */}
                          {prediction.inputData?.aiFactors && (
                            <div className="mt-2">
                              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Key Factors:
                              </p>
                              <div className="space-y-1">
                                {prediction.inputData.aiFactors
                                  .slice(0, 3)
                                  .map((factor: string, idx: number) => (
                                    <div
                                      key={idx}
                                      className="text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded break-words"
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
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No predictions available. Generate your first AI-powered
                prediction above.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Insights Summary Card */}
      {yieldPredictions.length > 0 && (
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              AI Insights Summary
            </CardTitle>
            <CardDescription>
              Key insights from your yield predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {yieldPredictions.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Predictions
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
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
                <div className="text-sm text-muted-foreground">
                  Average AI Confidence
                </div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {(
                    yieldPredictions.reduce(
                      (acc, p) => acc + p.predictedYield,
                      0
                    ) /
                    yieldPredictions.length
                  ).toFixed(1)}{" "}
                  tons/ha
                </div>
                <div className="text-sm text-muted-foreground">
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
