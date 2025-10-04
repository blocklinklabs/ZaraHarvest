# 🌾 HBAR Rewards System Guide

## 📋 Overview

The AgriYield platform now includes a **real HBAR reward system** that transfers actual HBAR tokens to farmers when they submit farm data. This guide explains how the system works and how to set it up.

## 🔧 How It Works

### 1. **Smart Contract Functions**

- `rewardFarmer(address farmer, uint256 amount)` - Transfers HBAR to a farmer
- `fundRewards()` - Allows funding the contract with HBAR for rewards
- Events: `FarmerRewarded` and `RewardsFunded` for tracking

### 2. **HBAR Flow**

```
Contract Owner → Contract (fundRewards) → Farmers (rewardFarmer)
```

### 3. **Transaction Process**

1. User submits farm data
2. System calls `rewardFarmer(farmerAddress, 1 HBAR)`
3. Contract transfers 1 HBAR to farmer's wallet
4. Transaction is recorded on blockchain
5. User sees transaction hash in success message

## 🚀 Setup Instructions

### Step 1: Deploy Updated Contract

```bash
# Compile the updated contract
npm run compile

# Deploy to local network
npm run deploy:local

# Or deploy to Hedera Testnet
npm run deploy:testnet
```

### Step 2: Fund the Contract

```bash
# Fund the contract with HBAR for rewards
npm run fund:rewards
```

This will:

- Fund the contract with 100 HBAR (adjustable in script)
- Show transaction hash
- Display contract balance
- Provide explorer link

### Step 3: Test the System

1. Connect your wallet to the app
2. Submit farm data
3. Check your wallet for 1 HBAR reward
4. View transaction on explorer

## 🔍 Viewing Transactions

### Hedera Testnet Explorer

- **Main Explorer**: https://hashscan.io/testnet
- **Transaction URL**: `https://hashscan.io/testnet/transaction/{TRANSACTION_HASH}`

### Example Transaction

When a farmer submits data, you'll see:

```
✅ Data submitted successfully! Earned 1 HBAR (Transaction: 0x1234...)
```

Click the transaction hash to view on Hashscan.

## 💰 Contract Funding

### Current Contract Address

```
0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
```

### Funding Methods

#### Method 1: Using the Script

```bash
npm run fund:rewards
```

#### Method 2: Direct Contract Call

```javascript
const contractHelper = new AgriYieldHelper();
await contractHelper.fundRewards(ethers.parseEther("100")); // 100 HBAR
```

#### Method 3: Send HBAR Directly

Send HBAR directly to the contract address using your wallet.

## 📊 Monitoring Rewards

### Events to Track

- `FarmerRewarded(address indexed farmer, uint256 amount, uint256 timestamp)`
- `RewardsFunded(uint256 amount, uint256 timestamp)`

### Contract Balance

Check contract balance:

```javascript
const balance = await contract.provider.getBalance(contractAddress);
console.log(`Contract Balance: ${ethers.formatEther(balance)} HBAR`);
```

## 🛠️ Configuration

### Reward Amount

Currently set to **1 HBAR per submission**. To change:

1. **In Smart Contract**: Update the amount in `rewardFarmer` call
2. **In Frontend**: Update `app/submit-data/page.tsx` line 186:
   ```javascript
   const rewardTx = await contractHelper.rewardFarmer(account.address, 1); // Change 1 to desired amount
   ```

### Funding Amount

To change funding amount, edit `scripts/fund-rewards.ts`:

```javascript
const fundAmount = 100; // Change to desired amount
```

## 🔒 Security Notes

### Access Control

- Only contract owner can call `rewardFarmer`
- Only contract owner can call `fundRewards`
- Contract checks for sufficient balance before rewarding

### Error Handling

- If contract has insufficient funds, reward fails
- Frontend falls back to mock reward if contract fails
- All transactions are logged for debugging

## 🐛 Troubleshooting

### Common Issues

#### 1. "Insufficient contract balance"

**Solution**: Fund the contract using `npm run fund:rewards`

#### 2. "Transaction failed"

**Solution**: Check wallet connection and network

#### 3. "Contract not deployed"

**Solution**: Run `npm run deploy:local` or `npm run deploy:testnet`

### Debug Commands

```bash
# Check contract balance
npm run example:contract

# Test contract functions
npm run test:integration

# View contract on explorer
# Visit: https://hashscan.io/testnet/address/{CONTRACT_ADDRESS}
```

## 📈 Analytics

### Track Rewards

Monitor these events for analytics:

- Total HBAR distributed
- Number of farmers rewarded
- Average reward per farmer
- Contract funding events

### Example Analytics Query

```javascript
// Get all FarmerRewarded events
const filter = contract.filters.FarmerRewarded();
const events = await contract.queryFilter(filter);
console.log(`Total rewards distributed: ${events.length}`);
```

## 🎯 Next Steps

1. **Deploy to Mainnet**: When ready, deploy to Hedera Mainnet
2. **Automated Funding**: Set up automated contract funding
3. **Analytics Dashboard**: Build dashboard to track rewards
4. **Multi-token Support**: Add support for other tokens
5. **Dynamic Rewards**: Implement variable reward amounts based on data quality

---

**🌾 Happy Farming with Real HBAR Rewards! 🌾**
