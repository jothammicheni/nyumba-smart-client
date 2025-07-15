/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from "../../../components/ThemeProvider.js";
import WelcomeInfo from "../components/WelcomeInfo.js";
import RentSummary from "../components/RentSummary.js";
import MaintananceRequests from "../components/MaintenanceRequests.js";
import Announcements from "../components/Announcements.js";
const TenantDashboardPage = () => {
    const { theme, toggleTheme } = useTheme();
    return (_jsx("div", { className: "min-h-screen bg-gray-100 dark:bg-gray-900", children: _jsx("div", { className: " flex flex-col flex-1", children: _jsxs("main", { className: "flex-1 pb-8", children: [_jsx(WelcomeInfo, {}), _jsx("div", { className: "mt-8", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsx(RentSummary, {}), _jsx("div", { className: "grid grid-cols-1 gap-8 lg:grid-cols-1", children: _jsx(MaintananceRequests, {}) }), _jsx(Announcements, {})] }) })] }) }) }));
};
export default TenantDashboardPage;
