import axios from "axios"
import { DollarSign, CreditCard, TrendingUp, BarChart2, Download, Calendar, Percent, Wallet } from "lucide-react"
import { useEffect, useState } from "react"
import { getAuthHeaders } from "../../../services/authService.js"
import { Loader } from "../../../components/Loader.js"

const EarningsPage = () => {
    const [loading, setLoading] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [stats, setStats] = useState({
        totalEarnings: 0,
        availableBalance: 0,
        pendingPayouts: 0,
        transactionsThisMonth: 0,
        commissionRate: "0%"
    })

    useEffect(() => {
        const fetchEarningsData = async () => {
            setLoading(true)
            try {
                const response = await axios.get('https://nyumba-smart-server.onrender.com/api/agents/referrals', {
                    headers: getAuthHeaders()
                })

                setStats(response.data.stats)
            } catch (error) {
                console.error("Error fetching earnings data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchEarningsData()
    }, [])

    const payoutHistory = [
        { id: 1, date: "2023-05-01", amount: 10000, method: "M-Pesa", status: "completed", reference: "PO123456789" },
        { id: 2, date: "2023-04-01", amount: 12000, method: "M-Pesa", status: "completed", reference: "PO987654321" },
        { id: 3, date: "2023-03-01", amount: 8000, method: "M-Pesa", status: "completed", reference: "PO456789123" },
        { id: 4, date: "2023-02-01", amount: 10000, method: "Bank Transfer", status: "completed", reference: "PO789123456" },
        { id: 5, date: "2023-01-01", amount: 15000, method: "M-Pesa", status: "completed", reference: "PO321654987" }
    ]

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
            month: "short",
            day: "numeric",
        })
    }

    if (loading) return <Loader />

    return (
        <div className="space-y-6 p-6 dark:bg-gradient-to-br from-primary-600/10 via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Earnings Dashboard</h1>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Total Earnings */}
                <div className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                                <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                        Total Earnings
                                    </dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                                            Ksh 0
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
                            <div className="flex-shrink-0 bg-green-100 dark:bg-green-900 p-3 rounded-full">
                                <Wallet className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                        Available Balance
                                    </dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                                            {formatCurrency(0)}
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pending Payouts */}
                <div className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
                                <CreditCard className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                        Pending Payouts
                                    </dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                                            {formatCurrency(0)}
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Earnings Chart Section */}
            <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h2 className="text-xl font-semibold">Earnings Overview</h2>
                    <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                        <div className="relative">
                            <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-900 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-950/40 hover:bg-gray-50 dark:hover:bg-gray-950/50 focus:outline-none">
                                <Calendar className="h-4 w-4 mr-2" />
                                This Month
                            </button>
                        </div>
                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-900 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-950/40 hover:bg-gray-50 dark:hover:bg-gray-950/50 focus:outline-none">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </button>
                    </div>
                </div>

                {/* Placeholder for chart */}
                <div className="bg-gray-50 dark:bg-gray-950/40 rounded-lg h-64 flex items-center justify-center">
                    <BarChart2 className="h-12 w-12 text-gray-400" />
                    <p className="ml-2 text-gray-500 dark:text-gray-400">Earnings chart will appear here</p>
                </div>
            </div>

            {/* Wallet Section */}
            <div className="mt-8 bg-white dark:bg-gray-900 shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Your Wallet</h3>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {formatCurrency(0)}
                        </span>
                    </div>
                    <div className="mt-4">
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                            Withdraw to M-Pesa
                        </button>
                    </div>
                </div>
            </div>

            {/* Payout History */}
            <div className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-primary-600/20 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Payout History</h2>
                    <button className="bg-gray-900/30 text-sm p-2 rounded font-medium text-primary-600 hover:text-primary-500">
                        View All
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-primary-600/20">
                        <thead className="bg-gray-50 dark:bg-gray-950/40">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Method
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Reference
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-950/10 divide-y divide-gray-200 dark:divide-primary-600/5">
                            {payoutHistory.map((payout) => (
                                <tr key={payout.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {formatDate(payout.date)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {formatCurrency(payout.amount)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {payout.method}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                                            Completed
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {payout.reference}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
    )
}

export default EarningsPage