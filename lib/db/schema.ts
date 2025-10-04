import {
  pgTable,
  text,
  timestamp,
  uuid,
  decimal,
  integer,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  walletAddress: text("wallet_address").notNull().unique(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  location: text("location"),
  country: text("country"),
  cropType: text("crop_type"),
  farmSize: text("farm_size"),
  experience: text("experience"),
  additionalInfo: text("additional_info"),
  // Settings fields
  notifications: boolean("notifications").default(true),
  darkMode: boolean("dark_mode").default(false),
  language: text("language").default("en"),
  currency: text("currency").default("USD"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Farm data entries
export const farmData = pgTable("farm_data", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  cropType: text("crop_type").notNull(),
  location: text("location").notNull(),
  soilMoisture: decimal("soil_moisture", { precision: 5, scale: 2 }).notNull(),
  weatherNotes: text("weather_notes"),
  photo: text("photo"), // Base64 encoded image data
  photoMimeType: text("photo_mime_type"), // MIME type of the image
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  temperature: decimal("temperature", { precision: 5, scale: 2 }),
  humidity: decimal("humidity", { precision: 5, scale: 2 }),
  rainfall: decimal("rainfall", { precision: 5, scale: 2 }),
  // AI Analysis fields
  aiAnalysis: text("ai_analysis"), // JSON string of AI analysis results
  aiConfidence: decimal("ai_confidence", { precision: 3, scale: 2 }), // 0.00 to 1.00
  aiRecommendations: text("ai_recommendations"), // AI-generated recommendations
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Yield predictions
export const yieldPredictions = pgTable("yield_predictions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  cropType: text("crop_type").notNull(),
  predictedYield: decimal("predicted_yield", {
    precision: 8,
    scale: 2,
  }).notNull(),
  riskLevel: decimal("risk_level", { precision: 5, scale: 2 }).notNull(),
  confidence: decimal("confidence", { precision: 5, scale: 2 }).notNull(),
  modelVersion: text("model_version"),
  inputData: jsonb("input_data"), // Store the input data used for prediction
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Loans
export const loans = pgTable("loans", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  interestRate: decimal("interest_rate", { precision: 5, scale: 2 }).notNull(),
  status: text("status", {
    enum: ["pending", "active", "completed", "defaulted"],
  })
    .notNull()
    .default("pending"),
  collateral: jsonb("collateral").notNull(), // Array of token IDs
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  blockchainTxHash: text("blockchain_tx_hash"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Harvest tokens
export const harvestTokens = pgTable("harvest_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  cropType: text("crop_type").notNull(),
  amount: decimal("amount", { precision: 8, scale: 2 }).notNull(),
  tokenizedAmount: decimal("tokenized_amount", {
    precision: 12,
    scale: 2,
  }).notNull(),
  status: text("status", { enum: ["pending", "tokenized", "sold", "burned"] })
    .notNull()
    .default("pending"),
  qrCode: text("qr_code").notNull(),
  blockchainTokenId: text("blockchain_token_id"),
  blockchainTxHash: text("blockchain_tx_hash"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Badges/Achievements
export const badges = pgTable("badges", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  badgeType: text("badge_type").notNull(), // 'data-contributor', 'yield-predictor', etc.
  name: text("name").notNull(),
  description: text("description").notNull(),
  earned: boolean("earned").notNull().default(false),
  earnedDate: timestamp("earned_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Market prices (for price tracking)
export const marketPrices = pgTable("market_prices", {
  id: uuid("id").primaryKey().defaultRandom(),
  cropType: text("crop_type").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("GHS"),
  source: text("source").notNull(), // 'manual', 'api', 'blockchain'
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Supply chain tracking
export const supplyChainEvents = pgTable("supply_chain_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  tokenId: uuid("token_id")
    .notNull()
    .references(() => harvestTokens.id, { onDelete: "cascade" }),
  eventType: text("event_type").notNull(), // 'harvest', 'processing', 'transport', 'delivery'
  description: text("description").notNull(),
  location: text("location"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  metadata: jsonb("metadata"), // Additional event data
  blockchainTxHash: text("blockchain_tx_hash"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  farmData: many(farmData),
  yieldPredictions: many(yieldPredictions),
  loans: many(loans),
  harvestTokens: many(harvestTokens),
  badges: many(badges),
}));

export const farmDataRelations = relations(farmData, ({ one }) => ({
  user: one(users, {
    fields: [farmData.userId],
    references: [users.id],
  }),
}));

export const yieldPredictionsRelations = relations(
  yieldPredictions,
  ({ one }) => ({
    user: one(users, {
      fields: [yieldPredictions.userId],
      references: [users.id],
    }),
  })
);

export const loansRelations = relations(loans, ({ one }) => ({
  user: one(users, {
    fields: [loans.userId],
    references: [users.id],
  }),
}));

export const harvestTokensRelations = relations(
  harvestTokens,
  ({ one, many }) => ({
    user: one(users, {
      fields: [harvestTokens.userId],
      references: [users.id],
    }),
    supplyChainEvents: many(supplyChainEvents),
  })
);

export const badgesRelations = relations(badges, ({ one }) => ({
  user: one(users, {
    fields: [badges.userId],
    references: [users.id],
  }),
}));

export const supplyChainEventsRelations = relations(
  supplyChainEvents,
  ({ one }) => ({
    token: one(harvestTokens, {
      fields: [supplyChainEvents.tokenId],
      references: [harvestTokens.id],
    }),
  })
);

// Export types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type FarmData = typeof farmData.$inferSelect;
export type NewFarmData = typeof farmData.$inferInsert;
export type YieldPrediction = typeof yieldPredictions.$inferSelect;
export type NewYieldPrediction = typeof yieldPredictions.$inferInsert;
export type Loan = typeof loans.$inferSelect;
export type NewLoan = typeof loans.$inferInsert;
export type HarvestToken = typeof harvestTokens.$inferSelect;
export type NewHarvestToken = typeof harvestTokens.$inferInsert;
export type Badge = typeof badges.$inferSelect;
export type NewBadge = typeof badges.$inferInsert;
export type MarketPrice = typeof marketPrices.$inferSelect;
export type NewMarketPrice = typeof marketPrices.$inferInsert;
export type SupplyChainEvent = typeof supplyChainEvents.$inferSelect;
export type NewSupplyChainEvent = typeof supplyChainEvents.$inferInsert;
