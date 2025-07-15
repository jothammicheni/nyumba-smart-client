import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CreditCard } from 'lucide-react';
const paymentHistory = [
    { id: 1, date: "2023-05-03", amount: 25000, status: "completed", reference: "MPE123456789" },
    { id: 2, date: "2023-04-04", amount: 25000, status: "completed", reference: "MPE987654321" },
    { id: 3, date: "2023-03-02", amount: 25000, status: "completed", reference: "MPE456789123" },
    { id: 4, date: "2023-02-05", amount: 25000, status: "completed", reference: "MPE789123456" },
];
const PaymentHistory = () => {
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
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "bg-white dark:bg-gray-800 shadow rounded-lg", children: [_jsxs("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center", children: [_jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-white", children: "Payment History" }), _jsx("a", { href: "#", className: "text-sm font-medium text-primary-600 hover:text-primary-500", children: "View all" })] }), _jsx("div", { className: "px-4 py-5 sm:p-6", children: _jsx("div", { className: "flow-root", children: _jsx("ul", { className: "-my-5 divide-y divide-gray-200 dark:divide-gray-700", children: paymentHistory.map((payment) => (_jsx("li", { className: "py-4", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("div", { className: "h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center", children: _jsx(CreditCard, { className: "h-5 w-5 text-green-600 dark:text-green-400" }) }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white truncate", children: "Rent Payment" }), _jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: ["Ref: ", payment.reference] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white", children: formatCurrency(payment.amount) }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: formatDate(payment.date) })] })] }) }, payment.id))) }) }) })] }) }));
};
export default PaymentHistory;
