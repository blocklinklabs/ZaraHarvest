import { NextRequest, NextResponse } from "next/server";
import { dbAdapter } from "@/lib/db/adapter";

export async function POST(request: NextRequest) {
  try {
    const loan = await request.json();

    const result = await dbAdapter.addLoan(loan);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Failed to add loan:", error);
    return NextResponse.json({ error: "Failed to add loan" }, { status: 500 });
  }
}
