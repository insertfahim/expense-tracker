"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { AuthForms } from "@/components/auth-forms"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuth()

  console.log("[v0] AuthGuard - user:", user, "isLoading:", isLoading)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    console.log("[v0] AuthGuard - showing AuthForms")
    return <AuthForms />
  }

  return <>{children}</>
}
