/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listingService, trackClick } from "../../services/listingService.js";
import ContactAgentModal from "./ContactAgentForm.js";
import ScheduleVisitModal from "./ScheduleVisitForm.js";
import { MapPin, Bed, Bath, Square, Star, RefreshCw } from "lucide-react";
const formatCurrency = (amount) => {
    return `KES ${amount.toLocaleString()}`;
};
const PropertyDetailsPage = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showContactModal, setShowContactModal] = useState(false);
    const [showVisitModal, setShowVisitModal] = useState(false);
    const fetchListing = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await listingService.getListingById(id);
            console.log("Fetched listing:", data);
            setProperty(data);
        }
        catch (err) {
            console.error(err);
            setError("Listing not found.");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (id)
            fetchListing();
    }, [id]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleClick = async (action) => {
        if (property?._id) {
            await trackClick(property._id);
        }
    };
    if (loading) {
        return _jsx("div", { className: "min-h-screen flex items-center justify-center text-xl", children: "Loading..." });
    }
    if (error || !property) {
        return (_jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center text-center px-4", children: [_jsx("h1", { className: "text-2xl font-semibold text-red-600 mb-4", children: error }), _jsxs("button", { onClick: fetchListing, className: "flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition", children: [_jsx(RefreshCw, { size: 18 }), " Reload"] })] }));
    }
    const listing = property;
    return (_jsxs("div", { className: "max-w-5xl mx-auto px-4 py-8", children: [listing.images?.length > 0 && (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6", children: listing.images.map((src, index) => (_jsx("img", { src: src, alt: `Image ${index + 1}`, className: "w-full h-64 object-cover rounded-md shadow-sm", loading: "lazy", onError: (e) => (e.target.src = "/placeholder.svg") }, index))) })), _jsxs("div", { className: "flex justify-between items-start", children: [_jsx("h1", { className: "text-3xl font-bold", children: listing.property?.name }), _jsxs("div", { className: "flex items-center bg-gray-100 px-2 py-1 rounded-md", children: [_jsx(Star, { className: "h-4 w-4 text-yellow-500 fill-current" }), _jsx("span", { className: "ml-1 text-sm font-medium", children: listing.rating || 4.0 })] })] }), _jsxs("div", { className: "flex items-center mt-2 text-gray-600", children: [_jsx(MapPin, { className: "h-5 w-5 mr-1" }), _jsx("span", { children: listing.property?.specific_location || listing.property?.city })] }), _jsxs("p", { className: "mt-4 text-3xl font-bold text-primary-600", children: [formatCurrency(listing.property?.price || 0), _jsx("span", { className: "text-base font-normal text-gray-500", children: " / month" })] }), _jsxs("div", { className: "mt-6 grid grid-cols-3 gap-4 border-t pt-4", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx(Bed, { className: "h-6 w-6" }), _jsxs("span", { className: "mt-1", children: [listing.property?.bedrooms || 0, " Bedrooms"] })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx(Bath, { className: "h-6 w-6" }), _jsxs("span", { className: "mt-1", children: [listing.property?.bathrooms || 0, " Bathrooms"] })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx(Square, { className: "h-6 w-6" }), _jsxs("span", { className: "mt-1", children: [listing.property?.area || 0, " m\u00B2"] })] })] }), _jsxs("div", { className: "mt-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Description" }), _jsx("p", { children: listing.description || "No description available." })] }), listing.amenities?.length > 0 && (_jsxs("div", { className: "mt-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Amenities" }), _jsx("div", { className: "flex flex-wrap gap-2", children: listing.amenities.map((amenity, i) => (_jsx("span", { className: "px-3 py-1 bg-gray-100 text-sm rounded-full", children: amenity }, i))) })] })), _jsxs("div", { className: "mt-8 flex space-x-3", children: [_jsx("button", { onClick: () => {
                            handleClick("Contact Agent");
                            setShowContactModal(true);
                        }, className: "flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg", children: "Contact Agent" }), _jsx("button", { onClick: () => {
                            handleClick("Schedule Visit");
                            setShowVisitModal(true);
                        }, className: "flex-1 bg-gray-200 hover:bg-gray-300 py-3 px-4 rounded-lg", children: "Schedule Visit" })] }), _jsx(ContactAgentModal, { isOpen: showContactModal, onClose: () => setShowContactModal(false), property: listing }), _jsx(ScheduleVisitModal, { isOpen: showVisitModal, onClose: () => setShowVisitModal(false), property: listing })] }));
};
export default PropertyDetailsPage;
