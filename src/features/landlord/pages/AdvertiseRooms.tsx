"use client"
import { useState, useEffect } from "react"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  ImageIcon,
  MapPin,
  Calendar,
  TrendingUp,
  Star,
  Filter,
  Search,
  MoreVertical,
} from "lucide-react"
import type { Property } from "../../../types/properties.js"
import EditListingModal from "../components/EditListingModal.js"
import DeleteConfirmationModal from "../components/DeleteConfirmationModal.js"
import ListingStatsModal from "../components/ListingStatsModal.js"
import ImageManagementModal from "../components/ImageManagementModal.js"
import { getAuthHeaders } from "../../../services/authService.js"
import axios from "axios"
import { Loader } from "../../../components/Loader.js"

const AdvertiseRooms = () => {
  const [listings, setListings] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedListing, setSelectedListing] = useState<Property | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [stats, setStats] = useState({
    totalListings: 0,
    totalViews: 0,
    totalImpressions: 0,
    featuredListings: 0,
  })

  const listingsPerPage = 6

  useEffect(() => {
    fetchListings()
  }, [currentPage])

  const fetchListings = async () => {
    setLoading(true)
    try {
      const response = await axios(
        `https://nyumba-smart-server.onrender.com/api/listings/landlord?page=${currentPage}&limit=${listingsPerPage}`,
        {
          headers: getAuthHeaders(),
        },
      )

      if (response.status >= 200 && response.status < 300) {
        const data = response.data
        setListings(data.listings || [])
        setTotalPages(data.pagination?.totalPages || 1)

        // Calculate stats
        const totalViews = data.listings.reduce((sum: number, listing: Property) => sum + (listing.totalClicks || 0), 0)
        const totalImpressions = data.listings.reduce(
          (sum: number, listing: Property) => sum + (listing.totalImpressions || 0),
          0,
        )
        const featuredListings = data.listings.filter((listing: Property) => listing.featured).length

        setStats({
          totalListings: data.pagination?.totalListings || 0,
          totalViews,
          totalImpressions,
          featuredListings,
        })

        setError(null)
      } else {
        setError("Failed to fetch listings")
      }
    } catch (err) {
      setError("Error fetching listings")
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteListing = async (listingId: string) => {
    const response = await axios.delete(`https://nyumba-smart-server.onrender.com/api/listings/${listingId}`, {
      headers: getAuthHeaders(),
    })

    if (response.status >= 200 && response.status < 300) {
      await fetchListings() // Refresh the list
    } else {
      throw new Error(response.data?.error || "Failed to delete listing")
    }
  }

  const handleEditSuccess = () => {
    fetchListings()
    setShowEditModal(false)
    setSelectedListing(null)
  }

  const handleImageManagementSuccess = () => {
    fetchListings()
    setShowImageModal(false)
    setSelectedListing(null)
  }

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.property?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.property?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.property?.type?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "featured" && listing.featured) ||
      (filterStatus === "active" && !listing.featured)

    return matchesSearch && matchesFilter
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader /></div>

  return (
    <div className="min-h-screen bg-white-90 dark:bg-gray-950/60 pt-16 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Manage Your Listings
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            View, edit, and manage all your property listings in one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm sm:shadow-md p-3 sm:p-4 md:p-6">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-2 sm:ml-3 md:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Listings</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalListings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm sm:shadow-md p-3 sm:p-4 md:p-6">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-green-100 dark:bg-green-900/20">
                <Eye className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-2 sm:ml-3 md:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Views</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalViews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm sm:shadow-md p-3 sm:p-4 md:p-6">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-2 sm:ml-3 md:ml-4 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">Impressions</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">{stats.totalImpressions}</p>
              </div>

            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm sm:shadow-md p-3 sm:p-4 md:p-6">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-2 sm:ml-3 md:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Featured</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{stats.featuredListings}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/90 dark:bg-gray-900 rounded-lg shadow-sm sm:shadow-md p-4 sm:p-5 md:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
            <div className="w-full sm:w-auto sm:flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
              </div>
              <input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-8 sm:pl-10 pr-3 py-1 sm:py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="w-full sm:w-auto flex items-center space-x-2 sm:space-x-4">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full sm:w-auto text-sm sm:text-base border border-gray-300 dark:border-gray-800 rounded-lg px-2 sm:px-3 py-1 sm:py-2 bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Listings</option>
                <option value="featured">Featured Only</option>
                <option value="active">Regular Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-6">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <div key={listing._id} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm sm:shadow-md overflow-hidden">
                <div className="relative h-40 sm:h-48">
                  <img
                    src={listing.images?.[0] || "/placeholder.svg"}
                    alt={listing.property?.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {listing.featured && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <div className="relative">
                      <button className="p-1 sm:p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                        <MoreVertical className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {listing.property?.name}
                    </h3>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                      <span className="ml-1 text-xs sm:text-sm">{listing.rating || 4.0}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span className="text-xs sm:text-sm truncate">
                      {listing.property?.city} • {listing.property?.type}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span className="text-xs sm:text-sm">Listed {formatDate(listing.createdAt)}</span>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-primary-600 dark:text-primary-600">
                        {formatCurrency(listing.property?.price || 0)}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">per month</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{listing.totalClicks || 0} views</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        {listing.totalImpressions || 0} impressions
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {/* Stats Button */}
                    <button
                      onClick={() => {
                        setSelectedListing(listing)
                        setShowStatsModal(true)
                      }}
                      className="group relative flex-1 min-w-[100px] bg-slate-100 dark:bg-gray-950/40 border border-blue-200/30 dark:border-blue-800/30 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-xs hover:shadow-sm"
                    >
                      <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 rounded-lg transition-opacity" />
                      <BarChart3 className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm font-medium">Stats</span>
                    </button>

                    {/* Images Button */}
                    <button
                      onClick={() => {
                        setSelectedListing(listing)
                        setShowImageModal(true)
                      }}
                      className="group relative flex-1 min-w-[100px] bg-slate-100 dark:bg-gray-950/40 border border-green-200/30 dark:border-green-800/30 hover:bg-green-50 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-xs hover:shadow-sm"
                    >
                      <div className="absolute inset-0 bg-green-600 opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 rounded-lg transition-opacity" />
                      <ImageIcon className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm font-medium">Images</span>
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={() => {
                        setSelectedListing(listing)
                        setShowEditModal(true)
                      }}
                      className="group relative flex-1 min-w-[100px] bg-slate-100 dark:bg-gray-950/40 border border-yellow-200/30 dark:border-yellow-800/30 hover:bg-yellow-50 dark:hover:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-xs hover:shadow-sm"
                    >
                      <div className="absolute inset-0 bg-yellow-600 opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 rounded-lg transition-opacity" />
                      <Edit className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm font-medium">Edit</span>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => {
                        setSelectedListing(listing)
                        setShowDeleteModal(true)
                      }}
                      className="group relative min-w-[44px] h-[42px] text-slate-100 bg-red-600 dark:text-slate-100 dark:bg-red-600 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center shadow-xs hover:shadow-sm"
                    >
                      <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 rounded-lg transition-opacity" />
                      <Trash2 className="h-4 w-4 flex-shrink-0" />
                      <span className="sr-only">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 sm:py-12 md:py-16">
              <div className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-3 sm:mb-4">
                <Plus className="h-full w-full" />
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white">
                No listings found
              </h3>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter"
                  : "Start by creating your first property listing"}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <nav className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-lg font-medium transition-colors ${currentPage === page
                    ? "bg-primary-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Modals */}
      <EditListingModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setSelectedListing(null)
        }}
        listing={selectedListing}
        onSuccess={handleEditSuccess}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setSelectedListing(null)
        }}
        listing={selectedListing}
        onConfirm={handleDeleteListing}
      />

      <ListingStatsModal
        isOpen={showStatsModal}
        onClose={() => {
          setShowStatsModal(false)
          setSelectedListing(null)
        }}
        listing={selectedListing}
      />

      <ImageManagementModal
        isOpen={showImageModal}
        onClose={() => {
          setShowImageModal(false)
          setSelectedListing(null)
        }}
        listing={selectedListing}
        onSuccess={handleImageManagementSuccess}
      />
    </div>
  )
}

export default AdvertiseRooms