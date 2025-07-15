/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Search } from "lucide-react"
import { getAvailableTenants } from "../../../services/propertyService.js"

interface User {
  _id: string
  name: string
  email: string
  phone?: string
}

interface AssignTenantModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (userId: string) => void
  roomId: string
}

const AssignTenantModal: React.FC<AssignTenantModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [availableTenants, setAvailableTenants] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedUserId, setSelectedUserId] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (isOpen) {
      fetchAvailableTenants()
    }
  }, [isOpen])

  const fetchAvailableTenants = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await getAvailableTenants()
      setAvailableTenants(response.data)
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch available tenants")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedUserId) {
      setError("Please select a tenant")
      return
    }

    onSubmit(selectedUserId)
  }

  const filteredTenants = availableTenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tenant.phone && tenant.phone.includes(searchTerm)),
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Assign Tenant to Room</h3>
            <button type="button" className="text-gray-400 hover:text-gray-500 focus:outline-none" onClick={onClose}>
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-6 py-4">
              {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Search tenants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto">
                {loading ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500 dark:text-gray-400">Loading...</p>
                  </div>
                ) : filteredTenants.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500 dark:text-gray-400">No available tenants found</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredTenants.map((tenant) => (
                      <div
                        key={tenant._id}
                        className={`p-3 rounded-md cursor-pointer ${
                          selectedUserId === tenant._id
                            ? "bg-primary-100 dark:bg-primary-900 border border-primary-500"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                        onClick={() => setSelectedUserId(tenant._id)}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="tenant"
                            id={tenant._id}
                            value={tenant._id}
                            checked={selectedUserId === tenant._id}
                            onChange={() => setSelectedUserId(tenant._id)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <label htmlFor={tenant._id} className="ml-3 block">
                            <span className="block text-sm font-medium text-gray-900 dark:text-white">
                              {tenant.name}
                            </span>
                            <span className="block text-sm text-gray-500 dark:text-gray-400">{tenant.email}</span>
                            {tenant.phone && (
                              <span className="block text-sm text-gray-500 dark:text-gray-400">{tenant.phone}</span>
                            )}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end">
              <button
                type="button"
                className="mr-3 px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                disabled={!selectedUserId || loading}
              >
                Assign Tenant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AssignTenantModal
