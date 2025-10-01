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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";
import { formatCurrency, formatDate, calculateLoanInterest } from "@/lib/utils";
import { toast } from "sonner";
import {
  DollarSign,
  ArrowLeft,
  Shield,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  CreditCard,
  Coins,
} from "lucide-react";

export default function Lending() {
  const router = useRouter();
  const {
    wallet,
    yieldPredictions,
    loans,
    harvestTokens,
    addLoan,
    addHarvestToken,
    earnBadge,
  } = useAppStore();

  const [loanAmount, setLoanAmount] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTokenizing, setIsTokenizing] = useState(false);

  useEffect(() => {
    if (!wallet.isConnected) {
      router.push("/");
    }
  }, [wallet.isConnected, router]);

  const availableLoans = [
    {
      id: "loan-1",
      amount: 500,
      interestRate: 5.5,
      term: "6 months",
      collateral: "Maize harvest tokens",
      description: "Low-risk loan for established farmers",
    },
    {
      id: "loan-2",
      amount: 1000,
      interestRate: 7.2,
      term: "12 months",
      collateral: "Cocoa harvest tokens",
      description: "Medium-term loan for crop expansion",
    },
    {
      id: "loan-3",
      amount: 2000,
      interestRate: 9.8,
      term: "18 months",
      collateral: "Mixed harvest tokens",
      description: "Long-term loan for farm improvements",
    },
  ];

  const handleApplyLoan = async (loan: (typeof availableLoans)[0]) => {
    setIsProcessing(true);
    try {
      // Simulate loan application
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Add loan to store
      addLoan({
        amount: loan.amount,
        interestRate: loan.interestRate,
        status: "active",
        collateral: [selectedCrop],
        startDate: new Date(),
        endDate: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000), // 6 months
      });

      // Earn badge for first loan
      if (loans.length === 0) {
        earnBadge("loan-borrower");
      }

      toast.success(`Loan of ${formatCurrency(loan.amount)} approved!`);
    } catch (error) {
      console.error("Failed to apply for loan:", error);
      toast.error("Failed to apply for loan. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTokenizeHarvest = async () => {
    if (!selectedCrop || !loanAmount) {
      toast.error("Please select a crop and enter amount");
      return;
    }

    setIsTokenizing(true);
    try {
      // Simulate tokenization
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Add harvest token
      addHarvestToken({
        cropType: selectedCrop,
        amount: parseFloat(loanAmount),
        tokenizedAmount: parseFloat(loanAmount) * 10, // 1 ton = 10 tokens
        status: "tokenized",
      });

      // Earn badge for first tokenization
      if (harvestTokens.length === 0) {
        earnBadge("token-holder");
      }

      toast.success("Harvest tokenized successfully!");
    } catch (error) {
      console.error("Failed to tokenize harvest:", error);
      toast.error("Failed to tokenize harvest. Please try again.");
    } finally {
      setIsTokenizing(false);
    }
  };

  const activeLoan = loans.find((loan) => loan.status === "active");
  const userYieldPredictions = yieldPredictions.filter(
    (pred) => pred.cropType === selectedCrop
  );
  const latestPrediction =
    userYieldPredictions[userYieldPredictions.length - 1];

  if (!wallet.isConnected) {
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
            Lending & Tokenization
          </h1>
          <p className="text-muted-foreground">
            Access loans using your harvest as collateral
          </p>
        </div>
      </div>

      {/* Active Loan Status */}
      {activeLoan && (
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Active Loan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    {formatCurrency(activeLoan.amount)}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Interest Rate: {activeLoan.interestRate}% APR
                  </p>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Start Date</p>
                  <p className="font-semibold">
                    {activeLoan.startDate
                      ? formatDate(activeLoan.startDate)
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Due Date</p>
                  <p className="font-semibold">
                    {activeLoan.endDate
                      ? formatDate(activeLoan.endDate)
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tokenize Harvest */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5" />
              Tokenize Your Harvest
            </CardTitle>
            <CardDescription>
              Convert your harvest into tradeable tokens for collateral
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Select Crop</label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose crop to tokenize" />
                </SelectTrigger>
                <SelectContent>
                  {["Maize", "Cocoa", "Rice", "Wheat", "Cassava"].map(
                    (crop) => (
                      <SelectItem key={crop} value={crop}>
                        {crop}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Harvest Amount (tons)
              </label>
              <Input
                type="number"
                placeholder="Enter harvest amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>

            {latestPrediction && (
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">
                    Yield Prediction Available
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Predicted yield: {latestPrediction.predictedYield} tons
                  <br />
                  Risk level: {latestPrediction.riskLevel}%
                </p>
              </div>
            )}

            <Button
              className="w-full btn-primary"
              onClick={handleTokenizeHarvest}
              disabled={isTokenizing || !selectedCrop || !loanAmount}
            >
              {isTokenizing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Tokenizing...
                </>
              ) : (
                <>
                  <Coins className="mr-2 h-4 w-4" />
                  Tokenize Harvest
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Available Loans */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Available Loans
            </CardTitle>
            <CardDescription>
              Apply for loans using your tokenized harvest as collateral
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableLoans.map((loan) => (
              <div
                key={loan.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">
                    {formatCurrency(loan.amount)}
                  </h3>
                  <Badge variant="outline">{loan.term}</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {loan.description}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Interest Rate
                    </p>
                    <p className="font-semibold">{loan.interestRate}% APR</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Collateral
                    </p>
                    <p className="font-semibold">{loan.collateral}</p>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleApplyLoan(loan)}
                  disabled={isProcessing || !!activeLoan}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Apply for Loan
                    </>
                  )}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Tokenized Assets */}
      {harvestTokens.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Your Tokenized Assets
            </CardTitle>
            <CardDescription>
              Manage your tokenized harvest assets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {harvestTokens.map((token) => (
                <div
                  key={token.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{token.cropType}</h3>
                      <Badge
                        variant={
                          token.status === "tokenized" ? "default" : "secondary"
                        }
                      >
                        {token.status}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(new Date())}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Physical Amount
                      </p>
                      <p className="font-semibold">{token.amount} tons</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Tokenized Amount
                      </p>
                      <p className="font-semibold">
                        {token.tokenizedAmount} tokens
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Section */}
      <Card className="mt-8">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-semibold mb-4">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">1. Tokenize</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Convert your harvest into blockchain tokens
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="font-semibold">2. Collateral</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Use tokens as collateral for loans
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold">3. Access Funds</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Get immediate access to capital
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
