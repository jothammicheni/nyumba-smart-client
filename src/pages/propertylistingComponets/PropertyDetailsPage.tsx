/* eslint-disable react-hooks/exhaustive-deps */
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
        <p className="mt-0 text-lg text-gray-600">Loading property details...</p>
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
        <div className="relative mb-12 rounded-2xl overflow-hidden shadow-card group">
          <div className="aspect-[16/9] bg-gradient-card">
            <img
              src={listing.images[currentImageIndex]}
              alt={`Property ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-700"
            />
          </div>

          {/* Navigation arrows */}
          {listing.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background backdrop-blur-sm p-3 rounded-full shadow-metric transition-all duration-300 hover:scale-110 group-hover:translate-x-0 -translate-x-2 opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-foreground" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background backdrop-blur-sm p-3 rounded-full shadow-metric transition-all duration-300 hover:scale-110 group-hover:translate-x-0 translate-x-2 opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-foreground" />
              </button>
            </>
          )}

          {/* Image counter */}
          {listing.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm text-foreground px-4 py-2 rounded-full text-sm font-medium border border-border/50">
              {currentImageIndex + 1} / {listing.images.length}
            </div>
          )}

          {/* Image dots indicator */}
          {listing.images.length > 1 && (
            <div className="absolute bottom-6 right-6 flex gap-2">
              {listing.images.map((_: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                    ? 'bg-primary w-6'
                    : 'bg-background/60 hover:bg-background/80'
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12">
        <div className="xl:col-span-2 space-y-6">
          {/* Title and basic info */}
          <div className="flex justify-between items-start p-6 rounded-xl border border-border/50 ">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{listing.property?.name}</h1>
              <div className="flex items-center mt-2 text-gray-600">
                <MapPin className="h-5 w-5 mr-1 text-gray-500" />
                <span>{listing.property?.specific_location || listing.property?.city}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 items-center">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 rounded-full hover:bg-gray-100 border border-gray-10 transition-colors"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-gray-100 border border-gray-10 transition-colors"
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
              <Star className="h-5 w-5 text-orange-500 fill-current" />
              <span className="ml-1 font-medium dark:text-gray-900">{listing.rating || 4.0}</span>
            </div>
          </div>

          {/* Features */}
          <div className="bg-gradient-card p-8 rounded-2xl border border-border/50 shadow-card">
            <h3 className="text-xl font-semibold mb-6 text-foreground">Property Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl dark:bg-gray-950/60 dark:border-none border border-gray-200 transition-all duration-300">
                <div className="p-4 bg-gray-200/30 dark:bg-primary-600/30 rounded-full mb-4">
                  <Bed className="h-8 w-8 text-primary-600" />
                </div>
                <span className="text-2xl font-bold text-foreground">{listing.property?.bedrooms || 0}</span>
                <span className="text-muted-foreground font-medium">Bedrooms</span>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-950/60 dark:border-none rounded-xl border border-gray-200 transition-all duration-300">
                <div className="p-4 bg-gray-200/30 dark:bg-primary-600/30 rounded-full mb-4">
                  <Bath className="h-8 w-8 text-primary-600" />
                </div>
                <span className="text-2xl font-bold text-foreground">{listing.property?.bathrooms || 0}</span>
                <span className="text-muted-foreground font-medium">Bathrooms</span>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-950/60 dark:border-none rounded-xl border border-gray-200 transition-all duration-300">
                <div className="p-4 bg-gray-200/30 dark:bg-primary-600/30 rounded-full mb-4">
                  <Square className="h-8 w-8 text-primary-600" />
                </div>
                <span className="text-2xl font-bold text-foreground">{listing.property?.area || 0}</span>
                <span className="text-muted-foreground font-medium">m²</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gradient-card p-8 rounded-2xl border border-border/50 shadow-card">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Description</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {listing.description || "No description available."}
            </p>
          </div>

          {/* Amenities */}
          {listing.amenities?.length > 0 && (
            <div className="bg-gradient-card p-8 rounded-2xl border border-border/50 shadow-card">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {listing.amenities.map((amenity: string, i: number) => (
                  <div key={i} className="flex items-center justify-center bg-gray-50 dark:bg-gray-950/60 hover:bg-accent/30 rounded-xl p-4 border border-accent/30 transition-all duration-300 hover:scale-105">
                    <span className="text-foreground text-center font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar with action buttons */}
        <div className="xl:col-span-1">
          <div className="sticky top-4 bg-white p-6 rounded-xl border border-border/50 shadow-card backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Interested in this property?</h3>
            <div className="space-y-4">
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
            <div className="mt-8 pt-8 border-t border-border/50">
              <h4 className="font-semibold text-foreground mb-6 text-lg">Property Details</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted/10 rounded-xl">
                  <span className="text-muted-foreground">Property Type:</span>
                  <span className="font-semibold text-foreground">{listing.property?.type || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted/10 rounded-xl">
                  <span className="text-muted-foreground">Year Built:</span>
                  <span className="font-semibold text-foreground">{listing.property?.year_built || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted/10 rounded-xl">
                  <span className="text-muted-foreground">Furnishing:</span>
                  <span className="font-semibold text-foreground">{listing.property?.furnishing || 'N/A'}</span>
                </div>
              </div>
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
