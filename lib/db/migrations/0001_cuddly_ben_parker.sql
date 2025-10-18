CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"action_url" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"read_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "harvest_tokens" ADD COLUMN "yield_prediction_id" uuid;--> statement-breakpoint
ALTER TABLE "harvest_tokens" ADD COLUMN "quality_grade" text;--> statement-breakpoint
ALTER TABLE "harvest_tokens" ADD COLUMN "is_locked" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "harvest_tokens" ADD COLUMN "metadata_uri" text;--> statement-breakpoint
ALTER TABLE "loans" ADD COLUMN "blockchain_loan_id" text;--> statement-breakpoint
ALTER TABLE "loans" ADD COLUMN "collateral_prediction_id" text;--> statement-breakpoint
ALTER TABLE "loans" ADD COLUMN "repaid_amount" numeric(12, 2) DEFAULT '0';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "badge_notifications" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "loan_notifications" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "yield_notifications" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "price_notifications" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "system_notifications" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "harvest_tokens" ADD CONSTRAINT "harvest_tokens_yield_prediction_id_yield_predictions_id_fk" FOREIGN KEY ("yield_prediction_id") REFERENCES "public"."yield_predictions"("id") ON DELETE set null ON UPDATE no action;