import { db } from "./index";
import {
  badges,
  farmData,
  harvestTokens,
  loans,
  marketPrices,
  users,
  yieldPredictions,
} from "./schema";

export async function seedDatabase() {
  try {
    console.log("🌱 Seeding database...");

    // Create a demo user entry in the database.
    const [demoUser] = await db
      .insert(users)
      .values({
        walletAddress: "0x1234567890123456789012345678901234567890",
        name: "Kwame Asante",
        email: "kwame@example.com",
        location: "Kumasi, Ghana",
        farmSize: "5.2 hectares",
        experience: "8 years",
      })
      .returning();

    console.log("✅ Created demo user:", demoUser.name);

    // Insert multiple farm data entries for the demo user.
    const farmDataEntries = await db
      .insert(farmData)
      .values([
        {
          userId: demoUser.id,
          cropType: "Maize",
          location: "Kumasi, Ghana",
          soilMoisture: "78.5",
          weatherNotes: "Sunny with light clouds, optimal growing conditions",
          temperature: "28.5",
          humidity: "75.0",
          rainfall: "12.0",
        },
        {
          userId: demoUser.id,
          cropType: "Cocoa",
          location: "Takoradi, Ghana",
          soilMoisture: "82.0",
          weatherNotes: "Heavy rainfall, good for cocoa growth",
          temperature: "26.0",
          humidity: "85.0",
          rainfall: "25.0",
        },
        {
          userId: demoUser.id,
          cropType: "Rice",
          location: "Tamale, Ghana",
          soilMoisture: "85.0",
          weatherNotes: "Irrigation system working well, fields flooded",
          temperature: "30.0",
          humidity: "80.0",
          rainfall: "8.0",
        },
      ])
      .returning();

    console.log("✅ Created farm data entries:", farmDataEntries.length);

    // Insert yield predictions for different crops for the demo user.
    const predictions = await db
      .insert(yieldPredictions)
      .values([
        {
          userId: demoUser.id,
          cropType: "Maize",
          predictedYield: "4.2",
          riskLevel: "12.0",
          confidence: "89.0",
          modelVersion: "v1.2.0",
        },
        {
          userId: demoUser.id,
          cropType: "Cocoa",
          predictedYield: "2.8",
          riskLevel: "18.0",
          confidence: "85.0",
          modelVersion: "v1.2.0",
        },
        {
          userId: demoUser.id,
          cropType: "Rice",
          predictedYield: "3.5",
          riskLevel: "8.0",
          confidence: "92.0",
          modelVersion: "v1.2.0",
        },
      ])
      .returning();

    console.log("✅ Created yield predictions:", predictions.length);

    // Create a demo loan entry for the user.
    const [loan] = await db
      .insert(loans)
      .values({
        userId: demoUser.id,
        amount: "1500.00",
        interestRate: "6.5",
        status: "active",
        collateral: ["maize-token-001"],
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        endDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000), // 150 days from now
      })
      .returning();

    console.log("✅ Created loan:", loan.id);

    // Insert harvest tokens for various crops.
    const tokens = await db
      .insert(harvestTokens)
      .values([
        {
          userId: demoUser.id,
          cropType: "Maize",
          amount: "4.2",
          tokenizedAmount: "42.0",
          status: "tokenized",
          qrCode: "https://agriyield.app/token/maize-001",
          blockchainTokenId: "maize-token-001",
        },
        {
          userId: demoUser.id,
          cropType: "Cocoa",
          amount: "2.8",
          tokenizedAmount: "28.0",
          status: "tokenized",
          qrCode: "https://agriyield.app/token/cocoa-001",
          blockchainTokenId: "cocoa-token-001",
        },
        {
          userId: demoUser.id,
          cropType: "Rice",
          amount: "3.5",
          tokenizedAmount: "35.0",
          status: "pending",
          qrCode: "https://agriyield.app/token/rice-001",
        },
      ])
      .returning();

    console.log("✅ Created harvest tokens:", tokens.length);

    // Insert various badges earned by the demo user.
    const badgeEntries = await db
      .insert(badges)
      .values([
        {
          userId: demoUser.id,
          badgeType: "data-contributor",
          name: "Data Contributor",
          description: "Submit 3+ farm data entries",
          earned: true,
          earnedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
        {
          userId: demoUser.id,
          badgeType: "yield-predictor",
          name: "Yield Predictor",
          description: "Get your first yield prediction",
          earned: true,
          earnedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        {
          userId: demoUser.id,
          badgeType: "token-holder",
          name: "Token Holder",
          description: "Tokenize your first harvest",
          earned: true,
          earnedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
        {
          userId: demoUser.id,
          badgeType: "loan-borrower",
          name: "Loan Borrower",
          description: "Take your first loan",
          earned: true,
          earnedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      ])
      .returning();

    console.log("✅ Created badges:", badgeEntries.length);

    // Insert current market prices for various crop types.
    const prices = await db
      .insert(marketPrices)
      .values([
        {
          cropType: "Maize",
          price: "450.00",
          currency: "GHS",
          source: "manual",
          location: "Kumasi",
        },
        {
          cropType: "Cocoa",
          price: "1200.00",
          currency: "GHS",
          source: "manual",
          location: "Takoradi",
        },
        {
          cropType: "Rice",
          price: "380.00",
          currency: "GHS",
          source: "manual",
          location: "Tamale",
        },
        {
          cropType: "Wheat",
          price: "520.00",
          currency: "GHS",
          source: "manual",
          location: "Accra",
        },
        {
          cropType: "Cassava",
          price: "280.00",
          currency: "GHS",
          source: "manual",
          location: "Kumasi",
        },
      ])
      .returning();

    console.log("✅ Created market prices:", prices.length);

    console.log("🎉 Database seeded successfully!");
    return {
      user: demoUser,
      farmData: farmDataEntries,
      predictions,
      loan,
      tokens,
      badges: badgeEntries,
      prices,
    };
  } catch (error) {
    console.error("❌ Failed to seed database:", error);
    throw error;
  }
}

// Run the seed function if this file is executed directly (e.g., via `node seed.ts`).
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
