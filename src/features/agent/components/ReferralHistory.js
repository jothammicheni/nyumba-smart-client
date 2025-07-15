import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthHeaders } from "../../../services/authService.js";
import { UserPlus } from "lucide-react";
const ReferralHistory = () => {
    const [referrals, setReferrals] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchReferrals = async () => {
            try {
                const response = await axios.get("https://nyumba-smart-server.onrender.com/api/agents/referrals", {
                    headers: getAuthHeaders(),
                });
                setReferrals(response.data.data);
            }
            catch (error) {
                console.error("Error fetching referrals:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchReferrals();
    }, []);
    const formatDate = (date) => new Date(date).toLocaleDateString("en-KE", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    if (loading)
        return _jsx("div", { className: "text-center p-4", children: "Loading referrals..." });
    return (_jsxs("div", { className: "mt-8 bg-white dark:bg-gray-800 shadow rounded-lg", children: [_jsx("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center", children: _jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-white", children: "Referral History" }) }), _jsx("div", { className: "px-4 py-5 sm:p-6", children: referrals.length === 0 ? (_jsx("p", { className: "text-gray-600 dark:text-gray-300", children: "No referrals yet." })) : (_jsx("ul", { className: "-my-5 divide-y divide-gray-200 dark:divide-gray-700", children: referrals.map((referral) => (_jsx("li", { className: "py-4", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("div", { className: "h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center", children: _jsx(UserPlus, { className: "h-5 w-5 text-primary-500" }) }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white truncate", children: referral.landlord_id?.name || "Unknown Landlord" }), _jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: [referral.status, " \u2022 ", formatDate(referral.created_at)] })] })] }) }, referral._id))) })) })] }));
};
export default ReferralHistory;
