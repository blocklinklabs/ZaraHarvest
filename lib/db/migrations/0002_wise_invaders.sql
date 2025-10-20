CREATE TABLE "weather_data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"location" text NOT NULL,
	"latitude" numeric(10, 8),
	"longitude" numeric(11, 8),
	"temperature" numeric(5, 2) NOT NULL,
	"humidity" numeric(5, 2) NOT NULL,
	"pressure" numeric(7, 2) NOT NULL,
	"wind_speed" numeric(5, 2) NOT NULL,
	"wind_direction" text NOT NULL,
	"visibility" numeric(5, 2) NOT NULL,
	"uv_index" numeric(3, 1) NOT NULL,
	"precipitation" numeric(5, 2) NOT NULL,
	"cloud_cover" numeric(5, 2) NOT NULL,
	"condition" text NOT NULL,
	"raw_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
