import { dbAdapter } from "@/lib/db/adapter";
import { geminiAI } from "@/lib/gemini-ai";
import {
  getFarmDataByUserId,
  getYieldPredictionsByUserId,
  getUserByWalletAddress,
} from "@/lib/db/services";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles GET requests to fetch yield predictions for a specific user.
 * Requires a 'walletAddress' query parameter to identify the user.
 *
 * @param request - The incoming Next.js request object, containing search parameters.
 * @returns A JSON response containing the success status and an array of yield predictions,
 *          or an error message with an appropriate HTTP status code.
 */
export async function GET(request: NextRequest) {
  try {
    // Extract search parameters from the request URL.
    const { searchParams } = new URL(request.url);
    // Retrieve the 'walletAddress' from the query parameters.
    const walletAddress = searchParams.get("walletAddress");

    // If walletAddress is missing, return a 400 Bad Request error.
    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Attempt to find the user in the database using their wallet address.
    const user = await getUserByWalletAddress(walletAddress);
    // If no user is found, return a 404 Not Found error.
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch all yield predictions associated with the found user's ID.
    const predictions = await getYieldPredictionsByUserId(user.id);

    // Respond with a successful JSON object containing the processed predictions.
    // 'predictedYield', 'riskLevel', and 'confidence' are parsed to floats
    // to ensure correct numeric type in the response.
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
    // Log the error for internal debugging and monitoring.
    console.error("Failed to fetch yield predictions:", error);
    // Return a 500 Internal Server Error response to the client.
    return NextResponse.json(
      { error: "Failed to fetch yield predictions" },
      { status: 500 }
    );
  }
}

/**
 * Handles POST requests to generate and store a new crop yield prediction.
 * Expects a JSON body containing user and farm data, potentially including an existing farmDataId.
 *
 * @param request - The incoming Next.js request object, containing the JSON payload.
 * @returns A JSON response containing the success status and the newly created prediction data,
 *          or an error message with an appropriate HTTP status code.
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body as JSON.
    const body = await request.json();
    // Destructure necessary fields from the request body.
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

    // If walletAddress is missing, return a 400 Bad Request error.
    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Ensure the user exists in the database. If not, this might create a new entry.
    await dbAdapter.initializeUser(walletAddress);

    let farmData = null;

    // If a 'farmDataId' is provided, attempt to retrieve existing farm data
    // to use as input for the prediction, overriding or supplementing new inputs.
    if (farmDataId) {
      // First, get the user to ensure we fetch farm data associated with the correct user.
      const user = await getUserByWalletAddress(walletAddress);
      if (user) {
        // Fetch all farm data for the user and then find the specific entry by ID.
        const allFarmData = await getFarmDataByUserId(user.id);
        farmData = allFarmData.find((fd) => fd.id === farmDataId);
      }
    }

    // Prepare the input data for the Gemini AI model.
    // Values are prioritized from existing farmData (if `farmDataId` was provided and found),
    // falling back to direct inputs from the request body if not present in farmData.
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

    // Invoke the Gemini AI service to generate the yield prediction based on the prepared data.
    const aiPrediction = await geminiAI.generateYieldPrediction(predictionData);

    // Calculate a 'riskLevel' for the prediction.
    // This is derived from the AI's confidence, with a random factor added to introduce variability.
    // The result is clamped between 0 and 100.
    const riskLevel = Math.max(
      0,
      Math.min(100, (1 - aiPrediction.confidence) * 100 + Math.random() * 20)
    );

    // Construct the prediction object to be stored in the database.
    // It includes details from the AI model, the calculated risk level,
    // and the original input data (potentially referencing the farmDataId).
    const prediction = {
      cropType: predictionData.cropType,
      predictedYield: aiPrediction.predictedYield,
      riskLevel: riskLevel,
      confidence: aiPrediction.confidence,
      modelVersion: "gemini-2.5-flash", // Specifies the AI model version used.
      inputData: {
        farmDataId: farmDataId || null,
        ...predictionData,
        aiFactors: aiPrediction.factors, // Additional factors provided by the AI for context.
      },
    };

    // Add the newly generated yield prediction to the database.
    const result = await dbAdapter.addYieldPrediction(prediction);

    // Respond with a successful JSON object, including the generated prediction details.
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
    // Log the error for internal debugging and monitoring.
    console.error("Failed to generate yield prediction:", error);
    // Return a 500 Internal Server Error response to the client.
    return NextResponse.json(
      { error: "Failed to generate yield prediction" },
      { status: 500 }
    );
  }
}
