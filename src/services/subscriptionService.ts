/* eslint-disable @typescript-eslint/no-explicit-any */
// ✅ services/subscriptionService.ts
import axios from "axios"
import { getAuthHeaders } from "./authService.js"

const API_URL = "https://nyumba-smart-server.onrender.com/api/subscriptions"

// ✅ Function to create a subscription
export const createSubscription = async (subscriptionData: any) => {
  const response = await axios.post(`${API_URL}/create`, subscriptionData, {
    headers: getAuthHeaders(),
    withCredentials: true,
  })
  return response.data
}

export const getSubscription = async () => {
  const response = await axios.get(`${API_URL}/current`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  })
  return response.data
}

// ✅ Function to validate subscription status
export const validateSubscription = async () => {
  const response = await axios.get(`${API_URL}/validate`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  })
  return response.data
}

// ✅ Function to update subscription
export const updateSubscription = async (subscriptionData: any) => {
  const response = await axios.put(`${API_URL}/update`, subscriptionData, {
    headers: getAuthHeaders(),
    withCredentials: true,
  })
  return response.data
}

// ✅ Function to cancel subscription
export const cancelSubscription = async () => {
  const response = await axios.delete(`${API_URL}/cancel`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  })
  return response.data
}

// ✅ Function to handle payment success
export const handlePaymentSuccess = async (paymentData: any) => {
  const response = await axios.post(`${API_URL}/payment-success`, paymentData, {
    headers: getAuthHeaders(),
    withCredentials: true,
  })
  return response.data
}
