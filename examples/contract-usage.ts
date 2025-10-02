import { AgriYieldHelper, AGRIYIELD_CONTRACT_ADDRESS } from "../lib/contract";
import { ethers } from "ethers";

// Example usage of the AgriYield smart contract
async function exampleUsage() {
  console.log("🌾 AgriYield Contract Usage Example");
  console.log(`📋 Contract Address: ${AGRIYIELD_CONTRACT_ADDRESS}`);

  // Connect to local Hardhat network
  const provider = new ethers.JsonRpcProvider("http://localhost:8545");

  // You would use your actual private key in production
  const privateKey =
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Hardhat account #0
  const signer = new ethers.Wallet(privateKey, provider);

  // Create contract helper
  const agriYield = new AgriYieldHelper(signer);

  try {
    // 1. Register a farmer
    console.log("\n1️⃣ Registering farmer...");
    const registerTx = await agriYield.registerFarmer(
      "John Doe",
      "Kumasi, Ghana",
      1000 // 10.00 hectares (in hundredths)
    );
    console.log(`✅ Farmer registered in block ${registerTx.blockNumber}`);

    // 2. Get farmer information
    console.log("\n2️⃣ Getting farmer info...");
    const farmerInfo = await agriYield.getFarmer(signer.address);
    console.log(`✅ Farmer: ${farmerInfo.name} from ${farmerInfo.location}`);
    console.log(
      `✅ Farm Size: ${Number(farmerInfo.totalFarmSize) / 100} hectares`
    );

    // 3. Create yield prediction
    console.log("\n3️⃣ Creating yield prediction...");
    const harvestDate = Math.floor(Date.now() / 1000) + 86400 * 90; // 90 days from now
    const predictionTx = await agriYield.createYieldPrediction(
      "Maize",
      5000, // 50.00 kg
      85, // 85% confidence
      harvestDate
    );
    console.log(
      `✅ Yield prediction created in block ${predictionTx.blockNumber}`
    );

    // 4. Mint harvest token
    console.log("\n4️⃣ Minting harvest token...");
    const tokenTx = await agriYield.mintHarvestToken(
      "Cocoa",
      2000, // 20.00 kg
      "A",
      "https://agriyield.com/metadata/1"
    );
    console.log(`✅ Harvest token minted in block ${tokenTx.blockNumber}`);

    // 5. Add supply chain event
    console.log("\n5️⃣ Adding supply chain event...");
    const eventTx = await agriYield.addSupplyChainEvent(
      1, // token ID
      "processed",
      "Accra Processing Plant",
      "Quality check passed - Grade A"
    );
    console.log(`✅ Supply chain event added in block ${eventTx.blockNumber}`);

    // 6. Get platform settings
    console.log("\n6️⃣ Getting platform settings...");
    const settings = await agriYield.getPlatformSettings();
    console.log(`✅ Platform Fee Rate: ${settings.feeRate / 100}%`);
    console.log(`✅ Default Interest Rate: ${settings.interestRate / 100}%`);

    console.log("\n🎉 All operations completed successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// Run the example
if (require.main === module) {
  exampleUsage().catch(console.error);
}

export { exampleUsage };
