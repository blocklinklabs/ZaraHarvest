import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { farmData, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { geminiAI } from "@/lib/gemini-ai";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" });
const neonDb = neon(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form data
    const walletAddress = formData.get("walletAddress") as string;
    const cropType = formData.get("cropType") as string;
    const location = formData.get("location") as string;
    const soilMoisture = parseFloat(formData.get("soilMoisture") as string);
    const weatherNotes = formData.get("weatherNotes") as string;
    const latitude = formData.get("latitude")
      ? parseFloat(formData.get("latitude") as string)
      : null;
    const longitude = formData.get("longitude")
      ? parseFloat(formData.get("longitude") as string)
      : null;
    const temperature = formData.get("temperature")
      ? parseFloat(formData.get("temperature") as string)
      : null;
    const humidity = formData.get("humidity")
      ? parseFloat(formData.get("humidity") as string)
      : null;
    const rainfall = formData.get("rainfall")
      ? parseFloat(formData.get("rainfall") as string)
      : null;

    // Handle image upload
    const imageFile = formData.get("photo") as File | null;
    let imageData: string | null = null;
    let imageMimeType: string | null = null;

    if (imageFile && imageFile.size > 0) {
      // Convert image to base64
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      imageData = buffer.toString("base64");
      imageMimeType = imageFile.type;
    }

    // Validate required fields
    if (!walletAddress || !cropType || !location || isNaN(soilMoisture)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get user ID
    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.walletAddress, walletAddress))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user[0].id;

    // Prepare data for AI analysis
    const analysisData = {
      cropType,
      soilMoisture,
      temperature,
      humidity,
      rainfall,
      weatherNotes,
      location,
      imageData,
      imageMimeType,
    };

    // Get AI analysis
    let aiAnalysis = null;
    let aiConfidence = 0.5;
    let aiRecommendations = null;

    try {
      const aiResult = await geminiAI.analyzeFarmData(analysisData);
      aiAnalysis = JSON.stringify(aiResult.analysis);
      aiConfidence = aiResult.analysis.confidence;
      aiRecommendations = aiResult.analysis.recommendations.join("; ");
    } catch (aiError) {
      console.error("AI analysis failed:", aiError);
      // Continue without AI analysis
    }

    // Save farm data to database
    const result = await db
      .insert(farmData)
      .values({
        userId,
        cropType,
        location,
        soilMoisture,
        weatherNotes,
        photo: imageData,
        photoMimeType: imageMimeType,
        latitude,
        longitude,
        temperature,
        humidity,
        rainfall,
        aiAnalysis,
        aiConfidence,
        aiRecommendations,
      })
      .returning();

    // Generate yield prediction
    let yieldPrediction = null;
    try {
      const yieldResult = await geminiAI.generateYieldPrediction({
        cropType,
        soilMoisture,
        temperature,
        humidity,
        rainfall,
      });

      yieldPrediction = {
        predictedYield: yieldResult.predictedYield,
        confidence: yieldResult.confidence,
        factors: yieldResult.factors,
      };
    } catch (yieldError) {
      console.error("Yield prediction failed:", yieldError);
    }

    return NextResponse.json({
      success: true,
      message: "Farm data submitted successfully",
      data: {
        id: result[0].id,
        aiAnalysis: aiAnalysis ? JSON.parse(aiAnalysis) : null,
        yieldPrediction,
        imageUploaded: !!imageData,
      },
    });
  } catch (error) {
    console.error("Error submitting farm data:", error);
    return NextResponse.json(
      { error: "Failed to submit farm data" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get("walletAddress");
    const submissionId = searchParams.get("id");

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Get user ID using raw SQL
    const userResult = await neonDb`
      SELECT id FROM users WHERE wallet_address = ${walletAddress} LIMIT 1
    `;

    if (userResult.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = userResult[0].id;

    // If specific submission ID is requested, return detailed data with image
    if (submissionId) {
      const submission = await neonDb`
        SELECT * FROM farm_data WHERE id = ${submissionId} LIMIT 1
      `;

      if (submission.length === 0) {
        return NextResponse.json(
          { error: "Submission not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: submission,
      });
    }

    // Get farm data for user (without full image data for performance)
    const farmDataList = await neonDb`
      SELECT 
        id,
        crop_type as "cropType",
        location,
        soil_moisture as "soilMoisture",
        weather_notes as "weatherNotes",
        temperature,
        humidity,
        rainfall,
        latitude,
        longitude,
        CASE WHEN photo IS NOT NULL THEN 'exists' ELSE NULL END as photo,
        photo_mime_type as "photoMimeType",
        ai_analysis as "aiAnalysis",
        ai_confidence as "aiConfidence",
        ai_recommendations as "aiRecommendations",
        created_at as "createdAt"
      FROM farm_data 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return NextResponse.json({
      success: true,
      data: farmDataList,
    });
  } catch (error) {
    console.error("Error fetching farm data:", error);
    console.error("Error stack:", error.stack);
    return NextResponse.json(
      { error: "Failed to fetch farm data", details: error.message },
      { status: 500 }
    );
  }
}
