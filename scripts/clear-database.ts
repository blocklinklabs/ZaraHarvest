// Minor documentation improvement.
import { db } from "../lib/db/index";
import {
  users,
  farmData,
  yieldPredictions,
  loans,
  harvestTokens,
  badges,
  marketPrices,
  supplyChainEvents,
} from "../lib/db/schema";

async function clearDatabase() {
  try {
    console.log("🧹 Clearing database...");

    // Delete in reverse order of dependencies
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

clearDatabase();
