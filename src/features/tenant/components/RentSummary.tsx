/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertTriangle, Calendar, CheckCircle, DollarSign } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getAuthHeaders } from "../../../services/authService.js";
import axios from 'axios';
import { Loader } from '../../../components/Loader.js';

const RentSummary = () => {
  // Format currency

  const [tenantInfo, setTenantInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenantInfo = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tenants/info", {
          headers: getAuthHeaders(),
        });
        setTenantInfo(response.data);
      } catch (error) {
        console.error("Error fetching tenant info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenantInfo();
  }, []);

  if (loading) return <Loader />

  if (!tenantInfo) return <div className="text-center p-4">No tenant information available.</div>;
  console.log(tenantInfo)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Calculate next payment date
  const getNextPaymentDate = () => {
    const today = new Date()
    let nextPaymentDate = new Date(today.getFullYear(), today.getMonth(), tenantInfo.dueDate)

    if (today.getDate() > tenantInfo.dueDate) {
      nextPaymentDate = new Date(today.getFullYear(), today.getMonth() + 1, tenantInfo.dueDate)
    }

    return formatDate(nextPaymentDate.toISOString())
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-900 shadow rounded-lg mb-10">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-600/20">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Rent Summary</h3>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-gray-50 dark:bg-gray-950/50 overflow-hidden shadow-sm rounded-lg p-5">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-1">
                  <DollarSign className="w-6 h-6 text-primary-600 dark:text-primary-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Monthly Rent
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {formatCurrency(tenantInfo.rentAmount)}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-950/50 overflow-hidden shadow-sm rounded-lg p-5">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-1">
                  <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Next Payment Due
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {getNextPaymentDate()}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-950/50 overflow-hidden shadow-sm rounded-lg p-5">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-1">
                  {tenantInfo.balance > 0 ? (
                    <AlertTriangle className="w-6 h-6 text-primary-600 dark:text-primary-600" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-primary-600 dark:text-primary-600" />
                  )}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Current Balance
                    </dt>
                    <dd>
                      <div
                        className={`text-lg font-medium ${tenantInfo.balance > 0
                          ? "text-red-600 dark:text-red-400"
                          : "text-green-600 dark:text-green-400"
                          }`}
                      >
                        ksh {tenantInfo.balance}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="bg-gray-50 dark:bg-gray-950/50 overflow-hidden shadow-sm rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h4 className="text-base font-medium text-gray-900 dark:text-white capitalize mb-3">Lease Information</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Lease Start Date</p>
                    <p className="mt-1 w-1/4 text-sm font-medium italic text-gray-600 dark:text-white">
                      {formatDate(tenantInfo.leaseStart)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Lease End Date</p>
                    <p className="mt-1 text-sm font-medium italic text-gray-600 dark:text-white">
                      {formatDate(tenantInfo.leaseEnd)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RentSummary
