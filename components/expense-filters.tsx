"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Filter, X } from "lucide-react"
import type { Expense } from "./expense-tracker"

interface ExpenseFiltersProps {
  expenses: Expense[]
  onFilter: (filteredExpenses: Expense[]) => void
}

const categories = ["All", "Food", "Transport", "Shopping", "Entertainment", "Bills", "Healthcare", "Others"]

export function ExpenseFilters({ expenses, onFilter }: ExpenseFiltersProps) {
  const [filters, setFilters] = useState({
    category: "All",
    dateFrom: "",
    dateTo: "",
    minAmount: "",
    maxAmount: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    applyFilters()
  }, [filters, expenses])

  const applyFilters = () => {
    let filtered = [...expenses]

    // Filter by category
    if (filters.category !== "All") {
      filtered = filtered.filter((expense) => expense.category === filters.category)
    }

    // Filter by date range
    if (filters.dateFrom) {
      filtered = filtered.filter((expense) => expense.date >= filters.dateFrom)
    }
    if (filters.dateTo) {
      filtered = filtered.filter((expense) => expense.date <= filters.dateTo)
    }

    // Filter by amount range
    if (filters.minAmount) {
      filtered = filtered.filter((expense) => expense.amount >= Number.parseFloat(filters.minAmount))
    }
    if (filters.maxAmount) {
      filtered = filtered.filter((expense) => expense.amount <= Number.parseFloat(filters.maxAmount))
    }

    onFilter(filtered)
  }

  const clearFilters = () => {
    setFilters({
      category: "All",
      dateFrom: "",
      dateTo: "",
      minAmount: "",
      maxAmount: "",
    })
  }

  const hasActiveFilters =
    filters.category !== "All" || filters.dateFrom || filters.dateTo || filters.minAmount || filters.maxAmount

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="category-filter">Category</Label>
                <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date-from">From Date</Label>
                <Input
                  id="date-from"
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="date-to">To Date</Label>
                <Input
                  id="date-to"
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="min-amount">Min Amount ($)</Label>
                <Input
                  id="min-amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={filters.minAmount}
                  onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label htmlFor="max-amount">Max Amount ($)</Label>
                <Input
                  id="max-amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={filters.maxAmount}
                  onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                  placeholder="0.00"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
