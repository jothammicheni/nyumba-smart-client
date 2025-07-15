import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthHeaders } from "../../../services/authService.js";
import { Loader } from "../../../components/Loader.js";
function WelcomeInfo() {
    const [tenantInfo, setTenantInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [phone, setPhone] = useState("");
    const [paying, setPaying] = useState(false);
    const [message, setMessage] = useState(null);
    useEffect(() => {
        const fetchTenantInfo = async () => {
            try {
                const response = await axios.get("https://nyumba-smart-server.onrender.com/api/tenants/info", {
                    headers: getAuthHeaders(),
                });
                setTenantInfo(response.data);
            }
            catch (error) {
                console.error("Error fetching tenant info:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchTenantInfo();
    }, []);
    const initiatePayment = async () => {
        // Check if the phone number is provided
        if (!phone) {
            setMessage({ type: "error", text: "Please enter your phone number" });
            return;
        }
        setPaying(true); // Indicate that payment processing is ongoing
        setMessage(null); // Clear any previous messages
        try {
            // Initiate the payment
            const response = await axios.post(
            // "https://nyumba-smart-server.onrender.com/api/payment/pay",
            "http://localhost:5000/api/payment/pay", {
                sender_id: tenantInfo._id, // Use tenant's ID
                phone,
                amount: tenantInfo.amountDue || 100, // Use the due amount or default to 100
            }, {
                headers: getAuthHeaders(), // Include authorization headers
            });
            console.log("✅ STK Push Sent:", response.data.mpesaRes);
            setMessage({ type: "success", text: "STK push sent. Check your phone to complete payment." });
            setShowModal(false); // Close the modal
            setPhone(""); // Clear the phone input
            // Get the payment ID from the response
            const paymentId = response.data.mpesaRes.CheckoutRequestID; // Ensure this is defined
            console.log("Payment ID for status check:", paymentId); // Debug log
            // Start polling for payment status
            const maxRetries = 12; // Maximum retries (e.g., 1 minute)
            let attempts = 0;
            const pollInterval = setInterval(async () => {
                try {
                    // Check if paymentId is defined before making the request
                    if (!paymentId) {
                        console.error("Payment ID is undefined. Stopping polling.");
                        clearInterval(pollInterval);
                        setMessage({ type: "error", text: "Payment ID is undefined. Cannot check status." });
                        return;
                    }
                    // Check the payment status using the payment ID
                    const statusRes = await axios.get(`https://nyumba-smart-server.onrender.com/api/payment/status/${paymentId}`, // Include payment ID in the URL
                    {
                        headers: getAuthHeaders(), // Include authorization headers
                    });
                    const status = statusRes.data.status; // Get the payment status
                    console.log("📡 Payment status:", status);
                    // Handle different payment statuses
                    if (status === "success") {
                        clearInterval(pollInterval); // Stop polling
                        setMessage({
                            type: "success",
                            text: "✅ Rent paid successfully. Refresh the page.",
                        });
                    }
                    else if (status === "failed") {
                        clearInterval(pollInterval); // Stop polling
                        setMessage({
                            type: "error",
                            text: "❌ Payment failed or cancelled. Try again.",
                        });
                    }
                    attempts++; // Increment the attempt counter
                    // Check if maximum retries have been reached
                    if (attempts >= maxRetries) {
                        clearInterval(pollInterval); // Stop polling
                        setMessage({
                            type: "error",
                            text: "⏳ Payment is still pending. Try again later.",
                        });
                    }
                }
                catch (pollErr) {
                    console.error("Error checking payment status:", pollErr);
                }
            }, 5000); // Poll every 5 seconds
        }
        catch (error) {
            // Handle errors during payment initiation
            setMessage({
                type: "error",
                text: axios.isAxiosError(error) && error.response?.data?.error
                    ? error.response.data.error
                    : "Payment initiation failed.",
            });
        }
        finally {
            setPaying(false); // Reset the paying state
        }
    };
    if (loading)
        return _jsx(Loader, {});
    if (!tenantInfo)
        return _jsx("div", { className: "text-center p-4", children: "No tenant information available." });
    return (_jsxs("div", { className: "bg-white dark:bg-gray-950/50 shadow", children: [_jsxs("div", { className: "px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8", children: [_jsxs("div", { className: "py-6 md:flex md:items-center md:justify-between", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("h2", { className: "text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate", children: ["Welcome, ", tenantInfo.tenantName] }), _jsxs("p", { className: "mt-1 text-base text-gray-500 dark:text-gray-400", children: [_jsx("span", { className: "italic text-sm text-gray-600", children: "Apartment: " }), " ", tenantInfo.propertyName, " - ", _jsx("span", { className: "italic text-sm text-gray-600", children: "Room: " }), " ", tenantInfo.roomNumber] })] }), _jsx("div", { className: "mt-4 flex md:mt-0 md:ml-4", children: _jsx("button", { type: "button", onClick: () => setShowModal(true), className: "ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: "Pay Rent" }) })] }), message && (_jsx("div", { className: `mt-4 px-4 py-3 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: message.text }))] }), showModal && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg shadow-xl p-6 w-full max-w-md", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Confirm M-Pesa Payment" }), _jsx("label", { className: "block mb-2 text-sm text-gray-700", children: "Enter Phone Number:" }), _jsx("input", { type: "text", value: phone, onChange: (e) => setPhone(e.target.value), className: "w-full border px-3 py-2 rounded mb-4", placeholder: "e.g., 254712345678" }), _jsxs("div", { className: "flex justify-end space-x-2", children: [_jsx("button", { onClick: () => setShowModal(false), className: "px-4 py-2 rounded border border-gray-300 bg-gray-100 hover:bg-gray-200", children: "Cancel" }), _jsx("button", { onClick: initiatePayment, disabled: paying, className: "px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700", children: paying ? "Processing..." : "Pay Now" })] })] }) }))] }));
}
export default WelcomeInfo;
