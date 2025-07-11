/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { getAuthHeaders } from "../../authService.js"

const API_BASE_URL = "http://localhost:5000" // Replace with production URL

interface MpesaResponse {
  MerchantRequestID: string
  CheckoutRequestID: string
  ResponseCode: string
  ResponseDescription: string
  CustomerMessage: string
}

interface InitiatePaymentResponse {
  message: string
  mpesaResponse: MpesaResponse
  paymentId: string
}

interface CleanedPaymentResponse {
  message: string
  customerMessage: string
  checkoutRequestId: string
  paymentId: string
}

interface PaymentStatusResponse {
  status: string
  mpesa_code?: string
  checkoutRequestId: string
  payerPhone?: string
  paidAmount?: number
  createdAt: string
}

export async function initiateMpesaPayment(
  phone: string,
  amount: number,
  type: "subscription" | "rent" | "withdrawal"
): Promise<CleanedPaymentResponse> {
  try {
    const response = await axios.post<InitiatePaymentResponse>(
      `${API_BASE_URL}/api/payment/paysubscription`,
      { phone, amount, type },
      { headers: getAuthHeaders() }
    )

    const { message, mpesaResponse, paymentId } = response.data

    return {
      message,
      customerMessage: mpesaResponse.CustomerMessage,
      checkoutRequestId: mpesaResponse.CheckoutRequestID,
      paymentId
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "Failed to initiate payment")
    } else {
      throw new Error("Network or server error")
    }
  }
}

export async function checkMpesaPaymentStatus(
  checkoutRequestId: string
): Promise<PaymentStatusResponse> {
  try {
    const response = await axios.get<PaymentStatusResponse>(
      `${API_BASE_URL}/api/payment/status/${checkoutRequestId}`,
      { headers: getAuthHeaders() }
    )
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "Failed to check payment status")
    } else {
      throw new Error("Network or server error")
    }
  }
}