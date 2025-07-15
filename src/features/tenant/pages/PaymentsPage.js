/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import axios from "axios";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getAuthHeaders } from "../../../services/authService.js";
import ReceiptModal from "../components/ReceiptModal.js";
const TenantPaymentsPage = () => {
    const [tenantInfo, setTenantInfo] = useState(null);
    const [payments, setPayments] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tenantRes, paymentsRes] = await Promise.all([
                    axios.get("https://nyumba-smart-server.onrender.com/api/tenants/info", {
                        headers: getAuthHeaders(),
                    }),
                    axios.get("http://localhost:5000/api/payment/history", {
                        headers: getAuthHeaders(),
                    }),
                ]);
                setTenantInfo(tenantRes.data);
                setPayments(paymentsRes.data.data);
            }
            catch (err) {
                console.error(err);
                setError("Failed to load your payment information.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (loading)
        return _jsx("div", { className: "text-center p-4", children: "Loading..." });
    if (error)
        return _jsx("div", { className: "text-center p-4 text-red-600", children: error });
    if (!tenantInfo)
        return _jsx("div", { className: "text-center p-4", children: "No tenant info found." });
    return (_jsxs("div", { className: "p-4 max-w-4xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold mb-6 text-primary text-center sm:text-left", children: "My Payments" }), _jsxs("div", { className: "flex items-center justify-between mb-6 flex-col sm:flex-row gap-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [tenantInfo.balance > 0 ? (_jsx(AlertTriangle, { className: "h-8 w-8 text-red-600" })) : (_jsx(CheckCircle, { className: "h-8 w-8 text-green-600" })), _jsxs("div", { children: [_jsx("dt", { className: "text-sm text-gray-500", children: "Current Balance" }), _jsxs("dd", { className: `text-xl font-semibold ${tenantInfo.balance > 0 ? "text-red-600" : "text-green-600"}`, children: ["Ksh ", tenantInfo.balance] })] })] }), tenantInfo.balance > 0 && (_jsx("button", { className: "px-6 py-2 rounded-md bg-green-600 text-white text-lg font-medium hover:bg-green-700 transition w-full sm:w-auto", children: "Lipa Rent na M-Pesa" }))] }), payments.length === 0 ? (_jsx("p", { className: "text-center text-gray-500", children: "No payment history available." })) : (_jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: payments.map((payment) => {
                    const paymentDate = new Date(payment.timestamp).toLocaleDateString();
                    const paymentAmount = payment.paidAmount !== undefined
                        ? `Ksh ${payment.paidAmount.toLocaleString()}`
                        : `Ksh ${payment.amount.toLocaleString()}`;
                    const statusClass = payment.status === "success"
                        ? "text-green-600"
                        : payment.status === "pending"
                            ? "text-yellow-600"
                            : "text-red-600";
                    const displayStatus = payment.status === "success"
                        ? "Paid"
                        : payment.status === "pending"
                            ? "Pending"
                            : "Failed";
                    return (_jsxs("div", { className: "bg-white p-4 rounded-lg shadow-md flex flex-col justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: "Date" }), _jsx("p", { className: "font-semibold mb-2 truncate", children: paymentDate }), _jsx("p", { className: "text-sm text-gray-500", children: "Amount" }), _jsx("p", { className: `font-bold text-lg ${statusClass} truncate`, children: paymentAmount }), _jsx("p", { className: "text-sm text-gray-500 mt-3", children: "Status" }), _jsx("p", { className: `font-semibold ${statusClass} mb-3`, children: displayStatus })] }), _jsx("div", { children: payment.status === "success" ? (_jsx("button", { onClick: () => setSelectedPayment(payment), className: "text-sm text-primary-600 hover:underline w-full text-center py-2 border border-primary-600 rounded-md", children: "View Receipt" })) : (_jsx("button", { onClick: () => alert("Redirecting to M-Pesa…"), className: "text-sm text-blue-600 hover:underline w-full text-center py-2 border border-blue-600 rounded-md", children: "Pay Now" })) })] }, payment._id));
                }) })), selectedPayment && tenantInfo && (_jsx(ReceiptModal, { payment: selectedPayment, tenantInfo: tenantInfo, onClose: () => setSelectedPayment(null) }))] }));
};
export default TenantPaymentsPage;
