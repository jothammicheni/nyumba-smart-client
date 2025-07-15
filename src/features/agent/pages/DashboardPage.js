"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import WelcomeInfo from "../components/WelcomeInfo.js";
import Referralcode from "../components/Referralcode.js";
import Referrals from "../components/Referrals.js";
import triggerAgentRegistrationBonus from "../../../services/agentservice.js";
const AgentDashboard = () => {
    const [walletBalance, setWalletBalance] = useState(null);
    useEffect(() => {
        {
            triggerAgentRegistrationBonus()
                .then((response) => {
                console.log("API Response:", response); // Add this line
                setWalletBalance(response.wallet_balance);
            })
                .catch((err) => {
                console.error("Failed to fetch wallet balance:", err);
                setWalletBalance(0);
            });
        }
    });
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
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-primary-600/10 via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60", children: _jsx("div", { className: "flex flex-col flex-1", children: _jsxs("main", { className: "flex-1 pb-8", children: [_jsx(WelcomeInfo, {}), _jsx("div", { className: "mt-8", children: _jsxs("div", { className: "flex flex-col justify-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsx(Referralcode, {}), _jsx(Referrals, {}), _jsx("div", { className: "mt-8 bg-white dark:bg-gray-900 shadow rounded-lg", children: _jsxs("div", { className: "px-4 py-5 sm:p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-white", children: "Your Wallet" }), _jsx("span", { className: "text-2xl font-bold text-green-600 dark:text-white", children: walletBalance !== null ? formatCurrency(walletBalance) : "Loading..." })] }), _jsx("div", { className: "mt-4", children: _jsx("button", { type: "button", className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: "Withdraw to M-Pesa" }) })] }) })] }) })] }) }) }));
};
export default AgentDashboard;
