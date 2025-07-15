"use client"

import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider.js"
import { AuthProvider, useAuth } from "./context/AuthContext.js"
import Layout from "./components/Layout.js"

// Pages
import HomePage from "./pages/HomePage.js"
import AboutPage from "./pages/AboutPage.js"
import ContactPage from "./pages/ContactPage.js"
import PropertiesPage from "./pages/PropertiesPage.js"
import NotFound from "./pages/NotFound.js"

// Auth Pages
import LoginPage from "./features/auth/pages/LoginPage.js"

// Tenant Dashboard and Nested Pages
import TenantDashboardLayout from "./features/tenant/components/TenantDashboardLayout.js"
import TenantDashboard from "./features/tenant/pages/DashboardPage.js"
import TenantPropertiesPage from "./features/tenant/pages/PropertiesPage.js"
import TenantPaymentsPage from "./features/tenant/pages/PaymentsPage.js"
import TenantDocumentsPage from "./features/tenant/pages/DocumentsPage.js"
import TenantMaintenancePage from "./features/tenant/pages/MaintenancePage.js"
import TenantSettingsPage from "./features/tenant/pages/SettingsPage.js"

// Landlord Dashboard and Nested Pages
import LandlordDashboardLayout from "./features/landlord/components/LandlordDashboardLayout.js"
import LandlordDashboard from "./features/landlord/pages/DashboardPage.js"
import LandlordPropertiesPage from "./features/landlord/pages/PropertiesPage.js"
import PropertyDetailPage from "./features/landlord/pages/PropertyDetailPage.js"
import TenantsPage from "./features/landlord/pages/TenantsPage.js"
import PaymentsPage from "./features/landlord/pages/PropertiesPage.js"
// import SettingsPage from "./features/landlord/pages/PropertiesPage.js"

// Agent Dashboard
import AgentDashboard from "./features/agent/pages/DashboardPage.js"

// Service Provider Dashboard
import { ServicetDashboardLayout } from "./features/service-provider/components/ServiceDashboardLayout.js"
import { ProviderDashboard } from "./features/service-provider/pages/DashboardPage.js"
import TasksPage from "./features/service-provider/pages/TasksPage.js"
import { ProviderSettings } from "./features/service-provider/pages/Settings.js"

// Admin Dashboard
import AdminDashboard from "./features/admin/pages/DashboardPage.js"
import Subscriptions from "./features/landlord/pages/Subscriptions.js"
import AdvertiseRooms from "./features/landlord/pages/AdvertiseRooms.js"
import MaintainanceRequestsPage from "./features/landlord/pages/MaintainanceRequestsPage.js"
import { AgentDashboardLayout } from "./features/agent/components/AgentDashboardLayout.js"
import { AgentSettings } from "./features/agent/pages/Settings.js"
import ReferralsPage from "./features/agent/pages/Referrals.js"
import EarningsPage from "./features/agent/pages/Earnings.js"
import PaymentsAndRevenue from "./features/landlord/pages/PaymentsAndRevenue.js"
import { Terms } from "./pages/FooterPages/Terms.js"
import Cookies from "./pages/FooterPages/Cookies.js"
import RentCollection from "./pages/FooterPages/RentCollection.js"
import AgentRefferals from "./pages/FooterPages/AgentRefferals.js"
import MaintananceTracking from "./pages/FooterPages/MaintananceTracking.js"
import Privacy from "./pages/FooterPages/Privacy.js"
import PropertyManagement from "./pages/FooterPages/PropertyManagement.js"
import UserPortals from "./pages/FooterPages/UserPortals.js"
import Register from "./pages/AuthPages/Register.js"
import Settings from "./features/landlord/pages/Settings.js"
import SEO from "./components/SEO.js"
import PropertyDetailsPage from "./pages/propertylistingComponets/PropertyDetailsPage.js"
import BookingsAndAppointments from "./features/landlord/pages/BookingsAndAppointments.js"
// import ProviderAssignmentPage from "./features/service-provider/pages/ProviderAssignmentPage.js"

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    switch (user.role) {
      case "tenant":
        return <Navigate to="/tenant/dashboard" replace />
      case "landlord":
        return <Navigate to="/landlord/dashboard" replace />
      case "agent":
        return <Navigate to="/agent/dashboard" replace />
      case "service-provider":
        return <Navigate to="/service-provider/dashboard" replace />
      case "admin":
        return <Navigate to="/admin/dashboard" replace />
      default:
        return <Navigate to="/" replace />
    }
  }

  return <>{children}</>
}

