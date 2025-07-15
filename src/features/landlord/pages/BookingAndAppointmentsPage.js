"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { listingService } from "../../../services/listingService.js";
export default function BookingsAndAppointments() {
    const [activeTab, setActiveTab] = useState("bookings");
    const [bookings, setBookings] = useState([]);
    const [visits, setVisits] = useState([]);
    const [selected, setSelected] = useState(null);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const [bookingData, visitData] = await Promise.all([
                listingService.getAllBookings(),
                listingService.getAllVisits(),
            ]);
            setBookings(bookingData);
            setVisits(visitData);
        }
        catch (error) {
            console.error("Failed to load data", error);
        }
    };
    const markAsViewed = (id) => {
        if (activeTab === "bookings") {
            setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, viewed: true } : b)));
        }
        else {
            setVisits((prev) => prev.map((v) => (v._id === id ? { ...v, viewed: true } : v)));
        }
    };
    const deleteItem = (id) => {
        if (activeTab === "bookings") {
            setBookings((prev) => prev.filter((b) => b._id !== id));
            if (selected && selected._id === id)
                setSelected(null);
        }
        else {
            setVisits((prev) => prev.filter((v) => v._id !== id));
            if (selected && selected._id === id)
                setSelected(null);
        }
    };
    const handleSelect = (item) => {
        setSelected(item);
        markAsViewed(item._id);
    };
    const items = activeTab === "bookings" ? bookings : visits;
    return (_jsxs("div", { className: "flex flex-col md:flex-row h-screen", children: [_jsxs("div", { className: "md:w-1/3 border-r bg-white dark:bg-gray-900", children: [_jsxs("div", { className: "flex justify-center gap-2 p-4", children: [_jsx("button", { className: `px-4 py-2 rounded font-medium text-sm ${activeTab === "bookings"
                                    ? "bg-primary-600 text-white"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"}`, onClick: () => {
                                    setSelected(null);
                                    setActiveTab("bookings");
                                }, children: "Bookings" }), _jsx("button", { className: `px-4 py-2 rounded font-medium text-sm ${activeTab === "visits"
                                    ? "bg-primary-600 text-white"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"}`, onClick: () => {
                                    setSelected(null);
                                    setActiveTab("visits");
                                }, children: "Visits" })] }), _jsxs("ul", { className: "overflow-y-auto max-h-[calc(100vh-120px)]", children: [items.map((item) => (_jsxs("li", { className: `px-4 py-3 border-b hover:bg-gray-50 dark:hover:bg-gray-800 ${selected?._id === item._id ? "bg-gray-100 dark:bg-gray-800" : ""}`, children: [_jsxs("div", { className: "cursor-pointer", onClick: () => handleSelect(item), children: [_jsx("p", { className: "font-medium text-gray-900 dark:text-white", children: activeTab === "bookings"
                                                    ? item.PropertyName
                                                    : item.propertyName }), _jsx("p", { className: "text-sm text-gray-500", children: activeTab === "bookings"
                                                    ? item.phone
                                                    : item.contact }), item.viewed && (_jsx("p", { className: "text-xs text-green-600", children: "Viewed" }))] }), _jsxs("div", { className: "flex justify-end gap-2 mt-2", children: [_jsx("button", { onClick: () => markAsViewed(item._id), className: "text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300", children: "Mark as Viewed" }), _jsx("button", { onClick: () => deleteItem(item._id), className: "text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200", children: "Delete" })] })] }, item._id))), items.length === 0 && (_jsxs("p", { className: "text-center text-sm text-gray-400 py-6", children: ["No ", activeTab, " found"] }))] })] }), _jsx("div", { className: "flex-1 bg-gray-50 dark:bg-gray-950 p-6 overflow-y-auto", children: selected ? (_jsxs("div", { className: "max-w-xl mx-auto bg-white dark:bg-gray-900 shadow rounded p-6 space-y-4", children: [_jsx("h2", { className: "text-xl font-bold text-primary-600", children: activeTab === "bookings" ? "Booking Details" : "Visit Details" }), activeTab === "bookings" ? (_jsxs(_Fragment, { children: [_jsxs("p", { children: [_jsx("strong", { children: "Name:" }), " ", selected.name] }), _jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " ", selected.email] }), _jsxs("p", { children: [_jsx("strong", { children: "Phone:" }), " ", selected.phone] }), _jsxs("p", { children: [_jsx("strong", { children: "Property:" }), " ", selected.PropertyName] }), _jsxs("p", { children: [_jsx("strong", { children: "Message:" }), " ", selected.inquiryMessage || "No message"] }), _jsxs("p", { className: "text-xs text-gray-400", children: ["Created at: ", new Date(selected.createdAt).toLocaleString()] }), selected.viewed && (_jsx("p", { className: "text-sm text-green-600 font-medium", children: "Viewed" }))] })) : (_jsxs(_Fragment, { children: [_jsxs("p", { children: [_jsx("strong", { children: "Visitor:" }), " ", selected.visitorName] }), _jsxs("p", { children: [_jsx("strong", { children: "Property:" }), " ", selected.propertyName] }), _jsxs("p", { children: [_jsx("strong", { children: "Contact:" }), " ", selected.contact] }), _jsxs("p", { children: [_jsx("strong", { children: "Visit Date:" }), " ", new Date(selected.visitDate).toLocaleString()] }), selected.viewed && (_jsx("p", { className: "text-sm text-green-600 font-medium", children: "Viewed" }))] }))] })) : (_jsxs("p", { className: "text-center text-gray-500", children: ["Select a ", activeTab === "bookings" ? "booking" : "visit", " to view details."] })) })] }));
}
