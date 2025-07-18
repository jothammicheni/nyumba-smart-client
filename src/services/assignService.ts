/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios"
import { getAuthHeaders } from "./authService.js"

const API_URL = "https://nyumba-smart-server.onrender.com/api"

// assign a service provider
export const createMaintananceRequests = async (requestData: {
  description: string;
  priority: string;
  serviceType: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/maintenance`, requestData, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating maintenance request:", error);
    throw error;
  }
};

// Get maintenance requests
export const getMaintananceRequests = async (requestData: any) => {
  try {
    const response = await axios.get(`${API_URL}/maintenance`, {
      headers: getAuthHeaders(),
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching maintenance requests:", error);
    throw error;
  }
}


// ✅ Get maintenance requests for landlord only
export const fetchLandlordMaintenanceRequests = async () => {
  const response = await axios.get(`${API_URL}/maintenance/landlord`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  })
  return response.data?.data || []
}