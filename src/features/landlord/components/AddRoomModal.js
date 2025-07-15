/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
const AddRoomModal = ({ isOpen, onClose, onSubmit, propertyId, }) => {
    const [roomChips, setRoomChips] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [formData, setFormData] = useState({
        status: "vacant",
        price: "",
        type: "bedsitter",
        bathrooms: "1",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null);
    const inputRef = useRef(null);
    // Auto-hide toast after 3s
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);
    const addChip = () => {
        const trimmed = inputValue.trim();
        if (trimmed && !roomChips.includes(trimmed)) {
            setRoomChips([...roomChips, trimmed]);
            setInputValue("");
            if (errors.room_number) {
                setErrors((prev) => ({ ...prev, room_number: "" }));
            }
        }
    };
    const removeChip = (chip) => {
        setRoomChips(roomChips.filter((c) => c !== chip));
    };
    const handleInputKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addChip();
        }
    };
    const handleInputBlur = () => {
        addChip();
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "room_number") {
            // handled by chips
            return;
        }
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };
    const validate = () => {
        const newErrors = {};
        if (roomChips.length === 0) {
            newErrors.room_number = "Please add at least one room number";
        }
        if (!formData.price.trim()) {
            newErrors.price = "Price is required";
        }
        if (!formData.type.trim()) {
            newErrors.type = "Type is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        addChip(); // add any leftover input before validation
        if (!validate()) {
            setToast({ type: "error", message: "Please fix the errors before submitting." });
            return;
        }
        setIsSubmitting(true);
        try {
            const roomPayloads = roomChips.map((roomNum) => ({
                ...formData,
                room_number: roomNum,
                property_id: propertyId,
            }));
            const success = await onSubmit(roomPayloads);
            if (success) {
                setToast({ type: "success", message: "Rooms added successfully!" });
                // Reset form
                setRoomChips([]);
                setInputValue("");
                setFormData({
                    status: "vacant",
                    price: "",
                    type: "bedsitter",
                    bathrooms: "1",
                });
                setErrors({});
                onClose();
            }
            else {
                setToast({ type: "error", message: "Failed to add rooms. Please try again." });
            }
        }
        catch {
            setToast({ type: "error", message: "An error occurred while adding rooms." });
        }
        finally {
            setIsSubmitting(false);
        }
    };
    if (!isOpen)
        return null;
    return (_jsxs(_Fragment, { children: [toast && (_jsx("div", { className: `fixed top-5 right-5 z-60 px-4 py-2 rounded shadow-md text-white font-semibold ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`, role: "alert", "aria-live": "assertive", children: toast.message })), _jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: _jsxs("div", { className: "flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0", children: [_jsx("div", { className: "fixed inset-0 transition-opacity", "aria-hidden": "true", children: _jsx("div", { className: "absolute inset-0 bg-gray-900 opacity-75" }) }), _jsx("span", { className: "hidden sm:inline-block sm:align-middle sm:h-screen", "aria-hidden": "true", children: "\u200B" }), _jsxs("div", { className: "inline-block align-bottom bg-white dark:bg-gray-950 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full", children: [_jsxs("div", { className: "flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: "Add New Room" }), _jsx("button", { type: "button", className: "text-gray-400 hover:text-gray-500 focus:outline-none", onClick: onClose, disabled: isSubmitting, "aria-label": "Close modal", children: _jsx(X, { className: "h-6 w-6" }) })] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "px-6 py-4", children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "room_number", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Room Numbers" }), _jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: roomChips.map((chip) => (_jsxs("div", { className: "flex items-center space-x-1 bg-primary-600 text-white rounded-full px-3 py-1 text-sm", children: [_jsx("span", { children: chip }), _jsx("button", { type: "button", onClick: () => removeChip(chip), className: "focus:outline-none", "aria-label": `Remove room number ${chip}`, disabled: isSubmitting, children: _jsx(X, { className: "h-4 w-4" }) })] }, chip))) }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", id: "room_number", name: "room_number", ref: inputRef, value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyDown: handleInputKeyDown, onBlur: handleInputBlur, enterKeyHint: "done", placeholder: "Type room number and press Enter or Add", className: `flex-1 block w-full px-3 py-2 border ${errors.room_number
                                                                        ? "border-red-500"
                                                                        : "border-gray-300 dark:border-gray-800/50"} rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800/40 text-gray-900 dark:text-white`, autoComplete: "off", disabled: isSubmitting }), _jsx("button", { type: "button", onClick: () => {
                                                                        addChip();
                                                                        inputRef.current?.focus();
                                                                    }, className: "px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50", "aria-label": "Add room number", disabled: isSubmitting, children: "Add" })] }), errors.room_number && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.room_number }))] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "price", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Price" }), _jsx("input", { type: "number", id: "price", name: "price", value: formData.price, onChange: handleChange, className: `block w-full px-3 py-2 border ${errors.price
                                                                ? "border-red-500"
                                                                : "border-gray-300 dark:border-gray-800/50"} rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800/40 text-gray-900 dark:text-white`, placeholder: "Enter price", disabled: isSubmitting }), errors.price && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.price }))] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "type", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Type" }), _jsxs("select", { id: "type", name: "type", value: formData.type, onChange: handleChange, className: `block w-full px-3 py-2 border ${errors.type
                                                                ? "border-red-500"
                                                                : "border-gray-300 dark:border-gray-800/50"} rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800/40 text-gray-900 dark:text-white`, disabled: isSubmitting, children: [_jsx("option", { value: "bedsitter", children: "Bedsitter" }), _jsx("option", { value: "1 bedroom", children: "1 Bedroom" }), _jsx("option", { value: "2 bedroom", children: "2 Bedroom" }), _jsx("option", { value: "3 bedroom", children: "3 Bedroom" })] }), errors.type && (_jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.type }))] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "bathrooms", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Bathrooms" }), _jsx("input", { type: "number", id: "bathrooms", name: "bathrooms", min: "1", value: formData.bathrooms, onChange: handleChange, className: "block w-full px-3 py-2 border border-gray-300 dark:border-gray-800/50 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800/40 text-gray-900 dark:text-white", placeholder: "Number of bathrooms", disabled: isSubmitting })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "status", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Status" }), _jsxs("select", { id: "status", name: "status", value: formData.status, onChange: handleChange, className: "block w-full px-3 py-2 border border-gray-300 dark:border-gray-800/50 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800/40 text-gray-900 dark:text-white", disabled: isSubmitting, children: [_jsx("option", { value: "vacant", children: "Vacant" }), _jsx("option", { value: "maintenance", children: "Maintenance" }), _jsx("option", { value: "reserved", children: "Reserved" })] })] })] }), _jsxs("div", { className: "px-6 py-4 bg-gray-50 dark:bg-primary-600/10 flex justify-end", children: [_jsx("button", { type: "button", className: "mr-3 px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50", onClick: onClose, disabled: isSubmitting, children: "Cancel" }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50", children: isSubmitting ? "Adding rooms..." : "Add Room" })] })] })] })] }) })] }));
};
export default AddRoomModal;
