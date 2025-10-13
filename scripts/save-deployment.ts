// Polish wording in docs/comments.
import fs from "fs";
import path from "path";

// Read the deployed addresses
const deploymentPath = path.join(
  __dirname,
  "../ignition/deployments/chain-31337/deployed_addresses.json"
);
const deployment = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));

// Read the contract ABI
const artifactPath = path.join(
  __dirname,
  "../artifacts/contracts/AgriYield.sol/AgriYield.json"
);
const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

// Create the contracts.json file
const contractsData = {
  address: deployment["AgriYieldModule#AgriYield"],
  abi: artifact.abi,
};

// Save to contracts.json
const outputPath = path.join(__dirname, "../contracts.json");
fs.writeFileSync(outputPath, JSON.stringify(contractsData, null, 2));

console.log("✅ Contract deployment saved to contracts.json");
console.log("📍 Contract Address:", contractsData.address);
