import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const RentPaymentModal = ({ open, tenant, onClose, onSubmit }) => {
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("mpesa");
    const [mpesaCode, setMpesaCode] = useState("");
    useEffect(() => {
        if (open && tenant) {
            setAmount(String(tenant.lease?.balance ?? ""));
            setMethod("mpesa");
            setMpesaCode("");
        }
    }, [open, tenant]);
    if (!open || !tenant)
        return null;
    const handleProceed = () => {
        const amt = parseFloat(amount);
        if (isNaN(amt) || amt <= 0)
            return alert("Enter a valid amount.");
        if ((method === "mpesa" || method === "bank") && !mpesaCode.trim()) {
            return alert("Enter the Mpesa/Bank code.");
        }
        onSubmit(amt, method, mpesaCode.trim());
    };
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md", children: [_jsxs("h2", { className: "text-xl font-semibold mb-4", children: ["Rent Payment for ", tenant.user.name] }), _jsx("label", { className: "block mb-2", children: "Payment Method" }), _jsxs("select", { className: "w-full mb-4 p-2 border rounded", value: method, onChange: (e) => setMethod(e.target.value), children: [_jsx("option", { value: "mpesa", children: "Mpesa" }), _jsx("option", { value: "bank", children: "Bank" }), _jsx("option", { value: "cash", children: "Cash" }), _jsx("option", { value: "other", children: "Other" })] }), (method === "mpesa" || method === "bank") && (_jsxs(_Fragment, { children: [_jsx("label", { className: "block mb-2", children: method === "mpesa" ? "Mpesa Code" : "Bank Payment Code" }), _jsx("input", { type: "text", className: "w-full mb-4 p-2 border rounded", placeholder: "Enter code", value: mpesaCode, onChange: (e) => setMpesaCode(e.target.value) })] })), _jsx("label", { className: "block mb-2", children: "Amount" }), _jsx("input", { type: "number", className: "w-full mb-6 p-2 border rounded", value: amount, onChange: (e) => setAmount(e.target.value) }), _jsxs("div", { className: "flex justify-end space-x-3", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 border rounded", children: "Cancel" }), _jsx("button", { onClick: handleProceed, className: "px-4 py-2 bg-primary-600 text-white rounded", children: "Proceed" })] })] }) }));
};
export default RentPaymentModal;
