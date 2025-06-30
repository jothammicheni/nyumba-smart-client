/* eslint-disable @typescript-eslint/no-explicit-any */
// services/tenantService.ts
import axios from "axios";
import { getAuthHeaders } from "./authService.js";

const API_URL = "https://nyumba-smart-server.onrender.com/api";

// ✅ Create a new tenant
export const createTenant = async (tenantData:any) => {
  const response = await axios.post(`${API_URL}/users/create-new-tenant`, tenantData, {
   headers: getAuthHeaders(),
   withCredentials: true,
  });
  return response.data;
};

// ✅ Fetch properties for the current landlord
export const fetchLandlordProperties = async () => {
  const response = await axios.get(`${API_URL}/properties/`, {
    headers: getAuthHeaders(),
  });
  console.log("Landlord properties fetched:", response.data);
  return response.data.data;
};

// ✅ Fetch vacant rooms of a selected property
export const fetchVacantRooms = async (propertyId: string) => {
  const response = await axios.get(
    `${API_URL}/rooms/properties/${propertyId}/vacant-rooms`,
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data.data;
};

// Fetch property ID by name
export const fetchPropertyIdByName = async (propertyName: string) => {
  const response = await axios.get(
    `${API_URL}/properties/id-by-name/${encodeURIComponent(propertyName)}`,
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data.data; // property ID
};
