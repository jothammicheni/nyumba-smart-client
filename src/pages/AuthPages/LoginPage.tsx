"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Eye, EyeOff, AlertCircle, Loader2, CircleChevronLeft } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { Loader } from "../../components/Loader"

interface FormData {
  email: string
  password: string
  rememberMe: boolean
}

interface ValidationErrors {
  email?: string
  password?: string
  general?: string
}

const Login: React.FC = () => {
  const { login, isAuthenticated, user, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get the intended destination from location state or default based on role
  const getRedirectPath = (userRole: string) => {
    // Check if there's a redirect path in location state
    const from = location.state?.from?.pathname
    if (from && from !== "/login") {
      return from
    }
    // Default redirect based on role
    switch (userRole) {
      case "tenant":
        return "/tenant/dashboard"
      case "landlord":
        return "/landlord/dashboard"
      case "caretaker":
        return "/landlord/dashboard" // 🎯 Explicit caretaker redirect
      case "agent":
        return "/agent/dashboard"
      case "service-provider":
        return "/service-provider/dashboard"
      case "admin":
        return "/admin/dashboard"
      default:
        return "/"
    }
  }

  // Redirect if already authenticated
  useEffect(() => {
    console.log("🔄 Login useEffect:", { isAuthenticated, user, isLoading })
    if (isAuthenticated && user && !isLoading) {
      const redirectPath = getRedirectPath(user.role)
      console.log("🎯 Redirecting user to:", redirectPath)
      navigate(redirectPath, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user, isLoading, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
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
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      setErrors({})
      try {
        console.log("🔐 Login: Attempting login for:", formData.email)
        const response = await login(formData.email, formData.password, formData.rememberMe)
        console.log("📝 Login: Response received:", {
          success: response.success,
          userRole: response.user?.role,
          message: response.message,
        })
        if (!response.success) {
          console.log("❌ Login: Login failed:", response.message)
          setErrors({
            general: response.message || "Invalid email or password",
          })
        } else {
          console.log("✅ Login: Login successful, waiting for redirect...")
        }
      } catch (error: unknown) {
        console.error("💥 Login: Login error:", error)
        setErrors({
          general: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  // Show loading while auth is being initialized
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950/40">

      {/* Left Column: Image with Overlay Text */}
      <div
        className="hidden lg:flex flex-1 relative items-center justify-center
          bg-[url('https://images.unsplash.com/photo-1744782351841-9cc6b86a5add?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFuZGxvcmR8ZW58MHx8MHx8fDA%3D')]
          bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-gray-900/70 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            Your Ultimate Property Management Solution
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-lg drop-shadow-md">
            Streamline your rentals, connect with tenants, and manage properties with ease. TenaHub simplifies every
            aspect of property management.
          </p>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full space-y-8">
            <a href="/" className="inline-block mb-1">
              <span className="flex items-center font-light gap-2 hover:text-primary-600">
                <CircleChevronLeft size={18}/>
                Home</span>
            </a>
          <div className="text-center">
            <h3 className="text-md font-light text-gray-900 dark:text-white tracking-tight mb-2">Welcome back to TenaHub Solutions</h3>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Sign in to your account</h2>
          </div>

          <div className="bg-white dark:bg-gray-950/50 shadow-lg rounded-lg p-8 sm:p-10 border-t-2 border-primary-600 dark:border-primary-600/30">
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-start animate-fade-in">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`
                    block w-full px-4 py-2.5 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm
                    ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-800"}
                    bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-200
                  `}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`
                      block w-full px-4 py-2.5 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm
                      ${errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-800"}
                      bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-200
                    `}
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="mt-1 text-sm text-red-500" role="alert">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white
                    ${isSubmitting
                      ? "bg-primary-400 cursor-not-allowed"
                      : "bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    }
                    transition-all duration-200 hover:shadow-md
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" /> Signing in...
                    </>
                  ) : (
                    "Sign in now"
                  )}
                </button>
              </div>
              <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-semibold text-primary-600 hover:text-primary-500 transition-colors duration-200"
                >
                  Create a new account
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
