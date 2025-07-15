/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { X } from "lucide-react";
const AddPropertyModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: "",
        city: "",
        area: "",
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };
    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = "Property name is required";
        }
        if (!formData.city.trim()) {
            newErrors.city = "City is required";
        }
        if (!formData.area.trim()) {
            newErrors.area = "Area is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
            setFormData({
                name: "",
                city: "",
                area: "",
            });
        }
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: _jsxs("div", { className: "flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 bg-black/50 backdrop-blur-sm", children: [_jsx("div", { className: "fixed inset-0 transition-opacity", "aria-hidden": "true", children: _jsx("div", { className: "absolute inset-0 bg-gray-900 opacity-75" }) }), _jsx("span", { className: "hidden sm:inline-block sm:align-middle sm:h-screen", "aria-hidden": "true", children: "\u200B" }), _jsxs("div", { className: "inline-block align-bottom bg-white dark:bg-gray-950 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full", children: [_jsxs("div", { className: "flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-primary-600/20", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: "Add New Property" }), _jsx("button", { type: "button", className: "text-gray-400 hover:text-gray-500 focus:outline-none", onClick: onClose, children: _jsx(X, { className: "h-6 w-6" }) })] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "px-6 py-4", children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Property Name" }), _jsx("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, className: `block w-full px-3 py-2 border 
                    ${errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-800/50"} 
                    rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800/40 text-gray-900 dark:text-white`, placeholder: "Enter property name" }), errors.name && _jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.name })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "city", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "City" }), _jsx("input", { type: "text", id: "city", name: "city", value: formData.city, onChange: handleChange, className: `block w-full px-3 py-2 border 
                    ${errors.city ? "border-red-500" : "border-gray-300 dark:border-gray-800/50"} 
                    rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800/40 text-gray-900 dark:text-white`, placeholder: "Enter city" }), errors.city && _jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.city })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "area", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Area" }), _jsx("input", { type: "text", id: "area", name: "area", value: formData.area, onChange: handleChange, className: `block w-full px-3 py-2 border 
                    ${errors.area ? "border-red-500" : "border-gray-300 dark:border-gray-800/50"} 
                    rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800/40 text-gray-900 dark:text-white`, placeholder: "Enter area" }), errors.area && _jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.area })] })] }), _jsxs("div", { className: "px-6 py-4 bg-gray-50 dark:bg-primary-600/10 flex justify-end", children: [_jsx("button", { type: "button", className: "mr-3 px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", onClick: onClose, children: "Cancel" }), _jsx("button", { type: "submit", className: "px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: "Add Property" })] })] })] })] }) }));
};
export default AddPropertyModal;
