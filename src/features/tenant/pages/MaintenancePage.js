import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import NewRequestModal from "../components/NewRequestModal.js";
import { getMaintananceRequests } from "../../../services/maintananceService.js";
import { Loader } from "../../../components/Loader.js";
const MaintananceRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await getMaintananceRequests("");
            setRequests(res.data || []);
        }
        catch (err) {
            console.error("Failed to load requests");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchRequests();
    }, []);
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    const statusIcon = (status) => {
        switch (status) {
            case "completed":
                return _jsx(CheckCircle, { className: "text-green-600", size: 20 });
            case "in_progress":
            case "assigned":
                return _jsx(Clock, { className: "text-blue-600", size: 20 });
            default:
                return _jsx(AlertTriangle, { className: "text-yellow-600", size: 20 });
        }
    };
    const statusBadgeStyle = {
        completed: "bg-green-100 text-green-700",
        in_progress: "bg-blue-100 text-blue-700",
        assigned: "bg-blue-100 text-blue-700",
        pending: "bg-yellow-100 text-yellow-700",
        cancelled: "bg-gray-100 text-gray-700",
    };
    const priorityColor = {
        low: "text-green-600",
        medium: "text-yellow-600",
        high: "text-orange-600",
        urgent: "text-red-600",
    };
    if (loading)
        return _jsx("div", { children: _jsx(Loader, {}) });
    return (_jsxs("div", { className: "bg-slate-100 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden", children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-primary-600/20", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-gray-800 dark:text-white", children: "Maintenance Requests" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Track and manage all reported issues" })] }), _jsx(NewRequestModal, { onRequestCreated: fetchRequests })] }), _jsx("div", { className: "p-4 space-y-4", children: requests.length === 0 ? (_jsx("div", { className: "text-center text-sm text-gray-500 dark:text-gray-400", children: "No maintenance requests found." })) : (_jsx("ul", { className: "grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4", children: requests.map((request) => (_jsxs("li", { className: "bg-slate-50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 dark:hover:border-primary-600/20 hover:scale-105 transition-all duration-300 rounded-lg p-6 shadow-md flex gap-4 items-start", children: [_jsx("div", { className: "flex-shrink-0 pt-1", children: statusIcon(request.status) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("p", { className: "font-medium text-gray-900 dark:text-gray-100", children: request.description }), _jsx("span", { className: `px-2 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap ${statusBadgeStyle[request.status]}`, children: request.status.replace("_", " ").toUpperCase() })] }), _jsxs("div", { className: "mt-2 flex flex-wrap text-xs text-gray-500 dark:text-gray-400 gap-x-4", children: [_jsxs("span", { children: ["Reported on ", formatDate(request.createdAt)] }), request.priority && (_jsxs("span", { className: priorityColor[request.priority], children: ["Priority: ", request.priority.toUpperCase()] })), request.serviceType && (_jsxs("span", { className: "text-gray-400", children: ["Type: ", request.serviceType.charAt(0).toUpperCase() + request.serviceType.slice(1)] }))] })] })] }, request._id))) })) })] }));
};
export default MaintananceRequestsPage;
