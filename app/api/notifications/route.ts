import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notifications, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

// GET notifications for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get("walletAddress");
    const limit = parseInt(searchParams.get("limit") || "50");
    const unreadOnly = searchParams.get("unreadOnly") === "true";

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

    // Build query
    let query = db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, user[0].id))
      .orderBy(desc(notifications.createdAt))
      .limit(limit);

    // Add unread filter if requested
    if (unreadOnly) {
      query = query.where(eq(notifications.read, false));
    }

    const userNotifications = await query;

    return NextResponse.json({
      success: true,
      notifications: userNotifications,
      unreadCount: userNotifications.filter((n) => !n.read).length,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

// POST create a new notification
export async function POST(request: NextRequest) {
  try {
    const { walletAddress, type, title, message, actionUrl, metadata } =
      await request.json();

    if (!walletAddress || !type || !title || !message) {
      return NextResponse.json(
        { error: "Wallet address, type, title, and message are required" },
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

    // Create notification
    const newNotification = await db
      .insert(notifications)
      .values({
        userId: user[0].id,
        type,
        title,
        message,
        actionUrl,
        metadata,
      })
      .returning();

    return NextResponse.json({
      success: true,
      notification: newNotification[0],
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 500 }
    );
  }
}
