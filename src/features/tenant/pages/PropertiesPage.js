import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TenantPropertiesPage = () => {
    const properties = [
        {
            id: 1,
            name: "Greenview Apartments",
            location: "Westlands, Nairobi",
            rent: "KSh 35,000",
            status: "Occupied",
        },
        {
            id: 2,
            name: "Sunrise Villas",
            location: "Kileleshwa, Nairobi",
            rent: "KSh 40,000",
            status: "Vacant",
        },
    ];
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsx("h1", { className: "text-2xl font-semibold text-primary", children: "My Properties" }), _jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: properties.map((property) => (_jsxs("div", { className: "rounded-2xl shadow p-4 border border-gray-200 bg-white", children: [_jsx("h2", { className: "text-lg font-bold text-secondary", children: property.name }), _jsx("p", { className: "text-sm text-muted", children: property.location }), _jsxs("p", { className: "text-sm mt-1", children: ["Rent: ", _jsx("strong", { children: property.rent })] }), _jsxs("p", { className: `text-sm mt-1 ${property.status === "Occupied" ? "text-green-600" : "text-yellow-600"}`, children: ["Status: ", property.status] })] }, property.id))) })] }));
};
export default TenantPropertiesPage;
