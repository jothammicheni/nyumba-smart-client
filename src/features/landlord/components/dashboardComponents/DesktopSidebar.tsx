/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useAuth } from "../../../../context/AuthContext.js"
import { Link, useNavigate } from "react-router-dom"
import { Building, CreditCard, Home, LogOut, Settings, Users, X } from 'lucide-react'

const DesktopSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }
  const handleNavClick = () => {
    setSidebarOpen(false)
  }
  function isActive(path: string) {
    return location.pathname === path
      ? "bg-primary-600 text-white"
      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
  }
  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-500">TenaHub</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="px-2 py-4 space-y-1">
              <Link
                to=""
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/dashboard")}`}
              >
                <Home className="w-5 h-5 mr-3" /> Dashboard
              </Link>
              <Link
                to="properties"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/properties")}`}
              >
                <Building className="w-5 h-5 mr-3" /> Properties
              </Link>
              <Link
                to="tenants"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/tenants")}`}
              >
                <Users className="w-5 h-5 mr-3" /> Tenants
              </Link>
              <Link
                to="payments"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/payments")}`}
              >
                <CreditCard className="w-5 h-5 mr-3" /> Payments
              </Link>

              <Link
                to="payments"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/payments")}`}
              >
                <CreditCard className="w-5 h-5 mr-3" /> Mentainance Requests
              </Link>

              <Link
                to="payments"
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
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500"
            >
              <LogOut className="w-5 h-5 mr-3" /> Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DesktopSidebar
