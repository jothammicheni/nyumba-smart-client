/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from "react"
import { Users, Search, RefreshCw, User, Plus, Eye, EyeOff } from "lucide-react"
import { getTenants } from "../../../services/propertyService.js"
import AddTenantModal from "../components/AddTenantModal.js"
import TenantActionsModal from "../components/TenantModals/TenantActionsModal.js"
import RentPaymentModal from "../components/TenantModals/RentPaymentModal.js"
import ConfirmPaymentModal from "../components/TenantModals/ConfirmPaymentModal.js"
import axios from "axios"
import { getAuthHeaders } from "../../../services/authService.js"
import { Toaster, toast } from "sonner"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"

interface Tenant {
  _id: string
  user_id: string
  room_id: string
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
  lease?: {
    balance: number
    leaseStart?: string
    leaseEnd?: string
    dueDate?: number
  } | null
  payment?: {
    status: string
    amount: number
    timestamp: string
  } | null
  lease_status: string
  join_date: string
}

const TenantsPage: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)
  const [isActionsModalOpen, setIsActionsModalOpen] = useState(false)
  const [isRentPaymentOpen, setIsRentPaymentOpen] = useState(false)
  const [paymentTenant, setPaymentTenant] = useState<Tenant | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [confirmData, setConfirmData] = useState<{
    tenant: Tenant
    amount: number
    method: string
    mpesaCode?: string
  } | null>(null)

  const fetchTenants = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await getTenants()
      setTenants(response.data || [])
      toast.success('Tenants data has been updated successfully.')
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || "Failed to fetch tenants"
      setError(errorMsg)
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTenants()
  }, [])

  const filteredTenants = tenants.filter((tenant) => {
    if (!tenant?.user || !tenant?.room) return false

    const searchLower = searchTerm.toLowerCase()
    const nameMatch = tenant.user.name?.toLowerCase().includes(searchLower) ?? false
    const emailMatch = tenant.user.email?.toLowerCase().includes(searchLower) ?? false
    const roomMatch = tenant.room.room_number?.toLowerCase().includes(searchLower) ?? false

    return nameMatch || emailMatch || roomMatch
  }).filter(tenant =>
    filterStatus === "all" ||
    (filterStatus === "paid" && tenant.lease?.balance === 0) ||
    (filterStatus === "pending" && (tenant.lease?.balance ?? 0) > 0)
  )

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    } catch {
      return "Invalid date"
    }
  }

  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return "$0.00"
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "KES"
    })
  }

  const openRentPayment = (tenant: Tenant) => {
    if (!tenant) return
    setPaymentTenant(tenant)
    setIsRentPaymentOpen(true)
  }

  const handleRentPaymentSubmit = (amount: number, method: string, mpesaCode?: string) => {
    if (!paymentTenant) return
    setIsRentPaymentOpen(false)
    setConfirmData({
      tenant: paymentTenant,
      amount,
      method,
      mpesaCode
    })
    setIsConfirmOpen(true)
  }

  const handleConfirmPayment = async () => {
    if (!confirmData?.tenant) {
      toast.error("Invalid payment data")
      return
    }

    const { tenant, amount, method, mpesaCode } = confirmData

    try {
      await axios.post(
        "https://nyumba-smart-server.onrender.com/api/payment/update",
        {
          tenantId: tenant.user._id,
          roomId: tenant.room._id,
          propertyId: tenant.room.property_id,
          amount,
          method,
          mpesa_code: mpesaCode,
        },
        { headers: getAuthHeaders() }
      )

      toast.success("Payment confirmed successfully!")
      setIsConfirmOpen(false)
      setConfirmData(null)
      setPaymentTenant(null)
      await fetchTenants()
    } catch (err: any) {
      console.error("Payment failed:", err)
      toast.error("Payment failed: " + (err.response?.data?.error || err.message))
    }
  }

  const getStatusBadge = (tenant: Tenant) => {
    const isPaid = tenant.lease?.balance === 0
    return (
      <Badge className={isPaid ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"}>
        {isPaid ? "Paid" : "Pending"}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-4">
          <div className="h-8 bg-muted/10 rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-muted/10 rounded animate-pulse" />
            ))}
          </div>
          <div className="h-64 bg-muted/10 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6 animate-fade-in">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tenant Management</h1>
          <p className="text-muted-foreground">
            Manage your tenants and rental payments
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="default"
            onClick={fetchTenants}
            className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 dark:text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>

          <Button
            variant="default"
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto hover:bg-primary-700 hover:text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Tenant
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          ⚠️ {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-scale dark:bg-gray-900/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
            <Users className="h-5 w-5 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredTenants.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all properties
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale dark:bg-gray-900/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leases</CardTitle>
            <User className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tenants.filter(t => t.lease_status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently renting
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale dark:bg-gray-900/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <User className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tenants.filter(t => (t.lease?.balance ?? 0) > 0).length}
            </div>
            <p className="text-xs text-muted-foreground">
              With outstanding balance
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale dark:bg-gray-900/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Up</CardTitle>
            <User className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tenants.filter(t => t.lease?.balance === 0).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Fully paid tenants
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tenants Table/Cards */}
      <Card className="dark:bg-gray-900/50 border border-gray-300 dark:border-primary-600/20 shadow-md">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col space-y-1">
              <CardTitle className="text-lg sm:text-xl">Tenant List</CardTitle>
              <CardDescription className="text-sm">Manage your property tenants</CardDescription>
            </div>

            <div className="flex flex-col gap-3">
              {/* Search - full width on mobile */}
              <div className="relative w-full">
                <Search className="absolute top-3 left-3 h-5 w-5 text-primary-600" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-9 pr-3 py-3 text-sm border rounded-md bg-white/90 dark:bg-gray-900"
                  placeholder="Search tenants..."
                />
              </div>

              <div className="flex flex-row gap-2">
                {/* Filter dropdown - takes available space */}
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="flex-1 text-sm h-12 px-4 py-4">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent className="px-4 py-2">
                    <SelectItem value="all" className="text-sm px-4 py-2">All</SelectItem>
                    <SelectItem value="paid" className="text-sm px-4 py-2">Paid</SelectItem>
                    <SelectItem value="pending" className="text-sm px-4 py-2">Pending</SelectItem>
                  </SelectContent>
                </Select>

                {/* View toggle - icon only on mobile */}
                <Button
                  variant="outline"
                  size="lg"
                  className="p-2 sm:px-4 sm:py-2 hover:bg-primary-600"
                  onClick={() => setViewMode(viewMode === "cards" ? "table" : "cards")}
                >
                  {viewMode === "cards" ? (
                    <Eye className="h-4 w-4 sm:mr-2" />
                  ) : (
                    <EyeOff className="h-4 w-4 sm:mr-2" />
                  )}
                  <span className="hidden sm:inline">
                    {viewMode === "cards" ? "Table" : "Card"} View
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {viewMode === "cards" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTenants.map((tenant) => {
                const isPaid = tenant.lease?.balance === 0
                const balance = tenant.lease?.balance ?? 0

                return (
                  <Card key={tenant._id} className="hover-scale bg-white/90 shadow-lg dark:bg-gray-950/50">
                    <CardContent className="pt-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 bg-gray-100 dark:bg-primary-600/30 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-primary-600 dark:text-primary-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{tenant.user.name || "N/A"}</h4>
                          <p className="text-sm text-muted-foreground">
                            Room {tenant.room.room_number}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Status</span>
                          {getStatusBadge(tenant)}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Balance</span>
                          <span className="font-medium">{formatCurrency(balance)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Joined</span>
                          <span className="text-sm">{formatDate(tenant.join_date)}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between gap-2">
                        <Button
                          variant="outline"
                          className="w-full bg-primary-600 hover:bg-primary-700 hover:text-white"
                          onClick={() => {
                            setSelectedTenant(tenant)
                            setIsActionsModalOpen(true)
                          }}
                        >
                          Actions
                        </Button>
                        {!isPaid && (
                          <Button
                            variant="default"
                            className="w-full hover:bg-primary-600 hover:text-white"
                            onClick={() => openRentPayment(tenant)}
                          >
                            Pay Rent
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="uppercase">
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTenants.map((tenant) => {
                    const isPaid = tenant.lease?.balance === 0
                    const balance = tenant.lease?.balance ?? 0

                    return (
                      <TableRow key={tenant._id}>
                        <TableCell>
                          <div className="flex items-center space-x-3 p-4">
                            <div className="h-10 w-10 bg-gray-200 dark:bg-primary-600/30 rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-primary-600 dark:text-primary-600" />
                            </div>
                            <div>
                              <p className="font-medium">{tenant.user.name || "N/A"}</p>
                              <p className="text-sm text-muted-foreground">
                                {tenant.user.email || "N/A"}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          Room {tenant.room.room_number}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(tenant)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(balance)}
                        </TableCell>
                        <TableCell>
                          {formatDate(tenant.join_date)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="default"
                              className="bg-primary-600 hover:bg-primary-700"
                              onClick={() => {
                                setSelectedTenant(tenant)
                                setIsActionsModalOpen(true)
                              }}
                            >
                              Actions
                            </Button>
                            {!isPaid && (
                              <Button
                                variant="default"
                                size="default"
                                onClick={() => openRentPayment(tenant)}
                              >
                                Pay Rent
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}

          {filteredTenants.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No tenants found for the selected filter.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <AddTenantModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchTenants}
      />

      {selectedTenant && (
        <TenantActionsModal
          isOpen={isActionsModalOpen}
          onClose={() => setIsActionsModalOpen(false)}
          tenant={selectedTenant}
          onEdit={() => {
            setIsActionsModalOpen(false)
            toast.info("Edit functionality coming soon")
          }}
          onDelete={async () => {
            setIsActionsModalOpen(false)
            toast.info("Delete functionality coming soon")
          }}
          onMarkPaid={() => {
            setIsActionsModalOpen(false)
            openRentPayment(selectedTenant)
          }}
        />
      )}

      {paymentTenant && (
        <RentPaymentModal
          open={isRentPaymentOpen}
          onClose={() => setIsRentPaymentOpen(false)}
          tenant={paymentTenant}
          onSubmit={handleRentPaymentSubmit}
        />
      )}

      {confirmData && (
        <ConfirmPaymentModal
          open={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          confirmData={confirmData}
          onConfirm={handleConfirmPayment}
        />
      )}
    </div>
  )
}

export default TenantsPage
