(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateLoanInterest",
    ()=>calculateLoanInterest,
    "cn",
    ()=>cn,
    "formatCurrency",
    ()=>formatCurrency,
    "formatDate",
    ()=>formatDate,
    "generateMockYieldPrediction",
    ()=>generateMockYieldPrediction,
    "generateQRCodeData",
    ()=>generateQRCodeData,
    "isOffline",
    ()=>isOffline,
    "mockHBARReward",
    ()=>mockHBARReward,
    "safeDate",
    ()=>safeDate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatCurrency(amount) {
    let currency = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "USD";
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency
    }).format(amount);
}
function safeDate(date) {
    if (date instanceof Date) {
        return date;
    }
    if (typeof date === "string" || typeof date === "number") {
        const parsed = new Date(date);
        return isNaN(parsed.getTime()) ? new Date() : parsed;
    }
    return new Date();
}
function formatDate(date) {
    const dateObj = safeDate(date);
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    }).format(dateObj);
}
function generateMockYieldPrediction(cropType) {
    const baseYield = {
        Maize: 2.5,
        Cocoa: 1.8,
        Rice: 3.2,
        Wheat: 2.1,
        Cassava: 4.5
    }[cropType] || 2.0;
    const variation = (Math.random() - 0.5) * 0.4; // ±20% variation
    const predictedYield = Math.max(0.5, baseYield + variation);
    const riskLevel = Math.random() * 30 + 5; // 5-35% risk
    const confidence = Math.random() * 20 + 75; // 75-95% confidence
    return {
        predictedYield: Math.round(predictedYield * 10) / 10,
        riskLevel: Math.round(riskLevel * 10) / 10,
        confidence: Math.round(confidence * 10) / 10
    };
}
function calculateLoanInterest(amount, riskLevel) {
    const baseRate = 5.0; // 5% base rate
    const riskAdjustment = riskLevel * 0.1; // 0.1% per risk point
    return Math.min(15.0, baseRate + riskAdjustment); // Cap at 15%
}
function generateQRCodeData(tokenId) {
    return "https://agriyield.app/token/".concat(tokenId);
}
function mockHBARReward() {
    return Math.random() * 10 + 5; // 5-15 HBAR
}
function isOffline() {
    return typeof navigator !== "undefined" && !navigator.onLine;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hybrid-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useHybridStore",
    ()=>useHybridStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
const useHybridStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
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
                qrCode: "https://agriyield.app/token/".concat(crypto.randomUUID())
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/store.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
// Re-export the hybrid store as the main store
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hybrid$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hybrid-store.ts [app-client] (ecmascript)");
;
;
;
;
const useAppStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        // Wallet
        wallet: {
            accountId: null,
            isConnected: false,
            connect: (accountId)=>set((state)=>({
                        wallet: {
                            ...state.wallet,
                            accountId,
                            isConnected: true
                        }
                    })),
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
        addFarmData: (data)=>set((state)=>({
                    farmData: [
                        ...state.farmData,
                        {
                            ...data,
                            id: crypto.randomUUID(),
                            timestamp: new Date()
                        }
                    ]
                })),
        // Yield Predictions
        yieldPredictions: [],
        addYieldPrediction: (prediction)=>set((state)=>({
                    yieldPredictions: [
                        ...state.yieldPredictions,
                        {
                            ...prediction,
                            timestamp: new Date()
                        }
                    ]
                })),
        // Loans
        loans: [],
        addLoan: (loan)=>set((state)=>({
                    loans: [
                        ...state.loans,
                        {
                            ...loan,
                            id: crypto.randomUUID()
                        }
                    ]
                })),
        updateLoanStatus: (loanId, status)=>set((state)=>({
                    loans: state.loans.map((loan)=>loan.id === loanId ? {
                            ...loan,
                            status
                        } : loan)
                })),
        // Harvest Tokens
        harvestTokens: [],
        addHarvestToken: (token)=>set((state)=>({
                    harvestTokens: [
                        ...state.harvestTokens,
                        {
                            ...token,
                            id: crypto.randomUUID(),
                            qrCode: "https://agriyield.app/token/".concat(crypto.randomUUID())
                        }
                    ]
                })),
        updateTokenStatus: (tokenId, status)=>set((state)=>({
                    harvestTokens: state.harvestTokens.map((token)=>token.id === tokenId ? {
                            ...token,
                            status
                        } : token)
                })),
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
        earnBadge: (badgeId)=>set((state)=>({
                    badges: state.badges.map((badge)=>badge.id === badgeId ? {
                            ...badge,
                            earned: true,
                            earnedDate: new Date()
                        } : badge)
                })),
        // Offline
        isOnline: true,
        setOnlineStatus: (status)=>set({
                isOnline: status
            })
    }), {
    name: "agriyield-storage",
    partialize: (state)=>({
            wallet: state.wallet,
            farmData: state.farmData,
            yieldPredictions: state.yieldPredictions,
            loans: state.loans,
            harvestTokens: state.harvestTokens,
            badges: state.badges
        }),
    onRehydrateStorage: ()=>(state)=>{
            if (state) {
                // Convert string dates back to Date objects
                state.farmData = state.farmData.map((data)=>({
                        ...data,
                        timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeDate"])(data.timestamp)
                    }));
                state.yieldPredictions = state.yieldPredictions.map((pred)=>({
                        ...pred,
                        timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeDate"])(pred.timestamp)
                    }));
                state.loans = state.loans.map((loan)=>({
                        ...loan,
                        startDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeDate"])(loan.startDate),
                        endDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeDate"])(loan.endDate)
                    }));
                state.badges = state.badges.map((badge)=>({
                        ...badge,
                        earnedDate: badge.earnedDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeDate"])(badge.earnedDate) : undefined
                    }));
            }
        }
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hybrid-store.ts [app-client] (ecmascript) <export useHybridStore as useAppStore>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAppStore",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hybrid$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHybridStore"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hybrid$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hybrid-store.ts [app-client] (ecmascript)");
}),
"[project]/lib/simulation-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    return Object.entries(basePrices).map((param)=>{
        let [crop, price] = param;
        return {
            crop,
            price: price + (Math.random() - 0.5) * 50,
            change: (Math.random() - 0.5) * 10
        };
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/SimulationProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SimulationProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/store.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hybrid$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useHybridStore__as__useAppStore$3e$__ = __turbopack_context__.i("[project]/lib/hybrid-store.ts [app-client] (ecmascript) <export useHybridStore as useAppStore>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/simulation-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function SimulationProvider(param) {
    let { children } = param;
    _s();
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { farmData, yieldPredictions, loans, harvestTokens, badges, addFarmData, addYieldPrediction, addLoan, addHarvestToken, earnBadge } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hybrid$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useHybridStore__as__useAppStore$3e$__["useAppStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SimulationProvider.useEffect": ()=>{
            setIsClient(true);
        }
    }["SimulationProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SimulationProvider.useEffect": ()=>{
            // Only run on client and if store is empty (first time user)
            if (!isClient || farmData.length > 0) return;
            // Add farm data
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulationData"].farmData.forEach({
                "SimulationProvider.useEffect": (data)=>{
                    addFarmData({
                        cropType: data.cropType,
                        location: data.location,
                        soilMoisture: data.soilMoisture,
                        weatherNotes: data.weatherNotes
                    });
                }
            }["SimulationProvider.useEffect"]);
            // Add yield predictions
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulationData"].yieldPredictions.forEach({
                "SimulationProvider.useEffect": (prediction)=>{
                    addYieldPrediction({
                        cropType: prediction.cropType,
                        predictedYield: prediction.predictedYield,
                        riskLevel: prediction.riskLevel,
                        confidence: prediction.confidence
                    });
                }
            }["SimulationProvider.useEffect"]);
            // Add loans
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulationData"].loans.forEach({
                "SimulationProvider.useEffect": (loan)=>{
                    addLoan({
                        amount: loan.amount,
                        interestRate: loan.interestRate,
                        status: loan.status,
                        collateral: loan.collateral,
                        startDate: loan.startDate,
                        endDate: loan.endDate
                    });
                }
            }["SimulationProvider.useEffect"]);
            // Add harvest tokens
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulationData"].harvestTokens.forEach({
                "SimulationProvider.useEffect": (token)=>{
                    addHarvestToken({
                        cropType: token.cropType,
                        amount: token.amount,
                        tokenizedAmount: token.tokenizedAmount,
                        status: token.status
                    });
                }
            }["SimulationProvider.useEffect"]);
            // Earn badges
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$simulation$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simulationData"].badges.forEach({
                "SimulationProvider.useEffect": (badge)=>{
                    if (badge.earned) {
                        earnBadge(badge.id);
                    }
                }
            }["SimulationProvider.useEffect"]);
        }
    }["SimulationProvider.useEffect"], [
        isClient,
        addFarmData,
        addYieldPrediction,
        addLoan,
        addHarvestToken,
        earnBadge,
        farmData.length
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(SimulationProvider, "O2oNh69Ys3KSSMvJ3l3Bkffdgn8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hybrid$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useHybridStore__as__useAppStore$3e$__["useAppStore"]
    ];
});
_c = SimulationProvider;
var _c;
__turbopack_context__.k.register(_c, "SimulationProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/DatabaseProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DatabaseProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/store.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hybrid$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useHybridStore__as__useAppStore$3e$__ = __turbopack_context__.i("[project]/lib/hybrid-store.ts [app-client] (ecmascript) <export useHybridStore as useAppStore>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function DatabaseProvider(param) {
    let { children } = param;
    _s();
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { wallet, syncWithDatabase, isDatabaseConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hybrid$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useHybridStore__as__useAppStore$3e$__["useAppStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DatabaseProvider.useEffect": ()=>{
            setIsClient(true);
        }
    }["DatabaseProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DatabaseProvider.useEffect": ()=>{
            if (!isClient || !wallet.isConnected || !wallet.accountId) return;
            // Sync with database when wallet connects
            const syncData = {
                "DatabaseProvider.useEffect.syncData": async ()=>{
                    try {
                        await syncWithDatabase();
                        console.log("✅ Database sync completed");
                    } catch (error) {
                        console.error("❌ Database sync failed:", error);
                    }
                }
            }["DatabaseProvider.useEffect.syncData"];
            syncData();
        }
    }["DatabaseProvider.useEffect"], [
        isClient,
        wallet.isConnected,
        wallet.accountId,
        syncWithDatabase
    ]);
    if (!isClient) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            children,
            wallet.isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-4 left-4 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-3 py-1 rounded-full text-xs font-medium ".concat(isDatabaseConnected ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"),
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
_s(DatabaseProvider, "ixI1LkIAwnqv5JIb8GJiLBsWMoc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hybrid$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useHybridStore__as__useAppStore$3e$__["useAppStore"]
    ];
});
_c = DatabaseProvider;
var _c;
__turbopack_context__.k.register(_c, "DatabaseProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ClientToaster.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
;
"use client";
;
const Toaster = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_c = ()=>__turbopack_context__.A("[project]/components/ui/sonner.tsx [app-client] (ecmascript, next/dynamic entry, async loader)").then((mod)=>({
            default: mod.Toaster
        })), {
    loadableGenerated: {
        modules: [
            "[project]/components/ui/sonner.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>null
});
_c1 = Toaster;
const __TURBOPACK__default__export__ = Toaster;
var _c, _c1;
__turbopack_context__.k.register(_c, "Toaster$dynamic");
__turbopack_context__.k.register(_c1, "Toaster");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ClientOnly.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientOnly
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function ClientOnly(param) {
    let { children, fallback = null } = param;
    _s();
    const [hasMounted, setHasMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientOnly.useEffect": ()=>{
            setHasMounted(true);
        }
    }["ClientOnly.useEffect"], []);
    if (!hasMounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: fallback
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(ClientOnly, "aiSd/DQPOnbbLLZZL0Xv/KtPBDg=");
_c = ClientOnly;
var _c;
__turbopack_context__.k.register(_c, "ClientOnly");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_a6e984f7._.js.map