import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Expense from "@/lib/models/Expense";
import mongoose from "mongoose";

// PATCH /api/expenses/[id] - Update expense
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const userId = request.headers.get("x-user-id");
        if (!userId) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            );
        }

        const { id } = params;
        const body = await request.json();
        const { title, amount, category, date } = body;

        // Validation
        if (!title || title.length < 3) {
            return NextResponse.json(
                { error: "Title must be at least 3 characters long" },
                { status: 400 }
            );
        }

        if (!amount || typeof amount !== "number" || amount <= 0) {
            return NextResponse.json(
                { error: "Amount must be a number greater than 0" },
                { status: 400 }
            );
        }

        if (!category) {
            return NextResponse.json(
                { error: "Category is required" },
                { status: 400 }
            );
        }

        if (!date) {
            return NextResponse.json(
                { error: "Date is required" },
                { status: 400 }
            );
        }

        // Validate date format
        if (isNaN(Date.parse(date))) {
            return NextResponse.json(
                { error: "Invalid date format" },
                { status: 400 }
            );
        }

        await dbConnect();

        // Find and update the expense
        const updatedExpense = await Expense.findOneAndUpdate(
            {
                _id: new mongoose.Types.ObjectId(id),
                userId: new mongoose.Types.ObjectId(userId),
            },
            { title, amount, category, date },
            { new: true, runValidators: true }
        );

        if (!updatedExpense) {
            return NextResponse.json(
                { error: "Expense not found" },
                { status: 404 }
            );
        }

        // Convert to plain object with string ID
        const expenseResponse = {
            ...updatedExpense.toObject(),
            id: updatedExpense._id.toString(),
            _id: undefined,
        };

        return NextResponse.json(expenseResponse);
    } catch (error) {
        console.error("Error updating expense:", error);
        return NextResponse.json(
            { error: "Failed to update expense" },
            { status: 500 }
        );
    }
}

// DELETE /api/expenses/[id] - Delete expense
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const userId = request.headers.get("x-user-id");
        if (!userId) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            );
        }

        const { id } = params;

        await dbConnect();

        // Find and delete the expense
        const deletedExpense = await Expense.findOneAndDelete({
            _id: new mongoose.Types.ObjectId(id),
            userId: new mongoose.Types.ObjectId(userId),
        });

        if (!deletedExpense) {
            return NextResponse.json(
                { error: "Expense not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("Error deleting expense:", error);
        return NextResponse.json(
            { error: "Failed to delete expense" },
            { status: 500 }
        );
    }
}
