import { ethers } from "ethers";

async function checkHederaTestnet() {
  try {
    console.log("🔍 Checking Hedera Testnet connection...");

    const provider = new ethers.JsonRpcProvider(
      "https://testnet.hashio.io/api"
    );

    // Try to get network info
    const network = await provider.getNetwork();
    console.log("✅ Connected to Hedera Testnet!");
    console.log("📍 Network:", {
      name: network.name,
      chainId: network.chainId.toString(),
    });

    // Check if we have the private key for deployment
    const privateKey = process.env.HEDERA_TESTNET_PRIVATE_KEY;
    if (!privateKey) {
      console.log("⚠️  HEDERA_TESTNET_PRIVATE_KEY not found in environment");
      console.log("💡 Set your private key in .env.local to deploy contracts");
    } else {
      console.log("✅ Private key found in environment");

      // Check account balance
      const wallet = new ethers.Wallet(privateKey, provider);
      const balance = await provider.getBalance(wallet.address);
      console.log("💰 Account balance:", ethers.formatEther(balance), "HBAR");
      console.log("📍 Account address:", wallet.address);

      if (parseFloat(ethers.formatEther(balance)) < 0.1) {
        console.log(
          "⚠️  Low balance! Get testnet HBAR from: https://portal.hedera.com/faucet"
        );
      }
    }

    console.log("\n📋 Next steps:");
    console.log(
      "1. Deploy contract: npx hardhat ignition deploy ignition/modules/AgriYield.ts --network hederaTestnet"
    );
    console.log("2. Add Hedera Testnet to MetaMask (Chain ID: 296)");
    console.log("3. Get testnet HBAR from faucet if needed");

    console.log("\n🎉 Hedera Testnet is accessible! Ready for deployment.");
  } catch (error: any) {
    console.error("❌ Hedera Testnet check failed:", error.message);
    console.log("\n💡 To fix this:");
    console.log("1. Check your internet connection");
    console.log("2. Verify HEDERA_TESTNET_PRIVATE_KEY is set in .env.local");
    console.log(
      "3. Deploy contract: npx hardhat ignition deploy ignition/modules/AgriYield.ts --network hederaTestnet"
    );
    console.log(
      "4. Add Hedera Testnet to MetaMask (Chain ID: 296, RPC: https://testnet.hashio.io/api)"
    );
    console.log("5. Get testnet HBAR from: https://portal.hedera.com/faucet");
  }
}

checkHederaTestnet();
