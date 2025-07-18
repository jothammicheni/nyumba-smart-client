/* eslint-disable @typescript-eslint/no-explicit-any */
// services/tenantService.ts
import axios from "axios";
import { getAuthHeaders } from "./authService.js";

const API_URL = "https://nyumba-smart-server.onrender.com/api";

interface CreateTenantPayload {
  name: string;
  email: string;
  phone: string;
  property_id: string;
  room_id: string;
}

interface CreateTenantResponse {
  success: boolean;
  data?: {
    id: string;
    name: string;
    email: string;
    leaseId: string;
  };
  message?: string;
}

// ✅ Create a new tenant
export const createTenant = async (
  tenantData: CreateTenantPayload
): Promise<CreateTenantResponse> => {
  try {
    const response = await axios.post(
      `${API_URL}/users/create-new-tenant`,
      tenantData,
      {
        headers: getAuthHeaders(),
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("❌ Error creating tenant:", error);
    throw error;
  }
};

// ✅ Fetch properties for the current landlord
export const fetchLandlordProperties = async () => {
  const response = await axios.get(`${API_URL}/properties/`, {
    headers: getAuthHeaders(),
  });
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

// Optional: Fetch property ID by name
export const fetchPropertyIdByName = async (propertyName: string) => {
  const response = await axios.get(
    `${API_URL}/properties/id-by-name/${encodeURIComponent(propertyName)}`,
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data.data;
};
