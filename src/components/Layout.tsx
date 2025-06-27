import type React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

interface LayoutProps {
  includeNavbar?: boolean
  includeFooter?: boolean
}

const Layout: React.FC<LayoutProps> = ({ includeNavbar = true, includeFooter = true }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {includeNavbar && <Navbar />}
      <main className={`flex-grow ${includeNavbar ? "pt-16" : ""}`}>
        <Outlet />
      </main>
      {includeFooter && <Footer />}
    </div>
  )
}

export default Layout
