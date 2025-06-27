"use client"

import type React from "react"
import { useState } from "react"
import { Home, DollarSign, Settings, Bell, Search, Menu, X, LogOut, UserPlus, TrendingUp, Percent } from "lucide-react"
import { useTheme } from "../../../components/ThemeProvider.js"
import { useAuth } from "../../../context/AuthContext.js"
import { useNavigate } from "react-router-dom"
import WelcomeInfo from "../components/WelcomeInfo.js"
import Referralcode from "../components/Referralcode.js"
import Referrals from "../components/Referrals.js"

// Dummy data for the dashboard
const agentInfo = {
  walletBalance: 5000,
}

const referralHistory = [
  {
    id: 1,
    landlord: "John Doe",
    property: "Sunshine Apartments",
    date: "2023-05-10",
    status: "active",
    commission: 5000,
  },
  {
    id: 2,
    landlord: "Mary Smith",
    property: "Green Valley Residences",
    date: "2023-04-15",
    status: "active",
    commission: 6000,
  },
  {
    id: 3,
    landlord: "Robert Johnson",
    property: "Riverside Homes",
    date: "2023-03-20",
    status: "active",
    commission: 4500,
  },
  {
    id: 4,
    landlord: "Emily Brown",
    property: "Mountain View Apartments",
    date: "2023-02-25",
    status: "inactive",
    commission: 0,
  },
]

const payoutHistory = [
  { id: 1, date: "2023-05-01", amount: 10000, method: "M-Pesa", reference: "PO123456789" },
  { id: 2, date: "2023-04-01", amount: 12000, method: "M-Pesa", reference: "PO987654321" },
  { id: 3, date: "2023-03-01", amount: 8000, method: "M-Pesa", reference: "PO456789123" },
]

const AgentDashboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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
                <UserPlus className="w-5 h-5 mr-3" />
                Referrals
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
                <UserPlus className="w-5 h-5 mr-3" />
                Referrals
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
            onClick={() => setSidebarOpen(true)}>
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
                  className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-6 w-6" />
                </button>
              </div>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://randomuser.me/api/portraits/women/44.jpg"
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
          {/* welcome info card */}
          <WelcomeInfo />

          <div className="mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* referral code Card */}
              <Referralcode />

              {/* referral cards stats */}
                <Referrals />

              {/* Wallet Card */}
              <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Your Wallet</h3>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(agentInfo.walletBalance)}
                    </span>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Withdraw to M-Pesa
                    </button>
                  </div>
                </div>
              </div>

              {/* Referral History and Payout History */}
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Referral History */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Referral History</h3>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                      View all
                    </a>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flow-root">
                      <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                        {referralHistory.map((referral) => (
                          <li key={referral.id} className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <div
                                  className={`h-8 w-8 rounded-full flex items-center justify-center ${referral.status === "active"
                                    ? "bg-green-100 dark:bg-green-900"
                                    : "bg-gray-100 dark:bg-gray-700"
                                    }`}
                                >
                                  <UserPlus
                                    className={`h-5 w-5 ${referral.status === "active"
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-gray-500 dark:text-gray-400"
                                      }`}
                                  />
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {referral.landlord}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{referral.property}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {formatCurrency(referral.commission)}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(referral.date)}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Payout History */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Payout History</h3>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                      View all
                    </a>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flow-root">
                      <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                        {payoutHistory.map((payout) => (
                          <li key={payout.id} className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                                  <DollarSign className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  Payout to {payout.method}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Ref: {payout.reference}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {formatCurrency(payout.amount)}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(payout.date)}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commission Structure */}
              <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Commission Structure</h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                          <Percent className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                        </div>
                      </div>
                      <h4 className="text-center text-lg font-medium text-gray-900 dark:text-white mb-1">5%</h4>
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Commission on first month's rent
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                          <Percent className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                        </div>
                      </div>
                      <h4 className="text-center text-lg font-medium text-gray-900 dark:text-white mb-1">2%</h4>
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Recurring commission on monthly rent
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                        </div>
                      </div>
                      <h4 className="text-center text-lg font-medium text-gray-900 dark:text-white mb-1">KES 1,000</h4>
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Bonus for each new landlord referral
                      </p>
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

export default AgentDashboard
