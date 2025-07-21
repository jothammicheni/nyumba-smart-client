/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState } from "react"
import { X, Trash2, AlertTriangle } from "lucide-react"
import type { Property } from "../../../types/properties.js"

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  listing: Property | null
  onConfirm: (listingId: string) => Promise<void>
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, listing, onConfirm }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleDelete = async () => {
    if (!listing) return

    setLoading(true)
    setError("")

    try {
      await onConfirm(listing._id)
      onClose()
    } catch (err: any) {
      setError(err.message || "Failed to delete listing")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !listing) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg w-full max-w-md mx-auto shadow-xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-1.5 sm:p-2 bg-red-100 dark:bg-primary-600/30 rounded-full">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 dark:text-primary-600" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Delete Listing</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-3 py-2 sm:px-4 sm:py-3 rounded-lg mb-3 sm:mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Content */}
        <div className="mb-4 sm:mb-6">
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
            Are you sure you want to delete this listing? This action cannot be undone.
          </p>

          {/* Listing Preview */}
          <div className="bg-gray-50 dark:bg-gray-950/50 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center space-x-2 sm:space-x-3">
              {listing.images && listing.images[0] && (
                <img
                  src={listing.images[0] || "/placeholder.svg"}
                  alt={listing.property?.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                />
              )}
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white truncate">
                  {listing.property?.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                  {listing.property?.city} • {listing.property?.type}
                </p>
                <p className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-600">
                  KES {listing.property?.price?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-xs sm:text-sm text-yellow-800 dark:text-yellow-200">
              <span className="font-semibold">Warning:</span> All associated images will also be permanently deleted from cloud storage.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col xs:flex-row justify-end gap-2 sm:gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium transition-colors disabled:opacity-50 text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors flex items-center justify-center space-x-1.5 sm:space-x-2 text-sm sm:text-base"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Delete Listing</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal