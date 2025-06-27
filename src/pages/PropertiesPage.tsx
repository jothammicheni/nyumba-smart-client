"use client"

import type React from "react"
import { useState } from "react"
import { Search, MapPin, Home, Bed, Bath, Square, Filter, Heart, Star, Eye, X } from "lucide-react"

// Dummy property data
const properties = [
  {
    id: 1,
    title: "Sunshine Apartments",
    location: "Kilimani, Nairobi",
    price: 25000,
    bedrooms: 2,
    bathrooms: 1,
    area: 80,
    type: "apartment",
    rating: 4.5,
    featured: true,
    description: "Modern apartment with spacious rooms and great natural lighting. Located in the heart of Kilimani with easy access to amenities.",
    amenities: ["Swimming Pool", "Gym", "Parking", "24/7 Security"],
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  },
  {
    id: 2,
    title: "Green Valley Residences",
    location: "Westlands, Nairobi",
    price: 35000,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    type: "apartment",
    rating: 4.2,
    featured: false,
    description: "Luxury apartment with premium finishes and stunning views. Perfect for families looking for comfort and style.",
    amenities: ["Balcony", "Gym", "Parking", "Elevator", "Security"],
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  },
  {
    id: 3,
    title: "Riverside Homes",
    location: "Lavington, Nairobi",
    price: 45000,
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    type: "house",
    rating: 4.8,
    featured: true,
    description: "Spacious family home with beautiful garden and outdoor entertainment area. Quiet neighborhood with excellent schools nearby.",
    amenities: ["Garden", "Parking", "Security", "Maid's Quarters"],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  },
  {
    id: 4,
    title: "Urban Heights",
    location: "Kileleshwa, Nairobi",
    price: 30000,
    bedrooms: 2,
    bathrooms: 2,
    area: 90,
    type: "apartment",
    rating: 4.1,
    featured: false,
    description: "Contemporary apartment with smart home features and efficient use of space. Ideal for young professionals.",
    amenities: ["Smart Home", "Gym", "Parking", "Rooftop Terrace"],
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  },
  {
    id: 5,
    title: "Serene Gardens",
    location: "Karen, Nairobi",
    price: 60000,
    bedrooms: 5,
    bathrooms: 4,
    area: 300,
    type: "house",
    rating: 4.9,
    featured: true,
    description: "Exclusive estate property with expansive grounds and premium finishes. The ultimate in luxury living.",
    amenities: ["Swimming Pool", "Guest House", "Parking", "Security", "Garden"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  },
  {
    id: 6,
    title: "City View Apartments",
    location: "Upper Hill, Nairobi",
    price: 40000,
    bedrooms: 3,
    bathrooms: 2,
    area: 110,
    type: "apartment",
    rating: 4.3,
    featured: false,
    description: "High-rise apartment with panoramic city views. Modern amenities and convenient location for business professionals.",
    amenities: ["City Views", "Gym", "Parking", "Concierge", "Security"],
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    comments: [
      {
        user: "John D.",
        date: "2023-05-15",
        text: "Great location and the apartment has amazing views. Highly recommend!"
      },
      {
        user: "Sarah M.",
        date: "2023-04-22",
        text: "The building amenities are excellent. Very secure and well maintained."
      }
    ],
  },
]

const PropertiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    type: "all",
    minPrice: "",
    maxPrice: "",
    bedrooms: "any",
    featured: false,
  })
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedProperty, setSelectedProperty] = useState<typeof properties[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Filter properties
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filters.type === "all" || property.type === filters.type
    const matchesMinPrice = !filters.minPrice || property.price >= Number(filters.minPrice)
    const matchesMaxPrice = !filters.maxPrice || property.price <= Number(filters.maxPrice)
    const matchesBedrooms = filters.bedrooms === "any" || property.bedrooms === Number(filters.bedrooms)
    const matchesFeatured = !filters.featured || property.featured

    return matchesSearch && matchesType && matchesMinPrice && matchesMaxPrice && matchesBedrooms && matchesFeatured
  })

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    )
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }))
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
  }

  const openPropertyModal = (property: typeof properties[0]) => {
    setSelectedProperty(property)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProperty(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950/60 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-600 dark:text-primary-600 sm:text-5xl">
            Find Your Perfect Home
          </h1>
          <p className="mt-2 max-w-2xl mx-auto text-xl font-semi-bold text-gray-600 dark:text-gray-300">
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
              className="flex items-center justify-center px-5 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors shadow-sm">
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
            {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Sorted by: <span className="font-medium text-blue-600 dark:text-primary-500">Recommended</span>
          </div>
        </div>

        {/* Property Listings */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div
                key={property.id}
                className="group bg-[#FBFBFB] dark:bg-gray-900/50 rounded-xl shadow-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute top-3 left-3 flex space-x-2">
                    {property.featured && (
                      <span className="px-2 py-1 bg-primary-600 text-white text-xs font-bold rounded-full">
                        Featured
                      </span>
                    )}
                    <span className="px-2 py-1 bg-white dark:bg-gray-950 text-gray-800 dark:text-white text-xs font-bold rounded-full shadow-sm">
                      {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex flex-col space-y-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(property.id)
                      }}
                      className={`p-2 rounded-full ${favorites.includes(property.id) ? 'text-red-500 bg-white' : 'text-gray-900 bg-white/30 bg-backdrop-sm hover:text-red-500'} transition-colors`}
                      aria-label={favorites.includes(property.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart className="h-5 w-5" fill={favorites.includes(property.id) ? 'currentColor' : 'none'} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        openPropertyModal(property)
                      }}
                      className="p-2 rounded-full bg-white/30 bg-backdrop-sm text-gray-900 hover:bg-white/50 hover:text-primary-500 transition-colors"
                      aria-label="View details"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">{property.title}</h3>
                    <div className="flex items-center bg-gray-900/10 dark:bg-primary-600/20 px-2 py-1 rounded-md">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-200">
                        {property.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>

                  <p className="mt-3 text-2xl font-bold text-primary-600 dark:text-primary-600">
                    {formatCurrency(property.price)}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> / month</span>
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                    <div className="flex flex-col items-center">
                      <Bed className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="mt-1 text-sm text-gray-600 dark:text-gray-300">{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Bath className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="mt-1 text-sm text-gray-600 dark:text-gray-300">{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Square className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="mt-1 text-sm text-gray-600 dark:text-gray-300">{property.area} m²</span>
                    </div>
                  </div>

                  <button
                    onClick={() => openPropertyModal(property)}
                    className="mt-6 w-full bg-primary-600 hover:bg-primary-700 pulse-animation text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <Home className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">No properties match your search</h3>
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
      </div>

      {/* Property Details Modal */}
      {isModalOpen && selectedProperty && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-10 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={closeModal}>
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            </div>

            {/* Modal content */}
            <div className="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-20 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="relative">
                <button
                  onClick={closeModal}
                  className="absolute top-1 right-1 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close">
                  <X className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                </button>

                {/* Modal content */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-96 md:h-full">
                    <img
                      src={selectedProperty.image}
                      alt={selectedProperty.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Property details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedProperty.title}
                      </h2>
                      <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-200">
                          {selectedProperty.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-5 w-5 mr-1" />
                      <span>{selectedProperty.location}</span>
                    </div>

                    <p className="mt-4 text-3xl font-bold text-primary-600 dark:text-primary-600">
                      {formatCurrency(selectedProperty.price)}
                      <span className="text-base font-normal text-gray-500 dark:text-gray-400"> / month</span>
                    </p>

                    <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex flex-col items-center">
                        <Bed className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        <span className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {selectedProperty.bedrooms} Bedrooms
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Bath className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        <span className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {selectedProperty.bathrooms} Bathrooms
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Square className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        <span className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {selectedProperty.area} m²
                        </span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Description
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedProperty.description}
                      </p>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Amenities
                      </h3>
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

                    <div className="mt-8 flex space-x-3">
                      <button className="flex-1 bg-primary-600/50 pulse-animation hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                        Contact Agent
                      </button>
                      <button className="flex-1 bg-primary-600/20 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-900 border dark:border-gray-800 text-gray-800 dark:text-white font-medium py-3 px-4 rounded-lg transition-colors">
                        Schedule Visit
                      </button>
                    </div>
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