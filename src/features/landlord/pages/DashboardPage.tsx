/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Plus } from "lucide-react"

import PropertyOverview from "../components/dashboardComponents/PropertyOverview"
import FinancialOverview from "../components/dashboardComponents/FinancialOverview"
import MaintenanceRequests from "../components/dashboardComponents/MaintananceRequests"
import AddCaretakerModal from "../components/caretakers/AddCaretakerModal"
import { generateDashboardReport } from "../../../utils/exportToPDF"
import { useAuth } from "../../../context/AuthContext"

// Import your API service here (example)
import { addCaretaker } from "../../../services/caretakerService"

const LandlordDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useAuth()

  // TODO: Replace this with dynamic data from backend or context
  const propertyList = [
    { id: "all", name: "All (Full Access)" },
    { id: "1", name: "Kileleshwa Heights" },
    { id: "2", name: "Westlands Residency" },
    { id: "3", name: "Karen Apartments" },
  ]

  const handleAddCaretaker = async (data: any) => {
    try {
      console.log("New Caretaker Submitted:", data)
      // Call your backend API to save caretaker
      await addCaretaker(data)
      setIsModalOpen(false)
      // Optionally, show success toast or refresh caretakers list
      alert("Caretaker added successfully!")
    } catch (error) {
      console.error("Failed to add caretaker:", error)
      alert("Failed to add caretaker. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Main content */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 pb-8">
          <div className="shadow rounded-xs">
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-6 md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
                    Landlord Dashboard
                  </h2>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4 space-x-2">
                  <button
                    onClick={() => generateDashboardReport(user)}
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    Export
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    Add Caretaker/s
                  </button>

                  <Link
                    to="properties"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Property
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <PropertyOverview />
              <FinancialOverview />
              <div className="mt-8">
                <MaintenanceRequests />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ✅ Caretaker Modal */}
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
