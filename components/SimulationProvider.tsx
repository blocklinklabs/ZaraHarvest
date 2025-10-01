"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { simulationData } from "@/lib/simulation-data";

interface SimulationProviderProps {
  children: React.ReactNode;
}

export default function SimulationProvider({
  children,
}: SimulationProviderProps) {
  const [isClient, setIsClient] = useState(false);
  const {
    farmData,
    yieldPredictions,
    loans,
    harvestTokens,
    badges,
    addFarmData,
    addYieldPrediction,
    addLoan,
    addHarvestToken,
    earnBadge,
  } = useAppStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run on client and if store is empty (first time user)
    if (!isClient || farmData.length > 0) return;

    // Add farm data
    simulationData.farmData.forEach((data) => {
      addFarmData({
        cropType: data.cropType,
        location: data.location,
        soilMoisture: data.soilMoisture,
        weatherNotes: data.weatherNotes,
      });
    });

    // Add yield predictions
    simulationData.yieldPredictions.forEach((prediction) => {
      addYieldPrediction({
        cropType: prediction.cropType,
        predictedYield: prediction.predictedYield,
        riskLevel: prediction.riskLevel,
        confidence: prediction.confidence,
      });
    });

    // Add loans
    simulationData.loans.forEach((loan) => {
      addLoan({
        amount: loan.amount,
        interestRate: loan.interestRate,
        status: loan.status,
        collateral: loan.collateral,
        startDate: loan.startDate,
        endDate: loan.endDate,
      });
    });

    // Add harvest tokens
    simulationData.harvestTokens.forEach((token) => {
      addHarvestToken({
        cropType: token.cropType,
        amount: token.amount,
        tokenizedAmount: token.tokenizedAmount,
        status: token.status,
      });
    });

    // Earn badges
    simulationData.badges.forEach((badge) => {
      if (badge.earned) {
        earnBadge(badge.id);
      }
    });
  }, [
    isClient,
    addFarmData,
    addYieldPrediction,
    addLoan,
    addHarvestToken,
    earnBadge,
    farmData.length,
  ]);

  return <>{children}</>;
}
