import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.SEPOLIA_PRIVATE_KEY
        ? [process.env.SEPOLIA_PRIVATE_KEY]
        : [],
    },
    hederaTestnet: {
      url:
        process.env.HEDERA_TESTNET_RPC_URL || "https://testnet.hashio.io/api",
      accounts: process.env.HEDERA_TESTNET_PRIVATE_KEY
        ? [process.env.HEDERA_TESTNET_PRIVATE_KEY]
        : [],
    },
  },
};

export default config;
