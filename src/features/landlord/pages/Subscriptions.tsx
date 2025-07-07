/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Home,
  Star,
  DoorOpen,
  ClipboardList,
  Gem,
  Crown,
  BadgeCheck,
  X,
  Check,
  Clock,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import {
  createSubscription,
  getSubscription,
} from "../../../services/subscriptionService.js";
import { toast, Toaster } from "sonner";

const Subscriptions = () => {
  const [selectedTier, setSelectedTier] = useState<any>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [activeSub, setActiveSub] = useState<any>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [showPayment, setShowPayment] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  // Fetch active subscription from backend
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const res = await getSubscription();
        if (res.success) {
          setActiveSub(res.data);
        }
        console.log("Active subscription:", res.data);
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
          `🚨 Free trial ends in ${days} day(s). Consider upgrading.`
        );
        setShowAlert(true);
        setShowPayment(false);
      } else if (!activeSub.is_active && !activeSub.is_free_trial_active) {
        setAlertMessage(`🔒 Pay for your subscription to unlock all features.`);
        setShowAlert(true);
        setShowPayment(true);
        console.log(showPayment);
      } else {
        setAlertMessage("");
        setShowAlert(false);
        setShowPayment(false);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [activeSub]);

  const tiers = [
    {
      name: "Mwananchi",
      icon: <Home className="w-6 h-6" />,
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
      icon: <Star className="w-6 h-6" />,
      priceMonthly: 1200,
      priceYearly: 6000,
      properties: 4,
      rooms: 30,
      vacancyListings: 2,
      topOffers: 1,
      trial: true,
      current: activeSub?.tier === "Gold",
      description: "Ideal for small property portfolios",
      features: [
        "Advanced analytics",
        "Tenant screening",
        "Automated rent collection",
      ],
    },
    {
      name: "Gold",
      icon: <Gem className="w-6 h-6" />,
      priceMonthly: 3000,
      priceYearly: 9000,
      properties: 4,
      rooms: 70,
      vacancyListings: 4,
      topOffers: 2,
      trial: true,
      current: activeSub?.tier === "Silver",
      description: "Most popular for professional managers",
      features: [
        "Premium listing visibility",
        "Maintenance tracking",
        "Financial reporting",
      ],
    },
    {
      name: "Diamond",
      icon: <Crown className="w-6 h-6" />,
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

  // Add the trial start function to database
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
        toast.success('Your trial has started')
        console.log("✅ Trial started:", res.data);
      }
    } catch (err) {
      console.error("❌ Failed to start trial:", err);
    }
  };

  const handleMpesaPayment = () => {
    toast.success('Redirecting to M-pesa payment...')
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600/10 via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster richColors position="top-right" />
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}

        {/* 🔔 Alert Banner */}
        {showAlert && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 px-4 py-4 rounded-lg mb-6 shadow-md">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="text-sm sm:text-base font-medium flex items-center">
                ⏳ {alertMessage}
              </div>

              {showPayment && (
                <button
                  onClick={handleMpesaPayment}
                  className="w-full sm:w-auto py-2 px-4 rounded-md text-white font-semibold bg-green-600 hover:bg-green-700 transition"
                >
                  Pay via M-Pesa
                </button>
              )}
            </div>
          </div>
        )}
        <div className="relative pt-8 pb-12 mb-16 text-center">
          <div className="absolute inset-0 bg-[#FBFBFB]/10 shadow-xl dark:bg-gray-900/60"></div>
          <div className="relative">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Nyumba Smart <span className="text-primary-600">Plans</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 leading-relaxed">
              Scale your real estate management with our flexible tiers
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 mb-20">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl
                ${tier.current
                  ? "ring-2 ring-primary-600 dark:ring-primary-500 transform scale-[1.02] border-primary-600"
                  : "border border-gray-100 dark:border-gray-800"
                }
                bg-[#FBFBFB] dark:bg-gray-900/60 shadow-lg`}>

              {/* Trial Days Counter */}
              {countdown !== null && tier.current && (
                <div className="absolute top-4 left-24 bg-yellow-500/90 text-white px-3 py-1 rounded-full flex items-center text-sm font-medium">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{countdown} days left</span>
                </div>
              )}

              {/* Current Plan Badge */}
              {tier.current && (
                <div className="absolute top-4 right-4 bg-primary-600 dark:bg-primary-600/50 text-white px-3 py-1 rounded-full flex items-center text-sm font-medium">
                  <BadgeCheck className="w-4 h-4 mr-1" />
                  <span>Current Plan</span>
                </div>
              )}

              <div className="p-8">
                {/* Tier Header */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary-600/30 dark:bg-primary-600/30 rounded-xl flex items-center justify-center mr-4">
                    <div className="text-primary-600 dark:text-primary-600">{tier.icon}</div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {tier.name}
                  </h2>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-end">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {tier.priceMonthly === 0
                        ? "Free"
                        : `Ksh ${tier.priceMonthly.toLocaleString()}`}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      /month
                    </span>
                  </div>
                  {tier.priceYearly > 0 && (
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      or Ksh {tier.priceYearly.toLocaleString()}/year
                      <span className="text-green-600 dark:text-green-400 ml-2">
                        (Save{" "}
                        {Math.round(
                          (1 - tier.priceYearly / (tier.priceMonthly * 12)) *
                          100
                        )}
                        %)
                      </span>
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {tier.description}
                </p>

                {/* Features */}
                <div className="border-t border-gray-200 dark:border-primary-600/20 pt-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Plan Features
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <DoorOpen className="w-5 h-5 text-primary-600 dark:text-primary-600 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {tier.properties} propertie(s)
                      </span>
                    </li>
                    <li className="flex items-center">
                      <Home className="w-5 h-5 text-primary-600 dark:text-primary-600 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Up to {tier.rooms} rooms
                      </span>
                    </li>
                    <li className="flex items-center">
                      <ClipboardList className="w-5 h-5 text-primary-600 dark:text-primary-600 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {tier.vacancyListings} vacancy listings
                      </span>
                    </li>
                    <li className="flex items-center">
                      <Star className="w-5 h-5 text-primary-600 dark:text-primary-600 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {tier.topOffers} top listing offers
                      </span>
                    </li>
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
                  </ul>
                </div>

                {/* Action Button */}
                <button
                  onClick={() =>
                    tier.priceMonthly > 0 &&
                    !tier.current &&
                    setSelectedTier(tier)
                  }
                  className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 ${tier.current
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 hover:scale-105"
                    }`}
                  disabled={tier.current}
                >
                  {tier.current
                    ? "Current Plan"
                    : tier.priceMonthly === 0
                      ? "Get Started"
                      : "Start Free Trial"}
                </button>

                {/* Trial Notice */}
                {tier.trial && tier.priceMonthly > 0 && (
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                    45-day free trial included
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-2 bg-primary-600/30 dark:bg-primary-600/30 text-primary-600 dark:text-primary-600 rounded-full text-sm font-medium mb-4">
            How It Works
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Get Started in 3 Simple Steps
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="group">
            <div className="bg-[#FBFBFB] dark:bg-gray-900/70 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-600/30 dark:bg-primary-600/30 rounded-xl flex items-center justify-center mr-4">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-600">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Choose Your Tier
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Select a subscription plan that matches your property management
                needs
              </p>
            </div>
          </div>

          <div className="group">
            <div className="bg-[#FBFBFB] dark:bg-gray-900/70 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-600/30 dark:bg-primary-600/30 rounded-xl flex items-center justify-center mr-4">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-600">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Start Free Trial
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Explore all premium features risk-free for 45 days (paid plans
                only)
              </p>
            </div>
          </div>

          <div className="group">
            <div className="bg-[#FBFBFB] dark:bg-gray-900/70 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-600/30 dark:bg-primary-600/30 rounded-xl flex items-center justify-center mr-4">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-600">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Manage Properties
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Access dashboard, list vacancies, and manage tenants seamlessly
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-10 text-center">
          <div className="bg-gray-900 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <h2 className="text-3xl md:text-3xl font-bold mb-4">
                Ready to Transform Your Property Management?
              </h2>
              <p className="text-xl mb-5 text-blue-100">
                Join thousands of property owners who trust NyumbaSmart
              </p>
              <button className="bg-primary-600/20 pulse-animation text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300 hover:scale-105 transform">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trial Modal */}
      {selectedTier && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-800">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Start Your{" "}
                <span className="text-primary-600">{selectedTier.name}</span>{" "}
                Trial
              </h2>
              <button
                onClick={() => setSelectedTier(null)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Tier Summary */}
              <div className="bg-blue-50 dark:bg-gray-800/50 rounded-xl p-6 flex items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4">
                  <div className="text-white">{selectedTier.icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedTier.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedTier.priceMonthly === 0
                      ? "Free"
                      : `Ksh ${selectedTier.priceMonthly.toLocaleString()}/month`}
                  </p>
                </div>
              </div>

              {/* How It Works */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <ArrowRight className="w-5 h-5 mr-2 text-primary-600" />
                  How Your Trial Works
                </h3>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400"></div>
                      </div>
                      <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-1"></div>
                    </div>
                    <div className="pb-6">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Instant Access
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        Get full access to all {selectedTier.name} tier features
                        immediately
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400"></div>
                      </div>
                      <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-1"></div>
                    </div>
                    <div className="pb-6">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        45-Day Trial Period
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        Explore all features for 45 days with no payment
                        required
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400"></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Seamless M-Pesa Payment
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        After 45 days, we'll send an M-Pesa prompt to continue
                        your subscription
                      </p>
                      <div className="flex items-center mt-3 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                        <Smartphone className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          +254 XXX XXX XXX
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div
                  className="flex items-start cursor-pointer"
                  onClick={() => setAcceptedTerms(!acceptedTerms)}
                >
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded border mr-3 mt-0.5 transition-colors
                    ${acceptedTerms
                        ? "bg-primary-600 border-primary-600"
                        : "border-gray-300 dark:border-gray-600 hover:border-primary-600"
                      }`}
                  >
                    {acceptedTerms && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white">
                      I agree to the NyumbaSmart{" "}
                      <span className="text-primary-600">Terms of Service</span>{" "}
                      and{" "}
                      <span className="text-primary-600">Privacy Policy</span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Your subscription will automatically renew after the trial
                      period unless canceled
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white dark:bg-gray-900 p-6 border-t border-gray-200 dark:border-gray-800">
              {showPayment ? (
                <button
                  onClick={handleMpesaPayment}
                  className="w-full py-3 mt-2 rounded-md text-white font-bold bg-green-600 hover:bg-green-700"
                >
                  Pay via M-Pesa
                </button>
              ) : (
                <button
                  disabled={!acceptedTerms}
                  onClick={startTrial}
                  className={`w-full py-3 mt-2 rounded-md text-white font-bold ${acceptedTerms
                      ? "bg-primary-600 hover:bg-primary-700"
                      : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                  Start Free Trial
                </button>
              )}

              {/* <button
                onClick={startTrial}
                disabled={!acceptedTerms}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center
                  ${acceptedTerms
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-500 cursor-not-allowed'}`}
              >
                Start My 45-Day Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </button> */}
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                No payment required • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
