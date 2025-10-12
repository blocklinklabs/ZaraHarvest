import { ethers } from "ethers";
import AgriYieldArtifact from "../artifacts/contracts/AgriYield.sol/AgriYield.json";

// Contract configuration - will be updated after Hedera Testnet deployment
export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Placeholder - deploy to Hedera Testnet
export const CONTRACT_ABI = AgriYieldArtifact.abi;

// Contract interface for type safety
export interface AgriYieldContract {
  // Farmer Management
  registerFarmer: (
    name: string,
    location: string,
    totalFarmSize: number
  ) => Promise<any>;
  updateFarmerProfile: (
    name: string,
    location: string,
    totalFarmSize: number
  ) => Promise<any>;
  farmers: (address: string) => Promise<{
    walletAddress: string;
    name: string;
    location: string;
    totalFarmSize: number;
    registrationDate: number;
    reputationScore: number;
    isActive: boolean;
  }>;

  // Yield Predictions
  createYieldPrediction: (
    cropType: string,
    predictedYield: number,
    confidence: number,
    harvestDate: number
  ) => Promise<any>;
  verifyYield: (predictionId: number, actualYield: number) => Promise<any>;
  yieldPredictions: (id: number) => Promise<{
    predictionId: number;
    farmer: string;
    cropType: string;
    predictedYield: number;
    confidence: number;
    predictionDate: number;
    harvestDate: number;
    isVerified: boolean;
    actualYield: number;
  }>;

  // Harvest Tokenization
  mintHarvestToken: (
    cropType: string,
    quantity: number,
    qualityGrade: string,
    metadataURI: string
  ) => Promise<any>;
  harvestTokens: (id: number) => Promise<{
    tokenId: number;
    farmer: string;
    cropType: string;
    quantity: number;
    harvestDate: number;
    qualityGrade: string;
    isLocked: boolean;
    metadataURI: string;
  }>;

  // Lending System
  requestLoan: (collateralPredictionId: number, amount: bigint) => Promise<any>;
  repayLoan: (loanId: number, options?: { value: bigint }) => Promise<any>;
  loans: (id: number) => Promise<{
    loanId: number;
    borrower: string;
    amount: number;
    collateralPredictionId: number;
    interestRate: number;
    startDate: number;
    dueDate: number;
    status: number;
    repaidAmount: number;
  }>;

  // Supply Chain
  addSupplyChainEvent: (
    tokenId: number,
    eventType: string,
    location: string,
    notes: string
  ) => Promise<any>;

  // Reward System
  rewardFarmer: (farmer: string, amount: bigint) => Promise<any>;
  fundRewards: (amount?: bigint) => Promise<any>;

  // View Functions
  getFarmerPredictions: (farmer: string) => Promise<number[]>;
  getFarmerLoans: (farmer: string) => Promise<number[]>;
  getFarmerTokens: (farmer: string) => Promise<number[]>;
  getSupplyChainEvents: (tokenId: number) => Promise<any[]>;
  getLoanDetails: (loanId: number) => Promise<{
    borrower: string;
    amount: number;
    totalOwed: number;
    status: number;
    dueDate: number;
  }>;

  // Platform Settings
  platformFeeRate: () => Promise<number>;
  defaultInterestRate: () => Promise<number>;
  maxLoanDuration: () => Promise<number>;
  minCollateralRatio: () => Promise<number>;
}

// Contract instance factory
export function getAgriYieldContract(
  provider: ethers.Provider | ethers.Signer
): AgriYieldContract {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider) as any;
}

// Helper functions for common operations
export class AgriYieldHelper {
  private contract: AgriYieldContract;

  constructor(provider: ethers.Provider | ethers.Signer) {
    this.contract = getAgriYieldContract(provider);
  }

  // Farmer operations
  async registerFarmer(name: string, location: string, totalFarmSize: number) {
    const tx = await this.contract.registerFarmer(
      name,
      location,
      totalFarmSize
    );
    return await tx.wait();
  }

  async getFarmer(address: string) {
    return await this.contract.farmers(address);
  }

  async getYieldPrediction(predictionId: number) {
    return await this.contract.yieldPredictions(predictionId);
  }

  // Harvest token operations
  async mintHarvestToken(
    cropType: string,
    quantity: number,
    qualityGrade: string,
    metadataURI: string
  ) {
    try {
      const tx = await this.contract.mintHarvestToken(
        cropType,
        quantity,
        qualityGrade,
        metadataURI
      );
      const receipt = await tx.wait();
      return {
        hash: tx.hash,
        receipt,
        success: true,
      };
    } catch (error) {
      console.error("Error minting harvest token:", error);
      throw error;
    }
  }

