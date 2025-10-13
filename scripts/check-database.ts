// Polish wording in docs/comments.
import { db } from "../lib/db/index";
import { users } from "../lib/db/schema";

async function checkDatabase() {
  try {
    console.log("🔍 Checking database connection...");

    // Try to query the users table
    const userCount = await db.select().from(users);
    console.log("✅ Database connection successful!");
    console.log(`📊 Users table has ${userCount.length} records`);

    if (userCount.length > 0) {
      console.log("👥 Users found:");
      userCount.forEach((user, index) => {
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
