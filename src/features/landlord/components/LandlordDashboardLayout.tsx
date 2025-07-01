import { useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { useTheme } from "../../../components/ThemeProvider.js"
import { useAuth } from "../../../context/AuthContext.js"
import { useNavigate } from "react-router-dom"

import { Home, Building, Users, CreditCard, Settings, X, LogOut, Menu, Bell, BellRing } from "lucide-react"

export default function LandlordDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  function isActive(path: string) {
    return location.pathname === path
      ? "bg-primary-600 text-white"
      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-primary-600/20"
  }

  // Close sidebar on mobile when clicking a nav link
  const handleNavClick = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-primary-600/10 via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        
        <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-primary-600/20 flex flex-col z-50">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-primary-600/20">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-500">NyumbaSmart</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="px-2 py-4 space-y-5">
              <Link
                to=""
                onClick={handleNavClick}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/dashboard")}`}
              >
                <Home className="w-5 h-5 mr-3" /> Dashboard
              </Link>
              <Link
                to="properties"
                onClick={handleNavClick}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/properties")}`}
              >
                <Building className="w-5 h-5 mr-3" /> Properties
              </Link>
              <Link
                to="tenants"
                onClick={handleNavClick}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/tenants")}`}
              >
                <Users className="w-5 h-5 mr-3" /> Tenants
              </Link>
              <Link
                to="payments-revenue"
                onClick={handleNavClick}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/payments-revenue")}`}
              >
                <CreditCard className="w-5 h-5 mr-3" /> Payments And
              </Link>

               <Link
                to="maintenance"
                onClick={handleNavClick}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/maintenance")}`}
              >
                <BellRing className="w-5 h-5 mr-3" /> Maintenance Requests
              </Link>

                <Link
                to="advertiseproperty"
                onClick={handleNavClick}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/advertiseproperty")}`}
              >
                <CreditCard className="w-5 h-5 mr-3" /> Advertise Property
              </Link>

               <Link
                to="subscriptions"
                onClick={handleNavClick}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/subscriptions")}`}
              >
                <CreditCard className="w-5 h-5 mr-3" /> Subscriptions
              </Link>

              <Link
                to="settings"
                onClick={handleNavClick}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/settings")}`}
              >
                <Settings className="w-5 h-5 mr-3" /> Settings
              </Link>
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-primary-600/20">
            <button
              onClick={handleLogout}
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500"
            >
              <LogOut className="w-5 h-5 mr-3" /> Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 border-r border-gray-200 dark:border-primary-600/20 bg-gradient-to-br from-primary-600/10 via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60">
          <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-primary-600/20">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-500">NyumbaSmart</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="px-2 py-4 space-y-5">
              <Link
                to=""
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/dashboard")}`}
              >
                <Home className="w-5 h-5 mr-3" /> Dashboard
              </Link>
              <Link
                to="properties"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/properties")}`}>
                <Building className="w-5 h-5 mr-3" /> Properties
              </Link>
              <Link
                to="tenants"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/tenants")}`}
              >
                <Users className="w-5 h-5 mr-3" /> Tenants
              </Link>
              <Link
                to="payments-revenue"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/payments-revenue")}`}
              >
                <CreditCard className="w-5 h-5 mr-3" /> Payments And Revenue
              </Link>
              
              <Link
                to="maintenance"
                onClick={handleNavClick}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/maintenance")}`}
              >
                <BellRing className="w-5 h-5 mr-3" /> Maintenance Requests
              </Link>

                <Link
                to="advertiseproperty"                
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/payments")}`}
              >
                <CreditCard className="w-5 h-5 mr-3" /> Advertise Property
              </Link>

               <Link
                to="subscriptions"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/payments")}`}
              >
                <CreditCard className="w-5 h-5 mr-3" /> Subscriptions
              </Link>



              <Link
                to="settings"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/settings")}`}
              >
                <Settings className="w-5 h-5 mr-3" /> Settings
              </Link>
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-primary-600/20">
            <button
              onClick={handleLogout}
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500">
              <LogOut className="w-5 h-5 mr-3" /> Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 lg:pl-64">
         {/* Moble device topbar */}
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-gradient-to-br from-primary-600/10 via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60 shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 flex justify-between px-4">
            <div className="flex-1 flex items-center">{/* Search bar or other content here */}</div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <span className="sr-only">Switch to light mode</span>
                ) : (
                  <span className="sr-only">Switch to dark mode</span>
                )}
                {theme === "dark" ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>

              {/* Notification dropdown */}
              <div className="ml-3 relative">
                <button
                  type="button"
                  className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-6 w-6" />
                </button>
              </div>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                      alt="User profile"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
