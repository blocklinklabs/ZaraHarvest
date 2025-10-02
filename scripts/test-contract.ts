import { ethers } from "hardhat";
import { AgriYieldHelper } from "../lib/contract";

async function main() {
  console.log("🧪 Testing AgriYield Contract Integration...\n");

  // Get signers
  const [owner, farmer1, farmer2] = await ethers.getSigners();

  // Create contract helper
  const agriYield = new AgriYieldHelper(farmer1);

  console.log(`📋 Contract Details:`);
  console.log(`   Owner: ${owner.address}`);
  console.log(`   Farmer 1: ${farmer1.address}`);
  console.log(`   Farmer 2: ${farmer2.address}\n`);

  try {
    // Test 1: Register Farmer (or check if already registered)
    console.log("1️⃣ Testing farmer registration...");
    try {
      const registerTx = await agriYield.registerFarmer(
        "Kwame Asante",
        "Kumasi, Ghana",
        500 // 5.00 hectares
      );
      console.log(`   ✅ Farmer registered in block ${registerTx.blockNumber}`);
    } catch (error: any) {
      if (error.message.includes("Farmer already registered")) {
        console.log(`   ✅ Farmer already registered (from previous test)`);
      } else {
        throw error;
      }
    }

    // Test 2: Get Farmer Info
    console.log("2️⃣ Testing farmer data retrieval...");
    const farmerInfo = await agriYield.getFarmer(farmer1.address);
    console.log(`   ✅ Farmer: ${farmerInfo.name} from ${farmerInfo.location}`);
    console.log(
      `   ✅ Farm Size: ${Number(farmerInfo.totalFarmSize) / 100} hectares`
    );
    console.log(`   ✅ Reputation: ${Number(farmerInfo.reputationScore)}/1000`);

    // Test 3: Create Yield Prediction
    console.log("3️⃣ Testing yield prediction...");
    const harvestDate = Math.floor(Date.now() / 1000) + 86400 * 90; // 90 days
    const predictionTx = await agriYield.createYieldPrediction(
      "Maize",
      2000, // 20.00 kg
      85, // 85% confidence
      harvestDate
    );
    console.log(
      `   ✅ Yield prediction created in block ${predictionTx.blockNumber}`
    );

    // Test 4: Get Predictions
    console.log("4️⃣ Testing prediction retrieval...");
    const predictions = await agriYield.getFarmerPredictions(farmer1.address);
    console.log(`   ✅ Found ${predictions.length} prediction(s)`);

    // Test 5: Mint Harvest Token
    console.log("5️⃣ Testing harvest token minting...");
    const tokenTx = await agriYield.mintHarvestToken(
      "Cocoa",
      1500, // 15.00 kg
      "A",
      "https://agriyield.com/metadata/1"
    );
    console.log(`   ✅ Harvest token minted in block ${tokenTx.blockNumber}`);

    // Test 6: Get Tokens
    console.log("6️⃣ Testing token retrieval...");
    const tokens = await agriYield.getFarmerTokens(farmer1.address);
    console.log(`   ✅ Found ${tokens.length} token(s)`);

    // Test 7: Add Supply Chain Event
    console.log("7️⃣ Testing supply chain tracking...");
    const eventTx = await agriYield.addSupplyChainEvent(
      tokens[0],
      "processed",
      "Accra Processing Plant",
      "Quality check passed - Grade A"
    );
    console.log(
      `   ✅ Supply chain event added in block ${eventTx.blockNumber}`
    );

    // Test 8: Get Supply Chain Events
    console.log("8️⃣ Testing supply chain retrieval...");
    const events = await agriYield.getSupplyChainEvents(tokens[0]);
    console.log(`   ✅ Found ${events.length} supply chain event(s)`);

    // Test 9: Platform Settings
    console.log("9️⃣ Testing platform settings...");
    const settings = await agriYield.getPlatformSettings();
    console.log(`   ✅ Platform Fee Rate: ${settings.feeRate / 100}%`);
    console.log(`   ✅ Default Interest Rate: ${settings.interestRate / 100}%`);
    console.log(
      `   ✅ Max Loan Duration: ${settings.maxDuration / 86400} days`
    );
    console.log(`   ✅ Min Collateral Ratio: ${settings.collateralRatio}%`);

    console.log("\n🎉 All tests passed successfully!");
    console.log("\n📋 Contract is ready for frontend integration!");
    console.log(
      `🔗 Contract Address: ${
        process.env.CONTRACT_ADDRESS || "Check contracts.json"
      }`
    );
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });
