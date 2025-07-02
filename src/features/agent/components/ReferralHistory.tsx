import { useEffect, useState } from "react"

// Define the Referral type
interface Referral {
  _id: string
  landlord_id?: {
    name: string
  }
  status: string
  created_at: string
}
import axios from "axios"
import { getAuthHeaders } from "../../../services/authService.js"
import { UserPlus } from "lucide-react"

const ReferralHistory = () => {
  

  const [referrals, setReferrals] = useState<Referral[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await axios.get("https://nyumba-smart-server.onrender.com/api/agents/referrals", {
          headers: getAuthHeaders(),
        })
        setReferrals(response.data.data)
      } catch (error) {
        console.error("Error fetching referrals:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReferrals()
  }, [])

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })

  if (loading) return <div className="text-center p-4">Loading referrals...</div>

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Referral History</h3>
      </div>
      <div className="px-4 py-5 sm:p-6">
        {referrals.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No referrals yet.</p>
        ) : (
          <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
            {referrals.map((referral) => (
              <li key={referral._id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <UserPlus className="h-5 w-5 text-primary-500" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {referral.landlord_id?.name || "Unknown Landlord"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {referral.status} • {formatDate(referral.created_at)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ReferralHistory
