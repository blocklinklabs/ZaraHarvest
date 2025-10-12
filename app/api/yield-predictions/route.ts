import { NextRequest, NextResponse } from "next/server";
import { dbAdapter } from "@/lib/db/adapter";
import { geminiAI } from "@/lib/gemini-ai";
import {
  getFarmDataByUserId,
  getYieldPredictionsByUserId,
} from "@/lib/db/services";
import { getUserByWalletAddress } from "@/lib/db/services";

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

    // Get user's yield predictions
    const predictions = await getYieldPredictionsByUserId(user.id);

    return NextResponse.json({
      success: true,
      data: predictions.map((pred) => ({
        id: pred.id,
        cropType: pred.cropType,
        predictedYield: parseFloat(pred.predictedYield),
        riskLevel: parseFloat(pred.riskLevel),
        confidence: parseFloat(pred.confidence),
        modelVersion: pred.modelVersion,
        inputData: pred.inputData,
        createdAt: pred.createdAt,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch yield predictions:", error);
    return NextResponse.json(
      { error: "Failed to fetch yield predictions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      walletAddress,
      farmDataId,
      cropType,
      soilMoisture,
      temperature,
      humidity,
      rainfall,
      weatherNotes,
      location,
    } = body;

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Initialize user in database adapter
    await dbAdapter.initializeUser(walletAddress);

    let farmData = null;

    // If farmDataId is provided, fetch the farm data
    if (farmDataId) {
      // We'll need to add this function to services
      const user = await getUserByWalletAddress(walletAddress);
      if (user) {
        const allFarmData = await getFarmDataByUserId(user.id);
        farmData = allFarmData.find((fd) => fd.id === farmDataId);
      }
    }

    // Prepare data for Gemini AI
    const predictionData = {
      cropType: farmData?.cropType || cropType,
      soilMoisture: farmData ? parseFloat(farmData.soilMoisture) : soilMoisture,
      temperature: farmData
        ? parseFloat(farmData.temperature || "0")
        : temperature,
      humidity: farmData ? parseFloat(farmData.humidity || "0") : humidity,
      rainfall: farmData ? parseFloat(farmData.rainfall || "0") : rainfall,
      weatherNotes: farmData?.weatherNotes || weatherNotes,
      location: farmData?.location || location,
    };

    // Generate prediction using Gemini AI
    const aiPrediction = await geminiAI.generateYieldPrediction(predictionData);

    // Calculate risk level based on confidence and other factors
    const riskLevel = Math.max(
      0,
      Math.min(100, (1 - aiPrediction.confidence) * 100 + Math.random() * 20)
    );

    // Store prediction in database
    const prediction = {
      cropType: predictionData.cropType,
      predictedYield: aiPrediction.predictedYield,
      riskLevel: riskLevel,
      confidence: aiPrediction.confidence,
      modelVersion: "gemini-2.5-flash",
      inputData: {
        farmDataId: farmDataId || null,
        ...predictionData,
        aiFactors: aiPrediction.factors,
      },
    };

    const result = await dbAdapter.addYieldPrediction(prediction);

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        predictedYield: aiPrediction.predictedYield,
        riskLevel: riskLevel,
        confidence: aiPrediction.confidence,
        factors: aiPrediction.factors,
      },
    });
  } catch (error) {
    console.error("Failed to generate yield prediction:", error);
    return NextResponse.json(
      { error: "Failed to generate yield prediction" },
      { status: 500 }
    );
  }
}
