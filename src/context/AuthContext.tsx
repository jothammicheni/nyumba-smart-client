/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import authService from "../services/authService.js"

// Types
interface User {
  id: string
  name: string
  email: string
  password: string
  role: string
  isVerified: boolean
  referral_code?: string
  permissions?: string[]
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, remember?: boolean) => Promise<any>
  register: (userData: any) => Promise<any>
  logout: () => Promise<void>
}

// Create context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({}),
  register: async () => ({}),
  logout: async () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token")
      const storedRefreshToken = localStorage.getItem("refreshToken")

      if (token && storedRefreshToken) {
        try {
          setRefreshToken(storedRefreshToken)

          const response = await authService.getCurrentUser()
          if (response.success && response.user) {
            const normalizedUser: User = {
              id: response.user._id,
              name: response.user.name,
              email: response.user.email,
              password: response.user.password,
              role: response.user.role,
              isVerified: response.user.isVerified,
              referral_code: response.user.referral_code,
              permissions: response.user.caretakerPermissions || [],
            }
            setUser(normalizedUser)
            setIsAuthenticated(true)
          } else {
            const refreshResponse = await authService.refreshAuthToken(storedRefreshToken)
            if (refreshResponse.success && refreshResponse.token && refreshResponse.refreshToken) {
              localStorage.setItem("token", refreshResponse.token)
              localStorage.setItem("refreshToken", refreshResponse.refreshToken)
              setRefreshToken(refreshResponse.refreshToken)

              const userResponse = await authService.getCurrentUser()
              if (userResponse.success && userResponse.user) {
                const normalizedUser: User = {
                  id: userResponse.user._id,
                  name: userResponse.user.name,
                  email: userResponse.user.email,
                  password: userResponse.user.password,
                  role: userResponse.user.role,
                  isVerified: userResponse.user.isVerified,
                  referral_code: userResponse.user.referral_code,
                  permissions: userResponse.user.caretakerPermissions || [],
                }
                setUser(normalizedUser)
                setIsAuthenticated(true)
              } else {
                localStorage.removeItem("token")
                localStorage.removeItem("refreshToken")
                setUser(null)
                setIsAuthenticated(false)
                setRefreshToken(null)
              }
            } else {
              localStorage.removeItem("token")
              localStorage.removeItem("refreshToken")
              setUser(null)
              setIsAuthenticated(false)
              setRefreshToken(null)
            }
          }
        } catch (error) {
          console.error("Auth initialization error:", error)
          localStorage.removeItem("token")
          localStorage.removeItem("refreshToken")
          setUser(null)
          setIsAuthenticated(false)
          setRefreshToken(null)
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  // Token refresh
  useEffect(() => {
    if (!refreshToken) return

    const refreshInterval = setInterval(async () => {
      try {
        const response = await authService.refreshAuthToken(refreshToken)
        if (response.success && response.token && response.refreshToken) {
          localStorage.setItem("token", response.token)
          localStorage.setItem("refreshToken", response.refreshToken)
          setRefreshToken(response.refreshToken)
        } else {
          localStorage.removeItem("token")
          localStorage.removeItem("refreshToken")
          setUser(null)
          setIsAuthenticated(false)
          setRefreshToken(null)
        }
      } catch (error) {
        console.error("Token refresh error:", error)
      }
    }, 15 * 60 * 1000)

    return () => clearInterval(refreshInterval)
  }, [refreshToken])

  // Login
  const login = async (email: string, password: string, remember = false) => {
    try {
      const response = await authService.loginUser(email, password)

      if (response.success && response.token && response.refreshToken && response.user) {
        if (remember) {
          localStorage.setItem("token", response.token)
          localStorage.setItem("refreshToken", response.refreshToken)
        } else {
          sessionStorage.setItem("token", response.token)
          sessionStorage.setItem("refreshToken", response.refreshToken)
        }

        const normalizedUser: User = {
          id: response.user._id,
          name: response.user.name,
          email: response.user.email,
          password: response.user.password,
          role: response.user.role,
          isVerified: response.user.isVerified,
          referral_code: response.user.referral_code,
          permissions: response.user.caretakerPermissions || [],
        }

        setUser(normalizedUser)
        setIsAuthenticated(true)
        setRefreshToken(response.refreshToken)
      }

      return response
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "An unexpected error occurred" }
    }
  }

  // Register
  const register = async (userData: any) => {
    try {
      const response = await authService.registerUser(userData)

      if (response.success && response.token && response.refreshToken && response.user) {
        localStorage.setItem("token", response.token)
        localStorage.setItem("refreshToken", response.refreshToken)

        const normalizedUser: User = {
          id: response.user._id,
          name: response.user.name,
          email: response.user.email,
          password: response.user.password,
          role: response.user.role,
          isVerified: response.user.isVerified,
          referral_code: response.user.referral_code,
          permissions: response.user.caretakerPermissions || [],
        }

        setUser(normalizedUser)
        setIsAuthenticated(true)
        setRefreshToken(response.refreshToken)
      }

      return response
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, message: "An unexpected error occurred" }
    }
  }

  // Logout
  const logout = async () => {
    try {
      await authService.logoutUser()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("refreshToken")
      setUser(null)
      setIsAuthenticated(false)
      setRefreshToken(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook
export const useAuth = () => useContext(AuthContext)
