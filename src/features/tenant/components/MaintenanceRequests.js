import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import NewRequestModal from "./NewRequestModal.js";
import { getMaintananceRequests } from "../../../services/maintananceService.js";
const MaintananceRequests = () => {
    const [requests, setRequests] = useState([]);
    const fetchRequests = async () => {
        try {
            const res = await getMaintananceRequests("");
            setRequests(res.data || []);
            console.log(res.data);
        }
        catch (err) {
            console.log('failed to load requests');
        }
    };
    useEffect(() => {
        fetchRequests();
    }, []);
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return (_jsxs("div", { className: "bg-slate-100 dark:bg-gray-950/50 shadow-lg rounded-lg", children: [_jsxs("div", { className: "px-4 py-4 border-b border-gray-200 dark:border-primary-600/20 flex justify-between items-center", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-800 dark:text-white", children: "Maintenance Requests" }), _jsx(NewRequestModal, { onRequestCreated: fetchRequests })] }), _jsx("div", { className: "p-4", children: _jsxs("ul", { className: "divide-y divide-gray-200 dark:divide-primary-600/10", children: [requests.map((request) => (_jsxs("li", { className: "py-3 flex items-center space-x-4", children: [_jsx("div", { children: request.status === "completed" ? (_jsx(CheckCircle, { className: "text-green-600", size: 24 })) : request.status === "in_progress" ? (_jsx(Clock, { className: "text-blue-600", size: 24 })) : (_jsx(AlertTriangle, { className: "text-yellow-600", size: 24 })) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-gray-200", children: request.description }), _jsxs("p", { className: "text-xs text-gray-500", children: ["Reported on ", formatDate(request.createdAt)] })] }), _jsx("div", { children: _jsx("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${request.status === "completed"
                                            ? "bg-green-100 text-green-800"
                                            : request.status === "in_progress"
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-yellow-100 text-yellow-800"}`, children: request.status ? request.status.replace("_", " ").toUpperCase() : "" }) })] }, request._id))), requests.length === 0 && (_jsx("li", { className: "text-center py-3 text-sm text-gray-500", children: "No maintenance requests found." }))] }) })] }));
};
export default MaintananceRequests;
