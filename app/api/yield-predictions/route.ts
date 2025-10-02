import { NextRequest, NextResponse } from "next/server";
import { dbAdapter } from "@/lib/db/adapter";

export async function POST(request: NextRequest) {
  try {
    const prediction = await request.json();

    const result = await dbAdapter.addYieldPrediction(prediction);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Failed to add yield prediction:", error);
    return NextResponse.json(
      { error: "Failed to add yield prediction" },
      { status: 500 }
    );
  }
}
