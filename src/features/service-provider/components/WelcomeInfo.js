import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { CircleAlert } from 'lucide-react';
import axios from 'axios';
import { getAuthHeaders } from '../../../services/authService.js';
import { Loader } from '../../../components/Loader.js';
const availabilityColors = {
    available: "bg-green-200 text-green-800",
    busy: "bg-yellow-200 text-yellow-800",
    unavailable: "bg-red-200 text-red-800",
};
export default function WelcomeInfo() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [providerInfo, setProviderInfo] = useState({
        provider: {
            _id: '',
            name: '',
            email: '',
            phone: '',
            city: '',
            service_category: '',
            joinDate: '',
            createdAt: '',
            availability: 'available'
        },
        stats: {
            completionRate: '0',
        }
    });
    const [availability, setAvailability] = useState(providerInfo.provider.availability || 'available');
    useEffect(() => {
        const fetchProviderInfo = async () => {
            setLoading(true);
            setError('');
            try {
                console.log('Auth Headers:', getAuthHeaders());
                const response = await axios.get('http://localhost:5000/api/providers/info', {
                    headers: getAuthHeaders(),
                });
                setProviderInfo(response.data.data);
                console.log('API Response Profile Data:', response.data.data);
            }
            catch (error) {
                console.error("Failed to load provider information:", error);
                setError('Failed to load provider information');
            }
            finally {
                setLoading(false);
            }
        };
        fetchProviderInfo();
    }, []);
    useEffect(() => {
        if (providerInfo.provider.availability) {
            setAvailability(providerInfo.provider.availability);
        }
    }, [providerInfo.provider.availability]);
    const handleAvailability = async (userId, newStatus) => {
        setLoading(true);
        try {
            const res = await axios.put(`/api/providers/${userId}/availability`, { availability: newStatus }, { headers: getAuthHeaders() });
            const updatedProvider = res.data;
            setAvailability(newStatus);
            setProviderInfo((prev) => ({
                ...prev,
                provider: { ...prev.provider, availability: updatedProvider.availability }
            }));
        }
        catch (error) {
            console.error("Error updating availability:", error);
        }
        finally {
            setLoading(false);
        }
    };
    if (loading)
        return _jsx("div", { children: _jsx(Loader, {}) });
    if (error)
        return _jsx("div", { className: "text-center p-4 text-red-500", children: error });
    if (!providerInfo)
        return _jsx("div", { className: "text-center capitalize p-4", children: "No service provider information available..." });
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "bg-white dark:bg-gray-950/50 shadow", children: _jsx("div", { className: "px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8", children: _jsxs("div", { className: "py-6 md:flex md:items-center md:justify-between", children: [_jsx("div", { className: "flex-1 min-w-0", children: _jsx("div", { className: "flex items-center", children: _jsxs("div", { children: [_jsxs("h2", { className: "text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate", children: ["Welcome, ", providerInfo.provider.name] }), _jsx("div", { className: "flex flex-col mt-1 text-base text-gray-500  dark:text-gray-400", children: _jsxs("span", { className: 'capitalize bg-primary-700/20 p-2 rounded-full mb-3 flex items-center gap-3 mt-1 text-lg font text-gray-500 dark:text-gray-400', children: [_jsx(CircleAlert, { size: '20', className: 'text-sm font-light' }), " Service:  ", providerInfo.provider.service_category] }) })] }) }) }), _jsxs("div", { className: "mt-4 flex flex-col items-center md:mt-0 md:ml-4", children: [_jsx("span", { className: `px-3 py-1 rounded-full text-sm font-semibold ${availabilityColors[availability] || "bg-gray-200 text-gray-800"}`, children: availability }), _jsxs("select", { value: availability, disabled: loading, onChange: (e) => handleAvailability(providerInfo.provider._id, e.target.value), className: "mt-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: [_jsx("option", { value: "available", children: "Update Availability" }), _jsx("option", { value: "available", children: "Available" }), _jsx("option", { value: "busy", children: "Busy" }), _jsx("option", { value: "unavailable", children: "Unavailable" })] })] })] }) }) }), _jsxs("div", { className: "mt-8 bg-white dark:bg-gray-950/50 shadow rounded-lg", children: [_jsx("div", { className: "px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-600/20", children: _jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900 dark:text-white", children: "Provider Profile" }) }), _jsx("div", { className: "px-4 py-5 sm:p-6", children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center", children: [_jsx("div", { className: "flex-shrink-0 mb-4 md:mb-0 md:mr-6", children: _jsx("div", { className: "h-24 w-24 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center", children: _jsx("div", { children: _jsxs("button", { type: "button", className: "max-w-full flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: [_jsx("span", { className: "sr-only", children: "Open user menu" }), _jsx("img", { className: "h-full w-full rounded-full", src: "https://randomuser.me/api/portraits/women/44.jpg", alt: "User profile" })] }) }) }) }), _jsx("div", { className: "flex-1", children: _jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Services" }), _jsx("p", { className: "mt-1 text-base text-gray-900 capitalize dark:text-white", children: providerInfo.provider.service_category })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Member Since" }), _jsx("p", { className: "mt-1 text-sm text-gray-900 dark:text-white", children: new Date(providerInfo.provider.joinDate || providerInfo.provider.createdAt).toLocaleDateString() })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Completion Rate" }), _jsx("p", { className: "mt-1 text-sm text-gray-900 dark:text-white", children: providerInfo.stats.completionRate })] })] }) })] }) })] })] }));
}
