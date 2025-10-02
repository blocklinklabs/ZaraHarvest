import { NextRequest, NextResponse } from "next/server";
import { dbAdapter } from "@/lib/db/adapter";

export async function POST(request: NextRequest) {
  try {
    const token = await request.json();

    const result = await dbAdapter.addHarvestToken(token);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Failed to add harvest token:", error);
    return NextResponse.json(
      { error: "Failed to add harvest token" },
      { status: 500 }
    );
  }
}
