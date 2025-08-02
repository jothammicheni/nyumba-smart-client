/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { listingService, trackClick } from "../../services/listingService.js"
import ContactAgentModal from "./ContactAgentForm.js"
import ScheduleVisitModal from "./ScheduleVisitForm.js"
import { MapPin, Bed, Bath, Square, Star, RefreshCw, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { Loader } from "../../components/Loader.js"

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0
  }).format(amount)
}

interface BreadcrumbItem {
  label: string
  path: string
  active?: boolean
}

const Breadcrumb: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  return (
    <nav className="flex items-center text-sm mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1 md:mx-2" />
            )}
            {item.active ? (
              <span className="text-gray-500 font-medium">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="text-primary-600 hover:text-primary-800 font-medium hover:underline"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

const PropertyDetailsPage = () => {
  const { id } = useParams()
  const [property, setProperty] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showVisitModal, setShowVisitModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const fetchListing = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await listingService.getListingById(id!)
      setProperty(data)
    } catch (err) {
      console.error(err)
      setError("Failed to load property details. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchListing()
  }, [id])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClick = async (action: string) => {
    if (property?._id) {
      await trackClick(property._id)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.property?.name || 'Property Listing',
        text: `Check out this property: ${property?.property?.name}`,
        url: window.location.href,
      }).catch(console.error)
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const nextImage = () => {
    if (property?.images?.length) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
    }
  }

  const prevImage = () => {
    if (property?.images?.length) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader />
        <p className="mt-4 text-lg text-gray-600">Loading property details...</p>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-semibold text-red-600 mb-4">{error}</h1>
        <button
          onClick={fetchListing}
          className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-all"
        >
          <RefreshCw size={18} /> Try Again
        </button>
        <Link 
          to="/" 
          className="mt-4 flex items-center gap-1 text-primary-600 hover:text-primary-800"
        >
          <ChevronLeft size={16} /> Back to listings
        </Link>
      </div>
    )
  }

  const listing = property

  return (
    <div className="max-w-6xl mx-auto px-4 shadow-sm dark:bg-gray-950/20 px-1 py-20">
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: 'Home', path: '/' },
          { label: 'Properties', path: '/properties' },
          { label: listing.property?.name || 'Property', path: '', active: true }
        ]} 
      />

      {/* Back button for mobile */}
      <div className="md:hidden mb-4">
        <Link 
          to="/properties" 
          className="flex items-center gap-1 text-primary-600 hover:text-primary-800"
        >
          <ChevronLeft size={18} /> Back to listings
        </Link>
      </div>

      {/* Property Image Display */}
      {listing.images?.length > 0 && (
        <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg">
          <img
            src={listing.images[currentImageIndex]}
            alt={`Property ${currentImageIndex + 1}`}
            className="w-full h-96 object-cover"
          />
          
          {/* Navigation arrows */}
          {listing.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 p-2 rounded-full shadow-md transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 p-2 rounded-full shadow-md transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Image counter */}
          {listing.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {listing.images.length}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Title and basic info */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{listing.property?.name}</h1>
              <div className="flex items-center mt-2 text-gray-600">
                <MapPin className="h-5 w-5 mr-1 text-gray-500" />
                <span>{listing.property?.specific_location || listing.property?.city}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart 
                  className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                />
              </button>
              <button 
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Share property"
              >
                <Share2 className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Price and rating */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-3xl font-bold text-primary-600">
              {formatCurrency(listing.property?.price || 0)}
              <span className="text-base font-normal text-gray-500"> / month</span>
            </p>
            
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="ml-1 font-medium">{listing.rating || 4.0}</span>
            </div>
          </div>

          {/* Features */}
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-b border-gray-200 py-6">
            <div className="flex flex-col items-center">
              <div className="p-3 bg-primary-50 rounded-full">
                <Bed className="h-6 w-6 text-primary-600" />
              </div>
              <span className="mt-2 font-medium">{listing.property?.bedrooms || 0} Bedrooms</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-primary-50 rounded-full">
                <Bath className="h-6 w-6 text-primary-600" />
              </div>
              <span className="mt-2 font-medium">{listing.property?.bathrooms || 0} Bathrooms</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-primary-50 rounded-full">
                <Square className="h-6 w-6 text-primary-600" />
              </div>
              <span className="mt-2 font-medium">{listing.property?.area || 0} m²</span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {listing.description || "No description available."}
            </p>
          </div>

          {/* Amenities */}
          {listing.amenities?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {listing.amenities.map((amenity: string, i: number) => (
                  <div key={i} className="flex items-center justify-center bg-gray-100 rounded-full w-1/2 p-1 gap-2">
                    <span className="text-gray-700 text-center">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar with action buttons */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Interested in this property?</h3>
            <div className="space-y-3">
              <button
                onClick={() => {
                  handleClick("Contact Agent")
                  setShowContactModal(true)
                }}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg transition-colors font-medium"
              >
                Contact Agent
              </button>
              <button
                onClick={() => {
                  handleClick("Schedule Visit")
                  setShowVisitModal(true)
                }}
                className="w-full bg-white hover:bg-gray-50 text-primary-600 py-3 px-4 rounded-lg border border-primary-600 transition-colors font-medium"
              >
                Schedule Visit
              </button>
            </div>

            {/* Additional info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Property Details</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex justify-between">
                  <span>Property Type:</span>
                  <span className="font-medium">{listing.property?.type || 'N/A'}</span>
                </li>
                <li className="flex justify-between">
                  <span>Year Built:</span>
                  <span className="font-medium">{listing.property?.year_built || 'N/A'}</span>
                </li>
                <li className="flex justify-between">
                  <span>Furnishing:</span>
                  <span className="font-medium">{listing.property?.furnishing || 'N/A'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Popups */}
      <ContactAgentModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
        property={listing} 
      />
      <ScheduleVisitModal 
        isOpen={showVisitModal} 
        onClose={() => setShowVisitModal(false)} 
        property={listing} 
      />
    </div>
  )
}

export default PropertyDetailsPage
