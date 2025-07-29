"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react"
import { useState, useEffect } from "react"
import {
  Home,
  Star,
  DoorOpen,
  ClipboardList,
  Gem,
  Crown,
  Clock,
  RefreshCw,
  Check,
  X,
  Loader2,
  Phone,
} from "lucide-react"
import { createSubscription, getSubscription, validateSubscription } from "../../../services/subscriptionService.js"
import { toast, Toaster } from "sonner"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import {
  initiateMpesaPayment,
  checkMpesaPaymentStatus,
} from "../../../services/payment.service/subscriptions/subscription.payment.service.js"

interface Tier {
  name: string
  icon: React.ReactNode
  priceMonthly: number
  priceYearly: number
  properties: number | string
  rooms: number | string
  vacancyListings: number | string
  topOffers: number | string
  trial: boolean
  current: boolean
  description: string
  features: string[]
}

interface Subscription {
  _id: string
  landlord_id: string
  tier: string
  start_date: string
  end_date: string
  is_active: boolean
  amount: number
  duration: string
  free_trial: boolean
  free_trial_duration: number
  free_trial_end_date: string
  is_free_trial_active: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

const Subscriptions = () => {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [activeSub, setActiveSub] = useState<Subscription | null>(null)
  const [countdown, setCountdown] = useState<string>("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedDuration, setSelectedDuration] = useState<"monthly" | "yearly">("monthly")
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "initiating" | "confirming" | "completed">("idle")
  const [paymentResult, setPaymentResult] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showTrialModal, setShowTrialModal] = useState(false)
  const [hasLeftMwananchi, setHasLeftMwananchi] = useState(false)

  // Fetch active subscription from backend
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const res = await getSubscription()
        if (res.success) {
          setActiveSub(res.data)
          // Check if user has ever left Mwananchi (if they have a paid tier history)
          if (res.data.tier !== "Mwananchi") {
            setHasLeftMwananchi(true)
          }
        }
      } catch (err) {
        console.error("Failed to fetch subscription:", err)
      }
    }
    fetchSubscription()
  }, [])

  // Live countdown update
  useEffect(() => {
    if (!activeSub) return

    const getTargetTime = () => {
      const now = new Date()
      const end = new Date(
        activeSub?.is_free_trial_active
          ? (activeSub.free_trial_end_date ?? new Date())
          : (activeSub.end_date ?? new Date()),
      )
      return Math.max(0, end.getTime() - now.getTime())
    }

    const formatCountdown = (ms: number) => {
      const totalSec = Math.floor(ms / 1000)
      const days = Math.floor(totalSec / 86400)
      const hours = Math.floor((totalSec % 86400) / 3600)
      const minutes = Math.floor((totalSec % 3600) / 60)
      const seconds = totalSec % 60
      return `${days}d ${hours}h ${minutes}m ${seconds}s`
    }

    const updateCountdown = () => {
      const remaining = getTargetTime()
      const totalSec = Math.floor(remaining / 1000)
      const days = Math.floor(totalSec / 86400)
      setCountdown(formatCountdown(remaining))

      // Alert logic
      if (activeSub.is_free_trial_active && days <= 3) {
        setAlertMessage(`Free trial ends in ${days} day(s). Upgrade to continue using premium features.`)
        setShowAlert(true)
      } else if (!activeSub.is_active && !activeSub.is_free_trial_active && activeSub.tier !== "Mwananchi") {
        setAlertMessage(`Your subscription has expired. Renew to unlock all features.`)
        setShowAlert(true)
      } else {
        setAlertMessage("")
        setShowAlert(false)
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [activeSub])

  useEffect(() => {
    const check = async () => {
      try {
        await validateSubscription()
      } catch (err) {
        console.error("Validation failed:", err)
      }
    }
    check()
  }, [])

  const tiers: Tier[] = [
    {
      name: "Mwananchi",
      icon: <Home className="w-5 h-5" />,
      priceMonthly: 0,
      priceYearly: 0,
      properties: 1,
      rooms: 4,
      vacancyListings: 0,
      topOffers: 0,
      trial: false,
      current: activeSub?.tier === "Mwananchi",
      description: "Perfect for individual property owners",
      features: ["Basic property management", "Single property support", "Room management"],
    },
    {
      name: "Silver",
      icon: <Star className="w-5 h-5" />,
      priceMonthly: 2000,
      priceYearly: 6000,
      properties: 2,
      rooms: 30,
      vacancyListings: 2,
      topOffers: 1,
      trial: true,
      current: activeSub?.tier === "Silver",
      description: "Ideal for small property portfolios",
      features: ["Advanced analytics", "Tenant screening", "Automated rent collection"],
    },
    {
      name: "Gold",
      icon: <Gem className="w-5 h-5" />,
      priceMonthly: 3000,
      priceYearly: 9000,
      properties: 4,
      rooms: 70,
      vacancyListings: 4,
      topOffers: 2,
      trial: true,
      current: activeSub?.tier === "Gold",
      description: "Most popular for professional managers",
      features: ["Premium listing visibility", "Maintenance tracking", "Financial reporting"],
    },
    {
      name: "Diamond",
      icon: <Crown className="w-5 h-5" />,
      priceMonthly: 5000,
      priceYearly: 15000,
      properties: 4,
      rooms: 1000,
      vacancyListings: "Unlimited",
      topOffers: "Unlimited",
      trial: true,
      current: activeSub?.tier === "Diamond",
      description: "Enterprise-grade solution",
      features: ["Dedicated account manager", "Custom API access", "Priority support"],
    },
  ]

  // Helper function to determine button state and text
  const getButtonState = (tier: Tier) => {
    if (!activeSub) return { text: "Get Started", disabled: false, variant: "default" as const, action: "trial" }

    const isCurrent = tier.current
    const isFreeTier = tier.priceMonthly === 0
    const hasActiveTrial = activeSub.is_free_trial_active
    const hasActiveSubscription = activeSub.is_active
    const isExpired = !hasActiveTrial && !hasActiveSubscription

    if (isCurrent) {
      if (activeSub.tier === "Mwananchi") {
        return { text: "Current Plan", disabled: true, variant: "default" as const, action: "none" }
      }
      if (hasActiveTrial) {
        return { text: "Current Trial", disabled: true, variant: "default" as const, action: "none" }
      }
      if (hasActiveSubscription) {
        return { text: "Current Plan", disabled: true, variant: "default" as const, action: "none" }
      }
      if (isExpired) {
        return { text: "Trial Over. Pay Now", disabled: false, variant: "destructive" as const, action: "payment" }
      }
    }

    // For Mwananchi tier (free tier) - disable if user has left Mwananchi before
    if (isFreeTier) {
      if (activeSub.tier === "Mwananchi") {
        return { text: "Current Plan", disabled: true, variant: "default" as const, action: "none" }
      }
      if (hasLeftMwananchi) {
        return { text: "Downgrade Disabled", disabled: true, variant: "outline" as const, action: "none" }
      }
      return { text: "Downgrade to Free", disabled: false, variant: "outline" as const, action: "trial" }
    }

    // For non-current paid tiers
    if (activeSub.tier === "Mwananchi") {
      return { text: "Start Free Trial", disabled: false, variant: "default" as const, action: "trial" }
    }

    // If user has active trial or subscription, allow free switching
    if (hasActiveTrial || hasActiveSubscription) {
      return { text: "Switch to This Plan", disabled: false, variant: "default" as const, action: "trial" }
    }

    // If expired, require payment for reactivation
    if (isExpired) {
      return { text: "Activate This Plan", disabled: false, variant: "default" as const, action: "payment" }
    }

    // Default case
    return { text: "Activate This Plan", disabled: false, variant: "default" as const, action: "payment" }
  }

  const startTrial = async () => {
    if (!selectedTier) return

    try {
      setLoading(true)

      // Determine if this is a free switch or new trial
      const hasActiveTrial = activeSub?.is_free_trial_active
      const hasActiveSubscription = activeSub?.is_active
      const isFreeSwitching = hasActiveTrial || hasActiveSubscription

      const data = {
        tier: selectedTier.name,
        duration: selectedDuration,
        amount: selectedDuration === "yearly" ? selectedTier.priceYearly : selectedTier.priceMonthly,
        free_trial: selectedTier.priceMonthly > 0 && !isFreeSwitching, // Only start new trial if not switching
        free_trial_duration: selectedTier.priceMonthly > 0 && !isFreeSwitching ? 45 : 0,
        is_switching: isFreeSwitching, // Flag to indicate this is a plan switch
      }

      const res = await createSubscription(data)
      if (res.success) {
        setSelectedTier(null)
        setShowTrialModal(false)
        setActiveSub(res.data)
        setAcceptedTerms(false)
        setSelectedDuration("monthly")
        if (selectedTier.name !== "Mwananchi") {
          setHasLeftMwananchi(true)
        }

        const successMessage = isFreeSwitching
          ? `Successfully switched to ${selectedTier.name} plan`
          : selectedTier.priceMonthly === 0
            ? "Plan activated successfully"
            : "Free trial started successfully"

        toast.success(successMessage)
      }
    } catch (err) {
      toast.error("Failed to activate plan")
      console.error("Failed to activate plan:", err)
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async () => {
    if (!selectedTier || !phoneNumber) {
      toast.error("Please enter your M-Pesa phone number")
      return
    }

    // Validate phone number format
    const phoneRegex = /^254[0-9]{9}$/
    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Please enter a valid phone number (254XXXXXXXXX)")
      return
    }

    setPaymentStatus("initiating")
    setLoading(true)

    try {
      const amount = selectedDuration === "yearly" ? selectedTier.priceYearly : selectedTier.priceMonthly
      const initRes = await initiateMpesaPayment(phoneNumber, amount, "subscription")

      setPaymentStatus("confirming")
      let retries = 0
      let statusResponse = null

      while (retries < 6) {
        await new Promise((res) => setTimeout(res, 5000))
        statusResponse = await checkMpesaPaymentStatus(initRes.checkoutRequestId)

        if (statusResponse.status === "success" || statusResponse.status === "failed") break
        retries++
      }

      const paymentSuccess = statusResponse?.status === "success"
      setPaymentResult({
        success: paymentSuccess,
        message: paymentSuccess ? "Payment successful. Subscription activated." : "Payment failed or expired.",
      })

      if (paymentSuccess) {
        // Update subscription with payment
        const updateData = {
          tier: selectedTier.name,
          duration: selectedDuration,
          amount: amount,
        }
        await createSubscription(updateData)

        const res = await getSubscription()
        if (res.success) {
          setActiveSub(res.data)
          if (selectedTier.name !== "Mwananchi") {
            setHasLeftMwananchi(true)
          }
        }
      }
    } catch (error: any) {
      setPaymentResult({
        success: false,
        message: error.message || "Payment processing failed",
      })
    } finally {
      setLoading(false)
      setPaymentStatus("completed")
      setTimeout(() => {
        setPaymentResult(null)
        setSelectedTier(null)
        setShowPaymentModal(false)
        setPhoneNumber("")
        setSelectedDuration("monthly")
      }, 3000)
    }
  }

  const formatCurrency = (amount: number) => `Ksh ${amount.toLocaleString()}`

  const getCurrentPrice = () => {
    if (!selectedTier) return 0
    return selectedDuration === "yearly" ? selectedTier.priceYearly : selectedTier.priceMonthly
  }

  const getSavingsPercentage = (tier: Tier) => {
    if (tier.priceYearly === 0 || tier.priceMonthly === 0) return 0
    return Math.round((1 - tier.priceYearly / (tier.priceMonthly * 12)) * 100)
  }

  return (
    <div className="container mx-auto p-4 space-y-6 animate-fade-in">
      <Toaster richColors position="top-right" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            <b className="text-primary-600">Tenahub</b> Subscription Plans
          </h1>
          <p className="text-muted-foreground">Choose the plan that fits your property management needs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Alert Banner */}
      {showAlert && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 px-4 py-4 rounded-lg mb-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="text-sm sm:text-base font-medium flex items-center">⏳ {alertMessage}</div>
            {(alertMessage.includes("expired") || alertMessage.includes("trial ends")) && (
              <Button
                onClick={() => {
                  const tierToSelect = tiers.find((t) => t.name === activeSub?.tier)
                  if (tierToSelect) {
                    setSelectedTier(tierToSelect)
                    setShowPaymentModal(true)
                  }
                }}
                className="w-full sm:w-auto bg-green-700"
              >
                Renew Now
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-2">
        {tiers.map((tier, index) => {
          const buttonState = getButtonState(tier)

          return (
            <Card
              key={index}
              className={`relative overflow-hidden transition-all dark:bg-gray-900/50 border border-primary-600/5 hover:shadow-lg py-6 ${
                tier.current ? "ring-2 ring-primary-600" : ""
              }`}
            >
              {/* Current Plan Badge */}
              {tier.current && (
                <div className="absolute top-4 right-4">
                  <Badge variant="default" className="flex items-center">
                    <Check className="h-4 w-4 mr-1" />
                    Current Plan
                  </Badge>
                </div>
              )}

              {/* Trial Days Counter */}
              {countdown && tier.current && activeSub?.tier !== "Mwananchi" && (
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="default"
                    className={`flex items-center p-1.5 ${
                      activeSub?.is_free_trial_active ? "bg-blue-500" : "bg-green-500"
                    }`}
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    {countdown}
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center">
                    {tier.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Pricing */}
                <div className="flex items-end border-b border-primary-600/20 pb-4">
                  <span className="text-3xl font-bold">
                    {tier.priceMonthly === 0 ? "Free" : formatCurrency(tier.priceMonthly)}
                  </span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>

                {tier.priceYearly > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(tier.priceYearly)} yearly (save {getSavingsPercentage(tier)}%)
                  </p>
                )}

                {/* Features */}
                <div className="space-y-4">
                  <h2 className="font-bold">Plan Features:</h2>
                  <div className="flex items-center gap-2">
                    <DoorOpen className="h-5 w-5 text-primary-600" />
                    <span>
                      {tier.properties} property{tier.properties !== 1 && "(s)"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-primary-600" />
                    <span>Up to {tier.rooms} rooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary-600" />
                    <span>{tier.vacancyListings} vacancy listings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary-600" />
                    <span>{tier.topOffers} top offers</span>
                  </div>
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-600/30 flex items-center justify-center mr-2">
                        <div className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-600"></div>
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </div>

                {/* Action Button */}
                <Button
                  onClick={() => {
                    if (!buttonState.disabled) {
                      setSelectedTier(tier)
                      // Set the action type for the modal
                      if (buttonState.action === "payment") {
                        setShowPaymentModal(true)
                      } else if (buttonState.action === "trial") {
                        setShowTrialModal(true)
                      }
                    }
                  }}
                  disabled={buttonState.disabled}
                  variant={buttonState.variant}
                  className="w-full mt-6"
                >
                  {buttonState.text}
                </Button>

                {tier.trial && tier.priceMonthly > 0 && !tier.current && (
                  <p className="text-center text-xs text-primary-600 mt-2">45-day free trial included</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* How It Works */}
      <div className="text-center mt-10">
        <Badge variant="outline" className="mb-4">
          How It Works
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Started in 3 Simple Steps</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-white dark:bg-gray-900/50">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-primary-600">1</span>
            </div>
            <CardTitle>Choose Your Tier</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Select a subscription plan that matches your property management needs
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900/50">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-primary-600">2</span>
            </div>
            <CardTitle>Start Free Trial</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Explore all premium features risk-free for 45 days (paid plans only)
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900/50">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-primary-600">3</span>
            </div>
            <CardTitle>Manage Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Access dashboard, list vacancies, and manage tenants seamlessly</p>
          </CardContent>
        </Card>
      </div>

      {/* Trial Modal */}
      {selectedTier && showTrialModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                {selectedTier.icon}
                {selectedTier.name} Plan
              </CardTitle>
              <CardDescription>{selectedTier.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Plan Features</h4>
                <ul className="space-y-2">
                  {selectedTier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedTier.priceMonthly > 0 && (
                <>
                  {/* Duration Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Choose Billing Period</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="monthly-trial"
                          name="duration-trial"
                          value="monthly"
                          checked={selectedDuration === "monthly"}
                          onChange={(e) => setSelectedDuration(e.target.value as "monthly" | "yearly")}
                          className="h-4 w-4"
                        />
                        <label htmlFor="monthly-trial" className="text-sm flex items-center justify-between w-full">
                          <span>Monthly - {formatCurrency(selectedTier.priceMonthly)}/month</span>
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="yearly-trial"
                          name="duration-trial"
                          value="yearly"
                          checked={selectedDuration === "yearly"}
                          onChange={(e) => setSelectedDuration(e.target.value as "monthly" | "yearly")}
                          className="h-4 w-4"
                        />
                        <label htmlFor="yearly-trial" className="text-sm flex items-center justify-between w-full">
                          <span>Yearly - {formatCurrency(selectedTier.priceYearly)}/year</span>
                          <Badge variant="secondary" className="text-xs">
                            Save {getSavingsPercentage(selectedTier)}%
                          </Badge>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    {activeSub?.is_free_trial_active || activeSub?.is_active ? (
                      <>
                        <p className="text-sm text-blue-800">🔄 Switch plans instantly!</p>
                        <p className="text-xs text-blue-600 mt-1">
                          Your remaining trial/subscription time will be preserved.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-blue-800">
                          🎉 Start with a 45-day free trial! No payment required now.
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          After trial: {formatCurrency(getCurrentPrice())}/
                          {selectedDuration === "yearly" ? "year" : "month"}
                        </p>
                      </>
                    )}
                  </div>
                </>
              )}

              {selectedTier.priceMonthly > 0 && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="terms" className="text-sm">
                    I agree to the terms and conditions
                  </label>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedTier(null)
                    setShowTrialModal(false)
                    setSelectedDuration("monthly")
                  }}
                  className="w-full"
                >
                  Cancel
                </Button>

                <Button
                  onClick={startTrial}
                  disabled={!selectedTier || (selectedTier.priceMonthly > 0 && !acceptedTerms) || loading}
                  className="w-full"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : selectedTier?.priceMonthly === 0 ? (
                    "Activate Plan"
                  ) : activeSub?.is_free_trial_active || activeSub?.is_active ? (
                    "Switch to This Plan"
                  ) : (
                    "Start Free Trial"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Payment Modal */}
      {selectedTier && showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                {selectedTier.icon}
                {selectedTier.name} Plan - Payment Required
              </CardTitle>
              <CardDescription>
                {activeSub?.tier === selectedTier.name
                  ? "Your trial has ended. Pay to continue using this plan."
                  : "Payment required to activate this plan."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Plan Features</h4>
                <ul className="space-y-2">
                  {selectedTier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Duration Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Choose Billing Period</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="monthly-payment"
                      name="duration-payment"
                      value="monthly"
                      checked={selectedDuration === "monthly"}
                      onChange={(e) => setSelectedDuration(e.target.value as "monthly" | "yearly")}
                      className="h-4 w-4"
                    />
                    <label htmlFor="monthly-payment" className="text-sm flex items-center justify-between w-full">
                      <span>Monthly - {formatCurrency(selectedTier.priceMonthly)}/month</span>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="yearly-payment"
                      name="duration-payment"
                      value="yearly"
                      checked={selectedDuration === "yearly"}
                      onChange={(e) => setSelectedDuration(e.target.value as "monthly" | "yearly")}
                      className="h-4 w-4"
                    />
                    <label htmlFor="yearly-payment" className="text-sm flex items-center justify-between w-full">
                      <span>Yearly - {formatCurrency(selectedTier.priceYearly)}/year</span>
                      <Badge variant="secondary" className="text-xs">
                        Save {getSavingsPercentage(selectedTier)}%
                      </Badge>
                    </label>
                  </div>
                </div>
              </div>

              {/* Payment Amount Display */}
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Amount to Pay:</span>
                  <span className="text-lg font-bold text-green-700">{formatCurrency(getCurrentPrice())}</span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  {selectedDuration === "yearly" ? "Billed annually" : "Billed monthly"}
                </p>
              </div>

              {/* Phone Number Input for Payment */}
              <div className="space-y-2">
                <Label htmlFor="phone">M-Pesa Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="254712345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Enter your Safaricom number in format: 254XXXXXXXXX</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="payment-terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="h-4 w-4"
                />
                <label htmlFor="payment-terms" className="text-sm">
                  I agree to the terms and conditions
                </label>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedTier(null)
                    setShowPaymentModal(false)
                    setPhoneNumber("")
                    setSelectedDuration("monthly")
                  }}
                  className="w-full"
                >
                  Cancel
                </Button>

                <Button
                  onClick={handlePayment}
                  disabled={!selectedTier || !phoneNumber || !acceptedTerms || loading}
                  className="w-full bg-green-700 hover:bg-green-800"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : `Pay ${formatCurrency(getCurrentPrice())}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Payment Status Modals */}
      {paymentStatus === "initiating" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Initiating Payment</CardTitle>
              <CardDescription>Please wait while we process your payment request...</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </CardContent>
          </Card>
        </div>
      )}

      {paymentStatus === "confirming" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Confirming Payment</CardTitle>
              <CardDescription>Please check your phone and enter your M-Pesa PIN to complete payment</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </CardContent>
          </Card>
        </div>
      )}

      {paymentResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {paymentResult.success ? (
                  <>
                    <Check className="h-6 w-6 text-green-500" />
                    Payment Successful
                  </>
                ) : (
                  <>
                    <X className="h-6 w-6 text-red-500" />
                    Payment Failed
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{paymentResult.message}</p>
              <Button
                onClick={() => {
                  setPaymentResult(null)
                  setPaymentStatus("idle")
                  setPhoneNumber("")
                  setSelectedDuration("monthly")
                }}
                className="w-full"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Subscriptions
