/**
 * @file This script checks the database connection and verifies the existence of records in the 'users' table.
 * It serves as a health check or a diagnostic tool for the application's database integration.
 */
import { db } from "../lib/db/index";
import { users } from "../lib/db/schema";

/**
 * Asynchronously checks the database connection by attempting to query the 'users' table.
 * Logs the connection status, the number of user records found, and details of each user if any exist.
 * Catches and logs any errors encountered during the database operation.
 */
async function checkDatabase() {
  try {
    console.log("🔍 Checking database connection...");

    // Query the 'users' table to verify database accessibility and retrieve any existing records.
    const usersRecords = await db.select().from(users);
    console.log("✅ Database connection successful!");
    console.log(`📊 Users table has ${usersRecords.length} records`);

    if (usersRecords.length > 0) {
      console.log("👥 Users found:");
      usersRecords.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.name} (${user.walletAddress})`);
      });
    } else {
      console.log("📭 No users found in database");
    }
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

checkDatabase();
