/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { AlertTriangle, Building, Home, Users } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { getPropertyStats } from '../../../../services/propertyService.js'
import { fetchLandlordMaintenanceRequests } from '../../../../services/maintananceService.js'
import { Loader } from '../../../../components/Loader.js'

function PropertyOverview() {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [totalMaintanance, setTotalMaintanance] = useState(0)

  const [propertyStats, setPropertyStats] = useState({
    totalProperties: 0,
    totalRooms: 0,
    occupiedRooms: 0,
    vacantRooms: 0,
    maintenanceRooms: totalMaintanance,
    occupancyRate: 0,
  })
  useEffect(() => {
    fetchPropertyStats()
  }, [])

  const fetchPropertyStats = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await getPropertyStats()
      console.log(response.data)
      setPropertyStats(response.data)
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch property statistics")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await fetchLandlordMaintenanceRequests();
        console.log("hello", data);
        setTotalMaintanance(data.length);
      } catch (error) {
        console.error("Failed to fetch maintenance requests", error);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <Loader />


  return (
    <>
      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Property Overview
      </h3>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}

        <div className="bg-white dark:bg-gray-950/50 overflow-hidden shadow-md rounded-lg">
          <div className="p-5">
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 bg-green-600/30 dark:bg-green-600/30 rounded-full flex items-center justify-center mr-0">
                <Building className="w-5 h-5 text-green-600 dark:text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Total Properties
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-primary-500 dark:text-white">
                      {loading ? "..." : propertyStats.totalProperties}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-gray-950/50 overflow-hidden shadow-md rounded-lg">
          <div className="p-5">
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-0">
                <Users className="w-5 h-5 text-primary-600 dark:text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Occupied Units
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-primary-500 dark:text-white">
                      {loading ? "..." : propertyStats.occupiedRooms}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-gray-950/50 overflow-hidden shadow-md rounded-lg">
          <div className="p-5">
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 bg-green-600/30 dark:bg-green-600/30 rounded-full flex items-center justify-center mr-0">
                <Home className="w-5 h-5 text-green-600 dark:text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Vacant Units
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-primary-500 dark:text-white">
                      {loading ? "..." : propertyStats.vacantRooms}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-gray-950/50 overflow-hidden shadow-md rounded-lg">
          <div className="p-5">
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-0">
                <AlertTriangle className="w-5 h-5 text-primary-600 dark:text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Maintenance Requests
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-primary-500 dark:text-white">
                      {loading ? "..." : totalMaintanance}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PropertyOverview
