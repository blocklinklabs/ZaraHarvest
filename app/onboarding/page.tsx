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
          "Welcome to AgriYield! Your data has been saved to the database. Redirecting to dashboard...",
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-950 dark:via-black dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600 dark:bg-green-600 shadow-lg shadow-green-600/30">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Farmer Onboarding
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Let's get you set up on AgriYield
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 space-y-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Main Card */}
          <Card className="border-green-500/20 shadow-2xl shadow-green-500/10">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">
                {currentStep === 1 && "Personal Information"}
                {currentStep === 2 && "Farm Details"}
                {currentStep === 3 && "Connect Wallet"}
                {currentStep === 4 && "Review & Submit"}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
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

            <CardContent className="space-y-6">
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="flex items-center gap-2"
                    >
                      <User className="h-4 w-4 text-green-600 dark:text-green-400" />
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="border-green-500/20 focus:border-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-green-600 dark:text-green-400" />
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
                      className="border-green-500/20 focus:border-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
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
                      className="border-green-500/20 focus:border-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="country"
                      className="flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                      Country
                    </Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) =>
                        handleInputChange("country", value)
                      }
                    >
                      <SelectTrigger className="border-green-500/20">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem
                            key={country}
                            value={country.toLowerCase()}
                          >
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="location"
                      className="flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
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
                      className="border-green-500/20 focus:border-green-500"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Farm Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="cropType"
                      className="flex items-center gap-2"
                    >
                      <Sprout className="h-4 w-4 text-green-600 dark:text-green-400" />
                      Primary Crop Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.cropType}
                      onValueChange={(value) =>
                        handleInputChange("cropType", value)
                      }
                    >
                      <SelectTrigger className="border-green-500/20">
                        <SelectValue placeholder="Select your main crop" />
                      </SelectTrigger>
                      <SelectContent>
                        {cropTypes.map((crop) => (
                          <SelectItem key={crop} value={crop.toLowerCase()}>
                            {crop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="farmSize"
                      className="flex items-center gap-2"
                    >
                      <Sprout className="h-4 w-4 text-green-600 dark:text-green-400" />
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
                      className="border-green-500/20 focus:border-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="farmingExperience"
                      className="flex items-center gap-2"
                    >
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
                      className="border-green-500/20 focus:border-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="additionalInfo"
                      className="flex items-center gap-2"
                    >
                      Additional Information (Optional)
                    </Label>
                    <Textarea
                      id="additionalInfo"
                      placeholder="Tell us more about your farm..."
                      value={formData.additionalInfo}
                      onChange={(e) =>
                        handleInputChange("additionalInfo", e.target.value)
                      }
                      className="border-green-500/20 focus:border-green-500 min-h-[100px]"
                    />
                  </div>

                  <Alert className="border-green-500/30 bg-green-50 dark:bg-green-950/30">
                    <Info className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertDescription className="text-green-800 dark:text-green-300">
                      Your farm data helps us provide personalized AI
                      predictions and recommendations.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Step 3: Connect Wallet */}
              {currentStep === 3 && (
                <div className="space-y-6 text-center py-8">
                  {!isConnected ? (
                    <>
                      <div className="w-24 h-24 mx-auto rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                        <Wallet className="h-12 w-12 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Connect Your Wallet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Link your Web3 wallet to secure your account and
                          enable blockchain features
                        </p>
                      </div>
                      <Button
                        size="lg"
                        onClick={handleConnectWallet}
                        className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-lg shadow-green-600/30"
                      >
                        <Wallet className="mr-2 h-5 w-5" />
                        <span>Connect Wallet</span>
                      </Button>
                      <Alert className="border-amber-500/30 bg-amber-50 dark:bg-amber-950/30">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <AlertDescription className="text-amber-800 dark:text-amber-300">
                          Make sure you have MetaMask or another Web3 wallet
                          installed
                        </AlertDescription>
                      </Alert>
                    </>
                  ) : (
                    <>
                      <div className="w-24 h-24 mx-auto rounded-full bg-green-600 dark:bg-green-600 flex items-center justify-center shadow-lg shadow-green-600/30">
                        <CheckCircle className="h-12 w-12 text-white" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
                          Wallet Connected!
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {account?.address.slice(0, 10)}...
                          {account?.address.slice(-8)}
                        </p>
                      </div>
                      <Alert className="border-green-500/30 bg-green-50 dark:bg-green-950/30">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800 dark:text-green-300">
                          Your wallet is successfully connected. Proceed to
                          complete registration.
                        </AlertDescription>
                      </Alert>
                    </>
                  )}
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <Alert className="border-green-500/30 bg-green-50 dark:bg-green-950/30">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800 dark:text-green-300">
                      Please review your information before submitting
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Full Name
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formData.fullName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Email
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formData.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Location
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formData.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Country
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formData.country || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Primary Crop
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formData.cropType}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Farm Size
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formData.farmSize} acres
                        </p>
                      </div>
                    </div>

                    <Separator className="bg-green-500/20" />

                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Wallet Address
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white break-all">
                        {account?.address}
                      </p>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-lg shadow-green-600/30"
                  >
                    {isSubmitting ? (
                      <>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        <span>Complete Registration</span>
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="border-green-500/20"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    <span>Back</span>
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!validateStep(currentStep)}
                    className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white"
                  >
                    <span>Next</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Need help?{" "}
              <Button
                variant="link"
                className="text-green-600 dark:text-green-400 p-0 h-auto"
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
