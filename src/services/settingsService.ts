import axios from "axios"
import { getAuthHeaders } from "./authService.js"

const BASE_URL = "http://localhost:5000/api/settings"

export const settingsService = {
  getCurrentUserSettings: async () => {
    const response = await axios.get(`${BASE_URL}/me`, {
      headers: getAuthHeaders(),
      withCredentials: true
    })
    return response.data.data
  },

  updateProfile: async (payload: { name: string; email: string }) => {
    const response = await axios.put(`${BASE_URL}/update-profile`, payload, {

      headers: getAuthHeaders(),
      withCredentials: true

    })
    return response.data
  },

updatePaymentPhone: async (phone: string) => {
  const response = await axios.put(
    `${BASE_URL}/update-payment-phone`,
    { phone }, 
    {
      headers: getAuthHeaders(),
      withCredentials: true
    }
  )
  return response.data
}
,

  changePassword: async (payload: {
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }) => {
    const response = await axios.put(`${BASE_URL}/change-password`, payload, {

      headers: getAuthHeaders(),
      withCredentials: true

    })
    return response.data
  },
}