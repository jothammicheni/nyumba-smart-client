"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider.js";
import { AuthProvider, useAuth } from "./context/AuthContext.js";
import Layout from "./components/Layout.js";
// Pages
import HomePage from "./pages/HomePage.js";
import AboutPage from "./pages/AboutPage.js";
import ContactPage from "./pages/ContactPage.js";
import PropertiesPage from "./pages/PropertiesPage.js";
import NotFound from "./pages/NotFound.js";
// Auth Pages
import LoginPage from "./features/auth/pages/LoginPage.js";
// Tenant Dashboard and Nested Pages
import TenantDashboardLayout from "./features/tenant/components/TenantDashboardLayout.js";
import TenantDashboard from "./features/tenant/pages/DashboardPage.js";
import TenantPropertiesPage from "./features/tenant/pages/PropertiesPage.js";
import TenantPaymentsPage from "./features/tenant/pages/PaymentsPage.js";
import TenantDocumentsPage from "./features/tenant/pages/DocumentsPage.js";
import TenantMaintenancePage from "./features/tenant/pages/MaintenancePage.js";
import TenantSettingsPage from "./features/tenant/pages/SettingsPage.js";
// Landlord Dashboard and Nested Pages
import LandlordDashboardLayout from "./features/landlord/components/LandlordDashboardLayout.js";
import LandlordDashboard from "./features/landlord/pages/DashboardPage.js";
import LandlordPropertiesPage from "./features/landlord/pages/PropertiesPage.js";
import PropertyDetailPage from "./features/landlord/pages/PropertyDetailPage.js";
import TenantsPage from "./features/landlord/pages/TenantsPage.js";
import PaymentsPage from "./features/landlord/pages/PropertiesPage.js";
// import SettingsPage from "./features/landlord/pages/PropertiesPage.js"
// Agent Dashboard
import AgentDashboard from "./features/agent/pages/DashboardPage.js";
// Service Provider Dashboard
import { ServicetDashboardLayout } from "./features/service-provider/components/ServiceDashboardLayout.js";
import { ProviderDashboard } from "./features/service-provider/pages/DashboardPage.js";
import TasksPage from "./features/service-provider/pages/TasksPage.js";
import { ProviderSettings } from "./features/service-provider/pages/Settings.js";
// Admin Dashboard
import AdminDashboard from "./features/admin/pages/DashboardPage.js";
import Subscriptions from "./features/landlord/pages/Subscriptions.js";
import AdvertiseRooms from "./features/landlord/pages/AdvertiseRooms.js";
import MaintainanceRequestsPage from "./features/landlord/pages/MaintainanceRequestsPage.js";
import { AgentDashboardLayout } from "./features/agent/components/AgentDashboardLayout.js";
import { AgentSettings } from "./features/agent/pages/Settings.js";
import ReferralsPage from "./features/agent/pages/Referrals.js";
import EarningsPage from "./features/agent/pages/Earnings.js";
import PaymentsAndRevenue from "./features/landlord/pages/PaymentsAndRevenue.js";
import { Terms } from "./pages/FooterPages/Terms.js";
import Cookies from "./pages/FooterPages/Cookies.js";
import RentCollection from "./pages/FooterPages/RentCollection.js";
import AgentRefferals from "./pages/FooterPages/AgentRefferals.js";
import MaintananceTracking from "./pages/FooterPages/MaintananceTracking.js";
import Privacy from "./pages/FooterPages/Privacy.js";
import PropertyManagement from "./pages/FooterPages/PropertyManagement.js";
import UserPortals from "./pages/FooterPages/UserPortals.js";
import Register from "./pages/AuthPages/Register.js";
import Settings from "./features/landlord/pages/Settings.js";
import SEO from "./components/SEO.js";
import PropertyDetailsPage from "./pages/propertylistingComponets/PropertyDetailsPage.js";
import BookingsAndAppointments from "./features/landlord/pages/BookingsAndAppointments.js";
// import ProviderAssignmentPage from "./features/service-provider/pages/ProviderAssignmentPage.js"
// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (!user) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        switch (user.role) {
            case "tenant":
                return _jsx(Navigate, { to: "/tenant/dashboard", replace: true });
            case "landlord":
                return _jsx(Navigate, { to: "/landlord/dashboard", replace: true });
            case "agent":
                return _jsx(Navigate, { to: "/agent/dashboard", replace: true });
            case "service-provider":
                return _jsx(Navigate, { to: "/service-provider/dashboard", replace: true });
            case "admin":
                return _jsx(Navigate, { to: "/admin/dashboard", replace: true });
            default:
                return _jsx(Navigate, { to: "/", replace: true });
        }
    }
    return _jsx(_Fragment, { children: children });
};
function App() {
    return (_jsxs(Router, { children: [_jsx(SEO, {}), " ", _jsx(AuthProvider, { children: _jsx(ThemeProvider, { defaultTheme: "light", children: _jsxs(Routes, { children: [_jsxs(Route, { element: _jsx(Layout, { includeNavbar: true, includeFooter: true }), children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/about", element: _jsx(AboutPage, {}) }), _jsx(Route, { path: "/properties", element: _jsx(PropertiesPage, {}) }), _jsx(Route, { path: "/properties/:id", element: _jsx(PropertyDetailsPage, {}) }), _jsx(Route, { path: "/contact", element: _jsx(ContactPage, {}) }), _jsx(Route, { path: "/terms", element: _jsx(Terms, {}) }), _jsx(Route, { path: "/cookies", element: _jsx(Cookies, {}) }), _jsx(Route, { path: "/services/rent-collection", element: _jsx(RentCollection, {}) }), _jsx(Route, { path: "/services/agent-refferals", element: _jsx(AgentRefferals, {}) }), _jsx(Route, { path: "/services/maintanance", element: _jsx(MaintananceTracking, {}) }), _jsx(Route, { path: "/privacy", element: _jsx(Privacy, {}) }), _jsx(Route, { path: "/services/property-management", element: _jsx(PropertyManagement, {}) }), _jsx(Route, { path: "/services/user-portals", element: _jsx(UserPortals, {}) })] }), _jsxs(Route, { element: _jsx(Layout, { includeNavbar: false, includeFooter: true }), children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) })] }), _jsxs(Route, { path: "/tenant/dashboard/*", element: _jsx(ProtectedRoute, { allowedRoles: ["tenant"], children: _jsx(TenantDashboardLayout, {}) }), children: [_jsx(Route, { index: true, element: _jsx(TenantDashboard, {}) }), _jsx(Route, { path: "properties", element: _jsx(TenantPropertiesPage, {}) }), _jsx(Route, { path: "payments", element: _jsx(TenantPaymentsPage, {}) }), _jsx(Route, { path: "documents", element: _jsx(TenantDocumentsPage, {}) }), _jsx(Route, { path: "maintenance", element: _jsx(TenantMaintenancePage, {}) }), _jsx(Route, { path: "settings", element: _jsx(TenantSettingsPage, {}) })] }), _jsxs(Route, { path: "/landlord/dashboard/*", element: _jsx(ProtectedRoute, { allowedRoles: ["landlord"], children: _jsx(LandlordDashboardLayout, {}) }), children: [_jsx(Route, { index: true, element: _jsx(LandlordDashboard, {}) }), _jsx(Route, { path: "properties", element: _jsx(LandlordPropertiesPage, {}) }), _jsx(Route, { path: "properties/:id", element: _jsx(PropertyDetailPage, {}) }), _jsx(Route, { path: "tenants", element: _jsx(TenantsPage, {}) }), _jsx(Route, { path: "payments", element: _jsx(PaymentsPage, {}) }), _jsx(Route, { path: "maintenance", element: _jsx(MaintainanceRequestsPage, { landlordId: "" }) }), _jsx(Route, { path: "subscriptions", element: _jsx(Subscriptions, {}) }), _jsx(Route, { path: "advertiseproperty", element: _jsx(AdvertiseRooms, {}) }), _jsx(Route, { path: "payments-revenue", element: _jsx(PaymentsAndRevenue, {}) }), _jsx(Route, { path: "settings", element: _jsx(Settings, {}) }), _jsx(Route, { path: "bookings", element: _jsx(BookingsAndAppointments, {}) })] }), _jsxs(Route, { path: "/agent/dashboard/*", element: _jsx(ProtectedRoute, { allowedRoles: ["agent"], children: _jsx(AgentDashboardLayout, {}) }), children: [_jsx(Route, { index: true, element: _jsx(AgentDashboard, {}) }), _jsx(Route, { path: "settings", element: _jsx(AgentSettings, {}) }), _jsx(Route, { path: "referrals", element: _jsx(ReferralsPage, {}) }), _jsx(Route, { path: "earnings", element: _jsx(EarningsPage, {}) })] }), _jsxs(Route, { path: "/service-provider/dashboard/*", element: _jsx(ProtectedRoute, { allowedRoles: ["service-provider"], children: _jsx(ServicetDashboardLayout, {}) }), children: [_jsx(Route, { index: true, element: _jsx(ProviderDashboard, {}) }), _jsx(Route, { path: "tasks", element: _jsx(TasksPage, {}) }), _jsx(Route, { path: "settings", element: _jsx(ProviderSettings, {}) })] }), _jsx(Route, { path: "/admin/dashboard", element: _jsx(ProtectedRoute, { allowedRoles: ["admin"], children: _jsx(AdminDashboard, {}) }) }), _jsx(Route, { path: "/landlord/properties", element: _jsx(Navigate, { to: "/landlord/dashboard/properties", replace: true }) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }) })] }));
}
export default App;
