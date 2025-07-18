/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Upload, Trash2, Plus, Eye, RotateCcw } from "lucide-react"
import type { Property } from "../../../types/properties.js"
import axios from "axios"
import { getAuthHeaders } from "../../../services/authService.js"

interface ImageManagementModalProps {
  isOpen: boolean
  onClose: () => void
  listing: Property | null
  onSuccess: () => void
}

const ImageManagementModal: React.FC<ImageManagementModalProps> = ({ isOpen, onClose, listing, onSuccess }) => {
  const [currentImages, setCurrentImages] = useState<string[]>([])
  const [newImages, setNewImages] = useState<File[]>([])
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen && listing) {
      setCurrentImages(listing.images || [])
      setNewImages([])
      setImagesToDelete([])
      setError("")
      setPreviewImage(null)
    }
  }, [isOpen, listing])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const totalImages = currentImages.length - imagesToDelete.length + newImages.length + files.length

      if (totalImages > 5) {
        setError("Maximum 5 images allowed per listing")
        return
      }

      setNewImages((prev) => [...prev, ...files])
      setError("")
    }
  }

  const handleDeleteExistingImage = (imageUrl: string) => {
    if (!imagesToDelete.includes(imageUrl)) {
      setImagesToDelete((prev) => [...prev, imageUrl])
    }
  }

  const handleRestoreImage = (imageUrl: string) => {
    setImagesToDelete((prev) => prev.filter((url) => url !== imageUrl))
  }

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDeleteSingleImage = async (imageUrl: string) => {
    setLoading(true)
    setError("")

    try {
      const response = await axios.delete(`https://nyumba-smart-server.onrender.com/api/listings/${listing?._id}`, {
        headers: getAuthHeaders(),
        data: {
          deleteImages: [imageUrl],
        },
      })
      if (response.status === 200 && response.data.success) {
        setCurrentImages((prev) => prev.filter((img) => img !== imageUrl))
        onSuccess()
      } else {
        setError(response.data.error || "Failed to delete image")
      }
    } catch (err: any) {
      setError(err.message || "Error deleting image")
    } finally {
      setLoading(false)
    }
  }

  const handleReplaceAllImages = async () => {
    if (newImages.length === 0) {
      setError("Please select at least one image")
      return
    }

    setLoading(true)
    setError("")

    try {
      const formData = new FormData()
      newImages.forEach((image) => {
        formData.append("images", image)
      })

      const response = await fetch(`https://nyumba-smart-server.onrender.com/api/listings/${listing?._id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      const result = await response.json()

      if (response.ok && result.success) {
        onSuccess()
        onClose()
      } else {
        setError(result.error || "Failed to update images")
      }
    } catch (err: any) {
      setError(err.message || "Error updating images")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateImages = async () => {
    setLoading(true)
    setError("")

    try {
      const formData = new FormData()

      // Add new images
      newImages.forEach((image) => {
        formData.append("images", image)
      })

      // Add images to delete
      if (imagesToDelete.length > 0) {
        formData.append("deleteImages", JSON.stringify(imagesToDelete))
      }

      const response = await fetch(`https://nyumba-smart-server.onrender.com/api/listings/${listing?._id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      const result = await response.json()

      if (response.ok && result.success) {
        onSuccess()
        onClose()
      } else {
        setError(result.error || "Failed to update images")
      }
    } catch (err: any) {
      setError(err.message || "Error updating images")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !listing) return null

  const visibleImages = currentImages.filter((img) => !imagesToDelete.includes(img))
  const totalFinalImages = visibleImages.length + newImages.length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-4xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Manage Images</h2>
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

        <div className="space-y-6">
          {/* Property Info */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white">{listing.property?.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {listing.property?.city} • {listing.property?.type}
            </p>
          </div>

          {/* Current Images */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Current Images ({visibleImages.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {visibleImages.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt={`Property ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg cursor-pointer"
                    onClick={() => setPreviewImage(imageUrl)}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                    <button
                      onClick={() => setPreviewImage(imageUrl)}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <Eye className="h-4 w-4 text-white" />
                    </button>
                    <button
                      onClick={() => handleDeleteSingleImage(imageUrl)}
                      disabled={loading}
                      className="p-2 bg-red-500/80 rounded-full hover:bg-red-500 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Images to Delete */}
          {imagesToDelete.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                Images to Delete ({imagesToDelete.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imagesToDelete.map((imageUrl, index) => (
                  <div key={index} className="relative group opacity-50">
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt={`To delete ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-red-500/50 rounded-lg flex items-center justify-center">
                      <button
                        onClick={() => handleRestoreImage(imageUrl)}
                        className="p-2 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                      >
                        <RotateCcw className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Images */}
          {newImages.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">
                New Images ({newImages.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {newImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image) || "/placeholder.svg"}
                      alt={`New ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <button
                        onClick={() => handleRemoveNewImage(index)}
                        className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Section */}
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">Add more images</span>
                  <span className="mt-1 block text-sm text-gray-500 dark:text-gray-400">
                    PNG, JPG up to 10MB each (Max {5 - totalFinalImages} more)
                  </span>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={totalFinalImages >= 5}
                  className="hidden"
                />
              </div>
              <div className="mt-4">
                <button
                  onClick={() => document.getElementById("image-upload")?.click()}
                  disabled={totalFinalImages >= 5}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Choose Images
                </button>
              </div>
            </div>
          </div>

          {/* Image Count Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Total images after update:</strong> {totalFinalImages} / 5
            </p>
            {totalFinalImages === 0 && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">⚠️ Your listing must have at least one image</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-3">
            <button
              onClick={handleReplaceAllImages}
              disabled={loading || newImages.length === 0}
              className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors"
            >
              Replace All Images
            </button>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateImages}
              disabled={loading || totalFinalImages === 0}
              className="px-6 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors"
            >
              {loading ? "Updating..." : "Update Images"}
            </button>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80">
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>
            <img
              src={previewImage || "/placeholder.svg"}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageManagementModal
