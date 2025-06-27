import { useState } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import {
  Home,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  Bell,
  X,
} from "lucide-react"
import { useTheme } from "../../../components/ThemeProvider"
import { useAuth } from "../../../context/AuthContext"

export default function TenantDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  function isActive(path: string) {
    return location.pathname === path
      ? "bg-primary-600 text-white"
      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
  }

  const handleNavClick = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col z-50">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-500">NyumbaSmart</span>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="px-2 py-4 space-y-1">
              <Link to="" onClick={handleNavClick} className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/tenant/dashboard")}`}>
                <Home className="w-5 h-5 mr-3" /> Dashboard
              </Link>
              <Link to="lease" onClick={handleNavClick} className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/tenant/lease")}`}>
                <FileText className="w-5 h-5 mr-3" /> Lease Details
              </Link>
              <Link to="payments" onClick={handleNavClick} className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/tenant/payments")}`}>
                <CreditCard className="w-5 h-5 mr-3" /> My Payments
              </Link>
              <Link to="settings" onClick={handleNavClick} className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/tenant/settings")}`}>
                <Settings className="w-5 h-5 mr-3" /> Settings
              </Link>

              {/* New links added here */}
              <Link to="maintenance" onClick={handleNavClick} className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/tenant/maintenance")}`}>
                <Settings className="w-5 h-5 mr-3" /> Maintenance
              </Link>
              <Link to="documents" onClick={handleNavClick} className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/tenant/documents")}`}>
                <FileText className="w-5 h-5 mr-3" /> Documents
              </Link>
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button onClick={handleLogout} className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500">
              <LogOut className="w-5 h-5 mr-3" /> Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-500">NyumbaSmart</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="px-2 py-4 space-y-1">
              <Link to="" className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/tenant/dashboard")}`}>
                <Home className="w-5 h-5 mr-3" /> Dashboard
              </Link>
              <Link to="lease" className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/tenant/lease")}`}>
                <FileText className="w-5 h-5 mr-3" /> Lease Details
              </Link>
              <Link to="payments" className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/tenant/payments")}`}>
                <CreditCard className="w-5 h-5 mr-3" /> My Payments
              </Link>
              <Link to="settings" className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/tenant/settings")}`}>
                <Settings className="w-5 h-5 mr-3" /> Settings
              </Link>

              {/* New links added here */}
              <Link to="maintenance" className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/tenant/maintenance")}`}>
                <Settings className="w-5 h-5 mr-3" /> Maintenance
              </Link>
              <Link to="documents" className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/tenant/documents")}`}>
                <FileText className="w-5 h-5 mr-3" /> Documents
              </Link>
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button onClick={handleLogout} className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500">
              <LogOut className="w-5 h-5 mr-3" /> Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 bg-white dark:bg-gray-800 shadow">
          <button type="button" className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 flex justify-between px-4">
            <div className="flex-1 flex items-center"></div>
            <div className="ml-4 flex items-center md:ml-6">
              <button type="button" className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" onClick={toggleTheme}>
                {theme === "dark" ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3..." />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646..." />
                  </svg>
                )}
              </button>
              <div className="ml-3 relative">
                <button type="button" className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <Bell className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Outlet for nested routes */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
