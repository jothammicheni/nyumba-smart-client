import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useAuth } from "../../../../context/AuthContext.js";
import { Link, useNavigate } from "react-router-dom";
import { Building, CreditCard, Home, LogOut, Settings, Users } from 'lucide-react';
const DesktopSidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };
    const handleNavClick = () => {
        setSidebarOpen(false);
    };
    function isActive(path) {
        return location.pathname === path
            ? "bg-primary-600 text-white"
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700";
    }
    return (_jsx(_Fragment, { children: _jsx("div", { className: "hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col", children: _jsxs("div", { className: "flex flex-col flex-1 min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700", children: [_jsx("div", { className: "flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700", children: _jsx("span", { className: "text-xl font-bold text-primary-600 dark:text-primary-500", children: "NyumbaSmart" }) }), _jsx("div", { className: "flex-1 overflow-y-auto", children: _jsxs("nav", { className: "px-2 py-4 space-y-1", children: [_jsxs(Link, { to: "", className: `flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/dashboard")}`, children: [_jsx(Home, { className: "w-5 h-5 mr-3" }), " Dashboard"] }), _jsxs(Link, { to: "properties", className: `flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/properties")}`, children: [_jsx(Building, { className: "w-5 h-5 mr-3" }), " Properties"] }), _jsxs(Link, { to: "tenants", className: `flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/tenants")}`, children: [_jsx(Users, { className: "w-5 h-5 mr-3" }), " Tenants"] }), _jsxs(Link, { to: "payments", className: `flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/payments")}`, children: [_jsx(CreditCard, { className: "w-5 h-5 mr-3" }), " Payments"] }), _jsxs(Link, { to: "payments", className: `flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/payments")}`, children: [_jsx(CreditCard, { className: "w-5 h-5 mr-3" }), " Mentainance Requests"] }), _jsxs(Link, { to: "payments", className: `flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/payments")}`, children: [_jsx(CreditCard, { className: "w-5 h-5 mr-3" }), " Subscriptions"] }), _jsxs(Link, { to: "settings", className: `flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/settings")}`, children: [_jsx(Settings, { className: "w-5 h-5 mr-3" }), " Settings"] })] }) }), _jsx("div", { className: "p-4 border-t border-gray-200 dark:border-gray-700", children: _jsxs("button", { onClick: handleLogout, className: "flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500", children: [_jsx(LogOut, { className: "w-5 h-5 mr-3" }), " Sign out"] }) })] }) }) }));
};
export default DesktopSidebar;
