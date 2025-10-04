#!/usr/bin/env tsx

import { AgriYieldHelper } from "../lib/contract";
import { ethers } from "ethers";

/**
 * Script to fund the AgriYield contract with HBAR for farmer rewards
 *
 * Usage:
 * 1. Set PRIVATE_KEY in .env.local (your Hedera Testnet private key)
 * 2. Make sure you have HBAR in your Hedera Testnet wallet
 * 3. Deploy contract to Hedera Testnet first: npm run deploy:testnet
 * 4. Run: npm run fund-rewards
 * 5. Check the transaction on Hedera Explorer
 */

async function fundRewards() {
  try {
    console.log("🌾 Funding AgriYield contract with HBAR for rewards...");
    console.log("🌐 Using Hedera Testnet: https://testnet.hashio.io/api");

    // Check if we have a wallet provider
    if (!process.env.PRIVATE_KEY) {
      console.error("❌ Please set PRIVATE_KEY environment variable");
      console.error("💡 Add your Hedera Testnet private key to .env.local");
      process.exit(1);
    }

    // Create provider and signer for Hedera Testnet
    const provider = new ethers.JsonRpcProvider(
      "https://testnet.hashio.io/api"
    );
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // Initialize contract helper
    const contractHelper = new AgriYieldHelper(signer);

    // Check if contract is deployed
    try {
      const contractAddress = contractHelper.contract.target;
      console.log(`📋 Contract Address: ${contractAddress}`);

      // Try to get contract balance to verify it's deployed
      const balance = await contractHelper.contract.provider.getBalance(
        contractAddress
      );
      console.log(
        `💳 Current Contract Balance: ${ethers.formatEther(balance)} HBAR`
      );
    } catch (error) {
      console.error("❌ Contract not found or not deployed to Hedera Testnet");
      console.error(
        "💡 Run 'npm run deploy:testnet' first to deploy the contract"
      );
      process.exit(1);
    }

    // Amount to fund (in HBAR) - you can adjust this
    const fundAmount = 100; // 100 HBAR
    const fundAmountWei = ethers.parseEther(fundAmount.toString());

    console.log(`💰 Funding contract with ${fundAmount} HBAR...`);

    // Fund the contract
    const result = await contractHelper.fundRewards(fundAmountWei);

    if (result.success) {
      console.log("✅ Contract funded successfully!");
      console.log(`📊 Transaction Hash: ${result.hash}`);
      console.log(`💰 Amount Funded: ${fundAmount} HBAR`);
      console.log(
        `🔗 View on Explorer: https://hashscan.io/testnet/transaction/${result.hash}`
      );

      // Check updated contract balance
      const newBalance = await contractHelper.contract.provider.getBalance(
        contractHelper.contract.target
      );
      console.log(
        `💳 Updated Contract Balance: ${ethers.formatEther(newBalance)} HBAR`
      );
    } else {
      console.error("❌ Failed to fund contract");
    }
  } catch (error) {
    console.error("❌ Error funding contract:", error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  fundRewards();
}

export { fundRewards };
