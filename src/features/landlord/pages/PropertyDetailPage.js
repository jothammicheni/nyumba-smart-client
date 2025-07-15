/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Building, ArrowLeft, Plus, Trash2, User, AlertTriangle, RefreshCw, } from "lucide-react";
import { getProperty, createRoom, deleteRoom, assignTenant, removeTenant, } from "../../../services/propertyService.js";
import AddRoomModal from "../components/AddRoomModal.js";
import AssignTenantModal from "../components/AssignTenantModal.js";
import AdvertisePropertyModal from "../components/AdvertisePropertyModal.js";
import { Loader } from "../../../components/Loader.js";
const PropertyDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isAdvertiseModalOpen, setIsAdvertiseModalOpen] = useState(false);
    const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
    const [isAssignTenantModalOpen, setIsAssignTenantModalOpen] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState("");
    useEffect(() => {
        if (id) {
            fetchProperty();
        }
    }, [id]);
    const fetchProperty = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getProperty(id);
            setProperty(response.data);
        }
        catch (err) {
            setError(err.response?.data?.error || "Failed to fetch property details");
        }
        finally {
            setLoading(false);
        }
    };
    const handleAddRoom = async (roomData) => {
        try {
            await createRoom(id, roomData);
            setIsAddRoomModalOpen(false);
            fetchProperty();
        }
        catch (err) {
            setError(err.response?.data?.error || "Failed to add room");
        }
    };
    const handleDeleteRoom = async (roomId) => {
        if (window.confirm("Are you sure you want to delete this room?")) {
            try {
                await deleteRoom(roomId);
                fetchProperty();
            }
            catch (err) {
                setError(err.response?.data?.error || "Failed to delete room");
            }
        }
    };
    const handleAssignTenant = async (userId) => {
        try {
            await assignTenant(selectedRoomId, userId);
            setIsAssignTenantModalOpen(false);
            fetchProperty();
        }
        catch (err) {
            setError(err.response?.data?.error || "Failed to assign tenant");
        }
    };
    const handleRemoveTenant = async (roomId) => {
        if (window.confirm("Are you sure you want to remove this tenant?")) {
            try {
                await removeTenant(roomId);
                fetchProperty();
            }
            catch (err) {
                setError(err.response?.data?.error || "Failed to remove tenant");
            }
        }
    };
    const openAssignTenantModal = (roomId) => {
        setSelectedRoomId(roomId);
        setIsAssignTenantModalOpen(true);
    };
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "vacant":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "occupied":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
            case "maintenance":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
            case "reserved":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
        }
    };
    if (loading)
        return _jsx("div", { children: _jsx(Loader, {}) });
    if (error) {
        return (_jsxs("div", { className: "p-6", children: [_jsx("div", { className: "mb-6", children: _jsxs("button", { onClick: () => navigate("/landlord/dashboard/properties"), className: "inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700", children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back to Properties"] }) }), _jsx("div", { className: "p-4 bg-red-100 text-red-700 rounded-md", children: error })] }));
    }
    if (!property) {
        return (_jsxs("div", { className: "p-6", children: [_jsx("div", { className: "mb-6", children: _jsxs("button", { onClick: () => navigate("/landlord/properties"), className: "inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700", children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back to Properties"] }) }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center", children: [_jsx(AlertTriangle, { className: "h-12 w-12 mx-auto text-yellow-500" }), _jsx("h3", { className: "mt-2 text-lg font-medium text-gray-900 dark:text-white", children: "Property not found" })] })] }));
    }
    return (_jsxs("div", { className: "p-6", children: [_jsx("div", { className: "mb-6", children: _jsxs("button", { onClick: () => navigate("/landlord/properties"), className: "inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700", children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back to Properties"] }) }), _jsx("div", { className: "sm:flex-row bg-white dark:bg-gray-900 rounded-lg shadow mb-6", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-gray-950/80 p-4 rounded-lg shadow-md mb-4", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Building, { className: "h-10 w-10 text-primary-600 dark:text-primary-500 mr-4" }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl sm:text-2xl font-bold text-gray-900 dark:text-white", children: property.name }), _jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: [property.area, ", ", property.city] })] })] }), _jsxs("button", { onClick: () => setIsAdvertiseModalOpen(true), className: "mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-md shadow", children: ["\uD83D\uDCE3 Advertise ", property.name] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [_jsxs("div", { className: "bg-gray-50 dark:bg-gray-950/80 p-4 rounded-md", children: [_jsx("div", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Total Units" }), _jsx("div", { className: "mt-1 text-xl font-semibold text-gray-900 dark:text-white", children: property.rooms.length })] }), _jsxs("div", { className: "bg-gray-50 dark:bg-gray-950/80 p-4 rounded-md", children: [_jsx("div", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Vacant Units" }), _jsx("div", { className: "mt-1 text-xl font-semibold text-gray-900 dark:text-white", children: property.rooms.filter((room) => room.status === "vacant")
                                                .length })] })] })] }) }), _jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-lg shadow", children: [_jsxs("div", { className: "px-6 py-4 border-b border-gray-200 dark:border-primary-600/30 flex justify-between items-center", children: [_jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-white", children: "Rooms" }), _jsxs("div", { className: "flex space-x-2", children: [_jsxs("button", { onClick: fetchProperty, className: "inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700", children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Refresh"] }), _jsxs("button", { onClick: () => setIsAddRoomModalOpen(true), className: "inline-flex items-center px-3 py-2 border border-primary-600 dark:border-primary-500 shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add Room"] })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-primary-600/30", children: [_jsx("thead", { className: "bg-gray-50 dark:bg-gray-900", children: _jsxs("tr", { children: [_jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Room Number" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Status" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Tenant" }), _jsx("th", { scope: "col", className: "relative px-6 py-3 text-right", children: "Actions" })] }) }), _jsx("tbody", { className: "bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-primary-600/10", children: property.rooms.map((room) => (_jsxs("tr", { children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: room.room_number }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("span", { className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(room.status)}`, children: room.status.charAt(0).toUpperCase() +
                                                        room.status.slice(1) }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: room.status === "occupied" && room.tenantInfo ? (_jsxs("div", { className: "flex items-center", children: [_jsx(User, { className: "h-4 w-4 mr-2 text-gray-400" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-gray-900 dark:text-white", children: room.tenantInfo.name }), _jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: room.tenantInfo.email })] })] })) : (_jsx("span", { className: "text-gray-400", children: "No tenant assigned" })) }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2", children: [room.status === "occupied" ? (_jsxs("button", { onClick: () => handleRemoveTenant(room._id), className: "inline-flex items-center px-2 py-1 border bg:red text-red-600 rounded hover:bg-red-600 hover:text-white", children: [_jsx(Trash2, { className: "h-4 w-4 mr-1" }), "Remove Tenant"] })) : (_jsxs("button", { onClick: () => openAssignTenantModal(room._id), className: "inline-flex items-center px-2 py-1 border border-primary-600 text-primary-600 rounded hover:bg-primary-600 hover:text-white", children: [_jsx(User, { className: "h-4 w-4 mr-1" }), "Assign Tenant"] })), _jsxs("button", { onClick: () => handleDeleteRoom(room._id), className: "inline-flex items-center px-2 py-1 border border-gray-400 text-gray-600 rounded hover:bg-gray-400 hover:text-white", children: [_jsx(Trash2, { className: "h-4 w-4 mr-1" }), "Delete"] })] })] }, room._id))) })] }) })] }), _jsx(AddRoomModal, { isOpen: isAddRoomModalOpen, onClose: () => setIsAddRoomModalOpen(false), onSubmit: handleAddRoom, propertyId: id }), _jsx(AssignTenantModal, { isOpen: isAssignTenantModalOpen, onClose: () => setIsAssignTenantModalOpen(false), onSubmit: handleAssignTenant, roomId: selectedRoomId }), property && (_jsx(AdvertisePropertyModal, { isOpen: isAdvertiseModalOpen, onClose: () => setIsAdvertiseModalOpen(false), property: {
                    _id: property._id,
                    name: property.name,
                    city: property.city,
                    area: property.area,
                }, onSuccess: () => {
                    // Optional success handling
                    alert("Property listed successfully!");
                } }))] }));
};
export default PropertyDetailPage;
