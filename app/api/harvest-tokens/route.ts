import { NextRequest, NextResponse } from "next/server";
import { dbAdapter } from "@/lib/db/adapter";
import { AgriYieldHelper } from "@/lib/contract";
import {
  getUserByWalletAddress,
  getHarvestTokensByUserId,
  createHarvestTokenWithBlockchain,
  getYieldPredictionsByUserId,
} from "@/lib/db/services";
import { ethers } from "ethers";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get("walletAddress");

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Get user by wallet address
    const user = await getUserByWalletAddress(walletAddress);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get user's harvest tokens
    const harvestTokens = await getHarvestTokensByUserId(user.id);

    return NextResponse.json({
      success: true,
      data: harvestTokens.map((token) => ({
        id: token.id,
        yieldPredictionId: token.yieldPredictionId,
        cropType: token.cropType,
        amount: parseFloat(token.amount),
        tokenizedAmount: parseFloat(token.tokenizedAmount),
        qualityGrade: token.qualityGrade,
        status: token.status,
        isLocked: token.isLocked,
        qrCode: token.qrCode,
        metadataURI: token.metadataURI,
        blockchainTokenId: token.blockchainTokenId,
        blockchainTxHash: token.blockchainTxHash,
        createdAt: token.createdAt,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch harvest tokens:", error);
    return NextResponse.json(
      { error: "Failed to fetch harvest tokens" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      walletAddress,
      yieldPredictionId,
      cropType,
      amount,
      qualityGrade = "A",
    } = body;

    if (!walletAddress || !cropType || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Initialize user in database adapter
    await dbAdapter.initializeUser(walletAddress);

    // Get user by wallet address
    const user = await getUserByWalletAddress(walletAddress);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify yield prediction exists and belongs to user
    if (yieldPredictionId) {
      const userPredictions = await getYieldPredictionsByUserId(user.id);
      const prediction = userPredictions.find(
        (p) => p.id === yieldPredictionId
      );

      if (!prediction) {
        return NextResponse.json(
          { error: "Yield prediction not found" },
          { status: 400 }
        );
      }
    }

    // Calculate tokenized amount (1 ton = 10 tokens)
    const tokenizedAmount = parseFloat(amount) * 10;

    // Create metadata URI (in a real app, this would be uploaded to IPFS)
    const metadataURI = `https://agriyield.app/metadata/${crypto.randomUUID()}`;

    // Store harvest token in database (blockchain interaction will be handled on client side)
    const tokenData = {
      userId: user.id,
      yieldPredictionId: yieldPredictionId || null,
      cropType,
      amount: amount.toString(),
      tokenizedAmount: tokenizedAmount.toString(),
      qualityGrade,
      status: "pending" as const, // Will be updated to "tokenized" after blockchain transaction
      isLocked: false,
      qrCode: `https://agriyield.app/token/${crypto.randomUUID()}`,
      metadataURI,
    };

    const token = await createHarvestTokenWithBlockchain(tokenData);

    return NextResponse.json({
      success: true,
      data: {
        id: token.id,
        yieldPredictionId: token.yieldPredictionId,
        cropType: token.cropType,
        amount: parseFloat(token.amount),
        tokenizedAmount: parseFloat(token.tokenizedAmount),
        qualityGrade: token.qualityGrade,
        status: token.status,
        isLocked: token.isLocked,
        qrCode: token.qrCode,
        metadataURI: token.metadataURI,
        blockchainTokenId: token.blockchainTokenId,
        blockchainTxHash: token.blockchainTxHash,
      },
    });
  } catch (error) {
    console.error("Failed to mint harvest token:", error);
    return NextResponse.json(
      { error: "Failed to mint harvest token" },
      { status: 500 }
    );
  }
}
