"use client"

import type React from "react"
import WelcomeInfo from "../components/WelcomeInfo.js"
import Referralcode from "../components/Referralcode.js"
import Referrals from "../components/Referrals.js"
import { DollarSign, Percent, TrendingUp, UserPlus } from "lucide-react"

// Dummy data for the dashboard
const agentInfo = {
  walletBalance: 5000,
}

const referralHistory = [
  {
    id: 1,
    landlord: "John Doe",
    property: "Sunshine Apartments",
    date: "2023-05-10",
    status: "active",
    commission: 5000,
  },
  {
    id: 2,
    landlord: "Mary Smith",
    property: "Green Valley Residences",
    date: "2023-04-15",
    status: "active",
    commission: 6000,
  },
  {
    id: 3,
    landlord: "Robert Johnson",
    property: "Riverside Homes",
    date: "2023-03-20",
    status: "active",
    commission: 4500,
  },
  {
    id: 4,
    landlord: "Emily Brown",
    property: "Mountain View Apartments",
    date: "2023-02-25",
    status: "inactive",
    commission: 0,
  },
]

const payoutHistory = [
  { id: 1, date: "2023-05-01", amount: 10000, method: "M-Pesa", reference: "PO123456789" },
  { id: 2, date: "2023-04-01", amount: 12000, method: "M-Pesa", reference: "PO987654321" },
  { id: 3, date: "2023-03-01", amount: 8000, method: "M-Pesa", reference: "PO456789123" },
]

const AgentDashboard: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600/10 via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60">
      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Main content area */}
        <main className="flex-1 pb-8">
          {/* welcome info card */}
          <WelcomeInfo />

          <div className="mt-8">
            <div className="flex flex-col justify-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* referral code Card */}
              <Referralcode />

              {/* referral cards stats */}
              <Referrals />

              {/* Wallet Card */}
              <div className="mt-8 bg-white dark:bg-gray-900 shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Your Wallet</h3>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(agentInfo.walletBalance)}
                    </span>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Withdraw to M-Pesa
                    </button>
                  </div>
                </div>
              </div>

              {/* Referral History and Payout History */}
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Referral History */}
                <div className="bg-white dark:bg-gray-900 shadow rounded-lg">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-600/30 flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Referral History</h3>
                    <a href="#" className="text-sm font-medium p-1.5 rounded bg-primary-600/10 text-primary-600 hover:bg-primary-600/20">
                      View all
                    </a>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flow-root">
                      <ul className="-my-5 divide-y divide-gray-200 dark:divide-primary-600/10">
                        {referralHistory.map((referral) => (
                          <li key={referral.id} className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <div
                                  className={`h-8 w-8 rounded-full flex items-center justify-center ${referral.status === "active"
                                    ? "bg-primary-600/30 dark:bg-primary-600/30"
                                    : "bg-gray-100 dark:bg-gray-700"
                                    }`}
                                >
                                  <UserPlus
                                    className={`h-5 w-5 ${referral.status === "active"
                                      ? "text-primary-600 dark:text-primary-600"
                                      : "text-gray-500 dark:text-gray-400"
                                      }`}
                                  />
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {referral.landlord}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{referral.property}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {formatCurrency(referral.commission)}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(referral.date)}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Payout History */}
                <div className="bg-white dark:bg-gray-900 shadow rounded-lg">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-600/20 flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Payout History</h3>
                    <a href="#" className="text-sm font-medium p-1.5 rounded bg-primary-600/10 text-primary-600 hover:bg-primary-600/20">
                      View all
                    </a>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flow-root">
                      <ul className="-my-5 divide-y divide-gray-200 dark:divide-primary-600/10">
                        {payoutHistory.map((payout) => (
                          <li key={payout.id} className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-primary-600/30 dark:bg-primary-600/30 flex items-center justify-center">
                                  <DollarSign className="h-5 w-5 text-primary-600 dark:text-primary-600" />
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  Payout to {payout.method}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Ref: {payout.reference}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {formatCurrency(payout.amount)}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(payout.date)}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commission Structure */}
              <div className="mt-8 bg-white dark:bg-gray-900 shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-600/20">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Commission Structure</h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="bg-gray-50 dark:bg-gray-950/50 p-4 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <div className="h-12 w-12 rounded-full bg-primary-600/30 dark:bg-primary-600/30 flex items-center justify-center">
                          <Percent className="h-6 w-6 text-primary-600 dark:text-primary-600" />
                        </div>
                      </div>
                      <h4 className="text-center text-lg font-medium text-gray-900 dark:text-white mb-1">5%</h4>
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Commission on first month's rent
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-950/50 p-4 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <div className="h-12 w-12 rounded-full bg-primary-600/30 dark:bg-primary-600/30 flex items-center justify-center">
                          <Percent className="h-6 w-6 text-primary-600 dark:text-primary-600" />
                        </div>
                      </div>
                      <h4 className="text-center text-lg font-medium text-gray-900 dark:text-white mb-1">2%</h4>
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Recurring commission on monthly rent
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-950/50 p-4 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <div className="h-12 w-12 rounded-full bg-primary-600/30 dark:bg-primary-600/30 flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-primary-600 dark:text-primary-600" />
                        </div>
                      </div>
                      <h4 className="text-center text-lg font-medium text-gray-900 dark:text-white mb-1">KES 1,000</h4>
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Bonus for each new landlord referral
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AgentDashboard