  async getHarvestToken(tokenId: number) {
    return await this.contract.harvestTokens(tokenId);
  }

  // Yield Prediction operations
  async createYieldPrediction(
    cropType: string,
    predictedYield: number,
    confidence: number,
    harvestDate: number
  ) {
    try {
      console.log("Creating yield prediction with:", {
        cropType,
        predictedYield,
        confidence,
        harvestDate,
      });

      const tx = await this.contract.createYieldPrediction(
        cropType,
        predictedYield,
        confidence,
        harvestDate
      );
      const receipt = await tx.wait();
      return {
        hash: tx.hash,
        receipt,
        success: true,
        predictionId: receipt.logs[0]?.args?.predictionId || 1,
      };
    } catch (error: any) {
      console.error("Failed to create yield prediction:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Lending operations
  async requestLoan(collateralPredictionId: number, amount: bigint) {
    try {
      console.log("Contract requestLoan called with:", {
        collateralPredictionId,
        amount,
        amountType: typeof amount,
        isNaN: Number.isNaN(amount),
      });

      const tx = await this.contract.requestLoan(
        collateralPredictionId,
        amount
      );
      const receipt = await tx.wait();
      return {
        hash: tx.hash,
        receipt,
        success: true,
        loanId: receipt.logs[0]?.args?.loanId || null,
      };
    } catch (error) {
      console.error("Error requesting loan:", error);
      throw error;
    }
  }

  async repayLoan(loanId: number, amount: bigint) {
    try {
      const tx = await this.contract.repayLoan(loanId, { value: amount });
      const receipt = await tx.wait();
      return {
        hash: tx.hash,
        receipt,
        success: true,
        amount: amount,
      };
    } catch (error) {
      console.error("Error repaying loan:", error);
      throw error;
    }
  }

  async getLoan(loanId: number) {
    return await this.contract.loans(loanId);
  }

  async getLoanDetails(loanId: number) {
    return await this.contract.getLoanDetails(loanId);
  }

  // Supply chain operations
  async addSupplyChainEvent(
    tokenId: number,
    eventType: string,
    location: string,
    notes: string
  ) {
    const tx = await this.contract.addSupplyChainEvent(
      tokenId,
      eventType,
      location,
      notes
    );
    return await tx.wait();
  }

  async getSupplyChainEvents(tokenId: number) {
    try {
      return await this.contract.getSupplyChainEvents(tokenId);
    } catch (error) {
      console.log("⚠️  getSupplyChainEvents not available in current ABI");
      return [];
    }
  }

  // View functions
  async getFarmerPredictions(farmer: string) {
    return await this.contract.getFarmerPredictions(farmer);
  }

  async getFarmerTokens(farmer: string) {
    return await this.contract.getFarmerTokens(farmer);
  }

  async getFarmerLoans(farmer: string) {
    return await this.contract.getFarmerLoans(farmer);
  }

  // Reward System
  async rewardFarmer(farmer: string, amount: bigint) {
    try {
      const tx = await this.contract.rewardFarmer(farmer, amount);
      await tx.wait();
      return {
        hash: tx.hash,
        success: true,
        amount: amount,
        farmer: farmer,
      };
    } catch (error) {
      console.error("Error rewarding farmer:", error);
      throw error;
    }
  }

  async fundRewards(amount?: bigint) {
    try {
      const tx = await this.contract.fundRewards(amount || 0n);
      await tx.wait();
      return {
        hash: tx.hash,
        success: true,
        amount: amount || 0n,
      };
    } catch (error) {
      console.error("Error funding rewards:", error);
      throw error;
    }
  }

  // Platform info
  async getPlatformSettings() {
    const [feeRate, interestRate, maxDuration, collateralRatio] =
      await Promise.all([
        this.contract.platformFeeRate(),
        this.contract.defaultInterestRate(),
        this.contract.maxLoanDuration(),
        this.contract.minCollateralRatio(),
      ]);

    return {
      feeRate: Number(feeRate),
      interestRate: Number(interestRate),
      maxDuration: Number(maxDuration),
      collateralRatio: Number(collateralRatio),
    };
  }
}

// Server-side contract helper for owner operations
export function getServerContractHelper(): AgriYieldHelper {
  // Use Hedera Testnet
  const rpcUrl =
    process.env.HEDERA_TESTNET_RPC_URL || "https://testnet.hashio.io/api";
  const privateKey = process.env.HEDERA_TESTNET_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("HEDERA_TESTNET_PRIVATE_KEY not set in environment");
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const signer = new ethers.Wallet(privateKey, provider);

  return new AgriYieldHelper(signer);
}

// Export contract address for easy access
export { CONTRACT_ADDRESS as AGRIYIELD_CONTRACT_ADDRESS };
