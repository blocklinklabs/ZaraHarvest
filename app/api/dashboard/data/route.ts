import { NextRequest, NextResponse } from "next/server";
import {
  getFarmDataByUserId,
  getYieldPredictionsByUserId,
  getLoansByUserId,
  getHarvestTokensByUserId,
  getUserByWalletAddress,
} from "@/lib/db/services";

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

    // Get user first
    const user = await getUserByWalletAddress(walletAddress);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch all dashboard data for this user
    const [farmData, yieldPredictions, loans, harvestTokens] =
      await Promise.all([
        getFarmDataByUserId(user.id),
        getYieldPredictionsByUserId(user.id),
        getLoansByUserId(user.id),
        getHarvestTokensByUserId(user.id),
      ]);

    return NextResponse.json({
      farmData: farmData || [],
      yieldPredictions: yieldPredictions || [],
      loans: loans || [],
      harvestTokens: harvestTokens || [],
    });
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
