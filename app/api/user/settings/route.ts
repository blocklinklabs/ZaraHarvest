import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, settings } = await request.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Update user settings in the database
    const result = await db
      .update(users)
      .set({
        // Map settings to user fields
        notifications: settings.notifications,
        badgeNotifications: settings.badgeNotifications,
        loanNotifications: settings.loanNotifications,
        yieldNotifications: settings.yieldNotifications,
        priceNotifications: settings.priceNotifications,
        systemNotifications: settings.systemNotifications,
        darkMode: settings.darkMode,
        language: settings.language,
        currency: settings.currency,
        updatedAt: new Date(),
      })
      .where(eq(users.walletAddress, walletAddress))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
      user: result[0],
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}

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

    // Get user settings
    const user = await db
      .select({
        notifications: users.notifications,
        darkMode: users.darkMode,
        language: users.language,
        currency: users.currency,
      })
      .from(users)
      .where(eq(users.walletAddress, walletAddress))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      settings: user[0],
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}
