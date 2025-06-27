// src/api.ts
import axios from "axios";
import { getAuthHeaders } from "../services/authService.js";

const API = axios.create({
  baseURL: "http://localhost:5000/api/subscriptions",
  headers:getAuthHeaders(),
  withCredentials: true,
  
});

export default API;
