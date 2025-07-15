import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, Shield, CreditCard, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuthHeaders } from "../../../services/authService.js";
import { Loader } from "../../../components/Loader.js";
const TenantSettings = () => {
    const [tenantInfo, setTenantInfo] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
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
    const handleSave = async () => {
        try {
            await axios.put('http://localhost:5000/api/auth/update-me', {
                name: tenantInfo.tenantName,
                email: tenantInfo.tenentEmail,
                phone: tenantInfo.tenantPhone,
                city: tenantInfo.tenantCity,
            }, { headers: getAuthHeaders() });
            alert("Profile updated successfully!");
        }
        catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };
    if (loading)
        return _jsx("div", { className: "flex justify-center py-10", children: _jsx(Loader, {}) });
    return (_jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden", children: [_jsxs("div", { className: "p-6 border-b border-gray-200 dark:border-primary-600/20", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-800 dark:text-white", children: "Account Settings" }), _jsx("p", { className: "text-gray-600 dark:text-gray-300 mt-1", children: "Manage your tenant account preferences" })] }), _jsxs("div", { className: "flex flex-col md:flex-row", children: [_jsx("div", { className: "w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-primary-600/20", children: _jsx("nav", { className: "space-y-5 p-4", children: ['profile', 'security', 'notifications', 'billing'].map(tab => (_jsxs("button", { onClick: () => setActiveTab(tab), className: `flex items-center px-4 py-3 text-sm font-medium rounded-md w-full text-left 
                  ${activeTab === tab
                                    ? 'bg-primary-50 dark:bg-gray-950/40 text-primary-600 dark:text-primary-600'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary-600/20'}`, children: [tab === 'profile' && _jsx(User, { className: "h-5 w-5 mr-3" }), tab === 'security' && _jsx(Shield, { className: "h-5 w-5 mr-3" }), tab === 'notifications' && _jsx(Bell, { className: "h-5 w-5 mr-3" }), tab === 'billing' && _jsx(CreditCard, { className: "h-5 w-5 mr-3" }), tab.charAt(0).toUpperCase() + tab.slice(1)] }, tab))) }) }), _jsxs("div", { className: "flex-1 p-6", children: [activeTab === 'profile' && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-gray-800 dark:text-white", children: "Profile Information" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Update your personal details" })] }), _jsx("div", { className: "flex flex-col sm:flex-row gap-6", children: _jsxs("div", { className: "flex-1 space-y-5", children: [_jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Full Name" }), _jsx("input", { type: "text", value: tenantInfo.tenantName, onChange: (e) => setTenantInfo({ ...tenantInfo, name: e.target.value }), className: "block w-full rounded-md border border-gray-300 dark:border-gray-900/10 shadow-sm focus:border-primary-500 focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-950/50 p-2" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Email" }), _jsx("input", { type: "email", value: tenantInfo.tenantEmail, onChange: (e) => setTenantInfo({ ...tenantInfo, email: e.target.value }), className: "block w-full rounded-md border border-gray-300 dark:border-gray-900/10 shadow-sm focus:border-primary-500 focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-950/50 p-2" })] })] }), _jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Phone" }), _jsx("input", { type: "tel", value: tenantInfo.tenantPhone, onChange: (e) => setTenantInfo({ ...tenantInfo, phone: e.target.value }), className: "block w-full rounded-md border border-gray-300 dark:border-gray-900/10 shadow-sm focus:border-primary-500 focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-950/50 p-2" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "City" }), _jsx("input", { type: "text", value: tenantInfo.tenantCity, onChange: (e) => setTenantInfo({ ...tenantInfo, city: e.target.value }), className: "block w-full rounded-md border border-gray-300 dark:border-gray-900/10 shadow-sm focus:border-primary-500 focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-950/50 p-2" })] })] }), _jsx("div", { className: "pt-4", children: _jsx("button", { onClick: handleSave, className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: "Save Changes" }) })] }) })] })), activeTab === 'security' && (_jsxs("div", { className: "space-y-6", children: [_jsx("h3", { className: "text-lg font-medium text-gray-800 dark:text-white", children: "Security Settings" }), _jsx("div", { className: "p-4 bg-gray-50 dark:bg-gray-950/40 rounded-lg", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-gray-800 dark:text-white", children: "Password" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Last changed recently" })] }), _jsx("button", { className: "text-sm font-medium text-primary-600 dark:text-primary-600 hover:bg-primary-600/10 p-2 rounded", children: "Change Password" })] }) })] })), activeTab === 'notifications' && (_jsxs("div", { className: "space-y-6", children: [_jsx("h3", { className: "text-lg font-medium text-gray-800 dark:text-white", children: "Notification Preferences" }), _jsxs("div", { className: "space-y-4", children: [['Email Alerts', 'SMS Notifications', 'Push Notifications'].map((label, idx) => (_jsxs("label", { className: "flex items-start gap-3", children: [_jsx("input", { type: "checkbox", defaultChecked: true, className: "h-4 w-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded" }), _jsx("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: label })] }, idx))), _jsx("button", { className: "inline-flex items-center px-4 py-2 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700", children: "Save Preferences" })] })] })), activeTab === 'billing' && (_jsxs("div", { className: "space-y-6", children: [_jsx("h3", { className: "text-lg font-medium text-gray-800 dark:text-white", children: "Billing & Payments" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "You don\u2019t have any billing history yet." }), _jsx("button", { className: "text-sm font-medium text-primary-600 dark:text-primary-600 hover:bg-primary-600/10 p-2 rounded", children: "Add Payment Method" })] }))] })] })] }));
};
export default TenantSettings;
