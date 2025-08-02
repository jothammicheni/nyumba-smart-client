/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState, ChangeEvent, FormEvent } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { Switch } from "../../../components/ui/switch"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Badge } from "../../../components/ui/badge"
import {
  Upload,
  X,
  ArrowLeft,
  ArrowRight,
  Save,
  Eye,
  AlertCircle,
} from "lucide-react"
import { AlertDialog, AlertDialogContent, AlertDialogDescription } from "../../../components/ui/alert-dialog"
import serviceGigService from "../../../services/serviceGigService"

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

interface FormData {
  title: string
  description: string
  price: string
  category: string
  isFeatured: boolean
  status: string
}

export default function CreateGigPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "",
    category: "",
    isFeatured: false,
    status: "pending-review",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [step, setStep] = useState(1)

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }))
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: "Image must be less than 5MB" }))
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = ev => setImagePreview(ev.target?.result as string)
      reader.readAsDataURL(file)
      setErrors(prev => ({ ...prev, image: "" }))
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview("")
  }

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = "Title is required"
      else if (formData.title.length > 100) newErrors.title = "Max 100 characters"
      if (!formData.category) newErrors.category = "Category is required"
    }
    if (step === 2) {
      if (!formData.description.trim()) newErrors.description = "Description is required"
      else if (formData.description.length < 50) newErrors.description = "Min 50 characters"
      if (!formData.price) newErrors.price = "Price is required"
      else if (Number(formData.price) <= 0 || isNaN(Number(formData.price))) {
        newErrors.price = "Must be a valid number > 0"
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => { if (validateStep()) setStep(s => Math.min(4, s + 1)) }
  const handleBack = () => setStep(s => Math.max(1, s - 1))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateStep()) return
    setIsSubmitting(true)
    try {
      const payload = { ...formData, price: Number(formData.price) }
      await serviceGigService.createGig(payload, imageFile ?? undefined)
      alert("Gig created successfully!")
    } catch {
      alert("Failed to create gig")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = "w-full px-4 py-2 border rounded focus:ring focus:ring-indigo-200"

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto py-4 px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center text-gray-700 hover:text-indigo-600">
            <ArrowLeft className="h-6 w-6" /> <span className="ml-2">Back</span>
          </Link>
          <Button variant="outline" onClick={() => alert("Draft saved!")}>
            <Save className="h-5 w-5 mr-1" /> Save Draft
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-8">
        <h1 className="text-4xl font-semibold text-gray-800">Create a New Service Gig</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <Card>
              <CardHeader><CardTitle>Step 1: Basic Information</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Title *</Label>
                  <Input
                    placeholder="Fibre internet provider"
                    className={`${inputClass} ${errors.title && "border-red-500"}`}
                    value={formData.title}
                    onChange={e => handleInputChange("title", e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Short & clear titles sell faster
                  </p>
                  {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
                </div>
                <div>
                  <Label>Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={v => handleInputChange("category", v)}
                  >
                    <SelectTrigger className={`${inputClass} ${errors.category && "border-red-500"}`}>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(c => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader><CardTitle>Step 2: Description & Pricing</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Description *</Label>
                  <Textarea
                    className={`${inputClass} ${errors.description && "border-red-500"}`}
                    rows={5}
                    value={formData.description}
                    onChange={e => handleInputChange("description", e.target.value)}
                  />
                  {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
                </div>
                <div>
                  <Label>Price (KES) *</Label>
                  <Input
                    type="number"
                    placeholder="5000"
                    className={`${inputClass} ${errors.price && "border-red-500"}`}
                    value={formData.price}
                    onChange={e => handleInputChange("price", e.target.value)}
                  />
                  {errors.price && <p className="text-red-600 text-sm">{errors.price}</p>}
                </div>
                <div className="flex items-center">
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={c => handleInputChange("isFeatured", c ?? false)}
                  />
                  <Label htmlFor="isFeatured" className="ml-2">Featured gig</Label>
                  {formData.isFeatured && (
                    <span className="ml-4 text-indigo-700 text-sm">
                      (Premium only — <Link to="/pricing" className="underline">Learn More</Link>)<br />
                      ❤️ 90% of featured gigs sell first!
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader><CardTitle>Step 3: Upload Image (optional)</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                {!imagePreview ? (
                  <label className={`flex items-center gap-2 p-4 border-dashed rounded-lg ${errors.image ? "border-red-500" : "border-gray-300"} cursor-pointer`}>
                    <Upload className="h-5 w-5" /> Select Image
                    <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                  </label>
                ) : (
                  <div className="relative w-full h-64 border rounded overflow-hidden">
                    <img src={imagePreview} alt="preview" className="object-cover w-full h-full" />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                    >
                      <X className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                )}
                <p className="text-gray-500">
                  90% of customers are attracted by a well‑explained image
                </p>
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
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <div className="text-center space-y-4">
              <p className="text-lg">You're ready to publish your gig!</p>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Gig"}
              </Button>
            </div>
          )}

          <div className="flex justify-between">
            {step > 1 && (
              <Button variant="outline" type="button" onClick={handleBack}>
                <ArrowLeft className="h-5 w-5" /> Back
              </Button>
            )}
            {step < 4 && (
              <Button type="button" onClick={handleNext}>
                Next <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            )}
          </div>
        </form>
      </main>
    </div>
  )
}
