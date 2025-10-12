import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface FarmDataAnalysis {
  cropHealth: "excellent" | "good" | "fair" | "poor";
  diseaseRisk: "low" | "medium" | "high";
  pestRisk: "low" | "medium" | "high";
  soilQuality: "excellent" | "good" | "fair" | "poor";
  waterNeeds: "low" | "medium" | "high";
  yieldPrediction: number; // in tons per hectare
  confidence: number; // 0.0 to 1.0
  recommendations: string[];
  issues: string[];
}

export interface GeminiAnalysisResult {
  analysis: FarmDataAnalysis;
  rawResponse: string;
}

export class GeminiAIService {
  private model: any;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  async analyzeFarmData(data: {
    cropType: string;
    soilMoisture: number;
    temperature?: number;
    humidity?: number;
    rainfall?: number;
    weatherNotes?: string;
    imageData?: string; // Base64 encoded image
    imageMimeType?: string;
    location?: string;
  }): Promise<GeminiAnalysisResult> {
    try {
      // Prepare the prompt for Gemini
      const prompt = this.buildAnalysisPrompt(data);

      // Prepare content for Gemini
      const content: any[] = [{ text: prompt }];

      // Add image if provided
      if (data.imageData && data.imageMimeType) {
        content.push({
          inlineData: {
            data: data.imageData,
            mimeType: data.imageMimeType,
          },
        });
      }

      const result = await this.model.generateContent(content);
      const response = await result.response;
      const text = response.text();

      // Parse the AI response
      const analysis = this.parseAIResponse(text, data);

      return {
        analysis,
        rawResponse: text,
      };
    } catch (error) {
      console.error("Gemini AI analysis error:", error);
      throw new Error("Failed to analyze farm data with AI");
    }
  }

  private buildAnalysisPrompt(data: any): string {
    return `
You are an expert agricultural AI assistant. Analyze the following farm data and provide detailed insights:

CROP INFORMATION:
- Crop Type: ${data.cropType}
- Location: ${data.location || "Not specified"}

ENVIRONMENTAL DATA:
- Soil Moisture: ${data.soilMoisture}%
- Temperature: ${data.temperature || "Not provided"}°C
- Humidity: ${data.humidity || "Not provided"}%
- Rainfall: ${data.rainfall || "Not provided"}mm
- Weather Notes: ${data.weatherNotes || "None"}

Please provide a comprehensive analysis in the following JSON format:
{
  "cropHealth": "excellent|good|fair|poor",
  "diseaseRisk": "low|medium|high",
  "pestRisk": "low|medium|high", 
  "soilQuality": "excellent|good|fair|poor",
  "waterNeeds": "low|medium|high",
  "yieldPrediction": 0.0,
  "confidence": 0.0,
  "recommendations": ["recommendation1", "recommendation2"],
  "issues": ["issue1", "issue2"]
}

Focus on:
1. Crop health assessment based on environmental conditions
2. Disease and pest risk evaluation
3. Soil quality analysis
4. Water requirements
5. Yield prediction in tons per hectare
6. Specific actionable recommendations
7. Potential issues to address

Be precise and practical in your recommendations for African smallholder farmers.
    `.trim();
  }

