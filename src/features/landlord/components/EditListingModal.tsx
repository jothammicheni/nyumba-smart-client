/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Upload, Trash2 } from "lucide-react"
import type { Property } from "../../../types/properties.js"
import axios from "axios"
import { getAuthHeaders } from "../../../services/authService.js"

interface EditListingModalProps {
  isOpen: boolean
  onClose: () => void
  listing: Property | null
  onSuccess: () => void
}

const EditListingModal: React.FC<EditListingModalProps> = ({ isOpen, onClose, listing, onSuccess }) => {
  const [formData, setFormData] = useState({
    property_name: "",
    city: "",
    area: "",
    specific_location: "",
    type: "",
    bathrooms: "",
    bedrooms: "",
    price: "",
    deposit: "",
    description: "",
    amenities: "",
    featured: false,
  })
  const [newImages, setNewImages] = useState<File[]>([])
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (listing && isOpen) {
      setFormData({
        property_name: listing.property?.name || "",
        city: listing.property?.city || "",
        area: listing.property?.area?.toString() || "",
        specific_location: listing.property?.specific_location || "",
        type: listing.property?.type || "",
        bathrooms: listing.property?.bathrooms?.toString() || "",
        bedrooms: listing.property?.bedrooms?.toString() || "",
        price: listing.property?.price?.toString() || "",
        deposit: listing.property?.deposit?.toString() || "",
        description: listing.description || "",
        amenities: listing.amenities?.join(", ") || "",
        featured: listing.featured || false,
      })
      setNewImages([])
      setImagesToDelete([])
      setError("")
    }
  }, [listing, isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 5)
      setNewImages(files)
    }
  }

  const handleDeleteImage = (imageUrl: string) => {
    setImagesToDelete((prev) => [...prev, imageUrl])
  }

  const handleRestoreImage = (imageUrl: string) => {
    setImagesToDelete((prev) => prev.filter((url) => url !== imageUrl))
  }

  const handleSubmit = async () => {
    setError("")
    setLoading(true)

    try {
      const submitData = new FormData()

      // Add form data
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== "") {
          submitData.append(key, value.toString())
        }
      })

      // Add new images
      newImages.forEach((image) => {
        submitData.append("images", image)
      })

      // Add images to delete
      if (imagesToDelete.length > 0) {
        submitData.append("deleteImages", JSON.stringify(imagesToDelete))
      }

      const response = await axios.put(`http://localhost:5000/api/listings/${listing?._id}`,submitData, {
        headers:getAuthHeaders(true),        
      })

      const result = response.data

      if (result.success) {
        onSuccess()
        onClose()
      } else {
        setError(result.mesage || "Failed to update listing")
      }
    } catch (err: any) {
      setError(err.message || "Error updating listing")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !listing) return null

  const currentImages = listing.images?.filter((img) => !imagesToDelete.includes(img)) || []

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-4xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Listing</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Property Name</label>
              <input
                type="text"
                name="property_name"
                value={formData.property_name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Area (m²)</label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Specific Location
              </label>
              <input
                type="text"
                name="specific_location"
                value={formData.specific_location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="Single">Single</option>
                  <option value="Bedseater">Bedseater</option>
                  <option value="1 Bedroom">1 Bedroom</option>
                  <option value="2 Bedroom">2 Bedroom</option>
                  <option value="3 Bedroom">3 Bedroom</option>
                  <option value="4 Bedroom">4 Bedroom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bathrooms</label>
                <select
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price (KES)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Deposit (KES)</label>
                <input
                  type="number"
                  name="deposit"
                  value={formData.deposit}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amenities (comma-separated)
              </label>
              <input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-1 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Listing</span>
              </label>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Images</label>
              <div className="grid grid-cols-2 gap-2">
                {currentImages.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt={`Property ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleDeleteImage(imageUrl)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {imagesToDelete.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                  Images to Delete ({imagesToDelete.length})
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {imagesToDelete.map((imageUrl, index) => (
                    <div key={index} className="relative group opacity-50">
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={`To delete ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleRestoreImage(imageUrl)}
                        className="absolute top-1 right-1 p-1 bg-green-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Upload className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload New Images (Max 5)
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                multiple
                onChange={handleImageUpload}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              {newImages.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{newImages.length} new image(s) selected</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors"
          >
            {loading ? "Updating..." : "Update Listing"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditListingModal
