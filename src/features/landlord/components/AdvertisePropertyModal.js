/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { X } from "lucide-react";
import { getAuthHeaders } from "../../../services/authService.js";
import axios from "axios";
const AdvertisePropertyModal = ({ isOpen, onClose, property, onSuccess }) => {
    const [formData, setFormData] = useState({
        type: "",
        bathrooms: "",
        propertyArea: "", // Changed from 'area' to 'propertyArea' to avoid conflict
        specific_location: "",
        price: "",
        deposit: "",
        description: "",
        amenities: "",
    });
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleImageUpload = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).slice(0, 5);
            setImages(files);
        }
    };
    const getBedroomsFromType = (type) => {
        switch (type) {
            case "Single":
            case "Bedseater":
                return 0;
            case "1 Bedroom":
                return 1;
            case "2 Bedroom":
                return 2;
            case "3 Bedroom":
                return 3;
            case "4 Bedroom":
                return 4;
            default:
                return 0;
        }
    };
    const handleSubmit = async () => {
        setError("");
        // Validation
        if (!formData.type || !formData.price || !formData.deposit || !formData.bathrooms || !formData.propertyArea) {
            setError("All required fields must be filled");
            return;
        }
        if (images.length === 0) {
            setError("At least one image is required");
            return;
        }
        // Validate numeric fields
        if (isNaN(Number(formData.propertyArea)) || Number(formData.propertyArea) <= 0) {
            setError("Area must be a valid positive number");
            return;
        }
        if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            setError("Price must be a valid positive number");
            return;
        }
        if (isNaN(Number(formData.deposit)) || Number(formData.deposit) < 0) {
            setError("Deposit must be a valid non-negative number");
            return;
        }
        const submitData = new FormData();
        // Add all the required fields
        submitData.append("property_id", property._id);
        submitData.append("property_name", property.name);
        submitData.append("city", property.city);
        submitData.append("area", formData.propertyArea); // Use propertyArea for the numeric area
        submitData.append("specific_location", formData.specific_location);
        submitData.append("type", formData.type);
        submitData.append("bathrooms", formData.bathrooms);
        submitData.append("bedrooms", getBedroomsFromType(formData.type).toString());
        submitData.append("price", formData.price);
        submitData.append("deposit", formData.deposit);
        submitData.append("description", formData.description);
        submitData.append("amenities", formData.amenities);
        // Add images
        images.forEach((img) => {
            submitData.append("images", img);
        });
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5000/api/listings", submitData, {
                headers: getAuthHeaders(true), // Use the getAuthHeaders function to include the token
            });
            const result = response.data;
            if (result && result.success) {
                onSuccess();
                onClose();
                // Reset form
                setFormData({
                    type: "",
                    bathrooms: "",
                    propertyArea: "",
                    specific_location: "",
                    price: "",
                    deposit: "",
                    description: "",
                    amenities: "",
                });
                setImages([]);
            }
            else {
                setError(result?.error || "Failed to upload listing");
            }
        }
        catch (err) {
            setError(err.message || "Error uploading listing");
        }
        finally {
            setLoading(false);
        }
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", children: _jsxs("div", { className: "bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-900 dark:text-white", children: "Advertise Property" }), _jsx("button", { onClick: onClose, className: "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors", children: _jsx(X, { className: "h-5 w-5 text-gray-500 dark:text-gray-400" }) })] }), error && (_jsx("div", { className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-4", children: error })), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-gray-50 dark:bg-gray-950/50 p-4 rounded-lg", children: [_jsx("h3", { className: "font-medium text-gray-900 dark:text-white mb-2", children: "Property Information" }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Name:" }), _jsx("span", { className: "ml-2 font-medium text-gray-900 dark:text-white", children: property.name })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "City:" }), _jsx("span", { className: "ml-2 font-medium text-gray-900 dark:text-white", children: property.city })] })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: ["Property Type ", _jsx("span", { className: "text-primary-600", children: "*" }), " "] }), _jsxs("select", { name: "type", value: formData.type, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500", children: [_jsx("option", { value: "", children: "Select Property Type" }), _jsx("option", { value: "Single", children: "Single" }), _jsx("option", { value: "Bedseater", children: "Bedseater" }), _jsx("option", { value: "1 Bedroom", children: "1 Bedroom" }), _jsx("option", { value: "2 Bedroom", children: "2 Bedroom" }), _jsx("option", { value: "3 Bedroom", children: "3 Bedroom" }), _jsx("option", { value: "4 Bedroom", children: "4 Bedroom" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: ["Bathrooms ", _jsx("span", { className: "text-primary-600", children: "*" }), " "] }), _jsxs("select", { name: "bathrooms", value: formData.bathrooms, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500", children: [_jsx("option", { value: "", children: "Select Bathrooms" }), _jsx("option", { value: "1", children: "1" }), _jsx("option", { value: "2", children: "2" }), _jsx("option", { value: "3", children: "3" })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: ["Area (m\u00B2) ", _jsx("span", { className: "text-primary-600", children: "*" }), " "] }), _jsx("input", { type: "number", name: "propertyArea", value: formData.propertyArea, onChange: handleInputChange, placeholder: "e.g., 50", min: "1", className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Specific Location" }), _jsx("input", { type: "text", name: "specific_location", value: formData.specific_location, onChange: handleInputChange, placeholder: "e.g., Near shopping mall, Main road", className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-900 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: ["Price (KES) ", _jsx("span", { className: "text-primary-600", children: "*" }), " "] }), _jsx("input", { type: "number", name: "price", value: formData.price, onChange: handleInputChange, placeholder: "e.g., 25000", min: "1", className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-900 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: ["Deposit (KES) ", _jsx("span", { className: "text-primary-600", children: "*" }), " "] }), _jsx("input", { type: "number", name: "deposit", value: formData.deposit, onChange: handleInputChange, placeholder: "e.g., 25000", min: "0", className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-900 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Description" }), _jsx("textarea", { name: "description", value: formData.description, onChange: handleInputChange, rows: 3, placeholder: "Describe the property features, location benefits, etc...", className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-900 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Amenities (comma-separated)" }), _jsx("input", { type: "text", name: "amenities", value: formData.amenities, onChange: handleInputChange, placeholder: "e.g., WiFi, Parking, Security, Water, Electricity", className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-900 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: ["Images ", _jsx("span", { className: "text-primary-600", children: "*" }), " (Max 5 images, JPEG/PNG)"] }), _jsx("input", { type: "file", accept: "image/jpeg,image/png,image/jpg", multiple: true, onChange: handleImageUpload, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }), images.length > 0 && (_jsxs("div", { className: "mt-2", children: [_jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: [images.length, " image(s) selected"] }), _jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: images.map((image, index) => (_jsx("span", { className: "px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs rounded", children: image.name }, index))) })] }))] })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700", children: [_jsx("button", { onClick: onClose, className: "px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleSubmit, disabled: loading, className: "px-6 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors", children: loading ? "Posting..." : "Post Listing" })] })] }) }));
};
export default AdvertisePropertyModal;
