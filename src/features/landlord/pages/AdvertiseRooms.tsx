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
        `http://localhost:5000/api/listings/landlord?page=${currentPage}&limit=${listingsPerPage}`,
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
    const response = await axios.delete(`http://localhost:5000/api/listings/${listingId}`, {
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

  if (loading) return <div><Loader/></div>

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950/60 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Your Listings</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            View, edit, and manage all your property listings in one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Listings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalListings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
                <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Views</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalViews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Impressions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalImpressions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Featured</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.featuredListings}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Listings</option>
                  <option value="featured">Featured Only</option>
                  <option value="active">Regular Only</option>
                </select>
              </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <div key={listing._id} className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={listing.images?.[0] || "/placeholder.svg?height=192&width=384"}
                    alt={listing.property?.name}
                    className="w-full h-full object-cover"
                  />
                  {listing.featured && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <div className="relative">
                      <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                        <MoreVertical className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {listing.property?.name}
                    </h3>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm">{listing.rating || 4.0}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm truncate">
                      {listing.property?.city} • {listing.property?.type}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">Listed {formatDate(listing.createdAt)}</span>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                        {formatCurrency(listing.property?.price || 0)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">per month</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{listing.totalClicks || 0} views</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {listing.totalImpressions || 0} impressions
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedListing(listing)
                        setShowStatsModal(true)
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span>Stats</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedListing(listing)
                        setShowImageModal(true)
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                    >
                      <ImageIcon className="h-4 w-4" />
                      <span>Images</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedListing(listing)
                        setShowEditModal(true)
                      }}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedListing(listing)
                        setShowDeleteModal(true)
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
                <Plus className="h-16 w-16" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">No listings found</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
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
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === page
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
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
