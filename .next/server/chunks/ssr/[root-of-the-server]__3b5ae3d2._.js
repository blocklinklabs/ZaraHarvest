module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/hybrid-store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useHybridStore",
    ()=>useHybridStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
;
;
const useHybridStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        // Wallet
        wallet: {
            accountId: null,
            isConnected: false,
            connect: async (accountId)=>{
                set((state)=>({
                        wallet: {
                            ...state.wallet,
                            accountId,
                            isConnected: true
                        }
                    }));
                // Initialize user in database
                try {
                    await fetch("/api/user/initialize", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            walletAddress: accountId
                        })
                    });
                    await get().syncWithDatabase();
                } catch (error) {
                    console.error("Failed to sync with database:", error);
                }
            },
            disconnect: ()=>set((state)=>({
                        wallet: {
                            ...state.wallet,
                            accountId: null,
                            isConnected: false
                        }
                    }))
        },
        // Farm Data
        farmData: [],
        addFarmData: async (data)=>{
            const newData = {
                ...data,
                id: crypto.randomUUID(),
                timestamp: new Date()
            };
            set((state)=>({
                    farmData: [
                        ...state.farmData,
                        newData
                    ]
                }));
            // Save to database
            try {
                await fetch("/api/farm-data", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
            } catch (error) {
                console.error("Failed to save farm data to database:", error);
            }
        },
        // Yield Predictions
        yieldPredictions: [],
        addYieldPrediction: async (prediction)=>{
            const newPrediction = {
                ...prediction,
                timestamp: new Date()
            };
            set((state)=>({
                    yieldPredictions: [
                        ...state.yieldPredictions,
                        newPrediction
                    ]
                }));
            // Save to database
            try {
                await fetch("/api/yield-predictions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(prediction)
                });
            } catch (error) {
                console.error("Failed to save yield prediction to database:", error);
            }
        },
        // Loans
        loans: [],
        addLoan: async (loan)=>{
            const newLoan = {
                ...loan,
                id: crypto.randomUUID()
            };
            set((state)=>({
                    loans: [
                        ...state.loans,
                        newLoan
                    ]
                }));
            // Save to database
            try {
                await fetch("/api/loans", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(loan)
                });
            } catch (error) {
                console.error("Failed to save loan to database:", error);
            }
        },
        updateLoanStatus: async (loanId, status)=>{
            set((state)=>({
                    loans: state.loans.map((loan)=>loan.id === loanId ? {
                            ...loan,
                            status
                        } : loan)
                }));
            // Update in database
            try {
            // Database update would go here
            } catch (error) {
                console.error("Failed to update loan status in database:", error);
            }
        },
        // Harvest Tokens
        harvestTokens: [],
        addHarvestToken: async (token)=>{
            const newToken = {
                ...token,
                id: crypto.randomUUID(),
                qrCode: `https://agriyield.app/token/${crypto.randomUUID()}`
            };
            set((state)=>({
                    harvestTokens: [
                        ...state.harvestTokens,
                        newToken
                    ]
                }));
            // Save to database
            try {
                await fetch("/api/harvest-tokens", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(token)
                });
            } catch (error) {
                console.error("Failed to save harvest token to database:", error);
            }
        },
        updateTokenStatus: async (tokenId, status)=>{
            set((state)=>({
                    harvestTokens: state.harvestTokens.map((token)=>token.id === tokenId ? {
                            ...token,
                            status
                        } : token)
                }));
            // Update in database
            try {
            // Database update would go here
            } catch (error) {
                console.error("Failed to update token status in database:", error);
            }
        },
        // Badges
        badges: [
            {
                id: "data-contributor",
                name: "Data Contributor",
                description: "Submit 3+ farm data entries",
                earned: false
            },
            {
                id: "yield-predictor",
                name: "Yield Predictor",
                description: "Get your first yield prediction",
                earned: false
            },
            {
                id: "token-holder",
                name: "Token Holder",
                description: "Tokenize your first harvest",
                earned: false
            },
            {
                id: "loan-borrower",
                name: "Loan Borrower",
                description: "Take your first loan",
                earned: false
            }
        ],
        earnBadge: async (badgeId)=>{
            const badge = get().badges.find((b)=>b.id === badgeId);
            if (!badge) return;
            set((state)=>({
                    badges: state.badges.map((badge)=>badge.id === badgeId ? {
                            ...badge,
                            earned: true,
                            earnedDate: new Date()
                        } : badge)
                }));
            // Save to database
            try {
                await fetch("/api/badges", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        badgeId,
                        name: badge.name,
                        description: badge.description
                    })
                });
            } catch (error) {
                console.error("Failed to save badge to database:", error);
            }
        },
        // Offline
        isOnline: true,
        setOnlineStatus: (status)=>set({
                isOnline: status
            }),
        // Database sync
        isDatabaseConnected: false,
        syncWithDatabase: async ()=>{
            try {
                const response = await fetch("/api/user/data");
                const userData = await response.json();
                set({
                    farmData: userData.farmData,
                    yieldPredictions: userData.yieldPredictions,
                    loans: userData.loans,
                    harvestTokens: userData.harvestTokens,
                    badges: userData.badges,
                    isDatabaseConnected: true
                });
            } catch (error) {
                console.error("Failed to sync with database:", error);
                set({
                    isDatabaseConnected: false
                });
            }
        }
    }), {
    name: "agriyield-hybrid-storage",
    partialize: (state)=>({
            wallet: state.wallet,
            farmData: state.farmData,
            yieldPredictions: state.yieldPredictions,
            loans: state.loans,
            harvestTokens: state.harvestTokens,
            badges: state.badges,
            isDatabaseConnected: state.isDatabaseConnected
        })
}));
}),
"[project]/lib/store.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Re-export the hybrid store as the main store
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hybrid$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hybrid-store.ts [app-ssr] (ecmascript)");
;
 // The useAppStore is now exported from hybrid-store.ts
}),
"[project]/lib/hybrid-store.ts [app-ssr] (ecmascript) <export useHybridStore as useAppStore>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAppStore",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hybrid$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHybridStore"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hybrid$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hybrid-store.ts [app-ssr] (ecmascript)");
}),
"[project]/lib/simulation-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Simulation data for AgriYield app
// This file contains realistic data to make the app appear fully functional
// Fixed timestamps to avoid hydration issues
__turbopack_context__.s([
    "generateMockData",
    ()=>generateMockData,
    "simulateMarketPrices",
    ()=>simulateMarketPrices,
    "simulationData",
    ()=>simulationData
]);
const baseDate = new Date("2024-09-30T10:00:00Z");
const simulationData = {
    // Realistic farm data entries
    farmData: [
        {
            id: "farm-1",
            cropType: "Maize",
            location: "Kumasi, Ghana",
            soilMoisture: 78,
            weatherNotes: "Sunny with light clouds, optimal growing conditions",
            timestamp: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000)
        },
        {
            id: "farm-2",
            cropType: "Cocoa",
            location: "Takoradi, Ghana",
            soilMoisture: 82,
            weatherNotes: "Heavy rainfall, good for cocoa growth",
            timestamp: new Date(baseDate.getTime() - 5 * 24 * 60 * 60 * 1000)
        },
        {
            id: "farm-3",
            cropType: "Rice",
            location: "Tamale, Ghana",
            soilMoisture: 85,
            weatherNotes: "Irrigation system working well, fields flooded",
            timestamp: new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000)
        },
        {
            id: "farm-4",
            cropType: "Cassava",
            location: "Accra, Ghana",
            soilMoisture: 72,
            weatherNotes: "Dry season, need to increase irrigation",
            timestamp: new Date(baseDate.getTime() - 10 * 24 * 60 * 60 * 1000)
        },
        {
            id: "farm-5",
            cropType: "Wheat",
            location: "Kumasi, Ghana",
            soilMoisture: 68,
            weatherNotes: "Cool weather, wheat growing well",
            timestamp: new Date(baseDate.getTime() - 14 * 24 * 60 * 60 * 1000)
        }
    ],
    // Realistic yield predictions
    yieldPredictions: [
        {
            cropType: "Maize",
            predictedYield: 4.2,
            riskLevel: 12,
            confidence: 89,
            timestamp: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000)
        },
        {
            cropType: "Cocoa",
            predictedYield: 2.8,
            riskLevel: 18,
            confidence: 85,
            timestamp: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000)
        },
        {
            cropType: "Rice",
            predictedYield: 3.5,
            riskLevel: 8,
            confidence: 92,
            timestamp: new Date(baseDate.getTime() - 6 * 24 * 60 * 60 * 1000)
        }
    ],
    // Realistic loans
    loans: [
        {
            id: "loan-1",
            amount: 1500,
            interestRate: 6.5,
            status: "active",
            collateral: [
                "Maize harvest tokens"
            ],
            startDate: new Date(baseDate.getTime() - 30 * 24 * 60 * 60 * 1000),
            endDate: new Date(baseDate.getTime() + 150 * 24 * 60 * 60 * 1000)
        }
    ],
    // Realistic harvest tokens
    harvestTokens: [
        {
            id: "token-1",
            cropType: "Maize",
            amount: 4.2,
            tokenizedAmount: 42,
            status: "tokenized",
            qrCode: "https://agriyield.app/token/maize-001"
        },
        {
            id: "token-2",
            cropType: "Cocoa",
            amount: 2.8,
            tokenizedAmount: 28,
            status: "tokenized",
            qrCode: "https://agriyield.app/token/cocoa-001"
        },
        {
            id: "token-3",
            cropType: "Rice",
            amount: 3.5,
            tokenizedAmount: 35,
            status: "pending",
            qrCode: "https://agriyield.app/token/rice-001"
        }
    ],
    // Realistic badges (some earned)
    badges: [
        {
            id: "data-contributor",
            name: "Data Contributor",
            description: "Submit 3+ farm data entries",
            earned: true,
            earnedDate: new Date(baseDate.getTime() - 5 * 24 * 60 * 60 * 1000)
        },
        {
            id: "yield-predictor",
            name: "Yield Predictor",
            description: "Get your first yield prediction",
            earned: true,
            earnedDate: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000)
        },
        {
            id: "token-holder",
            name: "Token Holder",
            description: "Tokenize your first harvest",
            earned: true,
            earnedDate: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000)
        },
        {
            id: "loan-borrower",
            name: "Loan Borrower",
            description: "Take your first loan",
            earned: true,
            earnedDate: new Date(baseDate.getTime() - 30 * 24 * 60 * 60 * 1000)
        }
    ],
    // Additional realistic data for enhanced simulation
    marketData: {
        currentPrices: {
            Maize: 450,
            Cocoa: 1200,
            Rice: 380,
            Wheat: 520,
            Cassava: 280
        },
        priceChanges: {
            Maize: 5.2,
            Cocoa: -2.1,
            Rice: 3.8,
            Wheat: 1.5,
            Cassava: 4.3
        }
    },
    // Weather data for realistic simulation
    weatherData: {
        current: {
            temperature: 28,
            humidity: 75,
            rainfall: 12,
            windSpeed: 8,
            condition: "Partly Cloudy"
        },
        forecast: [
            {
                day: "Today",
                high: 30,
                low: 24,
                condition: "Sunny",
                rainfall: 0
            },
            {
                day: "Tomorrow",
                high: 29,
                low: 23,
                condition: "Partly Cloudy",
                rainfall: 5
            },
            {
                day: "Day 3",
                high: 27,
                low: 22,
                condition: "Rainy",
                rainfall: 15
            }
        ]
    },
    // User profile data
    userProfile: {
        name: "Kwame Asante",
        location: "Kumasi, Ghana",
        farmSize: "5.2 hectares",
        experience: "8 years",
        crops: [
            "Maize",
            "Cocoa",
            "Rice",
            "Cassava"
        ],
        rating: 4.7,
        totalHarvest: 156.8,
        totalEarnings: 45230
    },
    // Analytics data for charts
    analyticsData: {
        monthlyHarvest: [
            {
                month: "Jan",
                yield: 12.5,
                revenue: 5625
            },
            {
                month: "Feb",
                yield: 15.2,
                revenue: 6840
            },
            {
                month: "Mar",
                yield: 18.8,
                revenue: 8460
            },
            {
                month: "Apr",
                yield: 22.1,
                revenue: 9945
            },
            {
                month: "May",
                yield: 19.5,
                revenue: 8775
            },
            {
                month: "Jun",
                yield: 16.3,
                revenue: 7335
            }
        ],
        cropDistribution: [
            {
                crop: "Maize",
                percentage: 35,
                color: "#10b981"
            },
            {
                crop: "Cocoa",
                percentage: 25,
                color: "#f59e0b"
            },
            {
                crop: "Rice",
                percentage: 20,
                color: "#3b82f6"
            },
            {
                crop: "Cassava",
                percentage: 15,
                color: "#8b5cf6"
            },
            {
                crop: "Wheat",
                percentage: 5,
                color: "#ef4444"
            }
        ],
        riskAnalysis: {
            low: 2,
            medium: 1,
            high: 0
        }
    },
    // Recent activities for timeline
    recentActivities: [
        {
            id: "activity-1",
            type: "harvest",
            description: "Harvested 4.2 tons of Maize",
            timestamp: new Date(baseDate.getTime() - 2 * 60 * 60 * 1000),
            icon: "🌾"
        },
        {
            id: "activity-2",
            type: "prediction",
            description: "Received yield prediction for Cocoa",
            timestamp: new Date(baseDate.getTime() - 4 * 60 * 60 * 1000),
            icon: "📊"
        },
        {
            id: "activity-3",
            type: "loan",
            description: "Loan payment of GHS 150 processed",
            timestamp: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000),
            icon: "💰"
        },
        {
            id: "activity-4",
            type: "token",
            description: "Tokenized 2.8 tons of Cocoa",
            timestamp: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000),
            icon: "🪙"
        }
    ]
};
const generateMockData = ()=>{
    const cropTypes = [
        "Maize",
        "Cocoa",
        "Rice",
        "Wheat",
        "Cassava"
    ];
    const locations = [
        "Kumasi",
        "Accra",
        "Tamale",
        "Takoradi",
        "Cape Coast"
    ];
    return {
        cropType: cropTypes[Math.floor(Math.random() * cropTypes.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        soilMoisture: Math.floor(Math.random() * 30) + 60,
        weatherNotes: [
            "Optimal growing conditions",
            "Heavy rainfall, good for growth",
            "Sunny weather, need irrigation",
            "Cloudy with light rain",
            "Hot and dry, increase watering"
        ][Math.floor(Math.random() * 5)]
    };
};
const simulateMarketPrices = ()=>{
    const basePrices = {
        Maize: 450,
        Cocoa: 1200,
        Rice: 380,
        Wheat: 520,
        Cassava: 280
    };
    return Object.entries(basePrices).map(([crop, price])=>({
            crop,
            price: price + (Math.random() - 0.5) * 50,
            change: (Math.random() - 0.5) * 10
        }));
};
}),
"[project]/components/SimulationProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SimulationProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/store.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hybrid$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useHybridStore__as__useAppStore$3e$__ = __turbopack_context__.i("[project]/lib/hybrid-store.ts [app-ssr] (ecmascript) <export useHybridStore as useAppStore>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/simulation-data.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function SimulationProvider({ children }) {
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { farmData, yieldPredictions, loans, harvestTokens, badges, addFarmData, addYieldPrediction, addLoan, addHarvestToken, earnBadge } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hybrid$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useHybridStore__as__useAppStore$3e$__["useAppStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsClient(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Only run on client and if store is empty (first time user)
        if (!isClient || farmData.length > 0) return;
        // Add farm data
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["simulationData"].farmData.forEach((data)=>{
            addFarmData({
                cropType: data.cropType,
                location: data.location,
                soilMoisture: data.soilMoisture,
                weatherNotes: data.weatherNotes
            });
        });
        // Add yield predictions
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["simulationData"].yieldPredictions.forEach((prediction)=>{
            addYieldPrediction({
                cropType: prediction.cropType,
                predictedYield: prediction.predictedYield,
                riskLevel: prediction.riskLevel,
                confidence: prediction.confidence
            });
        });
        // Add loans
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["simulationData"].loans.forEach((loan)=>{
            addLoan({
                amount: loan.amount,
                interestRate: loan.interestRate,
                status: loan.status,
                collateral: loan.collateral,
                startDate: loan.startDate,
                endDate: loan.endDate
            });
        });
        // Add harvest tokens
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["simulationData"].harvestTokens.forEach((token)=>{
            addHarvestToken({
                cropType: token.cropType,
                amount: token.amount,
                tokenizedAmount: token.tokenizedAmount,
                status: token.status
            });
        });
        // Earn badges
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["simulationData"].badges.forEach((badge)=>{
            if (badge.earned) {
                earnBadge(badge.id);
            }
        });
    }, [
        isClient,
        addFarmData,
        addYieldPrediction,
        addLoan,
        addHarvestToken,
        earnBadge,
        farmData.length
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),
"[project]/components/DatabaseProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DatabaseProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/store.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hybrid$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useHybridStore__as__useAppStore$3e$__ = __turbopack_context__.i("[project]/lib/hybrid-store.ts [app-ssr] (ecmascript) <export useHybridStore as useAppStore>");
"use client";
;
;
;
function DatabaseProvider({ children }) {
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { wallet, syncWithDatabase, isDatabaseConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hybrid$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__useHybridStore__as__useAppStore$3e$__["useAppStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsClient(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isClient || !wallet.isConnected || !wallet.accountId) return;
        // Sync with database when wallet connects
        const syncData = async ()=>{
            try {
                await syncWithDatabase();
                console.log("✅ Database sync completed");
            } catch (error) {
                console.error("❌ Database sync failed:", error);
            }
        };
        syncData();
    }, [
        isClient,
        wallet.isConnected,
        wallet.accountId,
        syncWithDatabase
    ]);
    if (!isClient) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            children,
            wallet.isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-4 left-4 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `px-3 py-1 rounded-full text-xs font-medium ${isDatabaseConnected ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"}`,
                    children: isDatabaseConnected ? "🟢 DB Connected" : "🟡 DB Offline"
                }, void 0, false, {
                    fileName: "[project]/components/DatabaseProvider.tsx",
                    lineNumber: 44,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/DatabaseProvider.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/components/ClientOnly.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientOnly
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ClientOnly({ children, fallback = null }) {
    const [hasMounted, setHasMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setHasMounted(true);
    }, []);
    if (!hasMounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: fallback
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
"[project]/node_modules/zustand/esm/vanilla.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createStore",
    ()=>createStore
]);
const createStoreImpl = (createState)=>{
    let state;
    const listeners = /* @__PURE__ */ new Set();
    const setState = (partial, replace)=>{
        const nextState = typeof partial === "function" ? partial(state) : partial;
        if (!Object.is(nextState, state)) {
            const previousState = state;
            state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
            listeners.forEach((listener)=>listener(state, previousState));
        }
    };
    const getState = ()=>state;
    const getInitialState = ()=>initialState;
    const subscribe = (listener)=>{
        listeners.add(listener);
        return ()=>listeners.delete(listener);
    };
    const api = {
        setState,
        getState,
        getInitialState,
        subscribe
    };
    const initialState = state = createState(setState, getState, api);
    return api;
};
const createStore = (createState)=>createState ? createStoreImpl(createState) : createStoreImpl;
;
}),
"[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "create",
    ()=>create,
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/vanilla.mjs [app-ssr] (ecmascript)");
;
;
const identity = (arg)=>arg;
function useStore(api, selector = identity) {
    const slice = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useSyncExternalStore(api.subscribe, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>selector(api.getState()), [
        api,
        selector
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>selector(api.getInitialState()), [
        api,
        selector
    ]));
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useDebugValue(slice);
    return slice;
}
const createImpl = (createState)=>{
    const api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createStore"])(createState);
    const useBoundStore = (selector)=>useStore(api, selector);
    Object.assign(useBoundStore, api);
    return useBoundStore;
};
const create = (createState)=>createState ? createImpl(createState) : createImpl;
;
}),
"[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "combine",
    ()=>combine,
    "createJSONStorage",
    ()=>createJSONStorage,
    "devtools",
    ()=>devtools,
    "persist",
    ()=>persist,
    "redux",
    ()=>redux,
    "subscribeWithSelector",
    ()=>subscribeWithSelector
]);
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("node_modules/zustand/esm/middleware.mjs")}`;
    }
};
const reduxImpl = (reducer, initial)=>(set, _get, api)=>{
        api.dispatch = (action)=>{
            set((state)=>reducer(state, action), false, action);
            return action;
        };
        api.dispatchFromDevtools = true;
        return {
            dispatch: (...args)=>api.dispatch(...args),
            ...initial
        };
    };
const redux = reduxImpl;
const trackedConnections = /* @__PURE__ */ new Map();
const getTrackedConnectionState = (name)=>{
    const api = trackedConnections.get(name);
    if (!api) return {};
    return Object.fromEntries(Object.entries(api.stores).map(([key, api2])=>[
            key,
            api2.getState()
        ]));
};
const extractConnectionInformation = (store, extensionConnector, options)=>{
    if (store === void 0) {
        return {
            type: "untracked",
            connection: extensionConnector.connect(options)
        };
    }
    const existingConnection = trackedConnections.get(options.name);
    if (existingConnection) {
        return {
            type: "tracked",
            store,
            ...existingConnection
        };
    }
    const newConnection = {
        connection: extensionConnector.connect(options),
        stores: {}
    };
    trackedConnections.set(options.name, newConnection);
    return {
        type: "tracked",
        store,
        ...newConnection
    };
};
const removeStoreFromTrackedConnections = (name, store)=>{
    if (store === void 0) return;
    const connectionInfo = trackedConnections.get(name);
    if (!connectionInfo) return;
    delete connectionInfo.stores[store];
    if (Object.keys(connectionInfo.stores).length === 0) {
        trackedConnections.delete(name);
    }
};
const findCallerName = (stack)=>{
    var _a, _b;
    if (!stack) return void 0;
    const traceLines = stack.split("\n");
    const apiSetStateLineIndex = traceLines.findIndex((traceLine)=>traceLine.includes("api.setState"));
    if (apiSetStateLineIndex < 0) return void 0;
    const callerLine = ((_a = traceLines[apiSetStateLineIndex + 1]) == null ? void 0 : _a.trim()) || "";
    return (_b = /.+ (.+) .+/.exec(callerLine)) == null ? void 0 : _b[1];
};
const devtoolsImpl = (fn, devtoolsOptions = {})=>(set, get, api)=>{
        const { enabled, anonymousActionType, store, ...options } = devtoolsOptions;
        let extensionConnector;
        try {
            extensionConnector = (enabled != null ? enabled : (__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
        } catch (e) {}
        if (!extensionConnector) {
            return fn(set, get, api);
        }
        const { connection, ...connectionInformation } = extractConnectionInformation(store, extensionConnector, options);
        let isRecording = true;
        api.setState = (state, replace, nameOrAction)=>{
            const r = set(state, replace);
            if (!isRecording) return r;
            const action = nameOrAction === void 0 ? {
                type: anonymousActionType || findCallerName(new Error().stack) || "anonymous"
            } : typeof nameOrAction === "string" ? {
                type: nameOrAction
            } : nameOrAction;
            if (store === void 0) {
                connection == null ? void 0 : connection.send(action, get());
                return r;
            }
            connection == null ? void 0 : connection.send({
                ...action,
                type: `${store}/${action.type}`
            }, {
                ...getTrackedConnectionState(options.name),
                [store]: api.getState()
            });
            return r;
        };
        api.devtools = {
            cleanup: ()=>{
                if (connection && typeof connection.unsubscribe === "function") {
                    connection.unsubscribe();
                }
                removeStoreFromTrackedConnections(options.name, store);
            }
        };
        const setStateFromDevtools = (...a)=>{
            const originalIsRecording = isRecording;
            isRecording = false;
            set(...a);
            isRecording = originalIsRecording;
        };
        const initialState = fn(api.setState, get, api);
        if (connectionInformation.type === "untracked") {
            connection == null ? void 0 : connection.init(initialState);
        } else {
            connectionInformation.stores[connectionInformation.store] = api;
            connection == null ? void 0 : connection.init(Object.fromEntries(Object.entries(connectionInformation.stores).map(([key, store2])=>[
                    key,
                    key === connectionInformation.store ? initialState : store2.getState()
                ])));
        }
        if (api.dispatchFromDevtools && typeof api.dispatch === "function") {
            let didWarnAboutReservedActionType = false;
            const originalDispatch = api.dispatch;
            api.dispatch = (...args)=>{
                if ((__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production" && args[0].type === "__setState" && !didWarnAboutReservedActionType) {
                    console.warn('[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.');
                    didWarnAboutReservedActionType = true;
                }
                originalDispatch(...args);
            };
        }
        connection.subscribe((message)=>{
            var _a;
            switch(message.type){
                case "ACTION":
                    if (typeof message.payload !== "string") {
                        console.error("[zustand devtools middleware] Unsupported action format");
                        return;
                    }
                    return parseJsonThen(message.payload, (action)=>{
                        if (action.type === "__setState") {
                            if (store === void 0) {
                                setStateFromDevtools(action.state);
                                return;
                            }
                            if (Object.keys(action.state).length !== 1) {
                                console.error(`
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `);
                            }
                            const stateFromDevtools = action.state[store];
                            if (stateFromDevtools === void 0 || stateFromDevtools === null) {
                                return;
                            }
                            if (JSON.stringify(api.getState()) !== JSON.stringify(stateFromDevtools)) {
                                setStateFromDevtools(stateFromDevtools);
                            }
                            return;
                        }
                        if (!api.dispatchFromDevtools) return;
                        if (typeof api.dispatch !== "function") return;
                        api.dispatch(action);
                    });
                case "DISPATCH":
                    switch(message.payload.type){
                        case "RESET":
                            setStateFromDevtools(initialState);
                            if (store === void 0) {
                                return connection == null ? void 0 : connection.init(api.getState());
                            }
                            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
                        case "COMMIT":
                            if (store === void 0) {
                                connection == null ? void 0 : connection.init(api.getState());
                                return;
                            }
                            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
                        case "ROLLBACK":
                            return parseJsonThen(message.state, (state)=>{
                                if (store === void 0) {
                                    setStateFromDevtools(state);
                                    connection == null ? void 0 : connection.init(api.getState());
                                    return;
                                }
                                setStateFromDevtools(state[store]);
                                connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
                            });
                        case "JUMP_TO_STATE":
                        case "JUMP_TO_ACTION":
                            return parseJsonThen(message.state, (state)=>{
                                if (store === void 0) {
                                    setStateFromDevtools(state);
                                    return;
                                }
                                if (JSON.stringify(api.getState()) !== JSON.stringify(state[store])) {
                                    setStateFromDevtools(state[store]);
                                }
                            });
                        case "IMPORT_STATE":
                            {
                                const { nextLiftedState } = message.payload;
                                const lastComputedState = (_a = nextLiftedState.computedStates.slice(-1)[0]) == null ? void 0 : _a.state;
                                if (!lastComputedState) return;
                                if (store === void 0) {
                                    setStateFromDevtools(lastComputedState);
                                } else {
                                    setStateFromDevtools(lastComputedState[store]);
                                }
                                connection == null ? void 0 : connection.send(null, // FIXME no-any
                                nextLiftedState);
                                return;
                            }
                        case "PAUSE_RECORDING":
                            return isRecording = !isRecording;
                    }
                    return;
            }
        });
        return initialState;
    };
const devtools = devtoolsImpl;
const parseJsonThen = (stringified, fn)=>{
    let parsed;
    try {
        parsed = JSON.parse(stringified);
    } catch (e) {
        console.error("[zustand devtools middleware] Could not parse the received json", e);
    }
    if (parsed !== void 0) fn(parsed);
};
const subscribeWithSelectorImpl = (fn)=>(set, get, api)=>{
        const origSubscribe = api.subscribe;
        api.subscribe = (selector, optListener, options)=>{
            let listener = selector;
            if (optListener) {
                const equalityFn = (options == null ? void 0 : options.equalityFn) || Object.is;
                let currentSlice = selector(api.getState());
                listener = (state)=>{
                    const nextSlice = selector(state);
                    if (!equalityFn(currentSlice, nextSlice)) {
                        const previousSlice = currentSlice;
                        optListener(currentSlice = nextSlice, previousSlice);
                    }
                };
                if (options == null ? void 0 : options.fireImmediately) {
                    optListener(currentSlice, currentSlice);
                }
            }
            return origSubscribe(listener);
        };
        const initialState = fn(set, get, api);
        return initialState;
    };
const subscribeWithSelector = subscribeWithSelectorImpl;
function combine(initialState, create) {
    return (...args)=>Object.assign({}, initialState, create(...args));
}
function createJSONStorage(getStorage, options) {
    let storage;
    try {
        storage = getStorage();
    } catch (e) {
        return;
    }
    const persistStorage = {
        getItem: (name)=>{
            var _a;
            const parse = (str2)=>{
                if (str2 === null) {
                    return null;
                }
                return JSON.parse(str2, options == null ? void 0 : options.reviver);
            };
            const str = (_a = storage.getItem(name)) != null ? _a : null;
            if (str instanceof Promise) {
                return str.then(parse);
            }
            return parse(str);
        },
        setItem: (name, newValue)=>storage.setItem(name, JSON.stringify(newValue, options == null ? void 0 : options.replacer)),
        removeItem: (name)=>storage.removeItem(name)
    };
    return persistStorage;
}
const toThenable = (fn)=>(input)=>{
        try {
            const result = fn(input);
            if (result instanceof Promise) {
                return result;
            }
            return {
                then (onFulfilled) {
                    return toThenable(onFulfilled)(result);
                },
                catch (_onRejected) {
                    return this;
                }
            };
        } catch (e) {
            return {
                then (_onFulfilled) {
                    return this;
                },
                catch (onRejected) {
                    return toThenable(onRejected)(e);
                }
            };
        }
    };
const persistImpl = (config, baseOptions)=>(set, get, api)=>{
        let options = {
            storage: createJSONStorage(()=>localStorage),
            partialize: (state)=>state,
            version: 0,
            merge: (persistedState, currentState)=>({
                    ...currentState,
                    ...persistedState
                }),
            ...baseOptions
        };
        let hasHydrated = false;
        const hydrationListeners = /* @__PURE__ */ new Set();
        const finishHydrationListeners = /* @__PURE__ */ new Set();
        let storage = options.storage;
        if (!storage) {
            return config((...args)=>{
                console.warn(`[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`);
                set(...args);
            }, get, api);
        }
        const setItem = ()=>{
            const state = options.partialize({
                ...get()
            });
            return storage.setItem(options.name, {
                state,
                version: options.version
            });
        };
        const savedSetState = api.setState;
        api.setState = (state, replace)=>{
            savedSetState(state, replace);
            return setItem();
        };
        const configResult = config((...args)=>{
            set(...args);
            return setItem();
        }, get, api);
        api.getInitialState = ()=>configResult;
        let stateFromStorage;
        const hydrate = ()=>{
            var _a, _b;
            if (!storage) return;
            hasHydrated = false;
            hydrationListeners.forEach((cb)=>{
                var _a2;
                return cb((_a2 = get()) != null ? _a2 : configResult);
            });
            const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
            return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue)=>{
                if (deserializedStorageValue) {
                    if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
                        if (options.migrate) {
                            const migration = options.migrate(deserializedStorageValue.state, deserializedStorageValue.version);
                            if (migration instanceof Promise) {
                                return migration.then((result)=>[
                                        true,
                                        result
                                    ]);
                            }
                            return [
                                true,
                                migration
                            ];
                        }
                        console.error(`State loaded from storage couldn't be migrated since no migrate function was provided`);
                    } else {
                        return [
                            false,
                            deserializedStorageValue.state
                        ];
                    }
                }
                return [
                    false,
                    void 0
                ];
            }).then((migrationResult)=>{
                var _a2;
                const [migrated, migratedState] = migrationResult;
                stateFromStorage = options.merge(migratedState, (_a2 = get()) != null ? _a2 : configResult);
                set(stateFromStorage, true);
                if (migrated) {
                    return setItem();
                }
            }).then(()=>{
                postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
                stateFromStorage = get();
                hasHydrated = true;
                finishHydrationListeners.forEach((cb)=>cb(stateFromStorage));
            }).catch((e)=>{
                postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
            });
        };
        api.persist = {
            setOptions: (newOptions)=>{
                options = {
                    ...options,
                    ...newOptions
                };
                if (newOptions.storage) {
                    storage = newOptions.storage;
                }
            },
            clearStorage: ()=>{
                storage == null ? void 0 : storage.removeItem(options.name);
            },
            getOptions: ()=>options,
            rehydrate: ()=>hydrate(),
            hasHydrated: ()=>hasHydrated,
            onHydrate: (cb)=>{
                hydrationListeners.add(cb);
                return ()=>{
                    hydrationListeners.delete(cb);
                };
            },
            onFinishHydration: (cb)=>{
                finishHydrationListeners.add(cb);
                return ()=>{
                    finishHydrationListeners.delete(cb);
                };
            }
        };
        if (!options.skipHydration) {
            hydrate();
        }
        return stateFromStorage || configResult;
    };
const persist = persistImpl;
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3b5ae3d2._.js.map