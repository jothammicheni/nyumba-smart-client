"use client"

import type React from "react"
import { useState } from "react"
import { useTheme } from "./ThemeProvider"
import { Link, useLocation } from "react-router-dom"
import { Sun, Moon, Menu, LogIn, X, ChevronDown } from "lucide-react"
import { Button } from "./ui/button"

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHoveringMenu, setIsHoveringMenu] = useState(false)

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const mainLinks = [
    { to: "/properties", label: "Property Listing" },
    { to: "/relocate-search-home", label: "Relocate" },
  ]

  const secondaryLinks = [
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/blogs", label: "Our Blogs" },
  ]

  return (
    <nav className="bg-white dark:bg-gray-950/90 shadow-md fixed w-full z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex justify-center items-center">
            <Link
              to="/"
              className="flex flex-col lg:text-2xl sm:text-xl font-bold pl-1 text-primary-600 dark:text-primary-500"
            >
              TenaHub
              <span className="text-xs text-center font-light text-gray-900 dark:text-gray-200">𝑅𝑒𝓁𝒾𝒶𝒷𝓁𝑒 𝒫𝓇𝑜𝓅𝑒𝓇𝓉𝓎 𝒫𝒶𝓇𝓉𝓃𝑒𝓇</span>
            </Link>
          </div>

          {/* Desktop Navigation - Visible on md screens and up */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Main Links */}
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 text-sm font-medium hover:text-primary-600 dark:hover:text-primary-600 transition-colors duration-300
                  ${isActive(link.to) ? "text-primary-600 dark:text-primary-500 font-semibold" : "text-gray-700 dark:text-gray-300"}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Dropdown Menu for Secondary Links */}
            <div
              className="relative"
              onMouseEnter={() => setIsHoveringMenu(true)}
              onMouseLeave={() => setIsHoveringMenu(false)}
            >
              <Button variant="ghost" className="flex items-center gap-1 dark:hover:bg-primary-600/20">
                <span>More</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isHoveringMenu ? "rotate-180 duration-300" : ""}`} />
              </Button>

              {isHoveringMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-950/90 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-800">
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-primary-600/20
                        ${isActive(link.to) ? "text-primary-600 dark:text-primary-500" : "text-gray-700 dark:text-gray-300"}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Login Button */}
            <Link
              to="/login"
              className="flex items-center gap-1 px-3.5 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors duration-300"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="dark:hover:bg-primary-600/20"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-900" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation - Visible on sm screens and down */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="h-7 w-7 text-yellow-500" />
              ) : (
                <Moon className="h-7 w-7 text-gray-900" />
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm
          flex flex-col items-center justify-center transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-y-0" : "-translate-y-full"} md:hidden`}
        aria-hidden={!isMenuOpen}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
          className="absolute top-10 right-10 hover:bg-red-600"
        >
          <X className="h-7 w-7" />
        </Button>

        <div className="flex flex-col space-y-6 text-center">
          {[...mainLinks, ...secondaryLinks].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={`text-2xl font-medium text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gray-900 p-2 rounded dark:hover:text-primary-600 transition-colors duration-300 ease-in-out
                ${isActive(link.to) ? "text-primary-600 dark:text-primary-600 font-semibold" : "p-2"}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center justify-center p-2 text-white bg-primary-600/70 animate-pulse rounded-md mt-8 mx-auto w-fit"
          >
            <LogIn className="h-5 w-5 mr-2 text-white" />
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
