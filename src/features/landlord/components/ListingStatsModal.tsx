"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Eye, TrendingUp, Calendar, MapPin, Star, BarChart3 } from "lucide-react"
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
      <div className="bg-white dark:bg-gray-900 p-3 sm:p-6 rounded-lg w-full max-w-[95vw] md:max-w-4xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-3 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
            Listing Performance
          </h2>
          <button
            onClick={onClose}
            className="p-1 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-6 sm:py-8">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
              Loading stats...
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {/* Property Info */}
            <div className="bg-gray-50 dark:bg-gray-950/50 p-2 sm:p-3 md:p-4 rounded-lg">
              <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                {listing.images?.[0] && (
                  <img
                    src={listing.images[0] || "/placeholder.svg"}
                    alt={listing.property?.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white truncate">
                    {listing.property?.name}
                  </h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mt-1 text-xs sm:text-sm">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span className="truncate">
                      {listing.property?.city} • {listing.property?.type}
                    </span>
                  </div>
                  <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mt-2 gap-1">
                    <p className="text-sm sm:text-base md:text-lg font-bold text-primary-600 dark:text-primary-600 truncate">
                      {formatCurrency(listing.property?.price || 0)}
                    </p>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-xs sm:text-sm font-medium">
                        {listing.rating || 4.0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 sm:p-3 md:p-4 rounded-lg">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-blue-600 dark:text-blue-400" />
                  <div className="ml-2 sm:ml-3">
                    <p className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">
                      Total Views
                    </p>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {stats.totalViews}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-2 sm:p-3 md:p-4 rounded-lg">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-green-600 dark:text-green-400" />
                  <div className="ml-2 sm:ml-3">
                    <p className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400">
                      Impressions
                    </p>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-green-900 dark:text-green-100">
                      {stats.totalImpressions}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-2 sm:p-3 md:p-4 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-purple-600 dark:text-purple-400" />
                  <div className="ml-2 sm:ml-3">
                    <p className="text-xs sm:text-sm font-medium text-purple-600 dark:text-purple-400">
                      This Week
                    </p>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-purple-900 dark:text-purple-100">
                      {stats.viewsThisWeek}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 sm:p-3 md:p-4 rounded-lg">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-yellow-600 dark:text-yellow-400" />
                  <div className="ml-2 sm:ml-3">
                    <p className="text-xs sm:text-sm font-medium text-yellow-600 dark:text-yellow-400">
                      This Month
                    </p>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                      {Math.round(stats.viewsThisMonth)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Views Chart */}
            <div className="bg-white dark:bg-gray-950/50 p-3 sm:p-4 md:p-6 rounded-lg">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">
                Daily Views (Last 7 Days)
              </h3>
              <div className="space-y-1 sm:space-y-2 md:space-y-3">
                {stats.dailyViews.map((day, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-14 sm:w-16 md:w-20 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {day.date}
                    </div>
                    <div className="flex-1 mx-2 sm:mx-3 md:mx-4">
                      <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 sm:h-2">
                        <div
                          className="bg-primary-600 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.max(
                              (day.views / Math.max(...stats.dailyViews.map((d) => d.views))) * 100,
                              5
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-8 sm:w-10 md:w-12 text-xs sm:text-sm font-medium text-gray-900 dark:text-white text-right">
                      {day.views}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-6">
              <div className="bg-gray-50 dark:bg-gray-950/50 p-2 sm:p-3 md:p-4 rounded-lg">
                <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 md:mb-3">
                  Listing Details
                </h4>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Listed Date:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatDate(listing.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatDate(listing.updatedAt || listing.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <span
                      className={`font-medium ${
                        listing.featured
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {listing.featured ? "Featured" : "Active"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Images:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {listing.images?.length || 0} photos
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-950/50 p-2 sm:p-3 md:p-4 rounded-lg">
                <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 md:mb-3">
                  Performance Metrics
                </h4>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Click Rate:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {stats.totalImpressions > 0
                        ? `${((stats.totalViews / stats.totalImpressions) * 100).toFixed(1)}%`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Avg. Daily Views:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {Math.round(stats.viewsThisWeek / 7)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {stats.averageRating.toFixed(1)}/5.0
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Amenities:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {listing.amenities?.length || 0} listed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-3 sm:mt-4 md:mt-6">
          <button
            onClick={onClose}
            className="px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-950 dark:hover:bg-primary-600 text-gray-800 dark:text-white font-medium text-xs sm:text-sm md:text-base transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ListingStatsModal
