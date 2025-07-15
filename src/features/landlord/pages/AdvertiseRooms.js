"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, BarChart3, ImageIcon, MapPin, Calendar, TrendingUp, Star, Filter, Search, MoreVertical, } from "lucide-react";
import EditListingModal from "../components/EditListingModal.js";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal.js";
import ListingStatsModal from "../components/ListingStatsModal.js";
import ImageManagementModal from "../components/ImageManagementModal.js";
import { getAuthHeaders } from "../../../services/authService.js";
import axios from "axios";
import { Loader } from "../../../components/Loader.js";
const AdvertiseRooms = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedListing, setSelectedListing] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showStatsModal, setShowStatsModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [stats, setStats] = useState({
        totalListings: 0,
        totalViews: 0,
        totalImpressions: 0,
        featuredListings: 0,
    });
    const listingsPerPage = 6;
    useEffect(() => {
        fetchListings();
    }, [currentPage]);
    const fetchListings = async () => {
        setLoading(true);
        try {
            const response = await axios(`http://localhost:5000/api/listings/landlord?page=${currentPage}&limit=${listingsPerPage}`, {
                headers: getAuthHeaders(),
            });
            if (response.status >= 200 && response.status < 300) {
                const data = response.data;
                setListings(data.listings || []);
                setTotalPages(data.pagination?.totalPages || 1);
                // Calculate stats
                const totalViews = data.listings.reduce((sum, listing) => sum + (listing.totalClicks || 0), 0);
                const totalImpressions = data.listings.reduce((sum, listing) => sum + (listing.totalImpressions || 0), 0);
                const featuredListings = data.listings.filter((listing) => listing.featured).length;
                setStats({
                    totalListings: data.pagination?.totalListings || 0,
                    totalViews,
                    totalImpressions,
                    featuredListings,
                });
                setError(null);
            }
            else {
                setError("Failed to fetch listings");
            }
        }
        catch (err) {
            setError("Error fetching listings");
            console.error("Error:", err);
        }
        finally {
            setLoading(false);
        }
    };
    const handleDeleteListing = async (listingId) => {
        const response = await axios.delete(`http://localhost:5000/api/listings/${listingId}`, {
            headers: getAuthHeaders(),
        });
        if (response.status >= 200 && response.status < 300) {
            await fetchListings(); // Refresh the list
        }
        else {
            throw new Error(response.data?.error || "Failed to delete listing");
        }
    };
    const handleEditSuccess = () => {
        fetchListings();
        setShowEditModal(false);
        setSelectedListing(null);
    };
    const handleImageManagementSuccess = () => {
        fetchListings();
        setShowImageModal(false);
        setSelectedListing(null);
    };
    const filteredListings = listings.filter((listing) => {
        const matchesSearch = listing.property?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            listing.property?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            listing.property?.type?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "all" ||
            (filterStatus === "featured" && listing.featured) ||
            (filterStatus === "active" && !listing.featured);
        return matchesSearch && matchesFilter;
    });
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
            minimumFractionDigits: 0,
        }).format(amount);
    };
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };
    if (loading)
        return _jsx("div", { children: _jsx(Loader, {}) });
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-950/60 pt-20 pb-12", children: [_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white", children: "Manage Your Listings" }), _jsx("p", { className: "mt-2 text-gray-600 dark:text-gray-400", children: "View, edit, and manage all your property listings in one place" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [_jsx("div", { className: "bg-white dark:bg-gray-900 rounded-lg shadow-md p-6", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "p-3 rounded-full bg-blue-100 dark:bg-blue-900/20", children: _jsx(BarChart3, { className: "h-6 w-6 text-blue-600 dark:text-blue-400" }) }), _jsxs("div", { className: "ml-4", children: [_jsx("p", { className: "text-sm font-medium text-gray-600 dark:text-gray-400", children: "Total Listings" }), _jsx("p", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: stats.totalListings })] })] }) }), _jsx("div", { className: "bg-white dark:bg-gray-900 rounded-lg shadow-md p-6", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "p-3 rounded-full bg-green-100 dark:bg-green-900/20", children: _jsx(Eye, { className: "h-6 w-6 text-green-600 dark:text-green-400" }) }), _jsxs("div", { className: "ml-4", children: [_jsx("p", { className: "text-sm font-medium text-gray-600 dark:text-gray-400", children: "Total Views" }), _jsx("p", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: stats.totalViews })] })] }) }), _jsx("div", { className: "bg-white dark:bg-gray-900 rounded-lg shadow-md p-6", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "p-3 rounded-full bg-purple-100 dark:bg-purple-900/20", children: _jsx(TrendingUp, { className: "h-6 w-6 text-purple-600 dark:text-purple-400" }) }), _jsxs("div", { className: "ml-4", children: [_jsx("p", { className: "text-sm font-medium text-gray-600 dark:text-gray-400", children: "Impressions" }), _jsx("p", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: stats.totalImpressions })] })] }) }), _jsx("div", { className: "bg-white dark:bg-gray-900 rounded-lg shadow-md p-6", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20", children: _jsx(Star, { className: "h-6 w-6 text-yellow-600 dark:text-yellow-400" }) }), _jsxs("div", { className: "ml-4", children: [_jsx("p", { className: "text-sm font-medium text-gray-600 dark:text-gray-400", children: "Featured" }), _jsx("p", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: stats.featuredListings })] })] }) })] }), _jsx("div", { className: "bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-center", children: [_jsxs("div", { className: "flex-grow relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Search, { className: "h-5 w-5 text-gray-400" }) }), _jsx("input", { type: "text", placeholder: "Search listings...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" })] }), _jsx("div", { className: "flex items-center space-x-4", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Filter, { className: "h-5 w-5 text-gray-400" }), _jsxs("select", { value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), className: "border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500", children: [_jsx("option", { value: "all", children: "All Listings" }), _jsx("option", { value: "featured", children: "Featured Only" }), _jsx("option", { value: "active", children: "Regular Only" })] })] }) })] }) }), error && (_jsx("div", { className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6", children: error })), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8", children: filteredListings.length > 0 ? (filteredListings.map((listing) => (_jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden", children: [_jsxs("div", { className: "relative h-48", children: [_jsx("img", { src: listing.images?.[0] || "/placeholder.svg?height=192&width=384", alt: listing.property?.name, className: "w-full h-full object-cover" }), listing.featured && (_jsx("div", { className: "absolute top-2 left-2", children: _jsx("span", { className: "bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold", children: "Featured" }) })), _jsx("div", { className: "absolute top-2 right-2", children: _jsx("div", { className: "relative", children: _jsx("button", { className: "p-2 bg-white/80 rounded-full hover:bg-white transition-colors", children: _jsx(MoreVertical, { className: "h-4 w-4 text-gray-600" }) }) }) })] }), _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white truncate", children: listing.property?.name }), _jsxs("div", { className: "flex items-center text-yellow-500", children: [_jsx(Star, { className: "h-4 w-4 fill-current" }), _jsx("span", { className: "ml-1 text-sm", children: listing.rating || 4.0 })] })] }), _jsxs("div", { className: "flex items-center text-gray-600 dark:text-gray-400 mb-2", children: [_jsx(MapPin, { className: "h-4 w-4 mr-1" }), _jsxs("span", { className: "text-sm truncate", children: [listing.property?.city, " \u2022 ", listing.property?.type] })] }), _jsxs("div", { className: "flex items-center text-gray-600 dark:text-gray-400 mb-3", children: [_jsx(Calendar, { className: "h-4 w-4 mr-1" }), _jsxs("span", { className: "text-sm", children: ["Listed ", formatDate(listing.createdAt)] })] }), _jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xl font-bold text-primary-600 dark:text-primary-400", children: formatCurrency(listing.property?.price || 0) }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "per month" })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: [listing.totalClicks || 0, " views"] }), _jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: [listing.totalImpressions || 0, " impressions"] })] })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsxs("button", { onClick: () => {
                                                        setSelectedListing(listing);
                                                        setShowStatsModal(true);
                                                    }, className: "flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1", children: [_jsx(BarChart3, { className: "h-4 w-4" }), _jsx("span", { children: "Stats" })] }), _jsxs("button", { onClick: () => {
                                                        setSelectedListing(listing);
                                                        setShowImageModal(true);
                                                    }, className: "flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1", children: [_jsx(ImageIcon, { className: "h-4 w-4" }), _jsx("span", { children: "Images" })] }), _jsxs("button", { onClick: () => {
                                                        setSelectedListing(listing);
                                                        setShowEditModal(true);
                                                    }, className: "flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1", children: [_jsx(Edit, { className: "h-4 w-4" }), _jsx("span", { children: "Edit" })] }), _jsx("button", { onClick: () => {
                                                        setSelectedListing(listing);
                                                        setShowDeleteModal(true);
                                                    }, className: "bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center", children: _jsx(Trash2, { className: "h-4 w-4" }) })] })] })] }, listing._id)))) : (_jsxs("div", { className: "col-span-full text-center py-16", children: [_jsx("div", { className: "mx-auto h-16 w-16 text-gray-400 mb-4", children: _jsx(Plus, { className: "h-16 w-16" }) }), _jsx("h3", { className: "text-xl font-medium text-gray-900 dark:text-white", children: "No listings found" }), _jsx("p", { className: "mt-2 text-gray-500 dark:text-gray-400", children: searchTerm || filterStatus !== "all"
                                        ? "Try adjusting your search or filter"
                                        : "Start by creating your first property listing" })] })) }), totalPages > 1 && (_jsx("div", { className: "flex justify-center", children: _jsxs("nav", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: () => setCurrentPage((prev) => Math.max(prev - 1, 1)), disabled: currentPage === 1, className: "px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed", children: "Previous" }), Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (_jsx("button", { onClick: () => setCurrentPage(page), className: `px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === page
                                        ? "bg-primary-600 text-white"
                                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"}`, children: page }, page))), _jsx("button", { onClick: () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)), disabled: currentPage === totalPages, className: "px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed", children: "Next" })] }) }))] }), _jsx(EditListingModal, { isOpen: showEditModal, onClose: () => {
                    setShowEditModal(false);
                    setSelectedListing(null);
                }, listing: selectedListing, onSuccess: handleEditSuccess }), _jsx(DeleteConfirmationModal, { isOpen: showDeleteModal, onClose: () => {
                    setShowDeleteModal(false);
                    setSelectedListing(null);
                }, listing: selectedListing, onConfirm: handleDeleteListing }), _jsx(ListingStatsModal, { isOpen: showStatsModal, onClose: () => {
                    setShowStatsModal(false);
                    setSelectedListing(null);
                }, listing: selectedListing }), _jsx(ImageManagementModal, { isOpen: showImageModal, onClose: () => {
                    setShowImageModal(false);
                    setSelectedListing(null);
                }, listing: selectedListing, onSuccess: handleImageManagementSuccess })] }));
};
export default AdvertiseRooms;
