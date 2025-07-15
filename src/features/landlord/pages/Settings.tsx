/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { settingsService } from "../../../services/settingsService.js"

type Section = "profile" | "account" | "notifications" | "paymentPhone"

interface UserSettings {
  name: string
  email: string
  phone: string
  payoutPhone?: string
}

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>("profile")
  const [settings, setSettings] = useState<UserSettings | null>(null)

  // Form state
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [paymentPhone, setPaymentPhone] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [paymentPhoneError, setPaymentPhoneError] = useState("")
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  // Show/hide password toggles
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const data = await settingsService.getCurrentUserSettings()
      setSettings(data)
      setUsername(data.name)
      setEmail(data.email)
      setPaymentPhone(data.payoutPhone || "")
    } catch (err: any) {
      toast.error("Failed to load settings: " + err.message)
    }
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await settingsService.updateProfile({ name: username, email })
      toast.success("Profile updated!")
      setSuccessMsg("Profile updated successfully!")
    } catch (err: any) {
      toast.error("Failed to update profile: " + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  const handleSavePaymentPhone = async (e: React.FormEvent) => {
    e.preventDefault()
    setPaymentPhoneError("")

    if (!paymentPhone.match(/^\d{10,15}$/)) {
      setPaymentPhoneError("Enter a valid phone number (10-15 digits)")
      return
    }

    setLoading(true)
    try {
      const data = await settingsService.updatePaymentPhone(paymentPhone)
      toast.success(data.message)
      setSuccessMsg("Payment phone updated successfully!")
    } catch (err: any) {
      toast.error("Failed to update phone: " + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")
    setSuccessMsg("")

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords don't match")
      return
    }

    setLoading(true)
    try {
      const res = await settingsService.changePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      })

      toast.success(res.message || "Password updated successfully!")
      setSuccessMsg("Password updated successfully!")
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err: any) {
      toast.error("Failed to update password: " + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  const handleSectionChange = (section: Section) => {
    setActiveSection(section)
    setSuccessMsg("")
    setPasswordError("")
    setPaymentPhoneError("")
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-md p-6 flex flex-col">
        <h2 className="text-2xl font-semibold mb-6 text-primary-600 dark:text-primary-400 cursor-default">Settings</h2>
        <nav className="flex flex-col space-y-3 text-gray-700 dark:text-gray-300">
          <button
            onClick={() => handleSectionChange("profile")}
            className={`text-left py-2 px-3 rounded-md w-full ${
              activeSection === "profile"
                ? "bg-primary-600 dark:bg-primary-500 text-white font-medium"
                : "hover:bg-primary-100 dark:hover:bg-primary-700"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => handleSectionChange("account")}
            className={`text-left py-2 px-3 rounded-md w-full ${
              activeSection === "account"
                ? "bg-primary-600 dark:bg-primary-500 text-white font-medium"
                : "hover:bg-primary-100 dark:hover:bg-primary-700"
            }`}
          >
            Account
          </button>
          <button
            onClick={() => handleSectionChange("notifications")}
            className={`text-left py-2 px-3 rounded-md w-full ${
              activeSection === "notifications"
                ? "bg-primary-600 dark:bg-primary-500 text-white font-medium"
                : "hover:bg-primary-100 dark:hover:bg-primary-700"
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => handleSectionChange("paymentPhone")}
            className={`text-left py-2 px-3 rounded-md w-full ${
              activeSection === "paymentPhone"
                ? "bg-red-600 dark:bg-red-700 text-white font-semibold"
                : "hover:bg-red-100 dark:hover:bg-red-700 text-red-700 dark:text-red-400"
            }`}
          >
            ⚠️ Update Payment Phone
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 max-w-4xl mx-auto w-full">
        {/* Success message */}
        {successMsg && (
          <div className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 p-3 rounded mb-6">
            {successMsg}
          </div>
        )}

        {/* Sections */}
        {activeSection === "profile" && (
          <>
            <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
            <form onSubmit={handleSaveProfile} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500 outline-none text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500 outline-none text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 rounded bg-primary-600 text-white font-semibold transition ${
                    loading ? "opacity-60 cursor-not-allowed" : "hover:bg-primary-700"
                  }`}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </>
        )}

        {activeSection === "account" && (
           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">🔒 Change Password</h3>
      <form onSubmit={handlePasswordChange} className="space-y-6">
        {/* Current Password */}
        <div>
          <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.old ? "text" : "password"}
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              placeholder="Enter current password"
              className="w-full px-4 py-2 pr-10 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPasswords({ ...showPasswords, old: !showPasswords.old })}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              {showPasswords.old ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.new ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="e.g. *Bma8ku#"
              className="w-full px-4 py-2 pr-10 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              {showPasswords.new ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 pr-10 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              {showPasswords.confirm ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Error */}
        {passwordError && <p className="text-sm text-red-600 dark:text-red-400">{passwordError}</p>}

        {/* Success/Error Message */}
        {successMsg && (
          <p className="text-sm text-green-600 dark:text-green-400">
            {successMsg}
          </p>
        )}
        {passwordError && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {passwordError}
          </p>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded bg-primary-600 text-white font-semibold transition ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-primary-700"
            }`}
          >
            {loading ? "Saving..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
        )}

        {activeSection === "notifications" && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                className="h-5 w-5 text-primary-600 dark:text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span>Enable email notifications</span>
            </label>
          </div>
        )}

        {activeSection === "paymentPhone" && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-red-600 dark:border-red-700">
            <h3 className="text-xl font-semibold mb-4 text-red-700 dark:text-red-400 flex items-center gap-2">
              ⚠️ Update Payment Phone <span className="text-sm font-normal">(Danger Zone — must be correct)</span>
            </h3>

            {/* Display Current Payment Phone */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Current Payment Phone</p>
              <div className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono">
                {settings?.payoutPhone || "Not set"}
              </div>
            </div>

            {/* Form to Update Payment Phone */}
            <form onSubmit={handleSavePaymentPhone} className="space-y-6">
              <div>
                <label htmlFor="paymentPhone" className="block text-sm font-medium mb-1 text-red-700 dark:text-red-400">
                  New Payment Phone Number
                </label>
                <input
                  id="paymentPhone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={paymentPhone}
                  onChange={(e) => setPaymentPhone(e.target.value)}
                  className={`w-full px-4 py-2 rounded border ${
                    paymentPhoneError ? "border-red-600 dark:border-red-400" : "border-gray-300 dark:border-gray-700"
                  } bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-red-600 dark:focus:ring-red-400 outline-none text-gray-900 dark:text-gray-100`}
                />
                {paymentPhoneError && (
                  <p className="mt-1 text-red-600 dark:text-red-400 text-sm">{paymentPhoneError}</p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 rounded bg-red-600 text-white font-semibold transition ${
                    loading ? "opacity-60 cursor-not-allowed" : "hover:bg-red-700"
                  }`}
                >
                  {loading ? "Saving..." : "Update Phone"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}

export default Settings