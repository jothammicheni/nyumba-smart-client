"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Users, Building, Home, Wrench, UserCog, BarChart3, RefreshCw } from "lucide-react"

// Types for the API response
interface SystemStats {
  totals: {
    totalUsers: number
    totalLandlords: number
    totalTenants: number
    totalAgents: number
    totalServiceProviders: number
    totalCaretakers: number
    totalProperties: number
    totalUnits: number
    occupiedUnits: number
    vacantUnits: number
    maintenanceRequests: number
  }
  newUsers: {
    today: Record<string, number>
    last7Days: Record<string, number>
    last14Days: Record<string, number>
    last1Month: Record<string, number>
    last2Months: Record<string, number>
    last6Months: Record<string, number>
  }
  activeUsersToday: number
}

interface ApiResponse {
  success: boolean
  data: SystemStats
}

// API call to fetch real data
const fetchSystemStats = async (): Promise<SystemStats> => {
  try {
    const response = await fetch("https://nyumba-smart-server.onrender.com/api/admin/system-stats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if needed
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ApiResponse = await response.json()

    if (!result.success) {
      throw new Error("API returned unsuccessful response")
    }

    return result.data
  } catch (error) {
    console.error("Error fetching system stats:", error)
    throw error
  }
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<SystemStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTimeRange, setSelectedTimeRange] = useState<keyof SystemStats["newUsers"]>("last7Days")
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const loadStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchSystemStats()
      setStats(data)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load system statistics")
      console.error("Error loading stats:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStats()
  }, [])

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        loadStats()
      },
      5 * 60 * 1000,
    ) // 5 minutes

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    loadStats()
  }

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error && !stats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600 dark:text-gray-400">No data available</p>
      </div>
    )
  }

  const { totals, newUsers, activeUsersToday } = stats
  const occupancyRate = totals.totalUnits > 0 ? Math.round((totals.occupiedUnits / totals.totalUnits) * 100) : 0

  const timeRangeLabels = {
    today: "Today",
    last7Days: "Last 7 Days",
    last14Days: "Last 14 Days",
    last1Month: "Last Month",
    last2Months: "Last 2 Months",
    last6Months: "Last 6 Months",
  }

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color = "blue",
    subtitle,
  }: {
    title: string
    value: number | string
    icon: React.ComponentType<{ className?: string }>
    color?: string
    subtitle?: string
  }) => {
    const colorClasses = {
      blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
      orange: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
      red: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
      gray: "bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400",
    }

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</p>
            {subtitle && <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Overview of your TenaHub platform performance</p>
        </div>
        <div className="flex items-center space-x-4">
          {lastUpdated && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Error banner if there's an error but we have cached data */}
      {error && stats && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
          <p className="text-yellow-800 dark:text-yellow-200 text-sm">Warning: {error}. Showing cached data.</p>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={totals.totalUsers}
          icon={Users}
          color="blue"
          subtitle={`${activeUsersToday} active today`}
        />
        <StatCard
          title="Total Properties"
          value={totals.totalProperties}
          icon={Building}
          color="green"
          subtitle={`${totals.totalUnits} total units`}
        />
        <StatCard
          title="Occupancy Rate"
          value={`${occupancyRate}%`}
          icon={Home}
          color="purple"
          subtitle={`${totals.occupiedUnits}/${totals.totalUnits} occupied`}
        />
        <StatCard
          title="Maintenance Requests"
          value={totals.maintenanceRequests}
          icon={Wrench}
          color={totals.maintenanceRequests > 0 ? "orange" : "gray"}
          subtitle={totals.maintenanceRequests > 0 ? "Pending requests" : "No pending requests"}
        />
      </div>

      {/* User Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">User Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard title="Landlords" value={totals.totalLandlords} icon={UserCog} color="blue" />
          <StatCard title="Tenants" value={totals.totalTenants} icon={Users} color="green" />
          <StatCard title="Agents" value={totals.totalAgents} icon={Users} color="purple" />
          <StatCard title="Service Providers" value={totals.totalServiceProviders} icon={Wrench} color="orange" />
          <StatCard title="Caretakers" value={totals.totalCaretakers} icon={UserCog} color="gray" />
        </div>
      </div>

      {/* New User Registrations */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">New User Registrations</h2>
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value as keyof SystemStats["newUsers"])}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            {Object.entries(timeRangeLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Landlords</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {newUsers[selectedTimeRange].landlord || 0}
                </p>
              </div>
              <UserCog className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Tenants</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {newUsers[selectedTimeRange].tenant || 0}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Agents</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  {newUsers[selectedTimeRange].agent || 0}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Service Providers</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                  {newUsers[selectedTimeRange]["service-provider"] || 0}
                </p>
              </div>
              <Wrench className="h-8 w-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Caretakers</p>
                <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                  {newUsers[selectedTimeRange].caretaker || 0}
                </p>
              </div>
              <UserCog className="h-8 w-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Total new users for selected range */}
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total New Users ({timeRangeLabels[selectedTimeRange]})
            </span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {Object.values(newUsers[selectedTimeRange]).reduce((sum, count) => sum + count, 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Property & Unit Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Property Statistics</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Properties</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {totals.totalProperties.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Units</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {totals.totalUnits.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Occupied Units</span>
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                {totals.occupiedUnits.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Vacant Units</span>
              <span className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                {totals.vacantUnits.toLocaleString()}
              </span>
            </div>

            {/* Occupancy Rate Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Occupancy Rate</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{occupancyRate}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${occupancyRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">System Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Active Users Today</span>
              <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                {activeUsersToday.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Pending Maintenance</span>
              <span
                className={`text-lg font-semibold ${
                  totals.maintenanceRequests > 0
                    ? "text-red-600 dark:text-red-400"
                    : "text-green-600 dark:text-green-400"
                }`}
              >
                {totals.maintenanceRequests.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Occupancy Rate</span>
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">{occupancyRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">New Users ({timeRangeLabels[selectedTimeRange]})</span>
              <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                {Object.values(newUsers[selectedTimeRange]).reduce((sum, count) => sum + count, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">Manage Users</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <Building className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
            <span className="text-green-700 dark:text-green-300 font-medium">View Properties</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
            <Wrench className="h-5 w-5 text-orange-600 dark:text-orange-400 mr-2" />
            <span className="text-orange-700 dark:text-orange-300 font-medium">Maintenance</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
            <span className="text-purple-700 dark:text-purple-300 font-medium">View Reports</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
