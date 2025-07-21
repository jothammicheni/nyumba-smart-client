"use client"

import type React from "react"
import { useTheme } from "./ThemeProvider.js"


import { Link, useLocation } from "react-router-dom"
import { Sun, Moon, Menu, LogIn } from "lucide-react"
import { Button } from "../components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "../components/ui/sheet"

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white dark:bg-gray-950/90 shadow-md fixed w-full z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl md:text-2xl font-bold text-primary-600 dark:text-primary-500">
                TenaHub
              </Link>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              to="/"
              className={`text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 font-medium transition-colors ${
                isActive("/") ? "text-primary-600 dark:text-primary-400 font-semibold" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/properties"
              className={`text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 font-medium transition-colors ${
                isActive("/properties") ? "text-primary-600 dark:text-primary-400 font-semibold" : ""
              }`}
            >
              Property Listing
            </Link>
            <Link
              to="/relocate-search-home"
              className={`text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 font-medium transition-colors ${
                isActive("/relocate-search-home") ? "text-primary-600 dark:text-primary-400 font-semibold" : ""
              }`}
            >
              Relocate/Home search
            </Link>
            <Link
              to="/about"
              className={`text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 font-medium transition-colors ${
                isActive("/about") ? "text-primary-600 dark:text-primary-400 font-semibold" : ""
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 font-medium transition-colors ${
                isActive("/contact") ? "text-primary-600 dark:text-primary-400 font-semibold" : ""
              }`}
            >
              Contact
            </Link>
             <Link
              to="/blogs"
              className={`text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 font-medium transition-colors ${
                isActive("/contact") ? "text-primary-600 dark:text-primary-400 font-semibold" : ""
              }`}
            >
              Our Blogs
            </Link>
              <Link to="/login" className="flex items-center text-primary-500 animate-pulse">
                <LogIn className="h-4 w-4 mr-2  text-primary-500" />
                Login
              </Link>
           
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-900" />
              )}
            </Button>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="mr-2"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-white dark:bg-gray-950/90">
                <div className="flex flex-col space-y-4 pt-8">
                  <SheetClose asChild>
                    <Link
                      to="/"
                      className={`block px-4 py-2 text-lg font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        isActive("/") ? "bg-gray-100 dark:bg-gray-800/50 font-semibold" : ""
                      }`}
                    >
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/properties"
                      className={`block px-4 py-2 text-lg font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        isActive("/properties") ? "bg-gray-100 dark:bg-gray-800/50 font-semibold" : ""
                      }`}
                    >
                      Property Listing
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/relocate-search-home"
                      className={`block px-4 py-2 text-lg font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        isActive("/relocate-search-home") ? "bg-gray-100 dark:bg-gray-800/50 font-semibold" : ""
                      }`}
                    >
                      Relocate/Home search
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/about"
                      className={`block px-4 py-2 text-lg font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        isActive("/about") ? "bg-gray-100 dark:bg-gray-800/50 font-semibold" : ""
                      }`}
                    >
                      About
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/contact"
                      className={`block px-4 py-2 text-lg font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        isActive("/contact") ? "bg-gray-100 dark:bg-gray-800/50 font-semibold" : ""
                      }`}
                    >
                      Contact
                    </Link>
                  </SheetClose>

 <SheetClose asChild>
                    <Link
                      to="/blogs"
                      className={`block px-4 py-2 text-lg font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        isActive("/contact") ? "bg-gray-100 dark:bg-gray-800/50 font-semibold" : ""
                      }`}
                    >
                      Our Blogs
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                <Link to="/login" className="flex items-center text-primary-500 animate-pulse ml-3 mr-3">
                <LogIn className="h-4 w-4 mr-2  text-primary-500" />
                Login
              </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