function App() {


  return (
    <Router>
     <SEO /> {/* Add SEO component here */}
      <AuthProvider>
        <ThemeProvider defaultTheme="light">
          <Routes>
            {/* Public Routes with Navbar and Footer */}
            <Route element={<Layout includeNavbar={true} includeFooter={true} />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
                <Route path="/properties" element={<PropertiesPage/>} />
               <Route path="/properties/:id" element={<PropertyDetailsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/services/rent-collection" element={<RentCollection/>} />
              <Route path="/services/agent-refferals" element={<AgentRefferals/>} />
              <Route path="/services/maintanance" element={<MaintananceTracking/>} />
              <Route path="/privacy" element={<Privacy/>} />
              <Route path="/services/property-management" element={<PropertyManagement/>} />
              <Route path="/services/user-portals" element={<UserPortals/>} />


            </Route>

            {/* Auth Routes with Footer only */}
            <Route element={<Layout includeNavbar={false} includeFooter={true} />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register/>} />
            </Route>

            {/* Tenant Dashboard with Nested Routes */}
            <Route
              path="/tenant/dashboard/*"
              element={
                <ProtectedRoute allowedRoles={["tenant"]}>
                  <TenantDashboardLayout />
                </ProtectedRoute>
              }>
              <Route index element={<TenantDashboard />} />
              <Route path="properties" element={<TenantPropertiesPage />} />
              <Route path="payments" element={<TenantPaymentsPage />} />
              <Route path="documents" element={<TenantDocumentsPage />} />
              <Route path="maintenance" element={<TenantMaintenancePage />} />
              <Route path="settings" element={<TenantSettingsPage />} />
            </Route>

            {/* Landlord Dashboard with Nested Routes */}
            <Route
              path="/landlord/dashboard/*"
              element={
                <ProtectedRoute allowedRoles={["landlord"]}>
                  <LandlordDashboardLayout />
                </ProtectedRoute>
              }>
              <Route index element={<LandlordDashboard />} />
              <Route path="properties" element={<LandlordPropertiesPage />} />
              <Route path="properties/:id" element={<PropertyDetailPage />} />
              <Route path="tenants" element={<TenantsPage />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="maintenance" element={<MaintainanceRequestsPage landlordId={""} />} />
              <Route path="subscriptions" element={<Subscriptions />} />
              <Route path="advertiseproperty" element={<AdvertiseRooms />} />
              <Route path="payments-revenue" element={<PaymentsAndRevenue/>} />
              <Route path="settings" element={<Settings/>} />
              <Route path="bookings" element={<BookingsAndAppointments/>} />

            </Route>

            {/* Agent Dashboard */}
            <Route
              path="/agent/dashboard/*"
              element={
                <ProtectedRoute allowedRoles={["agent"]}>
                  <AgentDashboardLayout />
                </ProtectedRoute>
              }>
              <Route index element={<AgentDashboard />} />
              <Route path="settings" element={<AgentSettings />} />
              <Route path="referrals" element={<ReferralsPage />} />
              <Route path="earnings" element={<EarningsPage />} />
            </Route>

            {/* Service Provider Dashboard */}
            <Route
              path="/service-provider/dashboard/*"
              element={
                <ProtectedRoute allowedRoles={["service-provider"]}>
                  <ServicetDashboardLayout />
                </ProtectedRoute>
              }>
              <Route index element={<ProviderDashboard />} />
              <Route path="tasks" element={<TasksPage />} />
              <Route path="settings" element={<ProviderSettings />} />
              {/* <Route
                path="assign-provider"
                element={
                  <ProviderAssignmentPage
                    maintenanceRequest={{ id: "1", description: "Fix plumbing issue" }} // Example data
                    onAssign={(providerId) => console.log(`Assigned to provider ${providerId}`)}
                    onCancel={() => console.log("Assignment canceled")}
                  />
                }
              /> */}
            </Route>

            {/* Admin Dashboard */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Redirects */}
            <Route path="/landlord/properties" element={<Navigate to="/landlord/dashboard/properties" replace />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  )
}

export default App