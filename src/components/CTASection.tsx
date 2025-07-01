import type React from "react"
import { Link } from "react-router-dom"
import { Building, CreditCard, Users, Shield, Wifi, Wrench, Zap, ArrowRight, Star, CircleCheckBig, Headset } from "lucide-react"

const CTASection: React.FC = () => {
  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-br from-primary-600/10 via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Simplify Your Property Management
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto">
            NyumbaSmart provides everything you need to manage your properties efficiently.
          </p>
          <div className="flex items-center justify-center mt-8 space-x-6">
            <div className="flex items-center text-md text-gray-500">
              <CircleCheckBig className="w-6 h-6 mr-2 text-green-500" />
              No Setup Fees
            </div>
            <div className="flex items-center text-md text-gray-500">
              <Headset className="w-6 h-6 mr-2 text-green-500" />
              24/7 Support
            </div>
            <div className="flex items-center text-md text-gray-500">
              <Star className="w-6 h-6 mr-2 text-yellow-500" />
              5-Star Rated
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-24">
          {/* Feature 1: smart room */}
          <div className="group relative bg-[#FBFBFB] dark:bg-gray-900 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl p-8 transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 border border-white/50 dark:border-gray-800 overflow-hidden">
            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/20 rounded-2xl group-hover:from-blue-500/20 group-hover:to-blue-600/30 transition-all duration-500 group-hover:scale-110">
                  <Building className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                Smart Room Management
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                AI-powered room tracking with real-time vacancy updates and intelligent tenant matching algorithms.
              </p>
            </div>
          </div>

          {/* Feature 2: mpesa payment */}
          <div className="group relative bg-[#FBFBFB] dark:bg-gray-900 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl p-8 transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 border border-white/50 dark:border-gray-800 overflow-hidden">
            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/20 rounded-2xl group-hover:from-green-500/20 group-hover:to-green-600/30 transition-all duration-500 group-hover:scale-110">
                  <CreditCard className="h-8 w-8 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300">
                Instant M-Pesa Payments
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                Seamless M-Pesa integration with instant notifications, automated receipts, and comprehensive transaction analytics.
              </p>
            </div>
          </div>

          {/* Feature 3: tenant portal */}
          <div className="group relative bg-[#FBFBFB] dark:bg-gray-900 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl p-8 transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 border border-white/50 dark:border-gray-800 overflow-hidden">
            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/20 rounded-2xl group-hover:from-purple-500/20 group-hover:to-purple-600/30 transition-all duration-500 group-hover:scale-110">
                  <Users className="h-8 w-8 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
                Advanced Tenant Portal
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                Empower tenants with modern self-service capabilities, in-app messaging, and streamlined maintenance workflows.
              </p>
            </div>
          </div>

          {/* Feature 4: referral system */}
          <div className="group relative bg-[#FBFBFB] dark:bg-gray-900 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl p-8 transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 border border-white/50 dark:border-gray-800 overflow-hidden">
            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-orange-500/10 to-orange-600/20 rounded-2xl group-hover:from-orange-500/20 group-hover:to-orange-600/30 transition-all duration-500 group-hover:scale-110">
                  <Shield className="h-8 w-8 text-orange-600 group-hover:text-orange-700 transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors duration-300">
                Profitable Referral System
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                Build a sustainable income stream with our comprehensive referral program and partnership opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Service Providers Section */}
        <div className="relative bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900 dark:to-gray-950/10 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 dark:border-gray-800 p-12 mb-20 overflow-hidden">
          <div className="relative text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Connect with Our Vetted Service Providers</h3>
            <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-300 mx-auto mb-8">
              Access trusted service providers directly through our platform
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* WiFi Provider */}
            <div className="group bg-white dark:bg-gray-950 shadow-xl backdrop-blur-sm rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-xl border border-blue-100/50 dark:border-primary-600/5">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary-600/30 dark:bg-primary-600/30 rounded-2xl group-hover:from-blue-500/20 group-hover:to-cyan-600/30 transition-all duration-500 group-hover:scale-110">
                  <Wifi className="h-8 w-8 text-primary-600 group-hover:text-blue-700 transition-colors duration-300" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-950 dark:text-white text-center mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                WiFi & Internet Solutions
              </h4>
              <p className="text-gray-900 dark:text-gray-300 text-center leading-relaxed">
                High-speed internet providers with competitive rates, reliable service, and dedicated property management support.
              </p>
            </div>

            {/* Plumbing Services */}
            <div className="group bg-white dark:bg-gray-950 shadow-xl backdrop-blur-sm rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-xl border border-blue-100/50 dark:border-primary-600/5">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary-600/30 dark:bg-primary-600/30 rounded-2xl group-hover:from-blue-500/20 group-hover:to-cyan-600/30 transition-all duration-500 group-hover:scale-110">
                  <Wrench className="h-8 w-8 text-primary-600 group-hover:text-blue-700 transition-colors duration-300" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-950 dark:text-white text-center mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                Expert Plumbing Services
              </h4>
              <p className="text-gray-900 dark:text-gray-300 text-center leading-relaxed">
                Licensed plumbers available for emergency repairs, installations, and routine maintenance with transparent pricing.
              </p>
            </div>

            {/* Electrical Services */}
            <div className="group bg-white dark:bg-gray-950 shadow-xl backdrop-blur-sm rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-xl border border-blue-100/50 dark:border-primary-600/5">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary-600/30 dark:bg-primary-600/30 rounded-2xl group-hover:from-blue-500/20 group-hover:to-cyan-600/30 transition-all duration-500 group-hover:scale-110">
                  <Zap className="h-8 w-8 text-primary-600 group-hover:text-blue-700 transition-colors duration-300" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-950 dark:text-white text-center mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                Certified Electrical Work
              </h4>
              <p className="text-gray-900 dark:text-gray-300 text-center leading-relaxed">
                Professional electricians for safe installations, repairs, and upgrades with full compliance and warranty coverage.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Button */}
        <div className="text-center">
          <Link
            to="/register"
            className="inline-flex pulse-animation items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 md:py-4 md:text-lg md:px-10 transition duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative">Start Your Property Management Journey</span>
            <ArrowRight className="relative ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTASection