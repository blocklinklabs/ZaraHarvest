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
import { useWalletStore } from "@/lib/wallet-provider";
import { formatDate, generateMockYieldPrediction } from "@/lib/utils";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  ArrowLeft,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  BarChart3,
} from "lucide-react";

export default function Prediction() {
  const router = useRouter();
  const { isConnected, account } = useWalletStore();

  // Simulation data - in the future this will come from the database
  const farmData = [
    {
      id: "1",
      cropType: "Maize",
      location: "Kumasi, Ghana",
      soilMoisture: 75,
      weatherNotes: "Sunny with light rain expected",
      timestamp: new Date(),
    },
  ];

  const yieldPredictions = [
    {
      cropType: "Maize",
      predictedYield: 4.2,
      riskLevel: 2,
      confidence: 0.87,
      timestamp: new Date(),
    },
  ];

  const addYieldPrediction = (prediction: any) => {
    console.log("Adding yield prediction:", prediction);
  };

  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState("");

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  const handleGeneratePrediction = async () => {
    if (!selectedCrop) {
      toast.error("Please select a crop type");
      return;
    }

    setIsGenerating(true);
    try {
      // Simulate AI prediction
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const prediction = generateMockYieldPrediction(selectedCrop);
      addYieldPrediction({
        cropType: selectedCrop,
        predictedYield: prediction.predictedYield,
        riskLevel: prediction.riskLevel,
        confidence: prediction.confidence,
      });

      toast.success("Yield prediction generated successfully!");
    } catch (error) {
      console.error("Failed to generate prediction:", error);
      toast.error("Failed to generate prediction. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Chart data
  const yieldData = yieldPredictions.map((pred, index) => ({
    name: `${pred.cropType} ${index + 1}`,
    yield: pred.predictedYield,
    risk: pred.riskLevel,
    confidence: pred.confidence,
  }));

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
  ];

  const cropTypes = ["Maize", "Cocoa", "Rice", "Wheat", "Cassava"];

  if (!isConnected) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Generate New Prediction */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Generate New Prediction
          </CardTitle>
          <CardDescription>
            Get AI-powered yield predictions for your crops
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Select Crop Type
              </label>
              <select
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
              >
                <option value="">Choose a crop...</option>
                {cropTypes.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleGeneratePrediction}
                disabled={isGenerating || !selectedCrop}
                className="w-full sm:w-auto btn-primary"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate Prediction
                  </>
                )}
              </Button>
            </div>
          </div>
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
                    <Bar dataKey="yield" fill="#10b981" name="Yield (tons)" />
                    <Bar dataKey="risk" fill="#ef4444" name="Risk (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Risk Distribution */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Risk Distribution</CardTitle>
              <CardDescription>
                Distribution of risk levels across your predictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {riskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
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
              Generate your first yield prediction to see detailed analytics
            </p>
          </CardContent>
        </Card>
      )}

      {/* Recent Predictions */}
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

                    {/* Recommendations */}
                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-start gap-2">
                        {prediction.riskLevel < 15 ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium text-sm">
                            {prediction.riskLevel < 15
                              ? "Excellent conditions! Your crop is expected to perform well."
                              : prediction.riskLevel < 25
                              ? "Good conditions with some risk factors to monitor."
                              : "High risk detected. Consider additional measures to protect your crop."}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                            Confidence: {prediction.confidence}% | Based on
                            latest farm data and weather patterns
                          </p>
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
                No predictions available. Generate your first prediction above.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
