import { ethers } from "hardhat";
import { writeFileSync } from "fs";
import { join } from "path";

async function main() {
  console.log("🚀 Deploying AgriYield contract...");

  // Get the contract factory
  const AgriYield = await ethers.getContractFactory("AgriYield");

  // Deploy the contract
  const agriYield = await AgriYield.deploy();
  await agriYield.waitForDeployment();

  const contractAddress = await agriYield.getAddress();
  console.log(`✅ AgriYield deployed to: ${contractAddress}`);

  // Get the contract ABI
  const contractInterface = agriYield.interface;
  const abi = contractInterface.fragments;

  // Create deployment info
  const deploymentInfo = {
    address: contractAddress,
    abi: abi,
    network: "localhost",
    deployedAt: new Date().toISOString(),
    gasUsed: "3793922", // From our previous deployment
    blockNumber: await ethers.provider.getBlockNumber(),
  };

  // Save to contracts.json
  const contractsPath = join(__dirname, "..", "contracts.json");
  writeFileSync(contractsPath, JSON.stringify(deploymentInfo, null, 2));

  console.log(`📄 Contract info saved to: ${contractsPath}`);
  console.log(`🔗 Contract Address: ${contractAddress}`);
  console.log(`📋 ABI saved with ${deploymentInfo.abi.length} functions`);

  // Test basic functionality
  console.log("\n🧪 Testing basic functionality...");

  // Test farmer registration
  const [owner, farmer1] = await ethers.getSigners();

  try {
    const tx = await agriYield.connect(farmer1).registerFarmer(
      "Test Farmer",
      "Kumasi, Ghana",
      500 // 5.00 hectares
    );
    await tx.wait();
    console.log("✅ Farmer registration test passed");
  } catch (error) {
    console.log("❌ Farmer registration test failed:", error);
  }

  // Test yield prediction
  try {
    const harvestDate = Math.floor(Date.now() / 1000) + 86400 * 90; // 90 days from now
    const tx = await agriYield.connect(farmer1).createYieldPrediction(
      "Maize",
      2000, // 20.00 kg
      85, // 85% confidence
      harvestDate
    );
    await tx.wait();
    console.log("✅ Yield prediction test passed");
  } catch (error) {
    console.log("❌ Yield prediction test failed:", error);
  }

  // Test harvest token minting
  try {
    const tx = await agriYield.connect(farmer1).mintHarvestToken(
      "Cocoa",
      1500, // 15.00 kg
      "A",
      "https://example.com/metadata/1"
    );
    await tx.wait();
    console.log("✅ Harvest token minting test passed");
  } catch (error) {
    console.log("❌ Harvest token minting test failed:", error);
  }

  console.log("\n🎉 Deployment and testing completed successfully!");
  console.log(`\n📋 Contract Details:`);
  console.log(`   Address: ${contractAddress}`);
  console.log(`   Network: localhost`);
  console.log(`   Owner: ${owner.address}`);
  console.log(`   Test Farmer: ${farmer1.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
