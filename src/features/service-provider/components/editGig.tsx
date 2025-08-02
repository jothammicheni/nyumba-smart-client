"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Switch } from "../../../components/ui/switch"
import { Badge } from "../../../components/ui/badge"
import { Upload, X, ArrowLeft, Save, Eye, ImageIcon, AlertCircle, Loader2 } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AlertDialog, AlertDialogContent, AlertDialogDescription } from "../../../components/ui/alert-dialog"
import { toast } from "sonner"
import serviceGigService, { ServiceGig } from "../../../services/serviceGigService"

const categories = [
  { value: "plumbing", label: "Plumbing" },
  { value: "electrical", label: "Electrical" },
  { value: "cleaning", label: "Cleaning" },
  { value: "security", label: "Security" },
  { value: "wifi", label: "WiFi/Tech" },
  { value: "carpentry", label: "Carpentry" },
  { value: "masonry", label: "Masonry" },
  { value: "painting", label: "Painting" },
  { value: "gardening", label: "Gardening" },
  { value: "moving", label: "Moving" },
  { value: "other", label: "Other" },
]

const statusOptions = [
  { value: "active", label: "Active", color: "bg-green-100 text-green-800" },
  { value: "inactive", label: "Inactive", color: "bg-gray-100 text-gray-800" },
  { value: "pending-review", label: "Pending Review", color: "bg-yellow-100 text-yellow-800" },
]

export default function EditGigPage() {
  const params = useParams()
  const router = useNavigate()
  const gigId = params.id as string

  const [gig, setGig] = useState<ServiceGig | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    isFeatured: false,
    status: "active",
    location: {
      city: "",
      state: "",
      country: "",
    },
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchGig()
  }, [gigId])

  const fetchGig = async () => {
    try {
      setLoading(true)
      const response = await serviceGigService.getGigById(gigId)
      if (response.success) {
        const gigData = response.data
        setGig(gigData)
        setFormData({
          title: gigData.title || "",
          description: gigData.description || "",
          price: gigData.price?.toString() || "",
          category: gigData.category || "",
          isFeatured: gigData.isFeatured || false,
          status: gigData.status || "active",
          location: {
            city: gigData.location?.city || "",
            state: gigData.location?.state || "",
            country: gigData.location?.country || "",
          },
        })
        setImagePreview(gigData.image || "")
      } else {
        toast.error("Failed to load gig")
        router("/manage/gigs")
      }
    } catch (error) {
      console.error("Error fetching gig:", error)
      toast.error("Failed to load gig")
      router("/manage/gigs")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.startsWith("location.")) {
      const locationField = field.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "Image size must be less than 5MB" }))
        return
      }

      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      setErrors((prev) => ({ ...prev, image: "" }))
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(gig?.image || "")
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (formData.description.length < 50) {
      newErrors.description = "Description must be at least 50 characters"
    }

    if (!formData.price) {
      newErrors.price = "Price is required"
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const updateData = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        isFeatured: formData.isFeatured,
        status: formData.status,
        location: formData.location,
      }

      const response = await serviceGigService.updateGig(gigId, updateData, imageFile || undefined)

      if (response.success) {
        toast.success("Gig updated successfully!")
        router("/manage/gigs")
      } else {
        toast.error("Failed to update gig")
      }
    } catch (error) {
      console.error("Error updating gig:", error)
      toast.error("Failed to update gig. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveDraft = async () => {
    try {
      const updateData = {
        ...formData,
        price: Number(formData.price),
        status: "inactive",
      }

      await serviceGigService.updateGig(gigId, updateData, imageFile || undefined)
      toast.success("Draft saved!")
    } catch (error) {
      console.error("Error saving draft:", error)
      toast.error("Failed to save draft")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading gig...</span>
        </div>
      </div>
    )
  }

  if (!gig) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gig not found</h1>
          <p className="text-gray-600 mb-4">The gig you're looking for doesn't exist or has been deleted.</p>
          <Link to="/manage/gigs">
            <Button>Back to My Gigs</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/manage/gigs" className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
                <ArrowLeft className="h-5 w-5" />
                Back to My Gigs
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Link to={`/gig/${gigId}`}>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Service Gig</h1>
          <p className="text-gray-600">Update your service listing to attract more customers.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title">Gig Title *</Label>
                <Input
                  id="title"
                  placeholder="I will provide professional plumbing services..."
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
                <p className="text-sm text-gray-500 mt-1">{formData.title.length}/100 characters</p>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your service in detail..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className={`min-h-32 ${errors.description ? "border-red-500" : ""}`}
                />
                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                <p className="text-sm text-gray-500 mt-1">{formData.description.length} characters (minimum 50)</p>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                Pricing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="price">Starting Price (USD) *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="price"
                    type="number"
                    placeholder="50"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className={`pl-8 ${errors.price ? "border-red-500" : ""}`}
                    min="1"
                    step="0.01"
                  />
                </div>
                {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Media */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                Gig Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-600 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-900 mb-2">Upload a gig image</p>
                      <p className="text-gray-500 mb-4">Drag and drop an image, or click to browse</p>
                      <Button type="button" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Image
                      </Button>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Gig preview"
                      width={400}
                      height={250}
                      className="w-full max-w-md h-64 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={removeImage}
                      className="absolute top-2 right-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    {imageFile && <Badge className="absolute bottom-2 left-2 bg-green-600">New image selected</Badge>}
                  </div>
                )}
                {errors.image && (
                 <AlertDialog>
  <AlertDialogContent>
    <div className="flex items-center space-x-2">
      <AlertCircle className="h-4 w-4 text-red-600" />  {/* Add color here instead */}
      <AlertDialogDescription>{errors.image}</AlertDialogDescription>
    </div>
  </AlertDialogContent>
</AlertDialog>

                )}
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  4
                </div>
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    value={formData.location.city}
                    onChange={(e) => handleInputChange("location.city", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="NY"
                    value={formData.location.state}
                    onChange={(e) => handleInputChange("location.state", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="USA"
                    value={formData.location.country}
                    onChange={(e) => handleInputChange("location.country", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  5
                </div>
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="featured">Featured Gig</Label>
                  <p className="text-sm text-gray-500">Featured gigs get more visibility</p>
                </div>
                <Switch
                  id="featured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => handleInputChange("isFeatured", checked)}
                />
              </div>

              <div>
                <Label>Gig Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        <div className="flex items-center gap-2">
                          <Badge className={status.color}>{status.label}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex items-center justify-between pt-6 border-t">
            <Button type="button" variant="outline" asChild>
              <Link to="/manage/gigs">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary-600 hover:bg-primary-700 min-w-32">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Gig"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
