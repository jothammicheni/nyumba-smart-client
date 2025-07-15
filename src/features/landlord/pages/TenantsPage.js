/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Users, Search, RefreshCw, User } from "lucide-react";
import { getTenants } from "../../../services/propertyService.js";
import AddTenantModal from "../components/AddTenantModal.js";
import TenantActionsModal from "../components/TenantModals/TenantActionsModal.js";
import RentPaymentModal from "../components/TenantModals/RentPaymentModal.js";
import ConfirmPaymentModal from "../components/TenantModals/ConfirmPaymentModal.js";
import axios from "axios";
import { getAuthHeaders } from "../../../services/authService.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const TenantsPage = () => {
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState(null);
    const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);
    const [isRentPaymentOpen, setIsRentPaymentOpen] = useState(false);
    const [paymentTenant, setPaymentTenant] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [confirmData, setConfirmData] = useState(null);
    const fetchTenants = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getTenants();
            setTenants(response.data || []);
        }
        catch (err) {
            const errorMsg = err.response?.data?.error || "Failed to fetch tenants";
            setError(errorMsg);
            toast.error(errorMsg);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTenants();
    }, []);
    const filteredTenants = tenants.filter((tenant) => {
        if (!tenant?.user || !tenant?.room)
            return false;
        const searchLower = searchTerm.toLowerCase();
        const nameMatch = tenant.user.name?.toLowerCase().includes(searchLower) ?? false;
        const emailMatch = tenant.user.email?.toLowerCase().includes(searchLower) ?? false;
        const roomMatch = tenant.room.room_number?.toLowerCase().includes(searchLower) ?? false;
        return nameMatch || emailMatch || roomMatch;
    });
    const formatDate = (dateString) => {
        if (!dateString)
            return "N/A";
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
            });
        }
        catch {
            return "Invalid date";
        }
    };
    const formatCurrency = (amount) => {
        if (amount === undefined || amount === null)
            return "$0.00";
        return amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        });
    };
    const openRentPayment = (tenant) => {
        if (!tenant)
            return;
        setPaymentTenant(tenant);
        setIsRentPaymentOpen(true);
    };
    const handleRentPaymentSubmit = (amount, method, mpesaCode) => {
        if (!paymentTenant)
            return;
        setIsRentPaymentOpen(false);
        setConfirmData({
            tenant: paymentTenant,
            amount,
            method,
            mpesaCode
        });
        setIsConfirmOpen(true);
    };
    const handleConfirmPayment = async () => {
        if (!confirmData?.tenant) {
            toast.error("Invalid payment data");
            return;
        }
        const { tenant, amount, method, mpesaCode } = confirmData;
        try {
            await axios.post("http://localhost:5000/api/payment/update", {
                tenantId: tenant.user._id,
                roomId: tenant.room._id,
                propertyId: tenant.room.property_id,
                amount,
                method,
                mpesa_code: mpesaCode,
            }, { headers: getAuthHeaders() });
            toast.success("Payment confirmed successfully!");
            setIsConfirmOpen(false);
            setConfirmData(null);
            setPaymentTenant(null);
            await fetchTenants();
        }
        catch (err) {
            console.error("Payment failed:", err);
            toast.error("Payment failed: " + (err.response?.data?.error || err.message));
        }
    };
    return (_jsxs("div", { className: "p-4 max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "My Tenants" }), _jsxs("button", { onClick: fetchTenants, className: "flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700", children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), " Refresh"] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-center mb-4 gap-3", children: [_jsxs("div", { className: "relative w-full sm:max-w-md", children: [_jsx(Search, { className: "absolute top-2.5 left-3 h-5 w-5 text-gray-400" }), _jsx("input", { type: "text", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white", placeholder: "Search tenants..." })] }), _jsx("button", { onClick: () => setIsAddModalOpen(true), className: "px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-md hover:bg-primary-700", children: "Add New Tenant" })] }), error && (_jsx("div", { className: "p-4 bg-red-100 text-red-700 rounded mb-4", children: error })), _jsx("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow", children: loading ? (_jsx("div", { className: "flex justify-center items-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" }) })) : filteredTenants.length === 0 ? (_jsxs("div", { className: "p-6 text-center", children: [_jsx(Users, { className: "h-12 w-12 mx-auto text-gray-400" }), _jsx("h3", { className: "mt-2 text-lg font-medium text-gray-900 dark:text-white", children: "No tenants found" }), _jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: searchTerm ? "Try adjusting your search terms" : "You don't have any tenants yet" })] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-[700px] w-full divide-y divide-gray-200 dark:divide-gray-700", children: [_jsx("thead", { className: "bg-gray-50 dark:bg-gray-700", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left text-xs font-medium", children: "Tenant" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-medium", children: "Rent Status" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-medium", children: "Balance" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-medium", children: "Status" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-medium", children: "Joined" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-medium", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-200 dark:divide-gray-700", children: filteredTenants.map((tenant) => {
                                    if (!tenant?.user || !tenant?.room)
                                        return null;
                                    const isPaid = tenant.lease?.balance === 0;
                                    const balance = tenant.lease?.balance ?? 0;
                                    return (_jsxs("tr", { children: [_jsx("td", { className: "px-4 py-3", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center", children: _jsx(User, { className: "h-6 w-6 text-gray-500 dark:text-gray-400" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium", children: tenant.user.name || "N/A" }), _jsx("div", { className: "text-xs text-gray-500", children: tenant.user.email || "N/A" }), tenant.user.phone && (_jsx("div", { className: "text-xs text-gray-500", children: tenant.user.phone }))] })] }) }), _jsx("td", { className: "px-4 py-3 text-sm", children: isPaid ? (_jsx("span", { className: "text-green-700 bg-green-100 px-2 py-1 rounded text-xs font-semibold", children: "Paid" })) : (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-red-700 bg-red-100 px-2 py-1 rounded text-xs font-semibold", children: "Pending" }), _jsx("button", { className: "ml-3 text-primary-600 underline text-xs hover:text-primary-700", onClick: () => openRentPayment(tenant), children: "Mark as Paid" })] })) }), _jsx("td", { className: "px-4 py-3 text-sm", children: formatCurrency(balance) }), _jsx("td", { className: "px-4 py-3 text-sm", children: tenant.lease_status || "N/A" }), _jsx("td", { className: "px-4 py-3 text-sm", children: formatDate(tenant.join_date) }), _jsx("td", { className: "px-4 py-3 text-sm", children: _jsx("button", { onClick: () => {
                                                        setSelectedTenant(tenant);
                                                        setIsActionsModalOpen(true);
                                                    }, className: "text-primary-600 underline text-xs hover:text-primary-700", children: "Actions" }) })] }, tenant._id));
                                }) })] }) })) }), _jsx(AddTenantModal, { isOpen: isAddModalOpen, onClose: () => setIsAddModalOpen(false), onSuccess: fetchTenants }), selectedTenant && (_jsx(TenantActionsModal, { isOpen: isActionsModalOpen, onClose: () => setIsActionsModalOpen(false), tenant: selectedTenant, onEdit: () => {
                    // Implement edit functionality
                    setIsActionsModalOpen(false);
                    toast.info("Edit functionality coming soon");
                }, onDelete: async () => {
                    // Implement delete functionality
                    setIsActionsModalOpen(false);
                    toast.info("Delete functionality coming soon");
                }, onMarkPaid: () => {
                    setIsActionsModalOpen(false);
                    openRentPayment(selectedTenant);
                } })), paymentTenant && (_jsx(RentPaymentModal, { open: isRentPaymentOpen, onClose: () => setIsRentPaymentOpen(false), tenant: paymentTenant, onSubmit: handleRentPaymentSubmit })), confirmData && (_jsx(ConfirmPaymentModal, { open: isConfirmOpen, onClose: () => setIsConfirmOpen(false), confirmData: confirmData, onConfirm: handleConfirmPayment }))] }));
};
export default TenantsPage;
