"use client"

import React, { useEffect, useState } from "react"
import { listingService } from "../../../services/listingService.js"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Check, Calendar, Mail, Phone, Home, User, MessageSquare, Trash2, Eye, RefreshCw } from "lucide-react"
import { Toaster, toast } from "sonner"

type Inquiry = {
  _id: string
  name: string
  email: string
  phone: string
  inquiryMessage: string
  PropertyName: string
  property_id: string
  landlord_id: string
  createdAt: string
  viewed?: boolean
}

type Visit = {
  _id: string
  visitorName: string
  visitDate: string
  contact: string
  propertyName: string
  viewed?: boolean
}

export default function BookingsAndAppointments() {
  const [activeTab, setActiveTab] = useState<"bookings" | "visits">("bookings")
  const [bookings, setBookings] = useState<Inquiry[]>([])
  const [visits, setVisits] = useState<Visit[]>([])
  const [selected, setSelected] = useState<Inquiry | Visit | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [bookingData, visitData] = await Promise.all([
        listingService.getAllBookings(),
        listingService.getAllVisits(),
      ])
      setBookings(bookingData)
      setVisits(visitData)
    } catch (error) {
      toast.error("Failed to load data")
      console.error("Failed to load data", error)
    } finally {
      setLoading(false)
    }
  }

  const markAsViewed = async (id: string) => {
    try {
      if (activeTab === "bookings") {
        setBookings(prev => prev.map(b => b._id === id ? { ...b, viewed: true } : b))
      } else {
        setVisits(prev => prev.map(v => v._id === id ? { ...v, viewed: true } : v))
      }
      toast.success("Marked as viewed")
    } catch {
      toast.error("Failed to update status")
    }
  }

  const deleteItem = async (id: string) => {
    try {
      if (activeTab === "bookings") {
        setBookings(prev => prev.filter(b => b._id !== id))
      } else {
        setVisits(prev => prev.filter(v => v._id !== id))
      }
      if (selected && selected._id === id) setSelected(null)
      toast.success("Item deleted")
    } catch {
      toast.error("Failed to delete item")
    }
  }

  const handleSelect = (item: Inquiry | Visit) => {
    setSelected(item)
    if (!item.viewed) markAsViewed(item._id)
  }

  const items = activeTab === "bookings" ? bookings : visits

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Toaster position="top-right" richColors />
      
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Bookings & Appointments</h1>
            <p className="text-muted-foreground">
              Manage your property inquiries and visits
            </p>
          </div>
          <Button variant="outline" onClick={fetchData}
          className="hover:bg-primary-600">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <Tabs defaultValue="bookings" onValueChange={(value: string) => setActiveTab(value as "bookings" | "visits")}>
          <TabsList className="grid w-full grid-cols-2 gap-2 bg-slate-100 dark:bg-gray-900/20 p-1">
            <TabsTrigger value="bookings" className="bg-slate-100 p-2">
              <Mail className="h-4 w-4 mr-2" />
              Bookings
              <Badge variant="default" className="ml-2 bg-black text-white h-6 w-6 p-1 flex items-center justify-center rounded-full">
                {bookings.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="visits" className="bg-slate-100 p-2">
              <Calendar className="h-4 w-4 mr-2" />
              Visits
              <Badge variant="default" className="ml-2 bg-black text-white h-6 w-6 p-1 flex items-center justify-center rounded-full">
                {visits.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* List Panel */}
          <Card className="lg:col-span-1 dark:bg-gray-900/40 mt-4">
            <CardHeader>
              <CardTitle className="uppercase text-md">
                {activeTab === "bookings" ? "Inquiries" : "Scheduled Visits"}
              </CardTitle>
              <CardDescription>
                {items.length} {activeTab === "bookings" ? "bookings" : "visits"} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[calc(100vh-300px)] p-1 overflow-y-auto">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-16 bg-muted/10 rounded animate-pulse" />
                  ))
                ) : items.length > 0 ? (
                  items.map((item) => (
                    <Card
                      key={item._id}
                      className={`p-4 cursor-pointer transition-all ${
                        selected?._id === item._id
                          ? "border-primary-600/20 bg-primary-50 dark:bg-primary-900/20"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => handleSelect(item)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">
                              {activeTab === "bookings"
                                ? (item as Inquiry).PropertyName
                                : (item as Visit).propertyName}
                            </h3>
                            {item.viewed && (
                              <Badge variant="outline" className="h-5 bg-green-600">
                                Viewed
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {activeTab === "bookings"
                              ? (item as Inquiry).name
                              : (item as Visit).visitorName}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation()
                              markAsViewed(item._id)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteItem(item._id)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No {activeTab === "bookings" ? "bookings" : "visits"} found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Detail Panel */}
          <div className="lg:col-span-1 dark:bg-gray-900/40 mt-4">
            <Card className="dark:bg-gray-900/50 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="uppercase text-md">
                  {selected
                    ? activeTab === "bookings"
                      ? "Inquiry Details"
                      : "Visit Details"
                    : "Select an Item"}
                </CardTitle>
                <CardDescription>
                  {selected
                    ? "Detailed information about this " +
                      (activeTab === "bookings" ? "inquiry" : "visit")
                    : "Choose an item from the list to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selected ? (
                  <div className="space-y-6">
                    {activeTab === "bookings" ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>Name</span>
                            </div>
                            <p className="font-medium">{(selected as Inquiry).name}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>Email</span>
                            </div>
                            <p className="font-medium">{(selected as Inquiry).email}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>Phone</span>
                            </div>
                            <p className="font-medium">{(selected as Inquiry).phone}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Home className="h-4 w-4 text-muted-foreground" />
                              <span>Property</span>
                            </div>
                            <p className="font-medium">{(selected as Inquiry).PropertyName}</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            <span>Message</span>
                          </div>
                          <p className="font-medium">
                            {(selected as Inquiry).inquiryMessage || "No message provided"}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span className="text-primary-600">
                            Received: {new Date((selected as Inquiry).createdAt).toLocaleString()}
                          </span>
                          {(selected as Inquiry).viewed && (
                            <Badge variant="default" className="flex items-center gap-1">
                              <Check className="h-4 w-4 text-primary-600" />
                              Viewed
                            </Badge>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <User className="h-4 w-4" />
                              <span>Visitor</span>
                            </div>
                            <p className="font-medium">{(selected as Visit).visitorName}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="h-4 w-4" />
                              <span>Contact</span>
                            </div>
                            <p className="font-medium">{(selected as Visit).contact}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Home className="h-4 w-4" />
                              <span>Property</span>
                            </div>
                            <p className="font-medium">{(selected as Visit).propertyName}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>Visit Date</span>
                            </div>
                            <p className="font-medium">
                            {new Date((selected as Visit).visitDate).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>
                            Created: {new Date((selected as Visit).visitDate).toLocaleString()}
                          </span>
                          {(selected as Visit).viewed && (
                            <Badge variant="default" className="flex items-center gap-1">
                              <Check className="h-3 w-3" />
                              Viewed
                            </Badge>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
                    <div className="bg-muted p-4 rounded-full">
                      {activeTab === "bookings" ? (
                        <Mail className="h-8 w-8 text-muted-foreground" />
                      ) : (
                        <Calendar className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <h3 className="text-lg font-medium">
                      No {activeTab === "bookings" ? "booking" : "visit"} selected
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Select an item from the list to view details
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
