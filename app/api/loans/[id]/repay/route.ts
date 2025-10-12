import { NextRequest, NextResponse } from "next/server";
import { AgriYieldHelper } from "@/lib/contract";
import {
  getUserByWalletAddress,
  updateLoanRepayment,
  getLoansByUserId,
} from "@/lib/db/services";
import { ethers } from "ethers";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { walletAddress, amount } = body;
    const loanId = params.id;

    if (!walletAddress || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get user by wallet address
    const user = await getUserByWalletAddress(walletAddress);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get user's loans to find the specific loan
    const userLoans = await getLoansByUserId(user.id);
    const loan = userLoans.find((l) => l.id === loanId);

    if (!loan) {
      return NextResponse.json({ error: "Loan not found" }, { status: 404 });
    }

    if (loan.status !== "active") {
      return NextResponse.json(
        { error: "Loan is not active" },
        { status: 400 }
      );
    }

    if (!loan.blockchainLoanId) {
      return NextResponse.json(
        { error: "Blockchain loan ID not found" },
        { status: 400 }
      );
    }

    // Update loan in database (blockchain interaction will be handled on client side)
    const currentRepaidAmount = parseFloat(loan.repaidAmount || "0");
    const newRepaidAmount = currentRepaidAmount + parseFloat(amount);

    // Check if loan is fully repaid
    const totalLoanAmount = parseFloat(loan.amount);
    const newStatus =
      newRepaidAmount >= totalLoanAmount ? "completed" : "active";

    const updatedLoan = await updateLoanRepayment(
      loanId,
      newRepaidAmount.toString(),
      newStatus as any
    );

    return NextResponse.json({
      success: true,
      data: {
        id: updatedLoan.id,
        repaidAmount: parseFloat(updatedLoan.repaidAmount || "0"),
        status: updatedLoan.status,
      },
    });
  } catch (error) {
    console.error("Failed to repay loan:", error);
    return NextResponse.json(
      { error: "Failed to repay loan" },
      { status: 500 }
    );
  }
}
