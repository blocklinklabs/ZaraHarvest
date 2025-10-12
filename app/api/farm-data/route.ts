import { NextRequest, NextResponse } from "next/server";
import { dbAdapter } from "@/lib/db/adapter";
import { getUserByWalletAddress, getFarmDataByUserId } from "@/lib/db/services";

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

    // Get user by wallet address
    const user = await getUserByWalletAddress(walletAddress);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get user's farm data
    const farmData = await getFarmDataByUserId(user.id);

    return NextResponse.json({
      success: true,
      data: farmData.map((data) => ({
        id: data.id,
        cropType: data.cropType,
        location: data.location,
        soilMoisture: parseFloat(data.soilMoisture),
        weatherNotes: data.weatherNotes,
        temperature: data.temperature
          ? parseFloat(data.temperature)
          : undefined,
        humidity: data.humidity ? parseFloat(data.humidity) : undefined,
        rainfall: data.rainfall ? parseFloat(data.rainfall) : undefined,
        createdAt: data.createdAt,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch farm data:", error);
    return NextResponse.json(
      { error: "Failed to fetch farm data" },
      { status: 500 }
    );
  }
}

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
