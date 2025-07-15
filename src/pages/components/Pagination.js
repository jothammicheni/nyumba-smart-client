"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1)
        return null;
    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }
        if (currentPage - delta > 2) {
            rangeWithDots.push(1, "...");
        }
        else {
            rangeWithDots.push(1);
        }
        rangeWithDots.push(...range);
        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push("...", totalPages);
        }
        else {
            rangeWithDots.push(totalPages);
        }
        return rangeWithDots;
    };
    return (_jsx("div", { className: "mt-12 flex justify-center", children: _jsxs("nav", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: () => onPageChange(currentPage - 1), disabled: currentPage === 1, className: "p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: _jsx(ChevronLeft, { className: "h-5 w-5" }) }), getVisiblePages().map((page, index) => (_jsx(React.Fragment, { children: page === "..." ? (_jsx("span", { className: "px-4 py-2 text-gray-500 dark:text-gray-400", children: "..." })) : (_jsx("button", { onClick: () => onPageChange(page), className: `px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === page
                            ? "bg-primary-600 text-white"
                            : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"}`, children: page })) }, index))), _jsx("button", { onClick: () => onPageChange(currentPage + 1), disabled: currentPage === totalPages, className: "p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: _jsx(ChevronRight, { className: "h-5 w-5" }) })] }) }));
};
export default Pagination;
