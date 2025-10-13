import { NextRequest, NextResponse } from "next/server";
import { dbAdapter } from "@/lib/db/adapter";

export async function GET(request: NextRequest) {
  try {
    const userId = dbAdapter.getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "User not initialized" },
        { status: 400 }
      );
    }

    const userData = await dbAdapter.getUserData();

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Failed to get user data:", error);
    return NextResponse.json(
      { error: "Failed to get user data" },
      { status: 500 }
    );
  }
}

