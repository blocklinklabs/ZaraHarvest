import { eq, desc, and } from "drizzle-orm";
import { db } from "./index";
import {
  users,
  farmData,
  yieldPredictions,
  loans,
  harvestTokens,
  badges,
  marketPrices,
  supplyChainEvents,
  type NewUser,
  type NewFarmData,
  type NewYieldPrediction,
  type NewLoan,
  type NewHarvestToken,
  type NewBadge,
  type NewMarketPrice,
  type NewSupplyChainEvent,
} from "./schema";

// User services
export async function createUser(userData: NewUser) {
  const [user] = await db.insert(users).values(userData).returning();
  return user;
}

export async function getUserByWalletAddress(walletAddress: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.walletAddress, walletAddress));
  return user;
}

export async function updateUser(id: string, userData: Partial<NewUser>) {
  const [user] = await db
    .update(users)
    .set(userData)
    .where(eq(users.id, id))
    .returning();
  return user;
}

// Farm data services
export async function createFarmData(farmDataInput: NewFarmData) {
  const [data] = await db.insert(farmData).values(farmDataInput).returning();
  return data;
}

export async function getFarmDataByUserId(userId: string) {
  return await db
    .select()
    .from(farmData)
    .where(eq(farmData.userId, userId))
    .orderBy(desc(farmData.createdAt));
}

export async function getLatestFarmDataByUserId(userId: string) {
  const [data] = await db
    .select()
    .from(farmData)
    .where(eq(farmData.userId, userId))
    .orderBy(desc(farmData.createdAt))
    .limit(1);
  return data;
}

// Yield prediction services
export async function createYieldPrediction(
  predictionData: NewYieldPrediction
) {
  const [prediction] = await db
    .insert(yieldPredictions)
    .values(predictionData)
    .returning();
  return prediction;
}

export async function createYieldPredictionWithFarmData(
  predictionData: NewYieldPrediction & { farmDataId?: string }
) {
  const [prediction] = await db
    .insert(yieldPredictions)
    .values(predictionData)
    .returning();
  return prediction;
}

export async function getYieldPredictionsByUserId(userId: string) {
  return await db
    .select()
    .from(yieldPredictions)
    .where(eq(yieldPredictions.userId, userId))
    .orderBy(desc(yieldPredictions.createdAt));
}

export async function getLatestYieldPredictionByUserId(userId: string) {
  const [prediction] = await db
    .select()
    .from(yieldPredictions)
    .where(eq(yieldPredictions.userId, userId))
    .orderBy(desc(yieldPredictions.createdAt))
    .limit(1);
  return prediction;
}

export async function getYieldPredictionsWithFarmDataByUserId(userId: string) {
  return await db
    .select({
      id: yieldPredictions.id,
      cropType: yieldPredictions.cropType,
      predictedYield: yieldPredictions.predictedYield,
      riskLevel: yieldPredictions.riskLevel,
      confidence: yieldPredictions.confidence,
      modelVersion: yieldPredictions.modelVersion,
      inputData: yieldPredictions.inputData,
      createdAt: yieldPredictions.createdAt,
      farmDataId: yieldPredictions.farmDataId,
      farmData: {
        id: farmData.id,
        location: farmData.location,
        soilMoisture: farmData.soilMoisture,
        weatherNotes: farmData.weatherNotes,
        temperature: farmData.temperature,
        humidity: farmData.humidity,
        rainfall: farmData.rainfall,
        createdAt: farmData.createdAt,
      },
    })
    .from(yieldPredictions)
    .leftJoin(farmData, eq(yieldPredictions.farmDataId, farmData.id))
    .where(eq(yieldPredictions.userId, userId))
    .orderBy(desc(yieldPredictions.createdAt));
}

// Loan services
export async function createLoan(loanData: NewLoan) {
  const [loan] = await db.insert(loans).values(loanData).returning();
  return loan;
}

export async function createLoanWithBlockchain(
  loanData: NewLoan & {
    blockchainLoanId?: string;
    collateralPredictionId?: string;
    blockchainTxHash?: string;
  }
) {
  const [loan] = await db.insert(loans).values(loanData).returning();
  return loan;
}

export async function getLoansByUserId(userId: string) {
  return await db
    .select()
    .from(loans)
    .where(eq(loans.userId, userId))
    .orderBy(desc(loans.createdAt));
}

export async function getActiveLoanByUserId(userId: string) {
  const [loan] = await db
    .select()
    .from(loans)
    .where(and(eq(loans.userId, userId), eq(loans.status, "active")));
  return loan;
}

export async function updateLoanStatus(
  id: string,
  status: "pending" | "active" | "completed" | "defaulted"
) {
  const [loan] = await db
    .update(loans)
    .set({ status, updatedAt: new Date() })
    .where(eq(loans.id, id))
    .returning();
  return loan;
}

