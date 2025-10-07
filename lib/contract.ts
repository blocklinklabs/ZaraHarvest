import { ethers } from "ethers";
import AgriYieldArtifact from "../artifacts/contracts/AgriYield.sol/AgriYield.json";

// Contract configuration
export const CONTRACT_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"; // From deployment
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

  // Supply Chain
  addSupplyChainEvent: (
    tokenId: number,
    eventType: string,
    location: string,
    notes: string
  ) => Promise<any>;

  // Reward System
  rewardFarmer: (farmer: string, amount: number) => Promise<any>;
  fundRewards: () => Promise<any>;

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

  // Yield prediction operations
  async createYieldPrediction(
    cropType: string,
    predictedYield: number,
    confidence: number,
    harvestDate: number
  ) {
    const tx = await this.contract.createYieldPrediction(
      cropType,
      predictedYield,
      confidence,
      harvestDate
    );
    return await tx.wait();
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
    const tx = await this.contract.mintHarvestToken(
      cropType,
      quantity,
      qualityGrade,
      metadataURI
    );
    return await tx.wait();
  }

  async getHarvestToken(tokenId: number) {
    return await this.contract.harvestTokens(tokenId);
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
      const tx = await this.contract.fundRewards({ value: amount || 0n });
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

// Export contract address for easy access
export { CONTRACT_ADDRESS as AGRIYIELD_CONTRACT_ADDRESS };
