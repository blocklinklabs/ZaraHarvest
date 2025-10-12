import { NextRequest, NextResponse } from "next/server";
import { dbAdapter } from "@/lib/db/adapter";
import { AgriYieldHelper } from "@/lib/contract";
import {
  getUserByWalletAddress,
  getLoansByUserId,
  createLoanWithBlockchain,
  getAvailableCollateralByUserId,
} from "@/lib/db/services";
import { ethers } from "ethers";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get("walletAddress");

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Get user by wallet address
    const user = await getUserByWalletAddress(walletAddress);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get user's loans
    const userLoans = await getLoansByUserId(user.id);

    return NextResponse.json({
      success: true,
      data: userLoans.map((loan) => ({
        id: loan.id,
        blockchainLoanId: loan.blockchainLoanId,
        amount: parseFloat(loan.amount),
        interestRate: parseFloat(loan.interestRate),
        status: loan.status,
        collateral: loan.collateral,
        collateralPredictionId: loan.collateralPredictionId,
        startDate: loan.startDate,
        endDate: loan.endDate,
        repaidAmount: parseFloat(loan.repaidAmount || "0"),
        blockchainTxHash: loan.blockchainTxHash,
        createdAt: loan.createdAt,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch loans:", error);
    return NextResponse.json(
      { error: "Failed to fetch loans" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, collateralTokenId, amount, collateralPredictionId } =
      body;

    if (!walletAddress || !collateralTokenId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Initialize user in database adapter
    await dbAdapter.initializeUser(walletAddress);

    // Get user by wallet address
    const user = await getUserByWalletAddress(walletAddress);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get available collateral
    const availableCollateral = await getAvailableCollateralByUserId(user.id);

    if (availableCollateral.length === 0) {
      return NextResponse.json(
        {
          error:
            "No tokenized harvest available for collateral. Please tokenize your harvest first.",
        },
        { status: 400 }
      );
    }

    const selectedCollateral = availableCollateral.find(
      (token) => token.id === collateralTokenId
    );

    if (!selectedCollateral) {
      return NextResponse.json(
        { error: "Selected collateral not available" },
        { status: 400 }
      );
    }

    // Calculate loan details
    const interestRate = 12; // 12% APR
    const startDate = new Date();
    const endDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year

    // Store loan in database (blockchain interaction will be handled on client side)
    const loanData = {
      userId: user.id,
      amount: amount.toString(),
      interestRate: interestRate.toString(),
      status: "pending" as const, // Will be updated to "active" after blockchain transaction
      collateral: [collateralTokenId],
      collateralPredictionId: collateralPredictionId,
      startDate,
      endDate,
      repaidAmount: "0",
    };

    const loan = await createLoanWithBlockchain(loanData);

    return NextResponse.json({
      success: true,
      data: {
        id: loan.id,
        blockchainLoanId: loan.blockchainLoanId,
        amount: parseFloat(loan.amount),
        interestRate: parseFloat(loan.interestRate),
        status: loan.status,
        collateral: loan.collateral,
        startDate: loan.startDate,
        endDate: loan.endDate,
        blockchainTxHash: loan.blockchainTxHash,
      },
    });
  } catch (error) {
    console.error("Failed to create loan:", error);
    return NextResponse.json(
      { error: "Failed to create loan" },
      { status: 500 }
    );
  }
}
