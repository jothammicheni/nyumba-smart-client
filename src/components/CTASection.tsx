/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import {
  Building,
  CreditCard,
  Users,
  Shield,
  Wifi,
  Wrench,
  Zap,
  ArrowRight,
  Star,
  CircleCheckBig,
  Headset,
} from "lucide-react"
import { motion, useInView, useAnimation, easeInOut } from "framer-motion"

const CTASection: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeInOut,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeInOut,
      },
    },
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: easeInOut,
      },
    },
  }

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.6,
        ease: easeInOut,
      },
    },
  }

  const features = [
    {
      icon: Building,
      title: "Smart Room Management",
      description:
        "AI-powered room tracking with real-time vacancy updates and intelligent tenant matching algorithms.",
      color: "from-blue-500/10 to-blue-600/20",
      hoverColor: "from-blue-500/20 to-blue-600/30",
      iconColor: "text-blue-600",
      titleHoverColor: "group-hover:text-blue-700 dark:group-hover:text-blue-300",
    },
    {
      icon: CreditCard,
      title: "Instant M-Pesa Payments",
      description:
        "Seamless M-Pesa integration with instant notifications, automated receipts, and comprehensive transaction analytics.",
      color: "from-green-500/10 to-green-600/20",
      hoverColor: "from-green-500/20 to-green-600/30",
      iconColor: "text-green-600",
      titleHoverColor: "group-hover:text-green-700 dark:group-hover:text-green-300",
    },
    {
      icon: Users,
      title: "Advanced Tenant Portal",
      description:
        "Empower tenants with modern self-service capabilities, in-app messaging, and streamlined maintenance workflows.",
      color: "from-purple-500/10 to-purple-600/20",
      hoverColor: "from-purple-500/20 to-purple-600/30",
      iconColor: "text-purple-600",
      titleHoverColor: "group-hover:text-purple-700 dark:group-hover:text-purple-300",
    },
    {
      icon: Shield,
      title: "Profitable Referral System",
      description:
        "Build a sustainable income stream with our comprehensive referral program and partnership opportunities.",
      color: "from-orange-500/10 to-orange-600/20",
      hoverColor: "from-orange-500/20 to-orange-600/30",
      iconColor: "text-orange-600",
      titleHoverColor: "group-hover:text-orange-700 dark:group-hover:text-orange-300",
    },
  ]

  const serviceProviders = [
    {
      icon: Wifi,
      title: "WiFi & Internet Solutions",
      description:
        "High-speed internet providers with competitive rates, reliable service, and dedicated property management support.",
    },
    {
      icon: Wrench,
      title: "Expert Plumbing Services",
      description:
        "Licensed plumbers available for emergency repairs, installations, and routine maintenance with transparent pricing.",
    },
    {
      icon: Zap,
      title: "Certified Electrical Work",
      description:
        "Professional electricians for safe installations, repairs, and upgrades with full compliance and warranty coverage.",
    },
  ]

  const benefits = [
    { icon: CircleCheckBig, text: "No Setup Fees", color: "text-green-500" },
    { icon: Headset, text: "24/7 Support", color: "text-green-500" },
    { icon: Star, text: "5-Star Rated", color: "text-yellow-500" },
  ]

  return (
    <section
      ref={ref}
      className="relative py-16 overflow-hidden bg-gradient-to-br from-white via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div className="text-center mb-20" variants={containerVariants} initial="hidden" animate={controls}>
          <motion.h2
            className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
            variants={itemVariants}
          >
            Simplify Your Property Management
          </motion.h2>
          <motion.p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto" variants={itemVariants}>
            NyumbaSmart provides everything you need to manage your properties efficiently.
          </motion.p>

          {/* Benefits Row */}
          <motion.div
            className="flex items-center justify-center mt-8 space-x-6 flex-wrap gap-4"
            variants={itemVariants}
          >
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <motion.div
                  key={index}
                  className="flex items-center text-md text-gray-500"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                    <IconComponent className={`w-6 h-6 mr-2 ${benefit.color}`} />
                  </motion.div>
                  {benefit.text}
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-24"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                className="group relative bg-[#FBFBFB] dark:bg-gray-950/50 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl p-8 border border-white/50 dark:border-gray-800/60 overflow-hidden cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0, rotate: 45 }}
                  whileHover={{ scale: 1.5, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                />

                <div className="relative">
                  <div className="flex justify-center mb-6">
                    <motion.div
                      className={`p-4 bg-gradient-to-br ${feature.color} group-hover:${feature.hoverColor} rounded-2xl transition-all duration-500`}
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <IconComponent
                        className={`h-8 w-8 ${feature.iconColor} group-hover:text-opacity-80 transition-colors duration-300`}
                      />
                    </motion.div>
                  </div>

                  <motion.h3
                    className={`text-xl font-bold text-gray-900 dark:text-white text-center mb-3 transition-colors duration-300 ${feature.titleHoverColor}`}
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {feature.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-600 dark:text-gray-300 text-center leading-relaxed"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {feature.description}
                  </motion.p>
                </div>

                {/* Hover Indicator */}
                <motion.div
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0, rotate: -90 }}
                  whileHover={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Service Providers Section */}
        <motion.div
          className="relative bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900 dark:to-gray-950/10 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 dark:border-gray-800 p-12 mb-20 overflow-hidden"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Animated Background Pattern */}
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)
              `,
              backgroundSize: "100px 100px",
            }}
          />

          <div className="relative text-center mb-12">
            <motion.h3
              className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Connect with Our Vetted Service Providers
            </motion.h3>
            <motion.p
              className="max-w-2xl text-lg text-gray-600 dark:text-gray-300 mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Access trusted service providers directly through our platform
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {serviceProviders.map((provider, index) => {
              const IconComponent = provider.icon
              return (
                <motion.div
                  key={index}
                  className="group bg-white dark:bg-gray-950 shadow-xl backdrop-blur-sm rounded-2xl p-8 border border-blue-100/50 dark:border-primary-600/5 cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="flex justify-center mb-6">
                    <motion.div
                      className="p-4 bg-primary-600/30 dark:bg-primary-600/30 rounded-2xl transition-all duration-300"
                      whileHover={{
                        scale: 1.1,
                        rotate: 360,
                        transition: { duration: 0.6 },
                      }}
                    >
                      <IconComponent className="h-8 w-8 text-primary-600 transition-colors duration-300" />
                    </motion.div>
                  </div>

                  <motion.h4
                    className="text-xl font-bold text-gray-950 dark:text-white text-center mb-3 transition-colors duration-300"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {provider.title}
                  </motion.h4>

                  <motion.p
                    className="text-gray-900 dark:text-gray-300 text-center leading-relaxed"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {provider.description}
                  </motion.p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Enhanced CTA Button */}
        <motion.div className="text-center" variants={itemVariants} initial="hidden" animate={controls}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/register"
              className="group relative inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-primary-600 to-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
            >
              {/* Animated Background Shine */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />

              {/* Pulsing Background */}
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              <span className="relative z-10">Start Your Property Management Journey</span>

              <motion.div
                className="relative z-10 ml-3"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
