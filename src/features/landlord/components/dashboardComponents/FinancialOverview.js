import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import axios from "axios";
import { AlertTriangle, CreditCard, DollarSign, Percent } from "lucide-react";
import { getAuthHeaders } from "../../../../services/authService.js";
const FinancialOverview = () => {
    const [financialStats, setFinancialStats] = useState({
        totalRevenue: 0,
        paidRent: 0,
        pendingRent: 0,
    });
    const [propertyStats, setPropertyStats] = useState({
        totalProperties: 0,
        totalRooms: 0,
        occupiedRooms: 0,
        vacantRooms: 0,
        maintenanceRooms: 0,
        occupancyRate: 0,
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/landlord/financeStats", {
                    headers: getAuthHeaders(),
                });
                setFinancialStats(response.data.financialStats);
                setPropertyStats(response.data.propertyStats);
            }
            catch (error) {
                console.error("Error fetching dashboard stats:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
            minimumFractionDigits: 0,
        }).format(amount);
    };
    return (_jsxs(_Fragment, { children: [_jsx("h3", { className: "text-base sm:text-lg leading-6 font-medium text-gray-900 dark:text-white mt-4 sm:mt-6 md:mt-8 mb-2 sm:mb-3 md:mb-4", children: "Financial Overview" }), _jsxs("div", { className: "grid grid-cols-2 gap-3 xs:grid-cols-2 sm:gap-4 md:gap-5 lg:grid-cols-4", children: [_jsx(StatCard, { icon: _jsx(DollarSign, { className: "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-yellow-500" }), title: "Total Expected Rent", value: formatCurrency(financialStats.totalRevenue) }), _jsx(StatCard, { icon: _jsx(CreditCard, { className: "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600" }), title: "Paid Rent", value: formatCurrency(financialStats.paidRent) }), _jsx(StatCard, { icon: _jsx(AlertTriangle, { className: "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-red-500" }), title: "Pending Rent", value: formatCurrency(financialStats.pendingRent) }), _jsx(StatCard, { icon: _jsx(Percent, { className: "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-500" }), title: "Occupancy Rate", value: loading ? "..." : `${propertyStats.occupancyRate}%` })] })] }));
};
const StatCard = ({ icon, title, value, }) => (_jsx("div", { className: "bg-white dark:bg-gray-950/50 overflow-hidden shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200", children: _jsx("div", { className: "p-3 sm:p-4 md:p-5", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0", children: icon }), _jsx("div", { className: "ml-3 sm:ml-4 md:ml-5 w-0 flex-1 min-w-0", children: _jsxs("dl", { children: [_jsx("dt", { className: "text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: title }), _jsx("dd", { children: _jsx("div", { className: "text-base sm:text-lg font-medium text-gray-900 dark:text-white truncate", children: value }) })] }) })] }) }) }));
export default FinancialOverview;
