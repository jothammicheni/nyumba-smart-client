/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { X, Upload, Trash2 } from "lucide-react";
import axios from "axios";
import { getAuthHeaders } from "../../../services/authService.js";
const EditListingModal = ({ isOpen, onClose, listing, onSuccess }) => {
    const [formData, setFormData] = useState({
        property_name: "",
        city: "",
        area: "",
        specific_location: "",
        type: "",
        bathrooms: "",
        bedrooms: "",
        price: "",
        deposit: "",
        description: "",
        amenities: "",
        featured: false,
    });
    const [newImages, setNewImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (listing && isOpen) {
            setFormData({
                property_name: listing.property?.name || "",
                city: listing.property?.city || "",
                area: listing.property?.area?.toString() || "",
                specific_location: listing.property?.specific_location || "",
                type: listing.property?.type || "",
                bathrooms: listing.property?.bathrooms?.toString() || "",
                bedrooms: listing.property?.bedrooms?.toString() || "",
                price: listing.property?.price?.toString() || "",
                deposit: listing.property?.deposit?.toString() || "",
                description: listing.description || "",
                amenities: listing.amenities?.join(", ") || "",
                featured: listing.featured || false,
            });
            setNewImages([]);
            setImagesToDelete([]);
            setError("");
        }
    }, [listing, isOpen]);
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? e.target.checked : value,
        }));
    };
    const handleImageUpload = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).slice(0, 5);
            setNewImages(files);
        }
    };
    const handleDeleteImage = (imageUrl) => {
        setImagesToDelete((prev) => [...prev, imageUrl]);
    };
    const handleRestoreImage = (imageUrl) => {
        setImagesToDelete((prev) => prev.filter((url) => url !== imageUrl));
    };
    const handleSubmit = async () => {
        setError("");
        setLoading(true);
        try {
            const submitData = new FormData();
            // Add form data
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== "") {
                    submitData.append(key, value.toString());
                }
            });
            // Add new images
            newImages.forEach((image) => {
                submitData.append("images", image);
            });
            // Add images to delete
            if (imagesToDelete.length > 0) {
                submitData.append("deleteImages", JSON.stringify(imagesToDelete));
            }
            const response = await axios.put(`http://localhost:5000/api/listings/${listing?._id}`, submitData, {
                headers: getAuthHeaders(true),
            });
            const result = response.data;
            if (result.success) {
                onSuccess();
                onClose();
            }
            else {
                setError(result.mesage || "Failed to update listing");
            }
        }
        catch (err) {
            setError(err.message || "Error updating listing");
        }
        finally {
            setLoading(false);
        }
    };
    if (!isOpen || !listing)
        return null;
    const currentImages = listing.images?.filter((img) => !imagesToDelete.includes(img)) || [];
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", children: _jsxs("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-4xl shadow-xl max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-900 dark:text-white", children: "Edit Listing" }), _jsx("button", { onClick: onClose, className: "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors", children: _jsx(X, { className: "h-5 w-5 text-gray-500 dark:text-gray-400" }) })] }), error && (_jsx("div", { className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-4", children: error })), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Property Name" }), _jsx("input", { type: "text", name: "property_name", value: formData.property_name, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "City" }), _jsx("input", { type: "text", name: "city", value: formData.city, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Area (m\u00B2)" }), _jsx("input", { type: "number", name: "area", value: formData.area, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Specific Location" }), _jsx("input", { type: "text", name: "specific_location", value: formData.specific_location, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Type" }), _jsxs("select", { name: "type", value: formData.type, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500", children: [_jsx("option", { value: "Single", children: "Single" }), _jsx("option", { value: "Bedseater", children: "Bedseater" }), _jsx("option", { value: "1 Bedroom", children: "1 Bedroom" }), _jsx("option", { value: "2 Bedroom", children: "2 Bedroom" }), _jsx("option", { value: "3 Bedroom", children: "3 Bedroom" }), _jsx("option", { value: "4 Bedroom", children: "4 Bedroom" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Bathrooms" }), _jsxs("select", { name: "bathrooms", value: formData.bathrooms, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500", children: [_jsx("option", { value: "1", children: "1" }), _jsx("option", { value: "2", children: "2" }), _jsx("option", { value: "3", children: "3" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Bedrooms" }), _jsx("input", { type: "number", name: "bedrooms", value: formData.bedrooms, onChange: handleInputChange, min: "0", className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Price (KES)" }), _jsx("input", { type: "number", name: "price", value: formData.price, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Deposit (KES)" }), _jsx("input", { type: "number", name: "deposit", value: formData.deposit, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Description" }), _jsx("textarea", { name: "description", value: formData.description, onChange: handleInputChange, rows: 3, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Amenities (comma-separated)" }), _jsx("input", { type: "text", name: "amenities", value: formData.amenities, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] }), _jsx("div", { children: _jsxs("label", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "checkbox", name: "featured", checked: formData.featured, onChange: handleInputChange, className: "h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-1 focus:ring-primary-500" }), _jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "Featured Listing" })] }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Current Images" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: currentImages.map((imageUrl, index) => (_jsxs("div", { className: "relative group", children: [_jsx("img", { src: imageUrl || "/placeholder.svg", alt: `Property ${index + 1}`, className: "w-full h-24 object-cover rounded-lg" }), _jsx("button", { onClick: () => handleDeleteImage(imageUrl), className: "absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(Trash2, { className: "h-3 w-3" }) })] }, index))) })] }), imagesToDelete.length > 0 && (_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-red-600 dark:text-red-400 mb-2", children: ["Images to Delete (", imagesToDelete.length, ")"] }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: imagesToDelete.map((imageUrl, index) => (_jsxs("div", { className: "relative group opacity-50", children: [_jsx("img", { src: imageUrl || "/placeholder.svg", alt: `To delete ${index + 1}`, className: "w-full h-24 object-cover rounded-lg" }), _jsx("button", { onClick: () => handleRestoreImage(imageUrl), className: "absolute top-1 right-1 p-1 bg-green-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(Upload, { className: "h-3 w-3" }) })] }, index))) })] })), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Upload New Images (Max 5)" }), _jsx("input", { type: "file", accept: "image/jpeg,image/png,image/jpg", multiple: true, onChange: handleImageUpload, className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }), newImages.length > 0 && (_jsx("div", { className: "mt-2", children: _jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: [newImages.length, " new image(s) selected"] }) }))] })] })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700", children: [_jsx("button", { onClick: onClose, className: "px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleSubmit, disabled: loading, className: "px-6 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors", children: loading ? "Updating..." : "Update Listing" })] })] }) }));
};
export default EditListingModal;
