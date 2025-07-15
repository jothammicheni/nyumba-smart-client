import { User, Shield, CreditCard, Bell } from "lucide-react"
import { useEffect, useState } from "react"
import { getAuthHeaders } from "../../../services/authService.js"
import axios from "axios"
import { Loader } from "../../../components/Loader.js"

export const ProviderSettings = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'billing'>('profile')
  const [loading, setLoading] = useState(false)
  const [providerInfo, setProviderInfo] = useState({
    provider: {
      name: '',
      email: '',
      phone: '',
      city: '',
    },
  })

  useEffect(() => {
    const fetchProviderInfo = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:5000/api/providers/info', {
          headers: getAuthHeaders(),
        })
        setProviderInfo(response.data.data)
      } catch (error) {
        console.error("Failed to load provider information:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProviderInfo()
  }, [])

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:5000/api/auth/update-me',
        {
          name: providerInfo.provider.name,
          email: providerInfo.provider.email,
          phone: providerInfo.provider.phone,
          city: providerInfo.provider.city,
        },
        { headers: getAuthHeaders() }
      )
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile.")
    }
  }

  const providerData = {
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-primary-600/20">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Account Settings</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your provider account preferences</p>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Settings sidebar */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-primary-600/20">
          <nav className="space-y-5 p-4">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full text-left 
              ${activeTab === 'profile' ? 'bg-primary-50 dark:bg-gray-950/40 text-primary-600 dark:text-primary-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary-600/20'}`}>
              <User className="h-5 w-5 mr-3" />
              Profile
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full text-left 
              ${activeTab === 'security' ? 'bg-primary-50 dark:bg-gray-950/40 text-primary-600 dark:text-primary-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary-600/20'}`}>
              <Shield className="h-5 w-5 mr-3" />
              Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full text-left 
                ${activeTab === 'notifications' ? 'bg-primary-50 dark:bg-gray-950/40 text-primary-600 dark:text-primary-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary-600/20'}`}>
              <Bell className="h-5 w-5 mr-3" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full text-left 
                ${activeTab === 'billing' ? 'bg-primary-50 dark:bg-gray-950/40 text-primary-600 dark:text-primary-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary-600/20'}`}>
              <CreditCard className="h-5 w-5 mr-3" />
              Billing & Payments
            </button>
          </nav>
        </div>

        {/* Settings content */}
        <div className="flex-1 p-6">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Profile Information</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your personal details</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-24 w-24 rounded-full object-cover"
                    src={providerData.profileImage}
                    alt="Profile"
                  />
                  <button className="mt-3 w-full text-sm p-2 rounded font-medium text-primary-600 dark:text-primary-600 hover:text-primary-600 dark:hover:bg-primary-600/10">
                    Change photo
                  </button>
                </div>

                <div className="flex-1 space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={providerInfo.provider.name}
                        onChange={(e) => setProviderInfo({
                          ...providerInfo,
                          provider: {
                            ...providerInfo.provider,
                            name: e.target.value
                          }
                        })}
                        className="block w-full rounded-md border border-gray-300 dark:border-gray-900/10 shadow-sm focus:border-primary-500 focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-950/50 p-2"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={providerInfo.provider.email}
                        onChange={(e) => setProviderInfo({
                          ...providerInfo,
                          provider: {
                            ...providerInfo.provider,
                            email: e.target.value
                          }
                        })}
                        className="block w-full rounded-md border border-gray-300 dark:border-gray-900/10 shadow-sm focus:border-primary-500 focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-950/50 p-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={providerInfo.provider.phone}
                        onChange={(e) => setProviderInfo({
                          ...providerInfo,
                          provider: {
                            ...providerInfo.provider,
                            phone: e.target.value
                          }
                        })}
                        className="block w-full rounded-md border border-gray-300 dark:border-gray-900/10 shadow-sm focus:border-primary-500 focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-950/50 p-2"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={providerInfo.provider.city}
                        onChange={(e) => setProviderInfo({
                          ...providerInfo,
                          provider: {
                            ...providerInfo.provider,
                            city: e.target.value
                          }
                        })}
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

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Security Settings</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account security</p>
              </div>

              <div className="space-y-5">
                <div className="p-4 bg-gray-50 dark:bg-gray-950/40 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 dark:text-white">Password</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last changed 3 months ago</p>
                    </div>
                    <button className="text-sm font-medium text-primary-600 dark:text-primary-600 hover:text-primary-600 dark:hover:bg-primary-600/20 p-2 rounded">
                      Change Password
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-950/40 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 dark:text-white">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add extra security to your account</p>
                    </div>
                    <button className="text-sm font-medium text-primary-600 dark:text-primary-600 hover:text-primary-600 dark:hover:bg-primary-600/20 p-2 rounded">
                      Enable 2FA
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-950/40 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 dark:text-white">Device Activity</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">3 active sessions</p>
                    </div>
                    <button className="text-sm font-medium text-primary-600 dark:text-primary-600 hover:text-primary-600 dark:hover:bg-primary-600/20 p-2 rounded">
                      View All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Notification Preferences</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage how you receive notifications</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email-notifications"
                      name="email-notifications"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email-notifications" className="font-medium text-gray-700 dark:text-gray-300">
                      Email Notifications
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">Receive important updates via email</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="sms-notifications"
                      name="sms-notifications"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="sms-notifications" className="font-medium text-gray-700 dark:text-gray-300">
                      SMS Notifications
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">Receive time-sensitive alerts via SMS</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="push-notifications"
                      name="push-notifications"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="push-notifications" className="font-medium text-gray-700 dark:text-gray-300">
                      Push Notifications
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">Receive app notifications on your device</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Billing Settings */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Billing & Payments</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your payment methods and billing information</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-950/40 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-2">Payment Methods</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">M-Pesa (•••• 2547)</span>
                    </div>
                  </div>
                  <button className="mt-2 text-sm font-medium text-primary-600 dark:text-primary-600 hover:text-primary-600 dark:hover:bg-primary-600/20 p-2 rounded">
                    Edit
                  </button>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-950/40 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-2">Billing History</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">View and download your past invoices</p>
                  <button className="mt-2 text-sm font-medium text-primary-600 dark:text-primary-600 hover:text-primary-600 dark:hover:bg-primary-600/20 p-2 rounded">
                    View All Statements
                  </button>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-950/40 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-2">Tax Information</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Update your tax details for commission payments</p>
                  <button className="mt-2 text-sm font-medium text-primary-600 dark:text-primary-600 hover:text-primary-600 dark:hover:bg-primary-600/20 p-2 rounded">
                    Update Tax Info
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}