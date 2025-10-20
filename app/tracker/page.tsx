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
              Supply Chain Tracker
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mt-2">
              Loading tracking data...
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center py-16">
          <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              Supply Chain Tracker
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mt-2">
              Track your harvest from farm to market with blockchain
              verification
            </p>
          </div>
        </div>
        <Button
          onClick={fetchData}
          className="h-12 px-6 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
          variant="outline"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Total Tokens
                </p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">
                  {stats.totalTokens}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Tokenized
                </p>
                <p className="text-3xl font-black text-green-600 dark:text-green-400">
                  {stats.tokenizedTokens}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Total Value
                </p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">
                  {formatCurrency(stats.totalValue)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Locked (Collateral)
                </p>
                <p className="text-3xl font-black text-orange-600 dark:text-orange-400">
                  {stats.lockedTokens}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
                <Package className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
              <Input
                placeholder="Search by crop type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 pl-12 pr-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform w-full"
              />
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-12 w-full bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl rounded-xl">
                  <SelectItem
                    value="all"
                    className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    All Status
                  </SelectItem>
                  <SelectItem
                    value="pending"
                    className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Pending
                  </SelectItem>
                  <SelectItem
                    value="tokenized"
                    className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Tokenized
                  </SelectItem>
                  <SelectItem
                    value="sold"
                    className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Sold
                  </SelectItem>
                  <SelectItem
                    value="locked"
                    className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Locked
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={cropFilter} onValueChange={setCropFilter}>
                <SelectTrigger className="h-12 w-full bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform">
                  <SelectValue placeholder="Filter by crop" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl rounded-xl">
                  <SelectItem
                    value="all"
                    className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    All Crops
                  </SelectItem>
                  {uniqueCrops.map((crop) => (
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
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Token Selection */}
        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
          <CardHeader className="p-8 pb-6">
            <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-900 dark:text-white">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              Your Harvest Tokens ({filteredTokens.length})
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
              Select a harvest token to view its supply chain journey
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            {filteredTokens.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredTokens.map((token) => (
                  <div
                    key={token.id}
                    className={`p-6 rounded-2xl cursor-pointer transition-all transform-gpu will-change-transform hover:scale-[1.02] ${
                      selectedToken === token.id
                        ? "border-2 border-blue-500/50 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm shadow-xl shadow-blue-500/20"
                        : "border border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm hover:border-gray-300/50 dark:hover:border-gray-600/50 hover:shadow-lg"
                    }`}
                    onClick={() => setSelectedToken(token.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-xl font-black text-gray-900 dark:text-white">
                            {token.cropType}
                          </h3>
                          {token.isLocked && (
                            <Badge className="bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-0 px-3 py-1 rounded-xl font-bold text-sm">
                              Locked
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-base mb-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                              Amount
                            </p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              {token.amount} tons
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                              Value
                            </p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              {formatCurrency(token.tokenizedAmount)}
                            </p>
                          </div>
                          {token.qualityGrade && (
                            <div>
                              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                                Grade
                              </p>
                              <Badge className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-0 px-3 py-1 rounded-xl font-bold">
                                {token.qualityGrade}
                              </Badge>
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                              Created
                            </p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              {formatDate(new Date(token.createdAt))}
                            </p>
                          </div>
                        </div>
                        {token.blockchainTxHash && (
                          <div className="mt-4">
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
                              className="h-10 px-4 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View on HashScan
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <Badge
                          className={`${
                            token.status === "tokenized"
                              ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300"
                              : token.status === "pending"
                              ? "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300"
                              : token.status === "locked"
                              ? "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300"
                              : "bg-gray-100 dark:bg-gray-950/50 text-gray-700 dark:text-gray-300"
                          } border-0 px-4 py-2 rounded-xl font-bold`}
                        >
                          {token.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : harvestTokens.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Package className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  No Harvest Tokens Found
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mb-8 max-w-md mx-auto">
                  Tokenize your harvest to start tracking its journey from farm
                  to market.
                </p>
                <Button
                  onClick={() => router.push("/lending")}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-2xl px-8 py-4 font-semibold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                >
                  <Package className="h-5 w-5 mr-3" />
                  Tokenize Harvest
                </Button>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  No Tokens Match Your Filters
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mb-8 max-w-md mx-auto">
                  Try adjusting your search terms or filters to find more
                  tokens.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setCropFilter("all");
                  }}
                  className="h-12 px-6 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* QR Code & Token Details */}
        {selectedTokenData && (
          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
            <CardHeader className="p-8 pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-900 dark:text-white">
                <div className="w-10 h-10 rounded-2xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                  <QrCode className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                Token Verification
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                QR code and blockchain verification for{" "}
                {selectedTokenData.cropType}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="space-y-8">
                {/* QR Code Section */}
                <div className="text-center p-8 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50">
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                      QR Code Verification
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                      Scan this QR code to verify authenticity
                    </p>
                  </div>
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl inline-block shadow-lg">
                    <QRCodeCanvas
                      id="qr-code"
                      value={selectedTokenData.qrCode}
                      size={220}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadQR}
                    className="mt-6 h-12 px-8 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download QR Code
                  </Button>
                </div>

                {/* Token Information Stack */}
                <div className="space-y-8">
                  {/* Token Information */}
                  <div className="p-8 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm rounded-3xl border border-blue-200/50 dark:border-blue-800/50">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                        <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="text-2xl font-black text-gray-900 dark:text-white">
                        Token Information
                      </h4>
                    </div>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-2xl">
                          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                            Token ID
                          </p>
                          <p className="font-mono text-lg font-black text-gray-900 dark:text-white">
                            {selectedTokenData.id.slice(0, 8)}...
                          </p>
                        </div>
                        <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-2xl">
                          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                            Crop Type
                          </p>
                          <p className="text-lg font-black text-gray-900 dark:text-white">
                            {selectedTokenData.cropType}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-2xl">
                          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                            Amount
                          </p>
                          <p className="text-2xl font-black text-gray-900 dark:text-white">
                            {selectedTokenData.amount} tons
                          </p>
                        </div>
                        <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-2xl">
                          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                            Value
                          </p>
                          <p className="text-2xl font-black text-gray-900 dark:text-white">
                            {formatCurrency(selectedTokenData.tokenizedAmount)}
                          </p>
                        </div>
                      </div>
                      {selectedTokenData.qualityGrade && (
                        <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-2xl">
                          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                            Quality Grade
                          </p>
                          <Badge className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-0 px-4 py-2 rounded-xl font-bold text-lg">
                            Grade {selectedTokenData.qualityGrade}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Blockchain Details */}
                  <div className="p-8 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-3xl border border-green-200/50 dark:border-green-800/50">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h4 className="text-2xl font-black text-gray-900 dark:text-white">
                        Blockchain Details
                      </h4>
                    </div>
                    <div className="space-y-6">
                      <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-2xl">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                          Network
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <p className="text-lg font-black text-gray-900 dark:text-white">
                            Hedera Testnet
                          </p>
                        </div>
                      </div>
                      <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-2xl">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                          Status
                        </p>
                        <Badge
                          className={`${
                            selectedTokenData.status === "tokenized"
                              ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300"
                              : "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300"
                          } border-0 px-4 py-2 rounded-xl font-bold text-lg`}
                        >
                          {selectedTokenData.status}
                        </Badge>
                      </div>
                      {selectedTokenData.blockchainTokenId && (
                        <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-2xl">
                          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                            Blockchain Token ID
                          </p>
                          <p className="font-mono text-lg font-black text-gray-900 dark:text-white">
                            #{selectedTokenData.blockchainTokenId}
                          </p>
                        </div>
                      )}
                      <div className="p-4 bg-gradient-to-r from-green-100/80 to-emerald-100/80 dark:from-green-950/50 dark:to-emerald-950/50 rounded-2xl border border-green-200/50 dark:border-green-800/50">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                          Verification Status
                        </p>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                          <p className="text-xl font-black text-green-700 dark:text-green-300">
                            Verified & Authentic
                          </p>
                        </div>
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
        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
          <CardHeader className="p-8 pb-6">
            <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-900 dark:text-white">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center">
                <Truck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              Supply Chain Journey
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
              Follow the complete journey of your {selectedTokenData.cropType}{" "}
              harvest from farm to market
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-8">
              {supplyChainEvents.map((event, index) => {
                const Icon = getStageIcon(event.stage);
                const isCompleted = event.status === "completed";
                const isInProgress = event.status === "in-progress";
                const isPending = event.status === "pending";

                return (
                  <div key={event.id} className="flex items-start gap-6">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 ${
                          isCompleted
                            ? "bg-green-100 text-green-600 border-green-200 dark:bg-green-950/50 dark:border-green-800/50"
                            : isInProgress
                            ? "bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-950/50 dark:border-blue-800/50"
                            : "bg-gray-100 text-gray-400 border-gray-200 dark:bg-gray-800 dark:border-gray-600"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-8 w-8" />
                        ) : isInProgress ? (
                          <Clock className="h-8 w-8 animate-pulse" />
                        ) : (
                          <Icon className="h-8 w-8" />
                        )}
                      </div>
                      {index < supplyChainEvents.length - 1 && (
                        <div
                          className={`w-1 h-20 rounded-full ${
                            isCompleted
                              ? "bg-green-200 dark:bg-green-800"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      )}
                    </div>

                    {/* Event Content */}
                    <div className="flex-1 pb-8">
                      <div className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                              {event.name}
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                              {event.description}
                            </p>
                          </div>
                          <Badge
                            className={`${
                              isCompleted
                                ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300"
                                : isInProgress
                                ? "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
                                : "bg-gray-100 dark:bg-gray-950/50 text-gray-700 dark:text-gray-300"
                            } border-0 px-4 py-2 rounded-xl font-bold`}
                          >
                            {event.status}
                          </Badge>
                        </div>

                        <p className="text-base text-gray-700 dark:text-gray-300 font-medium mb-6">
                          {event.details}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-base">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-gray-400" />
                            <div>
                              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide block">
                                Date:
                              </span>
                              <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {formatDate(new Date(event.date))}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            <div>
                              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide block">
                                Location:
                              </span>
                              <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {event.location}
                              </span>
                            </div>
                          </div>
                          {event.transactionHash && (
                            <div className="flex items-center gap-3">
                              <ExternalLink className="h-5 w-5 text-gray-400" />
                              <Button
                                variant="link"
                                size="sm"
                                className="p-0 h-auto text-blue-600 dark:text-blue-400 font-bold text-base"
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
                          <div className="mt-6 p-4 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                              <span className="text-base text-blue-700 dark:text-blue-300 font-bold">
                                Live tracking active - Real-time updates
                              </span>
                            </div>
                          </div>
                        )}

                        {isPending && (
                          <div className="mt-6 p-4 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                            <div className="flex items-center gap-3">
                              <Clock className="h-5 w-5 text-gray-500" />
                              <span className="text-base text-gray-600 dark:text-gray-400 font-bold">
                                Scheduled for {formatDate(new Date(event.date))}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
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
        <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
          <CardHeader className="p-8 pb-6">
            <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-900 dark:text-white">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
                <Eye className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              Getting Started
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
              How to use the Supply Chain Tracker
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-800/50 transform-gpu will-change-transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">
                  Select a Token
                </h3>
                <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
                  Choose a harvest token from your collection to start tracking
                  its journey.
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-2xl border border-green-200/50 dark:border-green-800/50 transform-gpu will-change-transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-950/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <QrCode className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">
                  Verify Authenticity
                </h3>
                <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
                  Use QR codes and blockchain verification to ensure harvest
                  authenticity.
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50/80 to-violet-50/80 dark:from-purple-950/30 dark:to-violet-950/30 backdrop-blur-sm rounded-2xl border border-purple-200/50 dark:border-purple-800/50 transform-gpu will-change-transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-950/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">
                  Track Journey
                </h3>
                <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
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
