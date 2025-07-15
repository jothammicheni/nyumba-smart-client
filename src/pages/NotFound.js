import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const NotFound = () => {
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "max-w-md w-full space-y-8 text-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-9xl font-extrabold text-primary-500", children: "404" }), _jsx("h2", { className: "mt-6 text-3xl font-bold text-gray-900 dark:text-white", children: "Page Not Found" }), _jsx("p", { className: "mt-2 text-sm text-gray-600 dark:text-gray-400", children: "The page you're looking for doesn't exist or has been moved." })] }), _jsx("div", { className: "mt-8", children: _jsx(Link, { to: "/", className: "inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: "Go back home" }) })] }) }));
};
export default NotFound;
