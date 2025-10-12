CREATE TABLE "badges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"badge_type" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"earned" boolean DEFAULT false NOT NULL,
	"earned_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "farm_data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"crop_type" text NOT NULL,
	"location" text NOT NULL,
	"soil_moisture" numeric(5, 2) NOT NULL,
	"weather_notes" text,
	"photo" text,
	"photo_mime_type" text,
	"latitude" numeric(10, 8),
	"longitude" numeric(11, 8),
	"temperature" numeric(5, 2),
	"humidity" numeric(5, 2),
	"rainfall" numeric(5, 2),
	"ai_analysis" text,
	"ai_confidence" numeric(3, 2),
	"ai_recommendations" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "harvest_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"crop_type" text NOT NULL,
	"amount" numeric(8, 2) NOT NULL,
	"tokenized_amount" numeric(12, 2) NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"qr_code" text NOT NULL,
	"blockchain_token_id" text,
	"blockchain_tx_hash" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "loans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"interest_rate" numeric(5, 2) NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"collateral" jsonb NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"blockchain_tx_hash" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "market_prices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"crop_type" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"currency" text DEFAULT 'GHS' NOT NULL,
	"source" text NOT NULL,
	"location" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "supply_chain_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token_id" uuid NOT NULL,
	"event_type" text NOT NULL,
	"description" text NOT NULL,
	"location" text,
	"latitude" numeric(10, 8),
	"longitude" numeric(11, 8),
	"metadata" jsonb,
	"blockchain_tx_hash" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"wallet_address" text NOT NULL,
	"name" text,
	"email" text,
	"phone" text,
	"location" text,
	"country" text,
	"crop_type" text,
	"farm_size" text,
	"experience" text,
	"additional_info" text,
	"notifications" boolean DEFAULT true,
	"dark_mode" boolean DEFAULT false,
	"language" text DEFAULT 'en',
	"currency" text DEFAULT 'USD',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_wallet_address_unique" UNIQUE("wallet_address")
);
--> statement-breakpoint
CREATE TABLE "yield_predictions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"farm_data_id" uuid,
	"crop_type" text NOT NULL,
	"predicted_yield" numeric(8, 2) NOT NULL,
	"risk_level" numeric(5, 2) NOT NULL,
	"confidence" numeric(5, 2) NOT NULL,
	"model_version" text,
	"input_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "badges" ADD CONSTRAINT "badges_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "farm_data" ADD CONSTRAINT "farm_data_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "harvest_tokens" ADD CONSTRAINT "harvest_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "loans" ADD CONSTRAINT "loans_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supply_chain_events" ADD CONSTRAINT "supply_chain_events_token_id_harvest_tokens_id_fk" FOREIGN KEY ("token_id") REFERENCES "public"."harvest_tokens"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "yield_predictions" ADD CONSTRAINT "yield_predictions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "yield_predictions" ADD CONSTRAINT "yield_predictions_farm_data_id_farm_data_id_fk" FOREIGN KEY ("farm_data_id") REFERENCES "public"."farm_data"("id") ON DELETE set null ON UPDATE no action;