/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React from "react"
import { useNavigate } from "react-router-dom"
import { MapPin, Bed, Bath, Square, Star, Heart, Eye } from "lucide-react"
import type { Property } from "../../types/properties"

interface PropertyCardProps {
  property: Property
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
  onViewDetails?: (property: Property) => void  // optional prop
  formatCurrency: (amount: number) => string
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  formatCurrency,
}) => {
  const navigate = useNavigate()

  const getImageUrl = (property: Property) => {
    if (property.images && property.images.length > 0) {
      return property.images[0]
    }
    return "/placeholder.svg?height=240&width=400"
  }

  const getPropertyName = (property: Property) => {
    return property.property?.name || "Untitled Property"
  }

  const getLocation = (property: Property) => {
    return property.property?.specific_location || property.property?.city || "Location not specified"
  }

  // Navigation handler
const handleViewDetails = (property: Property) => {
  navigate(`/properties/${property._id}`)
}

  return (
    <div className="group bg-[#FBFBFB] dark:bg-gray-900/50 rounded-xl shadow-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={getImageUrl(property) || "/placeholder.svg"}
          alt={getPropertyName(property)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg?height=240&width=400"
          }}
        />
        <div className="absolute top-3 left-3 flex space-x-2">
          {property.featured && (
            <span className="px-2 py-1 bg-primary-600 text-white text-xs font-bold rounded-full">Featured</span>
          )}
          <span className="px-2 py-1 bg-white dark:bg-gray-950 text-gray-800 dark:text-white text-xs font-bold rounded-full shadow-sm">
            {property.property?.type || "Property"}
          </span>
        </div>

        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(property._id)
            }}
            className={`p-2 rounded-full ${
              isFavorite ? "text-red-500 bg-white" : "text-gray-900 bg-white/30 backdrop-blur-sm hover:text-red-500"
            } transition-colors`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleViewDetails(property)
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
          <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">{getPropertyName(property)}</h3>
          <div className="flex items-center bg-gray-900/10 dark:bg-primary-600/20 px-2 py-1 rounded-md">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-200">{property.rating || 4.0}</span>
          </div>
        </div>

        <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{getLocation(property)}</span>
        </div>

        <p className="mt-3 text-2xl font-bold text-primary-600 dark:text-primary-600">
          {formatCurrency(property.property?.price || 0)}
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> / month</span>
        </p>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <div className="flex flex-col items-center">
            <Bed className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {property.property?.bedrooms || 0} Beds
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Bath className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {property.property?.bathrooms || 0} Baths
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Square className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="mt-1 text-sm text-gray-600 dark:text-gray-300">{property.property?.area || 0} m²</span>
          </div>
        </div>

        <button
          onClick={() => handleViewDetails(property)}
          className="mt-6 w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default PropertyCard