export async function updateLoanRepayment(
  id: string,
  repaidAmount: string,
  status?: "pending" | "active" | "completed" | "defaulted"
) {
  const updateData: any = {
    repaidAmount,
    updatedAt: new Date(),
  };
  if (status) {
    updateData.status = status;
  }

  const [loan] = await db
    .update(loans)
    .set(updateData)
    .where(eq(loans.id, id))
    .returning();
  return loan;
}

// Harvest token services
export async function createHarvestToken(tokenData: NewHarvestToken) {
  const [token] = await db.insert(harvestTokens).values(tokenData).returning();
  return token;
}

export async function createHarvestTokenWithBlockchain(
  tokenData: NewHarvestToken & {
    yieldPredictionId?: string;
    qualityGrade?: string;
    metadataURI?: string;
    blockchainTokenId?: string;
    blockchainTxHash?: string;
  }
) {
  const [token] = await db.insert(harvestTokens).values(tokenData).returning();
  return token;
}

export async function getHarvestTokensByUserId(userId: string) {
  return await db
    .select()
    .from(harvestTokens)
    .where(eq(harvestTokens.userId, userId))
    .orderBy(desc(harvestTokens.createdAt));
}

export async function updateHarvestTokenStatus(
  id: string,
  status: "pending" | "tokenized" | "sold" | "burned" | "locked"
) {
  const [token] = await db
    .update(harvestTokens)
    .set({ status, updatedAt: new Date() })
    .where(eq(harvestTokens.id, id))
    .returning();
  return token;
}

export async function getAvailableCollateralByUserId(userId: string) {
  return await db
    .select()
    .from(harvestTokens)
    .where(
      and(
        eq(harvestTokens.userId, userId),
        eq(harvestTokens.status, "tokenized"),
        eq(harvestTokens.isLocked, false)
      )
    )
    .orderBy(desc(harvestTokens.createdAt));
}

export async function updateHarvestTokenLockStatus(
  id: string,
  isLocked: boolean
) {
  const [token] = await db
    .update(harvestTokens)
    .set({ isLocked, updatedAt: new Date() })
    .where(eq(harvestTokens.id, id))
    .returning();
  return token;
}

// Badge services
export async function createBadge(badgeData: NewBadge) {
  const [badge] = await db.insert(badges).values(badgeData).returning();
  return badge;
}

export async function getBadgesByUserId(userId: string) {
  return await db.select().from(badges).where(eq(badges.userId, userId));
}

export async function updateBadgeEarned(id: string, earned: boolean) {
  const [badge] = await db
    .update(badges)
    .set({ earned, earnedDate: earned ? new Date() : null })
    .where(eq(badges.id, id))
    .returning();
  return badge;
}

// Market price services
export async function createMarketPrice(priceData: NewMarketPrice) {
  const [price] = await db.insert(marketPrices).values(priceData).returning();
  return price;
}

export async function getLatestMarketPrices() {
  return await db
    .select()
    .from(marketPrices)
    .orderBy(desc(marketPrices.createdAt));
}

export async function getLatestMarketPriceByCrop(cropType: string) {
  const [price] = await db
    .select()
    .from(marketPrices)
    .where(eq(marketPrices.cropType, cropType))
    .orderBy(desc(marketPrices.createdAt))
    .limit(1);
  return price;
}

// Supply chain services
export async function createSupplyChainEvent(eventData: NewSupplyChainEvent) {
  const [event] = await db
    .insert(supplyChainEvents)
    .values(eventData)
    .returning();
  return event;
}

export async function getSupplyChainEventsByTokenId(tokenId: string) {
  return await db
    .select()
    .from(supplyChainEvents)
    .where(eq(supplyChainEvents.tokenId, tokenId))
    .orderBy(supplyChainEvents.createdAt);
}

// Analytics services
export async function getUserStats(userId: string) {
  const [farmDataCount] = await db
    .select({ count: farmData.id })
    .from(farmData)
    .where(eq(farmData.userId, userId));
  const [predictionCount] = await db
    .select({ count: yieldPredictions.id })
    .from(yieldPredictions)
    .where(eq(yieldPredictions.userId, userId));
  const [loanCount] = await db
    .select({ count: loans.id })
    .from(loans)
    .where(eq(loans.userId, userId));
  const [tokenCount] = await db
    .select({ count: harvestTokens.id })
    .from(harvestTokens)
    .where(eq(harvestTokens.userId, userId));

  return {
    farmDataCount: farmDataCount?.count || 0,
    predictionCount: predictionCount?.count || 0,
    loanCount: loanCount?.count || 0,
    tokenCount: tokenCount?.count || 0,
  };
}
