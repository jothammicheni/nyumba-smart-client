/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

console.log(">>> Loaded: registers the component file (top-level)")

import type React from "react"
import { useState, useEffect } from "react"
import { Eye, EyeOff, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { useAuth } from "../../context/AuthContext.js"
import { useNavigate } from "react-router-dom"

type UserRole = "landlord" | "tenant" | "agent" | "service-provider"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  role: UserRole
  city: string
  serviceType?: string
  referredBy?: string
  agreeTerms: boolean
}

interface ValidationErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  password?: string
  confirmPassword?: string
  city?: string
  serviceType?: string
  referredBy?: string
  agreeTerms?: string
  general?: string
}

const Register = () => {
  const { register, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isReferralFromStorage, setIsReferralFromStorage] = useState(false)
  const [showComingSoonNotification, setShowComingSoonNotification] = useState(false)
  const [comingSoonRole, setComingSoonRole] = useState<string>("")

  const [formData, setFormData] = useState<FormData>({
    referredBy: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "landlord", // Changed default to landlord
    city: "",
    serviceType: "",
    agreeTerms: false,
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  useEffect(() => {
    console.log("Register component mounted")
  }, [])

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin-panel")
      } else {
        navigate(`/${user.role}/dashboard`)
      }
    }
  }, [isAuthenticated, user, navigate])

  //check for the refferal code
  // Check for referral code when role becomes landlord
  useEffect(() => {
    try {
      if (formData.role === "landlord") {
        const code = localStorage.getItem("referralCode")
        console.log("Referral code found from localstorage:", code)
        if (code) {
          setFormData((prev) => ({
            ...prev,
            referredBy: code,
          }))
          setIsReferralFromStorage(true)
          localStorage.removeItem("referralCode")
        }
      }
    } catch (err) {
      console.error("Failed to read from localStorage:", err)
    }
  }, [formData.role])

  // Auto-hide coming soon notification after 3 seconds
  useEffect(() => {
    if (showComingSoonNotification) {
      const timer = setTimeout(() => {
        setShowComingSoonNotification(false)
        setComingSoonRole("")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showComingSoonNotification])

  //handle role sellection
  const handleRoleSelection = (newRole: UserRole) => {
    // Check if role is disabled
    if (newRole === "tenant" || newRole === "service-provider") {
      setComingSoonRole(newRole === "tenant" ? "Tenant" : "Service Provider")
      setShowComingSoonNotification(true)
      return
    }

    if (newRole === "landlord") {
      const referral = localStorage.getItem("referralCode")
      if (referral) {
        setFormData((prev) => ({
          ...prev,
          role: newRole,
          referredBy: referral,
        }))
        setIsReferralFromStorage(true)
        localStorage.removeItem("referralCode")
        console.log("Referral code set from localStorage:", referral)
      } else {
        setFormData((prev) => ({
          ...prev,
          role: newRole,
          referredBy: "",
        }))
        setIsReferralFromStorage(false)
        console.log("No referral code found in localStorage.")
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        role: newRole,
        referredBy: "",
      }))
      setIsReferralFromStorage(false)
    }
  }

  // Password strength indicators
  const hasMinLength = formData.password.length >= 8
  const hasUpperCase = /[A-Z]/.test(formData.password)
  const hasLowerCase = /[a-z]/.test(formData.password)
  const hasNumber = /[0-9]/.test(formData.password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)

  const passwordStrength = [hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return ""
    if (passwordStrength <= 2) return "Weak"
    if (passwordStrength <= 4) return "Medium"
    return "Strong"
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200"
    if (passwordStrength <= 2) return "bg-red-500"
    if (passwordStrength <= 4) return "bg-yellow-500"
    return "bg-green-500"
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when field is edited
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    // Validate phone
    // Validate phone
    const rawPhone = formData.phone.replace(/\s+/g, "").trim()
    if (!rawPhone) {
      newErrors.phone = "Phone number is required"
    } else if (!/^(\+?254|0)(7|1)\d{8}$/.test(rawPhone)) {
      newErrors.phone = "Phone must start with 07, 01, or 254 and be 10–12 digits"
    }

    // Validate city
    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (passwordStrength < 3) {
      newErrors.password = "Password is too weak"
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Validate service type for service providers
    if (formData.role === "service-provider" && !formData.serviceType) {
      newErrors.serviceType = "Service type is required"
    }

    // Validate terms agreement
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)
      setErrors({})
      console.log(4556)

      try {
        const userData = {
          referredBy: formData.referredBy,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          phone: formData.phone,
          city: formData.city,
          service_category: formData.serviceType,
        }

        console.log("Registration response:", userData)
        const response = await register(userData)

        if (response.success) {
          setRegistrationSuccess(true)
        } else {
          setErrors({
            general: response.message || "Registration failed. Please try again.",
          })
        }
      } catch (error: any) {
        setErrors({
          general: error.message || "An unexpected error occurred. Please try again.",
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  if (registrationSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Registration Successful!</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Your account has been created. You will be redirected to your dashboard...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-100 via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Create Your TenaHub Account</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Join our platform and start managing your properties efficiently
              </p>
            </div>

            {/* Coming Soon Notification */}
            {showComingSoonNotification && (
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      <strong>{comingSoonRole}</strong> registration is coming soon! Stay tuned for updates.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Role Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Register As:
                  </label>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                      { value: "landlord", label: "Landlord", enabled: true },
                      { value: "tenant", label: "Tenant", enabled: false },
                      { value: "agent", label: "Agent", enabled: true },
                      { value: "service-provider", label: "Service Provider", enabled: false },
                    ].map((role) => (
                      <div
                        key={role.value}
                        className={`
                          border rounded-lg p-3 text-center cursor-pointer transition-all
                          ${
                            !role.enabled
                              ? "border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-60"
                              : formData.role === role.value
                                ? "border-primary-600/20 flex items-center justify-center bg-primary-50 dark:bg-primary-600/20 text-primary-600 dark:text-white"
                                : "border-gray-200 dark:border-gray-800 hover:border-primary-200 flex items-center justify-center dark:bg-gray-950/50 dark:hover:border-primary-600/30"
                          }
                        `}
                        onClick={() => handleRoleSelection(role.value as UserRole)}
                      >
                        {role.label}
                        {!role.enabled && <div className="text-xs mt-1 text-gray-400">Coming Soon</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Service Provider Type (conditional) */}
              {formData.role === "service-provider" && (
                <div>
                  <label
                    htmlFor="serviceType"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Service Type
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className={`
                      block w-full px-3 py-2.5 border rounded-md shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-600 dark:focus:border-primary-600 sm:text-sm
                      ${errors.serviceType ? "border-red-500" : "border-gray-300 dark:border-gray-800"}
                      bg-white dark:bg-gray-950/40 text-gray-900 dark:text-gray-100
                    `}
                  >
                    <option value="">Select service type</option>
                    <option value="wifi" className="p-1">
                      WiFi Provider
                    </option>
                    <option value="plumbing">Plumbing Services</option>
                    <option value="electrical">Electrical Services</option>
                    <option value="cleaning">Cleaning Services</option>
                    <option value="security">Security Services</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.serviceType && <p className="mt-1 text-sm text-red-500">{errors.serviceType}</p>}
                </div>
              )}

              {/* Referral Code for Landlords */}
              {formData.role === "landlord" && (
                <div>
                  <label
                    htmlFor="referredBy"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Agent Referral Code {isReferralFromStorage && "(Auto-detected)"}
                  </label>
                  <input
                    id="referredBy"
                    name="referredBy"
                    type="text"
                    value={formData.referredBy}
                    onChange={handleChange}
                    readOnly={isReferralFromStorage}
                    placeholder="Enter agent referral code"
                    className={`
                      block w-full px-3 py-2.5 border rounded-md shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-600 dark:focus:border-primary-600 sm:text-sm
                      ${errors.referredBy ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
                      ${
                        isReferralFromStorage
                          ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                          : "bg-white dark:bg-gray-950/40 dark:border-gray-800"
                      }
                      text-gray-900 dark:text-gray-100
                    `}
                  />
                  {errors.referredBy && <p className="mt-1 text-sm text-red-500">{errors.referredBy}</p>}
                </div>
              )}

              {/* Personal Information */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`
                      block w-full px-3 py-2.5 border rounded-md shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-600 dark:focus:border-primary-600 sm:text-sm
                      ${errors.firstName ? "border-red-500" : "border-gray-300 dark:border-gray-800"}
                      bg-white dark:bg-gray-950/40 text-gray-900 dark:text-gray-100
                    `}
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`
                      block w-full px-3 py-2.5 border rounded-md shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-600 dark:focus:border-primary-600 sm:text-sm
                      ${errors.lastName ? "border-red-500" : "border-gray-300 dark:border-gray-800"}
                      bg-white dark:bg-gray-950/40 text-gray-900 dark:text-gray-100
                    `}
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`
                      block w-full px-3 py-2.5 border rounded-md shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-600 dark:focus:border-primary-600 sm:text-sm
                      ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-800"}
                      bg-white dark:dark:bg-gray-950/40 text-gray-900 dark:text-gray-100
                    `}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`
                      block w-full px-3 py-2.5 border rounded-md shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-600 dark:focus:border-primary-600 sm:text-sm
                      ${errors.phone ? "border-red-500" : "border-gray-300 dark:border-gray-800"}
                      bg-white dark:bg-gray-950/40 text-gray-900 dark:text-gray-100
                    `}
                    placeholder="+254 7XX XXX XXX"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  className={`
                    block w-full px-3 py-2.5 border rounded-md shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-600 dark:focus:border-primary-600 sm:text-sm
                    ${errors.city ? "border-red-500" : "border-gray-300 dark:border-gray-800"}
                    bg-white dark:bg-gray-950/40 text-gray-900 dark:text-gray-100
                  `}
                />
                {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={`
                      block w-full px-3 py-2.5 border rounded-md shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-600 dark:focus:border-primary-600 sm:text-sm
                      ${errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-800"}
                      bg-white dark:bg-gray-950/40 text-gray-900 dark:text-gray-100
                    `}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}

                {/* Password strength meter */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Password strength:</span>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength <= 2
                            ? "text-red-500"
                            : passwordStrength <= 4
                              ? "text-yellow-500"
                              : "text-green-500"
                        }`}
                      >
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
                      <div className="flex items-center">
                        {hasMinLength ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <XCircle className="h-4 w-4 text-gray-400 mr-1" />
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">At least 8 characters</span>
                      </div>
                      <div className="flex items-center">
                        {hasUpperCase ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <XCircle className="h-4 w-4 text-gray-400 mr-1" />
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">Uppercase letter</span>
                      </div>
                      <div className="flex items-center">
                        {hasLowerCase ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <XCircle className="h-4 w-4 text-gray-400 mr-1" />
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">Lowercase letter</span>
                      </div>
                      <div className="flex items-center">
                        {hasNumber ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <XCircle className="h-4 w-4 text-gray-400 mr-1" />
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">Number</span>
                      </div>
                      <div className="flex items-center">
                        {hasSpecialChar ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <XCircle className="h-4 w-4 text-gray-400 mr-1" />
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">Special character</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`
                      block w-full px-3 py-2.5 border rounded-md shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-600 dark:focus:border-primary-600 sm:text-sm
                      ${errors.confirmPassword ? "border-red-500" : "border-gray-300 dark:border-gray-800"}
                      bg-white dark:bg-gray-950/40 text-gray-900 dark:text-gray-100
                    `}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeTerms" className="font-medium text-gray-700 dark:text-gray-300">
                    I agree to the{" "}
                    <a href="#" className="text-primary-600 hover:text-primary-500">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary-600 hover:text-primary-500">
                      Privacy Policy
                    </a>
                  </label>
                  {errors.agreeTerms && <p className="mt-1 text-sm text-red-500">{errors.agreeTerms}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                    ${isSubmitting ? "bg-primary-400 cursor-not-allowed" : "bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"}
                    transition-colors duration-200
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" /> Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <a href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
