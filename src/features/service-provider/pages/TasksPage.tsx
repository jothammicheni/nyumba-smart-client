import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getAuthHeaders } from '../../../services/authService.js'
import { Briefcase, CheckCircle, Clock, MapPin } from 'lucide-react'
import { Loader } from '../../../components/Loader.js'

export default function Tasks() {
  const [loading, setLoading] = useState(true)
  const [providerInfo, setProviderInfo] = useState({
    stats: {
      totalTasks: 0,
      completedTasks: 0,
      completionRate: 0,
    }
  })

  useEffect(() => {
    const fetchProviderInfo = async () => {
      setLoading(true)
      try {
        const response = await axios.get('/api/providers/info', {
          headers: getAuthHeaders(),
          responseType: 'json'
        })
        console.log('API Response Tasks:', response.data.data)
        setProviderInfo(response.data.data)
      } catch (error) {
        console.error("Error fetching provider info:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProviderInfo()
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) return <div><Loader/></div>

  const activeJobs = [
    {
      id: 1,
      client: "Sunshine Apartments",
      address: "123 Moi Avenue, Nairobi",
      service: "WiFi Installation",
      date: "2023-05-20",
      status: "scheduled",
      amount: 15000,
    },
    {
      id: 2,
      client: "Green Valley Residences",
      address: "456 Kenyatta Road, Nairobi",
      service: "Network Troubleshooting",
      date: "2023-05-18",
      status: "in-progress",
      amount: 5000,
    },
    {
      id: 3,
      client: "Riverside Homes",
      address: "789 Uhuru Highway, Nairobi",
      service: "WiFi Upgrade",
      date: "2023-05-25",
      status: "scheduled",
      amount: 12000,
    },
  ]

  const completedJobs = [
    {
      id: 1,
      client: "Mountain View Apartments",
      address: "321 Mombasa Road, Nairobi",
      service: "WiFi Installation",
      date: "2023-05-10",
      amount: 15000,
    },
    {
      id: 2,
      client: "Serene Gardens",
      address: "654 Ngong Road, Nairobi",
      service: "Router Replacement",
      date: "2023-05-05",
      amount: 8000,
    },
    {
      id: 3,
      client: "Urban Heights",
      address: "987 Thika Road, Nairobi",
      service: "Network Setup",
      date: "2023-04-28",
      amount: 20000,
    },
  ]

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <div className="bg-slate-100 dark:bg-gray-900 overflow-hidden shadow-md rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-4">
                <Briefcase className="w-6 h-6 text-primary-600 dark:text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Jobs</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {providerInfo?.stats?.totalTasks ?? 0}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-gray-900 overflow-hidden shadow-md rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6 text-primary-600 dark:text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Completed Jobs
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {providerInfo?.stats?.completedTasks ?? 0}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-gray-900 overflow-hidden shadow-md rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-4">
                <Clock className="w-6 h-6 text-primary-600 dark:text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Pending Jobs
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {providerInfo?.stats?.totalTasks - providerInfo?.stats?.completedTasks || '0'}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active jobs */}
      <div className="mt-8 bg-slate-100 dark:bg-gray-900 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-600/20 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Active Jobs</h3>
          <a href="#"
            className="text-sm font-medium text-primary-600 hover:text-primary-600 dark:hover:bg-primary-600/20 p-2 rounded">
            View all
          </a>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200 dark:divide-primary-600/10">
              {activeJobs.map((job) => (
                <li key={job.id} className="py-5">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-1">
                        <p className="text-lg font-medium text-gray-900 dark:text-white truncate">
                          {job.service}
                        </p>
                        <span
                          className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                  ${job.status === "scheduled"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            }`}
                        >
                          {job.status === "scheduled" ? "Scheduled" : "In Progress"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 dark:text-white mb-1">
                        <span className="font-medium">Client:</span> {job.client}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-primary-600 dark:text-primary-600" />
                        {job.address}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(job.amount)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(job.date)}</p>
                      <div className="mt-2">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          {job.status === "scheduled" ? "Start Job" : "Complete Job"}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Recent Completed Jobs and Client Reviews */}
      <div className="my-8 grid grid-cols-1 gap-8 lg:grid-cols-1">
        {/* Recent Completed Jobs */}
        <div className="bg-slate-100 dark:bg-gray-900 shadow-md rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-600/20 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Recent Completed Jobs
            </h3>
            <a href="#"
              className="text-sm font-medium text-primary-600 hover:text-primary-600 dark:hover:bg-primary-600/20 p-2 rounded">
              View all
            </a>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200 dark:divide-primary-600/10">
                {completedJobs.map((job) => (
                  <li key={job.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {job.service}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {job.client} - {formatDate(job.date)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatCurrency(job.amount)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
