// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title AgriYield
 * @dev Unified smart contract for AgriYield platform
 * Handles farmer registration, yield predictions, loans, harvest tokenization, and supply chain tracking
 */
contract AgriYield is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    
    // ============ STRUCTS ============
    
    struct Farmer {
        address walletAddress;
        string name;
        string location;
        uint256 totalFarmSize; // in hectares (scaled by 100, so 150 = 1.5 hectares)
        uint256 registrationDate;
        uint256 reputationScore; // 0-1000
        bool isActive;
    }
    
    struct YieldPrediction {
        uint256 predictionId;
        address farmer;
        string cropType;
        uint256 predictedYield; // in kg (scaled by 100)
        uint256 confidence; // 0-100 percentage
        uint256 predictionDate;
        uint256 harvestDate;
        bool isVerified;
        uint256 actualYield; // set after harvest
    }
    
    struct Loan {
        uint256 loanId;
        address borrower;
        uint256 amount; // in wei
        uint256 collateralPredictionId;
        uint256 interestRate; // basis points (100 = 1%)
        uint256 startDate;
        uint256 dueDate;
        LoanStatus status;
        uint256 repaidAmount;
    }
    
    struct HarvestToken {
        uint256 tokenId;
        address farmer;
        string cropType;
        uint256 quantity; // in kg (scaled by 100)
        uint256 harvestDate;
        string qualityGrade; // A, B, C
        bool isLocked; // locked as loan collateral
        string metadataURI;
    }
    
    struct SupplyChainEvent {
        uint256 tokenId;
        string eventType; // "harvested", "processed", "shipped", "delivered"
        string location;
        uint256 timestamp;
        address actor;
        string notes;
    }
    
    // ============ ENUMS ============
    
    enum LoanStatus { Active, Repaid, Defaulted, Liquidated }
    
    // ============ STATE VARIABLES ============
    
    // Mappings
    mapping(address => Farmer) public farmers;
    mapping(uint256 => YieldPrediction) public yieldPredictions;
    mapping(uint256 => Loan) public loans;
    mapping(uint256 => HarvestToken) public harvestTokens;
    mapping(uint256 => SupplyChainEvent[]) public supplyChainEvents;
    mapping(address => uint256[]) public farmerPredictions;
    mapping(address => uint256[]) public farmerLoans;
    mapping(address => uint256[]) public farmerTokens;
    
    // Counters
    uint256 public nextPredictionId = 1;
    uint256 public nextLoanId = 1;
    uint256 public nextTokenId = 1;
    
    // Platform settings
    uint256 public platformFeeRate = 250; // 2.5% in basis points
    uint256 public defaultInterestRate = 1200; // 12% in basis points
    uint256 public maxLoanDuration = 365 days;
    uint256 public minCollateralRatio = 150; // 150% collateralization
    
    // ============ EVENTS ============
    
    event FarmerRegistered(address indexed farmer, string name, string location);
    event YieldPredictionCreated(uint256 indexed predictionId, address indexed farmer, string cropType, uint256 predictedYield);
    event YieldVerified(uint256 indexed predictionId, uint256 actualYield);
    event LoanCreated(uint256 indexed loanId, address indexed borrower, uint256 amount, uint256 collateralPredictionId);
    event LoanRepaid(uint256 indexed loanId, uint256 amount);
    event HarvestTokenMinted(uint256 indexed tokenId, address indexed farmer, string cropType, uint256 quantity);
    event SupplyChainEventAdded(uint256 indexed tokenId, string eventType, string location);
    event ReputationUpdated(address indexed farmer, uint256 newScore);
    event FarmerRewarded(address indexed farmer, uint256 amount, uint256 timestamp);
    event RewardsFunded(uint256 amount, uint256 timestamp);
    
    // ============ CONSTRUCTOR ============
    
    constructor() ERC721("AgriYield Harvest Token", "AGRI") Ownable(msg.sender) {}
    
    // ============ FARMER MANAGEMENT ============
    
    function registerFarmer(
        string memory _name,
        string memory _location,
        uint256 _totalFarmSize
    ) external {
        require(!farmers[msg.sender].isActive, "Farmer already registered");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_location).length > 0, "Location cannot be empty");
        require(_totalFarmSize > 0, "Farm size must be greater than 0");
        
        farmers[msg.sender] = Farmer({
            walletAddress: msg.sender,
            name: _name,
            location: _location,
            totalFarmSize: _totalFarmSize,
            registrationDate: block.timestamp,
            reputationScore: 500, // Start with neutral score
            isActive: true
        });
        
        emit FarmerRegistered(msg.sender, _name, _location);
    }
    
    function updateFarmerProfile(
        string memory _name,
        string memory _location,
        uint256 _totalFarmSize
    ) external {
        require(farmers[msg.sender].isActive, "Farmer not registered");
        
        Farmer storage farmer = farmers[msg.sender];
        farmer.name = _name;
        farmer.location = _location;
        farmer.totalFarmSize = _totalFarmSize;
    }
    
    // ============ YIELD PREDICTIONS ============
    
    function createYieldPrediction(
        string memory _cropType,
        uint256 _predictedYield,
        uint256 _confidence,
        uint256 _harvestDate
    ) external returns (uint256) {
        require(farmers[msg.sender].isActive, "Farmer not registered");
        require(bytes(_cropType).length > 0, "Crop type cannot be empty");
        require(_predictedYield > 0, "Predicted yield must be greater than 0");
        require(_confidence > 0 && _confidence <= 100, "Confidence must be between 1-100");
        require(_harvestDate > block.timestamp, "Harvest date must be in the future");
        
        uint256 predictionId = nextPredictionId++;
        
        yieldPredictions[predictionId] = YieldPrediction({
            predictionId: predictionId,
            farmer: msg.sender,
            cropType: _cropType,
            predictedYield: _predictedYield,
            confidence: _confidence,
            predictionDate: block.timestamp,
            harvestDate: _harvestDate,
            isVerified: false,
            actualYield: 0
        });
        
        farmerPredictions[msg.sender].push(predictionId);
        
        emit YieldPredictionCreated(predictionId, msg.sender, _cropType, _predictedYield);
        return predictionId;
    }
    
    function verifyYield(uint256 _predictionId, uint256 _actualYield) external {
        YieldPrediction storage prediction = yieldPredictions[_predictionId];
        require(prediction.farmer == msg.sender, "Not your prediction");
        require(block.timestamp >= prediction.harvestDate, "Harvest date not reached");
        require(!prediction.isVerified, "Already verified");
        require(_actualYield > 0, "Actual yield must be greater than 0");
        
        prediction.actualYield = _actualYield;
        prediction.isVerified = true;
        
        // Update farmer reputation based on prediction accuracy
        _updateReputationScore(msg.sender, prediction.predictedYield, _actualYield);
        
        emit YieldVerified(_predictionId, _actualYield);
    }
    
    // ============ LENDING SYSTEM ============
    
    function requestLoan(
        uint256 _collateralPredictionId,
        uint256 _amount
    ) external returns (uint256) {
        require(farmers[msg.sender].isActive, "Farmer not registered");
        
        YieldPrediction storage prediction = yieldPredictions[_collateralPredictionId];
        require(prediction.farmer == msg.sender, "Not your prediction");
        require(!prediction.isVerified, "Cannot use verified prediction as collateral");
        require(block.timestamp < prediction.harvestDate, "Prediction expired");
        
        // Calculate maximum loan amount based on predicted yield
        uint256 maxLoanAmount = (prediction.predictedYield * 100) / minCollateralRatio; // Simple pricing model
        require(_amount <= maxLoanAmount, "Loan amount exceeds collateral value");
        
        uint256 loanId = nextLoanId++;
        uint256 dueDate = block.timestamp + maxLoanDuration;
        
        loans[loanId] = Loan({
            loanId: loanId,
            borrower: msg.sender,
            amount: _amount,
            collateralPredictionId: _collateralPredictionId,
            interestRate: defaultInterestRate,
            startDate: block.timestamp,
            dueDate: dueDate,
            status: LoanStatus.Active,
            repaidAmount: 0
        });
        
        farmerLoans[msg.sender].push(loanId);
        
        // Transfer loan amount to borrower (in a real implementation, this would come from a lending pool)
        payable(msg.sender).transfer(_amount);
        
        emit LoanCreated(loanId, msg.sender, _amount, _collateralPredictionId);
        return loanId;
    }
    
    function repayLoan(uint256 _loanId) external payable nonReentrant {
        Loan storage loan = loans[_loanId];
        require(loan.borrower == msg.sender, "Not your loan");
        require(loan.status == LoanStatus.Active, "Loan not active");
        
        uint256 totalOwed = _calculateTotalOwed(_loanId);
        require(msg.value >= totalOwed - loan.repaidAmount, "Insufficient payment");
        
        loan.repaidAmount += msg.value;
        
        if (loan.repaidAmount >= totalOwed) {
            loan.status = LoanStatus.Repaid;
            // Update farmer reputation for successful repayment
            _updateReputationForLoanRepayment(msg.sender, true);
        }
        
        emit LoanRepaid(_loanId, msg.value);
    }
    
    // ============ HARVEST TOKENIZATION ============
    
    function mintHarvestToken(
        string memory _cropType,
        uint256 _quantity,
        string memory _qualityGrade,
        string memory _metadataURI
    ) external returns (uint256) {
        require(farmers[msg.sender].isActive, "Farmer not registered");
        require(bytes(_cropType).length > 0, "Crop type cannot be empty");
        require(_quantity > 0, "Quantity must be greater than 0");
        require(bytes(_qualityGrade).length > 0, "Quality grade cannot be empty");
        
        uint256 tokenId = nextTokenId++;
        
        harvestTokens[tokenId] = HarvestToken({
            tokenId: tokenId,
            farmer: msg.sender,
            cropType: _cropType,
            quantity: _quantity,
            harvestDate: block.timestamp,
            qualityGrade: _qualityGrade,
            isLocked: false,
            metadataURI: _metadataURI
        });
        
        farmerTokens[msg.sender].push(tokenId);
        
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, _metadataURI);
        
        // Add initial supply chain event
        _addSupplyChainEvent(tokenId, "harvested", farmers[msg.sender].location, "Harvest completed");
        
        emit HarvestTokenMinted(tokenId, msg.sender, _cropType, _quantity);
        return tokenId;
    }
    
    // ============ SUPPLY CHAIN TRACKING ============
    
    function addSupplyChainEvent(
        uint256 _tokenId,
        string memory _eventType,
        string memory _location,
        string memory _notes
    ) external {
        require(_ownerOf(_tokenId) == msg.sender, "Not token owner");
        _addSupplyChainEvent(_tokenId, _eventType, _location, _notes);
    }
    
    function _addSupplyChainEvent(
        uint256 _tokenId,
        string memory _eventType,
        string memory _location,
        string memory _notes
    ) internal {
        supplyChainEvents[_tokenId].push(SupplyChainEvent({
            tokenId: _tokenId,
            eventType: _eventType,
            location: _location,
            timestamp: block.timestamp,
            actor: msg.sender,
            notes: _notes
        }));
        
        emit SupplyChainEventAdded(_tokenId, _eventType, _location);
    }
    
    // ============ INTERNAL FUNCTIONS ============
    
    function _updateReputationScore(address _farmer, uint256 _predicted, uint256 _actual) internal {
        Farmer storage farmer = farmers[_farmer];
        
        // Calculate accuracy percentage
        uint256 accuracy;
        if (_predicted >= _actual) {
            accuracy = (_actual * 100) / _predicted;
        } else {
            accuracy = (_predicted * 100) / _actual;
        }
        
        // Update reputation based on accuracy
        if (accuracy >= 90) {
            farmer.reputationScore = _min(farmer.reputationScore + 50, 1000);
        } else if (accuracy >= 80) {
            farmer.reputationScore = _min(farmer.reputationScore + 25, 1000);
        } else if (accuracy >= 70) {
            farmer.reputationScore = _min(farmer.reputationScore + 10, 1000);
        } else {
            farmer.reputationScore = _max(farmer.reputationScore - 25, 0);
        }
        
        emit ReputationUpdated(_farmer, farmer.reputationScore);
    }
    
    function _updateReputationForLoanRepayment(address _farmer, bool _onTime) internal {
        Farmer storage farmer = farmers[_farmer];
        
        if (_onTime) {
            farmer.reputationScore = _min(farmer.reputationScore + 30, 1000);
        } else {
            farmer.reputationScore = _max(farmer.reputationScore - 50, 0);
        }
        
        emit ReputationUpdated(_farmer, farmer.reputationScore);
    }
    
    function _calculateTotalOwed(uint256 _loanId) internal view returns (uint256) {
        Loan storage loan = loans[_loanId];
        uint256 timeElapsed = block.timestamp - loan.startDate;
        uint256 interest = (loan.amount * loan.interestRate * timeElapsed) / (10000 * 365 days);
        return loan.amount + interest;
    }
    
    function _min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }
    
    function _max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? a : b;
    }
    
    // ============ VIEW FUNCTIONS ============
    
    function getFarmerPredictions(address _farmer) external view returns (uint256[] memory) {
        return farmerPredictions[_farmer];
    }
    
    function getFarmerLoans(address _farmer) external view returns (uint256[] memory) {
        return farmerLoans[_farmer];
    }
    
    function getFarmerTokens(address _farmer) external view returns (uint256[] memory) {
        return farmerTokens[_farmer];
    }
    
    function getSupplyChainEvents(uint256 _tokenId) external view returns (SupplyChainEvent[] memory) {
        return supplyChainEvents[_tokenId];
    }
    
    function getLoanDetails(uint256 _loanId) external view returns (
        address borrower,
        uint256 amount,
        uint256 totalOwed,
        LoanStatus status,
        uint256 dueDate
    ) {
        Loan storage loan = loans[_loanId];
        return (
            loan.borrower,
            loan.amount,
            _calculateTotalOwed(_loanId),
            loan.status,
            loan.dueDate
        );
    }
    
    // ============ ADMIN FUNCTIONS ============
    
    function updatePlatformSettings(
        uint256 _platformFeeRate,
        uint256 _defaultInterestRate,
        uint256 _maxLoanDuration,
        uint256 _minCollateralRatio
    ) external onlyOwner {
        platformFeeRate = _platformFeeRate;
        defaultInterestRate = _defaultInterestRate;
        maxLoanDuration = _maxLoanDuration;
        minCollateralRatio = _minCollateralRatio;
    }
    
    function withdrawPlatformFees() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    // ============ REWARD SYSTEM ============
    
    /**
     * @dev Reward a farmer with HBAR for data contribution
     * @param _farmer The farmer's wallet address
     * @param _amount The amount of HBAR to reward (in wei)
     */
    function rewardFarmer(address _farmer, uint256 _amount) external onlyOwner {
        require(_farmer != address(0), "Invalid farmer address");
        require(_amount > 0, "Reward amount must be greater than 0");
        require(address(this).balance >= _amount, "Insufficient contract balance");
        
        // Transfer HBAR to farmer
        payable(_farmer).transfer(_amount);
        
        // Emit event for tracking
        emit FarmerRewarded(_farmer, _amount, block.timestamp);
    }
    
    /**
     * @dev Fund the contract with HBAR for rewards
     */
    function fundRewards() external payable {
        require(msg.value > 0, "Must send HBAR to fund rewards");
        emit RewardsFunded(msg.value, block.timestamp);
    }
    
    // ============ REQUIRED OVERRIDES ============
    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    
    // ============ FALLBACK ============
    
    receive() external payable {
        // Accept ETH deposits for lending pool
    }
}
