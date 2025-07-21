/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import {
  Building,
  Users,
  CreditCard,
  BellRing,
  FileText,
  Calendar,
  BarChart3,
  Shield,
} from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { getAuthHeaders } from "../../services/authService"

interface Tenant {
  _id: string
  user_id: string
  room_id: string
  lease_status: string
  join_date: string
  // add other fields as needed
}

interface FinanceStats {
  financialStats: {
    paidRent: number
    pendingRent: number
    totalRevenue: number
  }
  propertyStats: {
    maintenanceRooms: number
    occupancyRate: number
    occupiedRooms: number
    totalProperties: number
    totalRooms: number
    vacantRooms: number
  }
}

const CaretakerDashboard: React.FC = () => {
  const { user } = useAuth()

  const [tenants, setTenants] = useState<Tenant[]>([])
  const [tenantCount, setTenantCount] = useState(0)
  const [financeStats, setFinanceStats] = useState<FinanceStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [tenantsRes, financeRes] = await Promise.all([
          axios.get("http://localhost:5000/api/tenants/", {
            headers: getAuthHeaders(),
          }),
          axios.get("http://localhost:5000/api/landlord/financeStats", {
            headers: getAuthHeaders(),
          }),
        ])

        // Extract tenants list and count properly
        setTenants(tenantsRes.data?.data ?? [])
        setTenantCount(tenantsRes.data?.count ?? 0)

        setFinanceStats(financeRes.data ?? null)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const getAvailableActions = () => {
    const actions: Array<any> = []

    if (user?.permissions?.includes("property")) {
      actions.push({
        title: "Manage Properties",
        description: "View and manage property listings",
        link: "/landlord/dashboard/properties",
        icon: Building,
        color: "bg-blue-500",
        count: `${financeStats?.propertyStats.totalProperties ?? 0} Properties`,
      })
    }

    if (user?.permissions?.includes("tenants")) {
      actions.push({
        title: "Manage Tenants",
        description: "View and manage tenant information",
        link: "/landlord/dashboard/tenants",
        icon: Users,
        color: "bg-green-500",
        count: `${tenantCount} Tenants`,
      })
    }

    if (user?.permissions?.includes("finance")) {
      actions.push({
        title: "Payments & Revenue",
        description: "Track payments and financial data",
        link: "/landlord/dashboard/payments-revenue",
        icon: CreditCard,
        color: "bg-purple-500",
        count: `$${(financeStats?.financialStats.totalRevenue ?? 0).toLocaleString()} Total Revenue`,
      })
    }

    if (user?.permissions?.includes("maintenance")) {
      actions.push({
        title: "Maintenance Requests",
        description: "Handle maintenance and repair requests",
        link: "/landlord/dashboard/maintenance",
        icon: BellRing,
        color: "bg-orange-500",
        count: `${financeStats?.propertyStats.maintenanceRooms ?? 0} Maintenance Rooms`,
      })
    }

    if (user?.permissions?.includes("property")) {
      actions.push({
        title: "Advertise Property",
        description: "Create and manage property listings",
        link: "/landlord/dashboard/advertiseproperty",
        icon: FileText,
        color: "bg-indigo-500",
        count: "5 Active Ads", // static for now
      })
      actions.push({
        title: "Bookings & Visits",
        description: "Manage property viewings and appointments",
        link: "/landlord/dashboard/bookings",
        icon: Calendar,
        color: "bg-teal-500",
        count: "8 This Week", // static for now
      })
    }

    return actions
  }

  const availableActions = getAvailableActions()

  const quickStats = [
    {
      title: "Total Properties",
      value: `${financeStats?.propertyStats.totalProperties ?? 0}`,
      change: "+2 this month",
      changeType: "positive" as const,
      icon: Building,
    },
    {
      title: "Active Tenants",
      value: `${tenantCount}`,
      change: "+3 this month",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Maintenance Rooms",
      value: `${financeStats?.propertyStats.maintenanceRooms ?? 0}`,
      change: "-2 from last week",
      changeType: "negative" as const,
      icon: BellRing,
    },
    {
      title: "Total Revenue",
      value: `$${(financeStats?.financialStats.totalRevenue ?? 0).toLocaleString()}`,
      change: "+5% from last month",
      changeType: "positive" as const,
      icon: BarChart3,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Here's what's happening with your assigned properties today.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-500" />
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium">
              Caretaker
            </span>
          </div>
        </div>

        {!isLoading && availableActions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickStats.map((stat, idx) => {
              const IconComp = stat.icon
              return (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <IconComp className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span
                      className={`text-sm ${
                        stat.changeType === "positive"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {availableActions.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Your Management Areas
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Quick access to the areas you have permissions for
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {availableActions.map((action, idx) => {
                const IconComp = action.icon
                return (
                  <Link
                    key={idx}
                    to={action.link}
                    className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-lg ${action.color}`}>
                          <IconComp className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {action.count}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Shield className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No permissions assigned
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              You don’t have access yet. Please contact your landlord.
            </p>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Your Permissions
          </h2>
          <div className="flex flex-wrap gap-2">
            {user?.permissions && user.permissions.length > 0 ? (
              user.permissions.map((perm) => (
                <span
                  key={perm}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full capitalize font-medium"
                >
                  {perm}
                </span>
              ))
            ) : (
              <span className="text-gray-500 dark:text-gray-400">
                No permissions assigned
              </span>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/landlord/dashboard/settings"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="text-center">
                <Shield className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Account Settings
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Manage your profile
                </p>
              </div>
            </Link>

            {user?.permissions?.includes("maintenance") && (
              <Link
                to="/landlord/dashboard/maintenance"
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="text-center">
                  <BellRing className="mx-auto h-8 w-8 text-orange-500 mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Urgent Requests
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {financeStats?.propertyStats.maintenanceRooms ?? 0} pending
                  </p>
                </div>
              </Link>
            )}

            {user?.permissions?.includes("property") && (
              <Link
                to="/landlord/dashboard/properties"
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="text-center">
                  <Building className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Property Overview
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    View all properties
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaretakerDashboard
