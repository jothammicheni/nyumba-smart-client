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
  Home,
  Wrench,
  ClipboardList,
  TrendingUp,
  RefreshCw,
  Eye,
  EyeOff,
  PieChart as PieChartIcon
} from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { getAuthHeaders } from "../../services/authService"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Toaster, toast } from "sonner"

interface Tenant {
  _id: string
  user_id: string
  room_id: string
  lease_status: string
  join_date: string
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
  const [viewMode, setViewMode] = useState<"cards" | "grid">("cards")

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [tenantsRes, financeRes] = await Promise.all([
          axios.get("https://nyumba-smart-server.onrender.com/api/tenants/", {
            headers: getAuthHeaders(),
          }),
          axios.get("https://nyumba-smart-server.onrender.com/api/landlord/financeStats", {
            headers: getAuthHeaders(),
          }),
        ])

        setTenants(tenantsRes.data?.data ?? [])
        setTenantCount(tenantsRes.data?.count ?? 0)
        setFinanceStats(financeRes.data ?? null)
        toast.success('Dashboard data loaded successfully')
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        toast.error("Failed to load dashboard data")
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
        color: "bg-primary-600/30",
        count: `${financeStats?.propertyStats.totalProperties ?? 0} Properties`,
      })
    }

    if (user?.permissions?.includes("tenants")) {
      actions.push({
        title: "Manage Tenants",
        description: "View and manage tenant information",
        link: "/landlord/dashboard/tenants",
        icon: Users,
        color: "bg-primary-600/30",
        count: `${tenantCount} Tenants`,
      })
    }

    if (user?.permissions?.includes("finance")) {
      actions.push({
        title: "Payments & Revenue",
        description: "Track payments and financial data",
        link: "/landlord/dashboard/payments-revenue",
        icon: CreditCard,
        color: "bg-primary-600/30",
        count: `$${(financeStats?.financialStats.totalRevenue ?? 0).toLocaleString()} Revenue`,
      })
    }

    if (user?.permissions?.includes("maintenance")) {
      actions.push({
        title: "Maintenance",
        description: "Handle maintenance requests",
        link: "/landlord/dashboard/maintenance",
        icon: Wrench,
        color: "bg-primary-600/30",
        count: `${financeStats?.propertyStats.maintenanceRooms ?? 0} Requests`,
      })
    }

    if (user?.permissions?.includes("property")) {
      actions.push({
        title: "Advertise Property",
        description: "Create and manage listings",
        link: "/landlord/dashboard/advertiseproperty",
        icon: ClipboardList,
        color: "bg-primary-600/30",
        count: "5 Active Ads",
      })
      actions.push({
        title: "Bookings & Visits",
        description: "Manage viewings and appointments",
        link: "/landlord/dashboard/bookings",
        icon: Calendar,
        color: "bg-primary-600/30",
        count: "8 This Week",
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
      color: "text-blue-500",
    },
    {
      title: "Active Tenants",
      value: `${tenantCount}`,
      change: "+3 this month",
      changeType: "positive" as const,
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "Maintenance",
      value: `${financeStats?.propertyStats.maintenanceRooms ?? 0}`,
      change: "-2 from last week",
      changeType: "negative" as const,
      icon: Wrench,
      color: "text-orange-500",
    },
    {
      title: "Total Revenue",
      value: `$${(financeStats?.financialStats.totalRevenue ?? 0).toLocaleString()}`,
      change: "+5% from last month",
      changeType: "positive" as const,
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ]

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Dashboard data refreshed')
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-4">
          <div className="h-8 bg-muted/10 rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-muted/10 rounded animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-40 bg-muted/10 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto p-4 space-y-6 animate-fade-in bg-gradient-to-br from-slate-100 via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back, {user?.name}
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your assigned properties today.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={refreshData}
            className="w-full sm:w-auto bg-primary-600 text-white hover:bg-primary-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => setViewMode(viewMode === "cards" ? "grid" : "cards")}
            className="w-full sm:w-auto hover:bg-primary-600"
          >
            {viewMode === "cards" ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Grid View
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Card View
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, idx) => {
          const IconComp = stat.icon
          return (
            <Card key={idx} className="hover:scale-[1.02] transition-transform duration-200 dark:bg-gray-900/50 dark:border-gray-800/30 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <IconComp className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.changeType === "positive" ? "text-green-500" : "text-red-500"}>
                    {stat.change}
                  </span>
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Property Stats Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dark:bg-gray-900/60 dark:border-gray-800/30 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-12 h-12 bg-primary-600/20 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-4">
                <PieChartIcon className="w-6 h-6 text-primary-600 dark:text-primary-600" />
              </div>
              <span>Property Occupancy</span>
            </CardTitle>
            <CardDescription>Current occupancy status across properties</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div>
                  <p className="font-medium text-sm">Occupied Rooms</p>
                  <p className="text-xs text-muted-foreground">Currently rented</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{financeStats?.propertyStats.occupiedRooms ?? 0}</p>
                <p className="text-xs text-muted-foreground">
                  {financeStats?.propertyStats.occupancyRate ? 
                    `${financeStats.propertyStats.occupancyRate.toFixed(1)}%` : '0%'}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <div>
                  <p className="font-medium text-sm">Vacant Rooms</p>
                  <p className="text-xs text-muted-foreground">Available for rent</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{financeStats?.propertyStats.vacantRooms ?? 0}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <div>
                  <p className="font-medium text-sm">Maintenance Rooms</p>
                  <p className="text-xs text-muted-foreground">Under repair</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{financeStats?.propertyStats.maintenanceRooms ?? 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900/50 shadow-md dark:border-gray-800/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-12 h-12 bg-primary-600/20 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-4">
                <BarChart3 className="w-6 h-6 text-primary-600 dark:text-primary-600" />
              </div>
              <span>Financial Overview</span>
            </CardTitle>
            <CardDescription>Payment status distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Paid Rent</span>
                <span className="text-muted-foreground">
                  ${(financeStats?.financialStats.paidRent ?? 0).toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300 ease-in-out"
                  style={{ 
                    width: `${financeStats?.financialStats.totalRevenue ? 
                      (financeStats.financialStats.paidRent / financeStats.financialStats.totalRevenue) * 100 : 0}%` 
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Pending Rent</span>
                <span className="text-muted-foreground">
                  ${(financeStats?.financialStats.pendingRent ?? 0).toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300 ease-in-out"
                  style={{ 
                    width: `${financeStats?.financialStats.totalRevenue ? 
                      (financeStats.financialStats.pendingRent / financeStats.financialStats.totalRevenue) * 100 : 0}%` 
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Management Areas */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Your Management Areas
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Quick access to the areas you have permissions for
        </p>
      </div>

      {availableActions.length > 0 ? (
        viewMode === "cards" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {availableActions.map((action, idx) => {
              const IconComp = action.icon
              return (
                <Link
                  key={idx}
                  to={action.link}
                  className="block p-6 bg-white dark:bg-gray-900/60 dark:border-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-lg ${action.color}`}>
                        <IconComp className="h-6 w-6 text-primary-600" />
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {availableActions.map((action, idx) => {
              const IconComp = action.icon
              return (
                <Link
                  key={idx}
                  to={action.link}
                  className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:scale-[1.02] transition-colors"
                >
                  <div className="text-center">
                    <div className={`mx-auto h-12 w-12 ${action.color} rounded-full flex items-center justify-center mb-2`}>
                      <IconComp className="h-6 w-6 text-primary-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {action.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {action.count}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        )
      ) : (
        <div className="text-center py-12">
          <Shield className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No permissions assigned
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            You don't have access yet. Please contact your landlord.
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 bg-white dark:bg-gray-900/50 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/landlord/dashboard/settings"
            className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg dark:bg-gray-950/50 duration-300 hover:scale-105 transition-colors"
          >
            <div className="text-center">
              <Shield className="mx-auto h-8 w-8 text-blue-500 mb-2" />
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
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:bg-gray-950/50 duration-300 hover:scale-105 transition-colors"
            >
              <div className="text-center">
                <BellRing className="mx-auto h-8 w-8 text-orange-500 mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Maintenance
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {financeStats?.propertyStats.maintenanceRooms ?? 0} requests
                </p>
              </div>
            </Link>
          )}

          {user?.permissions?.includes("property") && (
            <Link
              to="/landlord/dashboard/properties"
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:bg-gray-950/50 duration-300 hover:scale-105 transition-colors"
            >
              <div className="text-center">
                <Building className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Properties
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {financeStats?.propertyStats.totalProperties ?? 0} properties
                </p>
              </div>
            </Link>
          )}

          {user?.permissions?.includes("tenants") && (
            <Link
              to="/landlord/dashboard/tenants"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="text-center">
                <Users className="mx-auto h-8 w-8 text-green-500 mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Tenants
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {tenantCount} active tenants
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Permissions */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Your Permissions
        </h2>
        <div className="flex flex-wrap gap-2">
          {user?.permissions && user.permissions.length > 0 ? (
            user.permissions.map((perm) => (
              <Badge
                key={perm}
                variant="outline"
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full capitalize font-medium"
              >
                {perm}
              </Badge>
            ))
          ) : (
            <span className="text-gray-500 dark:text-gray-400">
              No permissions assigned
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default CaretakerDashboard
