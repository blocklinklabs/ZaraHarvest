import { expect } from "chai";
import { ethers } from "hardhat";
import { AgriYield } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("AgriYield", function () {
  let agriYield: AgriYield;
  let owner: HardhatEthersSigner;
  let farmer1: HardhatEthersSigner;
  let farmer2: HardhatEthersSigner;

  beforeEach(async function () {
    [owner, farmer1, farmer2] = await ethers.getSigners();

    const AgriYieldFactory = await ethers.getContractFactory("AgriYield");
    agriYield = await AgriYieldFactory.deploy();
    await agriYield.waitForDeployment();
  });

  describe("Farmer Registration", function () {
    it("Should register a new farmer", async function () {
      const name = "John Doe";
      const location = "Kumasi, Ghana";
      const farmSize = 500; // 5.00 hectares

      await expect(
        agriYield.connect(farmer1).registerFarmer(name, location, farmSize)
      )
        .to.emit(agriYield, "FarmerRegistered")
        .withArgs(farmer1.address, name, location);

      const farmer = await agriYield.farmers(farmer1.address);
      expect(farmer.name).to.equal(name);
      expect(farmer.location).to.equal(location);
      expect(farmer.totalFarmSize).to.equal(farmSize);
      expect(farmer.isActive).to.be.true;
      expect(farmer.reputationScore).to.equal(500);
    });

    it("Should not allow duplicate registration", async function () {
      await agriYield.connect(farmer1).registerFarmer("John", "Location", 100);

      await expect(
        agriYield.connect(farmer1).registerFarmer("John2", "Location2", 200)
      ).to.be.revertedWith("Farmer already registered");
    });

    it("Should not allow empty name or location", async function () {
      await expect(
        agriYield.connect(farmer1).registerFarmer("", "Location", 100)
      ).to.be.revertedWith("Name cannot be empty");

      await expect(
        agriYield.connect(farmer1).registerFarmer("John", "", 100)
      ).to.be.revertedWith("Location cannot be empty");
    });
  });

  describe("Yield Predictions", function () {
    beforeEach(async function () {
      await agriYield.connect(farmer1).registerFarmer("John", "Kumasi", 500);
    });

    it("Should create a yield prediction", async function () {
      const cropType = "Maize";
      const predictedYield = 2000; // 20.00 kg
      const confidence = 85;
      const harvestDate = Math.floor(Date.now() / 1000) + 86400 * 90; // 90 days from now

      await expect(
        agriYield
          .connect(farmer1)
          .createYieldPrediction(
            cropType,
            predictedYield,
            confidence,
            harvestDate
          )
      )
        .to.emit(agriYield, "YieldPredictionCreated")
        .withArgs(1, farmer1.address, cropType, predictedYield);

      const prediction = await agriYield.yieldPredictions(1);
      expect(prediction.cropType).to.equal(cropType);
      expect(prediction.predictedYield).to.equal(predictedYield);
      expect(prediction.confidence).to.equal(confidence);
      expect(prediction.farmer).to.equal(farmer1.address);
      expect(prediction.isVerified).to.be.false;
    });

    it("Should not allow non-registered farmers to create predictions", async function () {
      await expect(
        agriYield
          .connect(farmer2)
          .createYieldPrediction("Maize", 1000, 80, Date.now() + 86400)
      ).to.be.revertedWith("Farmer not registered");
    });
  });

  describe("Harvest Token Minting", function () {
    beforeEach(async function () {
      await agriYield.connect(farmer1).registerFarmer("John", "Kumasi", 500);
    });

    it("Should mint a harvest token", async function () {
      const cropType = "Cocoa";
      const quantity = 1500; // 15.00 kg
      const qualityGrade = "A";
      const metadataURI = "https://example.com/metadata/1";

      await expect(
        agriYield
          .connect(farmer1)
          .mintHarvestToken(cropType, quantity, qualityGrade, metadataURI)
      )
        .to.emit(agriYield, "HarvestTokenMinted")
        .withArgs(1, farmer1.address, cropType, quantity);

      const token = await agriYield.harvestTokens(1);
      expect(token.cropType).to.equal(cropType);
      expect(token.quantity).to.equal(quantity);
      expect(token.qualityGrade).to.equal(qualityGrade);
      expect(token.farmer).to.equal(farmer1.address);
      expect(token.isLocked).to.be.false;

      // Check NFT ownership
      expect(await agriYield.ownerOf(1)).to.equal(farmer1.address);
      expect(await agriYield.tokenURI(1)).to.equal(metadataURI);
    });

    it("Should add initial supply chain event when minting", async function () {
      await agriYield
        .connect(farmer1)
        .mintHarvestToken("Cocoa", 1000, "A", "uri");

      const events = await agriYield.getSupplyChainEvents(1);
      expect(events.length).to.equal(1);
      expect(events[0].eventType).to.equal("harvested");
      expect(events[0].location).to.equal("Kumasi");
      expect(events[0].actor).to.equal(farmer1.address);
    });
  });

  describe("Supply Chain Tracking", function () {
    beforeEach(async function () {
      await agriYield.connect(farmer1).registerFarmer("John", "Kumasi", 500);
      await agriYield
        .connect(farmer1)
        .mintHarvestToken("Cocoa", 1000, "A", "uri");
    });

    it("Should add supply chain events", async function () {
      await expect(
        agriYield
          .connect(farmer1)
          .addSupplyChainEvent(
            1,
            "processed",
            "Accra Processing Plant",
            "Quality check passed"
          )
      )
        .to.emit(agriYield, "SupplyChainEventAdded")
        .withArgs(1, "processed", "Accra Processing Plant");

      const events = await agriYield.getSupplyChainEvents(1);
      expect(events.length).to.equal(2); // Initial harvest + new event
      expect(events[1].eventType).to.equal("processed");
      expect(events[1].location).to.equal("Accra Processing Plant");
      expect(events[1].notes).to.equal("Quality check passed");
    });

    it("Should only allow token owner to add events", async function () {
      await expect(
        agriYield
          .connect(farmer2)
          .addSupplyChainEvent(1, "processed", "Location", "Notes")
      ).to.be.revertedWith("Not token owner");
    });
  });

  describe("Platform Settings", function () {
    it("Should allow owner to update platform settings", async function () {
      const newFeeRate = 300; // 3%
      const newInterestRate = 1500; // 15%
      const newMaxDuration = 180 * 24 * 60 * 60; // 180 days
      const newCollateralRatio = 200; // 200%

      await agriYield
        .connect(owner)
        .updatePlatformSettings(
          newFeeRate,
          newInterestRate,
          newMaxDuration,
          newCollateralRatio
        );

      expect(await agriYield.platformFeeRate()).to.equal(newFeeRate);
      expect(await agriYield.defaultInterestRate()).to.equal(newInterestRate);
      expect(await agriYield.maxLoanDuration()).to.equal(newMaxDuration);
      expect(await agriYield.minCollateralRatio()).to.equal(newCollateralRatio);
    });

    it("Should not allow non-owner to update settings", async function () {
      await expect(
        agriYield.connect(farmer1).updatePlatformSettings(300, 1500, 180, 200)
      ).to.be.revertedWithCustomError(agriYield, "OwnableUnauthorizedAccount");
    });
  });

  describe("View Functions", function () {
    beforeEach(async function () {
      await agriYield.connect(farmer1).registerFarmer("John", "Kumasi", 500);
      await agriYield
        .connect(farmer1)
        .createYieldPrediction(
          "Maize",
          2000,
          85,
          Math.floor(Date.now() / 1000) + 86400 * 90
        );
      await agriYield
        .connect(farmer1)
        .mintHarvestToken("Cocoa", 1000, "A", "uri");
    });

    it("Should return farmer predictions", async function () {
      const predictions = await agriYield.getFarmerPredictions(farmer1.address);
      expect(predictions.length).to.equal(1);
      expect(predictions[0]).to.equal(1);
    });

    it("Should return farmer tokens", async function () {
      const tokens = await agriYield.getFarmerTokens(farmer1.address);
      expect(tokens.length).to.equal(1);
      expect(tokens[0]).to.equal(1);
    });
  });
});
