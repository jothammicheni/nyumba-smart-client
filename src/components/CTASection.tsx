import type React from "react"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { Link } from "react-router-dom"
import { Building, CreditCard, Users, Shield, ArrowRight, Wifi, Wrench, Zap, CircleDot } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

const CTASection: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Unsplash image URLs
  const unsplashImages = {
    propertyMgmt: "https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2UlMjBmb3IlMjBzYWxlfGVufDB8fDB8fHww",
    digitalPayments: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tenantServices: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    referralServices: "https://images.unsplash.com/photo-1634757439914-23b8acb9d411?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2UlMjBmb3IlMjBzYWxlfGVufDB8fDB8fHww",
  }

  const services = [
    {
      icon: Building,
      title: "Property Management",
      description: "End-to-end solutions for landlords and property managers",
      longDescription: "Our comprehensive property management tools help you automate routine tasks, track vacancies, and manage leases efficiently.",
      image: unsplashImages.propertyMgmt,
      features: ["Automated rent collection", "Maintenance tracking", "Financial reporting"]
    },
    {
      icon: CreditCard,
      title: "Digital Secure Mobile Payments",
      description: "Secure, instant payment processing via M-Pesa",
      longDescription: "Streamline your rent collection with our seamless M-Pesa integration with automated receipts and real-time notifications.",
      image: unsplashImages.digitalPayments,
      features: ["Automated receipts", "Payment reminders", "Transaction history"]
    },
    {
      icon: Users,
      title: "Advanced Tenant Management",
      description: "Modern portal for tenant convenience",
      longDescription: "Enhance tenant experience with our self-service portal available 24/7 from any device.",
      image: unsplashImages.tenantServices,
      features: ["Maintenance requests", "Document storage", "Direct messaging"]
    },
    {
      icon: Users,
      title: "Profitable Referral System",
      description: "Extensive network of trusted service providers",
      longDescription: "Build a sustainable income stream with our comprehensive referral program and partnership opportunities.",
      image: unsplashImages.referralServices,
      features: ["Maintenance requests", "Document storage", "Direct messaging"]
    }
  ]

  const serviceProviders = [
    { icon: Wifi, title: "Internet Providers", badge: "High-speed" },
    { icon: Wrench, title: "Plumbers", badge: "Licensed" },
    { icon: Zap, title: "Electricians", badge: "Certified" },
    { icon: Shield, title: "Security", badge: "Trusted" }
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-white via-white to-gray-100 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <Card className={`text-center mb-16 border-0 shadow-none bg-transparent transition-opacity duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-bold">
              Our Comprehensive Property Solutions
            </CardTitle>
            <CardDescription className="text-xl max-w-3xl mx-auto">
              Everything you need to manage properties efficiently and connect with trusted service providers
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Services with Alternating Layout */}
        <div className="space-y-12 mb-20">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 p-0 overflow-hidden dark:bg-gray-950/40 transition-opacity duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} h-full`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 duration-300 ease-in-out"
                  loading="lazy"
                />
              </div>
              <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} p-8`}>
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-lg bg-primary-600 dark:bg-gray-900 text-white dark:text-primary-600 mr-4">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.longDescription}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CircleDot className="h-4 w-4 text-gray-900 mt-0.5 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="link" className="text-white bg-primary-600 dark:bg-white dark:text-gray-950 hover:shadow-md" asChild>
                  <Link to={`/services#${service.title.toLowerCase().replace(' ', '-')}`}>
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Service Providers Section */}
        <Card className={`mb-16 transition-opacity duration-500 bg-transparent dark:border-gray-800/20 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Connect With Trusted Service Providers</CardTitle>
            <CardDescription>We've vetted hundreds of professionals for your properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {serviceProviders.map((provider, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow dark:bg-gray-950/50 dark:border-gray-800 hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-primary-100 dark:bg-gray-900 text-primary-600 dark:text-primary-600 mb-3">
                      <provider.icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-bold">{provider.title}</h4>
                    <Badge variant="secondary" className="mt-2">{provider.badge}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className={`text-center transition-opacity duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Streamline Your Property Management?</CardTitle>
              <CardDescription className="text-xl">
                Join thousands of property owners using our platform
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild className="bg:gray-900 hover:gray-950">
                <Link to="/register">Get Started Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/service-providers">Browse Providers</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default CTASection