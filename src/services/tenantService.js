/* eslint-disable @typescript-eslint/no-explicit-any */
// services/tenantService.ts
import axios from "axios";
import { getAuthHeaders } from "./authService.js";
const API_URL = "http://localhost:5000/api";
// ✅ Create a new tenant
export const createTenant = async (tenantData) => {
    try {
        const response = await axios.post(`${API_URL}/users/create-new-tenant`, tenantData, {
            headers: getAuthHeaders(),
            withCredentials: true,
        });
        return response.data;
    }
    catch (error) {
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
export const fetchVacantRooms = async (propertyId) => {
    const response = await axios.get(`${API_URL}/rooms/properties/${propertyId}/vacant-rooms`, {
        headers: getAuthHeaders(),
    });
    return response.data.data;
};
// Optional: Fetch property ID by name
export const fetchPropertyIdByName = async (propertyName) => {
    const response = await axios.get(`${API_URL}/properties/id-by-name/${encodeURIComponent(propertyName)}`, {
        headers: getAuthHeaders(),
    });
    return response.data.data;
};
