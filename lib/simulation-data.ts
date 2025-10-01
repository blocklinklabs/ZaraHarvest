// Simulation data for AgriYield app
// This file contains realistic data to make the app appear fully functional

// Fixed timestamps to avoid hydration issues
const baseDate = new Date("2024-09-30T10:00:00Z");

export const simulationData = {
  // Realistic farm data entries
  farmData: [
    {
      id: "farm-1",
      cropType: "Maize",
      location: "Kumasi, Ghana",
      soilMoisture: 78,
      weatherNotes: "Sunny with light clouds, optimal growing conditions",
      timestamp: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
      id: "farm-2",
      cropType: "Cocoa",
      location: "Takoradi, Ghana",
      soilMoisture: 82,
      weatherNotes: "Heavy rainfall, good for cocoa growth",
      timestamp: new Date(baseDate.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    },
    {
      id: "farm-3",
      cropType: "Rice",
      location: "Tamale, Ghana",
      soilMoisture: 85,
      weatherNotes: "Irrigation system working well, fields flooded",
      timestamp: new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    },
    {
      id: "farm-4",
      cropType: "Cassava",
      location: "Accra, Ghana",
      soilMoisture: 72,
      weatherNotes: "Dry season, need to increase irrigation",
      timestamp: new Date(baseDate.getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    },
    {
      id: "farm-5",
      cropType: "Wheat",
      location: "Kumasi, Ghana",
      soilMoisture: 68,
      weatherNotes: "Cool weather, wheat growing well",
      timestamp: new Date(baseDate.getTime() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    },
  ],

  // Realistic yield predictions
  yieldPredictions: [
    {
      cropType: "Maize",
      predictedYield: 4.2,
      riskLevel: 12,
      confidence: 89,
      timestamp: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      cropType: "Cocoa",
      predictedYield: 2.8,
      riskLevel: 18,
      confidence: 85,
      timestamp: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
    {
      cropType: "Rice",
      predictedYield: 3.5,
      riskLevel: 8,
      confidence: 92,
      timestamp: new Date(baseDate.getTime() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    },
  ],

  // Realistic loans
  loans: [
    {
      id: "loan-1",
      amount: 1500,
      interestRate: 6.5,
      status: "active" as const,
      collateral: ["Maize harvest tokens"],
      startDate: new Date(baseDate.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      endDate: new Date(baseDate.getTime() + 150 * 24 * 60 * 60 * 1000), // 150 days from now
    },
  ],

  // Realistic harvest tokens
  harvestTokens: [
    {
      id: "token-1",
      cropType: "Maize",
      amount: 4.2,
      tokenizedAmount: 42,
      status: "tokenized" as const,
      qrCode: "https://agriyield.app/token/maize-001",
    },
    {
      id: "token-2",
      cropType: "Cocoa",
      amount: 2.8,
      tokenizedAmount: 28,
      status: "tokenized" as const,
      qrCode: "https://agriyield.app/token/cocoa-001",
    },
    {
      id: "token-3",
      cropType: "Rice",
      amount: 3.5,
      tokenizedAmount: 35,
      status: "pending" as const,
      qrCode: "https://agriyield.app/token/rice-001",
    },
  ],

  // Realistic badges (some earned)
  badges: [
    {
      id: "data-contributor",
      name: "Data Contributor",
      description: "Submit 3+ farm data entries",
      earned: true,
      earnedDate: new Date(baseDate.getTime() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: "yield-predictor",
      name: "Yield Predictor",
      description: "Get your first yield prediction",
      earned: true,
      earnedDate: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "token-holder",
      name: "Token Holder",
      description: "Tokenize your first harvest",
      earned: true,
      earnedDate: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: "loan-borrower",
      name: "Loan Borrower",
      description: "Take your first loan",
      earned: true,
      earnedDate: new Date(baseDate.getTime() - 30 * 24 * 60 * 60 * 1000),
    },
  ],

  // Additional realistic data for enhanced simulation
  marketData: {
    currentPrices: {
      Maize: 450, // GHS per ton
      Cocoa: 1200, // GHS per ton
      Rice: 380, // GHS per ton
      Wheat: 520, // GHS per ton
      Cassava: 280, // GHS per ton
    },
    priceChanges: {
      Maize: 5.2, // % change
      Cocoa: -2.1, // % change
      Rice: 3.8, // % change
      Wheat: 1.5, // % change
      Cassava: 4.3, // % change
    },
  },

  // Weather data for realistic simulation
  weatherData: {
    current: {
      temperature: 28,
      humidity: 75,
      rainfall: 12,
      windSpeed: 8,
      condition: "Partly Cloudy",
    },
    forecast: [
      {
        day: "Today",
        high: 30,
        low: 24,
        condition: "Sunny",
        rainfall: 0,
      },
      {
        day: "Tomorrow",
        high: 29,
        low: 23,
        condition: "Partly Cloudy",
        rainfall: 5,
      },
      {
        day: "Day 3",
        high: 27,
        low: 22,
        condition: "Rainy",
        rainfall: 15,
      },
    ],
  },

  // User profile data
  userProfile: {
    name: "Kwame Asante",
    location: "Kumasi, Ghana",
    farmSize: "5.2 hectares",
    experience: "8 years",
    crops: ["Maize", "Cocoa", "Rice", "Cassava"],
    rating: 4.7,
    totalHarvest: 156.8, // tons
    totalEarnings: 45230, // GHS
  },

  // Analytics data for charts
  analyticsData: {
    monthlyHarvest: [
      { month: "Jan", yield: 12.5, revenue: 5625 },
      { month: "Feb", yield: 15.2, revenue: 6840 },
      { month: "Mar", yield: 18.8, revenue: 8460 },
      { month: "Apr", yield: 22.1, revenue: 9945 },
      { month: "May", yield: 19.5, revenue: 8775 },
      { month: "Jun", yield: 16.3, revenue: 7335 },
    ],
    cropDistribution: [
      { crop: "Maize", percentage: 35, color: "#10b981" },
      { crop: "Cocoa", percentage: 25, color: "#f59e0b" },
      { crop: "Rice", percentage: 20, color: "#3b82f6" },
      { crop: "Cassava", percentage: 15, color: "#8b5cf6" },
      { crop: "Wheat", percentage: 5, color: "#ef4444" },
    ],
    riskAnalysis: {
      low: 2,
      medium: 1,
      high: 0,
    },
  },

  // Recent activities for timeline
  recentActivities: [
    {
      id: "activity-1",
      type: "harvest",
      description: "Harvested 4.2 tons of Maize",
      timestamp: new Date(baseDate.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: "🌾",
    },
    {
      id: "activity-2",
      type: "prediction",
      description: "Received yield prediction for Cocoa",
      timestamp: new Date(baseDate.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
      icon: "📊",
    },
    {
      id: "activity-3",
      type: "loan",
      description: "Loan payment of GHS 150 processed",
      timestamp: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      icon: "💰",
    },
    {
      id: "activity-4",
      type: "token",
      description: "Tokenized 2.8 tons of Cocoa",
      timestamp: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      icon: "🪙",
    },
  ],
};

// Helper function to generate realistic mock data
export const generateMockData = () => {
  const cropTypes = ["Maize", "Cocoa", "Rice", "Wheat", "Cassava"];
  const locations = ["Kumasi", "Accra", "Tamale", "Takoradi", "Cape Coast"];

  return {
    cropType: cropTypes[Math.floor(Math.random() * cropTypes.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    soilMoisture: Math.floor(Math.random() * 30) + 60, // 60-90%
    weatherNotes: [
      "Optimal growing conditions",
      "Heavy rainfall, good for growth",
      "Sunny weather, need irrigation",
      "Cloudy with light rain",
      "Hot and dry, increase watering",
    ][Math.floor(Math.random() * 5)],
  };
};

// Market price simulation
export const simulateMarketPrices = () => {
  const basePrices = {
    Maize: 450,
    Cocoa: 1200,
    Rice: 380,
    Wheat: 520,
    Cassava: 280,
  };

  return Object.entries(basePrices).map(([crop, price]) => ({
    crop,
    price: price + (Math.random() - 0.5) * 50, // ±25 GHS variation
    change: (Math.random() - 0.5) * 10, // ±5% change
  }));
};
