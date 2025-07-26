/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Building, Plus, RefreshCw, Loader2 } from "lucide-react"
import { getProperties, createProperty } from "../../../services/propertyService.js"
import PropertyCard from "../components/PropertyCard.js"
import AddPropertyModal from "../components/AddPropertyModal.js"
import { Button } from "../../../components/ui/button"
import { Card } from "../../../components/ui/card"
import { Toaster, toast } from "sonner"
import { Link } from "react-router-dom"

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
      const errorMsg = err.response?.data?.error || "Failed to fetch properties"
      setError(errorMsg)
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProperty = async (propertyData: any) => {
    try {
      await createProperty(propertyData)
      setIsAddModalOpen(false)
      fetchProperties()
      toast.success('Property added successfully')
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to add property"
      setError(errorMsg)
      toast.error(errorMsg)
    }
  }

  if (loading && properties.length === 0) {
    return (
      <div className="container mx-auto p-4 space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-4">
          <div className="h-8 bg-muted/10 rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-muted/10 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6 animate-fade-in">
      <Toaster position="top-right" richColors />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Properties</h1>
          <p className="text-muted-foreground">
            Manage your rental properties and units
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={fetchProperties}
            className="w-full sm:w-auto bg-primary-600 text-white"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>

          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto bg-white hover:bg-primary-700 hover:text-white text-black"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <div className="flex justify-between items-center">
            <span>⚠️ {error}</span>
            <Link to="/landlord/dashboard/subscriptions">  
            <Button
              size="lg"
              className="ml-2"
            >
              Upgrade
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Content Section */}
      {properties.length === 0 ? (
        <Card className="dark:bg-gray-900/50 shadow-md text-center py-12">
          <Building className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No properties found</h3>
          <p className="mt-2 text-muted-foreground">
            Get started by adding your first property
          </p>
          <div className="mt-6">
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-primary-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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