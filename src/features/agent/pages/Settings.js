import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { User, Shield, CreditCard, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { getAuthHeaders } from "../../../services/authService.js";
import axios from "axios";
export const AgentSettings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [agentInfo, setAgentInfo] = useState({
        agentProfile: {
            name: '',
            email: '',
            phone: '',
            city: '',
            referralCode: ''
        },
    });
    useEffect(() => {
        const fetchAgentInfo = async () => {
            try {
                console.log("Auth headers:", getAuthHeaders());
                const response = await axios.get("http://localhost:5000/api/agents/info", {
                    headers: getAuthHeaders(),
                });
                setAgentInfo(response.data.data);
            }
            catch (error) {
                console.error("Error fetching agent info:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchAgentInfo();
    }, []);
    const handleSave = async () => {
        try {
            await axios.put('http://localhost:5000/api/auth/update-me', {
                name: agentInfo.agentProfile.name,
                email: agentInfo.agentProfile.email,
                phone: agentInfo.agentProfile.phone,
                city: agentInfo.agentProfile.city,
            }, { headers: getAuthHeaders() });
            alert("Profile updated successfully!");
        }
        catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };
    const agentData = {
        profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    };
    if (loading) {
        return _jsx("p", { className: "flex justify-center items-center", children: "Loading..." });
    }
    return (_jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden", children: [_jsxs("div", { className: "p-6 border-b border-gray-200 dark:border-primary-600/20", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-800 dark:text-white", children: "Account Settings" }), _jsx("p", { className: "text-gray-600 dark:text-gray-300 mt-1", children: "Manage your agent account preferences" })] }), _jsxs("div", { className: "flex flex-col md:flex-row", children: [_jsx("div", { className: "w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-primary-600/20", children: _jsxs("nav", { className: "space-y-5 p-4", children: [_jsxs("button", { onClick: () => setActiveTab('profile'), className: `flex items-center px-4 py-3 text-sm font-medium rounded-md w-full text-left 
              ${activeTab === 'profile' ? 'bg-primary-50 dark:bg-gray-950/40 text-primary-600 dark:text-primary-600'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary-600/20'}`, children: [_jsx(User, { className: "h-5 w-5 mr-3" }), "Profile"] }), _jsxs("button", { onClick: () => setActiveTab('security'), className: `flex items-center px-4 py-3 text-sm font-medium rounded-md w-full text-left 
              ${activeTab === 'security' ? 'bg-primary-50 dark:bg-gray-950/40 text-primary-600 dark:text-primary-600'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary-600/20'}`, children: [_jsx(Shield, { className: "h-5 w-5 mr-3" }), "Security"] }), _jsxs("button", { onClick: () => setActiveTab('notifications'), className: `flex items-center px-4 py-3 text-sm font-medium rounded-md w-full text-left 
                ${activeTab === 'notifications' ? 'bg-primary-50 dark:bg-gray-950/40 text-primary-600 dark:text-primary-600'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary-600/20'}`, children: [_jsx(Bell, { className: "h-5 w-5 mr-3" }), "Notifications"] }), _jsxs("button", { onClick: () => setActiveTab('billing'), className: `flex items-center px-4 py-3 text-sm font-medium rounded-md w-full text-left 
                ${activeTab === 'billing' ? 'bg-primary-50 dark:bg-gray-950/40 text-primary-600 dark:text-primary-600'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary-600/20'}`, children: [_jsx(CreditCard, { className: "h-5 w-5 mr-3" }), "Billing & Payments"] })] }) }), _jsxs("div", { className: "flex-1 p-6", children: [activeTab === 'profile' && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-gray-800 dark:text-white", children: "Profile Information" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Update your personal details" })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-6", children: [_jsxs("div", { className: "flex-shrink-0", children: [_jsx("img", { className: "h-24 w-24 rounded-full object-cover", src: agentData.profileImage, alt: "Profile" }), _jsx("button", { className: "mt-3 w-full text-sm p-2 rounded font-medium text-primary-600 dark:text-primary-600 hover:text-primary-600 dark:hover:bg-primary-600/10", children: "Change photo" })] }), _jsxs("div", { className: "flex-1 space-y-5", children: [_jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Full Name" }), _jsx("input", { type: "text", id: "name", value: agentInfo.agentProfile.name, onChange: (e) => setAgentInfo({
                                                                            ...agentInfo,
                                                                            agentProfile: {
                                                                                ...agentInfo.agentProfile,
                                                                                name: e.target.value
                                                                            }
                                                                        }), className: "block w-full rounded-md border border-gray-300 dark:border-gray-900/10 shadow-sm focus:border-primary-500 focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-950/50 p-2" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Email" }), _jsx("input", { type: "email", id: "email", value: agentInfo.agentProfile.email, onChange: (e) => setAgentInfo({
                                                                            ...agentInfo,
                                                                            agentProfile: {
                                                                                ...agentInfo.agentProfile,
                                                                                email: e.target.value
                                                                            }
                                                                        }), className: "block w-full rounded-md border border-gray-300 dark:border-gray-900/10 shadow-sm focus:border-primary-500 focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-950/50 p-2" })] })] }), _jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Phone Number" }), _jsx("input", { type: "tel", id: "phone", value: agentInfo.agentProfile.phone, onChange: (e) => setAgentInfo({
                                                                            ...agentInfo,
                                                                            agentProfile: {
                                                                                ...agentInfo.agentProfile,
                                                                                phone: e.target.value
                                                                            }
                                                                        }), className: "block w-full rounded-md border border-gray-300 dark:border-gray-900/10 shadow-sm focus:border-primary-500 focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-950/50 p-2" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "City" }), _jsx("input", { type: "text", id: "city", value: agentInfo.agentProfile.city, onChange: (e) => setAgentInfo({
                                                                            ...agentInfo,
                                                                            agentProfile: {
                                                                                ...agentInfo.agentProfile,
                                                                                city: e.target.value
                                                                            }
                                                                        }), className: "block w-full rounded-md border border-gray-300 dark:border-gray-900/10 shadow-sm focus:border-primary-500 focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-950/50 p-2" })] })] }), _jsx("div", { className: "pt-4", children: _jsx("button", { onClick: handleSave, className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: "Save Changes" }) })] })] })] })), activeTab === 'security' && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-gray-800 dark:text-white", children: "Security Settings" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Manage your account security" })] }), _jsxs("div", { className: "space-y-5", children: [_jsx("div", { className: "p-4 bg-gray-50 dark:bg-gray-950/40 rounded-lg", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-gray-800 dark:text-white", children: "Password" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Last changed 3 months ago" })] }), _jsx("button", { className: "text-sm font-medium text-primary-600 dark:text-primary-600 hover:text-primary-600 dark:hover:bg-primary-600/20 p-2 rounded", children: "Change Password" })] }) }), _jsx("div", { className: "p-4 bg-gray-50 dark:bg-gray-950/40 rounded-lg", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-gray-800 dark:text-white", children: "Two-Factor Authentication" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Add extra security to your account" })] }), _jsx("button", { className: "text-sm font-medium text-primary-600 dark:text-primary-600 hover:text-primary-600 dark:hover:bg-primary-600/20 p-2 rounded", children: "Enable 2FA" })] }) }), _jsx("div", { className: "p-4 bg-gray-50 dark:bg-gray-950/40 rounded-lg", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-gray-800 dark:text-white", children: "Device Activity" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "3 active sessions" })] }), _jsx("button", { className: "text-sm font-medium text-primary-600 dark:text-primary-600 hover:text-primary-600 dark:hover:bg-primary-600/20 p-2 rounded", children: "View All" })] }) })] })] })), activeTab === 'notifications' && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-gray-800 dark:text-white", children: "Notification Preferences" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Manage how you receive notifications" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "flex items-center h-5", children: _jsx("input", { id: "email-notifications", name: "email-notifications", type: "checkbox", defaultChecked: true, className: "focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded" }) }), _jsxs("div", { className: "ml-3 text-sm", children: [_jsx("label", { htmlFor: "email-notifications", className: "font-medium text-gray-700 dark:text-gray-300", children: "Email Notifications" }), _jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "Receive important updates via email" })] })] }), _jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "flex items-center h-5", children: _jsx("input", { id: "sms-notifications", name: "sms-notifications", type: "checkbox", defaultChecked: true, className: "focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded" }) }), _jsxs("div", { className: "ml-3 text-sm", children: [_jsx("label", { htmlFor: "sms-notifications", className: "font-medium text-gray-700 dark:text-gray-300", children: "SMS Notifications" }), _jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "Receive time-sensitive alerts via SMS" })] })] }), _jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "flex items-center h-5", children: _jsx("input", { id: "push-notifications", name: "push-notifications", type: "checkbox", defaultChecked: true, className: "focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded" }) }), _jsxs("div", { className: "ml-3 text-sm", children: [_jsx("label", { htmlFor: "push-notifications", className: "font-medium text-gray-700 dark:text-gray-300", children: "Push Notifications" }), _jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "Receive app notifications on your device" })] })] }), _jsx("div", { className: "pt-4", children: _jsx("button", { className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: "Save Preferences" }) })] })] })), activeTab === 'billing' && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-gray-800 dark:text-white", children: "Billing & Payments" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Manage your payment methods and billing information" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 bg-gray-50 dark:bg-gray-950/40 rounded-lg", children: [_jsx("h4", { className: "text-sm font-medium text-gray-800 dark:text-white mb-2", children: "Payment Methods" }), _jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { className: "flex items-center", children: [_jsx(CreditCard, { className: "h-5 w-5 text-gray-400 mr-2" }), _jsx("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: "M-Pesa (\u2022\u2022\u2022\u2022 2547)" })] }) }), _jsx("button", { className: "mt-2 text-sm font-medium text-primary-600 dark:text-primary-600 hover:text-primary-600 dark:hover:bg-primary-600/20 p-2 rounded", children: "Edit" })] }), _jsxs("div", { className: "p-4 bg-gray-50 dark:bg-gray-950/40 rounded-lg", children: [_jsx("h4", { className: "text-sm font-medium text-gray-800 dark:text-white mb-2", children: "Billing History" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "View and download your past invoices" }), _jsx("button", { className: "mt-2 text-sm font-medium text-primary-600 dark:text-primary-600 hover:text-primary-600 dark:hover:bg-primary-600/20 p-2 rounded", children: "View All Statements" })] }), _jsxs("div", { className: "p-4 bg-gray-50 dark:bg-gray-950/40 rounded-lg", children: [_jsx("h4", { className: "text-sm font-medium text-gray-800 dark:text-white mb-2", children: "Tax Information" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Update your tax details for commission payments" }), _jsx("button", { className: "mt-2 text-sm font-medium text-primary-600 dark:text-primary-600 hover:text-primary-600 dark:hover:bg-primary-600/20 p-2 rounded", children: "Update Tax Info" })] })] })] }))] })] })] }));
};
