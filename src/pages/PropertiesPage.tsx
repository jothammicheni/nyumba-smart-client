/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { Home } from "lucide-react"
import PropertyCard from "./components/PropertyCard.js"
import SearchFilters from "./components/SearchFilters.js"
import Pagination from "./components/Pagination.js"
import type { Property, Filters } from "../types/properties.js"
import { trackImpression, trackClick } from "../services/listingService.js"; // Adjust the import path as necessary
import PropertyListingSEO from "../SEO/PropertyListingSEO.js"

const PropertiesPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<Filters>({
    type: "all",
    minPrice: "",
    maxPrice: "",
    bedrooms: "any",
    featured: false,
  })
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [properties, setProperties] = useState<Property[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const propertiesPerPage = 6

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    setLoading(true)
    try {
      const response = await axios.get("https://nyumba-smart-server.onrender.com/api/listings")
      const fetchedProperties = response.data.listings || []
      setProperties(fetchedProperties)
      setError(null)

      // Track impressions for all fetched properties
      fetchedProperties.forEach((property: Property) => {
        trackImpression(property._id); // Ensure property._id is available for tracking
      });

      console.log("Properties fetched:", fetchedProperties)
    } catch (err) {
      console.error("Error fetching listings:", err)
      setError("Failed to load properties")
      setProperties([])
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const filteredProperties = Array.isArray(properties)
    ? properties.filter((property: Property) => {
        const propertyName = property.property?.name || ""
        const city = property.property?.city || ""
        const area = property.property?.area?.toString() || ""
        const propertyType = property.property?.type || ""
        const propertyPrice = property.property?.price || 0
        const propertyBedrooms = property.property?.bedrooms || 0

        const matchesSearch =
          propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          area.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesType = filters.type === "all" || propertyType === filters.type
        const matchesMinPrice = !filters.minPrice || propertyPrice >= Number(filters.minPrice)
        const matchesMaxPrice = !filters.maxPrice || propertyPrice <= Number(filters.maxPrice)
        const matchesBedrooms = filters.bedrooms === "any" || propertyBedrooms >= Number(filters.bedrooms)
        const matchesFeatured = !filters.featured || property.featured

        return matchesSearch && matchesType && matchesMinPrice && matchesMaxPrice && matchesBedrooms && matchesFeatured
      })
    : []

  const indexOfLast = currentPage * propertiesPerPage
  const indexOfFirst = indexOfLast - propertiesPerPage
  const currentProperties = filteredProperties.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage)

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
    setCurrentPage(1)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const clearFilters = () => {
    setFilters({
      type: "all",
      minPrice: "",
      maxPrice: "",
      bedrooms: "any",
      featured: false,
    })
    setSearchTerm("")
    setCurrentPage(1)
  }

  const openPropertyModal = (property: Property) => {
    setSelectedProperty(property)
    trackClick(property._id); // Track the click when the property is viewed
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProperty(null)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950/60 pt-20 pb-12">
                <PropertyListingSEO/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading properties...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950/60 pt-20 pb-12">
        <PropertyListingSEO/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Home className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">Error loading properties</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">{error}</p>
            <button
              onClick={fetchProperties}
              className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950/60 pt-20 pb-12">
      <PropertyListingSEO/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-600 dark:text-primary-600 sm:text-5xl">
            Find Your Perfect Home
          </h1>
          <p className="mt-2 max-w-2xl mx-auto text-xl font-semibold text-gray-600 dark:text-gray-300">
            Discover properties that match your lifestyle and budget
          </p>
        </div>

        {/* Search and Filters */}
        <SearchFilters
          searchTerm={searchTerm}
          filters={filters}
          showFilters={showFilters}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onToggleFilters={toggleFilters}
          onClearFilters={clearFilters}
        />

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {filteredProperties.length} {filteredProperties.length === 1 ? "Property" : "Properties"} Found
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Property Listings */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentProperties.length > 0 ? (
            currentProperties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                isFavorite={favorites.includes(property._id)}
                onToggleFavorite={toggleFavorite}
                onViewDetails={openPropertyModal}
                formatCurrency={formatCurrency}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <Home className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">
                No properties match your search
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Try adjusting your filters or search for something different
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      {/* Property Details Modal */}
      {/* <PropertyModal
        isOpen={isModalOpen}
        property={selectedProperty}
        onClose={closeModal}
        formatCurrency={formatCurrency}
      /> */}
    </div>
  )
}

export default PropertiesPage
