/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState } from "react"
import { RefreshCw, Banknote } from "lucide-react"
import axios from "axios"
import { getAuthHeaders } from "../../../services/authService.js"

interface Payment {
  _id: string
  amount: number
  method: string
  status: string
  timestamp: string
  tenant: {
    user_id: string
  }
  room: {
    room_number: string
    type: string
  }
  property: {
    _id: string
    name: string
    city: string
    area: string
  }
}

interface IncomeStat {
  propertyName: string
  city: string
  area: string
  totalIncome: number
  countPayments: number
}

const PaymentsAndRevenue: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([])
  const [incomeStats, setIncomeStats] = useState<IncomeStat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchRevenueData = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await axios.get("http://localhost:5000/api/payment/landlord/revenue", {
        headers: getAuthHeaders(),
      })
      setPayments(res.data.payments)
      setIncomeStats(res.data.incomePerProperty)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load revenue data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRevenueData()
  }, [])

  return (
    <div className="max-w-screen overflow-x-hidden px-4 sm:px-6 py-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payments & Revenue</h1>
        <button
          onClick={fetchRevenueData}
          className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-[12rem]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <>
          {/* Revenue Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {incomeStats.map((stat) => (
              <div
                key={stat.propertyName}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border dark:border-gray-700"
              >
                <div className="flex items-center mb-2">
                  <Banknote className="h-5 w-5 text-green-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {stat.propertyName}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.city}, {stat.area}
                </p>
                <div className="mt-4">
                  <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    KES {stat.totalIncome.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.countPayments} payments</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payments Table */}
          <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow">
            <table className="min-w-[700px] w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {["Property", "Room", "Method", "Amount", "Status", "Date"].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                      {payment.property.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                      {payment.room.room_number} ({payment.room.type})
                    </td>
                    <td className="px-4 py-3 text-sm capitalize text-gray-700 dark:text-gray-200 whitespace-nowrap">
                      {payment.method}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-primary-600 dark:text-primary-400 whitespace-nowrap">
                      KES {payment.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          payment.status === "success"
                            ? "bg-green-100 text-green-700"
                            : payment.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {new Date(payment.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {payments.length === 0 && (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                No payment records found.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default PaymentsAndRevenue
