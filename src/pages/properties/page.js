"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import axios from "axios";
import { Home } from "lucide-react";
import PropertyCard from "../components/PropertyCard.js";
import SearchFilters from "../components/SearchFilters.js";
import Pagination from "../components/Pagination.js";
import PropertyModal from "../components/PropertyModal.js";
const PropertiesPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        type: "all",
        minPrice: "",
        maxPrice: "",
        bedrooms: "any",
        featured: false,
    });
    const [showFilters, setShowFilters] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const propertiesPerPage = 6;
    useEffect(() => {
        fetchProperties();
    }, []);
    const fetchProperties = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/listings");
            setProperties(response.data.listings || []);
            setError(null);
            console.log("Properties fetched:", response.data);
        }
        catch (err) {
            console.error("Error fetching listings:", err);
            setError("Failed to load properties");
            setProperties([]);
        }
        finally {
            setLoading(false);
        }
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
            minimumFractionDigits: 0,
        }).format(amount);
    };
    const filteredProperties = Array.isArray(properties)
        ? properties.filter((property) => {
            const propertyName = property.property?.name || "";
            const city = property.property?.city || "";
            const area = property.property?.area?.toString() || "";
            const propertyType = property.property?.type || "";
            const propertyPrice = property.property?.price || 0;
            const propertyBedrooms = property.property?.bedrooms || 0;
            const matchesSearch = propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                area.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filters.type === "all" || propertyType === filters.type;
            const matchesMinPrice = !filters.minPrice || propertyPrice >= Number(filters.minPrice);
            const matchesMaxPrice = !filters.maxPrice || propertyPrice <= Number(filters.maxPrice);
            const matchesBedrooms = filters.bedrooms === "any" || propertyBedrooms >= Number(filters.bedrooms);
            const matchesFeatured = !filters.featured || property.featured;
            return matchesSearch && matchesType && matchesMinPrice && matchesMaxPrice && matchesBedrooms && matchesFeatured;
        })
        : [];
    const indexOfLast = currentPage * propertiesPerPage;
    const indexOfFirst = indexOfLast - propertiesPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
    const toggleFavorite = (id) => {
        setFavorites((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]));
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
    const handleFilterChange = (e) => {
        const { name, value, type } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? e.target.checked : value,
        }));
        setCurrentPage(1);
    };
    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };
    const clearFilters = () => {
        setFilters({
            type: "all",
            minPrice: "",
            maxPrice: "",
            bedrooms: "any",
            featured: false,
        });
        setSearchTerm("");
        setCurrentPage(1);
    };
    const openPropertyModal = (property) => {
        setSelectedProperty(property);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProperty(null);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-950/60 pt-20 pb-12", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "text-center py-16", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600 dark:text-gray-400", children: "Loading properties..." })] }) }) }));
    }
    if (error) {
        return (_jsx("div", { className: "min-h-screen pt-20 pb-12 bg-gradient-to-br from-gray-950 via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "text-center py-16", children: [_jsx(Home, { className: "mx-auto h-16 w-16 text-gray-400" }), _jsx("h3", { className: "mt-4 text-xl font-medium text-gray-900 dark:text-white", children: "Error loading properties" }), _jsx("p", { className: "mt-2 text-gray-500 dark:text-gray-400", children: error }), _jsx("button", { onClick: fetchProperties, className: "mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors", children: "Try Again" })] }) }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-950/60 pt-20 pb-12", children: [_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-4xl font-bold text-primary-600 dark:text-primary-600 sm:text-5xl", children: "Find Your Perfect Home" }), _jsx("p", { className: "mt-2 max-w-2xl mx-auto text-xl font-semibold text-gray-600 dark:text-gray-300", children: "Discover properties that match your lifestyle and budget" })] }), _jsx(SearchFilters, { searchTerm: searchTerm, filters: filters, showFilters: showFilters, onSearchChange: handleSearchChange, onFilterChange: handleFilterChange, onToggleFilters: toggleFilters, onClearFilters: clearFilters }), _jsxs("div", { className: "mb-6 flex justify-between items-center", children: [_jsxs("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: [filteredProperties.length, " ", filteredProperties.length === 1 ? "Property" : "Properties", " Found"] }), _jsxs("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: ["Page ", currentPage, " of ", totalPages] })] }), _jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3", children: currentProperties.length > 0 ? (currentProperties.map((property) => (_jsx(PropertyCard, { property: property, isFavorite: favorites.includes(property._id), onToggleFavorite: toggleFavorite, onViewDetails: openPropertyModal, formatCurrency: formatCurrency }, property._id)))) : (_jsxs("div", { className: "col-span-full text-center py-16", children: [_jsx(Home, { className: "mx-auto h-16 w-16 text-gray-400" }), _jsx("h3", { className: "mt-4 text-xl font-medium text-gray-900 dark:text-white", children: "No properties match your search" }), _jsx("p", { className: "mt-2 text-gray-500 dark:text-gray-400", children: "Try adjusting your filters or search for something different" }), _jsx("button", { onClick: clearFilters, className: "mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors", children: "Clear All Filters" })] })) }), _jsx(Pagination, { currentPage: currentPage, totalPages: totalPages, onPageChange: handlePageChange })] }), _jsx(PropertyModal, { isOpen: isModalOpen, property: selectedProperty, onClose: closeModal, formatCurrency: formatCurrency })] }));
};
export default PropertiesPage;
