/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { AlertTriangle, Building, Home, Users, Loader2, RefreshCw, TrendingUp } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { getPropertyStats } from '../../../../services/propertyService.js'
import { fetchLandlordMaintenanceRequests } from '../../../../services/maintananceService.js'
import { CardContent, CardDescription, CardHeader, CardTitle, Card } from '../../../../components/ui/card.js'
// import { Badge } from "../../../components/ui/badge"
import { Badge } from '../../../../components/ui/badge.js'
import { Button } from '../../../../components/ui/button.js'
import { Toaster, toast } from "sonner"

function PropertyOverview() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [totalMaintenance, setTotalMaintenance] = useState(0)
  const [propertyStats, setPropertyStats] = useState({
    totalProperties: 0,
    totalRooms: 0,
    occupiedRooms: 0,
    vacantRooms: 0,
    maintenanceRooms: 0,
    occupancyRate: 0,
  })

  useEffect(() => {
    fetchPropertyStats()
    fetchMaintenanceRequests()
  }, [])

  const fetchPropertyStats = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await getPropertyStats()
      setPropertyStats(response.data)
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch property statistics")
      toast.error(err.response?.data?.error || "Failed to fetch property statistics")
    } finally {
      setLoading(false)
    }
  }

  const fetchMaintenanceRequests = async () => {
    try {
      const data = await fetchLandlordMaintenanceRequests()
      setTotalMaintenance(data.length)
    } catch (error) {
      console.error("Failed to fetch maintenance requests", error)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-4">
          <div className="h-8 bg-muted/10 rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-muted/10 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6 animate-fade-in">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Property Overview</h1>
          <p className="text-muted-foreground">
            Key metrics and statistics about your properties
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => {
              fetchPropertyStats()
              fetchMaintenanceRequests()
            }}
            className="w-full sm:w-auto bg-primary-600 text-white"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          ⚠️ {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Properties */}
        <Card className="hover-scale dark:bg-gray-950/50  shadow-md">
          <CardHeader className="flex flex-row items-center da justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{propertyStats.totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              Across your portfolio
            </p>
          </CardContent>
        </Card>

        {/* Occupied Units */}
        <Card className="hover-scale dark:bg-gray-950/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupied Units</CardTitle>
            <Users className="h-5 w-5 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{propertyStats.occupiedRooms}</div>
            <p className="text-xs text-muted-foreground">
              {propertyStats.totalRooms > 0
                ? `${Math.round((propertyStats.occupiedRooms / propertyStats.totalRooms) * 100)}% occupancy`
                : 'No units'}
            </p>
          </CardContent>
        </Card>

        {/* Vacant Units */}
        <Card className="hover-scale dark:bg-gray-950/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between  space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vacant Units</CardTitle>
            <Home className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{propertyStats.vacantRooms}</div>
            <p className="text-xs text-muted-foreground">
              {propertyStats.totalRooms > 0
                ? `${Math.round((propertyStats.vacantRooms / propertyStats.totalRooms) * 100)}% vacancy`
                : 'No units'}
            </p>
          </CardContent>
        </Card>

        {/* Maintenance Requests */}
        <Card className="hover-scale dark:bg-gray-950/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <AlertTriangle className="h-5 w-5 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMaintenance}</div>
            <p className="text-xs text-muted-foreground">
              {propertyStats.maintenanceRooms > 0
                ? `${propertyStats.maintenanceRooms} units affected`
                : 'No active issues'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Rooms */}
        <Card className="dark:bg-gray-950/50 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-4">
                <Home className="w-5 h-5 text-primary-600 dark:text-primary-600" />
              </div>
              Total Units
            </CardTitle>
            <CardDescription>Breakdown of all units across properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Units</span>
                <Badge variant="outline">{propertyStats.totalRooms}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Occupied</span>
                <Badge>{propertyStats.occupiedRooms}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Vacant</span>
                <Badge variant="outline">{propertyStats.vacantRooms}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Under Maintenance</span>
                <Badge variant="destructive">{propertyStats.maintenanceRooms}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Occupancy Rate */}
        <Card className="dark:bg-gray-950/50 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-4">
                <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-600" />
              </div>
              Occupancy Rate
            </CardTitle>
            <CardDescription>Current occupancy percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-32">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e0e0e0"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#007bff"
                    strokeWidth="3"
                    strokeDasharray={`${propertyStats.occupancyRate}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">
                    {propertyStats.occupancyRate}%
                  </span>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              {propertyStats.occupancyRate >= 80
                ? 'High occupancy rate'
                : propertyStats.occupancyRate >= 50
                  ? 'Moderate occupancy rate'
                  : 'Low occupancy rate'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PropertyOverview
