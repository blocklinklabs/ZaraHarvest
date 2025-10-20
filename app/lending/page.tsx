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
            throw new Error(`Blockchain transaction failed`);
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
      <div className="space-y-8">
        <div className="flex items-center gap-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="h-12 px-6 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              Lending & Tokenization
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mt-2">
              Loading lending data...
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center py-16">
          <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Lending & Tokenization
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mt-2">
            Access loans using your harvest as collateral
          </p>
        </div>
      </div>

      {/* Network Setup */}
      <NetworkSetup />

      {/* Quick Actions for Loans */}
      {loans.length > 0 && (
        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden border-l-4">
          <CardHeader className="p-8 pb-6">
            <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-900 dark:text-white">
              <div className="w-10 h-10 rounded-2xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              Loan Quick Actions
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
              Manage your loans and make payments
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loans.map((loan) => (
                <div
                  key={loan.id}
                  className={`p-6 rounded-2xl border-2 transform-gpu will-change-transform hover:scale-[1.02] transition-all duration-300 ${
                    loan.status === "active"
                      ? "border-green-200/50 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 dark:border-green-800/50"
                      : loan.status === "completed"
                      ? "border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 dark:border-blue-800/50"
                      : "border-yellow-200/50 bg-gradient-to-br from-yellow-50/80 to-orange-50/80 dark:from-yellow-950/30 dark:to-orange-950/30 dark:border-yellow-800/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white">
                      {formatCurrency(loan.amount)}
                    </h3>
                    <Badge
                      className={`${
                        loan.status === "active"
                          ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300"
                          : loan.status === "completed"
                          ? "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
                          : loan.status === "defaulted"
                          ? "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300"
                          : "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300"
                      } border-0 px-4 py-2 rounded-xl font-bold`}
                    >
                      {loan.status}
                    </Badge>
                  </div>
                  <div className="text-base text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                    <p className="font-semibold">
                      Repaid: {formatCurrency(loan.repaidAmount || 0)}
                    </p>
                    <p className="font-semibold">
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
                          className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-2xl px-6 py-3 font-semibold text-base transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                        >
                          <DollarSign className="h-4 w-4 mr-2" />
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
                      className="w-full h-12 px-6 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
          <CardHeader className="p-8 pb-6">
            <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-900 dark:text-white">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              Active Loan
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="p-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    {formatCurrency(activeLoan.amount)}
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-300 font-medium">
                    Interest Rate: {activeLoan.interestRate}% APR
                  </p>
                </div>
                <Badge className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-0 px-4 py-2 rounded-xl font-bold">
                  Active
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-6 text-base">
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Start Date
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {activeLoan.startDate
                      ? formatDate(activeLoan.startDate)
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Due Date
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {activeLoan.endDate
                      ? formatDate(activeLoan.endDate)
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Repaid Amount
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatCurrency(activeLoan.repaidAmount || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Remaining
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatCurrency(
                      (activeLoan.amount || 0) - (activeLoan.repaidAmount || 0)
                    )}
                  </p>
                </div>
              </div>

              {/* Repayment Section */}
              <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    Loan Management
                  </h4>
                  <Dialog
                    open={repayModalOpen}
                    onOpenChange={setRepayModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-2xl px-6 py-3 font-semibold text-base transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95">
                        <DollarSign className="h-5 w-5 mr-2" />
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
                  <div className="mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        window.open(
                          `https://hashscan.io/testnet/transaction/${activeLoan.blockchainTxHash}`,
                          "_blank"
                        )
                      }
                      className="h-10 px-4 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Loan on HashScan
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tokenize Harvest */}
        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
          <CardHeader className="p-8 pb-6">
            <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-900 dark:text-white">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center">
                <Coins className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              Tokenize Your Harvest
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
              Convert your harvest into tradeable tokens for collateral
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-6">
            <div className="space-y-3">
              <label className="block text-base font-semibold text-gray-900 dark:text-white">
                Select Yield Prediction
              </label>
              <Select
                value={selectedPrediction}
                onValueChange={setSelectedPrediction}
              >
                <SelectTrigger className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform">
                  <SelectValue placeholder="Choose prediction to tokenize" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl rounded-xl">
                  {yieldPredictions.map((prediction) => (
                    <SelectItem
                      key={prediction.id}
                      value={prediction.id}
                      className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {prediction.cropType} - {prediction.predictedYield} tons
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-base font-semibold text-gray-900 dark:text-white">
                  Harvest Amount (tons)
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={harvestAmount}
                  onChange={(e) => setHarvestAmount(e.target.value)}
                  className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-base font-semibold text-gray-900 dark:text-white">
                  Quality Grade
                </label>
                <Select value={qualityGrade} onValueChange={setQualityGrade}>
                  <SelectTrigger className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl rounded-xl">
                    <SelectItem
                      value="A"
                      className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Grade A (Premium)
                    </SelectItem>
                    <SelectItem
                      value="B"
                      className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Grade B (Standard)
                    </SelectItem>
                    <SelectItem
                      value="C"
                      className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Grade C (Basic)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedPrediction && (
              <div className="p-6 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-2xl border border-green-200/50 dark:border-green-800/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-base font-semibold text-gray-900 dark:text-white">
                    Yield Prediction Details
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
                    Predicted yield:{" "}
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {
                        yieldPredictions.find(
                          (p) => p.id === selectedPrediction
                        )?.predictedYield
                      }{" "}
                      tons
                    </span>
                  </p>
                  <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
                    Confidence:{" "}
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {(
                        (yieldPredictions.find(
                          (p) => p.id === selectedPrediction
                        )?.confidence || 0) * 100
                      ).toFixed(1)}
                      %
                    </span>
                  </p>
                </div>
              </div>
            )}

            <Button
              className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-2xl px-8 py-4 font-semibold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              onClick={handleTokenizeHarvest}
              disabled={isTokenizing || !selectedPrediction || !harvestAmount}
            >
              {isTokenizing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                  Tokenizing...
                </>
              ) : (
                <>
                  <Coins className="mr-3 h-6 w-6" />
                  Tokenize Harvest
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Loan Application */}
        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
          <CardHeader className="p-8 pb-6">
            <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-900 dark:text-white">
              <div className="w-10 h-10 rounded-2xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              Apply for Loan
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
              Request a loan using your tokenized harvest as collateral
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-6">
            <div className="p-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-base font-semibold text-gray-900 dark:text-white">
                  Available Collateral
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
                  Total Value:{" "}
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(totalCollateralValue)}
                  </span>
                </p>
                <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
                  Max Loan Amount:{" "}
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(maxLoanAmount)}
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-base font-semibold text-gray-900 dark:text-white">
                Select Collateral Token
              </label>
              <Select value={selectedToken} onValueChange={setSelectedToken}>
                <SelectTrigger className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform">
                  <SelectValue placeholder="Choose harvest token" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl rounded-xl">
                  {availableCollateral.map((token) => (
                    <SelectItem
                      key={token.id}
                      value={token.id}
                      className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {token.cropType} - {token.amount} tons (Grade{" "}
                      {token.qualityGrade})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="block text-base font-semibold text-gray-900 dark:text-white">
                Loan Amount (USD)
              </label>
              <Input
                type="number"
                placeholder="Enter loan amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                max={maxLoanAmount}
                className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Maximum: {formatCurrency(maxLoanAmount)}
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-yellow-50/80 to-orange-50/80 dark:from-yellow-950/30 dark:to-orange-950/30 backdrop-blur-sm rounded-2xl border border-yellow-200/50 dark:border-yellow-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-yellow-100 dark:bg-yellow-950/50 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <span className="text-base font-semibold text-gray-900 dark:text-white">
                  Loan Terms
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
                  Interest Rate:{" "}
                  <span className="font-bold text-yellow-600 dark:text-yellow-400">
                    12% APR
                  </span>
                </p>
                <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
                  Term:{" "}
                  <span className="font-bold text-yellow-600 dark:text-yellow-400">
                    12 months
                  </span>
                </p>
                <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
                  Collateral will be locked during loan period
                </p>
              </div>
            </div>

            <Button
              className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-2xl px-8 py-4 font-semibold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              onClick={handleRequestLoan}
              disabled={
                isProcessing || !!activeLoan || !selectedToken || !loanAmount
              }
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-3 h-6 w-6" />
                  Request Loan
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Tokenized Assets */}
      {harvestTokens.length > 0 && (
        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
          <CardHeader className="p-8 pb-6">
            <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-900 dark:text-white">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center">
                <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              Your Tokenized Assets
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
              Manage your tokenized harvest assets
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-6">
              {harvestTokens.map((token) => (
                <div
                  key={token.id}
                  className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 transform-gpu will-change-transform hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-black text-gray-900 dark:text-white">
                        {token.cropType}
                      </h3>
                      <Badge
                        className={`${
                          token.status === "tokenized"
                            ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300"
                            : token.status === "locked"
                            ? "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300"
                            : "bg-gray-100 dark:bg-gray-950/50 text-gray-700 dark:text-gray-300"
                        } border-0 px-4 py-2 rounded-xl font-bold`}
                      >
                        {token.status}
                      </Badge>
                      {token.isLocked && (
                        <Badge className="bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-0 px-4 py-2 rounded-xl font-bold">
                          <Lock className="h-4 w-4 mr-1" />
                          Locked
                        </Badge>
                      )}
                    </div>
                    <span className="text-base text-gray-600 dark:text-gray-400 font-medium">
                      {token.createdAt
                        ? formatDate(new Date(token.createdAt))
                        : "N/A"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-6 text-base mb-6">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                        Physical Amount
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {token.amount} tons
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                        Tokenized Amount
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatCurrency(token.tokenizedAmount)}
                      </p>
                    </div>
                    {token.qualityGrade && (
                      <div>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                          Quality Grade
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          Grade {token.qualityGrade}
                        </p>
                      </div>
                    )}
                    {token.blockchainTokenId && (
                      <div>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                          Token ID
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          #{token.blockchainTokenId}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-10 px-4 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                    >
                      View QR Code
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-10 px-4 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                    >
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
                        className="h-10 px-4 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
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
        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
          <CardHeader className="p-8 pb-6">
            <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-900 dark:text-white">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              Loan History
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
              View all your loan transactions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-6">
              {loans.map((loan) => (
                <div
                  key={loan.id}
                  className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 transform-gpu will-change-transform hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-black text-gray-900 dark:text-white">
                        {formatCurrency(loan.amount)}
                      </h3>
                      <Badge
                        className={`${
                          loan.status === "active"
                            ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300"
                            : loan.status === "completed"
                            ? "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
                            : loan.status === "defaulted"
                            ? "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300"
                            : "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300"
                        } border-0 px-4 py-2 rounded-xl font-bold`}
                      >
                        {loan.status}
                      </Badge>
                    </div>
                    <span className="text-base text-gray-600 dark:text-gray-400 font-medium">
                      {loan.createdAt
                        ? formatDate(new Date(loan.createdAt))
                        : "N/A"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-6 text-base mb-6">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                        Interest Rate
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {loan.interestRate}% APR
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                        Repaid Amount
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatCurrency(loan.repaidAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                        Due Date
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {loan.endDate
                          ? formatDate(new Date(loan.endDate))
                          : "N/A"}
                      </p>
                    </div>
                    {loan.blockchainLoanId && (
                      <div>
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                          Blockchain Loan ID
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          #{loan.blockchainLoanId}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3">
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
                            className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-2xl px-6 py-3 font-semibold text-base transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                          >
                            <DollarSign className="h-4 w-4 mr-2" />
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
                        className="h-10 px-4 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
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
      <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center">
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-800/50 transform-gpu will-change-transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                    <Coins className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xl font-black text-gray-900 dark:text-white">
                    1. Tokenize
                  </span>
                </div>
                <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
                  Convert your harvest into blockchain tokens
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-2xl border border-green-200/50 dark:border-green-800/50 transform-gpu will-change-transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-xl font-black text-gray-900 dark:text-white">
                    2. Collateral
                  </span>
                </div>
                <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
                  Use tokens as collateral for loans
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50/80 to-violet-50/80 dark:from-purple-950/30 dark:to-violet-950/30 backdrop-blur-sm rounded-2xl border border-purple-200/50 dark:border-purple-800/50 transform-gpu will-change-transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-xl font-black text-gray-900 dark:text-white">
                    3. Access Funds
                  </span>
                </div>
                <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
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
