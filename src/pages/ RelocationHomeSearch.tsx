

import type React from "react"
import { useState, useEffect, type FormEvent } from "react"
import { HomeIcon, MoveRightIcon, MapPinIcon, SearchIcon, Building2Icon, UsersIcon } from "lucide-react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from "../components/ui/label"



type NotificationType = "success" | "error"


// Helper validation functions
const validateEmail = (email: string): string => {
  if (!email) return "Email is required."
  if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email address."
  return ""
}

const validateKenyanPhoneNumber = (phone: string): string => {
  if (!phone) return "Phone number is required."
  // Regex for Kenyan numbers: starts with +2547 or 07 followed by 8 digits
  if (!/^(\+?254|0)7\d{8}$/.test(phone))
    return "Phone must be a valid Kenyan number (e.g., +2547XXXXXXXX or 07XXXXXXXX)."
  return ""
}

const RelocationHomeSearch: React.FC = () => {
  const [activeForm, setActiveForm] = useState<"homeSearch" | "relocation">("homeSearch")
  const [homeSearch, setHomeSearch] = useState({
    location: "",
    email: "",
    phone: "",
    minPrice: "",
    maxPrice: "",
    propertyType: "",
    bedrooms: "",
    stayDurationType: "",
    stayDurationValue: "",
    preferredMoveInDate: "",
    additionalNotes: "",
  })
  const [relocation, setRelocation] = useState({
    name: "",
    email: "",
    phone: "",
    currentLocation: "",
    destination: "",
    movingDate: "",
    movingType: "",
    additionalNotes: "",
  })

  // State for validation errors
  const [homeSearchErrors, setHomeSearchErrors] = useState<Record<string, string>>({})
  const [relocationErrors, setRelocationErrors] = useState<Record<string, string>>({})

  // Notification state
  const [notification, setNotification] = useState<{ type: NotificationType; message: string } | null>(null)
  const [isSubmittingHomeSearch, setIsSubmittingHomeSearch] = useState(false)
  const [isSubmittingRelocation, setIsSubmittingRelocation] = useState(false)

  useEffect(() => {
    if (notification) {
      // Changed timeout from 4000 to 60000 milliseconds (1 minute)
      const timer = setTimeout(() => setNotification(null), 60000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const handleHomeSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    name?: string,
  ) => {
    let fieldName: string
    let value: string

    if (typeof e === "string" && name) {
      // For Select component
      fieldName = name
      value = e
    } else if (typeof e === "object" && "target" in e) {
      // For Input/Textarea
      fieldName = e.target.name
      value = e.target.value
    } else {
      return // Should not happen
    }

    setHomeSearch((prev) => ({ ...prev, [fieldName]: value }))

    // Validate on change
    let error = ""
    if (fieldName === "email") {
      error = validateEmail(value)
    } else if (fieldName === "phone") {
      error = validateKenyanPhoneNumber(value)
    } else if (fieldName === "location" && !value) {
      error = "Preferred location is required."
    } else if (fieldName === "preferredMoveInDate" && !value) {
      error = "Preferred move-in date is required."
    }
    setHomeSearchErrors((prev) => ({ ...prev, [fieldName]: error }))
  }

  const handleRelocationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    name?: string,
  ) => {
    let fieldName: string
    let value: string

    if (typeof e === "string" && name) {
      // For Select component
      fieldName = name
      value = e
    } else if (typeof e === "object" && "target" in e) {
      // For Input/Textarea
      fieldName = e.target.name
      value = e.target.value
    } else {
      return // Should not happen
    }

    setRelocation((prev) => ({ ...prev, [fieldName]: value }))

    // Validate on change
    let error = ""
    if (fieldName === "email") {
      error = validateEmail(value)
    } else if (fieldName === "phone") {
      error = validateKenyanPhoneNumber(value)
    } else if (fieldName === "name" && !value) {
      error = "Full name is required."
    } else if (fieldName === "currentLocation" && !value) {
      error = "Current location is required."
    } else if (fieldName === "destination" && !value) {
      error = "Destination location is required."
    } else if (fieldName === "movingDate" && !value) {
      error = "Moving date is required."
    }
    setRelocationErrors((prev) => ({ ...prev, [fieldName]: error }))
  }

  const validateHomeSearchForm = (): boolean => {
    const errors: Record<string, string> = {}
    errors.location = homeSearch.location ? "" : "Preferred location is required."
    errors.email = validateEmail(homeSearch.email)
    errors.phone = validateKenyanPhoneNumber(homeSearch.phone)
    errors.preferredMoveInDate = homeSearch.preferredMoveInDate ? "" : "Preferred move-in date is required."

    setHomeSearchErrors(errors)
    return Object.values(errors).every((error) => !error)
  }

  const validateRelocationForm = (): boolean => {
    const errors: Record<string, string> = {}
    errors.name = relocation.name ? "" : "Full name is required."
    errors.email = validateEmail(relocation.email)
    errors.phone = validateKenyanPhoneNumber(relocation.phone)
    errors.currentLocation = relocation.currentLocation ? "" : "Current location is required."
    errors.destination = relocation.destination ? "" : "Destination location is required."
    errors.movingDate = relocation.movingDate ? "" : "Moving date is required."

    setRelocationErrors(errors)
    return Object.values(errors).every((error) => !error)
  }

  const successMessage = (type: "relocation" | "homeSearch") =>
    `We received your request on ${type === "relocation" ? "relocation" : "home search"}. Expect a call from us within 24 Hrs. For details call +254(0)113730593`
  const errorMessage = "We can’t submit your request at the moment. Try again later."

  const submitHomeSearch = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateHomeSearchForm()) {
      setNotification({ type: "error", message: "Please correct the errors in the form." })
      return
    }

    setIsSubmittingHomeSearch(true)
    try {
      // Prepare data, converting empty strings for numbers to undefined
      const dataToSend = {
        type: "homeSearch",
        data: {
          ...homeSearch,
          minPrice: homeSearch.minPrice === "" ? undefined : Number(homeSearch.minPrice),
          maxPrice: homeSearch.maxPrice === "" ? undefined : Number(homeSearch.maxPrice),
          bedrooms: homeSearch.bedrooms === "" ? undefined : Number(homeSearch.bedrooms),
          stayDurationValue: homeSearch.stayDurationValue === "" ? undefined : Number(homeSearch.stayDurationValue),
        },
      }

      const response = await fetch("https://nyumba-smart-server.onrender.com/api/home-search-relocation-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Crucial header
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) throw new Error("Submission failed")
      setNotification({ type: "success", message: successMessage("homeSearch") })
      setHomeSearch({
        location: "",
        email: "",
        phone: "",
        minPrice: "",
        maxPrice: "",
        propertyType: "",
        bedrooms: "",
        stayDurationType: "",
        stayDurationValue: "",
        preferredMoveInDate: "",
        additionalNotes: "",
      })
      setHomeSearchErrors({}) // Clear errors on successful submission
    } catch (err) {
      console.error(err)
      setNotification({ type: "error", message: errorMessage })
    } finally {
      setIsSubmittingHomeSearch(false)
    }
  }

  const submitRelocation = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateRelocationForm()) {
      setNotification({ type: "error", message: "Please correct the errors in the form." })
      return
    }

    setIsSubmittingRelocation(true)
    try {
      // Prepare data, converting empty strings for numbers to undefined
      const dataToSend = {
        type: "relocation",
        data: {
          ...relocation,
          // No number fields in relocation form that need this specific conversion
        },
      }

      const response = await fetch("https://nyumba-smart-server.onrender.com/api/home-search-relocation-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Crucial header
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) throw new Error("Submission failed")
      setNotification({ type: "success", message: successMessage("relocation") })
      setRelocation({
        name: "",
        email: "",
        phone: "",
        currentLocation: "",
        destination: "",
        movingDate: "",
        movingType: "",
        additionalNotes: "",
      })
      setRelocationErrors({}) // Clear errors on successful submission
    } catch (err) {
      console.error(err)
      setNotification({ type: "error", message: errorMessage })
    } finally {
      setIsSubmittingRelocation(false)
    }
  }

  return (
    <main className="relative max-w-7xl mx-auto px-6 py-12 font-sans overflow-hidden">
      {/* Animated Background Shapes */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 bg-primary-300 rounded-full opacity-30 animate-float1"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary-400 rounded-full opacity-25 animate-float2"></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-float3"></div>
      </div>

      <h1 className="text-3xl font-bold text-center text-primary-600 mb-12 flex justify-center items-center gap-3">
        <MoveRightIcon className="text-primary-600" size={32} />
        {"Relocate & Find Home in Kenya"}
      </h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Info Section */}
        <section className="lg:w-1/2 space-y-8 text-gray-700">
          <p className="text-lg leading-relaxed">
            <strong className="font-semibold">TenaHub Solutions</strong> takes the hassle out of relocating and finding
            a home in Kenya. Whether you need a place to stay for a night, a week, or on a monthly basis, we find and
            prepare the perfect home so you just arrive and sleep.
          </p>
          <p className="text-lg leading-relaxed">
            Our comprehensive service handles everything—from property search, negotiation, and booking, to logistics
            and settling-in support. With us, relocating becomes effortless and comfortable.
          </p>
          <ul className="space-y-4 list-disc list-inside text-gray-600">
            <li className="flex items-start gap-3">
              <UsersIcon className="text-primary-600 mt-1" size={20} />
              {"Serving clients relocating to all major Kenyan cities."}
            </li>
            <li className="flex items-start gap-3">
              <Building2Icon className="text-primary-600 mt-1" size={20} />
              {"Access verified houses, apartments, and offices ready for move-in."}
            </li>
            <li className="flex items-start gap-3">
              <MapPinIcon className="text-primary-600 mt-1" size={20} />
              {"Personalized recommendations by city and neighborhood."}
            </li>
            <li className="flex items-start gap-3">
              <MoveRightIcon className="text-primary-600 mt-1" size={20} />
              {"End-to-end moving and settling-in support — from start to finish."}
            </li>
          </ul>

          {/* Form Switch Buttons */}
          <div className="flex gap-6 pt-8">
            <Button
              onClick={() => {
                setActiveForm("homeSearch")
                setHomeSearchErrors({})
                setNotification(null) // Clear notification when switching forms
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-md font-semibold text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${activeForm === "homeSearch" ? "bg-primary-600 text-white shadow-lg" : "bg-gray-100 text-gray-800 hover:bg-primary-200"}`}
              aria-pressed={activeForm === "homeSearch"}
            >
              <HomeIcon size={20} />
              {"Book a Home"}
            </Button>
            <Button
              onClick={() => {
                setActiveForm("relocation")
                setRelocationErrors({})
                setNotification(null) // Clear notification when switching forms
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-md font-semibold text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${activeForm === "relocation" ? "bg-primary-600 text-white shadow-lg" : "bg-gray-100 text-gray-800 hover:bg-primary-200"}`}
              aria-pressed={activeForm === "relocation"}
            >
              <MoveRightIcon size={20} />
              {"Relocation Support"}
            </Button>
          </div>
        </section>

        {/* Form Section */}
        <section className="lg:w-1/2 relative">
          {activeForm === "homeSearch" ? (
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-primary-600 flex items-center gap-3">
                  <SearchIcon size={24} /> {"Book a Home Form"}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Tell us your preferences and booking details. We will find, negotiate, and arrange everything so your
                  home is ready for your arrival.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={submitHomeSearch} className="space-y-6" aria-label="Home booking form" noValidate>
                  <div>
                    <Label htmlFor="location">
                      Preferred Location <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="e.g Nairobi, Mombasa"
                      value={homeSearch.location}
                      onChange={handleHomeSearchChange}
                      required
                      aria-required="true"
                      aria-invalid={!!homeSearchErrors.location}
                      aria-describedby="location-error"
                    />
                    {homeSearchErrors.location && (
                      <p id="location-error" className="text-red-500 text-sm mt-1">
                        {homeSearchErrors.location}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={homeSearch.email}
                      onChange={handleHomeSearchChange}
                      required
                      aria-required="true"
                      aria-invalid={!!homeSearchErrors.email}
                      aria-describedby="email-error"
                    />
                    {homeSearchErrors.email && (
                      <p id="email-error" className="text-red-500 text-sm mt-1">
                        {homeSearchErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+2547XXXXXXXX"
                      value={homeSearch.phone}
                      onChange={handleHomeSearchChange}
                      required
                      aria-required="true"
                      aria-invalid={!!homeSearchErrors.phone}
                      aria-describedby="phone-error"
                    />
                    {homeSearchErrors.phone && (
                      <p id="phone-error" className="text-red-500 text-sm mt-1">
                        {homeSearchErrors.phone}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="minPrice">Min Price (KES)</Label>
                      <Input
                        id="minPrice"
                        name="minPrice"
                        type="number"
                        min="0"
                        placeholder="Minimum budget"
                        value={homeSearch.minPrice}
                        onChange={handleHomeSearchChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxPrice">Max Price (KES)</Label>
                      <Input
                        id="maxPrice"
                        name="maxPrice"
                        type="number"
                        min="0"
                        placeholder="Maximum budget"
                        value={homeSearch.maxPrice}
                        onChange={handleHomeSearchChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="propertyType">Property Type</Label>
                      <Select
                        value={homeSearch.propertyType}
                        onValueChange={(value) => handleHomeSearchChange(value, "propertyType")}
                      >
                        <SelectTrigger id="propertyType" name="propertyType">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="studio">Studio</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Select
                        value={homeSearch.bedrooms}
                        onValueChange={(value) => handleHomeSearchChange(value, "bedrooms")}
                      >
                        <SelectTrigger id="bedrooms" name="bedrooms">
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="studio">Studio</SelectItem>
                          <SelectItem value="1">1 Bedroom</SelectItem>
                          <SelectItem value="2">2 Bedrooms</SelectItem>
                          <SelectItem value="3">3 Bedrooms</SelectItem>
                          <SelectItem value="4+">4+ Bedrooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="stayDurationType">Stay Duration Type</Label>
                      <Select
                        value={homeSearch.stayDurationType}
                        onValueChange={(value) => handleHomeSearchChange(value, "stayDurationType")}
                      >
                        <SelectTrigger id="stayDurationType" name="stayDurationType">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="day">Day(s)</SelectItem>
                          <SelectItem value="week">Week(s)</SelectItem>
                          <SelectItem value="month">Month(s)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="stayDurationValue">Stay Duration Value</Label>
                      <Input
                        id="stayDurationValue"
                        name="stayDurationValue"
                        type="number"
                        min="1"
                        placeholder="Number"
                        value={homeSearch.stayDurationValue}
                        onChange={handleHomeSearchChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="preferredMoveInDate">
                        Preferred Move-in Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="preferredMoveInDate"
                        name="preferredMoveInDate"
                        type="date"
                        value={homeSearch.preferredMoveInDate}
                        onChange={handleHomeSearchChange}
                        required
                        aria-required="true"
                        aria-invalid={!!homeSearchErrors.preferredMoveInDate}
                        aria-describedby="move-in-date-error"
                      />
                      {homeSearchErrors.preferredMoveInDate && (
                        <p id="move-in-date-error" className="text-red-500 text-sm mt-1">
                          {homeSearchErrors.preferredMoveInDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      rows={4}
                      placeholder="Any other preferences or requests"
                      value={homeSearch.additionalNotes}
                      onChange={handleHomeSearchChange}
                    />
                  </div>

                  {/* Notification box for Home Search form */}
                  {activeForm === "homeSearch" && notification && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className={`p-4 rounded-md text-white ${notification.type === "success" ? "bg-green-600" : "bg-red-600"} shadow-md`}
                    >
                      {notification.message.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isSubmittingHomeSearch}>
                    {isSubmittingHomeSearch ? "Submitting..." : "Submit Booking Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-primary-600 flex items-center gap-3">
                  <MoveRightIcon size={24} /> {"Relocation Support Form"}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Provide your details for relocation support. We will assist you with your move from start to finish.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={submitRelocation} className="space-y-6" aria-label="Relocation support form" noValidate>
                  <div>
                    <Label htmlFor="name">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={relocation.name}
                      onChange={handleRelocationChange}
                      required
                      aria-required="true"
                      aria-invalid={!!relocationErrors.name}
                      aria-describedby="name-error"
                    />
                    {relocationErrors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-1">
                        {relocationErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="emailRelocation">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="emailRelocation"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={relocation.email}
                      onChange={handleRelocationChange}
                      required
                      aria-required="true"
                      aria-invalid={!!relocationErrors.email}
                      aria-describedby="email-relocation-error"
                    />
                    {relocationErrors.email && (
                      <p id="email-relocation-error" className="text-red-500 text-sm mt-1">
                        {relocationErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phoneRelocation">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phoneRelocation"
                      name="phone"
                      type="tel"
                      placeholder="+2547XXXXXXXX"
                      value={relocation.phone}
                      onChange={handleRelocationChange}
                      required
                      aria-required="true"
                      aria-invalid={!!relocationErrors.phone}
                      aria-describedby="phone-relocation-error"
                    />
                    {relocationErrors.phone && (
                      <p id="phone-relocation-error" className="text-red-500 text-sm mt-1">
                        {relocationErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="currentLocation">
                      Current Location <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="currentLocation"
                      name="currentLocation"
                      type="text"
                      placeholder="Your current city or town"
                      value={relocation.currentLocation}
                      onChange={handleRelocationChange}
                      required
                      aria-required="true"
                      aria-invalid={!!relocationErrors.currentLocation}
                      aria-describedby="current-location-error"
                    />
                    {relocationErrors.currentLocation && (
                      <p id="current-location-error" className="text-red-500 text-sm mt-1">
                        {relocationErrors.currentLocation}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="destination">
                      Destination Location <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="destination"
                      name="destination"
                      type="text"
                      placeholder="Where do you want to relocate?"
                      value={relocation.destination}
                      onChange={handleRelocationChange}
                      required
                      aria-required="true"
                      aria-invalid={!!relocationErrors.destination}
                      aria-describedby="destination-error"
                    />
                    {relocationErrors.destination && (
                      <p id="destination-error" className="text-red-500 text-sm mt-1">
                        {relocationErrors.destination}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="movingDate">
                      Moving Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="movingDate"
                      name="movingDate"
                      type="date"
                      value={relocation.movingDate}
                      onChange={handleRelocationChange}
                      required
                      aria-required="true"
                      aria-invalid={!!relocationErrors.movingDate}
                      aria-describedby="moving-date-error"
                    />
                    {relocationErrors.movingDate && (
                      <p id="moving-date-error" className="text-red-500 text-sm mt-1">
                        {relocationErrors.movingDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="movingType">Moving Type</Label>
                    <Select
                      value={relocation.movingType}
                      onValueChange={(value) => handleRelocationChange(value, "movingType")}
                    >
                      <SelectTrigger id="movingType" name="movingType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="additionalNotesRelocation">Additional Notes</Label>
                    <Textarea
                      id="additionalNotesRelocation"
                      name="additionalNotes"
                      rows={4}
                      placeholder="Any other relocation details or requests"
                      value={relocation.additionalNotes}
                      onChange={handleRelocationChange}
                    />
                  </div>

                  {/* Notification box for Relocation form */}
                  {activeForm === "relocation" && notification && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className={`p-4 rounded-md text-white ${notification.type === "success" ? "bg-green-600" : "bg-red-600"} shadow-md`}
                    >
                      {notification.message.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isSubmittingRelocation}>
                    {isSubmittingRelocation ? "Submitting..." : "Submit Relocation Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </main>
  )
}

export default RelocationHomeSearch
