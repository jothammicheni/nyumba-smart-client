/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios"

const API_URL = "http://localhost:5000/api"

// Types
interface RegisterData {
  name: string
  email: string
  password: string
  role: string
  phone?: string
  city?: string
  service_category?: string
  referral_code?: string
}

interface AuthResponse {
  success: boolean
  token?: string
  refreshToken?: string
  user?: any
  message?: string
}

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Register user
export const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await api.post("/auth/register", userData)
    return response.data
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Registration failed",
    }
  }
}

// Login user
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await api.post("/auth/login", { email, password })
    return response.data
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Invalid credentials",
    }
  }
}

// Get current user
export const getCurrentUser = async (): Promise<AuthResponse> => {
  try {
    const response = await api.get("/auth/me")
    return {
      success: true,
      user: response.data.data,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to get user",
    }
  }
}

// Refresh token
export const refreshAuthToken = async (refreshToken: string): Promise<AuthResponse> => {
  try {
    const response = await api.post("/auth/refresh-token", { refreshToken })
    return response.data
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to refresh token",
    }
  }
}

// Logout user
export const logoutUser = async (): Promise<AuthResponse> => {
  try {
    const response = await api.post("/auth/logout")
    return response.data
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Logout failed",
    }
  }
}

// Get auth headers for API requests
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")
    console.log("Token in getAuthHeaders:", token ? "found" : "not found"); // Add this line

  if (token) {
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  }
  return {
    "Content-Type": "application/json",
  }
}

export default {
  registerUser,
  loginUser,
  getCurrentUser,
  refreshAuthToken,
  logoutUser,
  getAuthHeaders,
}
