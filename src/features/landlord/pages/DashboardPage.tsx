/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Download, UserPlus } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card } from "../../../components/ui/card"
import { Toaster, toast } from "sonner"
import PropertyOverview from "../components/dashboardComponents/PropertyOverview"
import FinancialOverview from "../components/dashboardComponents/FinancialOverview"
import MaintenanceRequests from "../components/dashboardComponents/MaintananceRequests"
import AddCaretakerModal from "../components/caretakers/AddCaretakerModal"
import { generateDashboardReport } from "../../../utils/exportToPDF"
import { useAuth } from "../../../context/AuthContext"
import { addCaretaker } from "../../../services/caretakerService"

const LandlordDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useAuth()

  const propertyList = [
    { id: "all", name: "All (Full Access)" },
    { id: "1", name: "Kileleshwa Heights" },
    { id: "2", name: "Westlands Residency" },
    { id: "3", name: "Karen Apartments" },
  ]

  const handleAddCaretaker = async (data: any) => {
    try {
      await addCaretaker(data)
      setIsModalOpen(false)
      toast.success("Caretaker added successfully!")
    } catch (error) {
      console.error("Failed to add caretaker:", error)
      toast.error("Failed to add caretaker. Please try again.")
    }
  }

  const handleExport = () => {
    generateDashboardReport(user)
    toast.success("Dashboard report exported successfully!")
  }

  return (
    <div className="w-full max-w-none">
      <Toaster position="top-right" richColors />

      {/* Header Section */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mb-3 sm:items-center">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Landlord Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Overview of your properties and financial performance
          </p>
        </div>

        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="flex-1 sm:flex-none hover:bg-gray-950 hover:text-white"
            >
              <UserPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              <span className="text-xs sm:text-sm">Add Caretaker</span>
            </Button>

            <Link to="properties" className="flex-1 sm:flex-none">
              <Button
                size="lg"
                className="w-full hover:bg-gray-950 duration-300 transition-all hover:text-white"
              >
                <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                <span className="text-xs sm:text-sm">Add Property</span>
              </Button>
            </Link>
          </div>
          <Button
            variant="outline"
            onClick={handleExport}
            size="lg"
            className="w-full sm:flex-none bg-primary-600 text-white hover:text-white hover:bg-primary-700"
          >
            <Download className="h-3.5 w-3.5 sm:h-10 sm:w-4 mr-1.5 sm:mr-2" />
            <span className="text-xs sm:text-sm">Export</span>
          </Button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="space-y-6">
        <Card className="dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <PropertyOverview />
        </Card>

        <Card className="dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <FinancialOverview />
        </Card>

        <Card className="dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <MaintenanceRequests />
        </Card>
      </div>

      {/* Caretaker Modal */}
      <AddCaretakerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCaretaker}
        propertyOptions={propertyList}
      />
    </div>
  )
}

export default LandlordDashboard
