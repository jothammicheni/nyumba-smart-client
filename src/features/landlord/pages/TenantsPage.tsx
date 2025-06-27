/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from "react"
import { Users, Search, RefreshCw, User } from "lucide-react"
import { getTenants } from "../../../services/propertyService.js"
import AddTenantModal from "../components/AddTenantModal.js"

interface Tenant {
  _id: string
  user_id: string
  room_id: string
  lease_status: string
  join_date: string
  user: {
    _id: string
    name: string
    email: string
    phone?: string
  }
  room: {
    _id: string
    room_number: string
    property_id: string
  }
  property: {
    _id: string
    name: string
    city: string
    area: string
  }
}

const TenantsPage: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
   const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      setLoading(true)
      setError("")
      try {
        const response = await getTenants()
        if (isMounted) setTenants(response.data)
      } catch (err: any) {
        if (isMounted)
          setError(err.response?.data?.error || "Failed to fetch tenants")
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => {
      isMounted = false
    }
  }, [])

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.room.room_number.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Header + Refresh */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Tenants</h1>
        <button
          onClick={() => {
            setSearchTerm("")
            setLoading(true)
            setError("")
            getTenants()
              .then((response) => setTenants(response.data))
              .catch((err: any) =>
                setError(err.response?.data?.error || "Failed to fetch tenants"),
              )
              .finally(() => setLoading(false))
          }}
          className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>

      {/* Search input */}
     <div className="mb-4 max-w-5xl w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
  <div className="relative w-full sm:max-w-md">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Search className="h-5 w-5 text-gray-400" />
    </div>
    <input
      type="text"
      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
      placeholder="Search tenants by name, email, property, or room..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  <button
    onClick={() => setIsAddModalOpen(true)}
    className="inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-primary-700 transition w-full sm:w-auto"
  >
    Add New Tenant
  </button>
</div>


      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredTenants.length === 0 ? (
          <div className="p-6 text-center">
            <Users className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              No tenants found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {searchTerm ? "Try adjusting your search terms" : "You don't have any tenants yet"}
            </p>
          </div>
        ) : (
          <>
            <div className="px-6 py-2 text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredTenants.length} tenant
              {filteredTenants.length !== 1 ? "s" : ""}
            </div>

            {/* TABLE on md+ screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-[700px] w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tenant
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Room
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Lease Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Join Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredTenants.map((tenant) => (
                    <tr key={tenant._id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {tenant.user.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {tenant.user.email}
                            </div>
                            {tenant.user.phone && (
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {tenant.user.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {tenant.property.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {tenant.property.area}, {tenant.property.city}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {tenant.room.room_number}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            tenant.lease_status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : tenant.lease_status === "pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              : tenant.lease_status === "expired"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {tenant.lease_status.charAt(0).toUpperCase() +
                            tenant.lease_status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(tenant.join_date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CARD LIST on small screens */}
            <div className="md:hidden px-4 py-2 space-y-4">
              {filteredTenants.map((tenant) => (
                <div
                  key={tenant._id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow p-4"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div>
                      <div className="text-base font-semibold text-gray-900 dark:text-white">
                        {tenant.user.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {tenant.user.email}
                      </div>
                      {tenant.user.phone && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {tenant.user.phone}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-gray-900 dark:text-white font-semibold">
                    Property:
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {tenant.property.name} — {tenant.property.area}, {tenant.property.city}
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
                    <div>
                      <span className="font-semibold">Room:</span> {tenant.room.room_number}
                    </div>
                    <div>
                      <span className="font-semibold">Lease:</span>{" "}
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          tenant.lease_status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : tenant.lease_status === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : tenant.lease_status === "expired"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {tenant.lease_status.charAt(0).toUpperCase() +
                          tenant.lease_status.slice(1)}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Joined:</span> {formatDate(tenant.join_date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <AddTenantModal
  isOpen={isAddModalOpen}
  onClose={() => setIsAddModalOpen(false)}
  onSuccess={() => {
    // Refresh tenants after successful addition
    getTenants()
      .then((response) => setTenants(response.data))
      .catch((err: any) =>
        setError(err.response?.data?.error || "Failed to fetch tenants")
      );
  }}
/>
    </div>
  )
}

export default TenantsPage
