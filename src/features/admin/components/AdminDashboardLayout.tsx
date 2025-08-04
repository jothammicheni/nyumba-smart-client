"use client"
import type React from "react"
import { useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { useTheme } from "../../../components/ThemeProvider.js"
import { useAuth } from "../../../context/AuthContext.js"
import { useNavigate } from "react-router-dom"
import {
  BarChart,
  Users,
  Building,
  CreditCard,
  Settings,
  X,
  LogOut,
  Menu,
  Shield,
  Activity,
  Wrench,
  HelpCircle,
  UserCog,
  Bell,
  TrendingUp,
  Database,
} from "lucide-react"

interface NavItem {
  to: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  permission?: string
}

export default function AdminDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  const allNavItems: NavItem[] = [
    {
      to: "",
      label: "Dashboard",
      icon: BarChart,
    },
    {
      to: "users",
      label: "User Management",
      icon: Users,
      permission: "users",
    },
    {
      to: "properties",
      label: "Properties",
      icon: Building,
      permission: "properties",
    },
    {
      to: "payments",
      label: "Payments & Finance",
      icon: CreditCard,
      permission: "finance",
    },
    {
      to: "service-providers",
      label: "Service Providers",
      icon: Wrench,
      permission: "service_providers",
    },
    {
      to: "verifications",
      label: "Verifications",
      icon: Shield,
      permission: "verifications",
    },
    {
      to: "activity-logs",
      label: "Activity Logs",
      icon: Activity,
      permission: "activity",
    },
    {
      to: "reports",
      label: "Reports & Analytics",
      icon: TrendingUp,
      permission: "reports",
    },
    {
      to: "system-settings",
      label: "System Settings",
      icon: Database,
      permission: "system",
    },
    {
      to: "notifications",
      label: "Notifications",
      icon: Bell,
      permission: "notifications",
    },
    {
      to: "support",
      label: "Help & Support",
      icon: HelpCircle,
      permission: "support",
    },
    {
      to: "settings",
      label: "Admin Settings",
      icon: Settings,
    },
  ]

  const getVisibleNavItems = (): NavItem[] => {
    if (!user) return []

    // Admin has access to all items
    if (user.role === "admin") {
      return allNavItems
    }

    // For other roles, filter based on permissions if needed
    return allNavItems.filter((item) => {
      if (!item.permission) return true
      return user.permissions?.includes(item.permission)
    })
  }

  const visibleNavItems = getVisibleNavItems()

  function isActive(path: string) {
    const currentPath = location.pathname.replace(/\/+$/, "")
    if (path === "" || path === "/admin/dashboard") {
      return currentPath === "/admin/dashboard"
    }
    const expectedPath = `/admin/dashboard/${path}`
    return currentPath === expectedPath || currentPath.startsWith(`${expectedPath}/`)
  }

  function getActiveClass(path: string) {
    return isActive(path)
      ? "bg-red-600 text-white"
      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-red-600/20"
  }

  const handleNavClick = () => {
    setSidebarOpen(false)
  }

  const NavItems = ({ onClick }: { onClick?: () => void }) => (
    <nav className="px-2 py-4 space-y-4">
      {visibleNavItems.map((item) => {
        const IconComponent = item.icon
        return (
          <Link
            key={item.to || "dashboard"}
            to={item.to}
            onClick={onClick}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${getActiveClass(item.to)}`}
          >
            <IconComponent className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        )
      })}

      {process.env.NODE_ENV === "development" && user?.role === "admin" && (
        <div className="mt-4 p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
          <p className="text-xs text-red-600 dark:text-red-400 font-medium">Admin Panel</p>
          <p className="text-xs text-red-500 dark:text-red-300 break-words">Full System Access</p>
        </div>
      )}
    </nav>
  )

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-red-600/20 flex flex-col z-50 max-w-[80vw]">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-red-600/20 flex-shrink-0">
              <div className="flex items-center">
                <span className="text-xl font-bold text-red-600 dark:text-red-500 truncate">TenaHub</span>
                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs font-medium rounded">
                  ADMIN
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <NavItems onClick={handleNavClick} />
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-red-600/20 flex-shrink-0">
              <button
                onClick={handleLogout}
                className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 w-full"
              >
                <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="truncate">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 border-r border-gray-200 dark:border-red-600/20 bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60">
          <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-red-600/20 flex-shrink-0">
            <span className="text-xl font-bold text-red-600 dark:text-red-500">TenaHub</span>
            <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs font-medium rounded">
              ADMIN
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <NavItems />
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-red-600/20 flex-shrink-0">
            <div className="mb-3 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md">
              <p className="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user?.name}</p>
              <p className="text-xs text-red-600 dark:text-red-400 capitalize flex items-center">
                <UserCog className="w-3 h-3 mr-1" />
                {user?.role}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500"
            >
              <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">Sign out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 lg:pl-64 min-w-0">
        {/* Mobile header */}
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60 shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 lg:hidden flex-shrink-0"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 flex justify-between px-4 min-w-0">
            <div className="flex-1 flex items-center min-w-0">
              <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                Admin Panel - Welcome back,{" "}
                <span className="font-medium text-gray-900 dark:text-gray-100">{user?.name}</span>
                <span className="ml-2 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs rounded-full whitespace-nowrap">
                  Administrator
                </span>
              </div>
            </div>
            <div className="ml-4 flex items-center flex-shrink-0">
              <button
                type="button"
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <span className="sr-only">Switch to light mode</span>
                ) : (
                  <span className="sr-only">Switch to dark mode</span>
                )}
                {theme === "dark" ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
