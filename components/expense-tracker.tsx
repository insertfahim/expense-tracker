"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Trash2,
    Edit,
    Plus,
    DollarSign,
    Calendar,
    PieChart,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ExpenseChart } from "@/components/expense-chart";
import { ExpenseFilters } from "@/components/expense-filters";
import { UserHeader } from "@/components/user-header";
import { useAuth } from "@/contexts/auth-context";

export interface Expense {
    id: string;
    title: string;
    amount: number;
    category: string;
    date: string;
    createdAt: string;
}

const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Entertainment",
    "Bills",
    "Healthcare",
    "Others",
];

const categoryColors: Record<string, string> = {
    Food: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    Transport: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Shopping:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Entertainment:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    Bills: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    Healthcare: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    Others: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
};

export function ExpenseTracker() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
    const [showChart, setShowChart] = useState(false);
    const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
    const { toast } = useToast();
    const { token } = useAuth();

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        fetchExpenses();
    }, []);

    useEffect(() => {
        setFilteredExpenses(expenses);
    }, [expenses]);

    const fetchExpenses = async () => {
        try {
            const response = await fetch("/api/expenses", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setExpenses(data);
            }
        } catch (error) {
            console.error("Failed to fetch expenses:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        if (!formData.title || formData.title.length < 3) {
            toast({
                title: "Validation Error",
                description: "Title must be at least 3 characters long",
                variant: "destructive",
            });
            return false;
        }

        if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
            toast({
                title: "Validation Error",
                description: "Amount must be a number greater than 0",
                variant: "destructive",
            });
            return false;
        }

        if (!formData.category) {
            toast({
                title: "Validation Error",
                description: "Please select a category",
                variant: "destructive",
            });
            return false;
        }

        if (!formData.date) {
            toast({
                title: "Validation Error",
                description: "Please select a date",
                variant: "destructive",
            });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("[v0] Add Expense - form submitted");
        console.log("[v0] Add Expense - token:", token ? "present" : "missing");
        console.log("[v0] Add Expense - formData:", formData);

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const expenseData = {
                title: formData.title,
                amount: Number.parseFloat(formData.amount),
                category: formData.category || "Others", // Default to "Others" if category is empty
                date: formData.date,
            };

            console.log(
                "[v0] Add Expense - sending request with data:",
                expenseData
            );

            const url = editingExpense
                ? `/api/expenses/${editingExpense.id}`
                : "/api/expenses";
            const method = editingExpense ? "PATCH" : "POST";

            console.log(
                "[v0] Add Expense - making fetch request to:",
                url,
                "method:",
                method
            );

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(expenseData),
            });

            console.log("[v0] Add Expense - response received");
            console.log("[v0] Add Expense - response status:", response.status);
            console.log("[v0] Add Expense - response ok:", response.ok);
            console.log(
                "[v0] Add Expense - response headers:",
                Object.fromEntries(response.headers.entries())
            );

            if (response.ok) {
                const responseData = await response.json();
                console.log(
                    "[v0] Add Expense - success response data:",
                    responseData
                );
                await fetchExpenses();
                resetForm();
                toast({
                    title: "Success",
                    description: editingExpense
                        ? "Expense updated successfully"
                        : "Expense added successfully",
                });
            } else {
                const errorText = await response.text();
                console.log(
                    "[v0] Add Expense - error response text:",
                    errorText
                );
                let errorData;
                try {
                    errorData = JSON.parse(errorText);
                    console.log(
                        "[v0] Add Expense - parsed error data:",
                        errorData
                    );
                } catch {
                    console.log(
                        "[v0] Add Expense - could not parse error as JSON"
                    );
                }
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
        } catch (error) {
            console.log("[v0] Add Expense - caught error:", error);
            console.log(
                "[v0] Add Expense - error message:",
                error instanceof Error ? error.message : String(error)
            );
            console.log(
                "[v0] Add Expense - error stack:",
                error instanceof Error ? error.stack : "No stack trace"
            );
            toast({
                title: "Error",
                description: `Failed to save expense: ${
                    error instanceof Error ? error.message : String(error)
                }`,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (expense: Expense) => {
        setEditingExpense(expense);
        setFormData({
            title: expense.title,
            amount: expense.amount.toString(),
            category: expense.category,
            date: expense.date,
        });
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/expenses/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                await fetchExpenses();
                toast({
                    title: "Success",
                    description: "Expense deleted successfully",
                });
            } else {
                throw new Error("Failed to delete expense");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete expense. Please try again.",
                variant: "destructive",
            });
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            amount: "",
            category: "",
            date: new Date().toISOString().split("T")[0],
        });
        setEditingExpense(null);
    };

    const totalAmount = filteredExpenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    if (isLoading) {
        return (
            <div className="container mx-auto p-4 max-w-6xl">
                <div className="text-center py-8">Loading...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 max-w-6xl space-y-6">
            <Toaster />

            <UserHeader />

            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-foreground">
                    Personal Expense Tracker
                </h1>
                <p className="text-muted-foreground">
                    Track and manage your daily expenses
                </p>
            </div>

            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100">Total Expenses</p>
                            <p className="text-3xl font-bold">
                                ${totalAmount.toFixed(2)}
                            </p>
                        </div>
                        <DollarSign className="h-12 w-12 text-blue-200" />
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plus className="h-5 w-5" />
                            {editingExpense
                                ? "Edit Expense"
                                : "Add New Expense"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            title: e.target.value,
                                        })
                                    }
                                    placeholder="Enter expense title"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="amount">Amount ($)</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    value={formData.amount}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            amount: e.target.value,
                                        })
                                    }
                                    placeholder="0.00"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            category: value,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            date: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Saving..."
                                        : editingExpense
                                        ? "Update"
                                        : "Add"}{" "}
                                    Expense
                                </Button>
                                {editingExpense && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={resetForm}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="lg:col-span-2 space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <ExpenseFilters
                            expenses={expenses}
                            onFilter={setFilteredExpenses}
                        />
                        <Button
                            variant="outline"
                            onClick={() => setShowChart(!showChart)}
                            className="flex items-center gap-2"
                        >
                            <PieChart className="h-4 w-4" />
                            {showChart ? "Hide Chart" : "Show Chart"}
                        </Button>
                    </div>

                    {showChart && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Expenses by Category</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ExpenseChart expenses={filteredExpenses} />
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Expense List ({filteredExpenses.length} items)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="p-4 border rounded-lg"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-2 flex-1">
                                                    <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                                                    <div className="h-3 bg-muted rounded animate-pulse w-1/2"></div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="h-8 w-8 bg-muted rounded animate-pulse"></div>
                                                    <div className="h-8 w-8 bg-muted rounded animate-pulse"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : filteredExpenses.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    No expenses found. Add your first expense to
                                    get started!
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {filteredExpenses.map((expense) => (
                                        <div
                                            key={expense.id}
                                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3 className="font-semibold">
                                                        {expense.title}
                                                    </h3>
                                                    <Badge
                                                        className={
                                                            categoryColors[
                                                                expense.category
                                                            ]
                                                        }
                                                    >
                                                        {expense.category}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span className="font-medium text-lg text-foreground">
                                                        $
                                                        {expense.amount.toFixed(
                                                            2
                                                        )}
                                                    </span>
                                                    <span>
                                                        {new Date(
                                                            expense.date
                                                        ).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 mt-2 sm:mt-0">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleEdit(expense)
                                                    }
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDelete(expense.id)
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
