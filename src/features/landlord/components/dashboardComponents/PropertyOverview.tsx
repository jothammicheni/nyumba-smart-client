/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { AlertTriangle, Building, Home, Users } from 'lucide-react'
import React, { useState,useEffect } from 'react'
import { getPropertyStats } from '../../../../services/propertyService.js'
import { fetchLandlordMaintenanceRequests } from '../../../../services/maintananceService.js'

function PropertyOverview() {

   const [loading, setLoading] = useState(true)
   const [error, setError] = useState("")
   const [totalMaintanance,setTotalMaintanance] = useState(0)
    
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
//fetch total maintanances

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await fetchLandlordMaintenanceRequests();
        console.log("hello", data);
        setTotalMaintanance(data.length);
        // setRequests(data);
      } catch (error) {
        console.error("Failed to fetch maintenance requests", error);
      }
    };

    fetchRequests();
  }, []);


  return (
              <>
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mt-8 mb-4">
                Property Overview
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {/* Card 1 */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Building className="h-6 w-6 text-gray-400" />
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
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Users className="h-6 w-6 text-gray-400" />
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
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Home className="h-6 w-6 text-gray-400" />
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
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-6 w-6 text-gray-400" />
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
