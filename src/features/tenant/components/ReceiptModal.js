"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import * as html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";
const ReceiptModal = ({ payment, tenantInfo, onClose }) => {
    const receiptRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);
    if (!payment)
        return null;
    const paymentDate = new Date(payment.timestamp).toLocaleString();
    const amount = payment.paidAmount ?? payment.amount;
    // Prepare receipt info as JSON string for QR code (can customize format)
    const receiptInfo = JSON.stringify({
        tenantName: tenantInfo.tenantName,
        propertyName: tenantInfo.propertyName,
        roomNumber: tenantInfo.roomNumber,
        paymentDate,
        amountPaid: amount,
        mpesaCode: payment.mpesa_code ?? "N/A",
        payerPhone: payment.payerPhone ?? "N/A",
        status: payment.status,
        paymentId: payment._id,
    });
    const downloadPDF = async () => {
        if (isDownloading)
            return; // Prevent multiple clicks
        if (!receiptRef.current)
            return;
        try {
            setIsDownloading(true);
            const canvas = await html2canvas(receiptRef.current);
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Receipt_${payment._id}.pdf`);
        }
        catch (err) {
            console.error("PDF generation error:", err);
        }
        finally {
            setIsDownloading(false);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", onClick: onClose, role: "dialog", "aria-modal": "true", tabIndex: -1, children: _jsxs("div", { className: "bg-white rounded-lg p-6 w-11/12 max-w-md relative shadow-lg", onClick: (e) => e.stopPropagation(), ref: receiptRef, children: [_jsx("button", { onClick: onClose, className: "absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-xl", "aria-label": "Close receipt modal", children: "\u00D7" }), _jsx("h2", { className: "text-2xl font-semibold mb-4 text-center", children: "Payment Receipt" }), _jsxs("div", { className: "space-y-3 text-gray-700", children: [_jsxs("p", { children: [_jsx("strong", { children: "Tenant:" }), " ", tenantInfo.tenantName] }), _jsxs("p", { children: [_jsx("strong", { children: "Property:" }), " ", tenantInfo.propertyName] }), _jsxs("p", { children: [_jsx("strong", { children: "Room Number:" }), " ", tenantInfo.roomNumber] }), _jsxs("p", { children: [_jsx("strong", { children: "Date:" }), " ", paymentDate] }), _jsxs("p", { children: [_jsx("strong", { children: "Amount Paid:" }), " Ksh ", amount.toLocaleString()] }), payment.mpesa_code && _jsxs("p", { children: [_jsx("strong", { children: "Mpesa Code:" }), " ", payment.mpesa_code] }), payment.payerPhone && _jsxs("p", { children: [_jsx("strong", { children: "Payer Phone:" }), " ", payment.payerPhone] }), _jsxs("p", { children: [_jsx("strong", { children: "Status:" }), " ", payment.status.toUpperCase()] })] }), _jsx("div", { className: "mt-4 flex justify-center", children: _jsx(QRCodeSVG, { value: receiptInfo, size: 128, includeMargin: true }) }), _jsx("div", { className: "mt-6 flex justify-center", children: _jsx("button", { onClick: downloadPDF, disabled: isDownloading, className: `px-4 py-2 rounded text-white transition ${isDownloading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"}`, children: isDownloading ? "Downloading..." : "Download PDF" }) })] }) }));
};
export default ReceiptModal;