  private parseAIResponse(response: string, data: any): FarmDataAnalysis {
    try {
      // Extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in AI response");
      }

      const parsed = JSON.parse(jsonMatch[0]);

      // Validate and normalize the response
      return {
        cropHealth: (this.validateEnum(parsed.cropHealth, [
          "excellent",
          "good",
          "fair",
          "poor",
        ]) || "fair") as "excellent" | "good" | "fair" | "poor",
        diseaseRisk: (this.validateEnum(parsed.diseaseRisk, [
          "low",
          "medium",
          "high",
        ]) || "medium") as "low" | "medium" | "high",
        pestRisk: (this.validateEnum(parsed.pestRisk, [
          "low",
          "medium",
          "high",
        ]) || "medium") as "low" | "medium" | "high",
        soilQuality: (this.validateEnum(parsed.soilQuality, [
          "excellent",
          "good",
          "fair",
          "poor",
        ]) || "fair") as "excellent" | "good" | "fair" | "poor",
        waterNeeds: (this.validateEnum(parsed.waterNeeds, [
          "low",
          "medium",
          "high",
        ]) || "medium") as "low" | "medium" | "high",
        yieldPrediction: Math.max(
          0,
          Math.min(50, parseFloat(parsed.yieldPrediction) || 0)
        ),
        confidence: Math.max(
          0,
          Math.min(1, parseFloat(parsed.confidence) || 0.5)
        ),
        recommendations: Array.isArray(parsed.recommendations)
          ? parsed.recommendations.slice(0, 5)
          : [],
        issues: Array.isArray(parsed.issues) ? parsed.issues.slice(0, 3) : [],
      };
    } catch (error) {
      console.error("Error parsing AI response:", error);

      // Return default analysis if parsing fails
      return {
        cropHealth: "fair",
        diseaseRisk: "medium",
        pestRisk: "medium",
        soilQuality: "fair",
        waterNeeds: "medium",
        yieldPrediction: 2.5,
        confidence: 0.5,
        recommendations: [
          "Monitor soil moisture levels regularly",
          "Check for signs of disease or pest damage",
          "Consider soil testing for better insights",
        ],
        issues: ["Limited data for comprehensive analysis"],
      };
    }
  }

  private validateEnum(value: any, validValues: string[]): string | null {
    return validValues.includes(value) ? value : null;
  }

  async generateYieldPrediction(data: {
    cropType: string;
    soilMoisture: number;
    temperature?: number;
    humidity?: number;
    rainfall?: number;
    weatherNotes?: string;
    location?: string;
    historicalData?: any[];
  }): Promise<{
    predictedYield: number;
    confidence: number;
    factors: string[];
    recommendations: string[];
    riskFactors: string[];
  }> {
    try {
      const prompt = `
You are an expert agricultural AI assistant specializing in yield prediction for African smallholder farmers. Analyze the following farm data and provide a comprehensive yield prediction:

CROP INFORMATION:
- Crop Type: ${data.cropType}
- Location: ${data.location || "Not specified"}

ENVIRONMENTAL DATA:
- Soil Moisture: ${data.soilMoisture}%
- Temperature: ${data.temperature || "Not provided"}°C
- Humidity: ${data.humidity || "Not provided"}%
- Rainfall: ${data.rainfall || "Not provided"}mm
- Weather Notes: ${data.weatherNotes || "None"}

Please provide a comprehensive yield prediction analysis in the following JSON format:
{
  "predictedYield": 0.0,
  "confidence": 0.0,
  "factors": ["factor1", "factor2", "factor3"],
  "recommendations": ["recommendation1", "recommendation2"],
  "riskFactors": ["risk1", "risk2"]
}

Focus on:
1. Realistic yield prediction in tons per hectare for ${
        data.cropType
      } in African conditions
2. Confidence level based on data completeness and quality
3. Key factors affecting yield (soil, weather, crop-specific needs)
4. Practical recommendations for the farmer
5. Risk factors to monitor

Be specific and practical for smallholder farmers in Africa. Consider typical yields for ${
        data.cropType
      } in similar conditions.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);

        // Validate and normalize the response
        return {
          predictedYield: Math.max(
            0.5,
            Math.min(50, parseFloat(parsed.predictedYield) || 2.5)
          ),
          confidence: Math.max(
            0.1,
            Math.min(1, parseFloat(parsed.confidence) || 0.6)
          ),
          factors: Array.isArray(parsed.factors)
            ? parsed.factors.slice(0, 5)
            : ["Soil moisture levels", "Environmental conditions"],
          recommendations: Array.isArray(parsed.recommendations)
            ? parsed.recommendations.slice(0, 4)
            : [
                "Monitor soil moisture regularly",
                "Check for pest and disease signs",
              ],
          riskFactors: Array.isArray(parsed.riskFactors)
            ? parsed.riskFactors.slice(0, 3)
            : ["Weather variability", "Pest pressure"],
        };
      }

      // Fallback prediction with more realistic values
      const baseYield = this.getBaseYieldForCrop(data.cropType);
      const moistureFactor = Math.max(
        0.5,
        Math.min(1.5, data.soilMoisture / 70)
      );
      const predictedYield = baseYield * moistureFactor;

      return {
        predictedYield: Math.round(predictedYield * 10) / 10,
        confidence: 0.6,
        factors: [
          "Soil moisture levels",
          "Crop-specific requirements",
          "Environmental conditions",
        ],
        recommendations: [
          "Monitor soil moisture regularly",
          "Check for signs of disease or pest damage",
          "Consider soil testing for better insights",
        ],
        riskFactors: [
          "Weather variability",
          "Pest and disease pressure",
          "Soil nutrient levels",
        ],
      };
    } catch (error) {
      console.error("Yield prediction error:", error);
      return {
        predictedYield: this.getBaseYieldForCrop(data.cropType),
        confidence: 0.5,
        factors: ["Limited data available"],
        recommendations: ["Gather more farm data for better predictions"],
        riskFactors: ["Insufficient data for risk assessment"],
      };
    }
  }

  private getBaseYieldForCrop(cropType: string): number {
    const baseYields: { [key: string]: number } = {
      Maize: 3.5,
      Cocoa: 0.8,
      Rice: 4.2,
      Wheat: 2.8,
      Cassava: 12.0,
      Sorghum: 2.5,
      Millet: 1.8,
      Groundnut: 1.2,
    };
    return baseYields[cropType] || 2.5;
  }
}

export const geminiAI = new GeminiAIService();
