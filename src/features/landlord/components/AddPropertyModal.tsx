/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
// import { useToast } from "../../../components/ui/use-toast"
import { Toaster, toast } from "sonner"

interface AddPropertyModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (propertyData: any) => void
}

const AddPropertyModal: React.FC<AddPropertyModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    area: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (!formData.name.trim()) {
      newErrors.name = "Property name is required"
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }

    if (!formData.area.trim()) {
      newErrors.area = "Area is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validate()) {
      try {
        onSubmit(formData)
        setFormData({
          name: "",
          city: "",
          area: "",
        })
        toast.success("Property added successfully")
        onClose()
      } catch {
        toast("Failed to add property")
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Toaster position="top-right" richColors />
      <DialogContent className="sm:max-w-[425px] dark:bg-gray-950">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Add New Propertymm</span>
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button> */}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name">Property Name</label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter property name"
              className={errors.name ? "border-destructive" : "dark:bg-gray-900 focus:outline-none focus:ring focus:ring-primary-600"}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="city">City</label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className={errors.city ? "border-destructive" : "dark:bg-gray-900 focus:outline-none focus:ring focus:ring-primary-600"}
            />
            {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="area">Area</label>
            <Input
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Enter area"
              className={errors.area ? "border-destructive" : "dark:bg-gray-900 focus:outline-none focus:ring focus:ring-primary-600"}
            />
            {errors.area && <p className="text-sm text-destructive">{errors.area}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit">
              Add Property
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddPropertyModal
