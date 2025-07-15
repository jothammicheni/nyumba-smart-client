"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { X } from "lucide-react";
const AdvertisePropertyModal = ({ isOpen, onClose, property, onSuccess }) => {
    const [formData, setFormData] = useState({
        type: "",
        bathrooms: "",
        bedrooms: "",
        area: "",
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
        if (!formData.type || !formData.price || !formData.deposit || !formData.bathrooms || !formData.area) {
            setError("All required fields must be filled");
            return;
        }
        if (images.length === 0) {
            setError("At least one image is required");
            return;
        }
        const submitData = new FormData();
        submitData.append("property_id", property._id);
        submitData.append("property_name", property.name);
        submitData.append("city", property.city);
        submitData.append("area", property.area);
        submitData.append("type", formData.type);
        submitData.append("bathrooms", formData.bathrooms);
        submitData.append("area", formData.area);
        submitData.append("specific_location", formData.specific_location);
        submitData.append("bedrooms", getBedroomsFromType(formData.type).toString());
        submitData.append("description", formData.description);
        submitData.append("amenities", formData.amenities);
        images.forEach((img) => {
            submitData.append("images", img);
        });
        try {
            setLoading(true);
            // Replace with your actual API call
            const response = await fetch("http://localhost:5000/api/listings", {
                method: "POST",
                body: submitData,
            });
            if (response.ok) {
                onSuccess();
                onClose();
                // Reset form
                setFormData({
                    type: "",
                    bathrooms: "",
                    bedrooms: "",
                    area: "",
                    specific_location: "",
                    price: "",
                    deposit: "",
                    description: "",
                    amenities: "",
                });
                setImages([]);
            }
            else {
                const errorData = await response.json();
                setError(errorData.message || "Failed to upload listing");
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
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", children: _jsxs("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-900 dark:text-white", children: "Advertise Property" }), _jsx("button", { onClick: onClose, className: "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors", children: _jsx(X, { className: "h-5 w-5 text-gray-500 dark:text-gray-400" }) })] }), error && (_jsx("div", { className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-4", children: error })), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Property Type *" }), _jsxs("select", { name: "type", value: formData.type, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500", children: [_jsx("option", { value: "", children: "Select Property Type" }), _jsx("option", { value: "Single", children: "Single" }), _jsx("option", { value: "Bedseater", children: "Bedseater" }), _jsx("option", { value: "1 Bedroom", children: "1 Bedroom" }), _jsx("option", { value: "2 Bedroom", children: "2 Bedroom" }), _jsx("option", { value: "3 Bedroom", children: "3 Bedroom" }), _jsx("option", { value: "4 Bedroom", children: "4 Bedroom" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Bathrooms *" }), _jsxs("select", { name: "bathrooms", value: formData.bathrooms, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500", children: [_jsx("option", { value: "", children: "Select Bathrooms" }), _jsx("option", { value: "1", children: "1" }), _jsx("option", { value: "2", children: "2" }), _jsx("option", { value: "3", children: "3" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Area (m\u00B2) *" }), _jsx("input", { type: "number", name: "area", value: formData.area, onChange: handleInputChange, placeholder: "e.g., 50", className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Specific Location" }), _jsx("input", { type: "text", name: "specific_location", value: formData.specific_location, onChange: handleInputChange, placeholder: "e.g., Near shopping mall, Main road", className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Price (KES) *" }), _jsx("input", { type: "number", name: "price", value: formData.price, onChange: handleInputChange, placeholder: "e.g., 25000", className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Deposit (KES) *" }), _jsx("input", { type: "number", name: "deposit", value: formData.deposit, onChange: handleInputChange, placeholder: "e.g., 25000", className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Description" }), _jsx("textarea", { name: "description", value: formData.description, onChange: handleInputChange, rows: 3, placeholder: "Describe the property...", className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Amenities (comma-separated)" }), _jsx("input", { type: "text", name: "amenities", value: formData.amenities, onChange: handleInputChange, placeholder: "e.g., WiFi, Parking, Security, Water", className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Images * (Max 5 images)" }), _jsx("input", { type: "file", accept: "image/*", multiple: true, onChange: handleImageUpload, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }), images.length > 0 && (_jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400 mt-1", children: [images.length, " image(s) selected"] }))] })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700", children: [_jsx("button", { onClick: onClose, className: "px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleSubmit, disabled: loading, className: "px-6 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors", children: loading ? "Posting..." : "Post Listing" })] })] }) }));
};
export default AdvertisePropertyModal;
