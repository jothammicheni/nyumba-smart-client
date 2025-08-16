/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import {
  ArrowLeft,
  Eye,
  MousePointer,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  BarChart3,
  Loader2,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { toast } from "sonner"
import { Link, useParams } from "react-router-dom"
import serviceGigService, { ServiceGig } from "../../../services/serviceGigService"

// Mock analytics data
const mockAnalytics = {
  overview: {
    totalViews: 1250,
    totalClicks: 89,
    totalImpressions: 2100,
    totalOrders: 12,
    conversionRate: 13.5,
    clickThroughRate: 4.2,
    averageOrderValue: 85,
    revenue: 1020,
  },
  trends: {
    views: [
      { date: "2024-01-01", views: 45, clicks: 3, impressions: 78 },
      { date: "2024-01-02", views: 52, clicks: 4, impressions: 89 },
      { date: "2024-01-03", views: 38, clicks: 2, impressions: 65 },
      { date: "2024-01-04", views: 67, clicks: 5, impressions: 112 },
      { date: "2024-01-05", views: 71, clicks: 6, impressions: 125 },
      { date: "2024-01-06", views: 59, clicks: 4, impressions: 98 },
      { date: "2024-01-07", views: 83, clicks: 7, impressions: 145 },
    ],
  },
  demographics: {
    locations: [
      { city: "New York", views: 450, percentage: 36 },
      { city: "Los Angeles", views: 312, percentage: 25 },
      { city: "Chicago", views: 188, percentage: 15 },
      { city: "Houston", views: 150, percentage: 12 },
      { city: "Others", views: 150, percentage: 12 },
    ],
    devices: [
      { name: "Mobile", value: 65, color: "#3b82f6" },
      { name: "Desktop", value: 30, color: "#10b981" },
      { name: "Tablet", value: 5, color: "#f59e0b" },
    ],
  },
  performance: {
    searchRanking: 3,
    categoryRanking: 1,
    competitorComparison: {
      yourGig: { views: 1250, orders: 12 },
      average: { views: 890, orders: 8 },
    },
  },
}

const timeRanges = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "1y", label: "Last year" },
]

export default function GigAnalyticsPage() {
  const params = useParams()
  const gigId = params.id as string

  const [gig, setGig] = useState<ServiceGig | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30d")
  const [analytics] = useState(mockAnalytics)

  useEffect(() => {
    fetchGig()
  }, [gigId])

  const fetchGig = async () => {
    try {
      setLoading(true)
      const response = await serviceGigService.getGigById(gigId)
      if (response.success) {
        setGig(response.data)
      } else {
        toast.error("Gig not found")
      }
    } catch (error) {
      console.error("Error fetching gig:", error)
      toast.error("Failed to load gig")
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getChangeIndicator = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100
    const isPositive = change > 0
    return {
      value: Math.abs(change).toFixed(1),
      isPositive,
      icon: isPositive ? TrendingUp : TrendingDown,
      color: isPositive ? "text-green-600" : "text-red-600",
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading analytics...</span>
        </div>
      </div>
    )
  }

  if (!gig) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gig not found</h1>
          <p className="text-gray-600 mb-4">The gig you're looking for doesn't exist.</p>
          <Link to="/service-provider/dashboard/manage/gigs">
            <Button>Back to My Gigs</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/manage/gigs" className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
                <ArrowLeft className="h-5 w-5" />
                Back to My Gigs
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Link to={`/gig/${gigId}`}>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Gig
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{gig.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="capitalize">
                  {gig.category}
                </Badge>
                <Badge
                  className={gig.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                >
                  {gig.status}
                </Badge>
                {gig.isFeatured && <Badge className="bg-primary-600">Featured</Badge>}
              </div>
            </div>
          </div>
          <p className="text-gray-600">Analytics and performance insights for your service gig</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.overview.totalViews)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">+12.5%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Clicks</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.overview.totalClicks)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">+8.3%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MousePointer className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Impressions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(analytics.overview.totalImpressions)}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">+15.7%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.overview.totalOrders)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">+25.0%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Click-Through Rate</p>
                <p className="text-3xl font-bold text-primary-600">{analytics.overview.clickThroughRate}%</p>
                <p className="text-sm text-gray-500 mt-1">Industry avg: 3.2%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Conversion Rate</p>
                <p className="text-3xl font-bold text-green-600">{analytics.overview.conversionRate}%</p>
                <p className="text-sm text-gray-500 mt-1">Industry avg: 8.7%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Avg. Order Value</p>
                <p className="text-3xl font-bold text-purple-600">
                  {formatCurrency(analytics.overview.averageOrderValue)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Total revenue: {formatCurrency(analytics.overview.revenue)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Views & Clicks Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Views, Clicks & Impressions Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.trends.views}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value, name) =>
                      [
                        value,
                        typeof name === "string"
                          ? name.charAt(0).toUpperCase() + name.slice(1)
                          : String(name)
                      ]
                    }
                  />
                  <Line type="monotone" dataKey="impressions" stroke="#8b5cf6" strokeWidth={2} name="impressions" />
                  <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} name="views" />
                  <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} name="clicks" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Device Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Device Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-4">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={analytics.demographics.devices}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {analytics.demographics.devices.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {analytics.demographics.devices.map((device) => (
                  <div key={device.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                      <span className="text-sm">{device.name}</span>
                    </div>
                    <span className="text-sm font-medium">{device.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Locations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Top Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.demographics.locations.map((location, index) => (
                  <div key={location.city} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-sm font-medium text-primary-600">
                        {index + 1}
                      </div>
                      <span className="font-medium">{location.city}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatNumber(location.views)}</p>
                      <p className="text-sm text-gray-500">{location.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance vs Average
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Search Ranking</span>
                    <Badge variant="secondary">#{analytics.performance.searchRanking}</Badge>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Category Ranking</span>
                    <Badge className="bg-green-100 text-green-800">#{analytics.performance.categoryRanking}</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Views</span>
                      <div className="text-right">
                        <span className="font-medium">
                          {formatNumber(analytics.performance.competitorComparison.yourGig.views)}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          vs {formatNumber(analytics.performance.competitorComparison.average.views)} avg
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{
                          width: `${
                            (analytics.performance.competitorComparison.yourGig.views /
                              (analytics.performance.competitorComparison.yourGig.views +
                                analytics.performance.competitorComparison.average.views)) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Orders</span>
                      <div className="text-right">
                        <span className="font-medium">
                          {formatNumber(analytics.performance.competitorComparison.yourGig.orders)}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          vs {formatNumber(analytics.performance.competitorComparison.average.orders)} avg
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${
                            (analytics.performance.competitorComparison.yourGig.orders /
                              (analytics.performance.competitorComparison.yourGig.orders +
                                analytics.performance.competitorComparison.average.orders)) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
