"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { loginUser } from "../utils/api"

interface User {
  id: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (token && storedUser) {
      try {
        // Check if token is expired
        const payload = JSON.parse(atob(token.split(".")[1]))
        const isExpired = payload.exp * 1000 < Date.now()

        if (isExpired) {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
        } else {
          setUser(JSON.parse(storedUser))
        }
      } catch (e) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        console.error("Error parsing token:", e)
      }
    }

    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await loginUser(email, password)
      const { user, token } = response

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      setUser(user)
    } catch (err) {
      setError("Credenciales inválidas. Por favor intente nuevamente.")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
    error,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
