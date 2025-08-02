"use client"

import type React from "react"
import { useEffect } from "react" 
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider.js"
import { AuthProvider, useAuth } from "./context/AuthContext.js"
import Layout from "./components/Layout.js"

// Pagess
import HomePage from "./pages/HomePage.js"
import AboutPage from "./pages/AboutPage.js"
import ContactPage from "./pages/ContactPage.js"
import PropertiesPage from "./pages/PropertiesPage.js"
import NotFound from "./pages/NotFound.js"

// Auth Pages

// Tenant Dashboard and Nested Pagess
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
import LoginPage from "./pages/AuthPages/LoginPage.js"

import Settings from "./features/landlord/pages/Settings.js"
import SEO from "./components/SEO.js"
import PropertyDetailsPage from "./pages/propertylistingComponets/PropertyDetailsPage.js"
import BookingsAndAppointments from "./features/landlord/pages/BookingsAndAppointments.js"
import CaretakerDashboard from "./features/caretaker/CaretakerDashboard.js"
import ManageCaretakers from "./features/landlord/components/caretakers/ManageCaretakers.js"
import EditCaretakerPage from "./features/landlord/components/caretakers/EditCaretakerPage.js"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import RelocationHomeSearch from './pages/ RelocationHomeSearch';
import Blogs from "./pages/Blogs.js"
import { HelmetProvider } from "react-helmet-async"
import ServiceProvidersMarketplace from "./pages/ServiceProvidersMarketplace.js"
import ManageGigsPage from "./features/service-provider/pages/ManageGigs.js"
import CreateGigPage from "./features/service-provider/components/createGig.js"
import ViewGigPage from "./features/service-provider/components/viewGig.js"
import GigAnalyticsPage from "./features/service-provider/components/gigAnalytics.js"
import EditGigPage from "./features/service-provider/components/editGig.js"
// -------- CaretakerRedirect Component --------
// const CaretakerRedirect = () => {
//   const { user } = useAuth()

//   if (user?.role === "caretaker") {
//     // Redirect caretakers to their first available page
//     if (user.permissions?.includes("property")) {
//       return <Navigate to="/landlord/dashboard/properties" replace />
//     } else if (user.permissions?.includes("tenants")) {
//       return <Navigate to="/landlord/dashboard/tenants" replace />
//     } else if (user.permissions?.includes("finance")) {
//       return <Navigate to="/landlord/dashboard/payments-revenue" replace />
//     } else if (user.permissions?.includes("maintenance")) {
//       return <Navigate to="/landlord/dashboard/maintenance" replace />
//     } else {
//       return <Navigate to="/landlord/dashboard/settings" replace />
//     }
//   }

//   // For landlords, show the actual dashboard
//   return <LandlordDashboard />
// }

// -------- Dashboard Route Handler --------
const DashboardRouteHandler = () => {
  const { user } = useAuth()

  if (user?.role === "caretaker") {
    return <CaretakerDashboard />
  }

  // For landlords, show the actual dashboard
  return <LandlordDashboard />
}

// -------- ProtectedRoute Component --------
const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode
  allowedRoles: string[]
}) => {
  const { user, isAuthenticated, isLoading } = useAuth()

  console.log("🔒 ProtectedRoute Check:", {
    isLoading,
    isAuthenticated,
    userRole: user?.role,
    allowedRoles,
    userId: user?.id,
  })

  // Show loading while auth is being determined
  if (isLoading) {
    console.log("⏳ ProtectedRoute: Still loading...")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    console.log("🚫 ProtectedRoute: Not authenticated, redirecting to login")
    return <Navigate to="/login" replace />
  }

  // ✅ EXPLICIT CHECK: Allow caretakers to access landlord routes
  if (user.role === "caretaker" && allowedRoles.includes("landlord")) {
    console.log("✅ ProtectedRoute: Caretaker accessing landlord route - ALLOWED")
    return <>{children}</>
  }

  // ✅ EXPLICIT CHECK: Allow if user role is in allowed roles
  if (allowedRoles.includes(user.role)) {
    console.log("✅ ProtectedRoute: User role matches allowed roles - ALLOWED")
    return <>{children}</>
  }

  // ❌ User doesn't have access, redirect to their appropriate dashboard
  console.log("❌ ProtectedRoute: Access denied, redirecting based on role:", user.role)

  switch (user.role) {
    case "tenant":
      return <Navigate to="/tenant/dashboard" replace />
    case "landlord":
      return <Navigate to="/landlord/dashboard" replace />
    case "caretaker":
      return <Navigate to="/landlord/dashboard" replace />
    case "agent":
      return <Navigate to="/agent/dashboard" replace />
    case "service-provider":
      return <Navigate to="/service-provider/dashboard" replace />
    case "admin":
      return <Navigate to="/admin/dashboard" replace />
    default:
      console.log("⚠️ ProtectedRoute: Unknown role, redirecting to home")
      return <Navigate to="/" replace />
  }
}

// -------- PermissionCheck Component --------
const PermissionCheck = ({
  children,
  permission,
  landlordOnly = false,
}: {
  children: React.ReactNode
  permission?: string
  landlordOnly?: boolean
}) => {
  const { user } = useAuth()

  console.log("🔐 PermissionCheck:", {
    userRole: user?.role,
    requiredPermission: permission,
    landlordOnly,
    userPermissions: user?.permissions,
    hasPermission: user?.permissions?.includes(permission || ""),
  })

  // If it's landlord-only, only allow landlords
  if (landlordOnly && user?.role !== "landlord") {
    console.log("❌ PermissionCheck: Access denied - Landlord-only content")
    return <Navigate to="/landlord/dashboard/properties" replace />
  }

  // If no specific permission required, allow access
  if (!permission) {
    return <>{children}</>
  }

  // Landlords have full access
  if (user?.role === "landlord") {
    console.log("✅ PermissionCheck: Landlord has full access")
    return <>{children}</>
  }

  // Check caretaker permissions
  // if (user?.role === "caretaker") {
  //   if (user.permissions?.includes(permission)) {
  //     console.log("✅ PermissionCheck: Caretaker has required permission")
  //     return <>{children}</>
  //   } else {
  //     console.log("❌ PermissionCheck: Caretaker lacks permission, redirecting")
  //     return <Navigate to="/landlord/dashboard/properties" replace />
  //   }
  // }

  // Default: allow access for other roles
  return <>{children}</>
}

