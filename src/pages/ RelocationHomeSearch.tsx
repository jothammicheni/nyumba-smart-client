import type React from "react"
import { useState, type FormEvent } from "react"
import {
  HomeIcon,
  MoveRightIcon,
  MapPinIcon,
  SearchIcon,
  Building2Icon,
  UsersIcon,
  CalendarIcon,
  PhoneIcon,
  MailIcon,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Toaster, toast } from "sonner"
import RelocateSEO from "../SEO/RelocateSEO"

// Helper validation functions
const validateEmail = (email: string): string => {
  if (!email) return "Email is required."
  if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email address."
  return ""
}

const validateKenyanPhoneNumber = (phone: string): string => {
  if (!phone) return "Phone number is required."
  if (!/^(\+?254|0)7\d{8}$/.test(phone))
    return "Phone must be a valid Kenyan number (e.g., +2547XXXXXXXX or 07XXXXXXXX)."
  return ""
}

const RelocationHomeSearch: React.FC = () => {
  const [activeForm, setActiveForm] = useState<"homeSearch" | "relocation">("homeSearch")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false)

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
  const [isSubmittingHomeSearch, setIsSubmittingHomeSearch] = useState(false)
  const [isSubmittingRelocation, setIsSubmittingRelocation] = useState(false)

  const handleHomeSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    name?: string,
  ) => {
    let fieldName: string
    let value: string

    if (typeof e === "string" && name) {
      fieldName = name
      value = e
    } else if (typeof e === "object" && "target" in e) {
      fieldName = e.target.name
      value = e.target.value
    } else {
      return
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
      fieldName = name
      value = e
    } else if (typeof e === "object" && "target" in e) {
      fieldName = e.target.name
      value = e.target.value
    } else {
      return
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

  const submitHomeSearch = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateHomeSearchForm()) {
      toast.error("Please correct the errors in the form.")
      return
    }

    setIsSubmittingHomeSearch(true)
    try {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) throw new Error("Submission failed")

      toast.success("Request submitted successfully! We'll contact you within 24 hours.")
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
      setHomeSearchErrors({})
    } catch (err) {
      console.error(err)
      toast.error("Unable to submit request. Please try again later.")
    } finally {
      setIsSubmittingHomeSearch(false)
    }
  }

  const submitRelocation = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateRelocationForm()) {
      toast.error("Please correct the errors in the form.")
      return
    }

    setIsSubmittingRelocation(true)
    try {
      const dataToSend = {
        type: "relocation",
        data: relocation,
      }

      const response = await fetch("https://nyumba-smart-server.onrender.com/api/home-search-relocation-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) throw new Error("Submission failed")

      toast.success("Request submitted successfully! We'll contact you within 24 hours.")
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
      setRelocationErrors({})
    } catch (err) {
      console.error(err)
      toast.error("Unable to submit request. Please try again later.")
    } finally {
      setIsSubmittingRelocation(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-4">
          <div className="h-8 bg-muted/10 rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-muted/10 rounded animate-pulse" />
            ))}
          </div>
          <div className="h-64 bg-muted/10 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-20 py-8 sm:py-12 lg:py-20 space-y-6 sm:space-y-8 animate-fade-in bg-gradient-to-br from-slate-100 via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60">
      <RelocateSEO/>
      <Toaster position="top-right" richColors />

      {/* Animated Background Shapes */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-16 h-16 sm:w-24 sm:h-24 bg-primary/20 rounded-full opacity-30 animate-float1"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 sm:w-32 sm:h-32 bg-primary/30 rounded-full opacity-25 animate-float2"></div>
        <div className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-20 sm:h-20 bg-primary/15 rounded-full opacity-20 animate-float3"></div>
      </div>

      {/* Header */}
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600/20 rounded-full flex items-center justify-center">
            <MoveRightIcon className="text-primary-600" size={20} />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Relocate & Find Home in Kenya
          </h1>
        </div>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
          Professional relocation and home search services across Kenya
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Info Section */}
        <div className="space-y-4 sm:space-y-6">
          <Card className="hover:scale-[1.02] duration-300 ease-in-out bg-white shadow-md dark:bg-gray-900/70 border dark:border-gray-800">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600/20 dark:bg-primary-600/20 rounded-full flex items-center justify-center">
                  <Building2Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-600" />
                </div>
                About TenaHub Solutions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <p className="text-sm sm:text-base text-muted-foreground">
                We take the hassle out of relocating and finding a home in Kenya. Whether you need
                a place to stay for a night, a week, or on a monthly basis, we find and prepare
                the perfect home so you just arrive and sleep.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
                Our comprehensive service handles everything—from property search, negotiation,
                and booking, to logistics and settling-in support.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:scale-[1.02] duration-300 ease-in-out bg-white shadow-md dark:bg-gray-900/70 border dark:border-gray-800">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600/20 dark:bg-primary-600/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-600" />
                </div>
                Our Services
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { icon: UsersIcon, text: "Serving all major Kenyan cities" },
                  { icon: Building2Icon, text: "Verified properties ready for move-in" },
                  { icon: MapPinIcon, text: "Personalized recommendations" },
                  { icon: MoveRightIcon, text: "End-to-end moving support" }
                ].map((service, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 sm:p-3 border rounded-lg text-sm sm:text-base">
                    <service.icon className="text-primary mt-1 flex-shrink-0" size={14} />
                    <span className="text-muted-foreground">{service.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Form Switch Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              onClick={() => {
                setActiveForm("homeSearch")
                setHomeSearchErrors({})
              }}
              className={`h-auto py-3 ${activeForm === "homeSearch" ? "" : "variant-outline"}`}
              variant={activeForm === "homeSearch" ? "default" : "outline"}
            >
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <HomeIcon size={18} />
                <span className="font-semibold text-sm sm:text-base">Book a Home</span>
                <span className="text-xs opacity-80">Find your perfect stay</span>
              </div>
            </Button>
            <Button
              onClick={() => {
                setActiveForm("relocation")
                setRelocationErrors({})
              }}
              className={`h-auto py-3 ${activeForm === "relocation" ? "" : "variant-outline"}`}
              variant={activeForm === "relocation" ? "default" : "outline"}
            >
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <MoveRightIcon size={18} />
                <span className="font-semibold text-sm sm:text-base">Relocation Support</span>
                <span className="text-xs opacity-80">Complete moving assistance</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Form Section */}
        <div className="space-y-4 sm:space-y-6">
          {activeForm === "homeSearch" ? (
            <Card className="bg-white shadow-md dark:bg-gray-900/70 border dark:border-gray-800">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary-600/20 rounded-full flex items-center justify-center">
                    <SearchIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
                  </div>
                  Book Your Home Here
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Tell us your preferences and we'll arrange everything for your arrival.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <form onSubmit={submitHomeSearch} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="location" className="flex items-center gap-2 text-sm sm:text-base">
                        <MapPinIcon size={14} />
                        Preferred Location <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="e.g Nairobi, Mombasa"
                        value={homeSearch.location}
                        onChange={handleHomeSearchChange}
                        className={homeSearchErrors.location ? "border-destructive" : "dark:bg-gray-950/50 border dark:border-800"}
                      />
                      {homeSearchErrors.location && (
                        <p className="text-destructive text-xs sm:text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {homeSearchErrors.location}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2 text-sm sm:text-base">
                        <MailIcon size={14} />
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={homeSearch.email}
                        onChange={handleHomeSearchChange}
                        className={homeSearchErrors.email ? "border-destructive" : "dark:bg-gray-950/50 border dark:border-800"}
                      />
                      {homeSearchErrors.email && (
                        <p className="text-destructive text-xs sm:text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {homeSearchErrors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2 text-sm sm:text-base">
                        <PhoneIcon size={14} />
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+2547XXXXXXXX"
                        value={homeSearch.phone}
                        onChange={handleHomeSearchChange}
                        className={homeSearchErrors.phone ? "border-destructive" : "dark:bg-gray-950/50 border dark:border-800"}
                      />
                      {homeSearchErrors.phone && (
                        <p className="text-destructive text-xs sm:text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {homeSearchErrors.phone}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="minPrice" className="text-sm sm:text-base">Min Price (KES)</Label>
                      <Input
                        id="minPrice"
                        name="minPrice"
                        type="number"
                        min="0"
                        placeholder="5,000"
                        value={homeSearch.minPrice}
                        className="dark:bg-gray-950/50 border dark:border-800"
                        onChange={handleHomeSearchChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxPrice" className="text-sm sm:text-base">Max Price (KES)</Label>
                      <Input
                        id="maxPrice"
                        name="maxPrice"
                        type="number"
                        min="0"
                        placeholder="50,000"
                        value={homeSearch.maxPrice}
                        className="dark:bg-gray-950/50 border dark:border-800"
                        onChange={handleHomeSearchChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="propertyType" className="text-sm sm:text-base">Property Type</Label>
                      <Select
                        value={homeSearch.propertyType}
                        onValueChange={(value) => handleHomeSearchChange(value, "propertyType")}
                      >
                        <SelectTrigger className="dark:bg-gray-950/50 border dark:border-800 text-sm sm:text-base">
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

                    <div className="space-y-2">
                      <Label htmlFor="bedrooms" className="text-sm sm:text-base">Bedrooms</Label>
                      <Select
                        value={homeSearch.bedrooms}
                        onValueChange={(value) => handleHomeSearchChange(value, "bedrooms")}
                      >
                        <SelectTrigger className="dark:bg-gray-950/50 border dark:border-800 text-sm sm:text-base">
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

                    <div className="space-y-2">
                      <Label htmlFor="stayDurationType" className="text-sm sm:text-base">Duration Type</Label>
                      <Select
                        value={homeSearch.stayDurationType}
                        onValueChange={(value) => handleHomeSearchChange(value, "stayDurationType")}
                      >
                        <SelectTrigger className="dark:bg-gray-950/50 border dark:border-800 text-sm sm:text-base">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="day">Day(s)</SelectItem>
                          <SelectItem value="week">Week(s)</SelectItem>
                          <SelectItem value="month">Month(s)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stayDurationValue" className="text-sm sm:text-base">Duration Value</Label>
                      <Input
                        id="stayDurationValue"
                        name="stayDurationValue"
                        type="number"
                        min="1"
                        placeholder="1"
                        value={homeSearch.stayDurationValue}
                        className="dark:bg-gray-950/50 border dark:border-800"
                        onChange={handleHomeSearchChange}
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="preferredMoveInDate" className="flex items-center gap-2 text-sm sm:text-base">
                        <CalendarIcon size={14} />
                        Preferred Move-in Date <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="preferredMoveInDate"
                        name="preferredMoveInDate"
                        type="date"
                        value={homeSearch.preferredMoveInDate}
                        onChange={handleHomeSearchChange}
                        className={homeSearchErrors.preferredMoveInDate ? "border-destructive" : "dark:bg-gray-950/50 border dark:border-800"}
                      />
                      {homeSearchErrors.preferredMoveInDate && (
                        <p className="text-destructive text-xs sm:text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {homeSearchErrors.preferredMoveInDate}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="additionalNotes" className="text-sm sm:text-base">Additional Notes</Label>
                      <Textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        rows={3}
                        placeholder="Any specific preferences or requirements..."
                        value={homeSearch.additionalNotes}
                        className="dark:bg-gray-950/50 border dark:border-800"
                        onChange={handleHomeSearchChange}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 sm:h-12"
                    disabled={isSubmittingHomeSearch}
                  >
                    {isSubmittingHomeSearch ? (
                      <div className="flex items-center gap-2 text-sm sm:text-base">
                        <RefreshCw className="animate-spin" size={16} />
                        Submitting Request...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm sm:text-base">
                        <SearchIcon size={16} />
                        Submit Home Search Request
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white shadow-md dark:bg-gray-900 border dark:border-gray-800">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary-600/20 rounded-full flex items-center justify-center">
                    <MoveRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
                  </div>
                  Contact For Relocation Support
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Get complete assistance with your move from start to finish.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <form onSubmit={submitRelocation} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="name" className="text-sm sm:text-base">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        value={relocation.name}
                        onChange={handleRelocationChange}
                        className={relocationErrors.name ? "border-destructive" : "dark:bg-gray-950/50 border dark:border-800"}
                      />
                      {relocationErrors.name && (
                        <p className="text-destructive text-xs sm:text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {relocationErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emailRelocation" className="flex items-center gap-2 text-sm sm:text-base">
                        <MailIcon size={14} />
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="emailRelocation"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={relocation.email}
                        onChange={handleRelocationChange}
                        className={relocationErrors.email ? "border-destructive" : "dark:bg-gray-950/50 border dark:border-800"}
                      />
                      {relocationErrors.email && (
                        <p className="text-destructive text-xs sm:text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {relocationErrors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneRelocation" className="flex items-center gap-2 text-sm sm:text-base">
                        <PhoneIcon size={14} />
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phoneRelocation"
                        name="phone"
                        type="tel"
                        placeholder="+2547XXXXXXXX"
                        value={relocation.phone}
                        onChange={handleRelocationChange}
                        className={relocationErrors.phone ? "border-destructive" : "dark:bg-gray-950/50 border dark:border-800"}
                      />
                      {relocationErrors.phone && (
                        <p className="text-destructive text-xs sm:text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {relocationErrors.phone}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentLocation" className="flex items-center gap-2 text-sm sm:text-base">
                        <MapPinIcon size={14} />
                        Current Location <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="currentLocation"
                        name="currentLocation"
                        placeholder="Your current city"
                        value={relocation.currentLocation}
                        onChange={handleRelocationChange}
                        className={relocationErrors.currentLocation ? "border-destructive" : "dark:bg-gray-950/50 border dark:border-800"}
                      />
                      {relocationErrors.currentLocation && (
                        <p className="text-destructive text-xs sm:text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {relocationErrors.currentLocation}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="destination" className="flex items-center gap-2 text-sm sm:text-base">
                        <MapPinIcon size={14} />
                        Destination <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="destination"
                        name="destination"
                        placeholder="Where are you moving?"
                        value={relocation.destination}
                        onChange={handleRelocationChange}
                        className={relocationErrors.destination ? "border-destructive" : "dark:bg-gray-950/50 border dark:border-800"}
                      />
                      {relocationErrors.destination && (
                        <p className="text-destructive text-xs sm:text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {relocationErrors.destination}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="movingDate" className="flex items-center gap-2 text-sm sm:text-base">
                        <CalendarIcon size={14} />
                        Moving Date <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="movingDate"
                        name="movingDate"
                        type="date"
                        value={relocation.movingDate}
                        onChange={handleRelocationChange}
                        className={relocationErrors.movingDate ? "border-destructive" : "dark:bg-gray-950/50 border dark:border-800"}
                      />
                      {relocationErrors.movingDate && (
                        <p className="text-destructive text-xs sm:text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {relocationErrors.movingDate}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="movingType" className="flex items-center gap-2 text-sm sm:text-base">Moving Type</Label>
                      <Select
                        value={relocation.movingType}
                        onValueChange={(value) => handleRelocationChange(value, "movingType")}
                      >
                        <SelectTrigger className="dark:bg-gray-950/50 border dark:border-800 text-sm sm:text-base">
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

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="additionalNotesRelocation" className="text-sm sm:text-base">Additional Notes</Label>
                      <Textarea
                        id="additionalNotesRelocation"
                        name="additionalNotes"
                        rows={3}
                        placeholder="Any specific relocation requirements..."
                        value={relocation.additionalNotes}
                        className="dark:bg-gray-950/50 border dark:border-800"
                        onChange={handleRelocationChange}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 sm:h-12"
                    disabled={isSubmittingRelocation}
                  >
                    {isSubmittingRelocation ? (
                      <div className="flex items-center gap-2 text-sm sm:text-base">
                        <RefreshCw className="animate-spin" size={16} />
                        Submitting Request...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm sm:text-base">
                        <MoveRightIcon size={16} />
                        Submit Relocation Request
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default RelocationHomeSearch
