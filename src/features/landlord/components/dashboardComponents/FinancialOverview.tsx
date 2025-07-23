import React, { useEffect, useState } from "react"
import axios from "axios"
import { AlertTriangle, CreditCard, DollarSign, Percent, RefreshCw, Loader2 } from "lucide-react"
import { getAuthHeaders } from "../../../../services/authService.js"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../../components/ui/card.js"
import { Badge } from "../../../../components/ui/badge.js"
import { Button } from "../../../../components/ui/button.js"
import { Toaster, toast } from "sonner"

const FinancialOverview = () => {
  const [financialStats, setFinancialStats] = useState({
    totalRevenue: 0,
    paidRent: 0,
    pendingRent: 0,
  })

  const [propertyStats, setPropertyStats] = useState({
    totalProperties: 0,
    totalRooms: 0,
    occupiedRooms: 0,
    vacantRooms: 0,
    maintenanceRooms: 0,
    occupancyRate: 0,
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchStats = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await axios.get("https://nyumba-smart-server.onrender.com/api/landlord/financeStats", {
        headers: getAuthHeaders(),
      })
      setFinancialStats(response.data.financialStats)
      setPropertyStats(response.data.propertyStats)
      toast.success('Financial data updated successfully')
    } catch (error) {
      setError("Error fetching financial statistics")
      toast.error("Failed to load financial data")
      console.error("Error fetching dashboard stats:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount)
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
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Financial Overview</h1>
          <p className="text-muted-foreground">
            Key financial metrics and performance indicators
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={fetchStats}
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
        {/* Total Revenue */}
        <Card className="hover-scale dark:bg-gray-950/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expected Rent</CardTitle>
            <DollarSign className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(financialStats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              From all properties
            </p>
          </CardContent>
        </Card>

        {/* Paid Rent */}
        <Card className="hover-scale dark:bg-gray-950/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Rent</CardTitle>
            <CreditCard className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {formatCurrency(financialStats.paidRent)}
            </div>
            <p className="text-xs text-muted-foreground">
              {financialStats.totalRevenue > 0
                ? `${Math.round((financialStats.paidRent / financialStats.totalRevenue) * 100)}% collected`
                : 'No revenue'}
            </p>
          </CardContent>
        </Card>

        {/* Pending Rent */}
        <Card className="hover-scale dark:bg-gray-950/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Rent</CardTitle>
            <AlertTriangle className="h-5 w-5 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {formatCurrency(financialStats.pendingRent)}
            </div>
            <p className="text-xs text-muted-foreground">
              {financialStats.totalRevenue > 0
                ? `${Math.round((financialStats.pendingRent / financialStats.totalRevenue) * 100)}% outstanding`
                : 'No revenue'}
            </p>
          </CardContent>
        </Card>

        {/* Occupancy Rate */}
        <Card className="hover-scale dark:bg-gray-950/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Percent className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{propertyStats.occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">
              {propertyStats.occupiedRooms} of {propertyStats.totalRooms} units
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rent Collection Progress */}
        <Card className="dark:bg-gray-950/50 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Rent Collection
            </CardTitle>
            <CardDescription>Progress towards total expected rent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Paid Rent</span>
                <span className="text-base font-medium text-green-600">
                  {formatCurrency(financialStats.paidRent)}
                </span>
              </div>
              <div className="w-full bg-green-600 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${financialStats.totalRevenue > 0
                      ? (financialStats.paidRent / financialStats.totalRevenue) * 100
                      : 0}%`
                  }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Pending Rent</span>
                <span className="text-base font-medium text-yellow-600">
                  {formatCurrency(financialStats.pendingRent)}
                </span>
              </div>
              <div className="w-full bg-yellow-600 rounded-full h-2">
                <div
                  className="bg-yellow-600 h-2 rounded-full"
                  style={{
                    width: `${financialStats.totalRevenue > 0
                      ? (financialStats.pendingRent / financialStats.totalRevenue) * 100
                      : 0}%`
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Occupancy */}
        <Card className="dark:bg-gray-950/50 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Percent className="h-5 w-5" />
              Property Occupancy
            </CardTitle>
            <CardDescription>Current occupancy status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Occupied Units</span>
                <Badge>{propertyStats.occupiedRooms}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Vacant Units</span>
                <Badge variant="outline">{propertyStats.vacantRooms}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Under Maintenance</span>
                <Badge variant="destructive">{propertyStats.maintenanceRooms}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Units</span>
                <Badge variant="default">{propertyStats.totalRooms}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default FinancialOverview
