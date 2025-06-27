"use client"

import React from "react"
import { useState } from "react"
import {
  Home,
  PenToolIcon as Tool,
  DollarSign,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  Briefcase,
  CheckCircle,
  Clock,
  MapPin,
} from "lucide-react"
import { useTheme } from "../../../components/ThemeProvider.js"
import { useAuth } from "../../../context/AuthContext.js"
import { useNavigate } from "react-router-dom"

// Dummy data for the dashboard
const providerInfo = {
  name: "Tech Solutions Ltd",
  serviceType: "WiFi Provider",
  joinDate: "2023-01-15",
  rating: 4.8,
  totalJobs: 45,
  completedJobs: 38,
  pendingJobs: 7,
  totalEarnings: 125000,
}

const activeJobs = [
  {
    id: 1,
    client: "Sunshine Apartments",
    address: "123 Moi Avenue, Nairobi",
    service: "WiFi Installation",
    date: "2023-05-20",
    status: "scheduled",
    amount: 15000,
  },
  {
    id: 2,
    client: "Green Valley Residences",
    address: "456 Kenyatta Road, Nairobi",
    service: "Network Troubleshooting",
    date: "2023-05-18",
    status: "in-progress",
    amount: 5000,
  },
  {
    id: 3,
    client: "Riverside Homes",
    address: "789 Uhuru Highway, Nairobi",
    service: "WiFi Upgrade",
    date: "2023-05-25",
    status: "scheduled",
    amount: 12000,
  },
]

const completedJobs = [
  {
    id: 1,
    client: "Mountain View Apartments",
    address: "321 Mombasa Road, Nairobi",
    service: "WiFi Installation",
    date: "2023-05-10",
    amount: 15000,
  },
  {
    id: 2,
    client: "Serene Gardens",
    address: "654 Ngong Road, Nairobi",
    service: "Router Replacement",
    date: "2023-05-05",
    amount: 8000,
  },
  {
    id: 3,
    client: "Urban Heights",
    address: "987 Thika Road, Nairobi",
    service: "Network Setup",
    date: "2023-04-28",
    amount: 20000,
  },
]

const clientReviews = [
  {
    id: 1,
    client: "John Doe",
    property: "Sunshine Apartments",
    rating: 5,
    comment: "Excellent service! Fast and professional installation.",
    date: "2023-05-12",
  },
  {
    id: 2,
    client: "Mary Smith",
    property: "Green Valley Residences",
    rating: 4,
    comment: "Good service, but took a bit longer than expected.",
    date: "2023-04-20",
  },
]

const ServiceProviderDashboard: React.FC = () => {
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

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Render stars for rating
  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>,
        )
      } else {
        stars.push(
          <svg key={i} className="w-5 h-5 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>,
        )
      }
    }
    return stars
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
                <Home className="w-5 h-5 mr-3" />
                Dashboard
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <Briefcase className="w-5 h-5 mr-3" />
                Jobs
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <DollarSign className="w-5 h-5 mr-3" />
                Earnings
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
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
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-md"
              >
                <Home className="w-5 h-5 mr-3" />
                Dashboard
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <Briefcase className="w-5 h-5 mr-3" />
                Jobs
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <DollarSign className="w-5 h-5 mr-3" />
                Earnings
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
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
                    placeholder="Search..."
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
                      src="https://randomuser.me/api/portraits/men/42.jpg"
                      alt="User profile"
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
                    Welcome, {providerInfo.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{providerInfo.serviceType} Dashboard</p>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <Tool className="h-4 w-4 mr-2" />
                    Update Availability
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Stats cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {/* Card 1 */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Briefcase className="h-6 w-6 text-primary-500" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Jobs</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              {providerInfo.totalJobs}
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
                        <CheckCircle className="h-6 w-6 text-primary-500" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            Completed Jobs
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              {providerInfo.completedJobs}
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
                        <Clock className="h-6 w-6 text-primary-500" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            Pending Jobs
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              {providerInfo.pendingJobs}
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
                        <DollarSign className="h-6 w-6 text-primary-500" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            Total Earnings
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              {formatCurrency(providerInfo.totalEarnings)}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Provider Profile Card */}
              <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Provider Profile</h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <div className="h-24 w-24 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <Tool className="h-12 w-12 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Service Type</p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">{providerInfo.serviceType}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {formatDate(providerInfo.joinDate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Rating</p>
                          <div className="mt-1 flex items-center">
                            {renderStars(providerInfo.rating)}
                            <span className="ml-2 text-sm text-gray-900 dark:text-white">{providerInfo.rating}/5</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completion Rate</p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {Math.round((providerInfo.completedJobs / providerInfo.totalJobs) * 100)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Jobs */}
              <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Active Jobs</h3>
                  <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                    View all
                  </a>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="flow-root">
                    <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                      {activeJobs.map((job) => (
                        <li key={job.id} className="py-5">
                          <div className="flex flex-col md:flex-row md:items-center">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center mb-1">
                                <p className="text-lg font-medium text-gray-900 dark:text-white truncate">
                                  {job.service}
                                </p>
                                <span
                                  className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                  ${
                                    job.status === "scheduled"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                  }`}
                                >
                                  {job.status === "scheduled" ? "Scheduled" : "In Progress"}
                                </span>
                              </div>
                              <p className="text-sm text-gray-900 dark:text-white mb-1">
                                <span className="font-medium">Client:</span> {job.client}
                              </p>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                                {job.address}
                              </div>
                            </div>
                            <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {formatCurrency(job.amount)}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(job.date)}</p>
                              <div className="mt-2">
                                <button
                                  type="button"
                                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                  {job.status === "scheduled" ? "Start Job" : "Complete Job"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Recent Completed Jobs and Client Reviews */}
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Recent Completed Jobs */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Recent Completed Jobs
                    </h3>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                      View all
                    </a>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flow-root">
                      <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                        {completedJobs.map((job) => (
                          <li key={job.id} className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {job.service}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {job.client} - {formatDate(job.date)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {formatCurrency(job.amount)}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Client Reviews */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Client Reviews</h3>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                      View all
                    </a>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flow-root">
                      <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                        {clientReviews.map((review) => (
                          <li key={review.id} className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                                  {renderStars(review.rating).map((star, index) => (
                                    <React.Fragment key={index}>{star}</React.Fragment>
                                  ))}
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {review.client} - {review.property}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{review.comment}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(review.date)}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
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

export default ServiceProviderDashboard
