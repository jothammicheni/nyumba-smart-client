"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Home, Users, Building, CreditCard, Bell, Search, Menu, X, LogOut, DollarSign, Wrench, UserCog, Shield, BarChart, Activity, Settings2, FileText, HelpCircle, } from "lucide-react";
import { useTheme } from "../../../components/ThemeProvider.js";
import { useAuth } from "../../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
// Dummy data for the admin panel
const systemStats = {
    totalUsers: 156,
    totalLandlords: 24,
    totalTenants: 112,
    totalAgents: 15,
    totalServiceProviders: 5,
    totalProperties: 48,
    totalUnits: 187,
    occupiedUnits: 163,
    vacantUnits: 24,
    maintenanceRequests: 17,
};
const financialStats = {
    totalRevenue: 3750000,
    platformFees: 375000,
    pendingPayments: 450000,
    totalTransactions: 324,
    averagePropertyValue: 4500000,
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userGrowth = [
    { month: "Jan", users: 85 },
    { month: "Feb", users: 94 },
    { month: "Mar", users: 105 },
    { month: "Apr", users: 112 },
    { month: "May", users: 126 },
    { month: "Jun", users: 137 },
    { month: "Jul", users: 145 },
    { month: "Aug", users: 156 },
];
const recentActivities = [
    {
        id: 1,
        type: "user_registration",
        user: "John Doe",
        role: "Landlord",
        date: "2023-05-18",
        time: "14:32:45",
    },
    {
        id: 2,
        type: "property_added",
        user: "Sarah Smith",
        propertyName: "Sunset Apartments",
        units: 12,
        date: "2023-05-17",
        time: "10:15:22",
    },
    {
        id: 3,
        type: "payment",
        tenant: "Michael Johnson",
        landlord: "Robert Wilson",
        amount: 35000,
        date: "2023-05-16",
        time: "09:45:11",
    },
    {
        id: 4,
        type: "maintenance",
        tenant: "Emily Brown",
        issue: "Water leakage",
        property: "Green Heights, Unit 4B",
        date: "2023-05-15",
        time: "16:22:37",
    },
    {
        id: 5,
        type: "service_provider_added",
        name: "Quick Fix Plumbing",
        service: "Plumbing",
        date: "2023-05-14",
        time: "11:05:19",
    },
];
const pendingApprovals = [
    {
        id: 1,
        type: "landlord_verification",
        name: "Alice Johnson",
        email: "alice@example.com",
        documents: 3,
        date: "2023-05-19",
    },
    {
        id: 2,
        type: "property_verification",
        name: "Sunrise Apartments",
        owner: "David Wilson",
        documents: 5,
        date: "2023-05-18",
    },
    {
        id: 3,
        type: "service_provider_verification",
        name: "Elite Electricians",
        service: "Electrical",
        documents: 4,
        date: "2023-05-17",
    },
    {
        id: 4,
        type: "agent_verification",
        name: "Mark Thompson",
        email: "mark@example.com",
        documents: 3,
        date: "2023-05-16",
    },
];
const AdminDashboard = () => {
    const { theme, toggleTheme } = useTheme();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
            minimumFractionDigits: 0,
        }).format(amount);
    };
    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-100 dark:bg-gray-900", children: [_jsxs("div", { className: `fixed inset-0 z-40 lg:hidden ${sidebarOpen ? "block" : "hidden"}`, children: [_jsx("div", { className: "fixed inset-0 bg-gray-600 bg-opacity-75", onClick: () => setSidebarOpen(false) }), _jsxs("div", { className: "fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700", children: [_jsxs("div", { className: "flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "text-xl font-bold text-primary-600 dark:text-primary-500", children: "NyumbaSmart" }), _jsx("span", { className: "ml-2 px-2 py-0.5 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs font-medium rounded", children: "ADMIN" })] }), _jsx("button", { className: "text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300", onClick: () => setSidebarOpen(false), children: _jsx(X, { className: "w-6 h-6" }) })] }), _jsx("div", { className: "flex-1 overflow-y-auto", children: _jsxs("nav", { className: "px-2 py-4 space-y-1", children: [_jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-md", children: [_jsx(BarChart, { className: "w-5 h-5 mr-3" }), "Dashboard"] }), _jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: [_jsx(Users, { className: "w-5 h-5 mr-3" }), "User Management"] }), _jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: [_jsx(Building, { className: "w-5 h-5 mr-3" }), "Properties"] }), _jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: [_jsx(CreditCard, { className: "w-5 h-5 mr-3" }), "Payments"] }), _jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: [_jsx(Wrench, { className: "w-5 h-5 mr-3" }), "Service Providers"] }), _jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: [_jsx(Shield, { className: "w-5 h-5 mr-3" }), "Verifications"] }), _jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: [_jsx(Activity, { className: "w-5 h-5 mr-3" }), "Activity Logs"] }), _jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: [_jsx(FileText, { className: "w-5 h-5 mr-3" }), "Reports"] }), _jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: [_jsx(Settings2, { className: "w-5 h-5 mr-3" }), "System Settings"] }), _jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: [_jsx(HelpCircle, { className: "w-5 h-5 mr-3" }), "Help & Support"] })] }) }), _jsx("div", { className: "p-4 border-t border-gray-200 dark:border-gray-700", children: _jsxs("button", { onClick: handleLogout, className: "flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500", children: [_jsx(LogOut, { className: "w-5 h-5 mr-3" }), "Sign out"] }) })] })] }), _jsx("div", { className: "hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col", children: _jsxs("div", { className: "flex flex-col flex-1 min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700", children: [_jsxs("div", { className: "flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700", children: [_jsx("span", { className: "text-xl font-bold text-primary-600 dark:text-primary-500", children: "NyumbaSmart" }), _jsx("span", { className: "ml-2 px-2 py-0.5 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs font-medium rounded", children: "ADMIN" })] }), _jsx("div", { className: "flex flex-col flex-1 overflow-y-auto", children: _jsxs("nav", { className: "flex-1 px-2 py-4 space-y-1", children: [_jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-md", children: [_jsx(BarChart, { className: "w-5 h-5 mr-3" }), "Dashboard"] }), _jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: [_jsx(Users, { className: "w-5 h-5 mr-3" }), "User Management"] }), _jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: [_jsx(Building, { className: "w-5 h-5 mr-3" }), "Properties"] }), _jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: [_jsx(CreditCard, { className: "w-5 h-5 mr-3" }), "Payments"] }), _jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: [_jsx(Wrench, { className: "w-5 h-5 mr-3" }), "Service Providers"] }), _jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: [_jsx(Shield, { className: "w-5 h-5 mr-3" }), "Verifications"] }), _jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: [_jsx(Activity, { className: "w-5 h-5 mr-3" }), "Activity Logs"] }), _jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: [_jsx(FileText, { className: "w-5 h-5 mr-3" }), "Reports"] }), _jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: [_jsx(Settings2, { className: "w-5 h-5 mr-3" }), "System Settings"] }), _jsxs("a", { href: "#", className: "flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: [_jsx(HelpCircle, { className: "w-5 h-5 mr-3" }), "Help & Support"] })] }) }), _jsx("div", { className: "p-4 border-t border-gray-200 dark:border-gray-700", children: _jsxs("button", { onClick: handleLogout, className: "flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500", children: [_jsx(LogOut, { className: "w-5 h-5 mr-3" }), "Sign out"] }) })] }) }), _jsxs("div", { className: "lg:pl-64 flex flex-col flex-1", children: [_jsxs("div", { className: "sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white dark:bg-gray-800 shadow", children: [_jsx("button", { type: "button", className: "px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 lg:hidden", onClick: () => setSidebarOpen(true), children: _jsx(Menu, { className: "h-6 w-6" }) }), _jsxs("div", { className: "flex-1 flex justify-between px-4", children: [_jsx("div", { className: "flex-1 flex items-center", children: _jsxs("div", { className: "max-w-lg w-full lg:max-w-xs relative", children: [_jsx("label", { htmlFor: "search", className: "sr-only", children: "Search" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Search, { className: "h-5 w-5 text-gray-400" }) }), _jsx("input", { id: "search", name: "search", className: "block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm", placeholder: "Search users, properties...", type: "search" })] })] }) }), _jsxs("div", { className: "ml-4 flex items-center md:ml-6", children: [_jsxs("button", { type: "button", className: "p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", onClick: toggleTheme, children: [theme === "dark" ? (_jsx("span", { className: "sr-only", children: "Switch to light mode" })) : (_jsx("span", { className: "sr-only", children: "Switch to dark mode" })), theme === "dark" ? (_jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }) })) : (_jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" }) }))] }), _jsx("div", { className: "ml-3 relative", children: _jsxs("button", { type: "button", className: "p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: [_jsx("span", { className: "sr-only", children: "View notifications" }), _jsx(Bell, { className: "h-6 w-6" }), _jsx("span", { className: "absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800" })] }) }), _jsx("div", { className: "ml-3 relative", children: _jsx("div", { children: _jsxs("button", { type: "button", className: "max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: [_jsx("span", { className: "sr-only", children: "Open user menu" }), _jsx("img", { className: "h-8 w-8 rounded-full", src: "https://randomuser.me/api/portraits/men/10.jpg", alt: "Admin profile" })] }) }) })] })] })] }), _jsxs("main", { className: "flex-1 pb-8", children: [_jsx("div", { className: "bg-white dark:bg-gray-800 shadow", children: _jsx("div", { className: "px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8", children: _jsxs("div", { className: "py-6 md:flex md:items-center md:justify-between", children: [_jsx("div", { className: "flex-1 min-w-0", children: _jsx("h2", { className: "text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate", children: "Admin Dashboard" }) }), _jsxs("div", { className: "mt-4 flex md:mt-0 md:ml-4", children: [_jsx("button", { type: "button", className: "inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600", children: "Export Reports" }), _jsx("button", { type: "button", className: "ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: "System Settings" })] })] }) }) }), _jsx("div", { className: "mt-8", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4", children: "System Overview" }), _jsxs("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4", children: [_jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(Users, { className: "h-6 w-6 text-gray-400" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Total Users" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-gray-900 dark:text-white", children: systemStats.totalUsers }) })] }) })] }) }) }), _jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(Building, { className: "h-6 w-6 text-gray-400" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Total Properties" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-gray-900 dark:text-white", children: systemStats.totalProperties }) })] }) })] }) }) }), _jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(Home, { className: "h-6 w-6 text-gray-400" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Occupancy Rate" }), _jsx("dd", { children: _jsxs("div", { className: "text-lg font-medium text-gray-900 dark:text-white", children: [Math.round((systemStats.occupiedUnits / systemStats.totalUnits) * 100), "%"] }) })] }) })] }) }) }), _jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(DollarSign, { className: "h-6 w-6 text-gray-400" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Total Revenue" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-gray-900 dark:text-white", children: formatCurrency(financialStats.totalRevenue) }) })] }) })] }) }) })] }), _jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-white mt-8 mb-4", children: "User Breakdown" }), _jsxs("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4", children: [_jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(UserCog, { className: "h-6 w-6 text-gray-400" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Landlords" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-gray-900 dark:text-white", children: systemStats.totalLandlords }) })] }) })] }) }) }), _jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(Users, { className: "h-6 w-6 text-gray-400" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Tenants" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-gray-900 dark:text-white", children: systemStats.totalTenants }) })] }) })] }) }) }), _jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(Users, { className: "h-6 w-6 text-gray-400" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Agents" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-gray-900 dark:text-white", children: systemStats.totalAgents }) })] }) })] }) }) }), _jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(Wrench, { className: "h-6 w-6 text-gray-400" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Service Providers" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-gray-900 dark:text-white", children: systemStats.totalServiceProviders }) })] }) })] }) }) })] }), _jsxs("div", { className: "mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2", children: [_jsxs("div", { className: "bg-white dark:bg-gray-800 shadow rounded-lg", children: [_jsx("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700", children: _jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-white", children: "System Activity" }) }), _jsxs("div", { className: "px-4 py-5 sm:p-6", children: [_jsx("div", { className: "flow-root", children: _jsx("ul", { className: "-my-5 divide-y divide-gray-200 dark:divide-gray-700", children: recentActivities.map((activity) => (_jsx("li", { className: "py-4", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "flex-shrink-0", children: activity.type === "user_registration" ? (_jsx("div", { className: "h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center", children: _jsx(UserCog, { className: "h-5 w-5 text-blue-600 dark:text-blue-400" }) })) : activity.type === "property_added" ? (_jsx("div", { className: "h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center", children: _jsx(Building, { className: "h-5 w-5 text-green-600 dark:text-green-400" }) })) : activity.type === "payment" ? (_jsx("div", { className: "h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center", children: _jsx(CreditCard, { className: "h-5 w-5 text-purple-600 dark:text-purple-400" }) })) : activity.type === "maintenance" ? (_jsx("div", { className: "h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center", children: _jsx(Wrench, { className: "h-5 w-5 text-yellow-600 dark:text-yellow-400" }) })) : (_jsx("div", { className: "h-8 w-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center", children: _jsx(Wrench, { className: "h-5 w-5 text-red-600 dark:text-red-400" }) })) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white truncate", children: activity.type === "user_registration"
                                                                                                    ? `New ${activity.role}: ${activity.user}`
                                                                                                    : activity.type === "property_added"
                                                                                                        ? `New Property: ${activity.propertyName} (${activity.units} units)`
                                                                                                        : activity.type === "payment"
                                                                                                            ? `Payment: ${activity.tenant} to ${activity.landlord}`
                                                                                                            : activity.type === "maintenance"
                                                                                                                ? `Maintenance: ${activity.issue} at ${activity.property}`
                                                                                                                : `New Service Provider: ${activity.name} (${activity.service})` }), _jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400 truncate", children: [activity.date, " at ", activity.time] })] })] }) }, activity.id))) }) }), _jsx("div", { className: "mt-6", children: _jsx("a", { href: "#", className: "w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600", children: "View all activity" }) })] })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 shadow rounded-lg", children: [_jsx("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700", children: _jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-white", children: "Pending Approvals" }) }), _jsxs("div", { className: "px-4 py-5 sm:p-6", children: [_jsx("div", { className: "flow-root", children: _jsx("ul", { className: "-my-5 divide-y divide-gray-200 dark:divide-gray-700", children: pendingApprovals.map((approval) => (_jsx("li", { className: "py-4", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "flex-shrink-0", children: approval.type === "landlord_verification" ? (_jsx("div", { className: "h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center", children: _jsx(UserCog, { className: "h-5 w-5 text-blue-600 dark:text-blue-400" }) })) : approval.type === "property_verification" ? (_jsx("div", { className: "h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center", children: _jsx(Building, { className: "h-5 w-5 text-green-600 dark:text-green-400" }) })) : approval.type === "service_provider_verification" ? (_jsx("div", { className: "h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center", children: _jsx(Wrench, { className: "h-5 w-5 text-yellow-600 dark:text-yellow-400" }) })) : (_jsx("div", { className: "h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center", children: _jsx(Users, { className: "h-5 w-5 text-purple-600 dark:text-purple-400" }) })) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white truncate", children: approval.type === "landlord_verification"
                                                                                                    ? `Landlord: ${approval.name}`
                                                                                                    : approval.type === "property_verification"
                                                                                                        ? `Property: ${approval.name} (Owner: ${approval.owner})`
                                                                                                        : approval.type === "service_provider_verification"
                                                                                                            ? `Service Provider: ${approval.name} (${approval.service})`
                                                                                                            : `Agent: ${approval.name}` }), _jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400 truncate", children: [approval.documents, " documents \u2022 Submitted on ", approval.date] })] }), _jsx("div", { children: _jsx("button", { className: "inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: "Review" }) })] }) }, approval.id))) }) }), _jsx("div", { className: "mt-6", children: _jsx("a", { href: "#", className: "w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600", children: "View all approvals" }) })] })] })] })] }) })] })] })] }));
};
export default AdminDashboard;
