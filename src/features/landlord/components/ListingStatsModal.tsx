"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Eye, TrendingUp, Calendar, MapPin, Star, BarChart3, ArrowUp, ChevronRight } from "lucide-react"
import type { Property } from "../../../types/properties.js"

interface ListingStatsModalProps {
  isOpen: boolean
  onClose: () => void
  listing: Property | null
}

const ListingStatsModal: React.FC<ListingStatsModalProps> = ({ isOpen, onClose, listing }) => {
  const [stats, setStats] = useState({
    dailyViews: [] as Array<{ date: string; views: number }>,
    totalViews: 0,
    totalImpressions: 0,
    averageRating: 0,
    viewsThisWeek: 0,
    viewsThisMonth: 0,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && listing) {
      fetchDetailedStats()
    }
  }, [isOpen, listing])

  const fetchDetailedStats = async () => {
    setLoading(true)
    try {
      const mockDailyViews = Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
        views: Math.floor(Math.random() * 20) + 1,
      })).reverse()

      setStats({
        dailyViews: mockDailyViews,
        totalViews: listing?.totalClicks || 0,
        totalImpressions: listing?.totalImpressions || 0,
        averageRating: listing?.rating || 4.0,
        viewsThisWeek: mockDailyViews.reduce((sum, day) => sum + day.views, 0),
        viewsThisMonth: (listing?.totalClicks || 0) * 1.5,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  if (!isOpen || !listing) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
      <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl w-full max-w-[95vw] md:max-w-4xl shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Listing Analytics
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Performance metrics for your property
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading property statistics...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Property Card */}
            <div className="dark:bg-gray-950/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="flex items-start gap-4">
                {listing.images?.[0] && (
                  <div className="relative flex-shrink-0">
                    <img
                      src={listing.images[0] || "/placeholder.svg"}
                      alt={listing.property?.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                    />
                    <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-900 px-2 py-1 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                      <span className="text-xs font-medium">
                        {listing.rating?.toFixed(1) || '4.0'}
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                    {listing.property?.name}
                  </h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mt-1 text-sm">
                    <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
                    <span className="truncate">
                      {listing.property?.city}, {listing.property?.area}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="bg-white dark:bg-gray-950 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Price
                      </p>
                      <p className="text-lg font-bold text-primary-600 dark:text-primary-500">
                        {formatCurrency(listing.property?.price || 0)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        listing.featured 
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' 
                          : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {listing.featured ? 'Featured' : 'Active'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-950/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-blue-100 dark:bg-primary-900/30 p-2">
                    <Eye className="h-5 w-5 text-blue-600 dark:text-primary-600" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Views</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {stats.totalViews}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs text-green-600 dark:text-green-400">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>12% from last month</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-950/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-purple-100 dark:bg-primary-900/30 p-2">
                    <TrendingUp className="h-5 w-5 text-primary-600 dark:text-primary-600" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Impressions</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {stats.totalImpressions}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs text-green-600 dark:text-green-400">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>8% from last month</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-950/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-green-100 dark:bg-primary-900/30 p-2">
                    <Calendar className="h-5 w-5 text-primary-600 dark:text-primary-600" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">This Week</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {stats.viewsThisWeek}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs text-red-600 dark:text-red-400">
                  <ArrowUp className="h-3 w-3 mr-1 transform rotate-180" />
                  <span>3% from last week</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-950/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-orange-100 dark:bg-primary-900/30 p-2">
                    <BarChart3 className="h-5 w-5 text-primary-600 dark:text-primary-600" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">This Month</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {Math.round(stats.viewsThisMonth)}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs text-green-600 dark:text-green-400">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>15% from last month</span>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Views Chart */}
              <div className="bg-white dark:bg-gray-950/50 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Daily Views
                  </h3>
                  <div className="flex items-center text-sm text-primary-600 dark:text-primary-600">
                    <span>Last 7 days</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
                <div className="space-y-3">
                  {stats.dailyViews.map((day, index) => {
                    const maxViews = Math.max(...stats.dailyViews.map(d => d.views));
                    const percentage = Math.max((day.views / maxViews) * 100, 5);
                    return (
                      <div key={index} className="flex items-center">
                        <div className="w-24 text-sm text-gray-500 dark:text-gray-400">
                          {day.date}
                        </div>
                        <div className="flex-1 mx-3">
                          <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div
                              className="absolute top-0 left-0 h-2 bg-gradient-to-r from-primary-600 to-purple-500 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                        <div className="w-10 text-right text-sm font-medium text-gray-900 dark:text-white">
                          {day.views}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white dark:bg-gray-950/50 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-950">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Click Rate
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {stats.totalImpressions > 0
                        ? `${((stats.totalViews / stats.totalImpressions) * 100).toFixed(1)}%`
                        : "N/A"}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-950">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Avg. Daily Views
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {Math.round(stats.viewsThisWeek / 7)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-950">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Listing Rating
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {stats.averageRating.toFixed(1)}/5.0
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-950">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Amenities
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {listing.amenities?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white dark:bg-gray-950/50 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Listing Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-primary-600/20">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Listed Date
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDate(listing.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-primary-600/20">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Last Updated
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDate(listing.updatedAt || listing.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-primary-600/20">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Property Type
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                      {listing.property?.type}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-primary-600/20">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Images
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {listing.images?.length || 0} photos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors shadow-sm"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default ListingStatsModal
