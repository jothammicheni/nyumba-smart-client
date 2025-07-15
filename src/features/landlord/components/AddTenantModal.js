/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { createTenant, fetchLandlordProperties, fetchVacantRooms, } from "../../../services/tenantService.js";
const AddTenantModal = ({ isOpen, onClose, onSuccess }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [propertyId, setPropertyId] = useState("");
    const [roomId, setRoomId] = useState("");
    const [properties, setProperties] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (isOpen) {
            setError("");
            fetchLandlordProperties()
                .then(setProperties)
                .catch(() => setError("Failed to fetch properties"));
        }
    }, [isOpen]);
    useEffect(() => {
        if (propertyId) {
            fetchVacantRooms(propertyId)
                .then(setRooms)
                .catch(() => setError("Failed to fetch vacant rooms"));
        }
        else {
            setRooms([]);
        }
    }, [propertyId]);
    const handleSubmit = async () => {
        setError("");
        setLoading(true);
        try {
            const payload = {
                name,
                email,
                phone,
                property_id: propertyId,
                room_id: roomId,
            };
            console.log("📤 Creating tenant with data:", payload);
            const res = await createTenant(payload);
            console.log("✅ Tenant creation response:", res);
            if (res.success) {
                onSuccess();
                onClose();
            }
            else {
                setError(res.message || "Failed to create tenant");
            }
        }
        catch (err) {
            console.error("❌ Error:", err);
            setError(err.response?.data?.message || "Failed to create tenant");
        }
        finally {
            setLoading(false);
        }
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm", children: _jsxs("div", { className: "bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-700", children: [_jsx("h2", { className: "text-xl font-semibold mb-4 text-gray-900 dark:text-white", children: "\uD83C\uDFD8\uFE0F Add New Tenant" }), error && _jsx("p", { className: "text-red-500 text-sm mb-3", children: error }), _jsxs("div", { className: "space-y-3", children: [_jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), placeholder: "Tenant name", className: "w-full border px-3 py-2 rounded text-sm focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Email address", className: "w-full border px-3 py-2 rounded text-sm focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white" }), _jsx("input", { type: "text", value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "Phone number", className: "w-full border px-3 py-2 rounded text-sm focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white" }), _jsxs("select", { value: propertyId, onChange: (e) => setPropertyId(e.target.value), className: "w-full border px-3 py-2 rounded text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white", children: [_jsx("option", { value: "", children: "\uD83C\uDFE2 Select Property" }), properties.map((prop) => (_jsx("option", { value: prop._id, children: prop.name }, prop._id)))] }), _jsxs("select", { value: roomId, onChange: (e) => setRoomId(e.target.value), disabled: !propertyId, className: "w-full border px-3 py-2 rounded text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white", children: [_jsx("option", { value: "", children: "\uD83D\uDEAA Select Room" }), rooms.map((room) => (_jsxs("option", { value: room._id, children: ["Room ", room.room_number] }, room._id)))] })] }), _jsxs("div", { className: "flex justify-end gap-2 mt-5", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200", children: "Cancel" }), _jsx("button", { onClick: handleSubmit, disabled: loading || !name || !email || !phone || !propertyId || !roomId, className: "px-4 py-2 text-sm rounded bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50", children: loading ? "Saving..." : "Save Tenant" })] })] }) }));
};
export default AddTenantModal;
