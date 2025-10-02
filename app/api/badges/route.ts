import { NextRequest, NextResponse } from "next/server";
import { dbAdapter } from "@/lib/db/adapter";

export async function POST(request: NextRequest) {
  try {
    const { badgeId, name, description } = await request.json();

    const result = await dbAdapter.earnBadge(badgeId, name, description);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Failed to earn badge:", error);
    return NextResponse.json(
      { error: "Failed to earn badge" },
      { status: 500 }
    );
  }
}
