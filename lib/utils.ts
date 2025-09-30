import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function generateMockYieldPrediction(cropType: string): {
  predictedYield: number;
  riskLevel: number;
  confidence: number;
} {
  const baseYield =
    {
      Maize: 2.5,
      Cocoa: 1.8,
      Rice: 3.2,
      Wheat: 2.1,
      Cassava: 4.5,
    }[cropType] || 2.0;

  const variation = (Math.random() - 0.5) * 0.4; // ±20% variation
  const predictedYield = Math.max(0.5, baseYield + variation);

  const riskLevel = Math.random() * 30 + 5; // 5-35% risk
  const confidence = Math.random() * 20 + 75; // 75-95% confidence

  return {
    predictedYield: Math.round(predictedYield * 10) / 10,
    riskLevel: Math.round(riskLevel * 10) / 10,
    confidence: Math.round(confidence * 10) / 10,
  };
}

export function calculateLoanInterest(
  amount: number,
  riskLevel: number
): number {
  const baseRate = 5.0; // 5% base rate
  const riskAdjustment = riskLevel * 0.1; // 0.1% per risk point
  return Math.min(15.0, baseRate + riskAdjustment); // Cap at 15%
}

export function generateQRCodeData(tokenId: string): string {
  return `https://agriyield.app/token/${tokenId}`;
}

export function mockHBARReward(): number {
  return Math.random() * 10 + 5; // 5-15 HBAR
}

export function isOffline(): boolean {
  return typeof navigator !== "undefined" && !navigator.onLine;
}
