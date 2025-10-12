import { db } from "./index";
import {
  createUser,
  getUserByWalletAddress,
  createFarmData,
  getFarmDataByUserId,
  createYieldPrediction,
  getYieldPredictionsByUserId,
  createLoan,
  getLoansByUserId,
  getActiveLoanByUserId,
  createHarvestToken,
  getHarvestTokensByUserId,
  createBadge,
  getBadgesByUserId,
  updateBadgeEarned,
  getUserStats,
} from "./services";

// Database adapter for the existing store
export class DatabaseAdapter {
  private userId: string | null = null;

  async initializeUser(walletAddress: string) {
    try {
      // Try to get existing user
      let user = await getUserByWalletAddress(walletAddress);

      if (!user) {
        // Create new user
        user = await createUser({
          walletAddress,
          name: "Farmer", // Default name
          location: "Ghana", // Default location
        });
      }

      this.userId = user.id;
      return user;
    } catch (error) {
      console.error("Failed to initialize user:", error);
      throw error;
    }
  }

  async addFarmData(data: {
    cropType: string;
    location: string;
    soilMoisture: number;
    weatherNotes: string;
    photo?: string;
  }) {
    if (!this.userId) throw new Error("User not initialized");

    try {
      return await createFarmData({
        userId: this.userId,
        cropType: data.cropType,
        location: data.location,
        soilMoisture: data.soilMoisture.toString(),
        weatherNotes: data.weatherNotes,
        photo: data.photo,
      });
    } catch (error) {
      console.error("Failed to add farm data:", error);
      throw error;
    }
  }

  async addYieldPrediction(prediction: {
    cropType: string;
    predictedYield: number;
    riskLevel: number;
    confidence: number;
    farmDataId?: string;
    modelVersion?: string;
    inputData?: any;
  }) {
    if (!this.userId) throw new Error("User not initialized");

    try {
      return await createYieldPrediction({
        userId: this.userId,
        farmDataId: prediction.farmDataId,
        cropType: prediction.cropType,
        predictedYield: prediction.predictedYield.toString(),
        riskLevel: prediction.riskLevel.toString(),
        confidence: prediction.confidence.toString(),
        modelVersion: prediction.modelVersion,
        inputData: prediction.inputData,
      });
    } catch (error) {
      console.error("Failed to add yield prediction:", error);
      throw error;
    }
  }

  async addLoan(loan: {
    amount: number;
    interestRate: number;
    status: "pending" | "active" | "completed" | "defaulted";
    collateral: string[];
    startDate: Date;
    endDate: Date;
  }) {
    if (!this.userId) throw new Error("User not initialized");

    try {
      return await createLoan({
        userId: this.userId,
        amount: loan.amount.toString(),
        interestRate: loan.interestRate.toString(),
        status: loan.status,
        collateral: loan.collateral,
        startDate: loan.startDate,
        endDate: loan.endDate,
      });
    } catch (error) {
      console.error("Failed to add loan:", error);
      throw error;
    }
  }

  async addHarvestToken(token: {
    cropType: string;
    amount: number;
    tokenizedAmount: number;
    status: "pending" | "tokenized" | "sold" | "burned";
  }) {
    if (!this.userId) throw new Error("User not initialized");

    try {
      return await createHarvestToken({
        userId: this.userId,
        cropType: token.cropType,
        amount: token.amount.toString(),
        tokenizedAmount: token.tokenizedAmount.toString(),
        status: token.status,
        qrCode: `https://agriyield.app/token/${crypto.randomUUID()}`,
      });
    } catch (error) {
      console.error("Failed to add harvest token:", error);
      throw error;
    }
  }

  async earnBadge(badgeType: string, name: string, description: string) {
    if (!this.userId) throw new Error("User not initialized");

    try {
      // Check if badge already exists
      const existingBadges = await getBadgesByUserId(this.userId);
      const existingBadge = existingBadges.find(
        (b) => b.badgeType === badgeType
      );

      if (existingBadge) {
        // Update existing badge
        return await updateBadgeEarned(existingBadge.id, true);
      } else {
        // Create new badge
        return await createBadge({
          userId: this.userId,
          badgeType,
          name,
          description,
          earned: true,
          earnedDate: new Date(),
        });
      }
    } catch (error) {
      console.error("Failed to earn badge:", error);
      throw error;
    }
  }

  async getUserData() {
    if (!this.userId) throw new Error("User not initialized");

    try {
      const [farmDataList, predictions, loans, tokens, badges, stats] =
        await Promise.all([
          getFarmDataByUserId(this.userId),
          getYieldPredictionsByUserId(this.userId),
          getLoansByUserId(this.userId),
          getHarvestTokensByUserId(this.userId),
          getBadgesByUserId(this.userId),
          getUserStats(this.userId),
        ]);

      return {
        farmData: farmDataList.map((data) => ({
          id: data.id,
          cropType: data.cropType,
          location: data.location,
          soilMoisture: parseFloat(data.soilMoisture),
          weatherNotes: data.weatherNotes || "",
          photo: data.photo,
          timestamp: data.createdAt,
        })),
        yieldPredictions: predictions.map((pred) => ({
          cropType: pred.cropType,
          predictedYield: parseFloat(pred.predictedYield),
          riskLevel: parseFloat(pred.riskLevel),
          confidence: parseFloat(pred.confidence),
          timestamp: pred.createdAt,
        })),
        loans: loans.map((loan) => ({
          id: loan.id,
          amount: parseFloat(loan.amount),
          interestRate: parseFloat(loan.interestRate),
          status: loan.status,
          collateral: loan.collateral as string[],
          startDate: loan.startDate,
          endDate: loan.endDate,
        })),
        harvestTokens: tokens.map((token) => ({
          id: token.id,
          cropType: token.cropType,
          amount: parseFloat(token.amount),
          tokenizedAmount: parseFloat(token.tokenizedAmount),
          status: token.status,
          qrCode: token.qrCode,
        })),
        badges: badges.map((badge) => ({
          id: badge.id,
          name: badge.name,
          description: badge.description,
          earned: badge.earned,
          earnedDate: badge.earnedDate,
        })),
        stats,
      };
    } catch (error) {
      console.error("Failed to get user data:", error);
      throw error;
    }
  }

  getUserId() {
    return this.userId;
  }
}

// Create a singleton instance
export const dbAdapter = new DatabaseAdapter();
