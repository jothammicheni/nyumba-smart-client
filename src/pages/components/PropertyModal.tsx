"use client"

import type React from "react"
import {useState } from "react"
import { X, ArrowLeft, ArrowRight, MapPin, Bed, Bath, Square, Star } from "lucide-react"
import type { Property } from "../types/property.js"
import {  trackClick } from "../../services/listingService.js"; // Adjust the import path as necessary

interface PropertyModalProps {
  isOpen: boolean
  property: Property | null
  onClose: () => void
  formatCurrency: (amount: number) => string
}

const PropertyModal: React.FC<PropertyModalProps> = ({ isOpen, property, onClose, formatCurrency }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Track impression when the modal opens
  // useEffect(() => {
  //   if (isOpen && property) {
  //     const trackPropertyImpression = async () => {
  //       await trackImpression(property.id); // Ensure property.id is available
  //     };
  //     trackPropertyImpression();
  //   }
  // }, [isOpen, property]);

  if (!isOpen || !property) return null

  const nextImage = () => {
    if (property.images && property.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
    }
  }

  const prevImage = () => {
    if (property.images && property.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
    }
  }

  const getPropertyName = (property: Property) => {
    return property.property?.name || "Untitled Property"
  }

  const getLocation = (property: Property) => {
    return property.property?.specific_location || property.property?.city || "Location not specified"
  }

  const getCurrentImage = () => {
    if (property.images && property.images.length > 0) {
      return property.images[currentImageIndex]
    }
    return "/placeholder.svg?height=384&width=768"
  }

  const handleClick = async (action: string) => {
    await trackClick(property.id); // Track the click for the specific property
    // Additional logic for handling the click can be added here
    console.log(`User clicked: ${action}`); // For debugging purposes
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-10 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>
        <div className="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-20 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
            <div className="relative h-96">
              <img
                src={getCurrentImage() || "/placeholder.svg"}
                alt={`${getPropertyName(property)} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=384&width=768"
                }}
              />
              {property.images && property.images.length > 1 && (
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
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{getPropertyName(property)}</h2>
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-200">
                    {property.rating || 4.0}
                  </span>
                </div>
              </div>

              <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                <MapPin className="h-5 w-5 mr-1" />
                <span>{getLocation(property)}</span>
              </div>

              <p className="mt-4 text-3xl font-bold text-primary-600 dark:text-primary-600">
                {formatCurrency(property.property?.price || 0)}
                <span className="text-base font-normal text-gray-500 dark:text-gray-400"> / month</span>
              </p>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex flex-col items-center">
                  <Bed className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  <span className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {property.property?.bedrooms || 0} Bedrooms
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <Bath className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  <span className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {property.property?.bathrooms || 0} Bathrooms
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <Square className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  <span className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {property.property?.area || 0} m²
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {property.description || "No description available for this property."}
                </p>
              </div>

              {property.amenities && property.amenities.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
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
                <button 
                  onClick={() => handleClick("Contact Agent")} // Track click for contacting agent
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Contact Agent
                </button>
                <button 
                  onClick={() => handleClick("Schedule Visit")} // Track click for scheduling visit
                  className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 border dark:border-gray-700 text-gray-800 dark:text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Schedule Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyModal
