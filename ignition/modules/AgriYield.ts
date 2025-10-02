// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AgriYieldModule = buildModule("AgriYieldModule", (m) => {
  // Deploy the unified AgriYield contract
  const agriYield = m.contract("AgriYield", []);

  return { agriYield };
});

export default AgriYieldModule;
