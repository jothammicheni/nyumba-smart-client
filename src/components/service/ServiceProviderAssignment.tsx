/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '../ui/button.js'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card.js'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select.js'
import { Badge } from '../ui/badge.js'
import { Input } from '../ui/input.js'
import { Star, MapPin, Phone, Mail, CheckCircle, XCircle } from 'lucide-react'
import axios from 'axios'
import { getAuthHeaders } from '../../services/authService.js'
import { Toaster, toast } from 'sonner'
import React from 'react'

interface ServiceProvider {
  _id: string
  userId: string | null
  user?: {
    _id: string
    name: string
    email: string
    phone?: string
    isVerified?: boolean
  }
  services: string[]
  location: {
    city: string
  }
  isActive: boolean
  completedJobs: string | number
  rating?: number
  createdAt?: string
  updatedAt?: string
  __v?: number
}

interface MaintenanceRequest {
  _id: string
  tenant: {
    name: string
    email: string
    phone: string
  }
  property: {
    _id: string
    name: string
    address?: string
  }
  room: {
    _id: string
  }
  description: string
  status: "pending" | "assigned" | "in_progress" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "urgent"
  serviceType?: "plumbing" | "electrical" | "cleaning" | "security" | "wifi" | "other"
  assignedTo?: {
    _id: string
    services: string[]
    userId: {
      _id: string;
      name: string;
    };
  }
  notes: string
  createdAt: string
}

interface ServiceProviderAssignmentProps {
  maintenanceRequest: MaintenanceRequest
  onAssign: (serviceProviderId: string, serviceType: string, notes: string) => void
  onCancel: () => void
}

const serviceTypeMapping = {
  plumbing: ['leak', 'pipe', 'drain', 'faucet', 'toilet', 'water'],
  electrical: ['light', 'outlet', 'switch', 'power', 'electrical', 'wiring'],
  cleaning: ['clean', 'dirty', 'stain', 'garbage', 'pest'],
  security: ['lock', 'door', 'window', 'security', 'key'],
  wifi: ['internet', 'wifi', 'connection', 'network'],
  other: [],
}

const detectServiceType = (description: string): string => {
  const desc = description.toLowerCase()

  for (const [serviceType, keywords] of Object.entries(serviceTypeMapping)) {
    if (keywords.some((keyword) => desc.includes(keyword))) {
      return serviceType
    }
  }

  return 'other'
}

