/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { RefreshCw, Banknote } from "lucide-react";
import axios from "axios";
import { getAuthHeaders } from "../../../services/authService.js";
const PaymentsAndRevenue = () => {
    const [payments, setPayments] = useState([]);
    const [incomeStats, setIncomeStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const fetchRevenueData = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await axios.get("http://localhost:5000/api/payment/landlord/revenue", {
                headers: getAuthHeaders(),
            });
            setPayments(res.data.payments);
            setIncomeStats(res.data.incomePerProperty);
        }
        catch (err) {
            setError(err.response?.data?.message || "Failed to load revenue data");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchRevenueData();
    }, []);
    return (_jsxs("div", { className: "max-w-screen overflow-x-hidden px-4 sm:px-6 py-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Payments & Revenue" }), _jsxs("button", { onClick: fetchRevenueData, className: "inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700", children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Refresh"] })] }), error && (_jsxs("div", { className: "bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded", children: ["\u26A0\uFE0F ", error] })), loading ? (_jsx("div", { className: "flex justify-center items-center min-h-[12rem]", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" }) })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8", children: incomeStats.map((stat) => (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow p-5 border dark:border-gray-700", children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx(Banknote, { className: "h-5 w-5 text-green-500 mr-2" }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: stat.propertyName })] }), _jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: [stat.city, ", ", stat.area] }), _jsxs("div", { className: "mt-4", children: [_jsxs("p", { className: "text-xl font-bold text-primary-600 dark:text-primary-400", children: ["KES ", stat.totalIncome.toLocaleString()] }), _jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: [stat.countPayments, " payments"] })] })] }, stat.propertyName))) }), _jsxs("div", { className: "w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow", children: [_jsxs("table", { className: "min-w-[700px] w-full divide-y divide-gray-200 dark:divide-gray-700", children: [_jsx("thead", { className: "bg-gray-50 dark:bg-gray-700", children: _jsx("tr", { children: ["Property", "Room", "Method", "Amount", "Status", "Date"].map((header) => (_jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase whitespace-nowrap", children: header }, header))) }) }), _jsx("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: payments.map((payment) => (_jsxs("tr", { children: [_jsx("td", { className: "px-4 py-3 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap", children: payment.property.name }), _jsxs("td", { className: "px-4 py-3 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap", children: [payment.room.room_number, " (", payment.room.type, ")"] }), _jsx("td", { className: "px-4 py-3 text-sm capitalize text-gray-700 dark:text-gray-200 whitespace-nowrap", children: payment.method }), _jsxs("td", { className: "px-4 py-3 text-sm font-semibold text-primary-600 dark:text-primary-400 whitespace-nowrap", children: ["KES ", payment.amount.toLocaleString()] }), _jsx("td", { className: "px-4 py-3 text-sm whitespace-nowrap", children: _jsx("span", { className: `inline-block px-2 py-1 rounded-full text-xs font-medium ${payment.status === "success"
                                                            ? "bg-green-100 text-green-700"
                                                            : payment.status === "pending"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-red-100 text-red-700"}`, children: payment.status }) }), _jsx("td", { className: "px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap", children: new Date(payment.timestamp).toLocaleDateString() })] }, payment._id))) })] }), payments.length === 0 && (_jsx("div", { className: "p-6 text-center text-gray-500 dark:text-gray-400", children: "No payment records found." }))] })] }))] }));
};
export default PaymentsAndRevenue;
