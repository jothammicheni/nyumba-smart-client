"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import axios from "axios";
import { Search, MapPin, Home, Bed, Bath, Square, Filter, Heart, Star, Eye, X, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, } from "lucide-react";
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
    const propertiesPerPage = 6;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5000/api/listings")
            .then((res) => {
            setProperties(res.data.listings || []);
            setError(null);
            console.log("properties:", res.data);
        })
            .catch((err) => {
            console.error("Error fetching listings:", err);
            setError("Failed to load properties");
            setProperties([]);
        })
            .finally(() => {
            setLoading(false);
        });
    }, []);
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
            minimumFractionDigits: 0,
        }).format(amount);
    };
    // Helper function to safely access property data
    const getPropertyValue = (property, field) => {
        if (property.property && property.property[field] !== undefined) {
            return property.property[field];
        }
        return property[field];
    };
    const filteredProperties = Array.isArray(properties) ? properties.filter((property) => {
        const title = property.name || "";
        const area = getPropertyValue(property, "area")?.toString() || "";
        const city = getPropertyValue(property, "city") || property.location || "";
        const propertyType = getPropertyValue(property, "type") || property.type || "";
        const propertyPriceRaw = getPropertyValue(property, "price") || property.price || 0;
        const propertyPrice = typeof propertyPriceRaw === "number" ? propertyPriceRaw : Number(propertyPriceRaw) || 0;
        const propertyBedrooms = getPropertyValue(property, "bedrooms") || property.bedrooms || 0;
        const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            area.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(city).toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filters.type === "all" || propertyType === filters.type;
        const matchesMinPrice = !filters.minPrice || propertyPrice >= Number(filters.minPrice);
        const matchesMaxPrice = !filters.maxPrice || propertyPrice <= Number(filters.maxPrice);
        const matchesBedrooms = filters.bedrooms === "any" || propertyBedrooms === Number(filters.bedrooms);
        const matchesFeatured = !filters.featured || property.featured;
        return matchesSearch && matchesType && matchesMinPrice && matchesMaxPrice && matchesBedrooms && matchesFeatured;
    }) : [];
    const indexOfLast = currentPage * propertiesPerPage;
    const indexOfFirst = indexOfLast - propertiesPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
    const toggleFavorite = (id) => {
        setFavorites((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]));
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };
    const handleFilterChange = (e) => {
        const { name, value, type } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? e.target.checked : value,
        }));
        setCurrentPage(1); // Reset to first page when filtering
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
        setCurrentImageIndex(0);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProperty(null);
    };
    const nextImage = () => {
        if (selectedProperty && selectedProperty.images && selectedProperty.images.length > 1) {
            setCurrentImageIndex((prev) => (prev + 1) % selectedProperty.images.length);
        }
    };
    const prevImage = () => {
        if (selectedProperty && selectedProperty.images && selectedProperty.images.length > 1) {
            setCurrentImageIndex((prev) => (prev - 1 + selectedProperty.images.length) % selectedProperty.images.length);
        }
    };
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-950/60 pt-20 pb-12", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "text-center py-16", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600 dark:text-gray-400", children: "Loading properties..." })] }) }) }));
    }
    if (error) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-950/60 pt-20 pb-12", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "text-center py-16", children: [_jsx(Home, { className: "mx-auto h-16 w-16 text-gray-400" }), _jsx("h3", { className: "mt-4 text-xl font-medium text-gray-900 dark:text-white", children: "Error loading properties" }), _jsx("p", { className: "mt-2 text-gray-500 dark:text-gray-400", children: error }), _jsx("button", { onClick: () => window.location.reload(), className: "mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors", children: "Try Again" })] }) }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-950/60 pt-20 pb-12", children: [_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-4xl font-bold text-primary-600 dark:text-primary-600 sm:text-5xl", children: "Find Your Perfect Home" }), _jsx("p", { className: "mt-2 max-w-2xl mx-auto text-xl font-semibold text-gray-600 dark:text-gray-300", children: "Discover properties that match your lifestyle and budget" })] }), _jsxs("div", { className: "mb-8 bg-white dark:bg-gray-900 rounded-xl shadow-md p-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-center", children: [_jsxs("div", { className: "flex-grow relative w-full", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Search, { className: "h-5 w-5 text-primary-600" }) }), _jsx("input", { type: "text", placeholder: "Search by property, location or keyword...", value: searchTerm, onChange: handleSearchChange, className: "block w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-800/90 shadow-xl rounded-lg bg-gray-50 dark:bg-gray-950/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-1 focus:ring-primary-600 focus:border-primary-500 transition-all" })] }), _jsxs("button", { onClick: toggleFilters, className: "flex items-center justify-center px-5 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors shadow-sm", children: [_jsx(Filter, { className: "h-5 w-5 mr-2" }), "Filters"] })] }), showFilters && (_jsxs("div", { className: "mt-6 p-6 bg-gray-50 dark:bg-gray-950/50 rounded-lg border border-gray-200 dark:border-gray-800/90", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-5 gap-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "type", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Property Type" }), _jsxs("select", { id: "type", name: "type", value: filters.type, onChange: handleFilterChange, className: "w-full px-4 py-2 text-gray-500 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 focus:ring-primary-600 focus:border-primary-600 transition-all", children: [_jsx("option", { value: "all", children: "All Types" }), _jsx("option", { value: "apartment", children: "Apartment" }), _jsx("option", { value: "house", children: "House" }), _jsx("option", { value: "villa", children: "Villa" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "minPrice", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Min Price (KES)" }), _jsx("input", { type: "number", id: "minPrice", name: "minPrice", value: filters.minPrice, onChange: handleFilterChange, placeholder: "10,000", className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 focus:ring-primary-600 focus:border-primary-600 transition-all" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "maxPrice", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Max Price (KES)" }), _jsx("input", { type: "number", id: "maxPrice", name: "maxPrice", value: filters.maxPrice, onChange: handleFilterChange, placeholder: "100,000", className: "w-full px-4 py-2 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 focus:ring-primary-600 focus:border-primary-600 transition-all" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "bedrooms", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Bedrooms" }), _jsxs("select", { id: "bedrooms", name: "bedrooms", value: filters.bedrooms, onChange: handleFilterChange, className: "w-full px-4 py-2 text-gray-500 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 focus:ring-primary-600 focus:border-primary-600 transition-all", children: [_jsx("option", { value: "any", children: "Any" }), _jsx("option", { value: "1", children: "1+" }), _jsx("option", { value: "2", children: "2+" }), _jsx("option", { value: "3", children: "3+" }), _jsx("option", { value: "4", children: "4+" })] })] }), _jsx("div", { className: "flex items-end", children: _jsxs("label", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "checkbox", name: "featured", checked: filters.featured, onChange: handleFilterChange, className: "h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-1 focus:ring-primary-500" }), _jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-500", children: "Featured Only" })] }) })] }), _jsxs("div", { className: "mt-6 flex justify-end space-x-3", children: [_jsx("button", { onClick: clearFilters, className: "px-4 py-2 text-sm font-medium rounded text-gray-700 hover:bg-primary-600/20 dark:text-gray-300 hover:text-gray-900 dark:hover:bg-primary-600/10 dark:hover:text-white", children: "Clear All" }), _jsx("button", { onClick: toggleFilters, className: "px-4 py-2 bg-primary-600 dark:bg-primary-600/20 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors", children: "Apply Filters" })] })] }))] }), _jsxs("div", { className: "mb-6 flex justify-between items-center", children: [_jsxs("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: [filteredProperties.length, " ", filteredProperties.length === 1 ? "Property" : "Properties", " Found"] }), _jsxs("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: ["Sorted by: ", _jsx("span", { className: "font-medium text-blue-600 dark:text-primary-500", children: "Recommended" })] })] }), _jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3", children: currentProperties.length > 0 ? (currentProperties.map((property) => (_jsxs("div", { className: "group bg-[#FBFBFB] dark:bg-gray-900/50 rounded-xl shadow-xl overflow-hidden hover:shadow-lg transition-shadow duration-300", children: [_jsxs("div", { className: "relative h-60 w-full overflow-hidden", children: [_jsx("img", { src: property.image || "/placeholder.svg?height=240&width=400", alt: property.name || "Property", className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105", onError: (e) => {
                                                const target = e.target;
                                                target.src = "/placeholder.svg?height=240&width=400";
                                            } }), _jsxs("div", { className: "absolute top-3 left-3 flex space-x-2", children: [property?.featured && (_jsx("span", { className: "px-2 py-1 bg-primary-600 text-white text-xs font-bold rounded-full", children: "Featured" })), _jsx("span", { className: "px-2 py-1 bg-white dark:bg-gray-950 text-gray-800 dark:text-white text-xs font-bold rounded-full shadow-sm", children: (getPropertyValue(property, "type") || property.type || "Property")
                                                        .toString()
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        (getPropertyValue(property, "type") || property.type || "Property").toString().slice(1) })] }), _jsxs("div", { className: "absolute top-3 right-3 flex flex-col space-y-2", children: [_jsx("button", { onClick: (e) => {
                                                        e.stopPropagation();
                                                        toggleFavorite(property.id);
                                                    }, className: `p-2 rounded-full ${favorites.includes(property.id) ? "text-red-500 bg-white" : "text-gray-900 bg-white/30 backdrop-blur-sm hover:text-red-500"} transition-colors`, "aria-label": favorites.includes(property.id) ? "Remove from favorites" : "Add to favorites", children: _jsx(Heart, { className: "h-5 w-5", fill: favorites.includes(property.id) ? "currentColor" : "none" }) }), _jsx("button", { onClick: (e) => {
                                                        e.stopPropagation();
                                                        openPropertyModal(property);
                                                    }, className: "p-2 rounded-full bg-white/30 backdrop-blur-sm text-gray-900 hover:bg-white/50 hover:text-primary-500 transition-colors", "aria-label": "View details", children: _jsx(Eye, { className: "h-5 w-5" }) })] })] }), _jsxs("div", { className: "p-5", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white truncate", children: property.name || "Untitled Property" }), _jsxs("div", { className: "flex items-center bg-gray-900/10 dark:bg-primary-600/20 px-2 py-1 rounded-md", children: [_jsx(Star, { className: "h-4 w-4 text-yellow-500 fill-current" }), _jsx("span", { className: "ml-1 text-sm font-medium text-gray-900 dark:text-gray-200", children: property.rating || 0 })] })] }), _jsxs("div", { className: "flex items-center mt-2 text-gray-600 dark:text-gray-400", children: [_jsx(MapPin, { className: "h-4 w-4 mr-1 flex-shrink-0" }), _jsx("span", { className: "truncate", children: (() => {
                                                        const loc = property.location ||
                                                            property.specific_location ||
                                                            getPropertyValue(property, "city");
                                                        if (typeof loc === "string" || typeof loc === "number") {
                                                            return loc;
                                                        }
                                                        return "Location not specified";
                                                    })() })] }), _jsxs("p", { className: "mt-3 text-2xl font-bold text-primary-600 dark:text-primary-600", children: [formatCurrency(typeof getPropertyValue(property, "price") === "number"
                                                    ? getPropertyValue(property, "price")
                                                    : Number(getPropertyValue(property, "price")) || property.price || 0), _jsx("span", { className: "text-sm font-normal text-gray-500 dark:text-gray-400", children: " / month" })] }), _jsxs("div", { className: "mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx(Bed, { className: "h-5 w-5 text-gray-500 dark:text-gray-400" }), _jsxs("span", { className: "mt-1 text-sm text-gray-600 dark:text-gray-300", children: [(() => {
                                                                    const value = getPropertyValue(property, "bedrooms") ?? property.bedrooms ?? 0;
                                                                    return typeof value === "string" || typeof value === "number" ? value : 0;
                                                                })(), " Beds"] })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx(Bath, { className: "h-5 w-5 text-gray-500 dark:text-gray-400" }), _jsxs("span", { className: "mt-1 text-sm text-gray-600 dark:text-gray-300", children: [(() => {
                                                                    const value = getPropertyValue(property, "bathrooms") ?? property.bathrooms ?? 0;
                                                                    return typeof value === "string" || typeof value === "number" ? value : 0;
                                                                })(), " Baths"] })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx(Square, { className: "h-5 w-5 text-gray-500 dark:text-gray-400" }), _jsxs("span", { className: "mt-1 text-sm text-gray-600 dark:text-gray-300", children: [(() => {
                                                                    const value = getPropertyValue(property, "area") ?? property.area ?? 0;
                                                                    return typeof value === "string" || typeof value === "number" ? value : 0;
                                                                })(), " m\u00B2"] })] })] }), _jsx("button", { onClick: () => openPropertyModal(property), className: "mt-6 w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300", children: "View Details" })] })] }, property.id)))) : (_jsxs("div", { className: "col-span-full text-center py-16", children: [_jsx(Home, { className: "mx-auto h-16 w-16 text-gray-400" }), _jsx("h3", { className: "mt-4 text-xl font-medium text-gray-900 dark:text-white", children: "No properties match your search" }), _jsx("p", { className: "mt-2 text-gray-500 dark:text-gray-400", children: "Try adjusting your filters or search for something different" }), _jsx("button", { onClick: clearFilters, className: "mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors", children: "Clear All Filters" })] })) }), totalPages > 1 && (_jsx("div", { className: "mt-12 flex justify-center", children: _jsxs("nav", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: () => paginate(currentPage - 1), disabled: currentPage === 1, className: "p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed", children: _jsx(ChevronLeft, { className: "h-5 w-5" }) }), Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (_jsx("button", { onClick: () => paginate(number), className: `px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === number
                                        ? "bg-primary-600 text-white"
                                        : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"}`, children: number }, number))), _jsx("button", { onClick: () => paginate(currentPage + 1), disabled: currentPage === totalPages, className: "p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed", children: _jsx(ChevronRight, { className: "h-5 w-5" }) })] }) }))] }), isModalOpen && selectedProperty && (_jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: _jsxs("div", { className: "flex items-center justify-center min-h-screen pt-4 px-4 pb-10 text-center sm:block sm:p-0", children: [_jsx("div", { className: "fixed inset-0 transition-opacity", "aria-hidden": "true", onClick: closeModal, children: _jsx("div", { className: "absolute inset-0 bg-black/50 backdrop-blur-sm" }) }), _jsx("div", { className: "inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-20 sm:align-middle sm:max-w-4xl sm:w-full", children: _jsxs("div", { className: "relative", children: [_jsx("button", { onClick: closeModal, className: "absolute top-4 right-4 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors", "aria-label": "Close", children: _jsx(X, { className: "h-5 w-5 text-gray-500 dark:text-gray-400" }) }), _jsxs("div", { className: "relative h-96", children: [_jsx("img", { src: (selectedProperty.images && selectedProperty.images[currentImageIndex]) ||
                                                    selectedProperty.image ||
                                                    "/placeholder.svg?height=384&width=768", alt: `Image ${currentImageIndex + 1}`, className: "w-full h-full object-cover", onError: (e) => {
                                                    const target = e.target;
                                                    target.src = "/placeholder.svg?height=384&width=768";
                                                } }), selectedProperty.images && selectedProperty.images.length > 1 && (_jsxs(_Fragment, { children: [_jsx("button", { onClick: prevImage, className: "absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white/90 transition-colors", children: _jsx(ArrowLeft, { className: "w-5 h-5" }) }), _jsx("button", { onClick: nextImage, className: "absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white/90 transition-colors", children: _jsx(ArrowRight, { className: "w-5 h-5" }) })] }))] }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: selectedProperty.name || "Untitled Property" }), _jsxs("div", { className: "flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md", children: [_jsx(Star, { className: "h-4 w-4 text-yellow-500 fill-current" }), _jsx("span", { className: "ml-1 text-sm font-medium text-gray-900 dark:text-gray-200", children: selectedProperty.rating || 0 })] })] }), _jsxs("div", { className: "flex items-center mt-2 text-gray-600 dark:text-gray-400", children: [_jsx(MapPin, { className: "h-5 w-5 mr-1" }), _jsx("span", { children: (() => {
                                                            const loc = selectedProperty.location ||
                                                                selectedProperty.specific_location ||
                                                                getPropertyValue(selectedProperty, "city");
                                                            if (typeof loc === "string" || typeof loc === "number") {
                                                                return loc;
                                                            }
                                                            return "Location not specified";
                                                        })() })] }), _jsxs("p", { className: "mt-4 text-3xl font-bold text-primary-600 dark:text-primary-600", children: [formatCurrency(typeof getPropertyValue(selectedProperty, "price") === "number"
                                                        ? getPropertyValue(selectedProperty, "price")
                                                        : Number(getPropertyValue(selectedProperty, "price")) || selectedProperty.price || 0), _jsx("span", { className: "text-base font-normal text-gray-500 dark:text-gray-400", children: " / month" })] }), _jsxs("div", { className: "mt-6 grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-gray-700 pt-4", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx(Bed, { className: "h-6 w-6 text-gray-500 dark:text-gray-400" }), _jsxs("span", { className: "mt-1 text-sm text-gray-600 dark:text-gray-300", children: [(() => {
                                                                        const value = getPropertyValue(selectedProperty, "bedrooms") ?? selectedProperty.bedrooms ?? 0;
                                                                        return typeof value === "string" || typeof value === "number" ? value : 0;
                                                                    })(), " Bedrooms"] })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx(Bath, { className: "h-6 w-6 text-gray-500 dark:text-gray-400" }), _jsxs("span", { className: "mt-1 text-sm text-gray-600 dark:text-gray-300", children: [(() => {
                                                                        const value = getPropertyValue(selectedProperty, "bathrooms") ?? selectedProperty.bathrooms ?? 0;
                                                                        return typeof value === "string" || typeof value === "number" ? value : 0;
                                                                    })(), " Bathrooms"] })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx(Square, { className: "h-6 w-6 text-gray-500 dark:text-gray-400" }), _jsxs("span", { className: "mt-1 text-sm text-gray-600 dark:text-gray-300", children: [(() => {
                                                                        const value = getPropertyValue(selectedProperty, "area") ?? selectedProperty.area ?? 0;
                                                                        return typeof value === "string" || typeof value === "number" ? value : 0;
                                                                    })(), " m\u00B2"] })] })] }), _jsxs("div", { className: "mt-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-2", children: "Description" }), _jsx("p", { className: "text-gray-600 dark:text-gray-400", children: selectedProperty.description || "No description available." })] }), selectedProperty.amenities && selectedProperty.amenities.length > 0 && (_jsxs("div", { className: "mt-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-2", children: "Amenities" }), _jsx("div", { className: "flex flex-wrap gap-2", children: selectedProperty.amenities.map((amenity, index) => (_jsx("span", { className: "px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full", children: amenity }, index))) })] })), _jsxs("div", { className: "mt-8 flex space-x-3", children: [_jsx("button", { className: "flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors", children: "Contact Agent" }), _jsx("button", { className: "flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 border dark:border-gray-700 text-gray-800 dark:text-white font-medium py-3 px-4 rounded-lg transition-colors", children: "Schedule Visit" })] })] })] }) })] }) }))] }));
};
export default PropertiesPage;
