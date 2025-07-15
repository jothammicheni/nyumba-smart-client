/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getAuthHeaders } from "../../authService.js";
const API_BASE_URL = "http://localhost:5000"; // Replace with production URL
export async function initiateMpesaPayment(phone, amount, type) {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/payment/paysubscription`, { phone, amount, type }, { headers: getAuthHeaders() });
        const { message, mpesaResponse, paymentId } = response.data;
        return {
            message,
            customerMessage: mpesaResponse.CustomerMessage,
            checkoutRequestId: mpesaResponse.CheckoutRequestID,
            paymentId
        };
    }
    catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || "Failed to initiate payment");
        }
        else {
            throw new Error("Network or server error");
        }
    }
}
export async function checkMpesaPaymentStatus(checkoutRequestId) {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/payment/status/${checkoutRequestId}`, { headers: getAuthHeaders() });
        return response.data;
    }
    catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || "Failed to check payment status");
        }
        else {
            throw new Error("Network or server error");
        }
    }
}
