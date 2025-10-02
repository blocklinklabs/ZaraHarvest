import { NextRequest, NextResponse } from "next/server";
import { dbAdapter } from "@/lib/db/adapter";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const result = await dbAdapter.addFarmData(data);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Failed to add farm data:", error);
    return NextResponse.json(
      { error: "Failed to add farm data" },
      { status: 500 }
    );
  }
}
