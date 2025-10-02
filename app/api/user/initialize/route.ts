import { NextRequest, NextResponse } from "next/server";
import { dbAdapter } from "@/lib/db/adapter";

export async function POST(request: NextRequest) {
  try {
    const { walletAddress } = await request.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    const user = await dbAdapter.initializeUser(walletAddress);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Failed to initialize user:", error);
    return NextResponse.json(
      { error: "Failed to initialize user" },
      { status: 500 }
    );
  }
}
