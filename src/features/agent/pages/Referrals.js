import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthHeaders } from "../../../services/authService.js";
import axios from "axios";
import { DollarSign, UserPlus, UserCheck, Clock, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Loader } from "../../../components/Loader.js";
function ReferralsPage() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalReferrals: 0,
        activeReferrals: 0,
        pendingReferrals: 0,
        totalEarnings: 0,
        pendingPayouts: 0,
        availableBalance: 0,
    });
    const [activeReferrals, setActiveReferrals] = useState([]);
    const [pendingReferrals, setPendingReferrals] = useState([]);
    useEffect(() => {
        const fetchReferralInfo = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/agents/referrals", {
                    headers: getAuthHeaders(),
                });
                setStats(response.data.stats);
                setActiveReferrals(response.data.activeReferrals);
                setPendingReferrals(response.data.pendingReferrals);
            }
            catch (error) {
                console.error("Error fetching referral info:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchReferralInfo();
    }, []);
    const formatCurrency = (amount) => new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        minimumFractionDigits: 0,
    }).format(amount);
    const formatDate = (date) => new Date(date).toLocaleDateString("en-KE", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    if (loading)
        return _jsx(Loader, {});
    return (_jsxs("div", { className: "space-y-6 p-6 bg-gradient-to-br from-blue-100 to-white dark:from-gray-950 dark:to-black", children: [_jsxs("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5", children: [_jsx(StatCard, { icon: _jsx(UserCheck, { className: "text-green-500" }), label: "Active Referrals", value: stats.activeReferrals }), _jsx(StatCard, { icon: _jsx(Clock, { className: "text-yellow-500" }), label: "Pending Referrals", value: stats.pendingReferrals }), _jsx(StatCard, { icon: _jsx(DollarSign, { className: "text-purple-500" }), label: "Total Earnings", value: formatCurrency(stats.totalEarnings) }), _jsx(StatCard, { icon: _jsx(Wallet, { className: "text-teal-500" }), label: "Available Balance", value: formatCurrency(stats.availableBalance) }), _jsx(StatCard, { icon: _jsx(UserPlus, { className: "text-blue-500" }), label: "Total Referrals", value: stats.totalReferrals })] }), _jsx(ReferralTable, { title: "Active Referrals", referrals: activeReferrals, amountLabel: "Commission", badgeText: `Total: ${formatCurrency(activeReferrals.reduce((sum, r) => sum + (r.commission || 0), 0))}`, badgeColor: "green", formatCurrency: formatCurrency, formatDate: formatDate }), _jsx(ReferralTable, { title: "Pending Referrals", referrals: pendingReferrals, amountLabel: "Potential Commission", badgeText: `Potential: ${formatCurrency(pendingReferrals.reduce((sum, r) => sum + (r.commission || 0), 0))}`, badgeColor: "yellow", formatCurrency: formatCurrency, formatDate: formatDate })] }));
}
function StatCard({ icon, label, value }) {
    return (_jsxs("div", { className: "bg-white dark:bg-gray-900 shadow rounded-lg p-5 flex items-center", children: [_jsx("div", { className: "bg-gray-100 dark:bg-gray-800 p-2 rounded-full", children: icon }), _jsxs("div", { className: "ml-4", children: [_jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: label }), _jsx("div", { className: "text-lg font-bold text-gray-900 dark:text-white", children: value })] })] }));
}
function ReferralTable({ title, referrals, amountLabel, badgeText, badgeColor, formatCurrency, formatDate, }) {
    return (_jsxs("div", { className: "bg-white dark:bg-gray-900 shadow rounded-lg p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-xl font-semibold", children: title }), _jsx("div", { className: `bg-${badgeColor}-100 dark:bg-${badgeColor}-900 text-${badgeColor}-800 dark:text-${badgeColor}-200 px-3 py-1 rounded-full text-sm font-medium`, children: badgeText })] }), referrals.length > 0 ? (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-600", children: [_jsx("thead", { className: "bg-gray-50 dark:bg-gray-800", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Name" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Email" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Phone" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Joined" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: amountLabel })] }) }), _jsx("tbody", { className: "bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-700", children: referrals.map((referral) => (_jsxs("tr", { children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white", children: referral.name }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: referral.email }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: referral.phone || 'N/A' }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300", children: formatDate(referral.createdAt) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400", children: formatCurrency(referral.commission || 0) })] }, referral._id))) })] }) })) : (_jsxs("p", { className: "text-gray-500 dark:text-gray-400", children: ["No ", title.toLowerCase()] }))] }));
}
export default ReferralsPage;
