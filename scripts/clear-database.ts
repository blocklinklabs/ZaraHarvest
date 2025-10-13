/**
 * @file Script to clear all data from the application database.
 * Designed for development or testing environments to reset the database state.
 */
import { db } from "../lib/db/index";
import {
  badges, // Alphabetized
  farmData, // Alphabetized
  harvestTokens, // Alphabetized
  loans, // Alphabetized
  marketPrices, // Alphabetized
  supplyChainEvents, // Alphabetized
  users, // Alphabetized
  yieldPredictions, // Alphabetized
} from "../lib/db/schema";

/**
 * Asynchronously clears all data from the database.
 * Tables are deleted in reverse order of their dependencies to prevent
 * foreign key constraint errors, ensuring a clean reset.
 * Logs the progress and outcome of the clearing operation to the console.
 */
async function clearDatabase() {
  try {
    console.log("🧹 Clearing database...");

    // Delete tables in reverse order of their foreign key dependencies
    // to avoid constraint violations.
    await db.delete(supplyChainEvents);
    console.log("✅ Cleared supply_chain_events");

    await db.delete(marketPrices);
    console.log("✅ Cleared market_prices");

    await db.delete(badges);
    console.log("✅ Cleared badges");

    await db.delete(harvestTokens);
    console.log("✅ Cleared harvest_tokens");

    await db.delete(loans);
    console.log("✅ Cleared loans");

    await db.delete(yieldPredictions);
    console.log("✅ Cleared yield_predictions");

    await db.delete(farmData);
    console.log("✅ Cleared farm_data");

    await db.delete(users);
    console.log("✅ Cleared users");

    console.log("🎉 Database cleared successfully!");
    console.log("📊 All tables are now empty and ready for fresh data.");
  } catch (error) {
    console.error("❌ Failed to clear database:", error);
  }
}

// Execute the database clearing function when the script is run.
clearDatabase();
