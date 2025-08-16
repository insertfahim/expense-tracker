import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Expense from "@/lib/models/Expense";
import mongoose from "mongoose";

// GET /api/expenses - Fetch user's expenses
export async function GET(request: NextRequest) {
    try {
        const userId = request.headers.get("x-user-id");
        if (!userId) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            );
        }

        await dbConnect();

        const expenses = await Expense.find({
            userId: new mongoose.Types.ObjectId(userId),
        })
            .sort({ createdAt: -1 })
            .lean();

        // Convert ObjectId to string for client
        const expensesWithStringId = expenses.map((expense: any) => ({
            ...expense,
            id: expense._id.toString(),
            _id: undefined,
        }));

        return NextResponse.json(expensesWithStringId);
    } catch (error) {
        console.error("Error fetching expenses:", error);
        return NextResponse.json(
            { error: "Failed to fetch expenses" },
            { status: 500 }
        );
    }
}

// POST /api/expenses - Add new expense
export async function POST(request: NextRequest) {
    try {
        const userId = request.headers.get("x-user-id");
        if (!userId) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            );
        }

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

        const newExpense = new Expense({
            userId: new mongoose.Types.ObjectId(userId),
            title,
            amount,
            category,
            date,
        });

        const savedExpense = await newExpense.save();

        // Convert to plain object with string ID
        const expenseResponse = {
            ...savedExpense.toObject(),
            id: savedExpense._id.toString(),
            _id: undefined,
        };

        return NextResponse.json(expenseResponse, { status: 201 });
    } catch (error) {
        console.error("Error creating expense:", error);
        return NextResponse.json(
            { error: "Failed to create expense" },
            { status: 500 }
        );
    }
}
