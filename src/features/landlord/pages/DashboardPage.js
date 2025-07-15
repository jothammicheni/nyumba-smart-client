/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import PropertyOverview from "../components/dashboardComponents/PropertyOverview.js";
import FinancialOverview from "../components/dashboardComponents/FinancialOverview.js";
import MaintenanceRequests from "../components/dashboardComponents/MaintananceRequests.js";
const LandlordDashboard = () => {
    return (_jsx("div", { className: "min-h-screen bg-gray-100 dark:bg-gray-900", children: _jsx("div", { className: " flex flex-col flex-1", children: _jsxs("main", { className: "flex-1 pb-8", children: [_jsx("div", { className: "shadow rounded-xs", children: _jsx("div", { className: "px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8", children: _jsxs("div", { className: "py-6 md:flex md:items-center md:justify-between", children: [_jsx("div", { className: "flex-1 min-w-0", children: _jsx("h2", { className: "text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate", children: "Landlord Dashboard" }) }), _jsxs("div", { className: "mt-4 flex md:mt-0 md:ml-4", children: [_jsx("button", { type: "button", className: "inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600", children: "Export" }), _jsxs(Link, { to: "properties", className: "ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add Property"] })] })] }) }) }), _jsx("div", { className: "mt-8", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsx(PropertyOverview, {}), _jsx(FinancialOverview, {}), _jsx("div", { className: "mt-8", children: _jsx(MaintenanceRequests, {}) })] }) })] }) }) }));
};
export default LandlordDashboard;
