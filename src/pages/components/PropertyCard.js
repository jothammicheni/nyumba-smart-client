"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { MapPin, Bed, Bath, Square, Star, Heart, Eye } from "lucide-react";
const PropertyCard = ({ property, isFavorite, onToggleFavorite, onViewDetails, formatCurrency, }) => {
    const navigate = useNavigate();
    const getImageUrl = (property) => {
        if (property.images && property.images.length > 0) {
            return property.images[0];
        }
        return "/placeholder.svg?height=240&width=400";
    };
    const getPropertyName = (property) => {
        return property.property?.name || "Untitled Property";
    };
    const getLocation = (property) => {
        return property.property?.specific_location || property.property?.city || "Location not specified";
    };
    // Navigation handler
    const handleViewDetails = (property) => {
        navigate(`/properties/${property._id}`);
    };
    return (_jsxs("div", { className: "group bg-[#FBFBFB] dark:bg-gray-900/50 rounded-xl shadow-xl overflow-hidden hover:shadow-lg transition-shadow duration-300", children: [_jsxs("div", { className: "relative h-60 w-full overflow-hidden", children: [_jsx("img", { src: getImageUrl(property) || "/placeholder.svg", alt: getPropertyName(property), className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105", onError: (e) => {
                            const target = e.target;
                            target.src = "/placeholder.svg?height=240&width=400";
                        } }), _jsxs("div", { className: "absolute top-3 left-3 flex space-x-2", children: [property.featured && (_jsx("span", { className: "px-2 py-1 bg-primary-600 text-white text-xs font-bold rounded-full", children: "Featured" })), _jsx("span", { className: "px-2 py-1 bg-white dark:bg-gray-950 text-gray-800 dark:text-white text-xs font-bold rounded-full shadow-sm", children: property.property?.type || "Property" })] }), _jsxs("div", { className: "absolute top-3 right-3 flex flex-col space-y-2", children: [_jsx("button", { onClick: (e) => {
                                    e.stopPropagation();
                                    onToggleFavorite(property._id);
                                }, className: `p-2 rounded-full ${isFavorite ? "text-red-500 bg-white" : "text-gray-900 bg-white/30 backdrop-blur-sm hover:text-red-500"} transition-colors`, "aria-label": isFavorite ? "Remove from favorites" : "Add to favorites", children: _jsx(Heart, { className: "h-5 w-5", fill: isFavorite ? "currentColor" : "none" }) }), _jsx("button", { onClick: (e) => {
                                    e.stopPropagation();
                                    handleViewDetails(property);
                                }, className: "p-2 rounded-full bg-white/30 backdrop-blur-sm text-gray-900 hover:bg-white/50 hover:text-primary-500 transition-colors", "aria-label": "View details", children: _jsx(Eye, { className: "h-5 w-5" }) })] })] }), _jsxs("div", { className: "p-5", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white truncate", children: getPropertyName(property) }), _jsxs("div", { className: "flex items-center bg-gray-900/10 dark:bg-primary-600/20 px-2 py-1 rounded-md", children: [_jsx(Star, { className: "h-4 w-4 text-yellow-500 fill-current" }), _jsx("span", { className: "ml-1 text-sm font-medium text-gray-900 dark:text-gray-200", children: property.rating || 4.0 })] })] }), _jsxs("div", { className: "flex items-center mt-2 text-gray-600 dark:text-gray-400", children: [_jsx(MapPin, { className: "h-4 w-4 mr-1 flex-shrink-0" }), _jsx("span", { className: "truncate", children: getLocation(property) })] }), _jsxs("p", { className: "mt-3 text-2xl font-bold text-primary-600 dark:text-primary-600", children: [formatCurrency(property.property?.price || 0), _jsx("span", { className: "text-sm font-normal text-gray-500 dark:text-gray-400", children: " / month" })] }), _jsxs("div", { className: "mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx(Bed, { className: "h-5 w-5 text-gray-500 dark:text-gray-400" }), _jsxs("span", { className: "mt-1 text-sm text-gray-600 dark:text-gray-300", children: [property.property?.bedrooms || 0, " Beds"] })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx(Bath, { className: "h-5 w-5 text-gray-500 dark:text-gray-400" }), _jsxs("span", { className: "mt-1 text-sm text-gray-600 dark:text-gray-300", children: [property.property?.bathrooms || 0, " Baths"] })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx(Square, { className: "h-5 w-5 text-gray-500 dark:text-gray-400" }), _jsxs("span", { className: "mt-1 text-sm text-gray-600 dark:text-gray-300", children: [property.property?.area || 0, " m\u00B2"] })] })] }), _jsx("button", { onClick: () => handleViewDetails(property), className: "mt-6 w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300", children: "View Details" })] })] }));
};
export default PropertyCard;
