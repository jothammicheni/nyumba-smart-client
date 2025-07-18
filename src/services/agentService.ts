/* eslint-disable @typescript-eslint/no-explicit-any */
// services/walletService.ts
import axios from "axios"
import { getAuthHeaders } from "./authService.js"

const API_BASE_URL = "https://nyumba-smart-server.onrender.com" // Replace with actual API base

interface BonusResponse {
  message: string
  wallet_balance: number
  details: Array<{
    landlordId: string
    status: string
  }>
}

async function triggerAgentRegistrationBonus(): Promise<BonusResponse> {
  try {
    const response = await axios.get<BonusResponse>(
      `${API_BASE_URL}/api/agents/process-registration-bonus`,
      
      { headers: getAuthHeaders() } // config
    )
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "API error")
    } else {
      throw new Error("Network or server error")
    }
  }
}
export default triggerAgentRegistrationBonus