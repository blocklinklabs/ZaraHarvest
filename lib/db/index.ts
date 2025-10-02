import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Create the connection - only works on server side
let db: ReturnType<typeof drizzle>;

if (typeof window === "undefined") {
  // Server side - load environment variables
  const { config } = require("dotenv");
  config({ path: ".env.local" });

  const sql = neon(process.env.DATABASE_URL!);
  db = drizzle({ client: sql, schema });
} else {
  // Client side - create a mock db that throws errors
  db = null as any;
}

export { db };

// Export schema for use in other files
export * from "./schema";
