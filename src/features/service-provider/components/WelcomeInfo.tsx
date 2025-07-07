import { useEffect, useState } from 'react'
import { CircleAlert } from 'lucide-react'
import axios from 'axios'
import { getAuthHeaders } from '../../../services/authService.js'
import { Loader } from '../../../components/Loader.js';

const availabilityColors: Record<string, string> = {
  available: "bg-green-200 text-green-800",
  busy: "bg-yellow-200 text-yellow-800",
  unavailable: "bg-red-200 text-red-800",
};

export default function WelcomeInfo() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [providerInfo, setProviderInfo] = useState({
    provider: {
      _id: '',
      name: '',
      email: '',
      phone: '',
      city: '',
      service_category: '',
      joinDate: '',
      createdAt: '',
      availability: 'available'
    },
    stats: {
      completionRate: '0',
    }
  })
  const [availability, setAvailability] = useState(providerInfo.provider.availability || 'available');


  useEffect(() => {
    const fetchProviderInfo = async () => {
      setLoading(true)
      setError('')
      try {
        console.log('Auth Headers:', getAuthHeaders())
        const response = await axios.get('http://localhost:5000/api/providers/info', {
          headers: getAuthHeaders(),
        })
        setProviderInfo(response.data.data)
        console.log('API Response Profile Data:', response.data.data);

      } catch (error) {
        console.error("Failed to load provider information:", error)
        setError('Failed to load provider information')
      } finally {
        setLoading(false)
      }
    }

    fetchProviderInfo()
  }, [])

  useEffect(() => {
    if (providerInfo.provider.availability) {
      setAvailability(providerInfo.provider.availability);
    }
  }, [providerInfo.provider.availability]);

  const handleAvailability = async (userId: string, newStatus: string) => {
    setLoading(true)
    try {
      const res = await axios.put(`/api/providers/${userId}/availability`,
        { availability: newStatus },
        { headers: getAuthHeaders() }
      );

      const updatedProvider = res.data;
      setAvailability(newStatus)
      setProviderInfo((prev) => ({
        ...prev,
        provider: { ...prev.provider, availability: updatedProvider.availability }
      }))
    } catch (error) {
      console.error("Error updating availability:", error);
    } finally {
      setLoading(false)
    }
  };

  if (loading) return <div><Loader /></div>
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>

  if (!providerInfo) return <div className="text-center capitalize p-4">No service provider information available...</div>

  return (
    <>
      <div className="bg-white dark:bg-gray-950/50 shadow">
        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <div>
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
                    Welcome, {providerInfo.provider.name}
                  </h2>
                  <div className="flex flex-col mt-1 text-base text-gray-500  dark:text-gray-400">
                    <span className='capitalize bg-primary-700/20 p-2 rounded-full mb-3 flex items-center gap-3 mt-1 text-lg font text-gray-500 dark:text-gray-400'>
                      <CircleAlert size='20' className='text-sm font-light' /> Service:  {providerInfo.provider.service_category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center md:mt-0 md:ml-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${availabilityColors[availability] || "bg-gray-200 text-gray-800"}`}>
                {availability}
              </span>
              <select
                value={availability}
                disabled={loading}
                onChange={(e) => handleAvailability(providerInfo.provider._id, e.target.value)}
                className="mt-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <option value="available">Update Availability</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Provider Profile Card */}
      <div className="mt-8 bg-white dark:bg-gray-950/50 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-600/20">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Provider Profile</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <div className="h-24 w-24 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                {/* <Wrench className="h-12 w-12 text-primary-600 dark:text-primary-400" /> */}
                <div>
                  <button
                    type="button"
                    className="max-w-full flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-full w-full rounded-full"
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="User profile"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Services</p>
                  <p className="mt-1 text-base text-gray-900 capitalize dark:text-white">{providerInfo.provider.service_category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {new Date(providerInfo.provider.joinDate || providerInfo.provider.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completion Rate</p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {providerInfo.stats.completionRate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}