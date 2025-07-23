/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
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
  Loader2
} from "lucide-react";
import {
  createSubscription,
  getSubscription,
  validateSubscription,
} from "../../../services/subscriptionService.js";
import { toast, Toaster } from "sonner";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import {
  initiateMpesaPayment,
  checkMpesaPaymentStatus,
} from "../../../services/payment.service/subscriptions/subscription.payment.service.js";

interface Tier {
  name: string;
  icon: React.ReactNode;
  priceMonthly: number;
  priceYearly: number;
  properties: number | string;
  rooms: number | string;
  vacancyListings: number | string;
  topOffers: number | string;
  trial: boolean;
  current: boolean;
  description: string;
  features: string[];
}

interface Subscription {
  tier: string;
  is_active: boolean;
  is_free_trial_active: boolean;
  free_trial_end_date?: string;
  end_date?: string;
}

const Subscriptions = () => {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [activeSub, setActiveSub] = useState<Subscription | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "initiating" | "confirming" | "completed">("idle");
  const [paymentResult, setPaymentResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Fetch active subscription from backend
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const res = await getSubscription();
        if (res.success) {
          setActiveSub(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch subscription:", err);
      }
    };
    fetchSubscription();
  }, []);

  // Live countdown update
  useEffect(() => {
    if (!activeSub) return;

    const getTargetTime = () => {
      const now = new Date();
      const end = new Date(
        activeSub.free_trial
          ? activeSub.free_trial_end_date
          : activeSub.end_date
      );
      return Math.max(0, end.getTime() - now.getTime());
    };

    const formatCountdown = (ms: number) => {
      const totalSec = Math.floor(ms / 1000);
      const days = Math.floor(totalSec / 86400);
      const hours = Math.floor((totalSec % 86400) / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = totalSec % 60;
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    const updateCountdown = () => {
      const remaining = getTargetTime();
      const totalSec = Math.floor(remaining / 1000);
      const days = Math.floor(totalSec / 86400);
      setCountdown(formatCountdown(remaining));

      if (activeSub.is_free_trial_active && days <= 3) {
        setAlertMessage(
          `Free trial ends in ${days} day(s). Consider upgrading.`
        );
        setShowAlert(true);
      } else if (!activeSub.is_active && !activeSub.is_free_trial_active) {
        setAlertMessage(`Pay for your subscription to unlock all features.`);
        setShowAlert(true);
      } else {
        setAlertMessage("");
        setShowAlert(false);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [activeSub]);

  useEffect(() => {
    const check = async () => {
      try {
        await validateSubscription();
      } catch (err) {
        console.error('Validation failed:', err);
      }
    };

    check();
  }, []);

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
      features: [
        "Basic property management",
        "Single property support",
        "Room management",
      ],
    },
    {
      name: "Silver",
      icon: <Star className="w-5 h-5" />,
      priceMonthly: 1200,
      priceYearly: 6000,
      properties: 4,
      rooms: 30,
      vacancyListings: 2,
      topOffers: 1,
      trial: true,
      current: activeSub?.tier === "Silver",
      description: "Ideal for small property portfolios",
      features: [
        "Advanced analytics",
        "Tenant screening",
        "Automated rent collection",
      ],
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
      features: [
        "Premium listing visibility",
        "Maintenance tracking",
        "Financial reporting",
      ],
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
      features: [
        "Dedicated account manager",
        "Custom API access",
        "Priority support",
      ],
    },
  ];

  const startTrial = async () => {
    if (!selectedTier) return;
    try {
      const data = {
        tier: selectedTier.name,
        duration: "monthly",
        amount: selectedTier.priceMonthly,
        free_trial: true,
        free_trial_duration: 45,
      };

      const res = await createSubscription(data);
      if (res.success) {
        setSelectedTier(null);
        setActiveSub(res.data);
        setAcceptedTerms(false);
        setCountdown("45d 0h 0m 0s");
        toast.success('Your trial has started successfully');
      }
    } catch (err) {
      toast.error('Failed to start trial');
      console.error("Failed to start trial:", err);
    }
  };

  const handlePayment = async () => {
    if (!selectedTier) return;

    setPaymentStatus("initiating");
    setLoading(true);

    try {
      const phone = "254113730593"; // Ideally get from user profile or input
      const amount = 1; // selectedTier?.priceMonthly || 0;

      const initRes = await initiateMpesaPayment(phone, amount, "subscription");

      setPaymentStatus("confirming");

      let retries = 0;
      let statusResponse = null;

      while (retries < 6) {
        await new Promise((res) => setTimeout(res, 5000));
        statusResponse = await checkMpesaPaymentStatus(initRes.checkoutRequestId);

        if (statusResponse.status === "success" || statusResponse.status === "failed") break;
        retries++;
      }

      const paymentSuccess = statusResponse?.status === "success";
      setPaymentResult({
        success: paymentSuccess,
        message: paymentSuccess
          ? "Payment successful. Subscription activated."
          : "Payment failed or expired.",
      });

      if (paymentSuccess) {
        const res = await getSubscription();
        if (res.success) setActiveSub(res.data);
      }
    } catch (error: any) {
      setPaymentResult({
        success: false,
        message: error.message || "Payment processing failed",
      });
    } finally {
      setLoading(false);
      setPaymentStatus("completed");
      setTimeout(() => {
        setPaymentResult(null);
        setSelectedTier(null);
      }, 3000);
    }
  };

  const formatCurrency = (amount: number) => `Ksh ${amount.toLocaleString()}`;

  return (
    <div className="container mx-auto p-4 space-y-6 animate-fade-in">
      <Toaster richColors position="top-right" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight"> <b className="text-primary-600">Tenahub</b> Subscription Plans</h1>
          <p className="text-muted-foreground">
            Choose the plan that fits your property management needs
          </p>
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
            <div className="text-sm sm:text-base font-medium flex items-center">
              ⏳ {alertMessage}
            </div>
            {alertMessage.includes("Pay for your subscription") && (
              <Button
                onClick={() => {
                  const tierToSelect = tiers.find(t => t.name === activeSub?.tier);
                  if (tierToSelect) setSelectedTier(tierToSelect);
                }}
                className="w-full sm:w-auto"
              >
                Upgrade Now
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-2">
        {tiers.map((tier, index) => (
          <Card key={index} className={`relative overflow-hidden transition-all dark:bg-gray-900/50 border border-primary-600/5 hover:shadow-lg py-6 ${tier.current ? "ring-1 ring-primary-600" : ""
            }`}>
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
            {countdown && tier.current && (
              <div className="absolute top-4 left-4">
                <Badge variant="default" className="flex items-center bg-yellow-500 p-1.5">
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
                  {formatCurrency(tier.priceYearly)} yearly (save{" "}
                  {Math.round((1 - tier.priceYearly / (tier.priceMonthly * 12)) * 100)}%)
                </p>
              )}

              {/* Features */}
              <div className="space-y-4">
                <h2 className="font-bold">Plan Features:</h2>
                <div className="flex items-center gap-2">
                  <DoorOpen className="h-5 w-5 text-primary-600" />
                  <span>{tier.properties} property{tier.properties !== 1 && '(s)'}</span>
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
                    <span className="text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </div>

              {/* Action Button */}
              <Button
                onClick={() => !tier.current && setSelectedTier(tier)}
                disabled={tier.current}
                className="w-full mt-6 hover:bg-primary-600 hover:text-white"
              >
                {tier.current
                  ? "Current Plan"
                  : tier.priceMonthly === 0
                    ? "Get Started"
                    : "Start Free Trial"}
              </Button>

              {tier.trial && tier.priceMonthly > 0 && (
                <p className="text-center text-xs text-primary-600 mt-2">
                  45-day free trial included
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How It Works */}
      <div className="text-center mt-10">
        <Badge variant="outline" className="mb-4">
          How It Works
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Get Started in 3 Simple Steps
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-gray-900/50">
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

        <Card className="bg-gray-900/50">
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

        <Card className="bg-gray-900/50">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-primary-600">3</span>
            </div>
            <CardTitle>Manage Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Access dashboard, list vacancies, and manage tenants seamlessly
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tier Selection Modal */}
      {selectedTier && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                {selectedTier.icon}
                {selectedTier.name} Plan
              </CardTitle>
              <CardDescription>
                {selectedTier.description}
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

              {selectedTier.priceMonthly > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Monthly Price</span>
                    <span className="font-bold">{formatCurrency(selectedTier.priceMonthly)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Yearly Price</span>
                    <span className="font-bold">{formatCurrency(selectedTier.priceYearly)}</span>
                  </div>
                </div>
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
                  onClick={() => setSelectedTier(null)}
                  className="w-full"
                >
                  Cancel
                </Button>
                <Button
                  onClick={selectedTier.priceMonthly === 0 ? startTrial : handlePayment}
                  disabled={selectedTier.priceMonthly > 0 && !acceptedTerms}
                  className="w-full"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : selectedTier.priceMonthly === 0 ? (
                    "Get Started"
                  ) : (
                    "Start Free Trial"
                  )}
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
              <CardDescription>
                Please wait while we process your payment request...
              </CardDescription>
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
              <CardDescription>
                Please check your phone and enter your M-Pesa PIN to complete payment
              </CardDescription>
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
                  setPaymentResult(null);
                  setPaymentStatus("idle");
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
  );
};

export default Subscriptions;
