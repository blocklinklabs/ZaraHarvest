import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByWalletAddress } from "@/lib/db/services";

export async function POST(request: NextRequest) {
  try {
    const {
      walletAddress,
      fullName,
      email,
      phone,
      location,
      country,
      cropType,
      farmSize,
      farmingExperience,
      additionalInfo,
    } = await request.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await getUserByWalletAddress(walletAddress);
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this wallet address" },
        { status: 409 }
      );
    }

    // Create new user with onboarding data
    const userData = {
      walletAddress,
      name: fullName,
      email: email || null,
      location: location || null,
      farmSize: farmSize || null,
      experience: farmingExperience || null,
    };

    const user = await createUser(userData);

    // TODO: In the future, we could also create initial farm data entry here
    // if cropType is provided:
    // await createFarmData({
    //   userId: user.id,
    //   cropType,
    //   location,
    //   soilMoisture: "0", // Default value
    //   weatherNotes: additionalInfo || null,
    // });

    return NextResponse.json({
      user,
      message: "User onboarded successfully",
    });
  } catch (error) {
    console.error("Failed to onboard user:", error);
    return NextResponse.json(
      { error: "Failed to onboard user" },
      { status: 500 }
    );
  }
}
