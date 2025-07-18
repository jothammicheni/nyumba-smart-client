/* eslint-disable @typescript-eslint/no-explicit-any */
// ✅ services/subscriptionService.ts

import axios from 'axios';
import { getAuthHeaders } from './authService.js';


const API_URL = 'https://nyumba-smart-server.onrender.com/api/subscriptions';

// ✅ Function to create a subscription
export const createSubscription = async (subscriptionData: any) => {
  const response = await axios.post(`${API_URL}/`, subscriptionData, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};

export const getSubscription = async () => {
  const response = await axios.get(`${API_URL}/getsubscription`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};


// ✅ Function to validate subscription status
export const validateSubscription = async () => {
  const response = await axios.get(`${API_URL}/validatestatus`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};