import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, ...profileData } = await request.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Update user profile in the database
    const result = await db
      .update(users)
      .set({
        name: profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
        location: profileData.location,
        country: profileData.country,
        cropType: profileData.cropType,
        farmSize: profileData.farmSize,
        experience: profileData.farmingExperience,
        additionalInfo: profileData.additionalInfo,
        updatedAt: new Date(),
      })
      .where(eq(users.walletAddress, walletAddress))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: result[0],
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
