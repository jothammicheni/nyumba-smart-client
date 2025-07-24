/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react"
import { RefreshCw, Banknote, Download, FileSpreadsheet, FileText, TrendingUp, CreditCard, Eye, EyeOff, BarChart3, PieChart as PieChartIcon } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu"
import { Toaster, toast } from "sonner"
import axios from "axios"
import { getAuthHeaders } from "../../../services/authService.js"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import Chart from "chart.js/auto"
// import { Loader } from "../../../components/Loader.js"

// Extend jsPDF type to include lastAutoTable
declare module "jspdf" {
  interface jsPDF {
    lastAutoTable?: {
      finalY?: number
    }
  }
}

interface Payment {
  _id: string
  amount: number
  method: string
  status: string
  timestamp: string
  tenant: {
    user_id: string
  }
  room: {
    room_number: string
    type: string
  }
  property: {
    _id: string
    name: string
    city: string
    area: string
  }
}

interface IncomeStat {
  propertyName: string
  city: string
  area: string
  totalIncome: number
  countPayments: number
}

const PaymentsAndRevenue: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([])
  const [incomeStats, setIncomeStats] = useState<IncomeStat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const fetchRevenueData = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await axios.get("https://nyumba-smart-server.onrender.com/api/payment/landlord/revenue", {
        headers: getAuthHeaders(),
      })
      setPayments(res.data.payments)
      setIncomeStats(res.data.incomePerProperty)
      toast.success('Revenue data has been updated successfully.')
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load revenue data")
      toast.error(err.response?.data?.message || "Failed to load revenue data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRevenueData()
  }, [])

  const exportToExcel = () => {
    const summarySheet = XLSX.utils.json_to_sheet(
      incomeStats.map((stat) => ({
        Property: stat.propertyName,
        City: stat.city,
        Area: stat.area,
        "Total Income": stat.totalIncome,
        "Payment Count": stat.countPayments,
      }))
    )

    const paymentsSheet = XLSX.utils.json_to_sheet(
      payments.map((payment) => ({
        Date: new Date(payment.timestamp).toLocaleDateString(),
        Property: payment.property.name,
        Room: `${payment.room.room_number} (${payment.room.type})`,
        Method: payment.method,
        Amount: payment.amount,
        Status: payment.status,
      }))
    )

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Revenue Summary")
    XLSX.utils.book_append_sheet(workbook, paymentsSheet, "All Payments")

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" })
    saveAs(dataBlob, "revenue_data.xlsx")
    toast.success('Exported to Excel successfully.')
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.setTextColor("#007bff")
    doc.text("Revenue Summary Report", 14, 20)

    // Revenue Summary Table
    autoTable(doc, {
      head: [["Property", "City", "Area", "Total Income", "Payments"]],
      body: incomeStats.map((stat) => [
        stat.propertyName,
        stat.city,
        stat.area,
        `KES ${stat.totalIncome.toLocaleString()}`,
        stat.countPayments,
      ]),
      startY: 30,
      styles: { fontSize: 10 },
      headStyles: {
        fillColor: [0, 123, 255],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
    })

    const canvas = document.createElement("canvas")
    canvas.width = 500
    canvas.height = 250
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      doc.save("revenue_summary.pdf")
      return
    }

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: incomeStats.map((s) => s.propertyName),
        datasets: [
          {
            label: "Total Income",
            data: incomeStats.map((s) => s.totalIncome),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      },
      options: {
        responsive: false,
        animation: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { font: { size: 8 } } },
          y: { ticks: { font: { size: 8 } } },
        },
      },
    })

    setTimeout(() => {
      const chartY = doc.lastAutoTable?.finalY ?? 60
      doc.addImage(canvas.toDataURL("image/png"), "PNG", 14, chartY + 10, 180, 80)
      const nextY = chartY + 100

      // All Payments Table
      autoTable(doc, {
        startY: nextY,
        head: [["Date", "Property", "Room", "Method", "Amount", "Status"]],
        body: payments.map((p) => [
          new Date(p.timestamp).toLocaleDateString(),
          p.property.name,
          `${p.room.room_number} (${p.room.type})`,
          p.method,
          `KES ${p.amount.toLocaleString()}`,
          p.status,
        ]),
        styles: { fontSize: 8 },
        headStyles: {
          fillColor: [0, 123, 255],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
      })

      // Revenue Trend Chart (based on actual payment data)
      const trendCanvas = document.createElement("canvas")
      trendCanvas.width = 500
      trendCanvas.height = 250
      const trendCtx = trendCanvas.getContext("2d")

      if (!trendCtx) {
        doc.save("revenue_summary.pdf")
        return
      }

      const monthlyTotals: { [month: string]: number } = {}
      payments.forEach((p) => {
        const date = new Date(p.timestamp)
        const month = date.toLocaleString("default", { month: "short", year: "numeric" })
        monthlyTotals[month] = (monthlyTotals[month] || 0) + p.amount
      })

      const sortedMonths = Object.keys(monthlyTotals).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
      )

      const trendChart = new Chart(trendCtx, {
        type: "line",
        data: {
          labels: sortedMonths,
          datasets: [
            {
              label: "Monthly Revenue",
              data: sortedMonths.map((m) => monthlyTotals[m]),
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: false,
          animation: false,
        },
      })

      setTimeout(() => {
        doc.addPage()
        doc.setFontSize(16)
        doc.setTextColor("#007bff")
        doc.text("Revenue Trends", 14, 20)
        doc.addImage(trendCanvas.toDataURL("image/png"), "PNG", 14, 30, 180, 90)

        chart.destroy()
        trendChart.destroy()

        doc.save("revenue_summary.pdf")
        toast.success('Exported to PDF successfully.')
      }, 700)
    }, 700)
  }

  const filteredPayments = payments.filter(payment =>
    filterStatus === "all" || payment.status === filterStatus
  )

  const totalRevenue = incomeStats.reduce((sum, stat) => sum + stat.totalIncome, 0)
  const totalPayments = incomeStats.reduce((sum, stat) => sum + stat.countPayments, 0)

  const statusColors = {
    success: "bg-success text-success-foreground",
    pending: "bg-warning text-warning-foreground",
    failed: "bg-destructive text-destructive-foreground"
  }

  const getStatusBadge = (status: string) => (
    <Badge className={statusColors[status as keyof typeof statusColors] || "bg-muted"}>
      {status}
    </Badge>
  )

  const formatCurrency = (amount: number) => `KES ${amount.toLocaleString()}`

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
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Payments & Revenue</h1>
          <p className="text-muted-foreground">
            Track your rental income and payment history
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={fetchRevenueData}
            className="w-full sm:w-auto bg-primary-600 text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto bg-primary-600 text-white">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={exportToExcel}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export to Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToPDF}>
                <FileText className="h-4 w-4 mr-2" />
                Export to PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-5 w-5 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-revenue">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all properties
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale dark:bg-gray-900/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <CreditCard className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPayments}</div>
            <p className="text-xs text-muted-foreground">
              Successful transactions
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale dark:bg-gray-900/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties</CardTitle>
            <Banknote className="h-5 w-5 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{incomeStats.length}</div>
            <p className="text-xs text-muted-foreground">
              Active properties
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale dark:bg-gray-900/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Payment</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalPayments > 0 ? Math.round(totalRevenue / totalPayments) : 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Per transaction
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dark:bg-gray-900/50 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-4">
                <BarChart3 className="w-5 h-5 text-primary-600 dark:text-primary-600" />
              </div>
                <span>Revenue by Property</span>
            </CardTitle>
            <CardDescription>Income distribution across properties</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {incomeStats.map((stat, index) => {
              const percentage = totalRevenue > 0 ? (stat.totalIncome / totalRevenue) * 100 : 0
              return (
                <div key={stat.propertyName} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">{stat.propertyName}</span>
                    <span className="text-muted-foreground">
                      {formatCurrency(stat.totalIncome)} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900/50 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-4">
              <PieChartIcon className="w-5 h-5 text-primary-600 dark:text-primary-600" />
              </div>
              Payment Distribution
            </CardTitle>
            <CardDescription>Number of payments per property</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {incomeStats.map((stat, index) => {
              const percentage = totalPayments > 0 ? (stat.countPayments / totalPayments) * 100 : 0
              const colors = ['bg-primary', 'bg-success', 'bg-warning']
              const colorClass = colors[index % colors.length]

              return (
                <div key={stat.propertyName} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${colorClass}`} />
                    <div>
                      <p className="font-medium text-sm">{stat.propertyName}</p>
                      <p className="text-xs text-muted-foreground">{stat.city}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{stat.countPayments}</p>
                    <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Property Income Cards */}
      <Card className="dark:bg-gray-900/50 shadow-md">
        <CardHeader>
          <CardTitle>Property Performance</CardTitle>
          <CardDescription>Revenue breakdown by property</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {incomeStats.map((stat) => (
              <Card key={stat.propertyName} className="hover-scale">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Banknote className="h-5 w-5 text-revenue" />
                    <Badge variant="outline">{stat.countPayments} payments</Badge>
                  </div>
                  <CardTitle className="text-lg">{stat.propertyName}</CardTitle>
                  <CardDescription>{stat.city}, {stat.area}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-revenue">
                    {formatCurrency(stat.totalIncome)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payments Table/Cards */}
      <Card className="dark:bg-gray-900/50 shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>Latest payment transactions</CardDescription>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-32 hover:bg-primary-600 dark:text-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setViewMode(viewMode === "cards" ? "table" : "cards")}
                className="w-full sm:w-auto hover:bg-primary-600"
              >
                {viewMode === "cards" ? (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Table View
                  </>
                ) : (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Card View
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "cards" ? (
            <div className="space-y-4">
              {filteredPayments.map((payment) => (
                <Card key={payment._id} className="hover-scale">
                  <CardContent className="pt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{payment.property.name}</h4>
                          {getStatusBadge(payment.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Room {payment.room.room_number} ({payment.room.type})
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {payment.property.city}, {payment.property.area}
                        </p>
                      </div>

                      <div className="text-right space-y-1">
                        <p className="text-2xl font-bold text-revenue">
                          {formatCurrency(payment.amount)}
                        </p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {payment.method.replace('_', ' ')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(payment.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
 <div className="overflow-x-auto">
  <table className="min-w-full table-auto border-collapse">
    <thead className="bg-gray-100 text-sm text-gray-600">
      <tr>
        <th className="text-left px-4 py-3">Property & Room</th>
        <th className="text-left px-4 py-3">Amount</th>
      </tr>
    </thead>
    <tbody className="text-sm text-gray-700">
      {filteredPayments.map(payment => (
        <tr key={payment._id} className="border-b even:bg-gray-50">
          <td className="px-4 py-3">
            <p className="font-medium">{payment.property.name}</p>
            <p className="text-sm text-gray-500">
              Room {payment.room.room_number}
            </p>
          </td>
          <td className="px-4 py-3 font-semibold text-revenue">
            {formatCurrency(payment.amount)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


          )}

          {filteredPayments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No payments found for the selected filter.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default PaymentsAndRevenue
