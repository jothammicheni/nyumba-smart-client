/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getAuthHeaders } from "./authService";

const API_BASE_URL = "http://localhost:5000/api";

export const getProperties = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/properties`, {
      headers: getAuthHeaders(),
    });
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch properties", error);
    throw error;
  }
};

export const addCaretaker = async (caretakerData: any) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/assign-caretaker`,
      caretakerData,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add caretaker", error);
    throw error;
  }
};

// ✅ Get user by ID
export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get user by ID", error);
    throw error;
  }
};

// ✅ Update user
export const updateUser = async (id: string, updatedData: any) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/users/${id}`,
      updatedData,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update user", error);
    throw error;
  }
};
