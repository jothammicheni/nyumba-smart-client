import type React from 'react'
import { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button.js'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card.js'
import { Badge } from '../../../components/ui/badge.js'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../../../components/ui/dialog.js'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select.js'
import { Wrench, Calendar, MapPin, User, AlertCircle, Phone, ChevronRight } from 'lucide-react'
import { fetchLandlordMaintenanceRequests } from '../../../services/maintananceService.js'
import ServiceProviderAssignment from '../../../components/service/ServiceProviderAssignment.js'
import { Link } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { getAuthHeaders } from '../../../services/authService.js'
import axios from 'axios'

interface MaintenanceRequest {
  _id: string
  tenant: {
    _id: string
    name: string
    email: string
    phone: string
  }
  room: {
    _id: string
    property_id: {
      _id: string
      name: string
      address?: string
    }
  }
  description: string
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  serviceType?: 'plumbing' | 'electrical' | 'cleaning' | 'security' | 'wifi' | 'other'
  assignedTo?: {
    _id: string
    name: string
    services: string[]
  }
  notes: string
  createdAt: string
}

interface MaintenanceRequestsProps {
  landlordId: string
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-amber-50 text-amber-800 border-amber-200'
    case 'assigned':
      return 'bg-blue-50 text-blue-800 border-blue-200'
    case 'in_progress':
      return 'bg-indigo-50 text-indigo-800 border-indigo-200'
    case 'completed':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200'
    case 'cancelled':
      return 'bg-gray-50 text-gray-800 border-gray-200'
    default:
      return 'bg-gray-50 text-gray-800 border-gray-200'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-300 text-red-800 border-red-200'
    case 'high':
      return 'bg-orange-300 text-orange-800 border-orange-200'
    case 'medium':
      return 'bg-yellow-50 text-yellow-800 border-yellow-200'
    case 'low':
      return 'bg-green-50 text-green-800 border-green-200'
    default:
      return 'bg-gray-50 text-gray-800 border-gray-200'
  }
}

