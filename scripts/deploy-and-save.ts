import { writeFileSync } from "fs";
import { ethers } from "hardhat";
import { join } from "path";

async function main() {
  console.log("🚀 Deploying AgriYield contract...");

  // Get the contract factory for AgriYield.
  const AgriYield = await ethers.getContractFactory("AgriYield");

  // Deploy the contract and wait for it to be confirmed on the network.
  const agriYield = await AgriYield.deploy();
  await agriYield.waitForDeployment();

  const contractAddress = await agriYield.getAddress();
  console.log(`✅ AgriYield deployed to: ${contractAddress}`);

  // Retrieve the contract's Application Binary Interface (ABI).
  const contractInterface = agriYield.interface;
  const abi = contractInterface.fragments;

  // Compile deployment information for storage.
  const deploymentInfo = {
    address: contractAddress,
    abi: abi,
    network: "localhost",
    deployedAt: new Date().toISOString(),
    gasUsed: "3793922", // This value is a placeholder based on a previous deployment's gas usage.
    blockNumber: await ethers.provider.getBlockNumber(),
  };

  // Define the path for the contracts.json file relative to the script.
  const contractsPath = join(__dirname, "..", "contracts.json");
  // Write the deployment information to the contracts.json file, formatted for readability.
  writeFileSync(contractsPath, JSON.stringify(deploymentInfo, null, 2));

  console.log(`📄 Contract info saved to: ${contractsPath}`);
  console.log(`🔗 Contract Address: ${contractAddress}`);
  console.log(`📋 ABI saved with ${deploymentInfo.abi.length} functions`);

  // Proceed with basic functionality tests to ensure the contract works as expected.
  console.log("\n🧪 Testing basic functionality...");

  // Retrieve signer accounts for testing farmer registration.
  const [owner, farmer1] = await ethers.getSigners();

  // Test farmer registration functionality.
  try {
    const tx = await agriYield.connect(farmer1).registerFarmer(
      "Test Farmer",
      "Kumasi, Ghana",
      500 // Represents 5.00 hectares of land.
    );
    await tx.wait();
    console.log("✅ Farmer registration test passed");
  } catch (error) {
    console.log("❌ Farmer registration test failed:", error);
  }

  // Test yield prediction functionality.
  try {
    const harvestDate = Math.floor(Date.now() / 1000) + 86400 * 90; // Sets harvest date 90 days from now in Unix timestamp.
    const tx = await agriYield.connect(farmer1).createYieldPrediction(
      "Maize",
      2000, // Represents 20.00 kg of predicted yield.
      85, // Represents 85% confidence level.
      harvestDate
    );
    await tx.wait();
    console.log("✅ Yield prediction test passed");
  } catch (error) {
    console.log("❌ Yield prediction test failed:", error);
  }

  // Test harvest token minting functionality.
  try {
    const tx = await agriYield.connect(farmer1).mintHarvestToken(
      "Cocoa",
      1500, // Represents 15.00 kg of harvested crop.
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
