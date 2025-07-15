import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getAuthHeaders } from '../../../services/authService.js';
import { Briefcase, CheckCircle, Clock, MapPin } from 'lucide-react';
import { Loader } from '../../../components/Loader.js';
export default function Tasks() {
    const [loading, setLoading] = useState(true);
    const [providerInfo, setProviderInfo] = useState({
        stats: {
            totalTasks: 0,
            completedTasks: 0,
            completionRate: 0,
        }
    });
    useEffect(() => {
        const fetchProviderInfo = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/providers/info', {
                    headers: getAuthHeaders(),
                    responseType: 'json'
                });
                console.log('API Response Tasks:', response.data.data);
                setProviderInfo(response.data.data);
            }
            catch (error) {
                console.error("Error fetching provider info:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchProviderInfo();
    }, []);
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
            minimumFractionDigits: 0,
        }).format(amount);
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };
    if (loading)
        return _jsx("div", { children: _jsx(Loader, {}) });
    const activeJobs = [
        {
            id: 1,
            client: "Sunshine Apartments",
            address: "123 Moi Avenue, Nairobi",
            service: "WiFi Installation",
            date: "2023-05-20",
            status: "scheduled",
            amount: 15000,
        },
        {
            id: 2,
            client: "Green Valley Residences",
            address: "456 Kenyatta Road, Nairobi",
            service: "Network Troubleshooting",
            date: "2023-05-18",
            status: "in-progress",
            amount: 5000,
        },
        {
            id: 3,
            client: "Riverside Homes",
            address: "789 Uhuru Highway, Nairobi",
            service: "WiFi Upgrade",
            date: "2023-05-25",
            status: "scheduled",
            amount: 12000,
        },
    ];
    const completedJobs = [
        {
            id: 1,
            client: "Mountain View Apartments",
            address: "321 Mombasa Road, Nairobi",
            service: "WiFi Installation",
            date: "2023-05-10",
            amount: 15000,
        },
        {
            id: 2,
            client: "Serene Gardens",
            address: "654 Ngong Road, Nairobi",
            service: "Router Replacement",
            date: "2023-05-05",
            amount: 8000,
        },
        {
            id: 3,
            client: "Urban Heights",
            address: "987 Thika Road, Nairobi",
            service: "Network Setup",
            date: "2023-04-28",
            amount: 20000,
        },
    ];
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3", children: [_jsx("div", { className: "bg-slate-100 dark:bg-gray-900 overflow-hidden shadow-md rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-4", children: _jsx(Briefcase, { className: "w-6 h-6 text-primary-600 dark:text-primary-600" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Total Jobs" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-gray-900 dark:text-white", children: providerInfo?.stats?.totalTasks ?? 0 }) })] }) })] }) }) }), _jsx("div", { className: "bg-white dark:bg-gray-900 overflow-hidden shadow-md rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-4", children: _jsx(CheckCircle, { className: "w-6 h-6 text-primary-600 dark:text-primary-600" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Completed Jobs" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-gray-900 dark:text-white", children: providerInfo?.stats?.completedTasks ?? 0 }) })] }) })] }) }) }), _jsx("div", { className: "bg-white dark:bg-gray-900 overflow-hidden shadow-md rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-4", children: _jsx(Clock, { className: "w-6 h-6 text-primary-600 dark:text-primary-600" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Pending Jobs" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-gray-900 dark:text-white", children: providerInfo?.stats?.totalTasks - providerInfo?.stats?.completedTasks || '0' }) })] }) })] }) }) })] }), _jsxs("div", { className: "mt-8 bg-slate-100 dark:bg-gray-900 shadow rounded-lg", children: [_jsxs("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-600/20 flex justify-between items-center", children: [_jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-white", children: "Active Jobs" }), _jsx("a", { href: "#", className: "text-sm font-medium text-primary-600 hover:text-primary-600 dark:hover:bg-primary-600/20 p-2 rounded", children: "View all" })] }), _jsx("div", { className: "px-4 py-5 sm:p-6", children: _jsx("div", { className: "flow-root", children: _jsx("ul", { className: "-my-5 divide-y divide-gray-200 dark:divide-primary-600/10", children: activeJobs.map((job) => (_jsx("li", { className: "py-5", children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center mb-1", children: [_jsx("p", { className: "text-lg font-medium text-gray-900 dark:text-white truncate", children: job.service }), _jsx("span", { className: `ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                  ${job.status === "scheduled"
                                                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"}`, children: job.status === "scheduled" ? "Scheduled" : "In Progress" })] }), _jsxs("p", { className: "text-sm text-gray-900 dark:text-white mb-1", children: [_jsx("span", { className: "font-medium", children: "Client:" }), " ", job.client] }), _jsxs("div", { className: "flex items-center text-sm text-gray-500 dark:text-gray-400", children: [_jsx(MapPin, { className: "flex-shrink-0 mr-1.5 h-4 w-4 text-primary-600 dark:text-primary-600" }), job.address] })] }), _jsxs("div", { className: "mt-4 md:mt-0 md:ml-6 flex flex-col items-end", children: [_jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white", children: formatCurrency(job.amount) }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: formatDate(job.date) }), _jsx("div", { className: "mt-2", children: _jsx("button", { type: "button", className: "inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: job.status === "scheduled" ? "Start Job" : "Complete Job" }) })] })] }) }, job.id))) }) }) })] }), _jsx("div", { className: "my-8 grid grid-cols-1 gap-8 lg:grid-cols-1", children: _jsxs("div", { className: "bg-slate-100 dark:bg-gray-900 shadow-md rounded-lg", children: [_jsxs("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-600/20 flex justify-between items-center", children: [_jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-white", children: "Recent Completed Jobs" }), _jsx("a", { href: "#", className: "text-sm font-medium text-primary-600 hover:text-primary-600 dark:hover:bg-primary-600/20 p-2 rounded", children: "View all" })] }), _jsx("div", { className: "px-4 py-5 sm:p-6", children: _jsx("div", { className: "flow-root", children: _jsx("ul", { className: "-my-5 divide-y divide-gray-200 dark:divide-primary-600/10", children: completedJobs.map((job) => (_jsx("li", { className: "py-4", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("div", { className: "h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center", children: _jsx(CheckCircle, { className: "h-5 w-5 text-green-600 dark:text-green-400" }) }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white truncate", children: job.service }), _jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: [job.client, " - ", formatDate(job.date)] })] }), _jsx("div", { className: "text-right", children: _jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white", children: formatCurrency(job.amount) }) })] }) }, job.id))) }) }) })] }) })] }));
}
