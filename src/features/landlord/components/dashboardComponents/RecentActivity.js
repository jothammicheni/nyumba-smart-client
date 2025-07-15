import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CreditCard, Home, Wrench } from 'lucide-react';
const RecentActivity = () => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
            minimumFractionDigits: 0,
        }).format(amount);
    };
    const recentActivities = [
        { id: 1, type: "payment", user: "John Doe", amount: 25000, date: "2023-05-18", status: "completed" },
        { id: 2, type: "maintenance", user: "Sarah Smith", issue: "Plumbing issue", date: "2023-05-17", status: "pending" },
        { id: 3, type: "lease", user: "Michael Johnson", property: "Apartment 4B", date: "2023-05-16", status: "completed" },
        { id: 4, type: "payment", user: "Emily Brown", amount: 30000, date: "2023-05-15", status: "completed" },
        {
            id: 5,
            type: "maintenance",
            user: "David Wilson",
            issue: "Electrical issue",
            date: "2023-05-14",
            status: "in-progress",
        },
    ];
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "bg-white dark:bg-gray-950/50 shadow-md rounded-lg", children: [_jsx("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-600/20 rounded", children: _jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-white", children: "Recent Activity" }) }), _jsxs("div", { className: "px-4 py-5 sm:p-6", children: [_jsx("div", { className: "flow-root", children: _jsx("ul", { className: "-my-5 divide-y divide-gray-200 dark:divide-primary-600/5", children: recentActivities.map((activity) => (_jsx("li", { className: "py-4", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "flex-shrink-0", children: activity.type === "payment" ? (_jsx("div", { className: "h-8 w-8 rounded-full bg-primary-600/30 dark:bg-primary-600/30 flex items-center justify-center", children: _jsx(CreditCard, { className: "h-5 w-5 text-primary-600 dark:text-primary-600" }) })) : activity.type === "maintenance" ? (_jsx("div", { className: "h-8 w-8 rounded-full bg-primary-600/30 dark:bg-primary-600/30 flex items-center justify-center", children: _jsx(Wrench, { className: "h-5 w-5 text-primary-600 dark:text-primary-600" }) })) : (_jsx("div", { className: "h-8 w-8 rounded-full bg-primary-600/30 dark:bg-primary-600/30 flex items-center justify-center", children: _jsx(Home, { className: "h-5 w-5 text-primary-600 dark:text-primary-600" }) })) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white truncate", children: activity.user }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 truncate", children: activity.type === "payment"
                                                            ? `Paid ${formatCurrency(activity.amount ?? 0)}`
                                                            : activity.type === "maintenance"
                                                                ? `Reported: ${activity.issue}`
                                                                : `New lease: ${activity.property}` })] }), _jsx("div", { children: _jsx("div", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                  ${activity.status === "completed"
                                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                        : activity.status === "pending"
                                                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}`, children: activity.status.charAt(0).toUpperCase() + activity.status.slice(1) }) })] }) }, activity.id))) }) }), _jsx("div", { className: "mt-6", children: _jsx("a", { href: "#", className: "w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-primary-600/10 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-600", children: "View all" }) })] })] }) }));
};
export default RecentActivity;
