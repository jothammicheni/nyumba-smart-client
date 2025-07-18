import { getAuthHeaders } from "../../../services/authService.js";
import axios from "axios";
import { DollarSign, UserPlus, UserCheck, Clock, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Loader } from "../../../components/Loader.js";

function Referrals() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReferrals: 0,
    activeReferrals: 0,
    pendingReferrals: 0,
    totalEarnings: 0,
    pendingPayouts: 0,
    availableBalance: 0,
    totalPotentialValue: 0,
  });
  const [activeReferrals, setActiveReferrals] = useState<any[]>([]);
  const [pendingReferrals, setPendingReferrals] = useState<any[]>([]);

  useEffect(() => {
    const fetchReferralInfo = async () => {
      try {
        const response = await axios.get("https://nyumba-smart-server.onrender.com/api/agents/referrals", {
          headers: getAuthHeaders(),
        });

        setStats(response.data.stats);
        setActiveReferrals(response.data.activeReferrals);
        setPendingReferrals(response.data.pendingReferrals);
      } catch (error) {
        console.error("Error fetching agent info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralInfo();
  }, []);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
  {/* Active Referrals Count */}
  <div className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0 p-1.5 rounded-full bg-green-500/20">
          <UserCheck className="h-6 w-6 text-green-500" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              Active Referrals
            </dt>
            <dd>
              <div className="text-lg font-medium text-gray-900 dark:text-white">
                {stats.activeReferrals}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>

  {/* Pending Referrals Count */}
  <div className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0 p-1.5 bg-yellow-500/20 rounded-full">
          <Clock className="h-6 w-6 text-yellow-500" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              Pending Referrals
            </dt>
            <dd>
              <div className="text-lg font-medium text-gray-900 dark:text-white">
                {stats.pendingReferrals}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>

  {/* Total Potential Value */}
  <div className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0 p-1.5 bg-blue-500/20 rounded-full">
          <DollarSign className="h-6 w-6 text-blue-500" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              Total Potential Value
            </dt>
            <dd>
              <div className="text-lg font-medium text-gray-900 dark:text-white">
                {formatCurrency(stats.totalPotentialValue)}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>

  {/* Total Earnings */}
  <div className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0 p-1.5 rounded-full bg-purple-500/20">
          <DollarSign className="h-6 w-6 text-purple-500" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              Total Earnings
            </dt>
            <dd>
              <div className="text-lg font-medium text-gray-900 dark:text-white">
                {formatCurrency(stats.totalEarnings)}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>

  {/* Available Balance */}
  <div className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0 p-1.5 rounded-full bg-indigo-500/20">
          <Wallet className="h-6 w-6 text-indigo-500" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              Available Balance
            </dt>
            <dd>
              <div className="text-lg font-medium text-gray-900 dark:text-white">
                {formatCurrency(stats.availableBalance)}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default Referrals;
