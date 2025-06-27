"use client"

import type React from "react"
import { useState } from "react"
import {
  Home,
  Users,
  Building,
  CreditCard,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  DollarSign,
  Wrench,
  UserCog,
  Shield,
  BarChart,
  Activity,
  Settings2,
  FileText,
  HelpCircle,
} from "lucide-react"
import { useTheme } from "../../../components/ThemeProvider.js"
import { useAuth } from "../../../context/AuthContext.js"
import { useNavigate } from "react-router-dom"

// Dummy data for the admin panel
const systemStats = {
  totalUsers: 156,
  totalLandlords: 24,
  totalTenants: 112,
  totalAgents: 15,
  totalServiceProviders: 5,
  totalProperties: 48,
  totalUnits: 187,
  occupiedUnits: 163,
  vacantUnits: 24,
  maintenanceRequests: 17,
}

const financialStats = {
  totalRevenue: 3750000,
  platformFees: 375000,
  pendingPayments: 450000,
  totalTransactions: 324,
  averagePropertyValue: 4500000,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userGrowth = [
  { month: "Jan", users: 85 },
  { month: "Feb", users: 94 },
  { month: "Mar", users: 105 },
  { month: "Apr", users: 112 },
  { month: "May", users: 126 },
  { month: "Jun", users: 137 },
  { month: "Jul", users: 145 },
  { month: "Aug", users: 156 },
]

const recentActivities = [
  {
    id: 1,
    type: "user_registration",
    user: "John Doe",
    role: "Landlord",
    date: "2023-05-18",
    time: "14:32:45",
  },
  {
    id: 2,
    type: "property_added",
    user: "Sarah Smith",
    propertyName: "Sunset Apartments",
    units: 12,
    date: "2023-05-17",
    time: "10:15:22",
  },
  {
    id: 3,
    type: "payment",
    tenant: "Michael Johnson",
    landlord: "Robert Wilson",
    amount: 35000,
    date: "2023-05-16",
    time: "09:45:11",
  },
  {
    id: 4,
    type: "maintenance",
    tenant: "Emily Brown",
    issue: "Water leakage",
    property: "Green Heights, Unit 4B",
    date: "2023-05-15",
    time: "16:22:37",
  },
  {
    id: 5,
    type: "service_provider_added",
    name: "Quick Fix Plumbing",
    service: "Plumbing",
    date: "2023-05-14",
    time: "11:05:19",
  },
]

const pendingApprovals = [
  {
    id: 1,
    type: "landlord_verification",
    name: "Alice Johnson",
    email: "alice@example.com",
    documents: 3,
    date: "2023-05-19",
  },
  {
    id: 2,
    type: "property_verification",
    name: "Sunrise Apartments",
    owner: "David Wilson",
    documents: 5,
    date: "2023-05-18",
  },
  {
    id: 3,
    type: "service_provider_verification",
    name: "Elite Electricians",
    service: "Electrical",
    documents: 4,
    date: "2023-05-17",
  },
  {
    id: 4,
    type: "agent_verification",
    name: "Mark Thompson",
    email: "mark@example.com",
    documents: 3,
    date: "2023-05-16",
  },
]

const AdminDashboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary-600 dark:text-primary-500">NyumbaSmart</span>
              <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs font-medium rounded">
                ADMIN
              </span>
            </div>
            <button
              className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="px-2 py-4 space-y-1">
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-md"
              >
                <BarChart className="w-5 h-5 mr-3" />
                Dashboard
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <Users className="w-5 h-5 mr-3" />
                User Management
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <Building className="w-5 h-5 mr-3" />
                Properties
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <CreditCard className="w-5 h-5 mr-3" />
                Payments
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <Wrench className="w-5 h-5 mr-3" />
                Service Providers
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <Shield className="w-5 h-5 mr-3" />
                Verifications
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <Activity className="w-5 h-5 mr-3" />
                Activity Logs
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <FileText className="w-5 h-5 mr-3" />
                Reports
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <Settings2 className="w-5 h-5 mr-3" />
                System Settings
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <HelpCircle className="w-5 h-5 mr-3" />
                Help & Support
              </a>
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-500">NyumbaSmart</span>
            <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs font-medium rounded">
              ADMIN
            </span>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-md"
              >
                <BarChart className="w-5 h-5 mr-3" />
                Dashboard
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <Users className="w-5 h-5 mr-3" />
                User Management
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <Building className="w-5 h-5 mr-3" />
                Properties
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <CreditCard className="w-5 h-5 mr-3" />
                Payments
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <Wrench className="w-5 h-5 mr-3" />
                Service Providers
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <Shield className="w-5 h-5 mr-3" />
                Verifications
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <Activity className="w-5 h-5 mr-3" />
                Activity Logs
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <FileText className="w-5 h-5 mr-3" />
                Reports
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <Settings2 className="w-5 h-5 mr-3" />
                System Settings
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <HelpCircle className="w-5 h-5 mr-3" />
                Help & Support
              </a>
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white dark:bg-gray-800 shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 flex justify-between px-4">
            <div className="flex-1 flex items-center">
              <div className="max-w-lg w-full lg:max-w-xs relative">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Search users, properties..."
                    type="search"
                  />
                </div>
              </div>
            </div>
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
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
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
                      src="https://randomuser.me/api/portraits/men/10.jpg"
                      alt="Admin profile"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 pb-8">
          <div className="bg-white dark:bg-gray-800 shadow">
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-6 md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
                    Admin Dashboard
                  </h2>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    Export Reports
                  </button>
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    System Settings
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* System Overview */}
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">System Overview</h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {/* Card 1 */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Users className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Users</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              {systemStats.totalUsers}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Building className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            Total Properties
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              {systemStats.totalProperties}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Home className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            Occupancy Rate
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              {Math.round((systemStats.occupiedUnits / systemStats.totalUnits) * 100)}%
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <DollarSign className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            Total Revenue
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              {formatCurrency(financialStats.totalRevenue)}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Breakdown */}
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mt-8 mb-4">User Breakdown</h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {/* Card 1 */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <UserCog className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Landlords</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              {systemStats.totalLandlords}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Users className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Tenants</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              {systemStats.totalTenants}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Users className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Agents</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              {systemStats.totalAgents}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Wrench className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            Service Providers
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              {systemStats.totalServiceProviders}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity and Pending Approvals */}
              <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">System Activity</h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flow-root">
                      <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                        {recentActivities.map((activity) => (
                          <li key={activity.id} className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                {activity.type === "user_registration" ? (
                                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                    <UserCog className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                  </div>
                                ) : activity.type === "property_added" ? (
                                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                    <Building className="h-5 w-5 text-green-600 dark:text-green-400" />
                                  </div>
                                ) : activity.type === "payment" ? (
                                  <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                                    <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                  </div>
                                ) : activity.type === "maintenance" ? (
                                  <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                                    <Wrench className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                                  </div>
                                ) : (
                                  <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                                    <Wrench className="h-5 w-5 text-red-600 dark:text-red-400" />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {activity.type === "user_registration"
                                    ? `New ${activity.role}: ${activity.user}`
                                    : activity.type === "property_added"
                                      ? `New Property: ${activity.propertyName} (${activity.units} units)`
                                      : activity.type === "payment"
                                        ? `Payment: ${activity.tenant} to ${activity.landlord}`
                                        : activity.type === "maintenance"
                                          ? `Maintenance: ${activity.issue} at ${activity.property}`
                                          : `New Service Provider: ${activity.name} (${activity.service})`}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                  {activity.date} at {activity.time}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        View all activity
                      </a>
                    </div>
                  </div>
                </div>

                {/* Pending Approvals */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Pending Approvals</h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flow-root">
                      <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                        {pendingApprovals.map((approval) => (
                          <li key={approval.id} className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                {approval.type === "landlord_verification" ? (
                                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                    <UserCog className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                  </div>
                                ) : approval.type === "property_verification" ? (
                                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                    <Building className="h-5 w-5 text-green-600 dark:text-green-400" />
                                  </div>
                                ) : approval.type === "service_provider_verification" ? (
                                  <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                                    <Wrench className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                                  </div>
                                ) : (
                                  <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {approval.type === "landlord_verification"
                                    ? `Landlord: ${approval.name}`
                                    : approval.type === "property_verification"
                                      ? `Property: ${approval.name} (Owner: ${approval.owner})`
                                      : approval.type === "service_provider_verification"
                                        ? `Service Provider: ${approval.name} (${approval.service})`
                                        : `Agent: ${approval.name}`}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                  {approval.documents} documents • Submitted on {approval.date}
                                </p>
                              </div>
                              <div>
                                <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                  Review
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        View all approvals
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
