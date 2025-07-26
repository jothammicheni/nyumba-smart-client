"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { fetchLandlordMaintenanceRequests } from "../../../../services/maintananceService.js"
import { Wrench, RefreshCw, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../../components/ui/card"
import { Badge } from "../../../../components/ui/badge"
import { Button } from "../../../../components/ui/button"
import { Toaster, toast } from "sonner"

interface MaintenanceRequest {
  _id: string
  tenant: {
    name: string
  }
  room: {
    property_id: {
      name: string
    }
    room_number: string
  }
  description: string
  status: string
  createdAt: string
  priority?: string
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const MaintenanceRequests: React.FC = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchRequests = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await fetchLandlordMaintenanceRequests()
      setRequests(data)
    } catch (error) {
      setError("Failed to fetch maintenance requests")
      toast.error("Failed to load maintenance requests")
      console.error("Failed to fetch maintenance requests", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const getPriorityBadge = (priority?: string) => {
    if (!priority) return null

    const variants = {
      high: "destructive",
      medium: "warning",
      low: "default",
    } as const

    return (
      <Badge variant={variants[priority as keyof typeof variants] || "default"} className="capitalize">
        {priority}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "warning",
      completed: "success",
      in_progress: "default",
      cancelled: "destructive",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "default"} className="capitalize">
        {status.replace("_", " ")}
      </Badge>
    )
  }

  if (loading && requests.length === 0) {
    return (
      <div className="p-4 space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-4">
          <div className="h-8 bg-muted/10 rounded animate-pulse" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted/10 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <Toaster position="top-right" richColors />

      <Card className="bg-white dark:bg-gray-950/50 shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0 flex-1">
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-5 h-5 text-primary-600 dark:text-primary-600" />
                </div>
                <span className="truncate">Maintenance Requests</span>
              </CardTitle>
              <CardDescription>Recent maintenance requests from your properties</CardDescription>
            </div>

            <Button
              variant="outline"
              onClick={fetchRequests}
              className="w-full sm:w-auto bg-primary-600 text-white flex-shrink-0"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
              Refresh
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4 text-sm">⚠️ {error}</div>
          )}

          <div className="space-y-4">
            {requests.length > 0 ? (
              requests.map((req) => (
                <Card key={req._id} className="hover-scale dark:bg-gray-900/30 shadow-md">
                  <CardContent className="pt-4">
                    <div className="flex flex-col gap-4">
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold truncate">{req.tenant?.name || "Unknown Tenant"}</h4>
                            <p className="text-sm text-muted-foreground truncate">
                              {req.room.property_id?.name} • Room {req.room.room_number}
                            </p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            {getPriorityBadge(req.priority)}
                            {getStatusBadge(req.status)}
                          </div>
                        </div>
                        <p className="text-sm text-blue-600 break-words">Issue: {req.description}</p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <p className="text-xs text-muted-foreground">Reported: {formatDate(req.createdAt)}</p>
                        <Link
                          to={`properties/requests/${req._id}`}
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary-600 hover:text-white h-10 px-4 py-2 w-full sm:w-auto"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No maintenance requests found</p>
              </div>
            )}
          </div>

          {requests.length > 0 && (
            <div className="mt-6">
              <Link
                to="/landlord/dashboard/maintenance"
                className="w-full flex justify-center items-center px-4 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors"
              >
                View All Requests
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default MaintenanceRequests
