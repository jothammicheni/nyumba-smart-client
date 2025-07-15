/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ArrowRight, Building, Plus, RefreshCw } from "lucide-react";
import { getProperties, createProperty } from "../../../services/propertyService.js";
import PropertyCard from "../components/PropertyCard.js";
import AddPropertyModal from "../components/AddPropertyModal.js";
import { Loader } from "../../../components/Loader.js";
const PropertiesPage = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    useEffect(() => {
        fetchProperties();
    }, []);
    const fetchProperties = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getProperties();
            setProperties(response.data);
        }
        catch (err) {
            setError(err.response?.data?.error || "Failed to fetch properties");
        }
        finally {
            setLoading(false);
        }
    };
    const handleAddProperty = async (propertyData) => {
        try {
            await createProperty(propertyData);
            setIsAddModalOpen(false);
            fetchProperties();
        }
        catch (err) {
            const errorMsg = err?.response?.data?.message || // Custom middleware error
                err?.response?.data?.error || // Generic error
                "Failed to add property";
            setError(errorMsg);
        }
    };
    if (loading)
        return _jsx("div", { children: _jsx(Loader, {}) });
    return (_jsxs("div", { className: "px-4 sm:px-6 py-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "My Properties" }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsxs("button", { onClick: fetchProperties, className: "inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700", children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Refresh"] }), _jsxs("button", { onClick: () => setIsAddModalOpen(true), className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add Property"] })] })] }), error && (_jsxs("div", { className: "bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded", children: ["\u26A0\uFE0F ", error, _jsx("div", { className: "mt-3 text-right", children: _jsxs("button", { onClick: () => window.location.href = '/subscriptions', className: "inline-flex items-center px-4 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-md hover:bg-yellow-600 transition", children: ["Upgrade Plan", _jsx(ArrowRight, { className: "w-4 h-4 ml-2" })] }) })] })), loading ? (_jsx("div", { className: "flex justify-center items-center min-h-[16rem]", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" }) })) : properties.length === 0 ? (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center", children: [_jsx(Building, { className: "h-12 w-12 mx-auto text-gray-400" }), _jsx("h3", { className: "mt-2 text-lg font-medium text-gray-900 dark:text-white", children: "No properties found" }), _jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: "Get started by adding your first property." }), _jsx("div", { className: "mt-6", children: _jsxs("button", { onClick: () => setIsAddModalOpen(true), className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add Property"] }) })] })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: properties.map((property) => (_jsx(PropertyCard, { property: property }, property._id))) })), _jsx(AddPropertyModal, { isOpen: isAddModalOpen, onClose: () => setIsAddModalOpen(false), onSubmit: handleAddProperty })] }));
};
export default PropertiesPage;
