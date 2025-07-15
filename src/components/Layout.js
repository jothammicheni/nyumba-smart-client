import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Layout = ({ includeNavbar = true, includeFooter = true }) => {
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100", children: [includeNavbar && _jsx(Navbar, {}), _jsx("main", { className: `flex-grow ${includeNavbar ? "pt-16" : ""}`, children: _jsx(Outlet, {}) }), includeFooter && _jsx(Footer, {})] }));
};
export default Layout;