export default function ServiceProviderAssignment({ maintenanceRequest, onAssign, onCancel }: ServiceProviderAssignmentProps) {
  const [providers, setProviders] = useState<ServiceProvider[]>([])
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null)
  const [serviceType, setServiceType] = useState<string>(maintenanceRequest.serviceType || '')
  const [loading, setLoading] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    city: '',
    serviceType: '',
    isActive: 'true'
  })
  const [notes, setNotes] = useState('')

  const serviceTypes = [
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'security', label: 'Security' },
    { value: 'wifi', label: 'WiFi/Internet' },
    { value: 'other', label: 'Other' },
  ]

  // Auto-detect service type from description
  useEffect(() => {
    const detectedType = detectServiceType(maintenanceRequest.description)
    setServiceType(detectedType)
    setSearchFilters((prev) => ({ ...prev, serviceType: detectedType }))
  }, [maintenanceRequest.description])

  const searchProviders = useCallback(async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({
        // isActive: 'true',
        ...(searchFilters.city && { city: searchFilters.city }),
        ...(searchFilters.serviceType && { serviceType: searchFilters.serviceType }),
      })

      const response = await axios.get(`https://nyumba-smart-server.onrender.com/api/provider-service/search${queryParams.toString()}`,
        { headers: getAuthHeaders() }
      )
      if (response.data.success && Array.isArray(response.data.providers)) {
        setProviders(response.data.providers.filter((provider: ServiceProvider) =>
          provider.isActive && provider.services.includes(serviceType)
        ))
      } else {
        toast.error(response.data.error || 'Failed to fetch service providers')
      }
    } catch (error) {
      console.error('Failed to search providers:', error)
    } finally {
      setLoading(false)
    }
  }, [searchFilters, serviceType])

  useEffect(() => {
    searchProviders()
  }, [searchFilters, searchProviders])

  const handleAssign = async () => {
    if (!selectedProvider || !serviceType) {
      toast.error('Please select a provider and service type')
      return
    }
    setLoading(true)
    try {
      onAssign(selectedProvider._id, serviceType, notes)
    } catch (error) {
      console.error("Assignment failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-[85vh] flex flex-col space-y-4'>
      <Toaster position='top-right' richColors />
      <div className='flex-shrink-0'>
        <div className='grid grid-cols-1 lg:grid-cols-1 gap-4'>
          <Card className='h-fit'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-lg'>Request Details</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-sm'>
              <div className='flex items-center justify-between'>
                <strong className='text-muted-foreground'>Tenant:</strong>
                <span className='font-medium'>{maintenanceRequest.tenant.name}</span>
              </div>
              <div className='flex items-center justify-between'>
                <strong className='text-muted-foreground'>Property:</strong>
                {/* <span className='font-medium truncate ml-2'>{maintenanceRequest.property.name}</span> */}
              </div>
              <div className='space-y-1'>
                <strong className='text-muted-foreground'>Issue:</strong>
                <span className='text-sm bg-muted/50 p-2 rounded'>{maintenanceRequest.description}</span>
              </div>
              {maintenanceRequest.priority && (
                <div className='flex items-center justify-between'>
                  <strong className='text-muted-foreground'>Priority:</strong>
                  <span className='ml-2'>
                    {maintenanceRequest.priority}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className='h-fit'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-lg'>Service & Filters</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div>
                <label className='text-sm font-medium text-muted-foreground'>Service Type</label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger className='mt-1'>
                    <SelectValue placeholder='Select service type' />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>City</label>
                  <Input
                    className='mt-1'
                    placeholder='Enter city'
                    value={searchFilters.city}
                    onChange={(e) => setSearchFilters((prev) => ({ ...prev, city: e.target.value }))}
                  />
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Filter Service</label>
                  <Select
                    value={searchFilters.serviceType}
                    onValueChange={(value: any) => setSearchFilters((prev) => ({ ...prev, serviceType: value }))}
                  >
                    <SelectTrigger className='mt-1'>
                      <SelectValue placeholder='All' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Services</SelectItem>
                      {serviceTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={searchProviders} disabled={loading} className='w-full' size='sm'>
                {loading ? 'Searching...' : 'Search Providers'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* main content */}
      <div className='flex-1 grid grid-cols-1 lg:grid-cols-1 gap-4 min-h-0'>
        {/* Service Providers List */}
        <div className='lg:col-span-2'>
          <Card className='h-full flex flex-col'>
            <CardHeader className='pb-3 flex-shrink-0'>
              <CardTitle className='text-lg'>Available Service Providers</CardTitle>
              <CardDescription>Select a service provider to assign this request</CardDescription>
            </CardHeader>
            <CardContent className='flex-1 min-h-0 p-0'>
              <div className='space-y-3'>
                {providers.length > 0 ? (
                  providers.map((provider) => (
                    <div
                      key={provider._id}
                      className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${selectedProvider?._id === provider._id
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border hover:border-primary/50'
                        }`}
                      onClick={() => setSelectedProvider(provider)}>
                      <div className='flex items-start justify-between'>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2 mb-2'>
                            <h4 className='font-medium truncate'>{provider.user?.name || 'Unknown'}</h4>
                            {provider.user?.isVerified && (<CheckCircle className='h-4 w-4 text-green-500 flex-shrink-0' />)}
                            {selectedProvider?._id === provider._id && (<Badge className='flex-shrink-0'>Selected</Badge>)}
                          </div>

                          <div className='grid grid-cols-1 sm:grid-cols-2 space-y-1 text-sm text-muted-foreground mb-2'>
                            <div className='flex items-center gap-1'>
                              <MapPin className='h-3 w-3 flex-shrink-0' />
                              <span className='truncate'>{provider.location.city}</span>
                            </div>

                            {provider.user?.email && (
                              <div className='flex items-center gap-1'>
                                <Mail className='h-3 w-3 flex-shrink-0' />
                                <span>{provider.user?.email || 'N/A'}</span>
                              </div>
                            )}

                            {provider.user?.phone && (
                              <div className='flex items-center gap-1'>
                                <Phone className='h-3 w-3 flex-shrink-0' />
                                <span className='truncate'>{provider.user?.phone}</span>
                              </div>
                            )}
                          </div>

                          <div className='flex flex-wrap gap-1'>
                            {provider.services.slice(0, 3).map((service) => (
                              <Badge
                                key={service}
                                variant='outline'
                                className='text-xs px-1 py-0'>
                                {service}
                              </Badge>
                            ))}
                            {provider.services.length > 3 && (
                              <Badge variant='outline' className='text-xs px-1 py-0'>
                                +{provider.services.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className='flex flex-col items-end gap-1 flex-shrink-0 ml-2'>
                          {provider.rating !== undefined && (
                            <div className='flex items-center gap-1'>
                              <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                              <span className='text-sm font-medium'>{provider.rating.toFixed(1)}</span>
                            </div>
                          )}
                          <div className='text-xs text-muted-foreground'>{provider.completedJobs || 0} jobs completed</div>
                          <span className='mt-1'>
                            {provider.isActive ? 'Available' : 'Busy'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-center py-10 text-muted-foreground'>
                    {loading ? (
                      <div className='space-y-2'>
                        <div className='animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto'></div>
                        <p>Searching for providers...</p>
                      </div>
                    ) : (
                      <p>No service providers found matching your criteria.</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes & Actions  */}
        <div className='lg:col-span-1'>
          <Card className='h-full flex flex-col'>
            <CardHeader className='pb-3 flex-shrink-0'>
              <CardTitle className='text-lg'>Assignment Details</CardTitle>
            </CardHeader>
            <CardContent className='flex-1 flex flex-col space-y-4'>
              {/* Selected Provider Summary */}
              {selectedProvider && (
                <div className='bg-primary/5 border border-primary/20 rounded-lg p-3'>
                  <h4 className='font-medium text-sm mb-2'>Selected Provider</h4>
                  <div className='space-y-1 text-xs'>
                    <div className='flex items-center gap-1'>
                      <span className='font-medium'>{selectedProvider.user?.name}</span>
                      {selectedProvider.user?.isVerified && (
                        <CheckCircle className='h-3 w-3 text-green-500' />
                      )}
                    </div>
                    <div className='flex items-center gap-1 text-muted-foreground'>
                      <MapPin className='h-3 w-3' />
                      <span>{selectedProvider.location.city}</span>
                    </div>
                    {selectedProvider.rating !== undefined && (
                      <div className='flex items-center gap-1 text-muted-foreground'>
                        <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                        <span>{selectedProvider.rating.toFixed(1)} rating</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Notes Section */}
              <div className="space-y-2 pt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Additional Notes <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  className="block w-full rounded-md text-gray-900 border border-gray-300 dark:border-gray-700 dark:bg-slate-100 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm p-3 transition"
                  placeholder="Add special instructions or details here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                />
                <p className="text-xs text-gray-500">
                  Any specific requirements or details for the service provider
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleAssign}
                  disabled={!selectedProvider || !serviceType}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${!selectedProvider || !serviceType
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                    } transition-colors duration-200`}
                >
                  {!selectedProvider || !serviceType ? (
                    'Select provider and service type'
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Assign Service Provider
                    </>
                  )}
                </button>

                <button
                  onClick={onCancel}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                >
                  <XCircle className="h-5 w-5 mr-2" />
                  Cancel
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
