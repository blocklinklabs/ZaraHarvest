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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useWalletStore } from "@/lib/wallet-provider";
import { mockHBARReward } from "@/lib/utils";
import { toast } from "sonner";
import { AgriYieldHelper } from "@/lib/contract";
import { ethers } from "ethers";
import {
  Leaf,
  MapPin,
  Droplets,
  Cloud,
  Camera,
  Upload,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

export default function SubmitData() {
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

  const addFarmData = (data: any) => {
    console.log("Adding farm data:", data);
  };

  const earnBadge = (badgeId: string) => {
    console.log("Earning badge:", badgeId);
  };

  const [formData, setFormData] = useState({
    cropType: "",
    location: "",
    soilMoisture: "",
    weatherNotes: "",
    latitude: "",
    longitude: "",
    temperature: "",
    humidity: "",
    rainfall: "",
    photo: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reward, setReward] = useState(0);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [yieldPrediction, setYieldPrediction] = useState<any>(null);
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    } else {
      fetchRecentSubmissions();
    }
  }, [isConnected, router]);

  const fetchRecentSubmissions = async () => {
    if (!account?.address) return;

    try {
      const response = await fetch(
        `/api/farm-data/submit?walletAddress=${account.address}`
      );

      if (response.ok) {
        const data = await response.json();
        // Parse JSON strings for aiAnalysis
        const parsedSubmissions = (data.data || []).map((submission: any) => ({
          ...submission,
          aiAnalysis: submission.aiAnalysis
            ? JSON.parse(submission.aiAnalysis)
            : null,
        }));
        setRecentSubmissions(parsedSubmissions.slice(0, 3)); // Get last 3 submissions
      }
    } catch (error) {
      console.error("Error fetching recent submissions:", error);
    }
  };

  const cropTypes = [
    "Maize",
    "Cocoa",
    "Rice",
    "Wheat",
    "Cassava",
    "Sorghum",
    "Millet",
    "Groundnut",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for API submission
      const submitData = new FormData();
      submitData.append("walletAddress", account?.address || "");
      submitData.append("cropType", formData.cropType);
      submitData.append("location", formData.location);
      submitData.append("soilMoisture", formData.soilMoisture);
      submitData.append("weatherNotes", formData.weatherNotes);

      if (formData.latitude) submitData.append("latitude", formData.latitude);
      if (formData.longitude)
        submitData.append("longitude", formData.longitude);
      if (formData.temperature)
        submitData.append("temperature", formData.temperature);
      if (formData.humidity) submitData.append("humidity", formData.humidity);
      if (formData.rainfall) submitData.append("rainfall", formData.rainfall);

      if (formData.photo) {
        submitData.append("photo", formData.photo);
      }

      // Submit to API
      const response = await fetch("/api/farm-data/submit", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit farm data");
      }

      const result = await response.json();

      // Set AI analysis results
      if (result.data.aiAnalysis) {
        setAiAnalysis(result.data.aiAnalysis);
      }

      if (result.data.yieldPrediction) {
        setYieldPrediction(result.data.yieldPrediction);
      }

      // Reward user with 1 HBAR using backend API
      try {
        console.log("🌾 Sending real HBAR reward via API...");

        // Call the backend API to send HBAR reward
        const rewardResponse = await fetch("/api/rewards/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            walletAddress: account?.address,
            amount: "1", // 1 HBAR
          }),
        });

        if (!rewardResponse.ok) {
          const errorData = await rewardResponse.json();
          throw new Error(errorData.error || "Failed to send reward");
        }

        const rewardData = await rewardResponse.json();

        if (rewardData.success) {
          setReward(1); // 1 HBAR reward
          toast.success(
            `🎉 Data submitted successfully! Earned 1 HBAR (Transaction: ${rewardData.data.transactionHash})`
          );
          console.log("✅ Real HBAR reward sent:", rewardData.data);
        } else {
          throw new Error("Reward transaction failed");
        }
      } catch (rewardError) {
        console.error("❌ HBAR reward failed:", rewardError);
        const errorMessage =
          rewardError instanceof Error ? rewardError.message : "Unknown error";
        toast.error(`Failed to send HBAR reward: ${errorMessage}`);

        // Still show success for data submission
        setReward(0);
        toast.success(
          "Data submitted successfully! (Reward failed - contact support)"
        );
      }

      // Earn badge for data contributor
      if (recentSubmissions.length >= 2) {
        earnBadge("data-contributor");
      }

      setIsSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setFormData({
          cropType: "",
          location: "",
          soilMoisture: "",
          weatherNotes: "",
          latitude: "",
          longitude: "",
          temperature: "",
          humidity: "",
          rainfall: "",
          photo: null,
        });
        setIsSuccess(false);
        setReward(0);
        setAiAnalysis(null);
        setYieldPrediction(null);
        // Refresh recent submissions
        fetchRecentSubmissions();
      }, 5000);
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to submit data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isConnected) {
    return null;
  }

  if (isSuccess) {
    return (
      <div className="w-full space-y-6">
        <Card className="dashboard-card text-center">
          <CardHeader>
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl">
              Data Submitted Successfully!
            </CardTitle>
            <CardDescription>
              Thank you for contributing to the ZaraHarvest network
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <p className="text-lg font-semibold text-green-600">
                Earned {reward} HBAR
              </p>
              <p className="text-sm text-muted-foreground">
                Rewards have been sent to your wallet via smart contract
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                className="flex-1 btn-primary"
                onClick={() => router.push("/dashboard")}
              >
                View Dashboard
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsSuccess(false)}
              >
                Submit More Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Analysis Results */}
        {(aiAnalysis || yieldPrediction) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Analysis */}
            {aiAnalysis && (
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5" />
                    AI Farm Analysis
                  </CardTitle>
                  <CardDescription>
                    AI-powered insights about your farm
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Crop Health</Label>
                      <Badge
                        variant={
                          aiAnalysis.cropHealth === "excellent"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {aiAnalysis.cropHealth}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Soil Quality
                      </Label>
                      <Badge
                        variant={
                          aiAnalysis.soilQuality === "excellent"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {aiAnalysis.soilQuality}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Disease Risk
                      </Label>
                      <Badge
                        variant={
                          aiAnalysis.diseaseRisk === "low"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {aiAnalysis.diseaseRisk}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Pest Risk</Label>
                      <Badge
                        variant={
                          aiAnalysis.pestRisk === "low"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {aiAnalysis.pestRisk}
                      </Badge>
                    </div>
                  </div>

                  {aiAnalysis.recommendations &&
                    aiAnalysis.recommendations.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium">
                          Recommendations
                        </Label>
                        <ul className="text-sm text-muted-foreground mt-1">
                          {aiAnalysis.recommendations.map(
                            (rec: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <span className="text-green-600">•</span>
                                {rec}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                </CardContent>
              </Card>
            )}

            {/* Yield Prediction */}
            {yieldPrediction && (
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="h-5 w-5" />
                    Yield Prediction
                  </CardTitle>
                  <CardDescription>
                    AI-predicted crop yield for your farm
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {yieldPrediction.predictedYield.toFixed(1)} tons/ha
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Confidence:{" "}
                      {(yieldPrediction.confidence * 100).toFixed(0)}%
                    </div>
                  </div>

                  {yieldPrediction.factors &&
                    yieldPrediction.factors.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium">
                          Key Factors
                        </Label>
                        <ul className="text-sm text-muted-foreground mt-1">
                          {yieldPrediction.factors.map(
                            (factor: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <span className="text-blue-600">•</span>
                                {factor}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
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
            Submit Farm Data
          </h1>
          <p className="text-muted-foreground">
            Help improve yield predictions by sharing your farm data
          </p>
        </div>
      </div>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            Farm Data Collection
          </CardTitle>
          <CardDescription>
            Earn HBAR tokens by contributing data to the network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Crop Type */}
            <div className="space-y-2">
              <Label htmlFor="cropType" className="flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                Crop Type
              </Label>
              <Select
                value={formData.cropType}
                onValueChange={(value) => handleInputChange("cropType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop} value={crop}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                id="location"
                placeholder="Enter your farm location (e.g., Village, District)"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                required
              />
            </div>

            {/* Soil Moisture */}
            <div className="space-y-2">
              <Label htmlFor="soilMoisture" className="flex items-center gap-2">
                <Droplets className="h-4 w-4" />
                Soil Moisture (%)
              </Label>
              <Input
                id="soilMoisture"
                type="number"
                min="0"
                max="100"
                placeholder="Enter soil moisture percentage"
                value={formData.soilMoisture}
                onChange={(e) =>
                  handleInputChange("soilMoisture", e.target.value)
                }
                required
              />
            </div>

            {/* Weather Notes */}
            <div className="space-y-2">
              <Label htmlFor="weatherNotes" className="flex items-center gap-2">
                <Cloud className="h-4 w-4" />
                Weather Notes
              </Label>
              <Textarea
                id="weatherNotes"
                placeholder="Describe recent weather conditions, rainfall, temperature, etc."
                value={formData.weatherNotes}
                onChange={(e) =>
                  handleInputChange("weatherNotes", e.target.value)
                }
                rows={3}
              />
            </div>

            {/* Additional Environmental Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Temperature */}
              <div className="space-y-2">
                <Label
                  htmlFor="temperature"
                  className="flex items-center gap-2"
                >
                  <Cloud className="h-4 w-4" />
                  Temperature (°C)
                </Label>
                <Input
                  id="temperature"
                  type="number"
                  placeholder="Current temperature"
                  value={formData.temperature}
                  onChange={(e) =>
                    handleInputChange("temperature", e.target.value)
                  }
                />
              </div>

              {/* Humidity */}
              <div className="space-y-2">
                <Label htmlFor="humidity" className="flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  Humidity (%)
                </Label>
                <Input
                  id="humidity"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Humidity percentage"
                  value={formData.humidity}
                  onChange={(e) =>
                    handleInputChange("humidity", e.target.value)
                  }
                />
              </div>

              {/* Rainfall */}
              <div className="space-y-2">
                <Label htmlFor="rainfall" className="flex items-center gap-2">
                  <Cloud className="h-4 w-4" />
                  Rainfall (mm)
                </Label>
                <Input
                  id="rainfall"
                  type="number"
                  placeholder="Recent rainfall"
                  value={formData.rainfall}
                  onChange={(e) =>
                    handleInputChange("rainfall", e.target.value)
                  }
                />
              </div>

              {/* Coordinates */}
              <div className="space-y-2">
                <Label
                  htmlFor="coordinates"
                  className="flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4" />
                  GPS Coordinates (Optional)
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Latitude"
                    value={formData.latitude}
                    onChange={(e) =>
                      handleInputChange("latitude", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Longitude"
                    value={formData.longitude}
                    onChange={(e) =>
                      handleInputChange("longitude", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label htmlFor="photo" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Farm Photo (Optional)
              </Label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Upload a photo of your farm
                </p>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="max-w-xs mx-auto"
                />
                {formData.photo && (
                  <Badge variant="secondary" className="mt-2">
                    {formData.photo.name}
                  </Badge>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full btn-primary"
              size="lg"
              disabled={
                isSubmitting ||
                !formData.cropType ||
                !formData.location ||
                !formData.soilMoisture
              }
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Leaf className="mr-2 h-4 w-4" />
                  Submit Data & Earn HBAR
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Submissions */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Your Recent Submissions
          </CardTitle>
          <CardDescription>
            Track your data contributions and rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentSubmissions.slice(0, 3).map((data, index) => (
              <div
                key={data.id}
                className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{data.cropType}</p>
                    <p className="text-sm text-muted-foreground">
                      {data.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">
                    +1 HBAR
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(data.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            {recentSubmissions.length === 0 && (
              <div className="text-center py-8">
                <Leaf className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No submissions yet. Submit your first farm data above!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="dashboard-card">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Why Submit Data?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your data helps improve AI predictions for all farmers. Earn HBAR
              tokens for each submission.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="font-semibold text-blue-600">
                  Better Predictions
                </p>
                <p className="text-muted-foreground">Improve AI accuracy</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <p className="font-semibold text-green-600">Earn Rewards</p>
                <p className="text-muted-foreground">Get HBAR tokens</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <p className="font-semibold text-purple-600">Help Community</p>
                <p className="text-muted-foreground">Support other farmers</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

