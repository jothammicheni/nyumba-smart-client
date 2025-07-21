import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthHeaders } from "../../../services/authService.js";
import { MapPin, Share2 } from "lucide-react";

function WelcomeInfo() {
    const [agentInfo, setAgentInfo] = useState({
        agentProfile: {
            name: '',
            email: '',
            phone: '',
            city: '',
            referralCode: ''
        },
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAgentInfo = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/agents/info", {
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

    const handleShare = () => {
        const referralLink = `${window.location.origin}/?ref=${agentInfo.agentProfile.referralCode}`;
        const referralMessage = `Join TenaHub using my referral code! Register here: ${referralLink}`;

        if (navigator.share) {
            navigator.share({
                title: "TenaHub Referral",
                text: referralMessage,
                url: referralLink,
            })
                .then(() => console.log("Referral link shared successfully"))
                .catch((error) => console.error("Error sharing referral link:", error));
        } else {
            navigator.clipboard.writeText(referralMessage);
            alert("Referral message copied to clipboard. Share it with your contacts!");
        }
    };

    if (loading) return <div className="text-center p-4">Loading...</div>;

    if (!agentInfo) return <div className="text-center capitalize p-4">No agent information available.</div>;

    return (
        <div className="bg-white dark:bg-gray-800 shadow">
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                <div className="py-6 md:flex md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
                            Hi, Welcome {agentInfo.agentProfile.name}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {agentInfo.agentProfile.email} - {agentInfo.agentProfile.phone}
                        </p>
                        <p className="flex gap-3 mt-1 text-md text-gray-500 dark:text-gray-400">
                            <MapPin />
                            {agentInfo.agentProfile.city}
                        </p>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <strong>Referral Code:</strong> {agentInfo.agentProfile.referralCode}
                        </p>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                        <button
                            type="button"
                            onClick={handleShare}
                            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share Referral Link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomeInfo;
