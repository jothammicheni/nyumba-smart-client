import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
                const response = await axios.get("https://nyumba-smart-server.onrender.com/api/agents/info", {
                    headers: getAuthHeaders(),
                });
                setAgentInfo(response.data.data);
            }
            catch (error) {
                console.error("Error fetching agent info:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchAgentInfo();
    }, []);
    const handleShare = () => {
        const referralLink = `${window.location.origin}/?ref=${agentInfo.agentProfile.referralCode}`;
        const referralMessage = `Join NyumbaSmart using my referral code! Register here: ${referralLink}`;
        if (navigator.share) {
            navigator.share({
                title: "NyumbaSmart Referral",
                text: referralMessage,
                url: referralLink,
            })
                .then(() => console.log("Referral link shared successfully"))
                .catch((error) => console.error("Error sharing referral link:", error));
        }
        else {
            navigator.clipboard.writeText(referralMessage);
            alert("Referral message copied to clipboard. Share it with your contacts!");
        }
    };
    if (loading)
        return _jsx("div", { className: "text-center p-4", children: "Loading..." });
    if (!agentInfo)
        return _jsx("div", { className: "text-center capitalize p-4", children: "No agent information available." });
    return (_jsx("div", { className: "bg-white dark:bg-gray-800 shadow", children: _jsx("div", { className: "px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8", children: _jsxs("div", { className: "py-6 md:flex md:items-center md:justify-between", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("h2", { className: "text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate", children: ["Hi, Welcome ", agentInfo.agentProfile.name] }), _jsxs("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: [agentInfo.agentProfile.email, " - ", agentInfo.agentProfile.phone] }), _jsxs("p", { className: "flex gap-3 mt-1 text-md text-gray-500 dark:text-gray-400", children: [_jsx(MapPin, {}), agentInfo.agentProfile.city] }), _jsxs("p", { className: "mt-2 text-sm text-gray-500 dark:text-gray-400", children: [_jsx("strong", { children: "Referral Code:" }), " ", agentInfo.agentProfile.referralCode] })] }), _jsx("div", { className: "mt-4 flex md:mt-0 md:ml-4", children: _jsxs("button", { type: "button", onClick: handleShare, className: "ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", children: [_jsx(Share2, { className: "h-4 w-4 mr-2" }), "Share Referral Link"] }) })] }) }) }));
}
export default WelcomeInfo;
