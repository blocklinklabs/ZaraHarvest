import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notifications, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// POST create test notifications for a user
export async function POST(request: NextRequest) {
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

    // Create test notifications
    const testNotifications = [
      {
        userId: user[0].id,
        type: "badge_earned",
        title: "🏆 Badge Earned!",
        message:
          "Congratulations! You've earned the 'Data Contributor' badge for sharing your first farm data.",
        actionUrl: "/dashboard",
      },
      {
        userId: user[0].id,
        type: "yield_prediction",
        title: "📊 Yield Prediction Ready!",
        message:
          "Your maize yield prediction is ready. Predicted yield: 3.2 tons with 85% confidence.",
        actionUrl: "/prediction",
      },
      {
        userId: user[0].id,
        type: "loan_approved",
        title: "💰 Loan Approved!",
        message:
          "Your loan request for $500 has been approved and is now active.",
        actionUrl: "/lending",
      },
      {
        userId: user[0].id,
        type: "price_alert",
        title: "📈 Price Alert",
        message:
          "Maize prices have increased by 15% in your region. Consider selling your harvest tokens.",
        actionUrl: "/tracker",
      },
      {
        userId: user[0].id,
        type: "system",
        title: "🔔 System Update",
        message:
          "New features are now available! Check out the improved yield prediction algorithm.",
        actionUrl: "/prediction",
      },
    ];

    const createdNotifications = await db
      .insert(notifications)
      .values(testNotifications)
      .returning();

    return NextResponse.json({
      success: true,
      message: `Created ${createdNotifications.length} test notifications`,
      notifications: createdNotifications,
    });
  } catch (error) {
    console.error("Error creating test notifications:", error);
    return NextResponse.json(
      { error: "Failed to create test notifications" },
      { status: 500 }
    );
  }
}
