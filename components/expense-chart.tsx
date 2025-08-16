"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import type { Expense } from "./expense-tracker"

interface ExpenseChartProps {
  expenses: Expense[]
}

const COLORS = {
  Food: "#ef4444",
  Transport: "#3b82f6",
  Shopping: "#22c55e",
  Entertainment: "#a855f7",
  Bills: "#f97316",
  Healthcare: "#ec4899",
  Others: "#6b7280",
}

export function ExpenseChart({ expenses }: ExpenseChartProps) {
  // Group expenses by category and calculate totals
  const categoryData = expenses.reduce(
    (acc, expense) => {
      const category = expense.category
      if (!acc[category]) {
        acc[category] = 0
      }
      acc[category] += expense.amount
      return acc
    },
    {} as Record<string, number>,
  )

  // Convert to chart data format
  const chartData = Object.entries(categoryData).map(([category, amount]) => ({
    name: category,
    value: amount,
    color: COLORS[category as keyof typeof COLORS] || COLORS.Others,
  }))

  if (chartData.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No data to display</div>
  }

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
