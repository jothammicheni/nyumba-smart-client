/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { X, Trash2, AlertTriangle } from "lucide-react";
const DeleteConfirmationModal = ({ isOpen, onClose, listing, onConfirm }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleDelete = async () => {
        if (!listing)
            return;
        setLoading(true);
        setError("");
        try {
            await onConfirm(listing._id);
            onClose();
        }
        catch (err) {
            setError(err.message || "Failed to delete listing");
        }
        finally {
            setLoading(false);
        }
    };
    if (!isOpen || !listing)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", children: _jsxs("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-xl", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 bg-red-100 dark:bg-red-900/20 rounded-full", children: _jsx(AlertTriangle, { className: "h-6 w-6 text-red-600 dark:text-red-400" }) }), _jsx("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: "Delete Listing" })] }), _jsx("button", { onClick: onClose, className: "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors", children: _jsx(X, { className: "h-5 w-5 text-gray-500 dark:text-gray-400" }) })] }), error && (_jsx("div", { className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-4", children: error })), _jsxs("div", { className: "mb-6", children: [_jsx("p", { className: "text-gray-600 dark:text-gray-300 mb-4", children: "Are you sure you want to delete this listing? This action cannot be undone." }), _jsx("div", { className: "bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg", children: _jsxs("div", { className: "flex items-center space-x-3", children: [listing.images && listing.images[0] && (_jsx("img", { src: listing.images[0] || "/placeholder.svg", alt: listing.property?.name, className: "w-16 h-16 object-cover rounded-lg" })), _jsxs("div", { children: [_jsx("h3", { className: "font-medium text-gray-900 dark:text-white", children: listing.property?.name }), _jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: [listing.property?.city, " \u2022 ", listing.property?.type] }), _jsxs("p", { className: "text-sm font-medium text-primary-600 dark:text-primary-400", children: ["KES ", listing.property?.price?.toLocaleString()] })] })] }) }), _jsx("div", { className: "mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg", children: _jsxs("p", { className: "text-sm text-yellow-800 dark:text-yellow-200", children: [_jsx("strong", { children: "Warning:" }), " All associated images will also be permanently deleted from cloud storage."] }) })] }), _jsxs("div", { className: "flex justify-end gap-3", children: [_jsx("button", { onClick: onClose, disabled: loading, className: "px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium transition-colors disabled:opacity-50", children: "Cancel" }), _jsx("button", { onClick: handleDelete, disabled: loading, className: "px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors flex items-center space-x-2", children: loading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white" }), _jsx("span", { children: "Deleting..." })] })) : (_jsxs(_Fragment, { children: [_jsx(Trash2, { className: "h-4 w-4" }), _jsx("span", { children: "Delete Listing" })] })) })] })] }) }));
};
export default DeleteConfirmationModal;
