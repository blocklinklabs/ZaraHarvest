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
      <div className="w-full space-y-8">
        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden text-center">
          <CardHeader className="p-8 pb-6">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-600/30 dark:shadow-green-600/20 mb-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <CardTitle className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
              Data Submitted Successfully!
            </CardTitle>
            <CardDescription className="text-xl text-gray-600 dark:text-gray-300 font-medium">
              Thank you for contributing to the ZaraHarvest network
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-8">
            <div className="p-6 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-2xl border border-green-200/50 dark:border-green-800/50">
              <p className="text-2xl font-black text-green-600 dark:text-green-400 mb-2">
                Earned {reward} HBAR
              </p>
              <p className="text-base text-gray-600 dark:text-gray-300 font-medium">
                Rewards have been sent to your wallet via smart contract
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-2xl px-8 py-4 font-semibold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                onClick={() => router.push("/dashboard")}
              >
                View Dashboard
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-12 px-6 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                onClick={() => setIsSuccess(false)}
              >
                Submit More Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Analysis Results */}
        {(aiAnalysis || yieldPrediction) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Analysis */}
            {aiAnalysis && (
              <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
                <CardHeader className="p-8 pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-900 dark:text-white">
                    <div className="w-10 h-10 rounded-2xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                      <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    AI Farm Analysis
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                    AI-powered insights about your farm
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                      <Label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Crop Health
                      </Label>
                      <Badge
                        className={`mt-2 ${
                          aiAnalysis.cropHealth === "excellent"
                            ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {aiAnalysis.cropHealth}
                      </Badge>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                      <Label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Soil Quality
                      </Label>
                      <Badge
                        className={`mt-2 ${
                          aiAnalysis.soilQuality === "excellent"
                            ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {aiAnalysis.soilQuality}
                      </Badge>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                      <Label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Disease Risk
                      </Label>
                      <Badge
                        className={`mt-2 ${
                          aiAnalysis.diseaseRisk === "low"
                            ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300"
                            : "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300"
                        }`}
                      >
                        {aiAnalysis.diseaseRisk}
                      </Badge>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                      <Label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Pest Risk
                      </Label>
                      <Badge
                        className={`mt-2 ${
                          aiAnalysis.pestRisk === "low"
                            ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300"
                            : "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300"
                        }`}
                      >
                        {aiAnalysis.pestRisk}
                      </Badge>
                    </div>
                  </div>

                  {aiAnalysis.recommendations &&
                    aiAnalysis.recommendations.length > 0 && (
                      <div className="p-6 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-2xl border border-green-200/50 dark:border-green-800/50">
                        <Label className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                          Recommendations
                        </Label>
                        <ul className="space-y-3">
                          {aiAnalysis.recommendations.map(
                            (rec: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-start gap-3 text-gray-700 dark:text-gray-300 font-medium"
                              >
                                <span className="text-green-600 dark:text-green-400 font-bold text-lg">
                                  •
                                </span>
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
              <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
                <CardHeader className="p-8 pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-900 dark:text-white">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                      <Cloud className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    Yield Prediction
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                    AI-predicted crop yield for your farm
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
                    <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2">
                      {yieldPrediction.predictedYield.toFixed(1)} tons/ha
                    </div>
                    <div className="text-base text-gray-600 dark:text-gray-300 font-medium">
                      Confidence:{" "}
                      {(yieldPrediction.confidence * 100).toFixed(0)}%
                    </div>
                  </div>

                  {yieldPrediction.factors &&
                    yieldPrediction.factors.length > 0 && (
                      <div className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                        <Label className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                          Key Factors
                        </Label>
                        <ul className="space-y-3">
                          {yieldPrediction.factors.map(
                            (factor: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-start gap-3 text-gray-700 dark:text-gray-300 font-medium"
                              >
                                <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                                  •
                                </span>
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
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Submit Farm Data
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mt-2">
            Help improve yield predictions by sharing your farm data
          </p>
        </div>
      </div>

      <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
        <CardHeader className="p-8 pb-6">
          <CardTitle className="flex items-center gap-3 text-3xl font-black text-gray-900 dark:text-white">
            <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
              <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            Farm Data Collection
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
            Earn HBAR tokens by contributing data to the network
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Crop Type */}
            <div className="space-y-3">
              <Label
                htmlFor="cropType"
                className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
              >
                <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                  <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                Crop Type
              </Label>
              <Select
                value={formData.cropType}
                onValueChange={(value) => handleInputChange("cropType", value)}
              >
                <SelectTrigger className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform">
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl rounded-xl">
                  {cropTypes.map((crop) => (
                    <SelectItem
                      key={crop}
                      value={crop}
                      className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <Label
                htmlFor="location"
                className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
              >
                <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                Location
              </Label>
              <Input
                id="location"
                placeholder="Enter your farm location (e.g., Village, District)"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                required
                className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
              />
            </div>

            {/* Soil Moisture */}
            <div className="space-y-3">
              <Label
                htmlFor="soilMoisture"
                className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
              >
                <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                  <Droplets className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
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
                className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
              />
            </div>

            {/* Weather Notes */}
            <div className="space-y-3">
              <Label
                htmlFor="weatherNotes"
                className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
              >
                <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                  <Cloud className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
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
                className="min-h-[120px] px-4 py-3 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform resize-none"
              />
            </div>

            {/* Additional Environmental Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Temperature */}
              <div className="space-y-3">
                <Label
                  htmlFor="temperature"
                  className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                    <Cloud className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
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
                  className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                />
              </div>

              {/* Humidity */}
              <div className="space-y-3">
                <Label
                  htmlFor="humidity"
                  className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                    <Droplets className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
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
                  className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                />
              </div>

              {/* Rainfall */}
              <div className="space-y-3">
                <Label
                  htmlFor="rainfall"
                  className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                    <Cloud className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
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
                  className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                />
              </div>

              {/* Coordinates */}
              <div className="space-y-3">
                <Label
                  htmlFor="coordinates"
                  className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
                >
                  <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  GPS Coordinates (Optional)
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Latitude"
                    value={formData.latitude}
                    onChange={(e) =>
                      handleInputChange("latitude", e.target.value)
                    }
                    className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                  />
                  <Input
                    placeholder="Longitude"
                    value={formData.longitude}
                    onChange={(e) =>
                      handleInputChange("longitude", e.target.value)
                    }
                    className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                  />
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-3">
              <Label
                htmlFor="photo"
                className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
              >
                <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Camera className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </div>
                Farm Photo (Optional)
              </Label>
              <div className="border-2 border-dashed border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 text-center bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm hover:border-green-300/50 dark:hover:border-green-700/50 transition-all duration-200">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-base text-gray-600 dark:text-gray-300 font-medium mb-4">
                  Upload a photo of your farm
                </p>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="max-w-xs mx-auto h-12 px-4 bg-white dark:bg-gray-900 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                />
                {formData.photo && (
                  <Badge className="mt-4 bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-0 px-4 py-2 rounded-xl font-semibold">
                    {formData.photo.name}
                  </Badge>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-2xl px-8 py-4 font-semibold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
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
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                  Submitting...
                </>
              ) : (
                <>
                  <Leaf className="mr-3 h-6 w-6" />
                  Submit Data & Earn HBAR
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Submissions */}
      <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
        <CardHeader className="p-8 pb-6">
          <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-900 dark:text-white">
            <div className="w-10 h-10 rounded-2xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            Your Recent Submissions
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
            Track your data contributions and rewards
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="space-y-4">
            {recentSubmissions.slice(0, 3).map((data, index) => (
              <div
                key={data.id}
                className="flex items-center justify-between p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 transform-gpu will-change-transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                    <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {data.cropType}
                    </p>
                    <p className="text-base text-gray-600 dark:text-gray-300 font-medium">
                      {data.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">
                    +1 HBAR
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {new Date(data.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            {recentSubmissions.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Leaf className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                  No submissions yet. Submit your first farm data above!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
              Why Submit Data?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mb-8 max-w-2xl mx-auto">
              Your data helps improve AI predictions for all farmers. Earn HBAR
              tokens for each submission.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-800/50 transform-gpu will-change-transform hover:scale-105 transition-all duration-300">
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                  Better Predictions
                </p>
                <p className="text-base text-gray-600 dark:text-gray-300 font-medium">
                  Improve AI accuracy
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-2xl border border-green-200/50 dark:border-green-800/50 transform-gpu will-change-transform hover:scale-105 transition-all duration-300">
                <p className="text-lg font-bold text-green-600 dark:text-green-400 mb-2">
                  Earn Rewards
                </p>
                <p className="text-base text-gray-600 dark:text-gray-300 font-medium">
                  Get HBAR tokens
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50/80 to-violet-50/80 dark:from-purple-950/30 dark:to-violet-950/30 backdrop-blur-sm rounded-2xl border border-purple-200/50 dark:border-purple-800/50 transform-gpu will-change-transform hover:scale-105 transition-all duration-300">
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-2">
                  Help Community
                </p>
                <p className="text-base text-gray-600 dark:text-gray-300 font-medium">
                  Support other farmers
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
