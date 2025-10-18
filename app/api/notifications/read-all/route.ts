import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notifications, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// PUT mark all notifications as read for a user
export async function PUT(request: NextRequest) {
  try {
    const { walletAddress } = await request.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Find user by wallet address
    const user = await db
      .select()
      .from(users)
      .where(eq(users.walletAddress, walletAddress))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update all unread notifications for the user
    const updatedNotifications = await db
      .update(notifications)
      .set({
        read: true,
        readAt: new Date(),
      })
      .where(
        eq(notifications.userId, user[0].id) && eq(notifications.read, false)
      )
      .returning();

    return NextResponse.json({
      success: true,
      updatedCount: updatedNotifications.length,
      message: `Marked ${updatedNotifications.length} notifications as read`,
    });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return NextResponse.json(
      { error: "Failed to mark all notifications as read" },
      { status: 500 }
    );
  }
}
