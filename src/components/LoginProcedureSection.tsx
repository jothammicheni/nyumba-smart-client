"use client"

import type React from "react"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { Link } from "react-router-dom" 
import { UserPlus, LogIn, LayoutDashboard, CheckCircle, ArrowRight } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"

const LoginProcedureSection: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" }) 

  const steps = [
    {
      number: 1,
      icon: UserPlus,
      title: "Create Account",
      description: "Sign up as a landlord, tenant, agent, or service provider with our secure registration process.",
    },
    {
      number: 2,
      icon: LogIn,
      title: "Secure Login",
      description: "Access your personalized dashboard with enterprise-grade security and two-factor authentication.",
    },
    {
      number: 3,
      icon: LayoutDashboard,
      title: "Smart Dashboard",
      description: "Navigate your role-based dashboard with AI-powered insights and real-time analytics.",
    },
    {
      number: 4,
      icon: CheckCircle,
      title: "Start Managing",
      description: "Begin your property management journey with our comprehensive suite of tools and features.",
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-white via-white to-gray-100 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={cn("text-center mb-16 transition-opacity duration-500", isInView ? "opacity-100" : "opacity-0")}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Started with <span className="text-primary">TenaHub</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transform your property management experience with our intuitive platform in just four simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative pt-10">
          {/* Progress line - positioned to align with the center of the indicator circles */}
          <div className="hidden lg:block absolute inset-x-0 top-[20px] h-0.5 bg-border z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <Card
                  key={step.number}
                  className={cn(
                    "flex flex-col items-center text-center p-6 dark:bg-gray-950/50 hover:scale-105 duration-300 ease-in-out hover:shadow-md border dark:border-gray-800/60 relative z-10",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Step Indicator (Circle with Icon and Number) */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border-4 border-background shadow-md">
                      <div className="w-14 h-14 rounded-full bg-primary-600 flex items-center justify-center text-white relative">
                        <IconComponent className="w-6 h-6" />
                        {/* Step number as an overlay on the icon circle */}
                        <div className="absolute -top-2 -right-2 bg-primary-600 rounded-full w-8 h-8 flex items-center justify-center border border-border text-sm font-bold text-white">
                          {step.number}
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="p-0 pb-6 flex flex-col items-center mt-10">
                    <CardTitle className="text-xl font-semibold text-foreground">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardDescription className="text-muted-foreground text-sm">{step.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div
          className={cn("mt-20 text-center transition-opacity duration-500", isInView ? "opacity-100" : "opacity-0")}
        >
          <h3 className="text-xl font-semibold text-foreground mb-3">Ready to get started?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Join thousands of users who are already managing their properties efficiently
          </p>
          <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-950">
            <Link to="/register">
              {" "}
              Create Your Account Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default LoginProcedureSection
