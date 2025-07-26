/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { getAuthHeaders } from "./authService.js"

const API_URL = "https://nyumba-smart-server.onrender.com/api"

// Get all properties
export const getProperties = async () => {
  const response = await axios.get(`${API_URL}/properties`, {
    headers: getAuthHeaders(), 
  }) 
  return response.data
}

// Get single property with rooms
export const getProperty = async (id: string) => {
  const response = await axios.get(`${API_URL}/properties/${id}`, {
    headers: getAuthHeaders(),
  })
  return response.data
}

// Create property
export const createProperty = async (propertyData: any) => {
  const response = await axios.post(`${API_URL}/properties`, propertyData, {
    headers: getAuthHeaders(),
  })
  return response.data
}

// Update property
export const updateProperty = async (id: string, propertyData: any) => {
  const response = await axios.put(`${API_URL}/properties/${id}`, propertyData, {
    headers: getAuthHeaders(),
  })
  return response.data
}

// Delete property
export const deleteProperty = async (id: string) => {
  const response = await axios.delete(`${API_URL}/properties/${id}`, {
    headers: getAuthHeaders(),
  })
  return response.data
}

// Get property statistics
export const getPropertyStats = async () => {
  const response = await axios.get(`${API_URL}/properties/stats`, {
    headers: getAuthHeaders(),
  })
  return response.data
}

// Get all rooms for a property
export const getRooms = async (propertyId: string) => {
  const response = await axios.get(`${API_URL}/properties/${propertyId}/rooms`, {
    headers: getAuthHeaders(),
  })
  return response.data
}

// Create room
export const createRoom = async (propertyId: string, roomData: any) => {
  const response = await axios.post(`${API_URL}/rooms/${propertyId}/rooms`, roomData, {
    headers: getAuthHeaders(),
  })
  return response.data
}

// Update room
export const updateRoom = async (id: string, roomData: any) => {
  const response = await axios.put(`${API_URL}/rooms/${id}`, roomData, {
    headers: getAuthHeaders(),
  })
  return response.data
}

// Delete room
export const deleteRoom = async (id: string) => {
  const response = await axios.delete(`${API_URL}/rooms/${id}`, {
    headers: getAuthHeaders(),
  })
  return response.data
}

// Get available tenants
export const getAvailableTenants = async () => {
  const response = await axios.get(`${API_URL}/tenants/available`, {
    headers: getAuthHeaders(),
  })
  return response.data
}

// Get all tenants for landlord's properties
export const getTenants = async () => {
  const response = await axios.get(`${API_URL}/tenants`, {
    headers: getAuthHeaders(),
  })
  return response.data
}

// Assign tenant to room
export const assignTenant = async (roomId: string, userId: string) => {
  const response = await axios.post(
    `${API_URL}/rooms/${roomId}/assign`,
    { userId },
    {
      headers: getAuthHeaders(),
    },
  )
  return response.data
}

// Remove tenant from room
export const removeTenant = async (roomId: string) => {
  const response = await axios.delete(`${API_URL}/rooms/${roomId}/tenant`, {
    headers: getAuthHeaders(),
  })
  return response.data
}
