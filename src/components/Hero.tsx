"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { Building, Users, UserPlus, ArrowRight, Play, CircleChevronDown, CircleChevronUp } from "lucide-react"
import { motion, AnimatePresence, easeInOut } from "framer-motion"
import { VideoModal } from "./ViewModal"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [showUpArrow, setShowUpArrow] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  const youtubeVideoId = "7YHIRGpONBU"

  const backgroundImages = [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80",
    "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1575789959844-bbdf1cc5e339?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym5ifGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBrZXlzfGVufDB8fDB8fHww",
  ]

  const userRoles = [
    {
      role: "landlord",
      title: "Landlord",
      description: "Manage your properties, track rent payments, and handle maintenance requests",
      icon: Building,
      color: "from-primary-600 to-primary-600",
    },
    {
      role: "service-provider",
      title: "Service Provider",
      description: "Join the largest Blue color Jobs marketplace in kenya.Start free.Sell your services eg. Plumbing,cleaning,mama-Fua, movers(logistics),building,painting,electrecian,wifi services etc",
      icon: Users,
      color: "from-primary-600 to-primary-600",
    },
    {
      role: "agent",
      title: "Agent",
      description: "Refer landlords and earn recurring income through our platform",
      icon: UserPlus,
      color: "from-primary-600 to-primary-600",
    },
  ]

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [backgroundImages.length])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setShowUpArrow(true)
      } else {
        setShowUpArrow(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeInOut,
      },
    },
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: easeInOut,
      },
    },
    tap: {
      scale: 0.95,
    },
  }

  return (
    <div className="relative h-screen overflow-hidden" ref={heroRef}>
      {/* Animated Background Images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {backgroundImages.map(
            (img, index) =>
              index === currentSlide && (
                <motion.img
                  key={index}
                  src={img}
                  alt="Modern apartment building"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              ),
          )}
        </AnimatePresence>

        {/* Animated Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Left side - Main message */}
          <div className="text-center lg:text-left">
            <motion.div variants={itemVariants} className="mb-6">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Transform Your Property Management Experience
              </motion.h1>
            </motion.div>

            <motion.p className="text-lg md:text-xl text-gray-200 mb-10 capitalize" variants={itemVariants}>
              TenaHub helps landlords manage properties, track rent payments, and keep tenants happy with our
              all-in-one platform.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              variants={itemVariants}
            >
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link
                  to="/register"
                  className="group inline-flex items-center px-8 py-3 text-base font-medium rounded-xl text-white bg-primary-600 md:py-4 md:text-lg md:px-10 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="inline-flex items-center px-8 py-3 gap-3 text-base font-medium rounded-xl text-primary-600 bg-white/90 backdrop-blur-sm hover:bg-white md:py-4 md:text-lg md:px-10 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Play size={20} className="text-gray-900" />
                  Watch Demo
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - User role options */}
          <motion.div className="hidden lg:flex flex-col gap-6" variants={itemVariants}>
            <Card className="shadow-lg dark:bg-gray-900/70 backdrop-blur-sm border border-gray-100/20 dark:border-gray-800/50">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Join Our Community
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Select your role to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 p-6 pt-0">
                {userRoles.map((roleData, index) => {
                  const IconComponent = roleData.icon;
                  return (
                    <motion.div
                      key={roleData.role}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link
                        to={`/register?role=${roleData.role}`}
                        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 rounded-xl"
                      >
                        <Card className="h-full flex items-center hover:scale-105 p-5 rounded-xl border border-gray-200/50 dark:border-gray-800 hover:border-primary-500/30 transition-all duration-300 group hover:shadow-md bg-white dark:bg-gray-900">
                          {/* Icon with subtle hover effect */}
                          <div className={`bg-gradient-to-r ${roleData.color} p-3 rounded-xl mr-4 transition-all duration-300 group-hover:scale-105`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>

                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {roleData.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                              {roleData.description}
                            </p>
                          </div>

                          {/* Arrow with simple hover animation */}
                          <div className="ml-4 text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ArrowRight className="h-5 w-5" />
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Scroll Arrows */}
      <motion.div
        className="fixed bottom-8 right-8 z-20 flex flex-col gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        {/* Down Arrow - Always visible */}
        <motion.button
          onClick={scrollDown}
          className="p-3 rounded-full bg-white backdrop-blur-sm hover:bg-white/90 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <CircleChevronDown className="h-6 w-6 text-gray-900" />
        </motion.button>

        {/* Up Arrow - Only shows after scrolling down */}
        <AnimatePresence>
          {showUpArrow && (
            <motion.button
              onClick={scrollUp}
              className="p-3 rounded-full bg-white backdrop-blur-sm hover:bg-white/90 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <CircleChevronUp className="h-6 w-6 text-gray-900" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        youtubeId={youtubeVideoId}
      />
    </div>
  )
}

export default Hero
