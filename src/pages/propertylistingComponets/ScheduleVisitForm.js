"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from "lucide-react";
const ScheduleVisitModal = ({ isOpen, onClose, property }) => {
    if (!isOpen || !property)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm", children: _jsxs("div", { className: "relative bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md p-6", children: [_jsx("button", { onClick: onClose, className: "absolute top-3 right-3 p-1 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700", children: _jsx(X, { className: "w-5 h-5 text-gray-700 dark:text-gray-300" }) }), _jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-4", children: "Schedule a Visit" }), _jsxs("p", { className: "text-gray-600 dark:text-gray-400 mb-4", children: ["Schedule a visit for: ", _jsx("strong", { children: property.property?.name })] }), _jsxs("form", { className: "space-y-4", children: [_jsx("input", { type: "text", placeholder: "Your name", className: "w-full border border-gray-300 dark:border-gray-700 rounded px-4 py-2" }), _jsx("input", { type: "email", placeholder: "Your email", className: "w-full border border-gray-300 dark:border-gray-700 rounded px-4 py-2" }), _jsx("input", { type: "datetime-local", className: "w-full border border-gray-300 dark:border-gray-700 rounded px-4 py-2" }), _jsx("button", { type: "submit", className: "w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded", children: "Schedule Visit" })] })] }) }));
};
export default ScheduleVisitModal;
