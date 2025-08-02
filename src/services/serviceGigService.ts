/* eslint-disable @typescript-eslint/no-explicit-any */
// services/serviceGigService.ts

import axios, { AxiosResponse } from "axios"
import { getAuthHeaders } from "./authService"

const API_BASE = "https://nyumba-smart-server.onrender.com/api/provider/gigs"

export interface Location {
  city: string
  state?: string
  country?: string
  [key: string]: any
}

export interface ServiceGig {
  _id?: string
  provider_id: string
  title: string
  slug?: string
  description: string
  price: number
  category: string
  image?: string
  location: Location
  isFeatured?: boolean
  status?: string
  createdAt?: string
  updatedAt?: string
  [key: string]: any
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

interface PagedResponse<T> {
  success: boolean
  data: T[]
  pagination: Pagination
}

interface SingleResponse<T> {
  success: boolean
  data: T
  message?: string
}

interface BasicResponse {
  success: boolean
  message: string
}

const serviceGigService = {
  // Create a new service gig (with optional image upload)
  createGig: async (
    gig: Omit<ServiceGig, "_id" | "slug" | "image">,
    imageFile?: File
  ): Promise<SingleResponse<ServiceGig>> => {
    const formData = new FormData()

    Object.entries(gig).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "location" && typeof value === "object") {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, String(value))
        }
      }
    })

    if (imageFile) {
      formData.append("image", imageFile)
    }

    const headers = {
      ...getAuthHeaders(true),
    }

    const response: AxiosResponse<SingleResponse<ServiceGig>> = await axios.post(
      API_BASE,
      formData,
      { headers }
    )
    return response.data
  },

  // Get all gigs with filters and pagination (city optional)
  getAllGigs: async (params?: {
    category?: string
    status?: string
    city?: string // optional city filter
    minPrice?: number
    maxPrice?: number
    isFeatured?: boolean
    search?: string
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: "asc" | "desc"
  }): Promise<PagedResponse<ServiceGig>> => {
    const response: AxiosResponse<PagedResponse<ServiceGig>> = await axios.get(API_BASE, {
      params,
    })
    return response.data
  },

  // Get gig by id or slug
  getGigById: async (idOrSlug: string): Promise<SingleResponse<ServiceGig>> => {
    const response: AxiosResponse<SingleResponse<ServiceGig>> = await axios.get(
      `${API_BASE}/${idOrSlug}`
    )
    return response.data
  },

  // Get gigs by provider with pagination and optional status filter
  getGigsByProvider: async (
    providerId: string,
    params?: { status?: string; page?: number; limit?: number }
  ): Promise<PagedResponse<ServiceGig>> => {
    const response: AxiosResponse<PagedResponse<ServiceGig>> = await axios.get(
      `${API_BASE}/provider/${providerId}`,
      {
        params,
        headers: getAuthHeaders(true),
      }
    )
    return response.data
  },

  // Update a gig by id (with optional image file)
  updateGig: async (
    id: string,
    gig: Partial<ServiceGig>,
    imageFile?: File
  ): Promise<SingleResponse<ServiceGig>> => {
    const formData = new FormData()

    Object.entries(gig).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "location" && typeof value === "object") {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, String(value))
        }
      }
    })

    if (imageFile) {
      formData.append("image", imageFile)
    }

    const headers = {
      ...getAuthHeaders(true),
      "Content-Type": "multipart/form-data",
    }

    const response: AxiosResponse<SingleResponse<ServiceGig>> = await axios.put(
      `${API_BASE}/${id}`,
      formData,
      { headers }
    )
    return response.data
  },

  // Delete a gig by id
  deleteGig: async (id: string): Promise<BasicResponse> => {
    const response: AxiosResponse<BasicResponse> = await axios.delete(`${API_BASE}/${id}`, {
      headers: getAuthHeaders(true),
    })
    return response.data
  },

  // Update gig status
  updateGigStatus: async (
    id: string,
    status: "active" | "inactive" | "pending-review"
  ): Promise<SingleResponse<ServiceGig>> => {
    const response: AxiosResponse<SingleResponse<ServiceGig>> = await axios.patch(
      `${API_BASE}/${id}/status`,
      { status },
      { headers: getAuthHeaders(true) }
    )
    return response.data
  },

  // Get featured gigs (optional category and limit)
  getFeaturedGigs: async (
    params?: { category?: string; limit?: number }
  ): Promise<SingleResponse<ServiceGig[]>> => {
    const response: AxiosResponse<SingleResponse<ServiceGig[]>> = await axios.get(
      `${API_BASE}/featured`,
      { params }
    )
    return response.data
  },

  // Search gigs with query and filters (city optional)
  searchGigs: async (params: {
    q?: string
    category?: string
    minPrice?: number
    maxPrice?: number
    city?: string // optional city filter
    page?: number
    limit?: number
  }): Promise<PagedResponse<ServiceGig>> => {
    const response: AxiosResponse<PagedResponse<ServiceGig>> = await axios.get(
      `${API_BASE}/search`,
      { params }
    )
    return response.data
  },
}

export default serviceGigService
