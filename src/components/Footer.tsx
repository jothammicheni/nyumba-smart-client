
import type React from "react"
import { Link } from "react-router-dom"
import { Mail, Phone, MapPin } from "lucide-react"
import { BsInstagram, BsTwitterX, BsWhatsapp } from "react-icons/bs";
import { FiFacebook } from "react-icons/fi";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950 to-gray-950"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-primary-600 mb-4">
                TenaHub
              </h3>
              <p className="text-gray-300 text-base leading-relaxed max-w-md">
                Transforming property management in Kenya with innovative technology solutions for landlords and tenants.
              </p>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="text-base font-light text-white mb-3">Subscribe to receive our latest news:</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800/30 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-transparent transition-all duration-300"
                />
                <button className="px-6 py-3 bg-primary-600 pulse-animation text-white rounded-lg font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="group bg-gray-800/50 p-3 rounded-full border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:bg-blue-500/10">
                  <FiFacebook className="h-5 w-5 text-gray-300 group-hover:text-blue-400 transition-colors duration-300" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a 
                  href="#" 
                  className="group bg-gray-800/50 p-3 rounded-full border border-gray-700 hover:border-gray-700 transition-all duration-300 hover:bg-gray-950">
                  <BsTwitterX className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a 
                  href="#" 
                  className="group bg-gray-800/50 p-3 rounded-full border border-gray-700 hover:border-pink-500 transition-all duration-300 hover:bg-pink-500/10">
                  <BsInstagram className="h-5 w-5 text-gray-300 group-hover:text-pink-400 transition-colors duration-300" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a 
                  href="#" 
                  className="group bg-gray-800/50 p-3 rounded-full border border-gray-700 hover:border-green-500 transition-all duration-300 hover:bg-green-500/10">
                  <BsWhatsapp className="h-5 w-5 text-gray-300 group-hover:text-green-400 transition-colors duration-300" />
                  <span className="sr-only">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-20 h-0.5 bg-gradient-to-r from-primary-500 to-primary-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="group text-gray-300 hover:text-white transition-all duration-300 flex items-center">
                  <span className="w-0 group-hover:w-3 h-0.5 bg-primary-500 rounded-full transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/properties" 
                  className="group text-gray-300 hover:text-white transition-all duration-300 flex items-center">
                  <span className="w-0 group-hover:w-3 h-0.5 bg-primary-500 rounded-full transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  Property Listing
                </Link>
              </li>
               <li>
                <Link 
                  to="/service/marketplace" 
                  className="group text-gray-300 hover:text-white transition-all duration-300 flex items-center">
                  <span className="w-0 group-hover:w-3 h-0.5 bg-primary-500 rounded-full transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  service MarketPlace
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="group text-gray-300 hover:text-white transition-all duration-300 flex items-center">
                  <span className="w-0 group-hover:w-3 h-0.5 bg-primary-500 rounded-full transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="group text-gray-300 hover:text-white transition-all duration-300 flex items-center">
                  <span className="w-0 group-hover:w-3 h-0.5 bg-primary-500 rounded-full transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  Contact
                </Link>
              </li>
                <li>
                <Link 
                  to="/blogs" 
                  className="group text-gray-300 hover:text-white transition-all duration-300 flex items-center">
                  <span className="w-0 group-hover:w-3 h-0.5 bg-primary-500 rounded-full transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  Our Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Our Services
              <div className="absolute bottom-0 left-0 w-20 h-0.5 bg-gradient-to-r from-primary-500 to-primary-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/services/property-management"
                  className="group text-gray-300 hover:text-white transition-all duration-300 flex items-center">
                  <span className="w-0 group-hover:w-3 h-0.5 bg-primary-500 rounded-full transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  Property Management
                </Link>
              </li>
              <li>
                <Link
                  to="/services/rent-collection"
                  className="group text-gray-300 hover:text-white transition-all duration-300 flex items-center">
                  <span className="w-0 group-hover:w-3 h-0.5 bg-primary-500 rounded-full transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  Rent Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/services/maintenance"
                  className="group text-gray-300 hover:text-white transition-all duration-300 flex items-center">
                  <span className="w-0 group-hover:w-3 h-0.5 bg-primary-500 rounded-full transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  Maintenance Tracking
                </Link>
              </li>
              <li>
                <Link
                  to="/services/user-portals"
                  className="group text-gray-300 hover:text-white transition-all duration-300 flex items-center">
                  <span className="w-0 group-hover:w-3 h-0.5 bg-primary-500 rounded-full transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  Tenant Portal
                </Link>
              </li>
              <li>
                <Link
                  to="/services/agent-referrals"
                  className="group text-gray-300 hover:text-white transition-all duration-300 flex items-center">
                  <span className="w-0 group-hover:w-3 h-0.5 bg-primary-500 rounded-full transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  Agent Referrals
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="mt-16 pt-10 border-t rounded-md border-primary-600/20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-white mb-6">Get In Touch</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="group bg-gray-800/30 p-6 rounded-xl border border-gray-800 hover:border-gray-800/50 transition-all duration-300 hover:bg-gray-800/50">
                  <div className="flex items-start">
                    <div className="bg-primary-500/10 p-3 rounded-lg mr-4 group-hover:bg-primary-500/20 transition-colors duration-300">
                      <MapPin className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Address</h4>
                      <p className="text-gray-300 text-sm">Moi Avenue, Nairobi, Kenya</p>
                    </div>
                  </div>
                </div>

                <div className="group bg-gray-800/30 p-6 rounded-xl border border-gray-800 hover:border-gray-800/50 transition-all duration-300 hover:bg-gray-800/50">
                  <div className="flex items-start">
                    <div className="bg-primary-500/10 p-3 rounded-lg mr-4 group-hover:bg-primary-500/20 transition-colors duration-300">
                      <Phone className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Phone</h4>
                      <a href="tel:+254795969757"><p className="text-gray-300 text-sm">+254 795 969757</p></a>
                      <a href="tel:+254113730593"><p className="text-gray-300 text-sm">+254 113 730593</p></a>
                    </div>
                  </div>
                </div>

                <div className="group bg-gray-800/30 p-6 rounded-xl border border-gray-800/50 hover:border-gray-800/50 transition-all duration-300 hover:bg-gray-800/50">
                  <div className="flex items-start">
                    <div className="bg-primary-500/10 p-3 rounded-lg mr-4 group-hover:bg-primary-500/20 transition-colors duration-300">
                      <Mail className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-white font-medium mb-1">Email</h4>
                      <a href="mailto:info@tenahub.co.ke"><p className="text-gray-300 text-sm truncate">info@tenahub.co.ke</p></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="bg-gradient-to-br from-gray-500/10 to-gray-500/10 p-5 rounded-xl border border-gray-900/20">
                <h4 className="text-base font-bold text-white mb-3">Ready to Get Started?</h4>
                <p className="text-gray-300 mb-4 text-sm">Join thousands of property owners using TenaHub</p>
                <Link
                  to="/register"
                  className="inline-flex pulse-animation items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 md:py-3 md:text-lg md:px-10 transition duration-300">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/50 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-base font-light text-gray-400">&copy; {new Date().getFullYear()} TenaHub. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors duration-300">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer