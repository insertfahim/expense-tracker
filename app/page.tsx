"use client"

import { HomePage } from "@/components/home-page"
import { ExpenseTracker } from "@/components/expense-tracker"
import { AuthGuard } from "@/components/auth-guard"
import { useAuth } from "@/contexts/auth-context"

export default function Home() {
  const { user } = useAuth()

  if (!user) {
    return (
      <AuthGuard>
        <HomePage />
      </AuthGuard>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <ExpenseTracker />
    </main>
  )
}
