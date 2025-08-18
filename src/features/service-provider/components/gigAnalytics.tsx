/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { AnalyticsCard } from "../../../components/ui/analytics-card"
import { MetricCard } from "../../../components/ui/metric-card"
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
      { name: "Mobile", value: 65, color: "hsl(var(--chart-1))" },
      { name: "Desktop", value: 30, color: "hsl(var(--chart-2))" },
      { name: "Tablet", value: 5, color: "hsl(var(--chart-3))" },
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-foreground">Loading analytics...</span>
        </div>
      </div>
    )
  }

  if (!gig) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Gig not found</h1>
          <p className="text-muted-foreground mb-4">The gig you're looking for doesn't exist.</p>
          <Link to="/service-provider/dashboard/manage/gigs">
            <Button>Back to My Gigs</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-card border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-4">
              <Link 
                to="/service-provider/dashboard/manage/gigs" 
                className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden xs:inline">Back to My Gigs</span>
                <span className="xs:hidden">Back</span>
              </Link>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 sm:w-40 h-8 sm:h-10 text-xs sm:text-sm">
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
              <Link to={`/service-provider/dashboard/manage/gigs/view/${gigId}`}>
                <Button variant="outline" size="sm" className="h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm">
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">View Gig</span>
                  <span className="sm:hidden">View</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground tracking-tight line-clamp-2">{gig.title}</h1>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2">
                <Badge variant="outline" className="capitalize text-xs sm:text-sm">
                  {gig.category}
                </Badge>
                <Badge
                  className={gig.status === "active" ? "bg-success/20 text-success border-success/30 text-xs sm:text-sm" : "bg-muted/20 text-muted-foreground text-xs sm:text-sm"}
                >
                  {gig.status}
                </Badge>
                {gig.isFeatured && <Badge className="bg-primary text-xs sm:text-sm">Featured</Badge>}
              </div>
            </div>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">Analytics and performance insights for your service gig</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <AnalyticsCard
            title="Total Views"
            value={formatNumber(analytics.overview.totalViews)}
            change={{
              value: "12.5",
              isPositive: true,
              icon: TrendingUp
            }}
            icon={Eye}
            variant="primary"
          />

          <AnalyticsCard
            title="Total Clicks"
            value={formatNumber(analytics.overview.totalClicks)}
            change={{
              value: "8.3",
              isPositive: true,
              icon: TrendingUp
            }}
            icon={MousePointer}
            variant="success"
          />

          <AnalyticsCard
            title="Impressions"
            value={formatNumber(analytics.overview.totalImpressions)}
            change={{
              value: "15.7",
              isPositive: true,
              icon: TrendingUp
            }}
            icon={Target}
            variant="warning"
          />

          <AnalyticsCard
            title="Total Orders"
            value={formatNumber(analytics.overview.totalOrders)}
            change={{
              value: "25.0",
              isPositive: true,
              icon: TrendingUp
            }}
            icon={DollarSign}
            variant="success"
          />
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <MetricCard
            title="Click-Through Rate"
            value={`${analytics.overview.clickThroughRate}%`}
            subtitle="Industry avg: 3.2%"
            variant="primary"
          />

          <MetricCard
            title="Conversion Rate"
            value={`${analytics.overview.conversionRate}%`}
            subtitle="Industry avg: 8.7%"
            variant="success"
          />

          <MetricCard
            title="Avg. Order Value"
            value={formatCurrency(analytics.overview.averageOrderValue)}
            subtitle={`Total revenue: ${formatCurrency(analytics.overview.revenue)}`}
            variant="warning"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Views & Clicks Trend */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-foreground text-sm sm:text-base lg:text-lg">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Views, Clicks & Impressions Trend</span>
                <span className="sm:hidden">Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={250} className="sm:!h-[300px]">
                <LineChart data={analytics.trends.views}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => {
                      const d = new Date(date);
                      return window.innerWidth < 640 ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : d.toLocaleDateString();
                    }}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    interval="preserveStartEnd"
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="impressions" 
                    stroke="hsl(var(--chart-4))" 
                    strokeWidth={2} 
                    name="impressions"
                    dot={{ fill: "hsl(var(--chart-4))", strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={2} 
                    name="views"
                    dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={2} 
                    name="clicks"
                    dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Device Breakdown */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-foreground text-sm sm:text-base lg:text-lg">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                Device Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <ResponsiveContainer width="100%" height={150} className="sm:!h-[200px]">
                  <PieChart>
                    <Pie
                      data={analytics.demographics.devices}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                      className="sm:!inner-radius-[60px] sm:!outer-radius-[80px]"
                    >
                      {analytics.demographics.devices.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => `${value}%`}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {analytics.demographics.devices.map((device) => (
                  <div key={device.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: device.color }} />
                      <span className="text-xs sm:text-sm text-foreground">{device.name}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-foreground">{device.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Top Locations */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-foreground text-sm sm:text-base lg:text-lg">
                <Target className="h-4 w-4 sm:h-5 sm:w-5" />
                Top Locations
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 sm:space-y-4">
                {analytics.demographics.locations.map((location, index) => (
                  <div key={location.city} className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-muted/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/20 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium text-primary">
                        {index + 1}
                      </div>
                      <span className="font-medium text-foreground text-sm sm:text-base">{location.city}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground text-sm sm:text-base">{formatNumber(location.views)}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{location.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Comparison */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-foreground text-sm sm:text-base lg:text-lg">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Performance vs Average</span>
                <span className="sm:hidden">Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center p-2 sm:p-3 rounded-lg bg-muted/10 backdrop-blur-sm">
                    <span className="text-xs sm:text-sm text-muted-foreground">Search Ranking</span>
                    <Badge variant="secondary" className="text-xs sm:text-sm">#{analytics.performance.searchRanking}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 sm:p-3 rounded-lg bg-success/10 backdrop-blur-sm">
                    <span className="text-xs sm:text-sm text-muted-foreground">Category Ranking</span>
                    <Badge className="bg-success/20 text-success border-success/30 text-xs sm:text-sm">#{analytics.performance.categoryRanking}</Badge>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1 sm:gap-0">
                      <span className="text-xs sm:text-sm text-foreground">Views</span>
                      <div className="text-left sm:text-right">
                        <span className="font-medium text-foreground text-xs sm:text-sm">
                          {formatNumber(analytics.performance.competitorComparison.yourGig.views)}
                        </span>
                        <span className="text-xs text-muted-foreground ml-1 sm:ml-2">
                          vs {formatNumber(analytics.performance.competitorComparison.average.views)} avg
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-1.5 sm:h-2">
                      <div
                        className="bg-primary h-1.5 sm:h-2 rounded-full transition-all duration-500"
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
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1 sm:gap-0">
                      <span className="text-xs sm:text-sm text-foreground">Orders</span>
                      <div className="text-left sm:text-right">
                        <span className="font-medium text-foreground text-xs sm:text-sm">
                          {formatNumber(analytics.performance.competitorComparison.yourGig.orders)}
                        </span>
                        <span className="text-xs text-muted-foreground ml-1 sm:ml-2">
                          vs {formatNumber(analytics.performance.competitorComparison.average.orders)} avg
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-1.5 sm:h-2">
                      <div
                        className="bg-success h-1.5 sm:h-2 rounded-full transition-all duration-500"
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
