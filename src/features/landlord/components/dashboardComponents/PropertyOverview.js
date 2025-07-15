/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AlertTriangle, Building, Home, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getPropertyStats } from '../../../../services/propertyService.js';
import { fetchLandlordMaintenanceRequests } from '../../../../services/maintananceService.js';
import { Loader } from '../../../../components/Loader.js';
function PropertyOverview() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [totalMaintanance, setTotalMaintanance] = useState(0);
    const [propertyStats, setPropertyStats] = useState({
        totalProperties: 0,
        totalRooms: 0,
        occupiedRooms: 0,
        vacantRooms: 0,
        maintenanceRooms: totalMaintanance,
        occupancyRate: 0,
    });
    useEffect(() => {
        fetchPropertyStats();
    }, []);
    const fetchPropertyStats = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getPropertyStats();
            console.log(response.data);
            setPropertyStats(response.data);
        }
        catch (err) {
            setError(err.response?.data?.error || "Failed to fetch property statistics");
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await fetchLandlordMaintenanceRequests();
                console.log("hello", data);
                setTotalMaintanance(data.length);
            }
            catch (error) {
                console.error("Failed to fetch maintenance requests", error);
            }
        };
        fetchRequests();
    }, []);
    if (loading)
        return _jsx(Loader, {});
    return (_jsxs(_Fragment, { children: [_jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-white mt-8 mb-4", children: "Property Overview" }), _jsxs("div", { className: "grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4", children: [_jsx("div", { className: "bg-white dark:bg-gray-950/50 overflow-hidden shadow-md rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center justify-center", children: [_jsx("div", { className: "w-10 h-10 bg-green-600/30 dark:bg-green-600/30 rounded-full flex items-center justify-center mr-0", children: _jsx(Building, { className: "w-5 h-5 text-green-600 dark:text-green-600" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Total Properties" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-primary-500 dark:text-white", children: loading ? "..." : propertyStats.totalProperties }) })] }) })] }) }) }), _jsx("div", { className: "bg-white dark:bg-gray-950/50 overflow-hidden shadow-md rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center justify-center", children: [_jsx("div", { className: "w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-0", children: _jsx(Users, { className: "w-5 h-5 text-primary-600 dark:text-primary-600" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Occupied Units" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-primary-500 dark:text-white", children: loading ? "..." : propertyStats.occupiedRooms }) })] }) })] }) }) }), _jsx("div", { className: "bg-white dark:bg-gray-950/50 overflow-hidden shadow-md rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center justify-center", children: [_jsx("div", { className: "w-10 h-10 bg-green-600/30 dark:bg-green-600/30 rounded-full flex items-center justify-center mr-0", children: _jsx(Home, { className: "w-5 h-5 text-green-600 dark:text-green-600" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Vacant Units" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-primary-500 dark:text-white", children: loading ? "..." : propertyStats.vacantRooms }) })] }) })] }) }) }), _jsx("div", { className: "bg-white dark:bg-gray-950/50 overflow-hidden shadow-md rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center justify-center", children: [_jsx("div", { className: "w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-0", children: _jsx(AlertTriangle, { className: "w-5 h-5 text-primary-600 dark:text-primary-600" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Maintenance Requests" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-primary-500 dark:text-white", children: loading ? "..." : totalMaintanance }) })] }) })] }) }) })] })] }));
}
export default PropertyOverview;
