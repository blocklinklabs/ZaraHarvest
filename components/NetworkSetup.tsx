"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ethers } from "ethers";
import { AlertTriangle, CheckCircle, Copy } from "lucide-react";
import { toast } from "sonner";

export default function NetworkSetup() {
  const [networkStatus, setNetworkStatus] = useState<{
    connected: boolean;
    chainId?: string;
    balance?: string;
    address?: string;
    error?: string;
  }>({ connected: false });

  const checkNetwork = async () => {
    try {
      if (!window.ethereum) {
        setNetworkStatus({ connected: false, error: "MetaMask not installed" });
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);

      setNetworkStatus({
        connected: true,
        chainId: network.chainId.toString(),
        balance: ethers.formatEther(balance),
        address,
      });
    } catch (error: any) {
      setNetworkStatus({ connected: false, error: error.message });
    }
  };

  const addHederaTestnet = async () => {
    try {
      await window.ethereum?.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x128", // 296 in hex (Hedera Testnet)
            chainName: "Hedera Testnet",
            nativeCurrency: {
              name: "HBAR",
              symbol: "HBAR",
              decimals: 18,
            },
            rpcUrls: ["https://testnet.hashio.io/api"],
            blockExplorerUrls: ["https://hashscan.io/testnet"],
          },
        ],
      });
      toast.success("Hedera Testnet network added to MetaMask!");
      checkNetwork();
    } catch (error: any) {
      toast.error("Failed to add network: " + error.message);
    }
  };

  const switchToHedera = async () => {
    try {
      await window.ethereum?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x128" }], // 296 in hex (Hedera Testnet)
      });
      toast.success("Switched to Hedera Testnet network!");
      checkNetwork();
    } catch (error: any) {
      if (error.code === 4902) {
        // Network not added yet
        addHederaTestnet();
      } else {
        toast.error("Failed to switch network: " + error.message);
      }
    }
  };

  const copyTestAccount = () => {
    // This should be your actual Hedera Testnet account private key
    const message =
      "Please use your own Hedera Testnet account private key. You can get testnet HBAR from the Hedera faucet.";
    navigator.clipboard.writeText(message);
    toast.success("Instructions copied to clipboard!");
  };

  useEffect(() => {
    checkNetwork();
  }, []);

  const isCorrectNetwork = networkStatus.chainId === "296"; // Hedera Testnet
  const hasBalance = parseFloat(networkStatus.balance || "0") > 0;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isCorrectNetwork && hasBalance ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
          )}
          Blockchain Network Setup
        </CardTitle>
        <CardDescription>Configure MetaMask for Hedera Testnet</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {networkStatus.error && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{networkStatus.error}</AlertDescription>
          </Alert>
        )}

        {networkStatus.connected && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-300">Network:</p>
              <p className="font-semibold">
                Chain ID {networkStatus.chainId}
                {isCorrectNetwork ? " ✅" : " ❌"}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300">Balance:</p>
              <p className="font-semibold">
                {networkStatus.balance} ETH
                {hasBalance ? " ✅" : " ❌"}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {!isCorrectNetwork && (
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                You need to connect to Hedera Testnet (Chain ID: 296)
              </p>
              <Button onClick={switchToHedera} size="sm">
                Add/Switch to Hedera Testnet
              </Button>
            </div>
          )}

          {isCorrectNetwork && !hasBalance && (
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                You need HBAR to pay for transactions. Get testnet HBAR from the
                faucet:
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    window.open("https://portal.hedera.com/faucet", "_blank")
                  }
                  size="sm"
                  variant="outline"
                >
                  Get Testnet HBAR
                </Button>
                <Button onClick={copyTestAccount} size="sm" variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Instructions
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use the Hedera faucet to get testnet HBAR
              </p>
            </div>
          )}

          {isCorrectNetwork && hasBalance && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                ✅ Ready for blockchain transactions! You're connected to Hedera
                Testnet with sufficient HBAR.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <Button onClick={checkNetwork} variant="outline" size="sm">
          Refresh Status
        </Button>
      </CardContent>
    </Card>
  );
}
