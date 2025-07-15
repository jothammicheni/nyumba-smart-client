import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { createMaintananceRequests } from "../../../services/maintananceService.js";
const NewRequestModal = ({ onRequestCreated }) => {
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [serviceType, setServiceType] = useState("plumbing");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const handleSubmit = async () => {
        if (!description.trim()) {
            setError("Description is required");
            return;
        }
        setIsSubmitting(true);
        setError("");
        try {
            await createMaintananceRequests({
                description,
                priority,
                serviceType
            });
            setDescription("");
            setPriority("medium");
            setServiceType("plumbing");
            setOpen(false);
            onRequestCreated();
        }
        catch (err) {
            console.error("Failed to submit maintenance request:", err);
            setError("Failed to submit request. Please try again.");
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => setOpen(true), className: "px-4 py-2 bg-primary-600 text-white text-sm rounded hover:bg-primary-700", children: "New Request" }), open && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-50 z-50", children: _jsxs("div", { className: "bg-slate-100 p-6 rounded shadow-md w-full max-w-md", children: [_jsx("h2", { className: "text-lg text-gray-900 font-semibold mb-4", children: "New Maintenance Request" }), error && (_jsx("div", { className: "mb-4 p-2 bg-red-100 text-red-700 text-sm rounded", children: error })), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: ["Priority ", _jsx("span", { className: "text-primary-600", children: "*" })] }), _jsxs("select", { value: priority, onChange: (e) => setPriority(e.target.value), className: "w-full text-gray-900 border border-gray-200 bg-slate-50 focus:outline-none focus:ring-primary-600/20 rounded px-3 py-2 text-sm", disabled: isSubmitting, children: [_jsx("option", { value: "low", children: "Low" }), _jsx("option", { value: "medium", children: "Medium" }), _jsx("option", { value: "high", children: "High" }), _jsx("option", { value: "urgent", children: "Urgent" })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: ["Service Type ", _jsx("span", { className: "text-primary-600", children: "*" })] }), _jsxs("select", { value: serviceType, onChange: (e) => setServiceType(e.target.value), className: "w-full text-gray-900 border border-gray-200 bg-slate-50 focus:outline-none focus:ring-primary-600/20 rounded px-3 py-2 text-sm", disabled: isSubmitting, children: [_jsx("option", { value: "plumbing", children: "Plumbing" }), _jsx("option", { value: "electrical", children: "Electrical" }), _jsx("option", { value: "cleaning", children: "Cleaning" }), _jsx("option", { value: "security", children: "Security" }), _jsx("option", { value: "wifi", children: "WiFi" }), _jsx("option", { value: "other", children: "Other" })] })] })] }), _jsxs("div", { className: "mb-4", children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: ["Description ", _jsx("span", { className: "text-primary-600", children: "*" })] }), _jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), className: "w-full text-gray-900 border border-gray-200 bg-slate-50 focus:outline-none focus:ring-primary-600/20 rounded px-3 py-2 text-sm", rows: 4, placeholder: "Describe the issue", disabled: isSubmitting, required: true })] }), _jsxs("div", { className: "flex justify-end space-x-2", children: [_jsx("button", { onClick: () => {
                                        setOpen(false);
                                        setError("");
                                    }, className: "px-4 py-2 text-sm bg-gray-400 rounded hover:bg-gray-400", disabled: isSubmitting, children: "Cancel" }), _jsx("button", { onClick: handleSubmit, className: "px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-300", disabled: isSubmitting || !description.trim(), children: isSubmitting ? "Submitting..." : "Submit" })] })] }) }))] }));
};
export default NewRequestModal;
