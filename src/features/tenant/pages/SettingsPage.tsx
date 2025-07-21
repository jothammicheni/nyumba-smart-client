/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, Shield, CreditCard, Bell } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"
import { getAuthHeaders } from "../../../services/authService.js"
import { Loader } from "../../../components/Loader.js"

const TenantSettings = () => {
  const [tenantInfo, setTenantInfo] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'billing'>('profile')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTenantInfo = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tenants/info", {
          headers: getAuthHeaders(),
        })
        setTenantInfo(response.data)
      } catch (error) {
        console.error("Error fetching tenant info:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTenantInfo()
  }, [])

  const handleSave = async () => {
    try {
      await axios.put('https://nyumba-smart-server.onrender.com/api/auth/update-me',
        {
          name: tenantInfo.tenantName,
          email: tenantInfo.tenentEmail,
          phone: tenantInfo.tenantPhone,
          city: tenantInfo.tenantCity,
        },
        { headers: getAuthHeaders() }
      )
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile.")
    }
  }

  if (loading) return <div className="flex justify-center py-10"><Loader /></div>

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-primary-600/20">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Account Settings</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your tenant account preferences</p>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-primary-600/20">
          <nav className="space-y-5 p-4">
            {['profile', 'security', 'notifications', 'billing'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full text-left 
                  ${activeTab === tab
                    ? 'bg-primary-50 dark:bg-gray-950/40 text-primary-600 dark:text-primary-600'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary-600/20'
                  }`}>
                {tab === 'profile' && <User className="h-5 w-5 mr-3" />}
                {tab === 'security' && <Shield className="h-5 w-5 mr-3" />}
                {tab === 'notifications' && <Bell className="h-5 w-5 mr-3" />}
                {tab === 'billing' && <CreditCard className="h-5 w-5 mr-3" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Profile Information</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your personal details</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={tenantInfo.tenantName}
                        onChange={(e) => setTenantInfo({ ...tenantInfo, name: e.target.value })}
                        className="block w-full rounded-md border border-gray-300 dark:border-gray-900/10 shadow-sm focus:border-primary-500 focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-950/50 p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <input
                        type="email"
                        value={tenantInfo.tenantEmail}
                        onChange={(e) => setTenantInfo({ ...tenantInfo, email: e.target.value })}
                        className="block w-full rounded-md border border-gray-300 dark:border-gray-900/10 shadow-sm focus:border-primary-500 focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-950/50 p-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={tenantInfo.tenantPhone}
                        onChange={(e) => setTenantInfo({ ...tenantInfo, phone: e.target.value })}
                        className="block w-full rounded-md border border-gray-300 dark:border-gray-900/10 shadow-sm focus:border-primary-500 focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-950/50 p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                      <input
                        type="text"
                        value={tenantInfo.tenantCity}
                        onChange={(e) => setTenantInfo({ ...tenantInfo, city: e.target.value })}
                        className="block w-full rounded-md border border-gray-300 dark:border-gray-900/10 shadow-sm focus:border-primary-500 focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-950/50 p-2"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">Security Settings</h3>
              <div className="p-4 bg-gray-50 dark:bg-gray-950/40 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 dark:text-white">Password</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last changed recently</p>
                  </div>
                  <button className="text-sm font-medium text-primary-600 dark:text-primary-600 hover:bg-primary-600/10 p-2 rounded">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">Notification Preferences</h3>
              <div className="space-y-4">
                {['Email Alerts', 'SMS Notifications', 'Push Notifications'].map((label, idx) => (
                  <label key={idx} className="flex items-start gap-3">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                  </label>
                ))}
                <button className="inline-flex items-center px-4 py-2 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">Billing & Payments</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">You don’t have any billing history yet.</p>
              <button className="text-sm font-medium text-primary-600 dark:text-primary-600 hover:bg-primary-600/10 p-2 rounded">
                Add Payment Method
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TenantSettings
