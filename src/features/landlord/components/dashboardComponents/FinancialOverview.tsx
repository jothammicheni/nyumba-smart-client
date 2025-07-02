import React, { useEffect, useState } from "react"
import axios from "axios"
import { AlertTriangle, CreditCard, DollarSign, Percent } from "lucide-react"
import { getAuthHeaders } from "../../../../services/authService.js"

const FinancialOverview = () => {
  const [financialStats, setFinancialStats] = useState({
    totalRevenue: 0,
    paidRent: 0,
    pendingRent: 0,
  })

  const [propertyStats, setPropertyStats] = useState({
    totalProperties: 0,
    totalRooms: 0,
    occupiedRooms: 0,
    vacantRooms: 0,
    maintenanceRooms: 0,
    occupancyRate: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {      try {

        const response = await axios.get("http://localhost:5000/api/landlord/financeStats", {
          headers:getAuthHeaders(),
        })

        setFinancialStats(response.data.financialStats)
        setPropertyStats(response.data.propertyStats)
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <>
      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Financial Overview
      </h3>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <StatCard
          icon={<DollarSign className="h-6 w-6 text-gray-400" />}
          title="Total Expected Rent"
          value={formatCurrency(financialStats.totalRevenue)}
        />

        {/* Paid Rent */}
        <StatCard
          icon={<CreditCard className="h-6 w-6 text-gray-400" />}
          title="Paid Rent"
          value={formatCurrency(financialStats.paidRent)}
        />

        {/* Pending Rent */}
        <StatCard
          icon={<AlertTriangle className="h-6 w-6 text-red-400" />}
          title="Pending Rent"
          value={formatCurrency(financialStats.pendingRent)}
        />

        {/* Occupancy Rate */}
        <StatCard
          icon={<Percent className="h-6 w-6 text-gray-400" />}
          title="Occupancy Rate"
          value={loading ? "..." : `${propertyStats.occupancyRate}%`}
        />
      </div>
    </>
  )
}

const StatCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode
  title: string
  value: string | number
}) => (
  <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {title}
            </dt>
            <dd>
              <div className="text-lg font-medium text-gray-900 dark:text-white">
                {value}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
)

export default FinancialOverview
