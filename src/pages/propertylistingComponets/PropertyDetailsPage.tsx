"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { listingService, trackClick } from "../../services/listingService.js"
import ContactAgentModal from "./ContactAgentForm.js"
import ScheduleVisitModal from "./ScheduleVisitForm.js"
import { MapPin, Bed, Bath, Square, Star, RefreshCw } from "lucide-react"

const formatCurrency = (amount: number) => {
  return `KES ${amount.toLocaleString()}`
}

const PropertyDetailsPage = () => {
  const { id } = useParams()
  const [property, setProperty] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showVisitModal, setShowVisitModal] = useState(false)

  const fetchListing = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await listingService.getListingById(id!)
      console.log("Fetched listing:", data)
      setProperty(data)
    } catch (err) {
      console.error(err)
      setError("Listing not found.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchListing()
  }, [id])

  const handleClick = async (action: string) => {
    if (property?._id) {
      await trackClick(property._id)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-semibold text-red-600 mb-4">{error}</h1>
        <button
          onClick={fetchListing}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <RefreshCw size={18} /> Reload
        </button>
      </div>
    )
  }

  const listing = property

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Images grid */}
      {listing.images?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {listing.images.map((src: string, index: number) => (
            <img
              key={index}
              src={src}
              alt={`Image ${index + 1}`}
              className="w-full h-64 object-cover rounded-md shadow-sm"
              loading="lazy"
              onError={(e) => ((e.target as HTMLImageElement).src = "/placeholder.svg")}
            />
          ))}
        </div>
      )}

      {/* Title and rating */}
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold">{listing.property?.name}</h1>
        <div className="flex items-center bg-gray-100 px-2 py-1 rounded-md">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="ml-1 text-sm font-medium">{listing.rating || 4.0}</span>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center mt-2 text-gray-600">
        <MapPin className="h-5 w-5 mr-1" />
        <span>{listing.property?.specific_location || listing.property?.city}</span>
      </div>

      {/* Price */}
      <p className="mt-4 text-3xl font-bold text-primary-600">
        {formatCurrency(listing.property?.price || 0)}
        <span className="text-base font-normal text-gray-500"> / month</span>
      </p>

      {/* Features */}
      <div className="mt-6 grid grid-cols-3 gap-4 border-t pt-4">
        <div className="flex flex-col items-center">
          <Bed className="h-6 w-6" />
          <span className="mt-1">{listing.property?.bedrooms || 0} Bedrooms</span>
        </div>
        <div className="flex flex-col items-center">
          <Bath className="h-6 w-6" />
          <span className="mt-1">{listing.property?.bathrooms || 0} Bathrooms</span>
        </div>
        <div className="flex flex-col items-center">
          <Square className="h-6 w-6" />
          <span className="mt-1">{listing.property?.area || 0} m²</span>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p>{listing.description || "No description available."}</p>
      </div>

      {/* Amenities */}
      {listing.amenities?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {listing.amenities.map((amenity: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                {amenity}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="mt-8 flex space-x-3">
        <button
          onClick={() => {
            handleClick("Contact Agent")
            setShowContactModal(true)
          }}
          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg"
        >
          Contact Agent
        </button>
        <button
          onClick={() => {
            handleClick("Schedule Visit")
            setShowVisitModal(true)
          }}
          className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 px-4 rounded-lg"
        >
          Schedule Visit
        </button>
      </div>

      {/* Popups */}
      <ContactAgentModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} property={listing} />
      <ScheduleVisitModal isOpen={showVisitModal} onClose={() => setShowVisitModal(false)} property={listing} />
    </div>
  )
}

export default PropertyDetailsPage
