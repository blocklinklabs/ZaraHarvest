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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useWalletStore } from "@/lib/wallet-provider";
import { formatCurrency, formatDate } from "@/lib/utils";
import { AgriYieldHelper } from "@/lib/contract";
import { toast } from "sonner";
import { ethers } from "ethers";
import NetworkSetup from "@/components/NetworkSetup";
import {
  DollarSign,
  ArrowLeft,
  Shield,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  CreditCard,
  Coins,
  ExternalLink,
  Lock,
  Unlock,
} from "lucide-react";

interface YieldPrediction {
  id: string;
  cropType: string;
  predictedYield: number;
  riskLevel: number;
  confidence: number;
  createdAt: string;
}

interface Loan {
  id: string;
  blockchainLoanId?: string;
  amount: number;
  interestRate: number;
  status: "pending" | "active" | "completed" | "defaulted";
  collateral: string[];
  collateralPredictionId?: string;
  startDate: string;
  endDate: string;
  repaidAmount: number;
  blockchainTxHash?: string;
  createdAt: string;
}

interface HarvestToken {
  id: string;
  yieldPredictionId?: string;
  cropType: string;
  amount: number;
  tokenizedAmount: number;
  qualityGrade?: string;
  status: "pending" | "tokenized" | "sold" | "burned" | "locked";
  isLocked: boolean;
  qrCode: string;
  metadataURI?: string;
  blockchainTokenId?: string;
  blockchainTxHash?: string;
  createdAt: string;
}

export default function Lending() {
  const router = useRouter();
  const { isConnected, account } = useWalletStore();

  const [yieldPredictions, setYieldPredictions] = useState<YieldPrediction[]>(
    []
  );
  const [loans, setLoans] = useState<Loan[]>([]);
  const [harvestTokens, setHarvestTokens] = useState<HarvestToken[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Tokenization form state
  const [selectedPrediction, setSelectedPrediction] = useState("");
  const [harvestAmount, setHarvestAmount] = useState("");
  const [qualityGrade, setQualityGrade] = useState("A");
  const [isTokenizing, setIsTokenizing] = useState(false);

  // Loan form state
  const [selectedToken, setSelectedToken] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Repayment state
  const [repayAmount, setRepayAmount] = useState("");
  const [isRepaying, setIsRepaying] = useState(false);
  const [repayModalOpen, setRepayModalOpen] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    } else {
      fetchData();
    }
  }, [isConnected, router, account]);

  const fetchData = async () => {
    if (!account?.address) return;

    setIsLoading(true);
    try {
      // Fetch yield predictions
      const predictionsResponse = await fetch(
        `/api/yield-predictions?walletAddress=${account.address}`
      );
      if (predictionsResponse.ok) {
        const predictionsResult = await predictionsResponse.json();
        setYieldPredictions(predictionsResult.data || []);
      }

      // Fetch loans
      const loansResponse = await fetch(
        `/api/loans?walletAddress=${account.address}`
      );
      if (loansResponse.ok) {
        const loansResult = await loansResponse.json();
        setLoans(loansResult.data || []);
      }

      // Fetch harvest tokens
      const tokensResponse = await fetch(
        `/api/harvest-tokens?walletAddress=${account.address}`
      );
      if (tokensResponse.ok) {
        const tokensResult = await tokensResponse.json();
        setHarvestTokens(tokensResult.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenizeHarvest = async () => {
    if (!selectedPrediction || !harvestAmount) {
      toast.error("Please select a yield prediction and enter harvest amount");
      return;
    }

    if (!account?.address) {
      toast.error("Wallet not connected");
      return;
    }

    setIsTokenizing(true);
    try {
      const prediction = yieldPredictions.find(
        (p) => p.id === selectedPrediction
      );
      if (!prediction) {
        throw new Error("Selected prediction not found");
      }

      const response = await fetch("/api/harvest-tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: account.address,
          yieldPredictionId: selectedPrediction,
          cropType: prediction.cropType,
          amount: harvestAmount,
          qualityGrade: qualityGrade,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to tokenize harvest");
      }

      const result = await response.json();

      if (result.success) {
        console.log("Database token created successfully:", result.data);

        // Now handle blockchain interaction on client side
        try {
          console.log("Starting blockchain interaction...");

          // Check if wallet is connected
          if (!window.ethereum) {
            throw new Error(
              "No wallet detected. Please install MetaMask or connect your wallet."
            );
          }

          // Connect to local Hardhat network for real blockchain interaction
          console.log("Connecting to local blockchain network...");

          try {
            const provider = new ethers.BrowserProvider(window.ethereum!);
            console.log("Provider created successfully");

            // Check network
            const network = await provider.getNetwork();
            console.log("Connected to network:", {
              name: network.name,
              chainId: network.chainId.toString(),
            });

            // Check if we're on the correct network (Hedera Testnet = 296)
            if (network.chainId !== 296n) {
              throw new Error(
                `Wrong network! Please connect to Hedera Testnet (Chain ID: 296). Currently on Chain ID: ${network.chainId}`
              );
            }

            const signer = await provider.getSigner();
            const signerAddress = await signer.getAddress();
            console.log("Signer address:", signerAddress);

            // Check balance
            const balance = await provider.getBalance(signerAddress);
            console.log("Signer balance:", ethers.formatEther(balance), "ETH");

            if (balance === 0n) {
              throw new Error(
                "No ETH balance! Please import a Hardhat test account with ETH."
              );
            }

            const contractHelper = new AgriYieldHelper(signer);
            console.log("Contract helper created successfully");

            // Mint harvest token on smart contract
            const quantity = Math.floor(parseFloat(harvestAmount) * 100); // Convert to kg (scaled by 100)
            console.log("Minting token with params:", {
              cropType: prediction.cropType,
              quantity,
              qualityGrade,
              metadataURI: result.data.metadataURI,
            });

            // Add timeout to prevent hanging
            const blockchainPromise = contractHelper.mintHarvestToken(
              prediction.cropType,
              quantity,
              qualityGrade,
              result.data.metadataURI
            );

            const timeoutPromise = new Promise((_, reject) =>
              setTimeout(
                () =>
                  reject(
                    new Error("Blockchain transaction timeout after 30 seconds")
                  ),
                30000 // Reduced to 30 seconds
              )
            );

            console.log("Starting blockchain transaction...");
            const blockchainResult = (await Promise.race([
              blockchainPromise,
              timeoutPromise,
            ])) as any;

            console.log("Blockchain result:", blockchainResult);

            if (blockchainResult.success) {
              // Update the token with blockchain data
              const updatedToken = {
                ...result.data,
                status: "tokenized",
                blockchainTokenId:
                  blockchainResult.receipt?.logs[0]?.args?.tokenId?.toString(),
                blockchainTxHash: blockchainResult.hash,
              };

              // Add the new token to the list
              setHarvestTokens((prev) => [updatedToken, ...prev]);
              toast.success("Harvest tokenized successfully!");

              // Reset form
              setSelectedPrediction("");
              setHarvestAmount("");
              setQualityGrade("A");
            } else {
              throw new Error("Blockchain transaction failed");
            }
          } catch (providerError) {
            console.error("Provider/Network error:", providerError);
            throw providerError;
          }
        } catch (blockchainError: any) {
          console.error("Blockchain error:", blockchainError);
          toast.error(
            `Token created in database but blockchain transaction failed: ${blockchainError.message}`
          );

          // Still add the token to the list with pending status
          setHarvestTokens((prev) => [result.data, ...prev]);
        }
      } else {
        throw new Error(result.error || "Failed to tokenize harvest");
      }
    } catch (error) {
      console.error("Failed to tokenize harvest:", error);
      toast.error("Failed to tokenize harvest. Please try again.");
    } finally {
      setIsTokenizing(false);
    }
  };

  const handleRequestLoan = async () => {
    if (!selectedToken || !loanAmount) {
      toast.error("Please select a harvest token and enter loan amount");
      return;
    }

    if (!account?.address) {
      toast.error("Wallet not connected");
      return;
    }

    setIsProcessing(true);
    try {
      const token = harvestTokens.find((t) => t.id === selectedToken);
      if (!token) {
        throw new Error("Selected token not found");
      }

      // Find the associated yield prediction
      const prediction = yieldPredictions.find(
        (p) => p.id === token.yieldPredictionId
      );
      if (!prediction) {
        throw new Error("Associated yield prediction not found");
      }

      const response = await fetch("/api/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: account.address,
          collateralTokenId: selectedToken,
          amount: loanAmount,
          collateralPredictionId: prediction.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Loan request failed:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });
        throw new Error(
          `Failed to request loan: ${errorData.error || response.statusText}`
        );
      }

      const result = await response.json();
      console.log("Database result:", result);

      if (result.success) {
        // Now handle blockchain interaction on client side
        try {
          const provider = new ethers.BrowserProvider(window.ethereum!);
          const signer = await provider.getSigner();
          const contractHelper = new AgriYieldHelper(signer);

          // Request loan from smart contract
          console.log("Loan amount (string):", loanAmount);
          const loanAmountWei = ethers.parseEther(loanAmount);
          console.log("Loan amount (wei):", loanAmountWei);

          // For now, we need to create the prediction in the smart contract first
          // Let's create it and then use its ID
          console.log("Creating yield prediction in smart contract...");

          // Create prediction in smart contract
          const createResult = await contractHelper.createYieldPrediction(
            prediction.cropType || "Wheat",
            Math.floor((prediction.predictedYield || 100) * 100), // Convert to scaled value
            Math.floor((prediction.confidence || 80) * 100), // Convert to scaled value
            Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60 // 30 days from now
          );

          console.log("Prediction created:", createResult);

          if (!createResult.success) {
            throw new Error(
              `Failed to create prediction: ${createResult.error}`
            );
          }

          const blockchainPredictionId = createResult.predictionId || 1;

          const blockchainResult = await contractHelper.requestLoan(
            blockchainPredictionId,
            loanAmountWei
          );

          console.log("Blockchain result:", blockchainResult);

          if (blockchainResult.success) {
            // Update the loan with blockchain data
            const updatedLoan = {
              ...result.data,
              status: "active" as const,
              blockchainLoanId: blockchainResult.loanId?.toString(),
              blockchainTxHash: blockchainResult.hash,
            };

            console.log("Updated loan:", updatedLoan);

            // TODO: Update loan status in database via API call
            // For now, just update local state

            // Add the new loan to the list
            setLoans((prev) => [updatedLoan, ...prev]);
            toast.success(
              `Loan of ${formatCurrency(parseFloat(loanAmount))} approved!`
            );

            // Reset form
            setSelectedToken("");
            setLoanAmount("");
          } else {
            throw new Error(
              `Blockchain transaction failed: ${blockchainResult.error}`
            );
          }
        } catch (blockchainError) {
          console.error("Blockchain error:", blockchainError);
          toast.error(
            "Loan created in database but blockchain transaction failed"
          );

          // Still add the loan to the list with pending status
          setLoans((prev) => [result.data, ...prev]);
        }
      } else {
        throw new Error(result.error || "Failed to request loan");
      }
    } catch (error) {
      console.error("Failed to request loan:", error);
      toast.error("Failed to request loan. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRepayLoan = async (loanId: string) => {
    if (!repayAmount) {
      toast.error("Please enter repayment amount");
      return;
    }

    if (!account?.address) {
      toast.error("Wallet not connected");
      return;
    }

    setIsRepaying(true);
    try {
      const response = await fetch(`/api/loans/${loanId}/repay`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: account.address,
          amount: repayAmount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to repay loan");
      }

      const result = await response.json();

      if (result.success) {
        // Now handle blockchain interaction on client side
        try {
          const provider = new ethers.BrowserProvider(window.ethereum!);
          const signer = await provider.getSigner();
          const contractHelper = new AgriYieldHelper(signer);

          // Repay loan on smart contract
          const repayAmountWei = ethers.parseEther(repayAmount);
          const blockchainResult = await contractHelper.repayLoan(
            parseInt(activeLoan?.blockchainLoanId || "0"),
            repayAmountWei
          );

          if (blockchainResult.success) {
            // Update the loan in the list with blockchain data
            setLoans((prev) =>
              prev.map((loan) =>
                loan.id === loanId
                  ? {
                      ...loan,
                      repaidAmount: result.data.repaidAmount,
                      status: result.data.status,
                      blockchainTxHash: blockchainResult.hash,
                    }
                  : loan
              )
            );
            toast.success("Loan repayment successful!");
            setRepayAmount("");
            setRepayModalOpen(false);
          } else {
            throw new Error("Blockchain transaction failed");
          }
        } catch (blockchainError) {
          console.error("Blockchain error:", blockchainError);
          toast.error(
            "Repayment recorded in database but blockchain transaction failed"
          );

          // Still update the loan in the list
          setLoans((prev) =>
            prev.map((loan) =>
              loan.id === loanId
                ? {
                    ...loan,
                    repaidAmount: result.data.repaidAmount,
                    status: result.data.status,
                  }
                : loan
            )
          );
        }
      } else {
        throw new Error(result.error || "Failed to repay loan");
      }
    } catch (error) {
      console.error("Failed to repay loan:", error);
      toast.error("Failed to repay loan. Please try again.");
    } finally {
      setIsRepaying(false);
    }
  };

  const activeLoan = loans.find((loan) => loan.status === "active");
  const availableCollateral = harvestTokens.filter(
    (token) => token.status === "tokenized" && !token.isLocked
  );

  // Debug logging (can be removed after testing)
  // console.log("Debug - Harvest tokens:", harvestTokens);
  // console.log("Debug - Available collateral:", availableCollateral);

  const totalCollateralValue = availableCollateral.reduce(
    (sum, token) => sum + token.tokenizedAmount,
    0
  );

  const maxLoanAmount = totalCollateralValue * 0.7; // 70% of collateral value

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading lending data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            Lending & Tokenization
          </h1>
          <p className="text-muted-foreground">
            Access loans using your harvest as collateral
          </p>
        </div>
      </div>

      {/* Network Setup */}
      <NetworkSetup />

      {/* Quick Actions for Loans */}
      {loans.length > 0 && (
        <Card className="dashboard-card border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Loan Quick Actions
            </CardTitle>
            <CardDescription>
              Manage your loans and make payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loans.map((loan) => (
                <div
                  key={loan.id}
                  className={`p-4 rounded-lg border-2 ${
                    loan.status === "active"
                      ? "border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800"
                      : loan.status === "completed"
                      ? "border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800"
                      : "border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">
                      {formatCurrency(loan.amount)}
                    </h3>
                    <Badge
                      variant={
                        loan.status === "active"
                          ? "default"
                          : loan.status === "completed"
                          ? "secondary"
                          : loan.status === "defaulted"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {loan.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    <p>Repaid: {formatCurrency(loan.repaidAmount || 0)}</p>
                    <p>
                      Remaining:{" "}
                      {formatCurrency(
                        (loan.amount || 0) - (loan.repaidAmount || 0)
                      )}
                    </p>
                  </div>

                  {(loan.status === "active" || loan.status === "pending") && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          <DollarSign className="h-3 w-3 mr-1" />
                          Make Payment
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Repay Loan</DialogTitle>
                          <DialogDescription>
                            Make a payment towards your{" "}
                            {formatCurrency(loan.amount)} loan.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Total Loan Amount
                              </p>
                              <p className="font-semibold">
                                {formatCurrency(loan.amount)}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Remaining Balance
                              </p>
                              <p className="font-semibold text-red-600">
                                {formatCurrency(
                                  (loan.amount || 0) - (loan.repaidAmount || 0)
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="repay-amount"
                              className="text-sm font-medium"
                            >
                              Payment Amount (USD)
                            </label>
                            <Input
                              id="repay-amount"
                              type="number"
                              placeholder="Enter amount to repay"
                              value={repayAmount}
                              onChange={(e) => setRepayAmount(e.target.value)}
                              max={loan.amount - (loan.repaidAmount || 0)}
                              min="0.01"
                              step="0.01"
                            />
                            <p className="text-xs text-gray-500">
                              Maximum:{" "}
                              {formatCurrency(
                                (loan.amount || 0) - (loan.repaidAmount || 0)
                              )}
                            </p>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" disabled={isRepaying}>
                            Cancel
                          </Button>
                          <Button
                            onClick={() => handleRepayLoan(loan.id)}
                            disabled={
                              isRepaying ||
                              !repayAmount ||
                              parseFloat(repayAmount) <= 0
                            }
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {isRepaying ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <DollarSign className="h-4 w-4 mr-2" />
                                Pay{" "}
                                {formatCurrency(parseFloat(repayAmount || "0"))}
                              </>
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}

                  {loan.status === "completed" && (
                    <Button
                      size="sm"
                      className="w-full"
                      variant="outline"
                      disabled
                    >
                      ✅ Fully Paid
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
                <div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Repaid Amount
                  </p>
                  <p className="font-semibold">
                    {formatCurrency(activeLoan.repaidAmount || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Remaining</p>
                  <p className="font-semibold">
                    {formatCurrency(
                      (activeLoan.amount || 0) - (activeLoan.repaidAmount || 0)
                    )}
                  </p>
                </div>
              </div>

              {/* Repayment Section */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Loan Management</h4>
                  <Dialog
                    open={repayModalOpen}
                    onOpenChange={setRepayModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Make Payment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Repay Loan</DialogTitle>
                        <DialogDescription>
                          Make a payment towards your loan. You can pay the full
                          amount or make a partial payment.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Total Loan Amount
                            </p>
                            <p className="font-semibold">
                              {formatCurrency(activeLoan.amount)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Remaining Balance
                            </p>
                            <p className="font-semibold text-red-600">
                              {formatCurrency(
                                (activeLoan.amount || 0) -
                                  (activeLoan.repaidAmount || 0)
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="repay-amount"
                            className="text-sm font-medium"
                          >
                            Payment Amount (USD)
                          </label>
                          <Input
                            id="repay-amount"
                            type="number"
                            placeholder="Enter amount to repay"
                            value={repayAmount}
                            onChange={(e) => setRepayAmount(e.target.value)}
                            max={
                              activeLoan.amount - (activeLoan.repaidAmount || 0)
                            }
                            min="0.01"
                            step="0.01"
                          />
                          <p className="text-xs text-gray-500">
                            Maximum:{" "}
                            {formatCurrency(
                              (activeLoan.amount || 0) -
                                (activeLoan.repaidAmount || 0)
                            )}
                          </p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setRepayModalOpen(false)}
                          disabled={isRepaying}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => handleRepayLoan(activeLoan.id)}
                          disabled={
                            isRepaying ||
                            !repayAmount ||
                            parseFloat(repayAmount) <= 0
                          }
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {isRepaying ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <DollarSign className="h-4 w-4 mr-2" />
                              Pay{" "}
                              {formatCurrency(parseFloat(repayAmount || "0"))}
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                {activeLoan.blockchainTxHash && (
                  <div className="mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        window.open(
                          `https://hashscan.io/testnet/transaction/${activeLoan.blockchainTxHash}`,
                          "_blank"
                        )
                      }
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Loan on HashScan
                    </Button>
                  </div>
                )}
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
              <label className="block text-sm font-medium">
                Select Yield Prediction
              </label>
              <Select
                value={selectedPrediction}
                onValueChange={setSelectedPrediction}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose prediction to tokenize" />
                </SelectTrigger>
                <SelectContent>
                  {yieldPredictions.map((prediction) => (
                    <SelectItem key={prediction.id} value={prediction.id}>
                      {prediction.cropType} - {prediction.predictedYield} tons
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Harvest Amount (tons)
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={harvestAmount}
                  onChange={(e) => setHarvestAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Quality Grade
                </label>
                <Select value={qualityGrade} onValueChange={setQualityGrade}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Grade A (Premium)</SelectItem>
                    <SelectItem value="B">Grade B (Standard)</SelectItem>
                    <SelectItem value="C">Grade C (Basic)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedPrediction && (
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">
                    Yield Prediction Details
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Predicted yield:{" "}
                  {
                    yieldPredictions.find((p) => p.id === selectedPrediction)
                      ?.predictedYield
                  }{" "}
                  tons
                  <br />
                  Confidence:{" "}
                  {(
                    (yieldPredictions.find((p) => p.id === selectedPrediction)
                      ?.confidence || 0) * 100
                  ).toFixed(1)}
                  %
                </p>
              </div>
            )}

            <Button
              className="w-full btn-primary"
              onClick={handleTokenizeHarvest}
              disabled={isTokenizing || !selectedPrediction || !harvestAmount}
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

        {/* Loan Application */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Apply for Loan
            </CardTitle>
            <CardDescription>
              Request a loan using your tokenized harvest as collateral
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">
                  Available Collateral
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Total Value: {formatCurrency(totalCollateralValue)}
                <br />
                Max Loan Amount: {formatCurrency(maxLoanAmount)}
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Select Collateral Token
              </label>
              <Select value={selectedToken} onValueChange={setSelectedToken}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose harvest token" />
                </SelectTrigger>
                <SelectContent>
                  {availableCollateral.map((token) => (
                    <SelectItem key={token.id} value={token.id}>
                      {token.cropType} - {token.amount} tons (Grade{" "}
                      {token.qualityGrade})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Loan Amount (USD)
              </label>
              <Input
                type="number"
                placeholder="Enter loan amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                max={maxLoanAmount}
              />
              <p className="text-xs text-gray-500">
                Maximum: {formatCurrency(maxLoanAmount)}
              </p>
            </div>

            <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">Loan Terms</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Interest Rate: 12% APR
                <br />
                Term: 12 months
                <br />
                Collateral will be locked during loan period
              </p>
            </div>

            <Button
              className="w-full"
              onClick={handleRequestLoan}
              disabled={
                isProcessing || !!activeLoan || !selectedToken || !loanAmount
              }
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Request Loan
                </>
              )}
            </Button>
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
                          token.status === "tokenized"
                            ? "default"
                            : token.status === "locked"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {token.status}
                      </Badge>
                      {token.isLocked && (
                        <Badge variant="outline" className="text-red-600">
                          <Lock className="h-3 w-3 mr-1" />
                          Locked
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {token.createdAt
                        ? formatDate(new Date(token.createdAt))
                        : "N/A"}
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
                        {formatCurrency(token.tokenizedAmount)}
                      </p>
                    </div>
                    {token.qualityGrade && (
                      <div>
                        <p className="text-gray-600 dark:text-gray-300">
                          Quality Grade
                        </p>
                        <p className="font-semibold">
                          Grade {token.qualityGrade}
                        </p>
                      </div>
                    )}
                    {token.blockchainTokenId && (
                      <div>
                        <p className="text-gray-600 dark:text-gray-300">
                          Token ID
                        </p>
                        <p className="font-semibold">
                          #{token.blockchainTokenId}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline">
                      View QR Code
                    </Button>
                    <Button size="sm" variant="outline">
                      Track Supply Chain
                    </Button>
                    {token.blockchainTxHash && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          window.open(
                            `https://hashscan.io/testnet/transaction/${token.blockchainTxHash}`,
                            "_blank"
                          )
                        }
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View on HashScan
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loan History */}
      {loans.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Loan History
            </CardTitle>
            <CardDescription>View all your loan transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loans.map((loan) => (
                <div
                  key={loan.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">
                        {formatCurrency(loan.amount)}
                      </h3>
                      <Badge
                        variant={
                          loan.status === "active"
                            ? "default"
                            : loan.status === "completed"
                            ? "secondary"
                            : loan.status === "defaulted"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {loan.status}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">
                      {loan.createdAt
                        ? formatDate(new Date(loan.createdAt))
                        : "N/A"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Interest Rate
                      </p>
                      <p className="font-semibold">{loan.interestRate}% APR</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Repaid Amount
                      </p>
                      <p className="font-semibold">
                        {formatCurrency(loan.repaidAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Due Date
                      </p>
                      <p className="font-semibold">
                        {loan.endDate
                          ? formatDate(new Date(loan.endDate))
                          : "N/A"}
                      </p>
                    </div>
                    {loan.blockchainLoanId && (
                      <div>
                        <p className="text-gray-600 dark:text-gray-300">
                          Blockchain Loan ID
                        </p>
                        <p className="font-semibold">
                          #{loan.blockchainLoanId}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 flex gap-2">
                    {loan.status === "active" && (
                      <Dialog
                        open={repayModalOpen && activeLoan?.id === loan.id}
                        onOpenChange={(open) => {
                          setRepayModalOpen(open);
                          if (open) {
                            // Set this loan as the active loan for repayment
                            const updatedLoans = loans.map((l) => ({
                              ...l,
                              isActiveForRepayment: l.id === loan.id,
                            }));
                            setLoans(updatedLoans);
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <DollarSign className="h-3 w-3 mr-1" />
                            Repay
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Repay Loan</DialogTitle>
                            <DialogDescription>
                              Make a payment towards your loan. You can pay the
                              full amount or make a partial payment.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  Total Loan Amount
                                </p>
                                <p className="font-semibold">
                                  {formatCurrency(loan.amount)}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  Remaining Balance
                                </p>
                                <p className="font-semibold text-red-600">
                                  {formatCurrency(
                                    (loan.amount || 0) -
                                      (loan.repaidAmount || 0)
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label
                                htmlFor="repay-amount"
                                className="text-sm font-medium"
                              >
                                Payment Amount (USD)
                              </label>
                              <Input
                                id="repay-amount"
                                type="number"
                                placeholder="Enter amount to repay"
                                value={repayAmount}
                                onChange={(e) => setRepayAmount(e.target.value)}
                                max={loan.amount - (loan.repaidAmount || 0)}
                                min="0.01"
                                step="0.01"
                              />
                              <p className="text-xs text-gray-500">
                                Maximum:{" "}
                                {formatCurrency(
                                  (loan.amount || 0) - (loan.repaidAmount || 0)
                                )}
                              </p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setRepayModalOpen(false)}
                              disabled={isRepaying}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => handleRepayLoan(loan.id)}
                              disabled={
                                isRepaying ||
                                !repayAmount ||
                                parseFloat(repayAmount) <= 0
                              }
                              className="bg-green-600 hover:bg-green-700"
                            >
                              {isRepaying ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <DollarSign className="h-4 w-4 mr-2" />
                                  Pay{" "}
                                  {formatCurrency(
                                    parseFloat(repayAmount || "0")
                                  )}
                                </>
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                    {loan.blockchainTxHash && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          window.open(
                            `https://hashscan.io/testnet/transaction/${loan.blockchainTxHash}`,
                            "_blank"
                          )
                        }
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View on HashScan
                      </Button>
                    )}
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
