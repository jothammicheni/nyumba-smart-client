/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import { getAuthHeaders } from "../../../services/authService.js"
import axios from "axios"

interface Props {
  isOpen: boolean
  onClose: () => void
  property: {
    _id: string
    name: string
    city: string
    area: string
  }
  onSuccess: () => void
}

const AdvertisePropertyModal: React.FC<Props> = ({ isOpen, onClose, property, onSuccess }) => {
  const [formData, setFormData] = useState({
    type: "",
    bathrooms: "",
    propertyArea: "",
    specific_location: "",
    price: "",
    deposit: "",
    description: "",
    amenities: "",
  })
  const [images, setImages] = useState<File[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 5)
      setImages(files)
    }
  }

  const getBedroomsFromType = (type: string): number => {
    switch (type) {
      case "Single":
      case "Bedseater":
        return 0
      case "1 Bedroom":
        return 1
      case "2 Bedroom":
        return 2
      case "3 Bedroom":
        return 3
      case "4 Bedroom":
        return 4
      default:
        return 0
    }
  }

  const handleSubmit = async () => {
    setError("")

    // Validation
    if (!formData.type || !formData.price || !formData.deposit || !formData.bathrooms || !formData.propertyArea) {
      setError("All required fields must be filled")
      return
    }

    if (images.length === 0) {
      setError("At least one image is required")
      return
    }

    // Validate numeric fields
    if (isNaN(Number(formData.propertyArea)) || Number(formData.propertyArea) <= 0) {
      setError("Area must be a valid positive number")
      return
    }

    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      setError("Price must be a valid positive number")
      return
    }

    if (isNaN(Number(formData.deposit)) || Number(formData.deposit) < 0) {
      setError("Deposit must be a valid non-negative number")
      return
    }

    const submitData = new FormData()
    submitData.append("property_id", property._id)
    submitData.append("property_name", property.name)
    submitData.append("city", property.city)
    submitData.append("area", formData.propertyArea)
    submitData.append("specific_location", formData.specific_location)
    submitData.append("type", formData.type)
    submitData.append("bathrooms", formData.bathrooms)
    submitData.append("bedrooms", getBedroomsFromType(formData.type).toString())
    submitData.append("price", formData.price)
    submitData.append("deposit", formData.deposit)
    submitData.append("description", formData.description)
    submitData.append("amenities", formData.amenities)

    images.forEach((img) => {
      submitData.append("images", img)
    })

    try {
      setLoading(true)
      const response = await axios.post("https://nyumba-smart-server.onrender.com/api/listings", submitData, {
        headers: getAuthHeaders(true),
      })

      if (response.data?.success) {
        onSuccess()
        onClose()
        setFormData({
          type: "",
          bathrooms: "",
          propertyArea: "",
          specific_location: "",
          price: "",
          deposit: "",
          description: "",
          amenities: "",
        })
        setImages([])
      } else {
        setError(response.data?.error || "Failed to upload listing")
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Error uploading listing")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
      <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Advertise Property</h2>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-3 py-2 sm:px-4 sm:py-3 rounded-lg mb-3 sm:mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-3 sm:space-y-4">
          {/* Property Info Display */}
          <div className="bg-gray-50 dark:bg-gray-950/50 p-3 sm:p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">Property Information</h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Name:</span>
                <span className="ml-1 sm:ml-2 font-medium text-gray-900 dark:text-white">{property.name}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">City:</span>
                <span className="ml-1 sm:ml-2 font-medium text-gray-900 dark:text-white">{property.city}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
              Property Type <span className="text-primary-600">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-xs sm:text-sm"
            >
              <option value="">Select Property Type</option>
              <option value="Single">Single</option>
              <option value="Bedseater">Bedseater</option>
              <option value="1 Bedroom">1 Bedroom</option>
              <option value="2 Bedroom">2 Bedroom</option>
              <option value="3 Bedroom">3 Bedroom</option>
              <option value="4 Bedroom">4 Bedroom</option>
            </select>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                Bathrooms <span className="text-primary-600">*</span>
              </label>
              <select
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-xs sm:text-sm"
              >
                <option value="">Select Bathrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                Area (m²) <span className="text-primary-600">*</span>
              </label>
              <input
                type="number"
                name="propertyArea"
                value={formData.propertyArea}
                onChange={handleInputChange}
                placeholder="e.g., 50"
                min="1"
                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
              Specific Location
            </label>
            <input
              type="text"
              name="specific_location"
              value={formData.specific_location}
              onChange={handleInputChange}
              placeholder="e.g., Near shopping mall, Main road"
              className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-900 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-xs sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                Price (KES) <span className="text-primary-600">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g., 25000"
                min="1"
                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-900 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                Deposit (KES) <span className="text-primary-600">*</span>
              </label>
              <input
                type="number"
                name="deposit"
                value={formData.deposit}
                onChange={handleInputChange}
                placeholder="e.g., 25000"
                min="0"
                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-900 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              placeholder="Describe the property features, location benefits, etc..."
              className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-900 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
              Amenities (comma-separated)
            </label>
            <input
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleInputChange}
              placeholder="e.g., WiFi, Parking, Security, Water, Electricity"
              className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-900 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
              Images <span className="text-primary-600">*</span> (Max 5 images, JPEG/PNG)
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              multiple
              onChange={handleImageUpload}
              className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-xs sm:text-sm"
            />
            {images.length > 0 && (
              <div className="mt-1 sm:mt-2">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{images.length} image(s) selected</p>
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2">
                  {images.map((image, index) => (
                    <span
                      key={index}
                      className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs rounded truncate max-w-[120px] sm:max-w-[180px]"
                      title={image.name}
                    >
                      {image.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-1.5 sm:px-6 sm:py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium transition-colors text-xs sm:text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-1.5 sm:px-6 sm:py-2 rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors text-xs sm:text-sm"
          >
            {loading ? "Posting..." : "Post Listing"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdvertisePropertyModal