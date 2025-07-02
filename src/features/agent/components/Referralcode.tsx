import { CheckCircle, Copy } from 'lucide-react'
import React, { useEffect } from 'react'
import axios from 'axios'
import { getAuthHeaders } from '../../../services/authService.js'
import { Loader } from '../../../components/Loader.js'

function Referralcode() {
    const [showCopiedMessage, setShowCopiedMessage] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const [agentInfo, setAgentInfo] = React.useState({
        agentProfile: {
            name: '',
            email: '',
            phone: '',
            city: '',
            referralCode: ''
        },
        stats: {
            totalReferrals: 0,
            activeReferrals: 0,
            totalEarnings: 0,
            pendingPayouts: 0,
            availableBalance: 0
        },
        referrals: []
    })
    const copyReferralCode = () => {
        navigator.clipboard.writeText(agentInfo.agentProfile.referralCode)
        setShowCopiedMessage(true)

        setTimeout(() => {
            setShowCopiedMessage(false);
        }, 3000);
    }

    // fetch agent info from API
    useEffect(() => {
        const fetchAgentInfo = async () => {
            try {
                const response = await axios.get("https://nyumba-smart-server.onrender.com/api/agents/info", {
                    headers: getAuthHeaders(),
                });
                setAgentInfo(response.data.data);
            } catch (error) {
                console.error("Error fetching agent info:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAgentInfo();
    }, []);

    if (loading) return <Loader />
    return (
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg mb-8">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                    Your Agent Referral Code
                </h3>
                <div className="bg-gray-50 dark:bg-gray-950/40 p-4 rounded-md flex items-center justify-between">
                    <div className="text-xl font-mono font-medium text-primary-600 dark:text-primary-500">
                        {agentInfo.agentProfile.referralCode || 'No referral code available!'}
                    </div>
                    <button
                        type="button"
                        onClick={copyReferralCode}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-800 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring focus:ring-offset focus:ring-primary-500"
                    >
                        {showCopiedMessage ? (
                            <>
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Code
                            </>
                        )}
                    </button>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Share this code with landlords to earn commission when they sign up.
                </p>
            </div>
        </div>
    )
}

export default Referralcode