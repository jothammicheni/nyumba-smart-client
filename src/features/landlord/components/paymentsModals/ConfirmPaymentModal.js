import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/ConfirmPaymentModal.tsx
import { Loader2 } from "lucide-react";
const ConfirmPaymentModal = () => {
    return (_jsx("div", { className: "fixed inset-0 z-50 bg-black/50 flex items-center justify-center", children: _jsxs("div", { className: "bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full text-center", children: [_jsx(Loader2, { className: "w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" }), _jsx("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Waiting for Payment Confirmation" }), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 mt-2", children: "Please complete the payment on your phone. This may take a few moments..." })] }) }));
};
export default ConfirmPaymentModal;
