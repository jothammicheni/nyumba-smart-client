import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getAuthHeaders } from "../../../services/authService.js";
import axios from "axios";
import { DollarSign, UserCheck, Clock, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Loader } from "../../../components/Loader.js";
function Referrals() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalReferrals: 0,
        activeReferrals: 0,
        pendingReferrals: 0,
        totalEarnings: 0,
        pendingPayouts: 0,
        availableBalance: 0,
        totalPotentialValue: 0,
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
                console.error("Error fetching agent info:", error);
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
    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    if (loading)
        return _jsx(Loader, {});
    return (_jsxs("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5", children: [_jsx("div", { className: "bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0 p-1.5 rounded-full bg-green-500/20", children: _jsx(UserCheck, { className: "h-6 w-6 text-green-500" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Active Referrals" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-gray-900 dark:text-white", children: stats.activeReferrals }) })] }) })] }) }) }), _jsx("div", { className: "bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0 p-1.5 bg-yellow-500/20 rounded-full", children: _jsx(Clock, { className: "h-6 w-6 text-yellow-500" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Pending Referrals" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-gray-900 dark:text-white", children: stats.pendingReferrals }) })] }) })] }) }) }), _jsx("div", { className: "bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0 p-1.5 bg-blue-500/20 rounded-full", children: _jsx(DollarSign, { className: "h-6 w-6 text-blue-500" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Total Potential Value" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-gray-900 dark:text-white", children: formatCurrency(stats.totalPotentialValue) }) })] }) })] }) }) }), _jsx("div", { className: "bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0 p-1.5 rounded-full bg-purple-500/20", children: _jsx(DollarSign, { className: "h-6 w-6 text-purple-500" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Total Earnings" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-gray-900 dark:text-white", children: formatCurrency(stats.totalEarnings) }) })] }) })] }) }) }), _jsx("div", { className: "bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg", children: _jsx("div", { className: "p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0 p-1.5 rounded-full bg-indigo-500/20", children: _jsx(Wallet, { className: "h-6 w-6 text-indigo-500" }) }), _jsx("div", { className: "ml-5 w-0 flex-1", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Available Balance" }), _jsx("dd", { children: _jsx("div", { className: "text-lg font-medium text-gray-900 dark:text-white", children: formatCurrency(stats.availableBalance) }) })] }) })] }) }) })] }));
}
export default Referrals;
