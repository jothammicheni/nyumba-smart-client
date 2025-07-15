"use client";

import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import * as html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";

interface PaymentRecord {
  _id: string;
  status: "pending" | "success" | "failed" | "refunded";
  mpesa_code?: string;
  payerPhone?: string;
  paidAmount?: number;
  timestamp: string;
  amount: number;
}

interface TenantInfo {
  tenantName: string;
  propertyName: string;
  roomNumber: string;
}

interface ReceiptModalProps {
  payment: PaymentRecord;
  tenantInfo: TenantInfo;
  onClose: () => void;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({ payment, tenantInfo, onClose }) => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!payment) return null;

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
    if (isDownloading) return; // Prevent multiple clicks
    if (!receiptRef.current) return;

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
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      <div
        className="bg-white rounded-lg p-6 w-11/12 max-w-md relative shadow-lg"
        onClick={(e) => e.stopPropagation()}
        ref={receiptRef}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-xl"
          aria-label="Close receipt modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">Payment Receipt</h2>

        <div className="space-y-3 text-gray-700">
          <p><strong>Tenant:</strong> {tenantInfo.tenantName}</p>
          <p><strong>Property:</strong> {tenantInfo.propertyName}</p>
          <p><strong>Room Number:</strong> {tenantInfo.roomNumber}</p>
          <p><strong>Date:</strong> {paymentDate}</p>
          <p><strong>Amount Paid:</strong> Ksh {amount.toLocaleString()}</p>
          {payment.mpesa_code && <p><strong>Mpesa Code:</strong> {payment.mpesa_code}</p>}
          {payment.payerPhone && <p><strong>Payer Phone:</strong> {payment.payerPhone}</p>}
          <p><strong>Status:</strong> {payment.status.toUpperCase()}</p>
        </div>

        {/* QR Code containing receipt info JSON */}
        <div className="mt-4 flex justify-center">
          <QRCodeSVG value={receiptInfo} size={128} includeMargin={true} />
        </div>

        {/* Download Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={downloadPDF}
            disabled={isDownloading}
            className={`px-4 py-2 rounded text-white transition ${
              isDownloading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isDownloading ? "Downloading..." : "Download PDF"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
