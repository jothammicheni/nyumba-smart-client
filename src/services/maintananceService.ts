/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// maintananceService.ts

import axios from "axios"
import { getAuthHeaders } from "./authService"

const API_URL = "http://localhost:5000/api"

// Create new maintenance request
export const createMaintananceRequests = async (propertyData: any) => {
  const response = await axios.post(`${API_URL}/maintenance`, propertyData, {
    headers: getAuthHeaders(),
    withCredentials: true,
  })
  return response.data
}

// Get maintenance requests
export const getMaintananceRequests = async (propertyData: any) => {
  const response = await axios.get(`${API_URL}/maintenance`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  })
  return response.data
}



// ✅ Get maintenance requests for landlord only
export const fetchLandlordMaintenanceRequests = async () => {
  const response = await axios.get(`${API_URL}/maintenance/landlord`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  })
  return response.data?.data || []
}