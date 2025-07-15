import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertTriangle, Calendar, CheckCircle, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAuthHeaders } from "../../../services/authService.js";
import axios from 'axios';
import { Loader } from '../../../components/Loader.js';
const RentSummary = () => {
    // Format currency
    const [tenantInfo, setTenantInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchTenantInfo = async () => {
            try {
                const response = await axios.get("https://nyumba-smart-server.onrender.com/api/tenants/info", {
                    headers: getAuthHeaders(),
                });
                setTenantInfo(response.data);
            }
            catch (error) {
                console.error("Error fetching tenant info:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchTenantInfo();
    }, []);
    if (loading)
        return _jsx(Loader, {});
    if (!tenantInfo)
        return _jsx("div", { className: "text-center p-4", children: "No tenant information available." });
    console.log(tenantInfo);
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
            minimumFractionDigits: 0,
        }).format(amount);
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };
    // Calculate next payment date
    const getNextPaymentDate = () => {
        const today = new Date();
        let nextPaymentDate = new Date(today.getFullYear(), today.getMonth(), tenantInfo.dueDate);
        if (today.getDate() > tenantInfo.dueDate) {
            nextPaymentDate = new Date(today.getFullYear(), today.getMonth() + 1, tenantInfo.dueDate);
        }
        return formatDate(nextPaymentDate.toISOString());
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "bg-white dark:bg-gray-900 shadow rounded-lg mb-10", children: [_jsx("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-600/20", children: _jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-white", children: "Rent Summary" }) }), _jsxs("div", { className: "px-4 py-5 sm:p-6", children: [_jsxs("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-3", children: [_jsx("div", { className: "bg-gray-50 dark:bg-gray-950/50 overflow-hidden shadow-sm rounded-lg p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-1", children: _jsx(DollarSign, { className: "w-6 h-6 text-primary-600 dark:text-primary-600" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Monthly Rent" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-gray-900 dark:text-white", children: formatCurrency(tenantInfo.rentAmount) }) })] }) })] }) }), _jsx("div", { className: "bg-gray-50 dark:bg-gray-950/50 overflow-hidden shadow-sm rounded-lg p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-1", children: _jsx(Calendar, { className: "w-6 h-6 text-primary-600 dark:text-primary-600" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Next Payment Due" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-gray-900 dark:text-white", children: getNextPaymentDate() }) })] }) })] }) }), _jsx("div", { className: "bg-gray-50 dark:bg-gray-950/50 overflow-hidden shadow-sm rounded-lg p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-1", children: tenantInfo.balance > 0 ? (_jsx(AlertTriangle, { className: "w-6 h-6 text-primary-600 dark:text-primary-600" })) : (_jsx(CheckCircle, { className: "w-6 h-6 text-primary-600 dark:text-primary-600" })) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Current Balance" }), _jsx("dd", { children: _jsxs("div", { className: `text-lg font-medium ${tenantInfo.balance > 0
                                                                    ? "text-red-600 dark:text-red-400"
                                                                    : "text-green-600 dark:text-green-400"}`, children: ["ksh ", tenantInfo.balance] }) })] }) })] }) })] }), _jsx("div", { className: "mt-6", children: _jsx("div", { className: "bg-gray-50 dark:bg-gray-950/50 overflow-hidden shadow-sm rounded-lg", children: _jsxs("div", { className: "px-4 py-5 sm:p-6", children: [_jsx("h4", { className: "text-base font-medium text-gray-900 dark:text-white capitalize mb-3", children: "Lease Information" }), _jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Lease Start Date" }), _jsx("p", { className: "mt-1 w-1/4 text-sm font-medium italic text-gray-600 dark:text-white", children: formatDate(tenantInfo.leaseStart) })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Lease End Date" }), _jsx("p", { className: "mt-1 text-sm font-medium italic text-gray-600 dark:text-white", children: formatDate(tenantInfo.leaseEnd) })] })] })] }) }) })] })] }) }));
};
export default RentSummary;
