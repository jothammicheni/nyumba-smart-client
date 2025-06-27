/* eslint-disable @typescript-eslint/no-explicit-any */
// services/listingService.ts
import axios from 'axios';

export const uploadListing = async (formData: FormData) => {
  try {
    const response = await axios.post('/api/listings', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 
               error.message || 
               'Failed to create listing'
    };
  }
};
