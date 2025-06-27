import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from "../../../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Building, CreditCard, Home, LogOut, Settings, Users, X } from 'lucide-react'

const MobileSidebar = () => {
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
    <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
            <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col z-50">
              <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
                <span className="text-xl font-bold text-primary-600 dark:text-primary-500">NyumbaSmart</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <nav className="px-2 py-4 space-y-1">
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
                    to="payments"
                    onClick={handleNavClick}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive("/landlord/payments")}`}
                  >
                    <CreditCard className="w-5 h-5 mr-3" /> Payments
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

export default MobileSidebar
