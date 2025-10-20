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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
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
  User,
  MapPin,
  Mail,
  Sprout,
  Wallet,
  Check,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Leaf,
  Info,
} from "lucide-react";
import { toast } from "sonner";

export default function Onboarding() {
  const router = useRouter();
  const { isConnected, account, connect, setConnecting, setError } =
    useWalletStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    country: "",
    cropType: "",
    farmSize: "",
    farmingExperience: "",
    additionalInfo: "",
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    // If already onboarded, redirect to dashboard
    if (typeof window !== "undefined") {
      const isOnboarded = localStorage.getItem("farmerOnboarded");
      if (isOnboarded === "true" && isConnected) {
        router.push("/dashboard");
      }
    }
  }, [isConnected, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleConnectWallet = async () => {
    try {
      setConnecting(true);
      setError(null);

      if (!window.ethereum) {
        throw new Error(
          "MetaMask or another Web3 wallet is not installed. Please install one to continue."
        );
      }

      const walletAccount = await walletProvider.connectWallet();
      connect(walletAccount);

      toast.success("Wallet Connected!", {
        description: `Connected to ${walletAccount.address.slice(
          0,
          6
        )}...${walletAccount.address.slice(-4)}`,
        icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      });

      // Auto-advance to next step
      setTimeout(() => setCurrentStep(4), 500);
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

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.fullName && formData.email && formData.location);
      case 2:
        return !!(formData.cropType && formData.farmSize);
      case 3:
        return isConnected;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    } else {
      toast.error("Please fill in all required fields", {
        icon: <AlertCircle className="h-4 w-4 text-red-500" />,
      });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first", {
        icon: <AlertCircle className="h-4 w-4 text-red-500" />,
      });
      return;
    }

    if (!account?.address) {
      toast.error("Wallet address not found", {
        icon: <AlertCircle className="h-4 w-4 text-red-500" />,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to database via API
      const response = await fetch("/api/user/onboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: account.address,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          country: formData.country,
          cropType: formData.cropType,
          farmSize: formData.farmSize,
          farmingExperience: formData.farmingExperience,
          additionalInfo: formData.additionalInfo,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save user data");
      }

      const result = await response.json();

      // Also save to localStorage for immediate access (fallback)
      const farmerData = {
        ...formData,
        walletAddress: account.address,
        registeredAt: new Date().toISOString(),
        userId: result.user.id,
      };

      localStorage.setItem("farmerData", JSON.stringify(farmerData));
      localStorage.setItem("farmerOnboarded", "true");

      toast.success("Registration Complete!", {
        description:
          "Welcome to ZaraHarvest! Your data has been saved to the database. Redirecting to dashboard...",
        icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      });

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error: any) {
      console.error("Onboarding error:", error);
      toast.error("Registration Failed", {
        description: error.message || "An error occurred. Please try again.",
        icon: <AlertCircle className="h-4 w-4 text-red-500" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const cropTypes = [
    "Maize",
    "Rice",
    "Wheat",
    "Cassava",
    "Yam",
    "Cocoa",
    "Coffee",
    "Cotton",
    "Sorghum",
    "Millet",
    "Beans",
    "Other",
  ];

  const countries = [
    "Ghana",
    "Nigeria",
    "Kenya",
    "Uganda",
    "Tanzania",
    "Rwanda",
    "Ethiopia",
    "South Africa",
    "Other",
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-2xl shadow-green-600/30 dark:shadow-green-600/20 transform-gpu will-change-transform">
              <img
                src="/logo.png"
                alt="ZaraHarvest Logo"
                className="w-12 h-12 object-contain"
              />
            </div>
            <div className="space-y-3">
              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                Welcome to ZaraHarvest
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
                Let's get you set up with the future of African agriculture
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-12 space-y-4">
            <div className="flex justify-between text-base font-semibold text-gray-700 dark:text-gray-300">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-green-600 dark:text-green-400">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500 ease-out shadow-lg shadow-green-500/30"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Main Card */}
          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
            <CardHeader className="p-8 pb-6">
              <CardTitle className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-3">
                {currentStep === 1 && "Personal Information"}
                {currentStep === 2 && "Farm Details"}
                {currentStep === 3 && "Connect Wallet"}
                {currentStep === 4 && "Review & Submit"}
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                {currentStep === 1 &&
                  "Tell us about yourself to personalize your experience"}
                {currentStep === 2 &&
                  "Share your farm information for better insights"}
                {currentStep === 3 &&
                  "Connect your Web3 wallet to secure your account"}
                {currentStep === 4 &&
                  "Review your information and complete registration"}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8 pt-0 space-y-8">
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="fullName"
                      className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
                    >
                      <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                        <User className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
                    >
                      <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                        <Mail className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="phone"
                      className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
                    >
                      <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      Phone Number (Optional)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+233 20 123 4567"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="country"
                      className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
                    >
                      <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      Country
                    </Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) =>
                        handleInputChange("country", value)
                      }
                    >
                      <SelectTrigger className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl rounded-xl">
                        {countries.map((country) => (
                          <SelectItem
                            key={country}
                            value={country.toLowerCase()}
                            className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="location"
                      className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
                    >
                      <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      Location (City/Region){" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="location"
                      placeholder="e.g., Kumasi, Ashanti Region"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Farm Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="cropType"
                      className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
                    >
                      <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                        <Sprout className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      Primary Crop Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.cropType}
                      onValueChange={(value) =>
                        handleInputChange("cropType", value)
                      }
                    >
                      <SelectTrigger className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform">
                        <SelectValue placeholder="Select your main crop" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl rounded-xl">
                        {cropTypes.map((crop) => (
                          <SelectItem
                            key={crop}
                            value={crop.toLowerCase()}
                            className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            {crop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="farmSize"
                      className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
                    >
                      <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                        <Sprout className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      Farm Size (in acres){" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="farmSize"
                      type="number"
                      placeholder="e.g., 5"
                      value={formData.farmSize}
                      onChange={(e) =>
                        handleInputChange("farmSize", e.target.value)
                      }
                      className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="farmingExperience"
                      className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
                    >
                      <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      Years of Farming Experience
                    </Label>
                    <Input
                      id="farmingExperience"
                      type="number"
                      placeholder="e.g., 10"
                      value={formData.farmingExperience}
                      onChange={(e) =>
                        handleInputChange("farmingExperience", e.target.value)
                      }
                      className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="additionalInfo"
                      className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white"
                    >
                      <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      Additional Information (Optional)
                    </Label>
                    <Textarea
                      id="additionalInfo"
                      placeholder="Tell us more about your farm..."
                      value={formData.additionalInfo}
                      onChange={(e) =>
                        handleInputChange("additionalInfo", e.target.value)
                      }
                      className="min-h-[120px] px-4 py-3 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform resize-none"
                    />
                  </div>

                  <Alert className="border-green-200/50 dark:border-green-800/50 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Info className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <AlertDescription className="text-green-800 dark:text-green-300 font-medium leading-relaxed">
                        Your farm data helps us provide personalized AI
                        predictions and recommendations tailored to your
                        specific farming conditions.
                      </AlertDescription>
                    </div>
                  </Alert>
                </div>
              )}

              {/* Step 3: Connect Wallet */}
              {currentStep === 3 && (
                <div className="space-y-8 text-center py-12">
                  {!isConnected ? (
                    <>
                      <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50 flex items-center justify-center shadow-2xl shadow-green-500/20">
                        <Wallet className="h-16 w-16 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white">
                          Connect Your Wallet
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300 font-medium max-w-md mx-auto leading-relaxed">
                          Link your Web3 wallet to secure your account and
                          enable blockchain features
                        </p>
                      </div>
                      <Button
                        size="lg"
                        onClick={handleConnectWallet}
                        className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-2xl px-8 py-4 font-semibold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                      >
                        <Wallet className="mr-3 h-6 w-6" />
                        <span>Connect Wallet</span>
                      </Button>
                      <Alert className="border-amber-200/50 dark:border-amber-800/50 bg-gradient-to-br from-amber-50/80 to-yellow-50/80 dark:from-amber-950/30 dark:to-yellow-950/30 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          <AlertDescription className="text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
                            Make sure you have MetaMask or another Web3 wallet
                            installed
                          </AlertDescription>
                        </div>
                      </Alert>
                    </>
                  ) : (
                    <>
                      <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-600/30 dark:shadow-green-600/20">
                        <CheckCircle className="h-16 w-16 text-white" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-3xl font-black text-green-600 dark:text-green-400">
                          Wallet Connected!
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300 font-medium font-mono bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl inline-block">
                          {account?.address.slice(0, 10)}...
                          {account?.address.slice(-8)}
                        </p>
                      </div>
                      <Alert className="border-green-200/50 dark:border-green-800/50 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <AlertDescription className="text-green-800 dark:text-green-300 font-medium leading-relaxed">
                            Your wallet is successfully connected. Proceed to
                            complete registration.
                          </AlertDescription>
                        </div>
                      </Alert>
                    </>
                  )}
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <Alert className="border-green-200/50 dark:border-green-800/50 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <AlertDescription className="text-green-800 dark:text-green-300 font-medium leading-relaxed">
                        Please review your information before submitting
                      </AlertDescription>
                    </div>
                  </Alert>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                          Full Name
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {formData.fullName}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                          Email
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {formData.email}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                          Location
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {formData.location}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                          Country
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {formData.country || "Not specified"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                          Primary Crop
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {formData.cropType}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                          Farm Size
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {formData.farmSize} acres
                        </p>
                      </div>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                        Wallet Address
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white font-mono break-all">
                        {account?.address}
                      </p>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-2xl px-8 py-4 font-semibold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Check className="mr-3 h-6 w-6" />
                        <span>Complete Registration</span>
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex justify-between pt-8">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="h-12 px-6 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    <span>Back</span>
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!validateStep(currentStep)}
                    className="h-12 px-8 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <span>Next</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-base text-gray-600 dark:text-gray-300 font-medium">
              Need help?{" "}
              <Button
                variant="link"
                className="text-green-600 dark:text-green-400 p-0 h-auto font-semibold hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200"
                onClick={() => router.push("/")}
              >
                Return to Home
              </Button>
            </p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
