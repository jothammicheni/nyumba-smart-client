"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { X, Eye, TrendingUp, Calendar, MapPin, Star, BarChart3 } from "lucide-react";
const ListingStatsModal = ({ isOpen, onClose, listing }) => {
    const [stats, setStats] = useState({
        dailyViews: [],
        totalViews: 0,
        totalImpressions: 0,
        averageRating: 0,
        viewsThisWeek: 0,
        viewsThisMonth: 0,
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (isOpen && listing) {
            fetchDetailedStats();
        }
    }, [isOpen, listing]);
    const fetchDetailedStats = async () => {
        setLoading(true);
        try {
            // For now, we'll use the basic stats from the listing
            // In a real app, you'd fetch detailed analytics from your backend
            const mockDailyViews = Array.from({ length: 7 }, (_, i) => ({
                date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
                views: Math.floor(Math.random() * 20) + 1,
            })).reverse();
            setStats({
                dailyViews: mockDailyViews,
                totalViews: listing?.totalClicks || 0,
                totalImpressions: listing?.totalImpressions || 0,
                averageRating: listing?.rating || 4.0,
                viewsThisWeek: mockDailyViews.reduce((sum, day) => sum + day.views, 0),
                viewsThisMonth: (listing?.totalClicks || 0) * 1.5, // Mock calculation
            });
        }
        catch (error) {
            console.error("Error fetching stats:", error);
        }
        finally {
            setLoading(false);
        }
    };
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
            minimumFractionDigits: 0,
        }).format(amount);
    };
    if (!isOpen || !listing)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", children: _jsxs("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-4xl shadow-xl max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-900 dark:text-white", children: "Listing Performance" }), _jsx("button", { onClick: onClose, className: "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors", children: _jsx(X, { className: "h-5 w-5 text-gray-500 dark:text-gray-400" }) })] }), loading ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto" }), _jsx("p", { className: "mt-2 text-gray-600 dark:text-gray-400", children: "Loading stats..." })] })) : (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg", children: _jsxs("div", { className: "flex items-center space-x-4", children: [listing.images?.[0] && (_jsx("img", { src: listing.images[0] || "/placeholder.svg", alt: listing.property?.name, className: "w-20 h-20 object-cover rounded-lg" })), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: listing.property?.name }), _jsxs("div", { className: "flex items-center text-gray-600 dark:text-gray-400 mt-1", children: [_jsx(MapPin, { className: "h-4 w-4 mr-1" }), _jsxs("span", { children: [listing.property?.city, " \u2022 ", listing.property?.type] })] }), _jsxs("div", { className: "flex items-center justify-between mt-2", children: [_jsx("p", { className: "text-lg font-bold text-primary-600 dark:text-primary-400", children: formatCurrency(listing.property?.price || 0) }), _jsxs("div", { className: "flex items-center", children: [_jsx(Star, { className: "h-4 w-4 text-yellow-500 fill-current" }), _jsx("span", { className: "ml-1 text-sm font-medium", children: listing.rating || 4.0 })] })] })] })] }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx("div", { className: "bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg", children: _jsxs("div", { className: "flex items-center", children: [_jsx(Eye, { className: "h-8 w-8 text-blue-600 dark:text-blue-400" }), _jsxs("div", { className: "ml-3", children: [_jsx("p", { className: "text-sm font-medium text-blue-600 dark:text-blue-400", children: "Total Views" }), _jsx("p", { className: "text-2xl font-bold text-blue-900 dark:text-blue-100", children: stats.totalViews })] })] }) }), _jsx("div", { className: "bg-green-50 dark:bg-green-900/20 p-4 rounded-lg", children: _jsxs("div", { className: "flex items-center", children: [_jsx(TrendingUp, { className: "h-8 w-8 text-green-600 dark:text-green-400" }), _jsxs("div", { className: "ml-3", children: [_jsx("p", { className: "text-sm font-medium text-green-600 dark:text-green-400", children: "Impressions" }), _jsx("p", { className: "text-2xl font-bold text-green-900 dark:text-green-100", children: stats.totalImpressions })] })] }) }), _jsx("div", { className: "bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg", children: _jsxs("div", { className: "flex items-center", children: [_jsx(Calendar, { className: "h-8 w-8 text-purple-600 dark:text-purple-400" }), _jsxs("div", { className: "ml-3", children: [_jsx("p", { className: "text-sm font-medium text-purple-600 dark:text-purple-400", children: "This Week" }), _jsx("p", { className: "text-2xl font-bold text-purple-900 dark:text-purple-100", children: stats.viewsThisWeek })] })] }) }), _jsx("div", { className: "bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg", children: _jsxs("div", { className: "flex items-center", children: [_jsx(BarChart3, { className: "h-8 w-8 text-yellow-600 dark:text-yellow-400" }), _jsxs("div", { className: "ml-3", children: [_jsx("p", { className: "text-sm font-medium text-yellow-600 dark:text-yellow-400", children: "This Month" }), _jsx("p", { className: "text-2xl font-bold text-yellow-900 dark:text-yellow-100", children: Math.round(stats.viewsThisMonth) })] })] }) })] }), _jsxs("div", { className: "bg-white dark:bg-gray-700/50 p-6 rounded-lg", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Daily Views (Last 7 Days)" }), _jsx("div", { className: "space-y-3", children: stats.dailyViews.map((day, index) => (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-20 text-sm text-gray-600 dark:text-gray-400", children: day.date }), _jsx("div", { className: "flex-1 mx-4", children: _jsx("div", { className: "bg-gray-200 dark:bg-gray-600 rounded-full h-2", children: _jsx("div", { className: "bg-primary-600 h-2 rounded-full transition-all duration-300", style: {
                                                            width: `${Math.max((day.views / Math.max(...stats.dailyViews.map((d) => d.views))) * 100, 5)}%`,
                                                        } }) }) }), _jsx("div", { className: "w-12 text-sm font-medium text-gray-900 dark:text-white text-right", children: day.views })] }, index))) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg", children: [_jsx("h4", { className: "font-semibold text-gray-900 dark:text-white mb-3", children: "Listing Details" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Listed Date:" }), _jsx("span", { className: "font-medium text-gray-900 dark:text-white", children: formatDate(listing.createdAt) })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Last Updated:" }), _jsx("span", { className: "font-medium text-gray-900 dark:text-white", children: formatDate(listing.updatedAt || listing.createdAt) })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Status:" }), _jsx("span", { className: `font-medium ${listing.featured ? "text-yellow-600 dark:text-yellow-400" : "text-green-600 dark:text-green-400"}`, children: listing.featured ? "Featured" : "Active" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Images:" }), _jsxs("span", { className: "font-medium text-gray-900 dark:text-white", children: [listing.images?.length || 0, " photos"] })] })] })] }), _jsxs("div", { className: "bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg", children: [_jsx("h4", { className: "font-semibold text-gray-900 dark:text-white mb-3", children: "Performance Metrics" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Click Rate:" }), _jsx("span", { className: "font-medium text-gray-900 dark:text-white", children: stats.totalImpressions > 0
                                                                ? `${((stats.totalViews / stats.totalImpressions) * 100).toFixed(1)}%`
                                                                : "N/A" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Avg. Daily Views:" }), _jsx("span", { className: "font-medium text-gray-900 dark:text-white", children: Math.round(stats.viewsThisWeek / 7) })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Rating:" }), _jsxs("span", { className: "font-medium text-gray-900 dark:text-white", children: [stats.averageRating.toFixed(1), "/5.0"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Amenities:" }), _jsxs("span", { className: "font-medium text-gray-900 dark:text-white", children: [listing.amenities?.length || 0, " listed"] })] })] })] })] })] })), _jsx("div", { className: "flex justify-end mt-6", children: _jsx("button", { onClick: onClose, className: "px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium transition-colors", children: "Close" }) })] }) }));
};
export default ListingStatsModal;
