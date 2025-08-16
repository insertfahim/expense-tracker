import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    amount: number;
    category: string;
    date: string;
    createdAt: Date;
    updatedAt: Date;
}

const ExpenseSchema: Schema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            minlength: [3, "Title must be at least 3 characters long"],
            trim: true,
        },
        amount: {
            type: Number,
            required: [true, "Amount is required"],
            min: [0.01, "Amount must be greater than 0"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: [
                "Food",
                "Transport",
                "Shopping",
                "Entertainment",
                "Bills",
                "Healthcare",
                "Others",
            ],
        },
        date: {
            type: String,
            required: [true, "Date is required"],
            validate: {
                validator: function (v: string) {
                    return !isNaN(Date.parse(v));
                },
                message: "Invalid date format",
            },
        },
    },
    {
        timestamps: true,
    }
);

// Create compound index for better query performance
ExpenseSchema.index({ userId: 1, date: -1 });
ExpenseSchema.index({ userId: 1, category: 1 });

export default mongoose.models.Expense ||
    mongoose.model<IExpense>("Expense", ExpenseSchema);
