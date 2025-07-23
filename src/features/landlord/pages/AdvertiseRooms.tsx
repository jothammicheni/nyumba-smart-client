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
  RefreshCw,
} from "lucide-react"
import type { Property } from "../../../types/properties.js"
import EditListingModal from "../components/EditListingModal.js"
import DeleteConfirmationModal from "../components/DeleteConfirmationModal.js"
import ListingStatsModal from "../components/ListingStatsModal.js"
import ImageManagementModal from "../components/ImageManagementModal.js"
import { getAuthHeaders } from "../../../services/authService.js"
import axios from "axios"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu"
import { Toaster, toast } from "sonner"
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
        toast.error("Failed to fetch listings")
      }
    } catch (err) {
      setError("Error fetching listings")
      toast.error("Error fetching listings")
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteListing = async (listingId: string) => {
    try {
      const response = await axios.delete(`https://nyumba-smart-server.onrender.com/api/listings/${listingId}`, {
        headers: getAuthHeaders(),
      })

      if (response.status >= 200 && response.status < 300) {
        await fetchListings()
        toast.success('Listing deleted successfully')
      } else {
        throw new Error(response.data?.error || "Failed to delete listing")
      }
    } catch (err) {
      toast.error("Failed to delete listing")
      console.error("Error deleting listing:", err)
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

  if (loading) return <Loader />

  return (
    <div className="container mx-auto p-4 space-y-6 animate-fade-in">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Manage Your Listings</h1>
          <p className="text-muted-foreground">
            View, edit, and manage all your property listings in one place
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          ⚠️ {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-scale dark:bg-gray-900/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
            <BarChart3 className="h-5 w-5 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalListings}</div>
            <p className="text-xs text-muted-foreground">
              Across all properties
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale dark:bg-gray-900/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews}</div>
            <p className="text-xs text-muted-foreground">
              Property views
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale dark:bg-gray-900/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impressions</CardTitle>
            <TrendingUp className="h-5 w-5 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalImpressions}</div>
            <p className="text-xs text-muted-foreground">
              Listing impressions
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale dark:bg-gray-900/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured</CardTitle>
            <Star className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.featuredListings}</div>
            <p className="text-xs text-muted-foreground">
              Featured listings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="dark:bg-gray-900/50 shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-primary-600" />
              </div>
              <input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary-600" />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-32 hover:bg-primary-600 dark:text-white">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Listings</SelectItem>
                  <SelectItem value="featured">Featured Only</SelectItem>
                  <SelectItem value="active">Regular Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              onClick={fetchListings}
              className="w-full sm:w-auto bg-primary-600 text-white"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <Card key={listing._id} className="hover-scale dark:bg-gray-900/50 shadow-md overflow-hidden">
              <div className="relative h-48">
                <img
                  src={listing.images?.[0] || "/placeholder.svg"}
                  alt={listing.property?.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {listing.featured && (
                  <Badge className="absolute top-2 left-2 bg-primary-600">
                    Featured
                  </Badge>
                )}
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => {
                        setSelectedListing(listing)
                        setShowStatsModal(true)
                      }}>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Stats
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        setSelectedListing(listing)
                        setShowImageModal(true)
                      }}>
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Manage Images
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        setSelectedListing(listing)
                        setShowEditModal(true)
                      }}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Listing
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => {
                          setSelectedListing(listing)
                          setShowDeleteModal(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {listing.property?.name}
                  </h3>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm">{listing.rating || 4.0}</span>
                  </div>
                </div>

                <div className="flex items-center text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm truncate">
                    {listing.property?.city} • {listing.property?.type}
                  </span>
                </div>

                <div className="flex items-center text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">Listed {formatDate(listing.createdAt)}</span>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-xl font-bold text-primary-600 dark:text-primary-600">
                      {formatCurrency(listing.property?.price || 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">per month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{listing.totalClicks || 0} views</p>
                    <p className="text-sm text-muted-foreground">
                      {listing.totalImpressions || 0} impressions
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedListing(listing)
                      setShowEditModal(true)
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => {
                      setSelectedListing(listing)
                      setShowDeleteModal(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
              <Plus className="h-full w-full" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No listings found
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
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
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="hover:bg-primary-600"
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "bg-primary-600" : "hover:bg-primary-600"}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="hover:bg-primary-600"
            >
              Next
            </Button>
          </div>
        </div>
      )}

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