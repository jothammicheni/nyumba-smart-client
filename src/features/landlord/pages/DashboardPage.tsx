/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import {  Plus} from "lucide-react"

import PropertyOverview from "../components/dashboardComponents/PropertyOverview.js"
import FinancialOverview from "../components/dashboardComponents/FinancialOverview.js"
import RecentActivity from "../components/dashboardComponents/RecentActivity.js"
import UpcomingPayments from "../components/dashboardComponents/UpcomingPayments.js"
import MaintenanceRequests from "../components/dashboardComponents/MaintananceRequests.js"

const LandlordDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
     
      {/* Main content */}
      <div className=" flex flex-col flex-1">
        {/* Main content area */}
        <main className="flex-1 pb-8">
          <div className="shadow rounded-xs">
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-6 md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
                    Landlord Dashboard
                  </h2>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    Export
                  </button>
                  <Link
                    to="properties"
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
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
              {/* Stats cards */}
              <PropertyOverview/>

              {/* Financial stats */}
            <FinancialOverview/>
     
              {/* Recent Activity and Upcoming Payments */}
              <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
                {/* Recent Activity */}
              <RecentActivity/>

                {/* Upcoming Payments */}
               <UpcomingPayments/> 
              </div>

               <div className="mt-8">
                {/* mantanance claims */}
               <MaintenanceRequests/>
               </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default LandlordDashboard
