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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useWalletStore } from "@/lib/wallet-provider";
import { formatDate, formatCurrency } from "@/lib/utils";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "sonner";
import {
  ArrowLeft,
  QrCode,
  Download,
  CheckCircle,
  Clock,
  Truck,
  Store,
  Package,
  Leaf,
  MapPin,
  Calendar,
  Search,
  Filter,
  ExternalLink,
  TrendingUp,
  BarChart3,
  Eye,
  RefreshCw,
} from "lucide-react";

// Types
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

interface SupplyChainEvent {
  id: string;
  tokenId: string;
  stage: string;
  name: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
  date: string;
  location: string;
  details: string;
  transactionHash?: string;
  createdAt: string;
}

export default function Tracker() {
  const router = useRouter();
  const { isConnected, account } = useWalletStore();

  // State
  const [harvestTokens, setHarvestTokens] = useState<HarvestToken[]>([]);
  const [supplyChainEvents, setSupplyChainEvents] = useState<
    SupplyChainEvent[]
  >([]);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [cropFilter, setCropFilter] = useState<string>("all");

  // Fetch data functions
  const fetchHarvestTokens = async () => {
    if (!account?.address) return;

    try {
      const response = await fetch(
        `/api/harvest-tokens?walletAddress=${account.address}`
      );
      if (response.ok) {
        const result = await response.json();
        setHarvestTokens(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching harvest tokens:", error);
      toast.error("Failed to load harvest tokens");
    }
  };

  const fetchSupplyChainEvents = async (tokenId: string) => {
    try {
      // For now, generate mock supply chain events based on token data
      // In the future, this will come from a real API endpoint
      const mockEvents: SupplyChainEvent[] = [
        {
          id: "1",
          tokenId,
          stage: "farm",
          name: "Farm Harvest",
          description: "Harvest collected from farm",
          status: "completed",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          location: "Farm Location",
          details: "Crop harvested and quality tested",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          tokenId,
          stage: "processing",
          name: "Processing",
          description: "Crop processed, cleaned, and packaged",
          status: "completed",
          date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          location: "Processing Center",
          details: "Grain cleaned, sorted, and packaged",
          createdAt: new Date().toISOString(),
        },
        {
          id: "3",
          tokenId,
          stage: "tokenized",
          name: "Tokenized",
          description: "Harvest converted to blockchain tokens",
          status: "completed",
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          location: "Hedera Network",
          details: "Tokens minted on Hedera blockchain",
          createdAt: new Date().toISOString(),
        },
        {
          id: "4",
          tokenId,
          stage: "transport",
          name: "Transport",
          description: "Goods in transit to market",
          status: "in-progress",
          date: new Date().toISOString(),
          location: "En route",
          details: "GPS tracking active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "5",
          tokenId,
          stage: "market",
          name: "Market Delivery",
          description: "Goods delivered to market",
          status: "pending",
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          location: "Market",
          details: "Scheduled for delivery",
          createdAt: new Date().toISOString(),
        },
      ];
      setSupplyChainEvents(mockEvents);
    } catch (error) {
      console.error("Error fetching supply chain events:", error);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    await fetchHarvestTokens();
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    } else if (account?.address) {
      fetchData();
    }
  }, [isConnected, router, account?.address]);

  useEffect(() => {
    if (selectedToken) {
      fetchSupplyChainEvents(selectedToken);
    }
  }, [selectedToken]);

  // Helper functions
  const getStageIcon = (stage: string) => {
    const icons: { [key: string]: any } = {
      farm: Leaf,
      processing: Package,
      tokenized: QrCode,
      transport: Truck,
      market: Store,
    };
    return icons[stage] || Package;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-600 dark:bg-green-900";
      case "in-progress":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900";
      case "pending":
        return "bg-gray-100 text-gray-400 dark:bg-gray-800";
      default:
        return "bg-gray-100 text-gray-400 dark:bg-gray-800";
    }
  };

  // Filter tokens
  const filteredTokens = harvestTokens.filter((token) => {
    const matchesSearch = token.cropType
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || token.status === statusFilter;
    const matchesCrop = cropFilter === "all" || token.cropType === cropFilter;
    return matchesSearch && matchesStatus && matchesCrop;
  });

  // Get unique crop types for filter
  const uniqueCrops = [
    ...new Set(harvestTokens.map((token) => token.cropType)),
  ];

  // Statistics
  const stats = {
    totalTokens: harvestTokens.length,
    tokenizedTokens: harvestTokens.filter((t) => t.status === "tokenized")
      .length,
    totalValue: harvestTokens.reduce(
      (sum, token) => sum + token.tokenizedAmount,
      0
    ),
    lockedTokens: harvestTokens.filter((t) => t.isLocked).length,
  };

  const handleDownloadQR = () => {
    if (!selectedToken) return;

    const canvas = document.getElementById("qr-code") as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement("a");
      link.download = `harvest-token-${selectedToken}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const selectedTokenData = harvestTokens.find(
    (token) => token.id === selectedToken
  );

  if (!isConnected) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-20" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
              Supply Chain Tracker
            </h1>
            <p className="text-muted-foreground">
              Track your harvest from farm to market with blockchain
              verification
            </p>
          </div>
        </div>
        <Button onClick={fetchData} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Tokens
                </p>
                <p className="text-2xl font-bold">{stats.totalTokens}</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Tokenized
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.tokenizedTokens}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Value
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(stats.totalValue)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Locked (Collateral)
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {stats.lockedTokens}
                </p>
              </div>
              <Package className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by crop type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="tokenized">Tokenized</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="locked">Locked</SelectItem>
              </SelectContent>
            </Select>
            <Select value={cropFilter} onValueChange={setCropFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                {uniqueCrops.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Selection */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Your Harvest Tokens ({filteredTokens.length})
            </CardTitle>
            <CardDescription>
              Select a harvest token to view its supply chain journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredTokens.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredTokens.map((token) => (
                  <div
                    key={token.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedToken === token.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950 shadow-md"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedToken(token.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{token.cropType}</h3>
                          {token.isLocked && (
                            <Badge variant="outline" className="text-xs">
                              Locked
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <div>
                            <span className="font-medium">Amount:</span>{" "}
                            {token.amount} tons
                          </div>
                          <div>
                            <span className="font-medium">Value:</span>{" "}
                            {formatCurrency(token.tokenizedAmount)}
                          </div>
                          {token.qualityGrade && (
                            <div>
                              <span className="font-medium">Grade:</span>{" "}
                              {token.qualityGrade}
                            </div>
                          )}
                          <div>
                            <span className="font-medium">Created:</span>{" "}
                            {formatDate(new Date(token.createdAt))}
                          </div>
                        </div>
                        {token.blockchainTxHash && (
                          <div className="mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(
                                  `https://hashscan.io/testnet/transaction/${token.blockchainTxHash}`,
                                  "_blank"
                                );
                              }}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View on HashScan
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <Badge
                          variant={
                            token.status === "tokenized"
                              ? "default"
                              : token.status === "pending"
                              ? "secondary"
                              : token.status === "locked"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {token.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : harvestTokens.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  No harvest tokens found. Tokenize your harvest to start
                  tracking.
                </p>
                <Button onClick={() => router.push("/lending")}>
                  <Package className="h-4 w-4 mr-2" />
                  Tokenize Harvest
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  No tokens match your current filters.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setCropFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* QR Code & Token Details */}
        {selectedTokenData && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Token Verification
              </CardTitle>
              <CardDescription>
                QR code and blockchain verification for{" "}
                {selectedTokenData.cropType}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* QR Code */}
                <div className="text-center">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg inline-block">
                    <QRCodeCanvas
                      id="qr-code"
                      value={selectedTokenData.qrCode}
                      size={180}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadQR}
                    className="mt-3"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download QR Code
                  </Button>
                </div>

                {/* Token Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                      Token Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          ID:
                        </span>
                        <span className="font-mono text-xs">
                          {selectedTokenData.id.slice(0, 8)}...
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Crop:
                        </span>
                        <span className="font-medium">
                          {selectedTokenData.cropType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Amount:
                        </span>
                        <span className="font-medium">
                          {selectedTokenData.amount} tons
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Value:
                        </span>
                        <span className="font-medium">
                          {formatCurrency(selectedTokenData.tokenizedAmount)}
                        </span>
                      </div>
                      {selectedTokenData.qualityGrade && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Grade:
                          </span>
                          <Badge variant="outline">
                            {selectedTokenData.qualityGrade}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                      Blockchain Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Network:
                        </span>
                        <span className="font-medium">Hedera Testnet</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Status:
                        </span>
                        <Badge
                          variant={
                            selectedTokenData.status === "tokenized"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {selectedTokenData.status}
                        </Badge>
                      </div>
                      {selectedTokenData.blockchainTokenId && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Token ID:
                          </span>
                          <span className="font-mono text-xs">
                            {selectedTokenData.blockchainTokenId}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Verification:
                        </span>
                        <span className="text-green-600 font-medium flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Supply Chain Timeline */}
      {selectedTokenData && supplyChainEvents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Supply Chain Journey
            </CardTitle>
            <CardDescription>
              Follow the complete journey of your {selectedTokenData.cropType}{" "}
              harvest from farm to market
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {supplyChainEvents.map((event, index) => {
                const Icon = getStageIcon(event.stage);
                const isCompleted = event.status === "completed";
                const isInProgress = event.status === "in-progress";
                const isPending = event.status === "pending";

                return (
                  <div key={event.id} className="flex items-start gap-4">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                          isCompleted
                            ? "bg-green-100 text-green-600 border-green-200 dark:bg-green-900 dark:border-green-700"
                            : isInProgress
                            ? "bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900 dark:border-blue-700"
                            : "bg-gray-100 text-gray-400 border-gray-200 dark:bg-gray-800 dark:border-gray-600"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : isInProgress ? (
                          <Clock className="h-6 w-6 animate-pulse" />
                        ) : (
                          <Icon className="h-6 w-6" />
                        )}
                      </div>
                      {index < supplyChainEvents.length - 1 && (
                        <div
                          className={`w-0.5 h-16 ${
                            isCompleted
                              ? "bg-green-200 dark:bg-green-800"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      )}
                    </div>

                    {/* Event Content */}
                    <div className="flex-1 pb-8">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                            {event.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mt-1">
                            {event.description}
                          </p>
                        </div>
                        <Badge
                          variant={
                            isCompleted
                              ? "default"
                              : isInProgress
                              ? "secondary"
                              : "outline"
                          }
                          className="ml-4"
                        >
                          {event.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        {event.details}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300">
                            Date:
                          </span>
                          <span className="font-medium">
                            {formatDate(new Date(event.date))}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300">
                            Location:
                          </span>
                          <span className="font-medium">{event.location}</span>
                        </div>
                        {event.transactionHash && (
                          <div className="flex items-center gap-2">
                            <ExternalLink className="h-4 w-4 text-gray-400" />
                            <Button
                              variant="link"
                              size="sm"
                              className="p-0 h-auto text-blue-600"
                              onClick={() =>
                                window.open(
                                  `https://hashscan.io/testnet/transaction/${event.transactionHash}`,
                                  "_blank"
                                )
                              }
                            >
                              View Transaction
                            </Button>
                          </div>
                        )}
                      </div>

                      {isInProgress && (
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                              Live tracking active - Real-time updates
                            </span>
                          </div>
                        </div>
                      )}

                      {isPending && (
                        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Scheduled for {formatDate(new Date(event.date))}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      {!selectedTokenData && harvestTokens.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Getting Started
            </CardTitle>
            <CardDescription>
              How to use the Supply Chain Tracker
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Select a Token</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Choose a harvest token from your collection to start tracking
                  its journey.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <QrCode className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Verify Authenticity</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Use QR codes and blockchain verification to ensure harvest
                  authenticity.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Truck className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Track Journey</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Follow your harvest from farm to market with real-time
                  updates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
