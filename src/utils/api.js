// src/api.ts
import axios from "axios";
import { getAuthHeaders } from "../services/authService.js";
const API = axios.create({
    baseURL: "https://nyumba-smart-server.onrender.com/api/subscriptions",
    headers: getAuthHeaders(),
    withCredentials: true,
});
export default API;
