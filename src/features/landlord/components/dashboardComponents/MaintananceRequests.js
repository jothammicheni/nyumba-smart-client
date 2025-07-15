import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { fetchLandlordMaintenanceRequests } from "../../../../services/maintananceService.js";
import { Wrench } from "lucide-react";
import { Link } from "react-router-dom";
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};
const MaintenanceRequests = () => {
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await fetchLandlordMaintenanceRequests();
                console.log("hello", data);
                setRequests(data);
            }
            catch (error) {
                console.error("Failed to fetch maintenance requests", error);
            }
        };
        fetchRequests();
    }, []);
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "bg-white dark:bg-gray-950/50 shadow rounded-lg", children: [_jsx("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-600/20", children: _jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-white", children: "Maintenance Requests" }) }), _jsxs("div", { className: "px-4 py-5 sm:p-6", children: [_jsx("div", { className: "flow-root", children: _jsx("ul", { className: "-my-5 divide-y divide-gray-200 dark:divide-gray-700", children: requests.length > 0 ? (requests.map((req) => (_jsx("li", { className: "py-4", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("div", { className: "h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center", children: _jsx(Wrench, { className: "h-5 w-5 text-primary-600 dark:text-primary-400" }) }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white truncate", children: req.tenant?.name }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 truncate", children: req.room.property_id?.name }), _jsxs("p", { className: "text-sm text-blue-500 dark:text-blue-400 truncate ", children: ["Issue: ", req.description] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white capitalize", children: req.state }), _jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: ["Reported: ", formatDate(req.createdAt)] }), _jsx(Link, { to: "properties/requests/:tenantId", className: "ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: "check" })] })] }) }, req._id)))) : (_jsx("li", { className: "text-sm text-gray-500 dark:text-gray-400 py-4", children: "No maintenance requests found." })) }) }), _jsx("div", { className: "mt-6", children: _jsx("a", { href: "/landlord/dashboard/maintenance", className: "w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900", children: "View all" }) })] })] }) }));
};
export default MaintenanceRequests;
