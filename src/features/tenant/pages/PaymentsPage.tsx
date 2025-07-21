/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { AlertTriangle, CheckCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getAuthHeaders } from "../../../services/authService.js";
import ReceiptModal from "../components/ReceiptModal.js";

interface PaymentRecord {
  _id: string;
  status: "pending" | "success" | "failed" | "refunded";
  mpesa_code?: string;
  payerPhone?: string;
  paidAmount?: number;
  timestamp: string;
  amount: number;
}

interface TenantInfo {
  balance: number;
  tenantName: string;
  propertyName: string;
  roomNumber: string;
}

const TenantPaymentsPage: React.FC = () => {
  const [tenantInfo, setTenantInfo] = useState<TenantInfo | null>(null);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tenantRes, paymentsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/tenants/info", {
            headers: getAuthHeaders(),
          }),
          axios.get("https://nyumba-smart-server.onrender.com/api/payment/history", {
            headers: getAuthHeaders(),
          }),
        ]);
        setTenantInfo(tenantRes.data);
        setPayments(paymentsRes.data.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load your payment information.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;
  if (!tenantInfo) return <div className="text-center p-4">No tenant info found.</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary text-center sm:text-left">
        My Payments
      </h1>

      <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-3">
          {tenantInfo.balance > 0 ? (
            <AlertTriangle className="h-8 w-8 text-red-600" />
          ) : (
            <CheckCircle className="h-8 w-8 text-green-600" />
          )}
          <div>
            <dt className="text-sm text-gray-500">Current Balance</dt>
            <dd
              className={`text-xl font-semibold ${
                tenantInfo.balance > 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              Ksh {tenantInfo.balance}
            </dd>
          </div>
        </div>

        {tenantInfo.balance > 0 && (
          <button className="px-6 py-2 rounded-md bg-green-600 text-white text-lg font-medium hover:bg-green-700 transition w-full sm:w-auto">
            Lipa Rent na M-Pesa
          </button>
        )}
      </div>

      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payment history available.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {payments.map((payment) => {
            const paymentDate = new Date(payment.timestamp).toLocaleDateString();
            const paymentAmount =
              payment.paidAmount !== undefined
                ? `Ksh ${payment.paidAmount.toLocaleString()}`
                : `Ksh ${payment.amount.toLocaleString()}`;

            const statusClass =
              payment.status === "success"
                ? "text-green-600"
                : payment.status === "pending"
                ? "text-yellow-600"
                : "text-red-600";

            const displayStatus =
              payment.status === "success"
                ? "Paid"
                : payment.status === "pending"
                ? "Pending"
                : "Failed";

            return (
              <div
                key={payment._id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between"
              >
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold mb-2 truncate">{paymentDate}</p>

                  <p className="text-sm text-gray-500">Amount</p>
                  <p className={`font-bold text-lg ${statusClass} truncate`}>
                    {paymentAmount}
                  </p>

                  <p className="text-sm text-gray-500 mt-3">Status</p>
                  <p className={`font-semibold ${statusClass} mb-3`}>{displayStatus}</p>
                </div>

                <div>
                  {payment.status === "success" ? (
                    <button
                      onClick={() => setSelectedPayment(payment)}
                      className="text-sm text-primary-600 hover:underline w-full text-center py-2 border border-primary-600 rounded-md"
                    >
                      View Receipt
                    </button>
                  ) : (
                    <button
                      onClick={() => alert("Redirecting to M-Pesa…")}
                      className="text-sm text-blue-600 hover:underline w-full text-center py-2 border border-blue-600 rounded-md"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedPayment && tenantInfo && (
        <ReceiptModal
          payment={selectedPayment}
          tenantInfo={tenantInfo}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </div>
  );
};

export default TenantPaymentsPage;