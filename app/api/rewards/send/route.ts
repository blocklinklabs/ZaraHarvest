import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import { AgriYieldHelper } from "@/lib/contract";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, amount = "1" } = body;

    // Validate required fields
    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Check if we have the required environment variables
    if (!process.env.HEDERA_TESTNET_PRIVATE_KEY) {
      console.error("❌ HEDERA_TESTNET_PRIVATE_KEY not set in environment");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (!process.env.HEDERA_TESTNET_RPC_URL) {
      console.error("❌ HEDERA_TESTNET_RPC_URL not set in environment");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Create provider and signer for Hedera Testnet using owner's private key
    const provider = new ethers.JsonRpcProvider(
      process.env.HEDERA_TESTNET_RPC_URL
    );
    const signer = new ethers.Wallet(
      process.env.HEDERA_TESTNET_PRIVATE_KEY,
      provider
    );

    // Initialize contract helper with owner's credentials
    const contractHelper = new AgriYieldHelper(signer);

    // Convert amount to wei (1 HBAR = 1e18 wei)
    const rewardAmount = ethers.parseEther(amount);

    console.log(`🌾 Sending ${amount} HBAR reward to ${walletAddress}...`);

    // Call the smart contract to reward the farmer
    const rewardTx = await contractHelper.rewardFarmer(
      walletAddress,
      rewardAmount
    );

    if (rewardTx.success) {
      console.log("✅ HBAR reward sent successfully:", rewardTx);

      return NextResponse.json({
        success: true,
        message: `Successfully sent ${amount} HBAR reward`,
        data: {
          transactionHash: rewardTx.hash,
          amount: amount,
          farmer: walletAddress,
          explorerUrl: `https://hashscan.io/testnet/transaction/${rewardTx.hash}`,
        },
      });
    } else {
      throw new Error("Reward transaction failed");
    }
  } catch (error: any) {
    console.error("❌ Error sending HBAR reward:", error);

    // Return specific error messages for common issues
    if (error.message?.includes("Insufficient contract balance")) {
      return NextResponse.json(
        {
          error:
            "Contract has insufficient HBAR balance for rewards. Please fund the contract.",
          details:
            "The contract needs to be funded with HBAR before sending rewards.",
        },
        { status: 500 }
      );
    }

    if (error.message?.includes("Invalid farmer address")) {
      return NextResponse.json(
        { error: "Invalid wallet address provided" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to send HBAR reward",
        details: error.message || "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
