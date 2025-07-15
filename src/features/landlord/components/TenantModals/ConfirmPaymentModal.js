import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ConfirmPaymentModal = ({ open, confirmData, onClose, onConfirm, }) => {
    if (!open || !confirmData)
        return null;
    const { tenant, amount, method } = confirmData;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Confirm Payment" }), _jsxs("p", { children: ["Confirm payment of ", _jsxs("strong", { children: ["$", amount.toFixed(2)] }), " by", " ", _jsx("strong", { children: tenant.user.name }), " via ", _jsx("strong", { children: method }), "."] }), _jsxs("p", { className: "text-red-600 font-semibold mt-4", children: ["Note: This action ", _jsx("em", { children: "cannot" }), " be reversed."] }), _jsxs("div", { className: "flex justify-end space-x-3 mt-6", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 border rounded", children: "Cancel" }), _jsx("button", { onClick: onConfirm, className: "px-4 py-2 bg-red-600 text-white rounded", children: "Confirm" })] })] }) }));
};
export default ConfirmPaymentModal;
