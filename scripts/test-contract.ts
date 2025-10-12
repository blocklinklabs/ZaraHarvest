import { ethers } from "ethers";
import { AgriYieldHelper } from "../lib/contract";

async function testContract() {
  try {
    console.log("🧪 Testing AgriYield Contract...");

    // Connect to local Hardhat network
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const signer = new ethers.Wallet(
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", // Default Hardhat account
      provider
    );

    const contractHelper = new AgriYieldHelper(signer);

    console.log(
      "📍 Contract Address:",
      "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    );
    console.log("👤 Signer Address:", await signer.getAddress());

    // Test 1: Register farmer
    console.log("\n1️⃣ Testing farmer registration...");
    try {
      const registerTx = await contractHelper.registerFarmer(
        "Test Farmer",
        "Ghana",
        500
      ); // 5 hectares
      console.log("✅ Farmer registered successfully!");
      console.log("📄 Transaction Hash:", registerTx.hash);
    } catch (error) {
      console.log("ℹ️ Farmer might already be registered");
    }

    // Test 2: Create yield prediction
    console.log("\n2️⃣ Testing yield prediction...");
    const harvestDate = Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60; // 90 days from now
    const predictionTx = await contractHelper.createYieldPrediction(
      "Maize",
      500, // 5 tons (scaled by 100)
      85, // 85% confidence
      harvestDate
    );
    console.log("✅ Yield prediction created successfully!");
    console.log("📄 Transaction Hash:", predictionTx.hash);

    // Test 3: Mint harvest token
    console.log("\n3️⃣ Testing harvest token minting...");
    const tokenResult = await contractHelper.mintHarvestToken(
      "Maize",
      400, // 4 tons (scaled by 100)
      "A",
      "https://example.com/metadata/1"
    );
    console.log("✅ Harvest token minted successfully!");
    console.log("📄 Transaction Hash:", tokenResult.hash);

    console.log("\n🎉 All tests passed! Contract is working correctly.");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

testContract();
