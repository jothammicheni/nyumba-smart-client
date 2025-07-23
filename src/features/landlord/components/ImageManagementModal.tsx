/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { X, Upload, Trash2, Plus, Eye, RotateCcw, Loader2 } from "lucide-react"
import type { Property } from "../../../types/properties.js"
import axios from "axios"
import { getAuthHeaders } from "../../../services/authService.js"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
// import { label } from "../../../components/ui/label"
// import { useToast } from "../../../components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Toaster, toast } from "sonner"

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
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  // const { toast } = useToast()

  useEffect(() => {
    if (isOpen && listing) {
      setCurrentImages(listing.images || [])
      setNewImages([])
      setImagesToDelete([])
      setPreviewImage(null)
    }
  }, [isOpen, listing])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const totalImages = currentImages.length - imagesToDelete.length + newImages.length + files.length

      if (totalImages > 5) {
        toast("Maximum 5 images allowed per listing")
        return
      }

      setNewImages((prev) => [...prev, ...files])
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
    
    try {
      const response = await axios.delete(`https://nyumba-smart-server.onrender.com/api/listings/${listing?._id}`, {
        headers: getAuthHeaders(),
        data: { deleteImages: [imageUrl] }
      })

      if (response.data.success) {
        setCurrentImages((prev) => prev.filter((img) => img !== imageUrl))
        toast("Image deleted successfully")
        onSuccess()
      } else {
        toast("Failed to delete image")
      }
    } catch {
      toast("Error deleting image",)
    } finally {
      setLoading(false)
    }
  }

  const handleReplaceAllImages = async () => {
    if (newImages.length === 0) {
      toast("Please select at least one image")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      newImages.forEach((image) => formData.append("images", image))

      const response = await axios.put(
        `https://nyumba-smart-server.onrender.com/api/listings/${listing?._id}`,
        formData,
        { headers: getAuthHeaders(true) }
      )

      if (response.data.success) {
        toast("Images replaced successfully")
        onSuccess()
        onClose()
      } else {
        toast("Failed to update images")
      }
    } catch {
      toast("Error updating images")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateImages = async () => {
    setLoading(true)

    try {
      const formData = new FormData()
      newImages.forEach((image) => formData.append("images", image))
      
      if (imagesToDelete.length > 0) {
        formData.append("deleteImages", JSON.stringify(imagesToDelete))
      }

      const response = await axios.put(
        `https://nyumba-smart-server.onrender.com/api/listings/${listing?._id}`,
        formData,
        { headers: getAuthHeaders(true) }
      )

      if (response.data.success) {
        toast("Images updated successfully")
        onSuccess()
        onClose()
      } else {
        toast("Failed to update images")
      }
    } catch {
      toast("Error updating images")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !listing) return null

  const visibleImages = currentImages.filter((img) => !imagesToDelete.includes(img))
  const totalFinalImages = visibleImages.length + newImages.length

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Toaster position="top-right" richColors/>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle>Manage Images</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Info */}
          <Card className="bg-slate-100 dark:bg-gray-950 shadow-md">
            <CardContent className="p-4">
              <h3 className="font-semibold">{listing.property?.name}</h3>
              <p className="text-sm text-muted-foreground">
                {listing.property?.city} • {listing.property?.type}
              </p>
            </CardContent>
          </Card>

          {/* Current Images */}
          <div className="space-y-3">
            <label>Current Images ({visibleImages.length})</label>
            <div className="grid grid-cols-3 gap-4 p-1">
              {visibleImages.map((imageUrl, index) => (
                <div key={index} className="relative group bg-gray-950/70 p-1 rounded">
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt={`Property ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg cursor-pointer"
                    onClick={() => setPreviewImage(imageUrl)}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setPreviewImage(imageUrl)}
                      className="h-8 w-8 bg-white/20 hover:bg-white/30"
                    >
                      <Eye className="h-4 w-4 text-white" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteSingleImage(imageUrl)}
                      disabled={loading}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Images to Delete */}
          {imagesToDelete.length > 0 && (
            <div className="space-y-2">
              <label className="text-destructive">Images to Delete ({imagesToDelete.length})</label>
              <div className="grid grid-cols-3 gap-3">
                {imagesToDelete.map((imageUrl, index) => (
                  <div key={index} className="relative group opacity-50">
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt={`To delete ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRestoreImage(imageUrl)}
                        className="h-8 w-8"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Images */}
          {newImages.length > 0 && (
            <div className="space-y-2">
              <label className="text-green-600">New Images ({newImages.length})</label>
              <div className="grid grid-cols-3 gap-3">
                {newImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image) || "/placeholder.svg"}
                      alt={`New ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveNewImage(index)}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Section */}
          <div className="border-2 border-dashed border-primary-600/30 rounded-lg p-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Upload className="h-12 w-12 text-muted-foreground" />
              <div className="space-y-1">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <span className="font-medium">Add more images</span>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG up to 10MB each (Max {5 - totalFinalImages} more)
                  </p>
                </label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={totalFinalImages >= 5}
                  className="hidden"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
                className="dark:bg-gray-95 "
                disabled={totalFinalImages >= 5}
              >
                <Plus className="h-4 w-4 mr-2" />
                Choose Images
              </Button>
            </div>
          </div>

          {/* Image Count Info */}
          <Card className="bg-slate-100 dark:bg-gray-950 shadow-md p-2">
            <CardContent className="p-4">
              <p className="text-sm">
                <span className="font-medium">Total images after update:</span> {totalFinalImages} / 5
              </p>
              {totalFinalImages === 0 && (
                <p className="text-sm text-destructive mt-1">
                  ⚠️ Your listing must have at least one image
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleReplaceAllImages}
              disabled={loading || newImages.length === 0}
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              Replace All Images
            </Button>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} disabled={loading} className="hover:bg-red-600 hover:text-white">
              Cancel
            </Button>
            <Button
              onClick={handleUpdateImages}
              disabled={loading || totalFinalImages === 0}
              className="hover:bg-primary-600 hover:text-white"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Updating..." : "Update Images"}
            </Button>
          </div>
        </div>
      </DialogContent>

      {/* Image Preview Modal */}
      {previewImage && (
        <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
          <DialogContent className="max-w-[90vw] max-h-[90vh]">
            <img
              src={previewImage || "/placeholder.svg"}
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  )
}

export default ImageManagementModal