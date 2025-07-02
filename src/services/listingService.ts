/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { getAuthHeaders } from "./authService.js"

const API_BASE_URL = "http://localhost:5000"

export interface CreateListingData {
  property_id: string
  property_name: string
  city: string
  area: string
  specific_location?: string
  type: string
  bathrooms: string
  price: string
  deposit: string
  description?: string
  amenities?: string
  images: File[]
}

export const listingService = {
  async createListing(data: FormData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/listings`, data, {
        headers: getAuthHeaders(true),
        withCredentials: true,
      })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to create listing")
    }
  },

  async getListings(params?: {
    page?: number
    limit?: number
    type?: string
    minPrice?: number
    maxPrice?: number
    bedrooms?: number
    featured?: boolean
    city?: string
  }) {
    try {
      const response = await axios.get(`${API_BASE_URL}/listings`, { params })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to fetch listings")
    }
  },

  async getListingById(id: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/listings/${id}`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to fetch listing")
    }
  },

  async updateListing(id: string, data: Partial<CreateListingData>) {
    try {
      const response = await axios.put(`${API_BASE_URL}/listings/${id}`, data)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to update listing")
    }
  },

  async deleteListing(id: string) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/listings/${id}`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Failed to delete listing")
    }
  },
}

// Legacy function for backward compatibility
export const uploadListing = listingService.createListing


// 🆕 ADDED METRICS TRACKING FUNCTIONS
export const trackImpression = async (listingId: string) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/listings/${listingId}/track-impression`,
      {}, // 👈 send an empty object instead of null
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Impression tracked successfully:', response.data);
  } catch (error: any) {
    console.error('Impression tracking failed:', error);
    console.log('Error details:', error.response?.data || error.message);
  }
};

export const trackClick = async (listingId: string) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/listings/${listingId}/track-click`,
      {}, // 👈 send an empty object instead of null
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Click tracked successfully:', response.data);
  } catch (error: any) {
    console.error('Click tracking failed:', error);
    console.log('Error details:', error.response?.data || error.message);
  }
};


// 🆕 ADDED ANALYTICS FETCH FUNCTION
export const getListingAnalytics = async (listingId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/listings/${listingId}/analytics`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Analytics fetch failed:', error);
    return { ctr: 0, clicks: 0, impressions: 0 };
  }
};
