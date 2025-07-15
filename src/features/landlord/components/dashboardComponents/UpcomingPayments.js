import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Calendar } from 'lucide-react';
const UpcomingPayments = () => {
    const upcomingPayments = [
        { id: 1, tenant: "Alice Johnson", property: "Apartment 2A", amount: 25000, dueDate: "2023-05-25" },
        { id: 2, tenant: "Robert Smith", property: "Apartment 3C", amount: 30000, dueDate: "2023-05-26" },
        { id: 3, tenant: "Mary Davis", property: "Apartment 1B", amount: 22000, dueDate: "2023-05-28" },
        { id: 4, tenant: "James Wilson", property: "Apartment 5D", amount: 28000, dueDate: "2023-05-30" },
    ];
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
            minimumFractionDigits: 0,
        }).format(amount);
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "bg-white dark:bg-gray-950/50 shadow-md rounded-lg", children: [_jsx("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-600/20 rounded", children: _jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-white", children: "Upcoming Payments" }) }), _jsxs("div", { className: "px-4 py-5 sm:p-6", children: [_jsx("div", { className: "flow-root", children: _jsx("ul", { className: "-my-5 divide-y divide-gray-200 dark:divide-primary-600/5", children: upcomingPayments.map((payment) => (_jsx("li", { className: "py-4", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("div", { className: "h-8 w-8 rounded-full bg-primary-600/30 dark:bg-primary-600/30 flex items-center justify-center", children: _jsx(Calendar, { className: "h-5 w-5 text-primary-600 dark:text-primary-600" }) }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white truncate", children: payment.tenant }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 truncate", children: payment.property })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white", children: formatCurrency(payment.amount) }), _jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: ["Due: ", new Date(payment.dueDate).toLocaleDateString()] })] })] }) }, payment.id))) }) }), _jsx("div", { className: "mt-6", children: _jsx("a", { href: "#", className: "w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-primary-600/10 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-600", children: "View all" }) })] })] }) }));
};
export default UpcomingPayments;
