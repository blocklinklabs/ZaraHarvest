"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";

export default function DatabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const { wallet, syncWithDatabase, isDatabaseConnected } = useAppStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !wallet.isConnected || !wallet.accountId) return;

    // Sync with database when wallet connects
    const syncData = async () => {
      try {
        await syncWithDatabase();
        console.log("✅ Database sync completed");
      } catch (error) {
        console.error("❌ Database sync failed:", error);
      }
    };

    syncData();
  }, [isClient, wallet.isConnected, wallet.accountId, syncWithDatabase]);

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      {/* Database connection indicator */}
      {wallet.isConnected && (
        <div className="fixed bottom-4 left-4 z-50">
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isDatabaseConnected
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            }`}
          >
            {isDatabaseConnected ? "🟢 DB Connected" : "🟡 DB Offline"}
          </div>
        </div>
      )}
    </>
  );
}
