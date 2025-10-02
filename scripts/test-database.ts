import { createUser, getUserByWalletAddress } from "../lib/db/services";

async function testDatabase() {
  try {
    console.log("🧪 Testing database connection...");

    // Test creating a user
    const testUser = await createUser({
      walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
      name: "Test Farmer",
      email: "test@example.com",
      location: "Test Location",
      farmSize: "5",
      experience: "10",
    });

    console.log("✅ User created:", testUser);

    // Test fetching the user
    const fetchedUser = await getUserByWalletAddress(testUser.walletAddress);
    console.log("✅ User fetched:", fetchedUser);

    console.log("🎉 Database connection successful!");
  } catch (error) {
    console.error("❌ Database test failed:", error);
  }
}

testDatabase();
