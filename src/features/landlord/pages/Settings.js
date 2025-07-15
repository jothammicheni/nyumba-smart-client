/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { settingsService } from "../../../services/settingsService.js";
const Settings = () => {
    const [activeSection, setActiveSection] = useState("profile");
    const [settings, setSettings] = useState(null);
    // Form state
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [paymentPhone, setPaymentPhone] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [paymentPhoneError, setPaymentPhoneError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    // Show/hide password toggles
    const [showPasswords, setShowPasswords] = useState({
        old: false,
        new: false,
        confirm: false,
    });
    useEffect(() => {
        fetchSettings();
    }, []);
    const fetchSettings = async () => {
        try {
            const data = await settingsService.getCurrentUserSettings();
            setSettings(data);
            setUsername(data.name);
            setEmail(data.email);
            setPaymentPhone(data.payoutPhone || "");
        }
        catch (err) {
            toast.error("Failed to load settings: " + err.message);
        }
    };
    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await settingsService.updateProfile({ name: username, email });
            toast.success("Profile updated!");
            setSuccessMsg("Profile updated successfully!");
        }
        catch (err) {
            toast.error("Failed to update profile: " + (err.response?.data?.message || err.message));
        }
        finally {
            setLoading(false);
        }
    };
    const handleSavePaymentPhone = async (e) => {
        e.preventDefault();
        setPaymentPhoneError("");
        if (!paymentPhone.match(/^\d{10,15}$/)) {
            setPaymentPhoneError("Enter a valid phone number (10-15 digits)");
            return;
        }
        setLoading(true);
        try {
            const data = await settingsService.updatePaymentPhone(paymentPhone);
            toast.success(data.message);
            setSuccessMsg("Payment phone updated successfully!");
        }
        catch (err) {
            toast.error("Failed to update phone: " + (err.response?.data?.message || err.message));
        }
        finally {
            setLoading(false);
        }
    };
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordError("");
        setSuccessMsg("");
        if (newPassword !== confirmPassword) {
            setPasswordError("New passwords don't match");
            return;
        }
        setLoading(true);
        try {
            const res = await settingsService.changePassword({
                oldPassword,
                newPassword,
                confirmPassword,
            });
            toast.success(res.message || "Password updated successfully!");
            setSuccessMsg("Password updated successfully!");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
        catch (err) {
            toast.error("Failed to update password: " + (err.response?.data?.message || err.message));
        }
        finally {
            setLoading(false);
        }
    };
    const handleSectionChange = (section) => {
        setActiveSection(section);
        setSuccessMsg("");
        setPasswordError("");
        setPaymentPhoneError("");
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const togglePasswordVisibility = (field) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col md:flex-row", children: [_jsxs("aside", { className: "w-full md:w-64 bg-white dark:bg-gray-800 shadow-md p-6 flex flex-col", children: [_jsx("h2", { className: "text-2xl font-semibold mb-6 text-primary-600 dark:text-primary-400 cursor-default", children: "Settings" }), _jsxs("nav", { className: "flex flex-col space-y-3 text-gray-700 dark:text-gray-300", children: [_jsx("button", { onClick: () => handleSectionChange("profile"), className: `text-left py-2 px-3 rounded-md w-full ${activeSection === "profile"
                                    ? "bg-primary-600 dark:bg-primary-500 text-white font-medium"
                                    : "hover:bg-primary-100 dark:hover:bg-primary-700"}`, children: "Profile" }), _jsx("button", { onClick: () => handleSectionChange("account"), className: `text-left py-2 px-3 rounded-md w-full ${activeSection === "account"
                                    ? "bg-primary-600 dark:bg-primary-500 text-white font-medium"
                                    : "hover:bg-primary-100 dark:hover:bg-primary-700"}`, children: "Account" }), _jsx("button", { onClick: () => handleSectionChange("notifications"), className: `text-left py-2 px-3 rounded-md w-full ${activeSection === "notifications"
                                    ? "bg-primary-600 dark:bg-primary-500 text-white font-medium"
                                    : "hover:bg-primary-100 dark:hover:bg-primary-700"}`, children: "Notifications" }), _jsx("button", { onClick: () => handleSectionChange("paymentPhone"), className: `text-left py-2 px-3 rounded-md w-full ${activeSection === "paymentPhone"
                                    ? "bg-red-600 dark:bg-red-700 text-white font-semibold"
                                    : "hover:bg-red-100 dark:hover:bg-red-700 text-red-700 dark:text-red-400"}`, children: "\u26A0\uFE0F Update Payment Phone" })] })] }), _jsxs("main", { className: "flex-1 p-8 max-w-4xl mx-auto w-full", children: [successMsg && (_jsx("div", { className: "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 p-3 rounded mb-6", children: successMsg })), activeSection === "profile" && (_jsxs(_Fragment, { children: [_jsx("h3", { className: "text-xl font-semibold mb-4", children: "Profile Settings" }), _jsxs("form", { onSubmit: handleSaveProfile, className: "space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "username", className: "block text-sm font-medium mb-1", children: "Username" }), _jsx("input", { id: "username", type: "text", value: username, onChange: (e) => setUsername(e.target.value), className: "w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500 outline-none text-gray-900 dark:text-gray-100", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium mb-1", children: "Email Address" }), _jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500 outline-none text-gray-900 dark:text-gray-100", required: true })] }), _jsx("div", { className: "flex justify-end", children: _jsx("button", { type: "submit", disabled: loading, className: `px-6 py-2 rounded bg-primary-600 text-white font-semibold transition ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-primary-700"}`, children: loading ? "Saving..." : "Save Changes" }) })] })] })), activeSection === "account" && (_jsxs("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700", children: [_jsx("h3", { className: "text-xl font-semibold mb-4 text-gray-900 dark:text-white", children: "\uD83D\uDD12 Change Password" }), _jsxs("form", { onSubmit: handlePasswordChange, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "oldPassword", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Current Password" }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: showPasswords.old ? "text" : "password", id: "oldPassword", value: oldPassword, onChange: (e) => setOldPassword(e.target.value), required: true, placeholder: "Enter current password", className: "w-full px-4 py-2 pr-10 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none" }), _jsx("button", { type: "button", onClick: () => setShowPasswords({ ...showPasswords, old: !showPasswords.old }), className: "absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white", children: showPasswords.old ? "🙈" : "👁️" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "newPassword", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "New Password" }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: showPasswords.new ? "text" : "password", id: "newPassword", value: newPassword, onChange: (e) => setNewPassword(e.target.value), required: true, placeholder: "e.g. *Bma8ku#", className: "w-full px-4 py-2 pr-10 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none" }), _jsx("button", { type: "button", onClick: () => setShowPasswords({ ...showPasswords, new: !showPasswords.new }), className: "absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white", children: showPasswords.new ? "🙈" : "👁️" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirmPassword", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Confirm New Password" }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: showPasswords.confirm ? "text" : "password", id: "confirmPassword", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true, className: "w-full px-4 py-2 pr-10 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none" }), _jsx("button", { type: "button", onClick: () => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm }), className: "absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white", children: showPasswords.confirm ? "🙈" : "👁️" })] })] }), passwordError && _jsx("p", { className: "text-sm text-red-600 dark:text-red-400", children: passwordError }), successMsg && (_jsx("p", { className: "text-sm text-green-600 dark:text-green-400", children: successMsg })), passwordError && (_jsx("p", { className: "text-sm text-red-600 dark:text-red-400", children: passwordError })), _jsx("div", { className: "flex justify-end", children: _jsx("button", { type: "submit", disabled: loading, className: `px-6 py-2 rounded bg-primary-600 text-white font-semibold transition ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-primary-700"}`, children: loading ? "Saving..." : "Update Password" }) })] })] })), activeSection === "notifications" && (_jsxs("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg", children: [_jsx("h3", { className: "text-xl font-semibold mb-4", children: "Notification Settings" }), _jsxs("label", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "checkbox", checked: notificationsEnabled, onChange: () => setNotificationsEnabled(!notificationsEnabled), className: "h-5 w-5 text-primary-600 dark:text-primary-500 focus:ring-primary-500 border-gray-300 rounded" }), _jsx("span", { children: "Enable email notifications" })] })] })), activeSection === "paymentPhone" && (_jsxs("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-red-600 dark:border-red-700", children: [_jsxs("h3", { className: "text-xl font-semibold mb-4 text-red-700 dark:text-red-400 flex items-center gap-2", children: ["\u26A0\uFE0F Update Payment Phone ", _jsx("span", { className: "text-sm font-normal", children: "(Danger Zone \u2014 must be correct)" })] }), _jsxs("div", { className: "mb-6", children: [_jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300 mb-1", children: "Current Payment Phone" }), _jsx("div", { className: "px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono", children: settings?.payoutPhone || "Not set" })] }), _jsxs("form", { onSubmit: handleSavePaymentPhone, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "paymentPhone", className: "block text-sm font-medium mb-1 text-red-700 dark:text-red-400", children: "New Payment Phone Number" }), _jsx("input", { id: "paymentPhone", type: "tel", placeholder: "Enter phone number", value: paymentPhone, onChange: (e) => setPaymentPhone(e.target.value), className: `w-full px-4 py-2 rounded border ${paymentPhoneError ? "border-red-600 dark:border-red-400" : "border-gray-300 dark:border-gray-700"} bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-red-600 dark:focus:ring-red-400 outline-none text-gray-900 dark:text-gray-100` }), paymentPhoneError && (_jsx("p", { className: "mt-1 text-red-600 dark:text-red-400 text-sm", children: paymentPhoneError }))] }), _jsx("div", { className: "flex justify-end", children: _jsx("button", { type: "submit", disabled: loading, className: `px-6 py-2 rounded bg-red-600 text-white font-semibold transition ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-red-700"}`, children: loading ? "Saving..." : "Update Phone" }) })] })] }))] })] }));
};
export default Settings;
