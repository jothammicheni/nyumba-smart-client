/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { getAvailableTenants } from "../../../services/propertyService.js";
const AssignTenantModal = ({ isOpen, onClose, onSubmit }) => {
    const [availableTenants, setAvailableTenants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedUserId, setSelectedUserId] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        if (isOpen) {
            fetchAvailableTenants();
        }
    }, [isOpen]);
    const fetchAvailableTenants = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getAvailableTenants();
            setAvailableTenants(response.data);
        }
        catch (err) {
            setError(err.response?.data?.error || "Failed to fetch available tenants");
        }
        finally {
            setLoading(false);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedUserId) {
            setError("Please select a tenant");
            return;
        }
        onSubmit(selectedUserId);
    };
    const filteredTenants = availableTenants.filter((tenant) => tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tenant.phone && tenant.phone.includes(searchTerm)));
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: _jsxs("div", { className: "flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0", children: [_jsx("div", { className: "fixed inset-0 transition-opacity", "aria-hidden": "true", children: _jsx("div", { className: "absolute inset-0 bg-gray-500 opacity-75" }) }), _jsx("span", { className: "hidden sm:inline-block sm:align-middle sm:h-screen", "aria-hidden": "true", children: "\u200B" }), _jsxs("div", { className: "inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full", children: [_jsxs("div", { className: "flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: "Assign Tenant to Room" }), _jsx("button", { type: "button", className: "text-gray-400 hover:text-gray-500 focus:outline-none", onClick: onClose, children: _jsx(X, { className: "h-6 w-6" }) })] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "px-6 py-4", children: [error && _jsx("div", { className: "mb-4 p-3 bg-red-100 text-red-700 rounded-md", children: error }), _jsx("div", { className: "mb-4", children: _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Search, { className: "h-5 w-5 text-gray-400" }) }), _jsx("input", { type: "text", className: "block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm", placeholder: "Search tenants...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }) }), _jsx("div", { className: "max-h-60 overflow-y-auto", children: loading ? (_jsx("div", { className: "text-center py-4", children: _jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "Loading..." }) })) : filteredTenants.length === 0 ? (_jsx("div", { className: "text-center py-4", children: _jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "No available tenants found" }) })) : (_jsx("div", { className: "space-y-2", children: filteredTenants.map((tenant) => (_jsx("div", { className: `p-3 rounded-md cursor-pointer ${selectedUserId === tenant._id
                                                        ? "bg-primary-100 dark:bg-primary-900 border border-primary-500"
                                                        : "hover:bg-gray-100 dark:hover:bg-gray-700"}`, onClick: () => setSelectedUserId(tenant._id), children: _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "radio", name: "tenant", id: tenant._id, value: tenant._id, checked: selectedUserId === tenant._id, onChange: () => setSelectedUserId(tenant._id), className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300" }), _jsxs("label", { htmlFor: tenant._id, className: "ml-3 block", children: [_jsx("span", { className: "block text-sm font-medium text-gray-900 dark:text-white", children: tenant.name }), _jsx("span", { className: "block text-sm text-gray-500 dark:text-gray-400", children: tenant.email }), tenant.phone && (_jsx("span", { className: "block text-sm text-gray-500 dark:text-gray-400", children: tenant.phone }))] })] }) }, tenant._id))) })) })] }), _jsxs("div", { className: "px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end", children: [_jsx("button", { type: "button", className: "mr-3 px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", onClick: onClose, children: "Cancel" }), _jsx("button", { type: "submit", className: "px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", disabled: !selectedUserId || loading, children: "Assign Tenant" })] })] })] })] }) }));
};
export default AssignTenantModal;
