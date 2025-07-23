/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { X, Upload, Trash2, Loader2 } from "lucide-react"
import type { Property } from "../../../types/properties.js"
import axios from "axios"
import { getAuthHeaders } from "../../../services/authService.js"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea.js"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Checkbox } from "../../../components/ui/checkbox.js"
import { Toaster, toast } from "sonner"

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
    }
  }, [listing, isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 5)
      setNewImages(files)
    }
  }

  const handleDeleteImage = (imageUrl: string) => {
    setImagesToDelete(prev => [...prev, imageUrl])
  }

  const handleRestoreImage = (imageUrl: string) => {
    setImagesToDelete(prev => prev.filter(url => url !== imageUrl))
  }

  const handleSubmit = async () => {
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
      newImages.forEach(image => {
        submitData.append("images", image)
      })

      // Add images to delete
      if (imagesToDelete.length > 0) {
        submitData.append("deleteImages", JSON.stringify(imagesToDelete))
      }

      const response = await axios.put(
        `https://nyumba-smart-server.onrender.com/api/listings/${listing?._id}`,
        submitData,
        { headers: getAuthHeaders(true) }
      )

      if (response.data.success) {
        toast.success("Listing updated successfully",)
        onSuccess()
        onClose()
      } else {
        toast.error("Failed to update listing",)
      }
    } catch {
      toast.error("Error updating listing",)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !listing) return null

  const currentImages = listing.images?.filter(img => !imagesToDelete.includes(img)) || []

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Toaster position="top-right" richColors/>

      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto dark:bg-gray-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-primary-600">
          <CardTitle className="text-xl font-semibold">Edit Listing</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 pt-4 gap-6">
          {/* Left Column - Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="property_name">Property Name</label>
              <Input
                id="property_name"
                name="property_name"
                value={formData.property_name}
                className="dark:bg-gray-950/50 border-gray-800"
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="city">City</label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  className="dark:bg-gray-950/50 border-gray-800"
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="area">Area (m²)</label>
                <Input
                  id="area"
                  name="area"
                  type="number"
                  value={formData.area}
                  className="dark:bg-gray-950/50 border-gray-800"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="specific_location">Specific Location</label>
              <Input
                id="specific_location"
                name="specific_location"
                value={formData.specific_location}
                className="dark:bg-gray-950/50 border-gray-800"
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="type">Type</label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger className="dark:bg-gray-950/50 border-gray-800">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Bedseater">Bedseater</SelectItem>
                    <SelectItem value="1 Bedroom">1 Bedroom</SelectItem>
                    <SelectItem value="2 Bedroom">2 Bedroom</SelectItem>
                    <SelectItem value="3 Bedroom">3 Bedroom</SelectItem>
                    <SelectItem value="4 Bedroom">4 Bedroom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="bathrooms">Bathrooms</label>
                <Select
                  value={formData.bathrooms}
                  onValueChange={(value) => handleSelectChange("bathrooms", value)}
                >
                  <SelectTrigger className="dark:bg-gray-950/50 border-gray-800">
                    <SelectValue placeholder="Select bathrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="bedrooms">Bedrooms</label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  className="dark:bg-gray-950/50 border-gray-800"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="price">Price (KES)</label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  className="dark:bg-gray-950/50 border-gray-800"
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="deposit">Deposit (KES)</label>
                <Input
                  id="deposit"
                  name="deposit"
                  type="number"
                  value={formData.deposit}
                  className="dark:bg-gray-950/50 border-gray-800"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                className="dark:bg-gray-950/50 border-gray-800"
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="amenities">Amenities (comma-separated)</label>
              <Input
                id="amenities"
                name="amenities"
                value={formData.amenities}
                className="dark:bg-gray-950/50 border-gray-800"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked: any) => 
                  setFormData(prev => ({ ...prev, featured: Boolean(checked) }))
                }
              />
              <label htmlFor="featured">Featured Listing</label>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label>Current Images</label>
              <div className="grid grid-cols-3 gap-2">
                {currentImages.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt={`Property ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteImage(imageUrl)}
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {imagesToDelete.length > 0 && (
              <div className="space-y-2">
                <label className="text-destructive">Images to Delete ({imagesToDelete.length})</label>
                <div className="grid grid-cols-3 gap-2">
                  {imagesToDelete.map((imageUrl, index) => (
                    <div key={index} className="relative group opacity-50">
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={`To delete ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRestoreImage(imageUrl)}
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Upload className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="newImages">Upload New Images (Max 5)</label>
              <Input
                id="newImages"
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                multiple
                className="dark:bg-primary-600 cursor-pointer border-gray-800"
                onChange={handleImageUpload}
              />
              {newImages.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {newImages.length} new image(s) selected
                </p>
              )}
            </div>
          </div>
        </CardContent>

        <div className="flex justify-end gap-2 p-6 pt-0">
          <Button variant="outline" onClick={onClose} className="hover:bg-red-600">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading} className="hover:bg-primary-600 hover:text-white">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Updating..." : "Update Listing"}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default EditListingModal