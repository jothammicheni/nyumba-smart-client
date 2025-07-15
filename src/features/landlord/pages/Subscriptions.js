import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Home, Star, DoorOpen, ClipboardList, Gem, Crown, BadgeCheck, Clock, } from "lucide-react";
import { createSubscription, getSubscription, validateSubscription, } from "../../../services/subscriptionService.js";
import { toast, Toaster } from "sonner";
import TrialModal from "../components/TrialModal.js";
import InitiatePaymentModal from "../components/paymentsModals/InitiatePaymentModal.js";
import ConfirmPaymentModal from "../components/paymentsModals/ConfirmPaymentModal.js";
import PaymentResultModal from "../components/paymentsModals/PaymentResultModal.js";
import { initiateMpesaPayment, checkMpesaPaymentStatus, // ✅ correct name
 } from "../../../services/payment.service/subscriptions/subscription.payment.service.js";
const Subscriptions = () => {
    const [selectedTier, setSelectedTier] = useState(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [activeSub, setActiveSub] = useState(null);
    const [countdown, setCountdown] = useState("");
    const [showPayment, setShowPayment] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    // Payment modal states
    const [showInitiate, setShowInitiate] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [paymentResult, setPaymentResult] = useState(null);
    // Fetch active subscription from backend
    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const res = await getSubscription();
                if (res.success) {
                    setActiveSub(res.data);
                }
                console.log("Active subscription:", res.data);
            }
            catch (err) {
                console.error("Failed to fetch subscription:", err);
            }
        };
        fetchSubscription();
    }, []);
    // Live countdown update
    useEffect(() => {
        if (!activeSub)
            return;
        const getTargetTime = () => {
            const now = new Date();
            const end = new Date(activeSub.free_trial
                ? activeSub.free_trial_end_date
                : activeSub.end_date);
            return Math.max(0, end.getTime() - now.getTime());
        };
        const formatCountdown = (ms) => {
            const totalSec = Math.floor(ms / 1000);
            const days = Math.floor(totalSec / 86400);
            const hours = Math.floor((totalSec % 86400) / 3600);
            const minutes = Math.floor((totalSec % 3600) / 60);
            const seconds = totalSec % 60;
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        };
        const updateCountdown = () => {
            const remaining = getTargetTime();
            const totalSec = Math.floor(remaining / 1000);
            const days = Math.floor(totalSec / 86400);
            setCountdown(formatCountdown(remaining));
            if (activeSub.is_free_trial_active && days <= 3) {
                setAlertMessage(`🚨 Free trial ends in ${days} day(s). Consider upgrading.`);
                setShowAlert(true);
                setShowPayment(false);
            }
            else if (!activeSub.is_active && !activeSub.is_free_trial_active) {
                setAlertMessage(`🔒 Pay for your subscription to unlock all features.`);
                setShowAlert(true);
                setShowPayment(true);
                console.log(showPayment);
            }
            else {
                setAlertMessage("");
                setShowAlert(false);
                setShowPayment(false);
            }
        };
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [activeSub]);
    // validate tier
    useEffect(() => {
        const check = async () => {
            try {
                await validateSubscription();
            }
            catch (err) {
                console.error('Validation failed:', err);
            }
        };
        check();
    }, []);
    const tiers = [
        {
            name: "Mwananchi",
            icon: _jsx(Home, { className: "w-6 h-6" }),
            priceMonthly: 0,
            priceYearly: 0,
            properties: 1,
            rooms: 4,
            vacancyListings: 0,
            topOffers: 0,
            trial: false,
            current: activeSub?.tier === "Mwananchi",
            description: "Perfect for individual property owners",
            features: [
                "Basic property management",
                "Single property support",
                "Room management",
            ],
        },
        {
            name: "Silver",
            icon: _jsx(Star, { className: "w-6 h-6" }),
            priceMonthly: 1200,
            priceYearly: 6000,
            properties: 4,
            rooms: 30,
            vacancyListings: 2,
            topOffers: 1,
            trial: true,
            current: activeSub?.tier === "Gold",
            description: "Ideal for small property portfolios",
            features: [
                "Advanced analytics",
                "Tenant screening",
                "Automated rent collection",
            ],
        },
        {
            name: "Gold",
            icon: _jsx(Gem, { className: "w-6 h-6" }),
            priceMonthly: 3000,
            priceYearly: 9000,
            properties: 4,
            rooms: 70,
            vacancyListings: 4,
            topOffers: 2,
            trial: true,
            current: activeSub?.tier === "Silver",
            description: "Most popular for professional managers",
            features: [
                "Premium listing visibility",
                "Maintenance tracking",
                "Financial reporting",
            ],
        },
        {
            name: "Diamond",
            icon: _jsx(Crown, { className: "w-6 h-6" }),
            priceMonthly: 5000,
            priceYearly: 15000,
            properties: 4,
            rooms: 1000,
            vacancyListings: "Unlimited",
            topOffers: "Unlimited",
            trial: true,
            current: activeSub?.tier === "Diamond",
            description: "Enterprise-grade solution",
            features: [
                "Dedicated account manager",
                "Custom API access",
                "Priority support",
            ],
        },
    ];
    // Add the trial start function to database
    const startTrial = async () => {
        if (!selectedTier)
            return;
        try {
            const data = {
                tier: selectedTier.name,
                duration: "monthly",
                amount: selectedTier.priceMonthly,
                free_trial: true,
                free_trial_duration: 45,
            };
            const res = await createSubscription(data);
            if (res.success) {
                setSelectedTier(null);
                setActiveSub(res.data);
                setAcceptedTerms(false);
                setCountdown("45d 0h 0m 0s");
                toast.success('Your trial has started');
                console.log("✅ Trial started:", res.data);
            }
        }
        catch (err) {
            console.error("❌ Failed to start trial:", err);
        }
    };
    const confirmPayment = async () => {
        setLoading(true);
        setShowInitiate(false);
        setShowConfirm(true);
        try {
            const phone = "254113730593"; // Ideally get from user profile or input
            // const amount = selectedTier?.priceMonthly || 0;
            const amount = 1;
            const initRes = await initiateMpesaPayment(phone, amount, "subscription");
            console.log("📤 Payment initiated:", initRes);
            let retries = 0;
            let statusResponse = null;
            while (retries < 6) {
                await new Promise((res) => setTimeout(res, 5000)); // Wait 5s between checks
                statusResponse = await checkMpesaPaymentStatus(initRes.checkoutRequestId);
                console.log("📥 Payment status:", statusResponse);
                if (statusResponse.status === "success" || statusResponse.status === "failed")
                    break;
                retries++;
            }
            const paymentSuccess = statusResponse?.status === "success";
            setPaymentResult({
                success: paymentSuccess,
                message: paymentSuccess
                    ? "✅ Payment successful. Subscription activated."
                    : "❌ Payment failed or expired.",
            });
            if (paymentSuccess) {
                const res = await getSubscription();
                if (res.success)
                    setActiveSub(res.data);
            }
        }
        catch (error) {
            setPaymentResult({
                success: false,
                message: error.message || "Something went wrong.",
            });
        }
        finally {
            setLoading(false);
            setShowConfirm(false);
        }
    };
    const handleMpesaPayment = () => {
        setShowInitiate(true);
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-primary-600/10 via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60 py-12 px-4 sm:px-6 lg:px-8", children: [_jsx(Toaster, { richColors: true, position: "top-right" }), _jsxs("div", { className: "max-w-7xl mx-auto", children: [showAlert && (_jsx("div", { className: "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 px-4 py-4 rounded-lg mb-6 shadow-md", children: _jsxs("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4", children: [_jsxs("div", { className: "text-sm sm:text-base font-medium flex items-center", children: ["\u23F3 ", alertMessage] }), showPayment && (_jsx("button", { onClick: handleMpesaPayment, className: "w-full sm:w-auto py-2 px-4 rounded-md text-white font-semibold bg-green-600 hover:bg-green-700 transition", children: "Pay via M-Pesa" }))] }) })), _jsxs("div", { className: "relative pt-8 pb-12 mb-16 text-center", children: [_jsx("div", { className: "absolute inset-0 bg-[#FBFBFB]/10 shadow-xl dark:bg-gray-900/60" }), _jsxs("div", { className: "relative", children: [_jsxs("h1", { className: "text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl", children: ["Nyumba Smart ", _jsx("span", { className: "text-primary-600", children: "Plans" })] }), _jsx("p", { className: "mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 leading-relaxed", children: "Scale your real estate management with our flexible tiers" })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 mb-20", children: tiers.map((tier, index) => (_jsxs("div", { className: `group relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl
                ${tier.current
                                ? "ring-2 ring-primary-600 dark:ring-primary-500 transform scale-[1.02] border-primary-600"
                                : "border border-gray-100 dark:border-gray-800"}
                bg-[#FBFBFB] dark:bg-gray-900/60 shadow-lg`, children: [countdown !== null && tier.current && (_jsxs("div", { className: "absolute top-4 left-24 bg-yellow-500/90 text-white px-3 py-1 rounded-full flex items-center text-sm font-medium", children: [_jsx(Clock, { className: "w-4 h-4 mr-1" }), _jsxs("span", { children: [countdown, " days left"] })] })), tier.current && (_jsxs("div", { className: "absolute top-4 right-4 bg-primary-600 dark:bg-primary-600/50 text-white px-3 py-1 rounded-full flex items-center text-sm font-medium", children: [_jsx(BadgeCheck, { className: "w-4 h-4 mr-1" }), _jsx("span", { children: "Current Plan" })] })), _jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx("div", { className: "w-12 h-12 bg-primary-600/30 dark:bg-primary-600/30 rounded-xl flex items-center justify-center mr-4", children: _jsx("div", { className: "text-primary-600 dark:text-primary-600", children: tier.icon }) }), _jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: tier.name })] }), _jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex items-end", children: [_jsx("span", { className: "text-3xl font-bold text-gray-900 dark:text-white", children: tier.priceMonthly === 0
                                                                ? "Free"
                                                                : `Ksh ${tier.priceMonthly.toLocaleString()}` }), _jsx("span", { className: "text-gray-600 dark:text-gray-400 ml-2", children: "/month" })] }), tier.priceYearly > 0 && (_jsxs("p", { className: "text-gray-600 dark:text-gray-400 mt-2", children: ["or Ksh ", tier.priceYearly.toLocaleString(), "/year", _jsxs("span", { className: "text-green-600 dark:text-green-400 ml-2", children: ["(Save", " ", Math.round((1 - tier.priceYearly / (tier.priceMonthly * 12)) *
                                                                    100), "%)"] })] }))] }), _jsx("p", { className: "text-gray-600 dark:text-gray-300 mb-6 leading-relaxed", children: tier.description }), _jsxs("div", { className: "border-t border-gray-200 dark:border-primary-600/20 pt-6 mb-8", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Plan Features" }), _jsxs("ul", { className: "space-y-3", children: [_jsxs("li", { className: "flex items-center", children: [_jsx(DoorOpen, { className: "w-5 h-5 text-primary-600 dark:text-primary-600 mr-2" }), _jsxs("span", { className: "text-gray-600 dark:text-gray-300", children: [tier.properties, " propertie(s)"] })] }), _jsxs("li", { className: "flex items-center", children: [_jsx(Home, { className: "w-5 h-5 text-primary-600 dark:text-primary-600 mr-2" }), _jsxs("span", { className: "text-gray-600 dark:text-gray-300", children: ["Up to ", tier.rooms, " rooms"] })] }), _jsxs("li", { className: "flex items-center", children: [_jsx(ClipboardList, { className: "w-5 h-5 text-primary-600 dark:text-primary-600 mr-2" }), _jsxs("span", { className: "text-gray-600 dark:text-gray-300", children: [tier.vacancyListings, " vacancy listings"] })] }), _jsxs("li", { className: "flex items-center", children: [_jsx(Star, { className: "w-5 h-5 text-primary-600 dark:text-primary-600 mr-2" }), _jsxs("span", { className: "text-gray-600 dark:text-gray-300", children: [tier.topOffers, " top listing offers"] })] }), tier.features.map((feature, idx) => (_jsxs("li", { className: "flex items-center", children: [_jsx("div", { className: "w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-600/30 flex items-center justify-center mr-2", children: _jsx("div", { className: "w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-600" }) }), _jsx("span", { className: "text-gray-600 dark:text-gray-300", children: feature })] }, idx)))] })] }), _jsx("button", { onClick: () => tier.priceMonthly > 0 &&
                                                !tier.current &&
                                                setSelectedTier(tier), className: `w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 ${tier.current
                                                ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                                                : "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 hover:scale-105"}`, disabled: tier.current, children: tier.current
                                                ? "Current Plan"
                                                : tier.priceMonthly === 0
                                                    ? "Get Started"
                                                    : "Start Free Trial" }), tier.trial && tier.priceMonthly > 0 && (_jsx("p", { className: "text-center text-sm text-gray-500 dark:text-gray-400 mt-3", children: "45-day free trial included" }))] })] }, index))) }), _jsxs("div", { className: "text-center mb-10", children: [_jsx("div", { className: "inline-block px-4 py-2 bg-primary-600/30 dark:bg-primary-600/30 text-primary-600 dark:text-primary-600 rounded-full text-sm font-medium mb-4", children: "How It Works" }), _jsx("h2", { className: "text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1", children: "Get Started in 3 Simple Steps" })] }), _jsxs("div", { className: "grid md:grid-cols-3 gap-6 mb-20", children: [_jsx("div", { className: "group", children: _jsxs("div", { className: "bg-[#FBFBFB] dark:bg-gray-900/70 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx("div", { className: "w-12 h-12 bg-primary-600/30 dark:bg-primary-600/30 rounded-xl flex items-center justify-center mr-4", children: _jsx("div", { className: "text-2xl font-bold text-primary-600 dark:text-primary-600", children: "1" }) }), _jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white", children: "Choose Your Tier" })] }), _jsx("p", { className: "text-gray-600 dark:text-gray-300 leading-relaxed", children: "Select a subscription plan that matches your property management needs" })] }) }), _jsx("div", { className: "group", children: _jsxs("div", { className: "bg-[#FBFBFB] dark:bg-gray-900/70 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx("div", { className: "w-12 h-12 bg-primary-600/30 dark:bg-primary-600/30 rounded-xl flex items-center justify-center mr-4", children: _jsx("div", { className: "text-2xl font-bold text-primary-600 dark:text-primary-600", children: "2" }) }), _jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white", children: "Start Free Trial" })] }), _jsx("p", { className: "text-gray-600 dark:text-gray-300 leading-relaxed", children: "Explore all premium features risk-free for 45 days (paid plans only)" })] }) }), _jsx("div", { className: "group", children: _jsxs("div", { className: "bg-[#FBFBFB] dark:bg-gray-900/70 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx("div", { className: "w-12 h-12 bg-primary-600/30 dark:bg-primary-600/30 rounded-xl flex items-center justify-center mr-4", children: _jsx("div", { className: "text-2xl font-bold text-primary-600 dark:text-primary-600", children: "3" }) }), _jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white", children: "Manage Properties" })] }), _jsx("p", { className: "text-gray-600 dark:text-gray-300 leading-relaxed", children: "Access dashboard, list vacancies, and manage tenants seamlessly" })] }) })] }), _jsx("div", { className: "mt-10 text-center", children: _jsxs("div", { className: "bg-gray-900 rounded-3xl p-12 text-white relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-black/10" }), _jsxs("div", { className: "relative", children: [_jsx("h2", { className: "text-3xl md:text-3xl font-bold mb-4", children: "Ready to Transform Your Property Management?" }), _jsx("p", { className: "text-xl mb-5 text-blue-100", children: "Join thousands of property owners who trust NyumbaSmart" }), _jsx("button", { className: "bg-primary-600/20 pulse-animation text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300 hover:scale-105 transform", children: "Get Started Today" })] })] }) })] }), selectedTier && (_jsx(TrialModal, { selectedTier: selectedTier, showPayment: showPayment, acceptedTerms: acceptedTerms, setAcceptedTerms: setAcceptedTerms, setSelectedTier: setSelectedTier, startTrial: startTrial, handleMpesaPayment: handleMpesaPayment })), showInitiate && (_jsx(InitiatePaymentModal, { phoneNumber: "+254712345678", onClose: () => setShowInitiate(false), onConfirm: confirmPayment, loading: loading })), showConfirm && _jsx(ConfirmPaymentModal, {}), paymentResult && (_jsx(PaymentResultModal, { success: paymentResult.success, message: paymentResult.message, onClose: () => setPaymentResult(null) }))] }));
};
export default Subscriptions;
