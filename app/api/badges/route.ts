import { NextRequest, NextResponse } from "next/server";
import { dbAdapter } from "@/lib/db/adapter";

/**
 * Handles POST requests to earn a badge.
 * This API route is responsible for receiving badge details from the client
 * and interacting with the database adapter to record the badge earning event.
 *
 * @param {NextRequest} request The incoming Next.js request object, containing badge details in its body.
 * @returns {Promise<NextResponse>} A Next.js response indicating success or failure.
 *          On success, returns { success: true, data: result } with a 200 status.
 *          On failure, returns { error: "Failed to earn badge" } with a 500 status.
 */
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
