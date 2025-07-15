/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
// import { Button } from '../../ui/button.js'
import { Button } from '../../../components/ui/button.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select.js';
import { Badge } from '../../../components/ui/badge.js';
import { Input } from '../../../components/ui/input.js';
import { Star, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { getAuthHeaders } from '../../../services/authService.js';
const serviceTypeMapping = {
    plumbing: ['leak', 'pipe', 'drain', 'faucet', 'toilet', 'water'],
    electrical: ['light', 'outlet', 'switch', 'power', 'electrical', 'wiring'],
    cleaning: ['clean', 'dirty', 'stain', 'garbage', 'pest'],
    security: ['lock', 'door', 'window', 'security', 'key'],
    wifi: ['internet', 'wifi', 'connection', 'network'],
    other: [],
};
const detectServiceType = (description) => {
    const desc = description.toLowerCase();
    for (const [serviceType, keywords] of Object.entries(serviceTypeMapping)) {
        if (keywords.some((keyword) => desc.includes(keyword))) {
            return serviceType;
        }
    }
    return 'other';
};
export default function ProviderAssignmentPage({ maintenanceRequest, onAssign, onCancel }) {
    const [providers, setProviders] = useState([]);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [serviceType, setServiceType] = useState(maintenanceRequest.serviceType || '');
    const [loading, setLoading] = useState(false);
    const [searchFilters, setSearchFilters] = useState({
        city: '',
        serviceType: '',
        isActive: 'true'
    });
    const [notes, setNotes] = useState('');
    const serviceTypes = [
        { value: 'plumbing', label: 'Plumbing' },
        { value: 'electrical', label: 'Electrical' },
        { value: 'cleaning', label: 'Cleaning' },
        { value: 'security', label: 'Security' },
        { value: 'wifi', label: 'WiFi/Internet' },
        { value: 'other', label: 'Other' },
    ];
    // Auto-detect service type from description
    useEffect(() => {
        const detectedType = detectServiceType(maintenanceRequest.description);
        setServiceType(detectedType);
        setSearchFilters((prev) => ({ ...prev, serviceType: detectedType }));
    }, [maintenanceRequest.description]);
    const searchProviders = useCallback(async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (searchFilters.city)
                queryParams.append('city', searchFilters.city);
            if (searchFilters.serviceType)
                queryParams.append('serviceType', searchFilters.serviceType);
            queryParams.append('isActive', 'true');
            const response = await axios.get('http://localhost:5000/api/provider-service/search', { headers: getAuthHeaders() });
            if (response.data.success && Array.isArray(response.data.providers)) {
                setProviders(response.data.providers);
            }
            else {
                console.error('Search failed:', response.data.error || 'Unexpected response format');
            }
        }
        catch (error) {
            console.error('Failed to search providers:', error);
        }
        finally {
            setLoading(false);
        }
    }, [searchFilters]);
    useEffect(() => {
        searchProviders();
    }, [searchFilters, searchProviders]);
    // const handleAssign = () => {
    //   if (selectedProvider && serviceType) {
    //     onAssign(maintenanceRequest._id, selectedProvider._id, serviceType)
    //   }
    // }
    const handleAssign = async () => {
        if (!selectedProvider || !serviceType) {
            return;
        }
        setLoading(true);
        try {
            onAssign(selectedProvider._id, serviceType, notes);
        }
        catch (error) {
            console.error("Assignment failed:", error);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: 'h-[85vh] flex flex-col space-y-4 overflow-y-auto', children: [_jsx("div", { className: 'flex-shrink-0', children: _jsxs("div", { className: 'grid grid-cols-1 lg:grid-cols-2 gap-4', children: [_jsxs(Card, { className: 'h-fit', children: [_jsx(CardHeader, { className: 'pb-3', children: _jsx(CardTitle, { className: 'text-lg', children: "Request Details" }) }), _jsxs(CardContent, { className: 'space-y-2 text-sm', children: [_jsxs("div", { className: 'flex items-center justify-between', children: [_jsx("strong", { className: 'text-muted-foreground', children: "Tenant:" }), _jsx("span", { className: 'font-medium', children: maintenanceRequest.tenant.name })] }), _jsxs("div", { className: 'flex items-center justify-between', children: [_jsx("strong", { className: 'text-muted-foreground', children: "Property:" }), _jsx("span", { className: 'font-medium truncate ml-2', children: maintenanceRequest.room.property_id.name })] }), _jsxs("div", { className: 'space-y-1', children: [_jsx("strong", { className: 'text-muted-foreground', children: "Issue:" }), _jsx("span", { className: 'text-sm bg-muted/50 p-2 rounded', children: maintenanceRequest.description })] }), maintenanceRequest.priority && (_jsxs("div", { className: 'flex items-center justify-between', children: [_jsx("strong", { className: 'text-muted-foreground', children: "Priority:" }), _jsx(Badge, { className: 'ml-2', variant: maintenanceRequest.priority === 'urgent' ? 'destructive' : 'secondary', children: maintenanceRequest.priority })] }))] })] }), _jsxs(Card, { className: 'h-fit', children: [_jsx(CardHeader, { className: 'pb-3', children: _jsx(CardTitle, { className: 'text-lg', children: "Service & Filters" }) }), _jsxs(CardContent, { className: 'space-y-3', children: [_jsxs("div", { children: [_jsx("label", { className: 'text-sm font-medium text-muted-foreground', children: "Service Type" }), _jsxs(Select, { value: serviceType, onValueChange: setServiceType, children: [_jsx(SelectTrigger, { className: 'mt-1', children: _jsx(SelectValue, { placeholder: 'Select service type' }) }), _jsx(SelectContent, { children: serviceTypes.map((type) => (_jsx(SelectItem, { value: type.value, children: type.label }, type.value))) })] })] }), _jsxs("div", { className: 'grid grid-cols-2 gap-2', children: [_jsxs("div", { children: [_jsx("label", { className: 'text-sm font-medium text-muted-foreground', children: "City" }), _jsx(Input, { className: 'mt-1', placeholder: 'Enter city', value: searchFilters.city, onChange: (e) => setSearchFilters((prev) => ({ ...prev, city: e.target.value })) })] }), _jsxs("div", { children: [_jsx("label", { className: 'text-sm font-medium text-muted-foreground', children: "Filter Service" }), _jsxs(Select, { value: searchFilters.serviceType, onValueChange: (value) => setSearchFilters((prev) => ({ ...prev, serviceType: value })), children: [_jsx(SelectTrigger, { className: 'mt-1', children: _jsx(SelectValue, { placeholder: 'All' }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: 'all', children: "All Services" }), serviceTypes.map((type) => (_jsx(SelectItem, { value: type.value, children: type.label }, type.value)))] })] })] })] }), _jsx(Button, { onClick: searchProviders, disabled: loading, className: 'w-full', size: 'sm', children: loading ? 'Searching...' : 'Search Providers' })] })] })] }) }), _jsxs("div", { className: 'flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0', children: [_jsx("div", { className: 'lg:col-span-2', children: _jsxs(Card, { className: 'h-full flex flex-col', children: [_jsxs(CardHeader, { className: 'pb-3 flex-shrink-0', children: [_jsx(CardTitle, { className: 'text-lg', children: "Available Service Providers" }), _jsx(CardDescription, { children: "Select a service provider to assign this request" })] }), _jsx(CardContent, { className: 'flex-1 min-h-0 p-0', children: _jsx("div", { className: 'space-y-3', children: providers.length > 0 ? (providers.map((provider) => (_jsx("div", { className: `border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${selectedProvider?._id === provider._id
                                                ? 'border-primary bg-primary/5 shadow-sm'
                                                : 'border-border hover:border-primary/50'}`, onClick: () => setSelectedProvider(provider), children: _jsxs("div", { className: 'flex items-start justify-between', children: [_jsxs("div", { className: 'flex-1 min-w-0', children: [_jsxs("div", { className: 'flex items-center gap-2 mb-2', children: [_jsx("h4", { className: 'font-medium truncate', children: provider.user?.name || 'Unknown' }), provider.user?.isVerified && (_jsx(CheckCircle, { className: 'h-4 w-4 text-green-500 flex-shrink-0' })), selectedProvider?._id === provider._id && (_jsx(Badge, { className: 'flex-shrink-0', children: "Selected" }))] }), _jsxs("div", { className: 'grid grid-cols-1 sm:grid-cols-2 space-y-1 text-sm text-muted-foreground mb-2', children: [_jsxs("div", { className: 'flex items-center gap-1', children: [_jsx(MapPin, { className: 'h-3 w-3 flex-shrink-0' }), _jsx("span", { className: 'truncate', children: provider.location.city })] }), provider.user?.email && (_jsxs("div", { className: 'flex items-center gap-1', children: [_jsx(Mail, { className: 'h-3 w-3 flex-shrink-0' }), _jsx("span", { children: provider.user?.email || 'N/A' })] })), provider.user?.phone && (_jsxs("div", { className: 'flex items-center gap-1', children: [_jsx(Phone, { className: 'h-3 w-3 flex-shrink-0' }), _jsx("span", { className: 'truncate', children: provider.user?.phone })] }))] }), _jsxs("div", { className: 'flex flex-wrap gap-1', children: [provider.services.slice(0, 3).map((service) => (_jsx(Badge, { variant: 'outline', className: 'text-xs px-1 py-0', children: service }, service))), provider.services.length > 3 && (_jsxs(Badge, { variant: 'outline', className: 'text-xs px-1 py-0', children: ["+", provider.services.length - 3] }))] })] }), _jsxs("div", { className: 'flex flex-col items-end gap-1 flex-shrink-0 ml-2', children: [provider.rating !== undefined && (_jsxs("div", { className: 'flex items-center gap-1', children: [_jsx(Star, { className: 'h-3 w-3 fill-yellow-400 text-yellow-400' }), _jsx("span", { className: 'text-sm font-medium', children: provider.rating.toFixed(1) })] })), _jsxs("div", { className: 'text-xs text-muted-foreground', children: [provider.completedJobs || 0, " jobs completed"] }), _jsx(Badge, { variant: provider.isActive ? 'default' : 'secondary', className: 'mt-1', children: provider.isActive ? 'Available' : 'Busy' })] })] }) }, provider._id)))) : (_jsx("div", { className: 'text-center py-10 text-muted-foreground', children: loading ? (_jsxs("div", { className: 'space-y-2', children: [_jsx("div", { className: 'animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto' }), _jsx("p", { children: "Searching for providers..." })] })) : (_jsx("p", { children: "No service providers found matching your criteria." })) })) }) })] }) }), _jsx("div", { className: 'lg:col-span-1', children: _jsxs(Card, { className: 'h-full flex flex-col', children: [_jsx(CardHeader, { className: 'pb-3 flex-shrink-0', children: _jsx(CardTitle, { className: 'text-lg', children: "Assignment Details" }) }), _jsxs(CardContent, { className: 'flex-1 flex flex-col space-y-4', children: [selectedProvider && (_jsxs("div", { className: 'bg-primary/5 border border-primary/20 rounded-lg p-3', children: [_jsx("h4", { className: 'font-medium text-sm mb-2', children: "Selected Provider" }), _jsxs("div", { className: 'space-y-1 text-xs', children: [_jsxs("div", { className: 'flex items-center gap-1', children: [_jsx("span", { className: 'font-medium', children: selectedProvider.user?.name || 'Unknown' }), selectedProvider.user?.isVerified && (_jsx(CheckCircle, { className: 'h-3 w-3 text-green-500' }))] }), _jsxs("div", { className: 'flex items-center gap-1 text-muted-foreground', children: [_jsx(MapPin, { className: 'h-3 w-3' }), _jsx("span", { children: selectedProvider.location.city })] }), selectedProvider.rating !== undefined && (_jsxs("div", { className: 'flex items-center gap-1 text-muted-foreground', children: [_jsx(Star, { className: 'h-3 w-3 fill-yellow-400 text-yellow-400' }), _jsxs("span", { children: [selectedProvider.rating.toFixed(1), " rating"] })] }))] })] })), _jsxs("div", { className: 'flex-1', children: [_jsx("label", { className: 'text-sm font-medium text-muted-foreground', children: "Additional Notes (Optional)" }), _jsx("textarea", { className: 'mt-1 resize-none text-gray-900', placeholder: 'Add special instructions...', value: notes, onChange: (e) => setNotes(e.target.value), rows: 5 })] }), _jsxs("div", { className: 'space-y-2', children: [_jsx(Button, { variant: 'outline', onClick: handleAssign, disabled: !selectedProvider || !serviceType, className: 'w-full bg-primary-600', children: "Assign Service Provider" }), _jsx(Button, { variant: 'outline', onClick: onCancel, className: 'w-full', children: "Cancel" })] })] })] }) })] })] }));
}
