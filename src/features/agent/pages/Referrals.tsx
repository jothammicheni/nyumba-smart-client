/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthHeaders } from "../../../services/authService.js";
import axios from "axios";
import { DollarSign, UserPlus, UserCheck, Clock, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Loader } from "../../../components/Loader.js";

function ReferralsPage() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalReferrals: 0,
        activeReferrals: 0,
        pendingReferrals: 0,
        totalEarnings: 0,
        pendingPayouts: 0,
        availableBalance: 0,
    });
    const [activeReferrals, setActiveReferrals] = useState<any[]>([]);
    const [pendingReferrals, setPendingReferrals] = useState<any[]>([]);

    useEffect(() => {
        const fetchReferralInfo = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/agents/referrals", {
                    headers: getAuthHeaders(),
                });
                setStats(response.data.stats);
                setActiveReferrals(response.data.activeReferrals);
                setPendingReferrals(response.data.pendingReferrals);
            } catch (error) {
                console.error("Error fetching referral info:", error);
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

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-KE", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    if (loading) return <Loader />;

    return (
        <div className="space-y-6 p-6 bg-gradient-to-br from-blue-100 to-white dark:from-gray-950 dark:to-black">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                <StatCard icon={<UserCheck className="text-green-500" />} label="Active Referrals" value={stats.activeReferrals} />
                <StatCard icon={<Clock className="text-yellow-500" />} label="Pending Referrals" value={stats.pendingReferrals} />
                <StatCard icon={<DollarSign className="text-purple-500" />} label="Total Earnings" value={formatCurrency(stats.totalEarnings)} />
                <StatCard icon={<Wallet className="text-teal-500" />} label="Available Balance" value={formatCurrency(stats.availableBalance)} />
                <StatCard icon={<UserPlus className="text-blue-500" />} label="Total Referrals" value={stats.totalReferrals} />
            </div>

            {/* Active Referrals */}
            <ReferralTable
                title="Active Referrals"
                referrals={activeReferrals}
                amountLabel="Commission"
                badgeText={`Total: ${formatCurrency(
                    activeReferrals.reduce((sum, r) => sum + (r.commission || 0), 0)
                )}`}
                badgeColor="green"
                formatCurrency={formatCurrency}
                formatDate={formatDate}
            />

            {/* Pending Referrals */}
            <ReferralTable
                title="Pending Referrals"
                referrals={pendingReferrals}
                amountLabel="Potential Commission"
                badgeText={`Potential: ${formatCurrency(
                    pendingReferrals.reduce((sum, r) => sum + (r.commission || 0), 0)
                )}`}
                badgeColor="yellow"
                formatCurrency={formatCurrency}
                formatDate={formatDate}
            />
        </div>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
    return (
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-5 flex items-center">
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">{icon}</div>
            <div className="ml-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{value}</div>
            </div>
        </div>
    );
}

function ReferralTable({
    title,
    referrals,
    amountLabel,
    badgeText,
    badgeColor,
    formatCurrency,
    formatDate,
}: {
    title: string;
    referrals: any[];
    amountLabel: string;
    badgeText: string;
    badgeColor: string;
    formatCurrency: (amount: number) => string;
    formatDate: (date: string) => string;
}) {
    return (
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                <div
                    className={`bg-${badgeColor}-100 dark:bg-${badgeColor}-900 text-${badgeColor}-800 dark:text-${badgeColor}-200 px-3 py-1 rounded-full text-sm font-medium`}
                >
                    {badgeText}
                </div>
            </div>
            {referrals.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{amountLabel}</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-700">
                            {referrals.map((referral) => (
                                <tr key={referral._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{referral.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{referral.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{referral.phone || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{formatDate(referral.createdAt)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                                        {formatCurrency(referral.commission || 0)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">No {title.toLowerCase()}</p>
            )}
        </div>
    );
}

export default ReferralsPage;
