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
    photo: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reward, setReward] = useState(0);

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Convert photo to base64 if present
      let photoBase64 = "";
      if (formData.photo) {
        const reader = new FileReader();
        photoBase64 = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(formData.photo!);
        });
      }

      // Add farm data to store
      addFarmData({
        cropType: formData.cropType,
        location: formData.location,
        soilMoisture: parseFloat(formData.soilMoisture),
        weatherNotes: formData.weatherNotes,
        photo: photoBase64,
      });

      // Calculate reward
      const hbarReward = mockHBARReward();
      setReward(hbarReward);

      // Earn badge for data contributor
      if (farmData.length >= 2) {
        // 3rd submission (0-indexed)
        earnBadge("data-contributor");
      }

      setIsSuccess(true);
      toast.success(
        `Data submitted successfully! Earned ${hbarReward.toFixed(2)} HBAR`
      );

      // Reset form after success
      setTimeout(() => {
        setFormData({
          cropType: "",
          location: "",
          soilMoisture: "",
          weatherNotes: "",
          photo: null,
        });
        setIsSuccess(false);
        setReward(0);
      }, 3000);
    } catch (error) {
      console.error("Failed to submit data:", error);
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
      <div className="w-full">
        <Card className="dashboard-card text-center">
          <CardHeader>
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl">
              Data Submitted Successfully!
            </CardTitle>
            <CardDescription>
              Thank you for contributing to the AgriYield network
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <p className="text-lg font-semibold text-green-600">
                Earned {reward.toFixed(2)} HBAR
              </p>
              <p className="text-sm text-muted-foreground">
                Rewards will be added to your wallet
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
            {farmData
              .slice(-3)
              .reverse()
              .map((data, index) => (
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
                      +2.5 HBAR
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {data.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            {farmData.length === 0 && (
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
