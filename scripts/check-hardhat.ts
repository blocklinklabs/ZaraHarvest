import { ethers } from "ethers";

async function checkHardhatNode() {
  try {
    console.log("🔍 Checking Hardhat node status...");

    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

    // Try to get network info
    const network = await provider.getNetwork();
    console.log("✅ Hardhat node is running!");
    console.log("📍 Network:", {
      name: network.name,
      chainId: network.chainId.toString(),
    });

    // Check if contract is deployed
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const code = await provider.getCode(contractAddress);

    if (code === "0x") {
      console.log("❌ Contract not deployed at", contractAddress);
      console.log(
        "💡 Run: npx hardhat ignition deploy ignition/modules/AgriYield.ts --network localhost"
      );
    } else {
      console.log("✅ Contract deployed at", contractAddress);
    }

    // Check test account balance
    const testAccount = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const balance = await provider.getBalance(testAccount);
    console.log("💰 Test account balance:", ethers.formatEther(balance), "ETH");

    console.log(
      "\n🎉 Everything looks good! Ready for blockchain transactions."
    );
  } catch (error: any) {
    console.error("❌ Hardhat node check failed:", error.message);
    console.log("\n💡 To fix this:");
    console.log("1. Start Hardhat node: npx hardhat node");
    console.log(
      "2. Deploy contract: npx hardhat ignition deploy ignition/modules/AgriYield.ts --network localhost"
    );
    console.log(
      "3. Add Hardhat Local network to MetaMask (Chain ID: 31337, RPC: http://127.0.0.1:8545)"
    );
    console.log(
      "4. Import test account: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
    );
  }
}

checkHardhatNode();
