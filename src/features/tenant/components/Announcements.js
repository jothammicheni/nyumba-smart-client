import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Bell } from 'lucide-react';
const announcements = [
    {
        id: 1,
        title: "Water Maintenance",
        message: "Water will be shut off on Saturday from 10am to 2pm for maintenance.",
        date: "2023-05-15",
    },
    {
        id: 2,
        title: "New Security Measures",
        message: "We have installed new security cameras in the common areas.",
        date: "2023-05-01",
    },
];
const Announcements = () => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };
    return (_jsx(_Fragment, { children: _jsx("div", { className: "mt-8", children: _jsxs("div", { className: "bg-white dark:bg-gray-950/50 shadow rounded-lg", children: [_jsx("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-600/20", children: _jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-white", children: "Announcements" }) }), _jsx("div", { className: "px-4 py-5 sm:p-6", children: _jsx("div", { className: "flow-root", children: _jsx("ul", { className: "-my-5 divide-y divide-gray-200 dark:divide-primary-600/10", children: announcements.map((announcement) => (_jsx("li", { className: "py-4", children: _jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: "flex-shrink-0 pt-1", children: _jsx("div", { className: "w-12 h-12 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-4", children: _jsx(Bell, { className: "w-6 h-6 text-primary-600 dark:text-primary-600" }) }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white", children: announcement.title }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: formatDate(announcement.date) })] }), _jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: announcement.message })] })] }) }, announcement.id))) }) }) })] }) }) }));
};
export default Announcements;
