"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import {
  Search,
  MapPin,
  Home,
  Bed,
  Bath,
  Square,
  Filter,
  Heart,
  Star,
  Eye,
  X,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface Property {
  id: number
  name: string
  image: string
  images?: string[]
  type: string
  location?: string
  specific_location?: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  rating: number
  featured?: boolean
  description?: string
  amenities?: string[]
  property?: {
    name: string
    area: number
    city: string
    type: string
    price: number
    bedrooms: number
    bathrooms: number
  }
}

interface Filters {
  type: string
  minPrice: string
  maxPrice: string
  bedrooms: string
  featured: boolean
}

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
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [properties, setProperties] = useState<Property[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const propertiesPerPage = 6
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:5000/api/listings")
      .then((res) => {
        setProperties(res.data.listings || [])
        setError(null)

        console.log("properties:",res.data)
      })
      .catch((err) => {
        console.error("Error fetching listings:", err)
        setError("Failed to load properties")
        setProperties([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Helper function to safely access property data
  const getPropertyValue = (property: Property, field: string) => {
    if (property.property && property.property[field as keyof typeof property.property] !== undefined) {
      return property.property[field as keyof typeof property.property]
    }
    return property[field as keyof Property]
  }

  const filteredProperties = Array.isArray(properties) ? properties.filter((property: Property) => {
    const title = property.name || ""
    const area = getPropertyValue(property, "area")?.toString() || ""
    const city = getPropertyValue(property, "city") || property.location || ""
    const propertyType = getPropertyValue(property, "type") || property.type || ""
    const propertyPriceRaw = getPropertyValue(property, "price") || property.price || 0
    const propertyPrice = typeof propertyPriceRaw === "number" ? propertyPriceRaw : Number(propertyPriceRaw) || 0
    const propertyBedrooms = getPropertyValue(property, "bedrooms") || property.bedrooms || 0

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(city).toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filters.type === "all" || propertyType === filters.type
    const matchesMinPrice = !filters.minPrice || propertyPrice >= Number(filters.minPrice)
    const matchesMaxPrice = !filters.maxPrice || propertyPrice <= Number(filters.maxPrice)
    const matchesBedrooms = filters.bedrooms === "any" || propertyBedrooms === Number(filters.bedrooms)
    const matchesFeatured = !filters.featured || property.featured

    return matchesSearch && matchesType && matchesMinPrice && matchesMaxPrice && matchesBedrooms && matchesFeatured
  }) : []

  const indexOfLast = currentPage * propertiesPerPage
  const indexOfFirst = indexOfLast - propertiesPerPage
  const currentProperties = filteredProperties.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage)

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
    setCurrentPage(1) // Reset to first page when filtering
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
    setCurrentImageIndex(0)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProperty(null)
  }

  const nextImage = () => {
    if (selectedProperty && selectedProperty.images && selectedProperty.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProperty.images!.length)
    }
  }

  const prevImage = () => {
    if (selectedProperty && selectedProperty.images && selectedProperty.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProperty.images!.length) % selectedProperty.images!.length)
    }
  }

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950/60 pt-20 pb-12">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Home className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">Error loading properties</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
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
        <div className="mb-8 bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-grow relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-primary-600" />
              </div>
              <input
                type="text"
                placeholder="Search by property, location or keyword..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-800/90 shadow-xl rounded-lg bg-gray-50 dark:bg-gray-950/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-1 focus:ring-primary-600 focus:border-primary-500 transition-all"
              />
            </div>
            <button
              onClick={toggleFilters}
              className="flex items-center justify-center px-5 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors shadow-sm"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-950/50 rounded-lg border border-gray-200 dark:border-gray-800/90">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Property Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 text-gray-500 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 focus:ring-primary-600 focus:border-primary-600 transition-all"
                  >
                    <option value="all">All Types</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Min Price (KES)
                  </label>
                  <input
                    type="number"
                    id="minPrice"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="10,000"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 focus:ring-primary-600 focus:border-primary-600 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Max Price (KES)
                  </label>
                  <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="100,000"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 focus:ring-primary-600 focus:border-primary-600 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bedrooms
                  </label>
                  <select
                    id="bedrooms"
                    name="bedrooms"
                    value={filters.bedrooms}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 text-gray-500 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 focus:ring-primary-600 focus:border-primary-600 transition-all"
                  >
                    <option value="any">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={filters.featured}
                      onChange={handleFilterChange}
                      className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-1 focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-500">Featured Only</span>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium rounded text-gray-700 hover:bg-primary-600/20 dark:text-gray-300 hover:text-gray-900 dark:hover:bg-primary-600/10 dark:hover:text-white"
                >
                  Clear All
                </button>
                <button
                  onClick={toggleFilters}
                  className="px-4 py-2 bg-primary-600 dark:bg-primary-600/20 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {filteredProperties.length} {filteredProperties.length === 1 ? "Property" : "Properties"} Found
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Sorted by: <span className="font-medium text-blue-600 dark:text-primary-500">Recommended</span>
          </div>
        </div>

        {/* Property Listings */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentProperties.length > 0 ? (
            currentProperties.map((property) => (
              <div
                key={property.id}
                className="group bg-[#FBFBFB] dark:bg-gray-900/50 rounded-xl shadow-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={property.image || "/placeholder.svg?height=240&width=400"}
                    alt={property.name || "Property"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=240&width=400"
                    }}
                  />
                  <div className="absolute top-3 left-3 flex space-x-2">
                    {property?.featured && (
                      <span className="px-2 py-1 bg-primary-600 text-white text-xs font-bold rounded-full">
                        Featured
                      </span>
                    )}
                    <span className="px-2 py-1 bg-white dark:bg-gray-950 text-gray-800 dark:text-white text-xs font-bold rounded-full shadow-sm">
                      {(getPropertyValue(property, "type") || property.type || "Property")
                        .toString()
                        .charAt(0)
                        .toUpperCase() +
                        (getPropertyValue(property, "type") || property.type || "Property").toString().slice(1)}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex flex-col space-y-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(property.id)
                      }}
                      className={`p-2 rounded-full ${favorites.includes(property.id) ? "text-red-500 bg-white" : "text-gray-900 bg-white/30 backdrop-blur-sm hover:text-red-500"} transition-colors`}
                      aria-label={favorites.includes(property.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart className="h-5 w-5" fill={favorites.includes(property.id) ? "currentColor" : "none"} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        openPropertyModal(property)
                      }}
                      className="p-2 rounded-full bg-white/30 backdrop-blur-sm text-gray-900 hover:bg-white/50 hover:text-primary-500 transition-colors"
                      aria-label="View details"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                      {property.name || "Untitled Property"}
                    </h3>
                    <div className="flex items-center bg-gray-900/10 dark:bg-primary-600/20 px-2 py-1 rounded-md">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-200">
                        {property.rating || 0}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">
                      {(() => {
                        const loc =
                          property.location ||
                          property.specific_location ||
                          getPropertyValue(property, "city");
                        if (typeof loc === "string" || typeof loc === "number") {
                          return loc;
                        }
                        return "Location not specified";
                      })()}
                    </span>
                  </div>

                  <p className="mt-3 text-2xl font-bold text-primary-600 dark:text-primary-600">
                    {formatCurrency(
                      typeof getPropertyValue(property, "price") === "number"
                        ? (getPropertyValue(property, "price") as number)
                        : Number(getPropertyValue(property, "price")) || property.price || 0
                    )}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> / month</span>
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                    <div className="flex flex-col items-center">
                      <Bed className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {(() => {
                          const value = getPropertyValue(property, "bedrooms") ?? property.bedrooms ?? 0;
                          return typeof value === "string" || typeof value === "number" ? value : 0;
                        })()} Beds
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Bath className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {(() => {
                          const value = getPropertyValue(property, "bathrooms") ?? property.bathrooms ?? 0;
                          return typeof value === "string" || typeof value === "number" ? value : 0;
                        })()} Baths
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Square className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {(() => {
                          const value = getPropertyValue(property, "area") ?? property.area ?? 0;
                          return typeof value === "string" || typeof value === "number" ? value : 0;
                        })()} m²
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => openPropertyModal(property)}
                    className="mt-6 w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
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
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === number
                      ? "bg-primary-600 text-white"
                      : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {number}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Property Details Modal */}
      {isModalOpen && selectedProperty && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-10 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={closeModal}>
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            </div>
            <div className="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-20 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
                <div className="relative h-96">
                  <img
                    src={
                      (selectedProperty.images && selectedProperty.images[currentImageIndex]) ||
                      selectedProperty.image ||
                      "/placeholder.svg?height=384&width=768"
                    }
                    alt={`Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=384&width=768"
                    }}
                  />
                  {selectedProperty.images && selectedProperty.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white/90 transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white/90 transition-colors"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedProperty.name|| "Untitled Property"}
                    </h2>
                    <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-200">
                        {selectedProperty.rating || 0}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-5 w-5 mr-1" />
                    <span>
                      {(() => {
                        const loc =
                          selectedProperty.location ||
                          selectedProperty.specific_location ||
                          getPropertyValue(selectedProperty, "city");
                        if (typeof loc === "string" || typeof loc === "number") {
                          return loc;
                        }
                        return "Location not specified";
                      })()}
                    </span>
                  </div>

                  <p className="mt-4 text-3xl font-bold text-primary-600 dark:text-primary-600">
                    {formatCurrency(
                      typeof getPropertyValue(selectedProperty, "price") === "number"
                        ? getPropertyValue(selectedProperty, "price") as number
                        : Number(getPropertyValue(selectedProperty, "price")) || selectedProperty.price || 0
                    )}
                    <span className="text-base font-normal text-gray-500 dark:text-gray-400"> / month</span>
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex flex-col items-center">
                      <Bed className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                      <span className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {(() => {
                          const value = getPropertyValue(selectedProperty, "bedrooms") ?? selectedProperty.bedrooms ?? 0;
                          return typeof value === "string" || typeof value === "number" ? value : 0;
                        })()} Bedrooms
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Bath className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                      <span className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {(() => {
                          const value = getPropertyValue(selectedProperty, "bathrooms") ?? selectedProperty.bathrooms ?? 0;
                          return typeof value === "string" || typeof value === "number" ? value : 0;
                        })()} Bathrooms
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Square className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                      <span className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {(() => {
                          const value = getPropertyValue(selectedProperty, "area") ?? selectedProperty.area ?? 0;
                          return typeof value === "string" || typeof value === "number" ? value : 0;
                        })()} m²
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedProperty.description || "No description available."}
                    </p>
                  </div>

                  {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Amenities</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProperty.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex space-x-3">
                    <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                      Contact Agent
                    </button>
                    <button className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 border dark:border-gray-700 text-gray-800 dark:text-white font-medium py-3 px-4 rounded-lg transition-colors">
                      Schedule Visit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


export default PropertiesPage
