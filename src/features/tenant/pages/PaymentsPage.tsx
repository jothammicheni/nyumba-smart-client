/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { AlertTriangle, CheckCircle } from "lucide-react"
import React, { useEffect, useState } from "react"
import { getAuthHeaders } from "../../../services/authService.js"
import { Loader } from "../../../components/Loader.js"

interface Payment {
  id: number
  date: string
  amount: string
  status: "Paid" | "Pending"
}

const TenantPaymentsPage: React.FC = () => {
  const [tenantInfo, setTenantInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const payments: Payment[] = [
    { id: 1, date: "2024-07-01", amount: "KSh 35,000", status: "Paid" },
    { id: 2, date: "2024-08-01", amount: "KSh 35,000", status: "Pending" },
    { id: 3, date: "2024-08-01", amount: "KSh 95,000", status: "Paid" },
  ]

  const handleViewReceipt = (id: number) => {
    alert(`Viewing receipt for payment ID: ${id}`)
  }

  const handleMakePayment = (id: number) => {
    alert(`Redirecting to payment portal for payment ID: ${id}`)
  }

  useEffect(() => {
    const fetchTenantInfo = async () => {
      try {
        const response = await axios.get(
          "https://nyumba-smart-server.onrender.com/api/tenants/info",
          { headers: getAuthHeaders() }
        )
        setTenantInfo(response.data)
      } catch (error) {
        console.error("Error fetching tenant info:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTenantInfo()
  }, [])

  if (loading) return <div><Loader /></div>

  if (!tenantInfo)
    return (
      <div className="text-center p-4 text-gray-500">
        No tenant information available.
      </div>
    )

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Payments</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track your payment status and balance</p>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-950/40 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3">
          <div className="flex-shrink-0">
            {tenantInfo.balance > 0 ? (
              <AlertTriangle className="h-6 w-6 text-red-500" />
            ) : (
              <CheckCircle className="h-6 w-6 text-green-500" />
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Current Balance</p>
            <p className={`text-lg font-semibold ${tenantInfo.balance > 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
              KSh {tenantInfo.balance}
            </p>
          </div>
        </div>

        {tenantInfo.balance > 0 && (
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Pay Rent via M-Pesa
          </button>
        )}
      </div>

      {/* Payments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm rounded-xl p-5 space-y-3"
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
              <p className="font-medium text-gray-800 dark:text-white">{payment.date}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
              <p className="font-semibold text-lg text-gray-900 dark:text-white">{payment.amount}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
              <p className={`font-medium ${payment.status === "Paid" ? "text-green-600" : "text-yellow-600"}`}>
                {payment.status}
              </p>
            </div>

            <div>
              {payment.status === "Paid" ? (
                <button
                  onClick={() => handleViewReceipt(payment.id)}
                  className="text-sm text-primary-600 hover:underline"
                >
                  View Receipt
                </button>
              ) : (
                <button
                  onClick={() => handleMakePayment(payment.id)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TenantPaymentsPage
