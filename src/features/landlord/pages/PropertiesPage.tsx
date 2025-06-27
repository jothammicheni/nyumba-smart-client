"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowRight, Building, Plus, RefreshCw } from "lucide-react"
import { getProperties, createProperty } from "../../../services/propertyService"
import PropertyCard from "../components/PropertyCard"
import AddPropertyModal from "../components/AddPropertyModal"

interface Property {
  _id: string
  name: string
  city: string
  area: string
  roomCount?: number
  vacantRoomCount?: number
}

const PropertiesPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await getProperties()
      setProperties(response.data)
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch properties")
    } finally {
      setLoading(false)
    }
  }

 const handleAddProperty = async (propertyData: any) => {
  try {
    await createProperty(propertyData);
    setIsAddModalOpen(false);
    fetchProperties();
  } catch (err: any) {
    const errorMsg =
      err?.response?.data?.message || // Custom middleware error
      err?.response?.data?.error ||  // Generic error
      "Failed to add property";

    setError(errorMsg);
  }
};


  return (
    <div className="px-4 sm:px-6 py-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Properties</h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={fetchProperties}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </button>
        </div>
      </div>

{error && (
  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
    ⚠️ {error}
    <div className="mt-3 text-right">
      <button
        onClick={() => window.location.href = '/subscriptions'} // or navigate('/subscriptions') if using react-router
        className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-md hover:bg-yellow-600 transition"
      >
        Upgrade Plan
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  </div>
)}

      {loading ? (
        <div className="flex justify-center items-center min-h-[16rem]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : properties.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <Building className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No properties found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by adding your first property.</p>
          <div className="mt-6">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}

      <AddPropertyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProperty}
      />
    </div>
  )
}

export default PropertiesPage
