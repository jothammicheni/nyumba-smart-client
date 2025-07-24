import type React from "react"
import { Target, Eye, Heart, Users, CheckCircle, Lightbulb } from "lucide-react"
import AboutPageSEO from "../SEO/AboutPageSEO.js"

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously seek new ways to improve our platform and solve real problems."
    },
    {
      icon: CheckCircle,
      title: "Integrity",
      description: "We operate with honesty and transparency in all our dealings."
    },
    {
      icon: Heart,
      title: "Customer-Centric",
      description: "We put our users' needs at the center of everything we do."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in the power of working together to create better solutions."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in all aspects of our service."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60">
      <AboutPageSEO/>
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#FBFBFB]/10 shadow-xl dark:bg-gray-950/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              About TenaHub
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 leading-relaxed">
              Transforming property management in Kenya with innovative technology
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-primary-600 dark:bg-primary-600/50 text-gray-900 dark:text-gray-200 rounded-full text-sm font-medium">
                Our Story
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Revolutionizing Property Management
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                TenaHub is a revolutionary property management platform designed specifically for the Kenyan market. Our
                mission is to simplify property management for landlords, provide a seamless experience for tenants, and
                create opportunities for agents and service providers.
              </p>
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Founded in 2023, TenaHub has quickly grown to become a trusted solution for property management across
                Kenya. Our platform combines innovative technology with local expertise to address the unique challenges of
                the Kenyan real estate market.
              </p>
            </div>
            <div className="relative">
              <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-6 transform rotate-3 hover:rotate-6 transition-transform duration-300 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=500&fit=crop&crop=center"
                  alt="Modern building representing TenaHub's innovative approach to property management"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">2024</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Founded</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="group">
            <div className="bg-[#FBFBFB] dark:bg-gray-900/70 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 h-full hover:scale-105 duration-300 ease-in-out">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-600/30 dark:bg-primary-600/30 rounded-xl flex items-center justify-center mr-4">
                  <Eye className="w-6 h-6 text-primary-600 dark:text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To be the leading property management platform in East Africa, empowering property owners, tenants, and
                service providers with technology that simplifies and enhances their experience.
              </p>
            </div>
          </div>

          <div className="group">
            <div className="bg-[#FBFBFB] dark:bg-gray-900/70 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 h-full hover:scale-105 duration-300 ease-in-out">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-600/30 dark:bg-primary-600/30 rounded-xl flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-primary-600 dark:text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To transform property management in Kenya by providing an all-in-one platform that streamlines rent
                collection, maintenance management, and communication between landlords and tenants.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-2 bg-primary-600/30 dark:bg-primary-600/30 text-primary-600 dark:text-primary-600 rounded-full text-sm font-medium mb-4">
            Our Foundation
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Our Core Values
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group bg-[#FBFBFB] dark:bg-gray-900/70 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700/40 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}>
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <value.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gray-900 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <h2 className="text-3xl md:text-3xl font-bold mb-4">
                Ready to Transform Your Property Management?
              </h2>
              <p className="text-xl mb-5 text-blue-100">
                Join thousands of property owners who trust TenaHub
              </p>
              <button className="bg-primary-600/20 pulse-animation text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300 hover:scale-105 ease-in-out">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
