"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    console.log("[v0] AuthProvider - initializing")

    try {
      const savedToken = localStorage.getItem("auth_token")
      const savedUser = localStorage.getItem("auth_user")

      console.log("[v0] AuthProvider - savedToken:", !!savedToken, "savedUser:", !!savedUser)

      if (savedToken && savedUser) {
        setToken(savedToken)
        setUser(JSON.parse(savedUser))
        console.log("[v0] AuthProvider - restored user from localStorage")
      }
    } catch (error) {
      console.error("[v0] AuthProvider - error loading from localStorage:", error)
      // Clear corrupted data
      localStorage.removeItem("auth_token")
      localStorage.removeItem("auth_user")
    }

    setIsLoading(false)
    console.log("[v0] AuthProvider - initialization complete")
  }, [])

  const login = async (email: string, password: string) => {
    console.log("[v0] AuthProvider - attempting login for:", email)

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.log("[v0] AuthProvider - login failed:", error)
      if (error.error === "Invalid email or password") {
        throw new Error(
          "Invalid email or password. Please check your credentials or create an account if you don't have one.",
        )
      }
      throw new Error(error.error || "Login failed")
    }

    const { user, token } = await response.json()
    console.log("[v0] AuthProvider - login successful for user:", user.email)

    setUser(user)
    setToken(token)
    localStorage.setItem("auth_token", token)
    localStorage.setItem("auth_user", JSON.stringify(user))
  }

  const register = async (name: string, email: string, password: string) => {
    console.log("[v0] AuthProvider - attempting registration for:", email)

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.log("[v0] AuthProvider - registration failed:", error)
      if (error.error === "User already exists") {
        throw new Error("An account with this email already exists. Please sign in instead.")
      }
      throw new Error(error.error || "Registration failed")
    }

    const { user, token } = await response.json()
    console.log("[v0] AuthProvider - registration successful for user:", user.email)

    setUser(user)
    setToken(token)
    localStorage.setItem("auth_token", token)
    localStorage.setItem("auth_user", JSON.stringify(user))
  }

  const logout = () => {
    console.log("[v0] AuthProvider - logging out")
    setUser(null)
    setToken(null)
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