const MaintenanceRequestsPage: React.FC<MaintenanceRequestsProps> = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null)
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await fetchLandlordMaintenanceRequests()
        setRequests(data)
      } catch (error) {
        console.error('Failed to fetch maintenance requests', error)
        toast.error('Failed to load maintenance requests')
      }
    }

    fetchRequests()
  }, [])

  const handleAssignServiceProvider = async (serviceProviderId: string, serviceType: string) => {
    if (!selectedRequest) {
      toast.error("No request selected")
      return
    }
    try {
      const data = {
        serviceProviderId,
        serviceType,
        notes: ''
      }
      console.log("Assigning service provider:", data)
      console.log("Request ID:", selectedRequest._id)

      const response = await axios.put(
        `http://localhost:5000/api/maintenance/${selectedRequest?._id}/assign-provider`,
        data,
        {
          headers: getAuthHeaders()
        })

      console.log("Assignment response:", response.data)

      if (response.data.success) {
        const updatedRequests = await fetchLandlordMaintenanceRequests()
        setRequests(updatedRequests)

        setAssignDialogOpen(false)
        setSelectedRequest(null)

        toast.success('Service provider assigned successfully')
      } else {
        throw new Error(response.data.error || 'Failed to assign service provider')
      }
    } catch (error) {
      console.error("Failed to assign service provider:", error);
      // Log the error response if available
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        console.error(error.response.data.error);
      } else {
        console.error("Failed to assign service provider");
      }
      toast.error('Failed to assign service provider')
    }
  }

  const handleUpdateRequestState = async (requestId: string, newState: string) => {
    try {
      const response = await fetch(`/api/maintenance-requests/${requestId}/state`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: newState }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success(`Request marked as ${newState.replace('_', ' ')}`)
        // Refresh requests
        const updatedRequests = await fetchLandlordMaintenanceRequests()
        setRequests(updatedRequests)
      } else {
        throw new Error(result.error || 'Failed to update request')
      }
    } catch (error) {
      console.error('Failed to update request state:', error)
      toast.error('Failed to update request state')
    }
  }

  return (
    <Card className='border-none shadow-sm'>
      <Toaster position='top-right' richColors />
      <CardHeader className='px-6 pt-6 pb-4'>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-3 text-xl font-semibold'>
              <Wrench className='h-5 w-5 text-primary' />
              Maintenance Requests
            </CardTitle>
            <CardDescription className='mt-1'>
              Manage tenant maintenance requests and assign service providers
            </CardDescription>
          </div>
          <Link to='/maintenance-requests'>
            <Button
              variant='outline'
              className='hidden sm:flex items-center gap-2'
              onClick={() => (window.location.href = '/maintenance-requests')}>
              View All
              <ChevronRight className='h-4 w-4' />
            </Button>
          </Link>

        </div>
      </CardHeader>

      <CardContent className='px-6 pb-6 shadow-xl rounded'>
        {requests.length > 0 ? (
          <div className='space-y-4'>
            {requests.map((request) => (
              <div
                key={request._id}
                className='border rounded-lg p-5 hover:shadow-sm transition-all duration-200'>
                <div className='flex flex-col md:flex-row md:items-start justify-between gap-4'>
                  <div className='flex-1 space-y-3'>
                    <div className='flex flex-wrap items-center gap-2'>
                      {request.status && (
                        <Badge
                          variant='outline'
                          className={`${getStatusColor(request.status)} px-3 py-1 rounded-full font-medium`}>
                          {request.status}
                        </Badge>
                      )}
                      {request.priority && (
                        <Badge
                          variant='outline'
                          className={`${getPriorityColor(request.priority)} px-3 py-1 rounded-full font-medium`}>
                          {request.priority}
                        </Badge>
                      )}
                      {request.serviceType && (
                        <Badge
                          variant='outline'
                          className='px-3 py-1 rounded-full font-medium bg-gray-50 text-gray-800 border-gray-200'
                        >
                          {request.serviceType}
                        </Badge>
                      )}
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                      <div className='space-y-3'>
                        <div className='flex items-center gap-3'>
                          <div className='p-2 rounded-full bg-gray-100'>
                            <User className='h-4 w-4 text-gray-600' />
                          </div>
                          <div>
                            <p className='font-medium dark:text-gray-400 text-gray-900'>
                              {request.tenant?.name || 'Not Specified'}
                            </p>

                            {request.tenant?.phone && (
                              <p className='flex items-center gap-2 text-sm text-gray-500 mt-1'>
                                <Phone className='h-4 w-4' />
                                {request.tenant.phone}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className='flex items-center gap-3'>
                          <div className='p-2 rounded-full bg-gray-100'>
                            <MapPin className='h-4 w-4 text-gray-600' />
                          </div>
                          <div>
                            <p className='text-sm text-gray-500'>Property</p>
                            <p className='font-medium dark:text-gray-400 text-gray-900'>{request.room.property_id.name}</p>
                          </div>
                        </div>
                      </div>

                      <div className='space-y-3'>
                        <div className='flex items-center gap-3'>
                          <div className='p-2 rounded-full bg-gray-100'>
                            <Calendar className='h-4 w-4 text-gray-600' />
                          </div>
                          <div>
                            <p className='text-sm text-gray-500'>Reported on</p>
                            <p className='font-medium dark:text-gray-400 text-gray-900'>{formatDate(request.createdAt)}</p>
                          </div>
                        </div>

                        {request.assignedTo && (
                          <div className='flex items-center gap-3'>
                            <div className='p-2 rounded-full bg-blue-100'>
                              <User className='h-4 w-4 text-blue-600' />
                            </div>
                            <div>
                              <p className='text-sm text-gray-500'>Assigned to</p>
                              <p className='font-medium text-gray-900'>{request.assignedTo.name}</p>
                              <p className='text-xs text-gray-500 mt-1'>
                                Services: {request.assignedTo.services.join(', ')}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col gap-2 w-full md:w-auto'>
                    {request.status === 'pending' && (
                      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size='sm'
                            onClick={() => setSelectedRequest(request)}
                            className='w-full md:w-48 h-10 bg-primary-600 hover:bg-primary/90'>
                            Assign Provider
                          </Button>
                        </DialogTrigger>
                        <DialogContent className='max-w-4xl'>
                          <DialogHeader>
                            <DialogTitle className='text-xl'>Assign Service Provider</DialogTitle>
                            <DialogDescription className='text-base'>
                              Select a service provider for: <span className='font-medium'>{request.description}</span>
                            </DialogDescription>
                          </DialogHeader>
                          {selectedRequest && (
                            <ServiceProviderAssignment
                              maintenanceRequest={selectedRequest}
                              onAssign={handleAssignServiceProvider}
                              onCancel={() => {
                                setAssignDialogOpen(false)
                                setSelectedRequest(null)
                              }}
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                    )}

                    {request.status === 'assigned' && (
                      <Select onValueChange={(value: string) => handleUpdateRequestState(request._id, value)}>
                        <SelectTrigger className='w-full md:w-48 h-10'>
                          <SelectValue placeholder='Update status' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='in_progress' className='hover:bg-gray-50'>
                            <div className='flex items-center gap-2'>
                              <span className='h-2 w-2 rounded-full bg-indigo-500'></span>
                              Start Work
                            </div>
                          </SelectItem>
                          <SelectItem value='cancelled' className='hover:bg-gray-50'>
                            <div className='flex items-center gap-2'>
                              <span className='h-2 w-2 rounded-full bg-gray-500'></span>
                              Cancel Request
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}

                    <Button
                      variant='outline'
                      size='sm'
                      className='w-full md:w-48 h-10'
                      onClick={() => {
                        window.location.href = `/properties/requests/${request._id}`
                      }}>
                      View Details
                    </Button>
                  </div>
                </div>

                <div className='mt-4 pt-4 border-t'>
                  <div className='flex items-start gap-3'>
                    <div className='p-2 rounded-full bg-amber-100 mt-0.5'>
                      <AlertCircle className='h-4 w-4 text-amber-600' />
                    </div>
                    <div>
                      <p className='font-medium dark:text-gray-400  text-gray-900'>Issue Description</p>
                      <p className='text-gray-600 mt-1'>{request.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-12 space-y-4'>
            <Wrench className='h-10 w-10 text-gray-400' />
            <p className='text-lg font-medium text-gray-500'>No maintenance requests found</p>
            <p className='text-sm text-gray-400'>When tenants submit requests, they'll appear here</p>
            <Button
              variant='outline'
              className='mt-4'
              onClick={() => (window.location.href = '/maintenance-requests')}>
              View All Requests
            </Button>
          </div>
        )}

        {requests.length > 0 && (
          <div className='mt-6 flex justify-center sm:hidden'>
            <Button
              variant='outline'
              className='flex items-center gap-2'
              onClick={() => (window.location.href = '/maintenance-requests')}>
              View All Requests
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default MaintenanceRequestsPage
