/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Switch } from "../../../components/ui/switch"
import { Badge } from "../../../components/ui/badge"
import { Upload, X, ArrowLeft, Save, Eye, ImageIcon, AlertCircle, Loader2, Info, CheckCircle } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import serviceGigService, { ServiceGig } from "../../../services/serviceGigService"
import { Progress } from "../../../components/ui/progress"

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
        toast.success("Gig updated successfully!", {
          action: {
            label: "View Gig",
            onClick: () => router(`/service-provider/dashboard/manage/gig/${gigId}`)
          }
        })
        router("/service-provider/dashboard/manage/gigs")
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
      toast.success("Draft saved!", {
        position: "bottom-right",
        icon: <CheckCircle className="h-5 w-5 text-green-500" />
      })
    } catch (error) {
      console.error("Error saving draft:", error)
      toast.error("Failed to save draft", {
        position: "bottom-right"
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          <span className="text-gray-600">Loading your gig details...</span>
          <Progress value={0} className="w-48 h-2" />
        </div>
      </div>
    )
  }

  if (!gig) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-sm border">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gig not found</h1>
          <p className="text-gray-600 mb-6">The gig you're looking for doesn't exist or has been deleted.</p>
          <Link to="/service-provider/dashboard/manage/gigs">
            <Button className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to My Gigs
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                to="/service-provider/dashboard/manage/gigs"
                className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Back to My Gigs</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                className="hidden sm:flex"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Link to={`/service-provider/dashboard/manage/gig/${gigId}`}>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Preview</span>
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
          <Card className="border border-gray-200 bg-white text-gray-900 hover:border-primary-300 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div>
                  <h2>Basic Information</h2>
                  <CardDescription className="mt-1">
                    Tell customers what service you're offering
                  </CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title">Gig Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Professional Plumbing Services for Homes and Offices"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={errors.title ? "border-red-500 mt-2" : "mt-2 bg-white/90 border-gray-300"}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.title}
                  </p>
                )}
                <p className={`text-sm mt-1 ${formData.title.length > 90 ? "text-amber-600" : "text-gray-500"
                  }`}>
                  {formData.title.length}/100 characters
                </p>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange("category", value)}
                >
                  <SelectTrigger className={errors.category ? "border-red-500 mt-2" : "mt-2 bg-white/90 border-gray-300"}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-950">
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your service in detail. Include what makes your service special, your experience, and any important details customers should know."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className={`min-h-32 mt-2 ${errors.description ? "border-red-500" : "bg-white/90 border-gray-300"}`}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.description}
                  </p>
                )}
                <p className={`text-sm mt-1 ${formData.description.length < 50 ? "text-amber-600" : "text-gray-500"
                  }`}>
                  {formData.description.length} characters (minimum 50)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="border border-gray-200 bg-white text-gray-900 hover:border-primary-300 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div>
                  <h2>Pricing</h2>
                  <CardDescription className="mt-1">
                    Set your starting price and any additional pricing options
                  </CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="price">Starting Price (USD) *</Label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="price"
                      type="number"
                      placeholder="50.00"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      className={`pl-8 ${errors.price ? "border-red-500" : "bg-white/90 border-gray-300"}`}
                      min="1"
                      step="0.01"
                    />
                  </div>
                  {errors.price && (
                    <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.price}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-800">Pricing Tip</h4>
                      <p className="text-sm text-blue-600 mt-1">
                        Consider researching competitors' prices in your area. A competitive price can help you get more customers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Media */}
          <Card className="border border-gray-200 bg-white text-gray-900 hover:border-primary-300 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <div>
                  <h2>Gig Pictorial Illustration</h2>
                  <CardDescription className="mt-1">
                    Upload a high-quality image that represents your service
                  </CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-600 transition-colors bg-gray-50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-900 mb-2">Upload a gig image</p>
                      <p className="text-gray-500 mb-4">JPG, PNG (Max 5MB)</p>
                      <Button type="button" variant="outline" className="border-gray-300">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Image
                      </Button>
                    </label>
                  </div>
                ) : (
                  <div className="relative group">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Gig preview"
                      width={400}
                      height={250}
                      className="w-full max-w-md h-64 object-cover rounded-lg border border-gray-200 shadow-sm"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={removeImage}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    {imageFile && (
                      <Badge className="absolute bottom-2 left-2 bg-green-600">
                        New image selected
                      </Badge>
                    )}
                  </div>
                )}
                {errors.image && (
                  <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <p className="text-sm">{errors.image}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="border border-gray-200 bg-white text-gray-900 hover:border-primary-300 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  4
                </div>
                <div>
                  <h2>Service Location</h2>
                  <CardDescription className="mt-1">
                    Let customers know where you provide this service
                  </CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="e.g., New York"
                    value={formData.location.city}
                    onChange={(e) => handleInputChange("location.city", e.target.value)}
                    className="mt-2 bg-white/90 border-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    placeholder="e.g., NY or California"
                    value={formData.location.state}
                    onChange={(e) => handleInputChange("location.state", e.target.value)}
                    className="mt-2 bg-white/90 border-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="e.g., USA"
                    value={formData.location.country}
                    onChange={(e) => handleInputChange("location.country", e.target.value)}
                    className="mt-2 bg-white/90 border-gray-300"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="border border-gray-200 bg-white text-gray-900 hover:border-primary-300 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  5
                </div>
                <div>
                  <h2>Gig Settings</h2>
                  <CardDescription className="mt-1">
                    Configure visibility and other options
                  </CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label htmlFor="featured" className="font-medium">Featured Gig</Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Featured gigs appear at the top of search results
                  </p>
                </div>
                <Switch
                  id="featured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => handleInputChange("isFeatured", checked)}
                />
              </div>

              <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-200">
                <Label className="font-semibold text-gray-800 mb-3 block text-sm">Gig Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                    <SelectValue placeholder="Select the gig status..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-lg rounded-lg border border-gray-200">
                    {statusOptions.map((status) => (
                      <SelectItem
                        key={status.value}
                        value={status.value}
                        className="hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Badge className={`${status.color} text-xs px-2 py-1 rounded-md`}>{status.label}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-blue-600 mt-3 leading-relaxed p-1 rounded bg-blue-200">
                  <span className="font-bold text-blue-600">Tip:</span> Active gigs are visible to customers, while inactive gigs remain private.
                </p>
              </div>

            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-8 border-t">
            <div className="w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                asChild
              >
                <Link to="/manage/gigs">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Cancel
                </Link>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                type="button"
                variant="secondary"
                onClick={handleSaveDraft}
                className="w-full sm:w-auto"
              >
                <Save className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-primary-600 text-white hover:bg-primary-700 min-w-32"
              >
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
          </div>
        </form>
      </div>
    </div>
  )
}