// -------- AppContent Component --------
const AppContent = () => {
  const { user, isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    console.log("🔄 App - Auth state changed:", {
      isLoading,
      isAuthenticated,
      userRole: user?.role,
      userId: user?.id,
      permissions: user?.permissions,
    })
  }, [isAuthenticated, user, isLoading])

  return (
    <Routes>
      {/* Public Routes */}

      <Route element={<Layout includeNavbar={true} includeFooter={true} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/service/marketplace" element={<ServiceProvidersMarketplace/>} />

        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/relocate-search-home" element={<RelocationHomeSearch/>} />
        <Route path="/properties/:id" element={<PropertyDetailsPage />} />
        <Route path="/terms" element={<Terms/>} />
        <Route path="/cookies" element={<Cookies/>} />
        <Route path="/services/rent-collection" element={<RentCollection />} />
        <Route path="/services/agent-refferals" element={<AgentRefferals />} />
        <Route path="/services/maintanance" element={<MaintananceTracking />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/services/property-management" element={<PropertyManagement />} />
        <Route path="/services/user-portals" element={<UserPortals />} />
      </Route>

      {/* Auth Pages */}
      <Route element={<Layout includeNavbar={false} includeFooter={true} />}>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Tenant Dashboard */}
      <Route
        path="/tenant/dashboard/*"
        element={
          <ProtectedRoute allowedRoles={["tenant"]}>
            <TenantDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TenantDashboard />} />
        <Route path="properties" element={<TenantPropertiesPage />} />
        <Route path="payments" element={<TenantPaymentsPage />} />
        <Route path="documents" element={<TenantDocumentsPage />} />
        <Route path="maintenance" element={<TenantMaintenancePage />} />
        <Route path="settings" element={<TenantSettingsPage />} />
      </Route>

      {/* 🎯 LANDLORD DASHBOARD - EXPLICITLY ALLOW CARETAKERS */}
      <Route
        path="/landlord/dashboard/*"
        element={
          <ProtectedRoute allowedRoles={["landlord", "caretaker"]}>
            <LandlordDashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard route - shows different content based on role */}
        <Route index element={<DashboardRouteHandler />} />

        <Route
          path="properties"
          element={
            <PermissionCheck permission="property">
              <LandlordPropertiesPage />
            </PermissionCheck>
          }
        />
        <Route
          path="properties/:id"
          element={
            <PermissionCheck permission="property">
              <PropertyDetailPage />
            </PermissionCheck>
          }
        />
        <Route
          path="tenants"
          element={
            <PermissionCheck permission="tenants">
              <TenantsPage />
            </PermissionCheck>
          }
        />
        <Route
          path="payments"
          element={
            <PermissionCheck permission="finance">
              <PaymentsPage />
            </PermissionCheck>
          }
        />
        <Route
          path="maintenance"
          element={
            <PermissionCheck permission="maintenance">
              <MaintainanceRequestsPage landlordId="" />
            </PermissionCheck>
          }
        />
        <Route
          path="subscriptions"
          element={
            <PermissionCheck permission="reports" landlordOnly={true}>
              <Subscriptions />
            </PermissionCheck>
          }
        />
        <Route
          path="advertiseproperty"
          element={
            <PermissionCheck permission="property">
              <AdvertiseRooms />
            </PermissionCheck>
          }
        />
        <Route
          path="payments-revenue"
          element={
            <PermissionCheck permission="finance">
              <PaymentsAndRevenue />
            </PermissionCheck>
          }
        />
        {/* Settings is accessible to both landlords and caretakers */}
         <Route path="manage/agents&caretakers" element={<ManageCaretakers />} />
         <Route path="manage/agents&caretakers/edit/:id" element={<EditCaretakerPage />} /> 
        <Route path="settings" element={<Settings />} />
        <Route path="bookings" element={<BookingsAndAppointments />} />
      </Route>

      {/* Agent Dashboard */}
      <Route
        path="/agent/dashboard/*"
        element={
          <ProtectedRoute allowedRoles={["agent"]}>
            <AgentDashboardLayout />
          </ProtectedRoute>
        }
      >
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
        }
      >
        <Route index element={<ProviderDashboard />} />
        <Route path="manage/gigs" element={<ManageGigsPage/>} />
         <Route path="manage/gigs/create-gig" element={<CreateGigPage/>} />
         <Route path="manage/gigs/view/:id" element={<ViewGigPage/>} />
          <Route path="manage/gigs/edit/:id" element={<EditGigPage/>} />
          <Route path="manage/analytics/analytics/:id" element={<GigAnalyticsPage/>} />
        <Route path="tasks" element={<TasksPage />} />

        <Route path="settings" element={<ProviderSettings />} />
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

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

// -------- Main App Component --------
function App() {
  return (
    <Router>
      <SEO />
       <HelmetProvider>
      <AuthProvider>
        <ThemeProvider >
          <ToastContainer position="top-right" autoClose={3000} />
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
      </HelmetProvider>
    </Router>
  )
}

export default App
