"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "../../../components/ui/button.js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card.js"
import { Badge } from "../../../components/ui/badge.js"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../../../components/ui/dialog.js"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select.js"
import { Wrench, Calendar, MapPin, User, AlertCircle, ChevronRight } from "lucide-react"
import { fetchLandlordMaintenanceRequests } from "../../../services/maintananceService.js"
import ServiceProviderAssignment from "../../../components/service/ServiceProviderAssignment.js"
import { Link } from "react-router-dom"
import { Toaster, toast } from "sonner"
import { getAuthHeaders } from "../../../services/authService.js"
import axios from "axios"

interface MaintenanceRequest {
  _id: string
  tenant: {
    _id: string
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

interface MaintenanceRequestsProps {
  landlordId: string
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-amber-50 text-amber-800 border-amber-200"
    case "assigned":
      return "bg-blue-50 text-blue-800 border-blue-200"
    case "in_progress":
      return "bg-indigo-50 text-indigo-800 border-indigo-200"
    case "completed":
      return "bg-emerald-50 text-emerald-800 border-emerald-200"
    case "cancelled":
      return "bg-gray-50 text-gray-800 border-gray-200"
    default:
      return "bg-gray-50 text-gray-800 border-gray-200"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "bg-red-300 text-red-800 border-red-200"
    case "high":
      return "bg-orange-300 text-orange-800 border-orange-200"
    case "medium":
      return "bg-yellow-50 text-yellow-800 border-yellow-200"
    case "low":
      return "bg-green-50 text-green-800 border-green-200"
    default:
      return "bg-gray-50 text-gray-800 border-gray-200"
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
        console.error("Failed to fetch maintenance requests", error)
        toast.error("Failed to load maintenance requests")
      }
    }
    fetchRequests()
  }, [])

  const handleAssignServiceProvider = async (serviceProviderId: string, serviceType: string, notes: string) => {
    if (!selectedRequest) {
      toast.error("No request selected")
      return
    }

    try {
      const data = {
        serviceProviderId,
        serviceType,
        notes,
      }

      console.log("Assigning service provider:", data)
      console.log("Request ID:", selectedRequest._id)

      const response = await axios.put(
        `http://localhost:5000/api/maintenance/${selectedRequest._id}/assign-provider`,
        data,
        {
          headers: getAuthHeaders(),
        },
      )

      console.log("Assignment response:", response.data)

      if (response.data.success) {
        const updatedRequests = await fetchLandlordMaintenanceRequests()
        setRequests(updatedRequests)
        setAssignDialogOpen(false)
        setSelectedRequest(null)
        toast.success("Service provider assigned successfully")
      } else {
        throw new Error(response.data.error || "Failed to assign service provider")
      }
    } catch (error) {
      console.error("Failed to assign service provider:", error)
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        console.error(error.response.data.error)
      } else {
        console.error("Failed to assign service provider")
      }
      toast.error("Failed to assign service provider")
    }
  }

  const handleUpdateRequestState = async (requestId: string, newState: string) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/maintenance/${requestId}/state`,
        { state: newState },
        { headers: getAuthHeaders() },
      )

      if (response.data.success) {
        toast.success(`Request marked as ${newState.replace("_", " ")}`)
        const updatedRequests = await fetchLandlordMaintenanceRequests()
        setRequests(updatedRequests)
      } else {
        throw new Error(response.data.error || "Failed to update request")
      }
    } catch (error) {
      console.error("Failed to update request state:", error)
      toast.error("Failed to update request state")
    }
  }

  return (
    <Card className="border-none shadow-md w-full max-w-none">
      <Toaster position="top-right" richColors />
      <CardHeader className="px-3 sm:px-4 md:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-semibold">
              <Wrench className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
              <span className="truncate">Maintenance Requests</span>
            </CardTitle>
            <CardDescription className="mt-1 text-sm sm:text-base">
              Manage tenant maintenance requests and assign service providers
            </CardDescription>
          </div>
          <Link to="/maintenance" className="flex-shrink-0">
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm"
              onClick={() => (window.location.href = "/maintenance")}>
              <span className="xs:hidden">View All</span>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="px-3 sm:px-4 md:px-6 pb-4 sm:pb-6">
        {requests.length > 0 ? (
          <div className="space-y-4 sm:space-y-5">
            {requests.map((request) => (
              <div
                key={request._id}
                className="border dark:border-primary-600/10 rounded-lg p-3 sm:p-4 md:p-5 hover:shadow-sm dark:bg-gray-900/70 transition-all duration-200"
              >
                <div className="flex flex-col gap-4">
                  {/* Status badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    {request.status && (
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(request.status)} px-2 sm:px-3 py-1 rounded-full font-medium text-xs sm:text-sm`}
                      >
                        {request.status}
                      </Badge>
                    )}
                    {request.priority && (
                      <Badge
                        variant="outline"
                        className={`${getPriorityColor(request.priority)} px-2 sm:px-3 py-1 rounded-full font-medium text-xs sm:text-sm`}
                      >
                        {request.priority}
                      </Badge>
                    )}
                    {request.serviceType && (
                      <Badge
                        variant="outline"
                        className="px-2 sm:px-3 py-1 rounded-full font-medium bg-gray-50 text-gray-800 border-gray-200 text-xs sm:text-sm"
                      >
                        {request.serviceType}
                      </Badge>
                    )}
                  </div>

                  {/* Main content */}
                  <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                        {/* Left column */}
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded hover:bg-gray-950/50">
                            <div className="p-1.5 sm:p-2 rounded-full bg-primary-600/30 dark:bg-primary-600/30 flex-shrink-0">
                              <User className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600 dark:text-primary-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium dark:text-gray-400 text-gray-900 text-sm sm:text-base truncate">
                                {request.tenant?.name || "Not Specified"}
                              </p>
                              {request.tenant?.phone && (
                                <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">{request.tenant.phone}</p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded hover:bg-gray-950/50">
                            <div className="p-1.5 sm:p-2 rounded-full bg-primary-600/30 dark:bg-primary-600/30 flex-shrink-0">
                              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600 dark:text-primary-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs sm:text-sm text-gray-500">Property</p>
                              {/* <p className='font-medium dark:text-gray-400 text-gray-900 text-sm sm:text-base truncate'>{request.property.name}</p> */}
                            </div>
                          </div>
                        </div>

                        {/* Right column */}
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded hover:bg-gray-950/50">
                            <div className="p-1.5 sm:p-2 rounded-full bg-primary-600/30 dark:bg-primary-600/30 flex-shrink-0">
                              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600 dark:text-primary-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs sm:text-sm text-gray-500">Reported on</p>
                              <p className="font-medium dark:text-gray-400 text-gray-900 text-sm sm:text-base">
                                {formatDate(request.createdAt)}
                              </p>
                            </div>
                          </div>

                          {request.assignedTo && (
                            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded hover:bg-gray-950/50">
                              <div className="p-1.5 sm:p-2 rounded-full bg-primary-600/30 dark:bg-primary-600/30 flex-shrink-0">
                                <User className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600 dark:text-primary-600" />
                              </div>
                              <div className="min-w-0 flex-1 space-y-1">
                                <p className="text-xs sm:text-sm text-gray-500">Assigned to: </p>
                                <p className="font-medium text-gray-700 text-xs truncate">
                                  {request.assignedTo.userId?.name || "Not Specified"}
                                </p>
                                {/* <p className="text-xs sm:text-sm text-gray-500">Services: </p>
                                <p className="text-xs text-gray-600 mt-1 truncate">
                                  {request.assignedTo.services.join(", ") || "Not specified"}
                                </p> */}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row xl:flex-col gap-2 w-full xl:w-auto xl:min-w-[200px]">
                      {request.status === "pending" && (
                        <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              onClick={() => setSelectedRequest(request)}
                              className="w-full h-9 sm:h-10 bg-primary-600 hover:bg-primary/90 text-sm"
                            >
                              Assign Provider
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-lg sm:text-xl">Assign Service Provider</DialogTitle>
                              <DialogDescription className="text-sm sm:text-base">
                                Select a service provider for:{" "}
                                <span className="font-medium">{request.description}</span>
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

                      {request.status === "assigned" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleUpdateRequestState(request._id, 'cancelled')}
                          className="w-full h-9 sm:h-10 text-sm bg-red-600 hover:bg-red-700">
                          Cancel Request
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                        className="w-full h-9 sm:h-10 text-sm"
                        onClick={() => {
                          window.location.href = `/properties/requests/${request._id}`
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-primary-600/10">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 rounded-full bg-primary-600/30 dark:bg-primary-600/30 mt-0.5 flex-shrink-0">
                        <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600 dark:text-primary-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium dark:text-gray-400 text-gray-900 text-sm sm:text-base">
                          Issue Description
                        </p>
                        <p className="text-gray-600 mt-1 text-sm sm:text-base break-words">{request.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 space-y-3 sm:space-y-4 text-center bg-slate-100 dark:bg-gray-900 rounded-xl shadow-sm mx-auto max-w-md">
            <img
              src="/no-data.svg"
              alt="No maintenance requests"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain opacity-80"
            />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200">
              No maintenance requests found
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-sm px-4">
              Once tenants submit their service requests, you'll see them listed here.
            </p>
            <Button
              variant="outline"
              className="mt-3 sm:mt-4 text-sm bg-transparent"
              onClick={() => (window.location.href = "/maintenance-requests")}
            >
              View All Requests
            </Button>
          </div>
        )}

        {requests.length > 0 && (
          <div className="mt-4 sm:mt-6 flex justify-center xl:hidden">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-sm"
              onClick={() => (window.location.href = "/maintenance-requests")}
            >
              View All Requests
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default MaintenanceRequestsPage
