/* eslint-disable @typescript-eslint/no-explicit-any */
// services/walletService.ts
import axios from "axios";
import { getAuthHeaders } from "./authService.js";
const API_BASE_URL = "http://localhost:5000"; // Replace with actual API base
async function triggerAgentRegistrationBonus() {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/agents/process-registration-bonus`, { headers: getAuthHeaders() } // config
        );
        return response.data;
    }
    catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || "API error");
        }
        else {
            throw new Error("Network or server error");
        }
    }
}
export default triggerAgentRegistrationBonus;
