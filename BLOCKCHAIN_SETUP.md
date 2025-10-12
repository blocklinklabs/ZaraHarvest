# 🔗 Blockchain Setup Guide

## Local Development Setup

### 1. Start Local Hardhat Network

```bash
npx hardhat node
```

This will start a local blockchain at `http://127.0.0.1:8545`

### 2. Deploy Contract

```bash
npx hardhat ignition deploy ignition/modules/AgriYield.ts --network localhost
```

### 3. Configure MetaMask

Add the local Hardhat network to MetaMask:

- **Network Name**: Hardhat Local
- **RPC URL**: `http://127.0.0.1:8545`
- **Chain ID**: `31337`
- **Currency Symbol**: `ETH`

### 4. Import Test Account

Import one of the Hardhat test accounts to MetaMask:

**Private Key**: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

This account has 10,000 ETH for testing.

### 5. Contract Information

- **Contract Address**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- **Network**: Hardhat Local (Chain ID: 31337)

## Testing the Integration

1. Start the development server: `npm run dev`
2. Connect MetaMask to the Hardhat Local network
3. Go to the Lending page
4. Try tokenizing harvest - it should now create real blockchain transactions!

## Transaction Explorer

For local development, you can view transactions in the Hardhat console output.

## Troubleshooting

### "Invalid transaction id" Error

- Make sure you're connected to the Hardhat Local network (Chain ID: 31337)
- Ensure the local Hardhat node is running
- Check that the contract is deployed to the correct address

### MetaMask Connection Issues

- Reset MetaMask account (Settings > Advanced > Reset Account)
- Make sure you're on the correct network
- Import the test account with the provided private key
