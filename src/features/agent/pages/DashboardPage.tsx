"use client"

import React, { useEffect, useState } from "react"
import WelcomeInfo from "../components/WelcomeInfo.js"
import Referralcode from "../components/Referralcode.js"
import Referrals from "../components/Referrals.js"
import { Percent, TrendingUp } from "lucide-react"
import  triggerAgentRegistrationBonus  from "../../../services/agentservice.js"

const AgentDashboard: React.FC = () => {
  const [walletBalance, setWalletBalance] = useState<number | null>(null)

useEffect(() => {
 {
    triggerAgentRegistrationBonus()
      .then((response) => {
        console.log("API Response:", response); // Add this line
        setWalletBalance(response.wallet_balance);
      })
      .catch((err) => {
        console.error("Failed to fetch wallet balance:", err);
        setWalletBalance(0);
      });
  }
});


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
      <div className="flex flex-col flex-1">
        <main className="flex-1 pb-8">
          <WelcomeInfo />
          <div className="mt-8">
            <div className="flex flex-col justify-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <Referralcode />
              <Referrals />

              {/* Wallet Card */}
              <div className="mt-8 bg-white dark:bg-gray-900 shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Your Wallet
                    </h3>
                    <span className="text-2xl font-bold text-green-600 dark:text-white">
                      {walletBalance !== null ? formatCurrency(walletBalance) : "Loading..."}
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

              {/* Commission Structure - stays unchanged */}
              {/* ... */}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AgentDashboard
