/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"

interface AddRoomModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (roomData: any) => void
  propertyId: string
}

const AddRoomModal: React.FC<AddRoomModalProps> = ({ isOpen, onClose, onSubmit, propertyId }) => {
  const [formData, setFormData] = useState({
    room_number: "",
    status: "vacant",
    price: "",
    type: "bedsitter",
    bathrooms: "1",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.room_number.trim()) {
      newErrors.room_number = "Room number is required"
    }
    if (!formData.price.trim()) {
      newErrors.price = "Price is required"
    }
    if (!formData.type.trim()) {
      newErrors.type = "Type is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validate()) {
      onSubmit({
        ...formData,
        property_id: propertyId,
      })
      setFormData({
        room_number: "",
        status: "vacant",
        price: "",
        type: "bedsitter",
        bathrooms: "1",
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white dark:bg-gray-950 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add New Room</h3>
            <button type="button" className="text-gray-400 hover:text-gray-500 focus:outline-none" onClick={onClose}>
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-6 py-4">
              <div className="mb-4">
                <label
                  htmlFor="room_number"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Room Number
                </label>
                <input
                  type="text"
                  id="room_number"
                  name="room_number"
                  value={formData.room_number}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${
                    errors.room_number ? "border-red-500" : "border-gray-300 dark:border-gray-800/50"} 
                    rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800/40 text-gray-900 dark:text-white`
                  }
                  placeholder="Enter room number"
                />
                {errors.room_number && <p className="mt-1 text-sm text-red-500">{errors.room_number}</p>}
              </div>

              {/* Price input */}
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${
                    errors.price ? "border-red-500" : "border-gray-300 dark:border-gray-800/50"
                  } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800/40 text-gray-900 dark:text-white`}
                  placeholder="Enter price"
                />
                {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
              </div>

              {/* Type select */}
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 border ${
                    errors.type ? "border-red-500" : "border-gray-300 dark:border-gray-800/50"
                  } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800/40 text-gray-900 dark:text-white`}
                >
                  <option value="bedsitter">Bedsitter</option>
                  <option value="1 bedroom">1 Bedroom</option>
                  <option value="2 bedroom">2 Bedroom</option>
                  <option value="3 bedroom">3 Bedroom</option>
                </select>
                {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
              </div>

              {/* Bathrooms input */}
              <div className="mb-4">
                <label
                  htmlFor="bathrooms"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Bathrooms
                </label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  min="1"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-800/50 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800/40 text-gray-900 dark:text-white"
                  placeholder="Number of bathrooms"
                />
              </div>

              {/* Status select */}
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-800/50 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-800/40 text-gray-900 dark:text-white"
                >
                  <option value="vacant">Vacant</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="reserved">Reserved</option>
                </select>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 dark:bg-primary-600/10 flex justify-end">
              <button
                type="button"
                className="mr-3 px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Add Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddRoomModal
