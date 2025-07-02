"use client"

import type React from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTheme } from "./ThemeProvider.js"
import { Sun, Moon, Menu, X, LogIn } from "lucide-react"

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white dark:bg-gray-950/90 shadow-md fixed w-full z-50">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="lg:text-2xl sm:text-xl font-bold pl-4 text-primary-500 dark:text-primary-400">
                𝙽𝚢𝚞𝚖𝚋𝚊𝚂𝚖𝚊𝚛𝚝
              </Link>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-900 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 font-medium ${isActive("/") ? "text-primary-500 dark:text-primary-400" : ""
                }`}
            >
              𝙷𝚘𝚖𝚎
            </Link>
            <Link
              to="/properties"
              className={`text-gray-900 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 font-medium ${isActive("/properties") ? "text-primary-500 dark:text-primary-400" : ""
                }`}
            >
              𝙿𝚛𝚘𝚙𝚎𝚛𝚝𝚢 𝙻𝚒𝚜𝚝𝚒𝚗𝚐
            </Link>
            <Link
              to="/about"
              className={`text-gray-900 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 font-medium ${isActive("/about") ? "text-primary-500 dark:text-primary-400" : ""
                }`}
            >
              𝙰𝚋𝚘𝚞𝚝
            </Link>
            <Link
              to="/contact"
              className={`text-gray-900 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 font-medium ${isActive("/contact") ? "text-primary-500 dark:text-primary-400" : ""
                }`}
            >
              𝙲𝚘𝚗𝚝𝚊𝚌𝚝
            </Link>
            <Link
              to="/login"
              className=" flex items-center justify-center text-white bg-primary-500 hover:bg-primary-600 px-3 py-2 rounded-md font-medium transition-colors"
            >
              <LogIn className="lg:h-4 lg:w-4 sm:h-3 sm:w-3  mr-2" />
              𝙻𝚘𝚐𝚒𝚗
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-900/20 dark:hover:bg-gray-800 focus:outline-none"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-900" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-800 focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900/70 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${isActive("/") ? "bg-gray-200 dark:bg-gray-800/50" : ""
                }`}
            >
              Home
            </Link>
            <Link
              to="/properties"
              className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${isActive("/properties") ? "bg-gray-200 dark:bg-gray-800/50" : ""
                }`}
            >
              Property Listing
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${isActive("/about") ? "bg-gray-200 dark:bg-gray-800/50" : ""
                }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${isActive("/contact") ? "bg-gray-200 dark:bg-gray-800/50" : ""
                }`}
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="flex items-center w-full text-white text-center justify-center bg-primary-500 hover:bg-primary-600 px-3 py-2 rounded-md font-medium transition-colors mr-2"
            >
              <LogIn className="lg:h-4 lg:w-4 sm:h-3 sm:w-3 mr-1" />
              𝙻𝚘𝚐𝚒𝚗
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar