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
import { useAppStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { QRCodeCanvas } from "qrcode.react";
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
} from "lucide-react";

export default function Tracker() {
  const router = useRouter();
  const { wallet, harvestTokens } = useAppStore();

  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  useEffect(() => {
    if (!wallet.isConnected) {
      router.push("/");
    }
  }, [wallet.isConnected, router]);

  const supplyChainStages = [
    {
      id: "farm",
      name: "Farm",
      description: "Harvest collected from farm",
      icon: Leaf,
      status: "completed",
      date: "2024-01-15",
      location: "Kisumu, Kenya",
    },
    {
      id: "processing",
      name: "Processing",
      description: "Crop processed and packaged",
      icon: Package,
      status: "completed",
      date: "2024-01-16",
      location: "Nairobi Processing Center",
    },
    {
      id: "tokenized",
      name: "Tokenized",
      description: "Harvest converted to blockchain tokens",
      icon: QrCode,
      status: "completed",
      date: "2024-01-17",
      location: "Hedera Network",
    },
    {
      id: "transport",
      name: "Transport",
      description: "Goods in transit to market",
      icon: Truck,
      status: "in-progress",
      date: "2024-01-18",
      location: "En route to Mombasa",
    },
    {
      id: "market",
      name: "Market",
      description: "Goods delivered to market",
      icon: Store,
      status: "pending",
      date: "2024-01-20",
      location: "Mombasa Port",
    },
  ];

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

  if (!wallet.isConnected) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
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
            Supply Chain Tracker
          </h1>
          <p className="text-muted-foreground">
            Track your harvest from farm to market
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Selection */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Select Harvest Token
            </CardTitle>
            <CardDescription>
              Choose a tokenized harvest to track
            </CardDescription>
          </CardHeader>
          <CardContent>
            {harvestTokens.length > 0 ? (
              <div className="space-y-3">
                {harvestTokens.map((token) => (
                  <div
                    key={token.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedToken === token.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedToken(token.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{token.cropType}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {token.amount} tons • {token.tokenizedAmount} tokens
                        </p>
                      </div>
                      <Badge
                        variant={
                          token.status === "tokenized" ? "default" : "secondary"
                        }
                      >
                        {token.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  No tokenized harvests yet. Tokenize your harvest first.
                </p>
                <Button onClick={() => router.push("/lending")}>
                  Tokenize Harvest
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* QR Code */}
        {selectedTokenData && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR Code
              </CardTitle>
              <CardDescription>
                Scan to verify harvest authenticity
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg inline-block">
                <QRCodeCanvas
                  id="qr-code"
                  value={selectedTokenData.qrCode}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Token ID: {selectedTokenData.id}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Crop: {selectedTokenData.cropType}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadQR}
                  className="mt-2"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download QR
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Supply Chain Timeline */}
      {selectedTokenData && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Supply Chain Timeline
            </CardTitle>
            <CardDescription>
              Track the journey of your {selectedTokenData.cropType} harvest
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {supplyChainStages.map((stage, index) => {
                const Icon = stage.icon;
                const isCompleted = stage.status === "completed";
                const isInProgress = stage.status === "in-progress";
                const isPending = stage.status === "pending";

                return (
                  <div key={stage.id} className="flex items-start gap-4">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? "bg-green-100 text-green-600 dark:bg-green-900"
                            : isInProgress
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900"
                            : "bg-gray-100 text-gray-400 dark:bg-gray-800"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : isInProgress ? (
                          <Clock className="h-6 w-6" />
                        ) : (
                          <Icon className="h-6 w-6" />
                        )}
                      </div>
                      {index < supplyChainStages.length - 1 && (
                        <div
                          className={`w-0.5 h-16 ${
                            isCompleted
                              ? "bg-green-200 dark:bg-green-800"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      )}
                    </div>

                    {/* Stage Content */}
                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{stage.name}</h3>
                        <Badge
                          variant={
                            isCompleted
                              ? "default"
                              : isInProgress
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {stage.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {stage.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300">
                            Date:
                          </span>
                          <span className="font-medium">{stage.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300">
                            Location:
                          </span>
                          <span className="font-medium">{stage.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Blockchain Verification */}
      {selectedTokenData && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              Blockchain Verification
            </CardTitle>
            <CardDescription>
              Verify the authenticity of your harvest tokens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Token Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Token ID:
                      </span>
                      <span className="font-mono">{selectedTokenData.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Crop Type:
                      </span>
                      <span className="font-medium">
                        {selectedTokenData.cropType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Amount:
                      </span>
                      <span className="font-medium">
                        {selectedTokenData.amount} tons
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Tokens:
                      </span>
                      <span className="font-medium">
                        {selectedTokenData.tokenizedAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Blockchain Info
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Network:
                      </span>
                      <span className="font-medium">Hedera</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Token Standard:
                      </span>
                      <span className="font-medium">HTS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Status:
                      </span>
                      <Badge variant="default">
                        {selectedTokenData.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Verification:
                      </span>
                      <span className="text-green-600 font-medium">
                        ✓ Verified
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
  );
}
