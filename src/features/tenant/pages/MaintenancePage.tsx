/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import NewRequestModal from "../components/NewRequestModal.js";
import { getMaintananceRequests } from "../../../services/maintananceService.js";
import { Loader } from "../../../components/Loader.js";

interface MaintenanceRequestPage {
  _id: string;
  description: string;
  status: "pending" | "assigned" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  serviceType?: "plumbing" | "electrical" | "cleaning" | "security" | "wifi" | "other";
  createdAt: string;
}

const MaintananceRequestsPage = () => {
  const [requests, setRequests] = useState<MaintenanceRequestPage[]>([]);
  const [loading, setLoading] = useState(false)

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const res = await getMaintananceRequests("");
      setRequests(res.data || []);
    } catch (err) {
      console.error("Failed to load requests");
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const statusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="text-green-600" size={20} />;
      case "in_progress":
      case "assigned":
        return <Clock className="text-blue-600" size={20} />;
      default:
        return <AlertTriangle className="text-yellow-600" size={20} />;
    }
  };

  const statusBadgeStyle = {
    completed: "bg-green-100 text-green-700",
    in_progress: "bg-blue-100 text-blue-700",
    assigned: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-gray-100 text-gray-700",
  };

  const priorityColor = {
    low: "text-green-600",
    medium: "text-yellow-600",
    high: "text-orange-600",
    urgent: "text-red-600",
  };

  if (loading) return <div><Loader /></div>

  return (
    <div className="bg-slate-100 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-primary-600/20">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Maintenance Requests</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Track and manage all reported issues</p>
        </div>
        <NewRequestModal onRequestCreated={fetchRequests} />
      </div>

      <div className="p-4 space-y-4">
        {requests.length === 0 ? (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            No maintenance requests found.
          </div>
        ) : (
          <ul className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {requests.map((request) => (
              <li key={request._id} className="bg-slate-50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 dark:hover:border-primary-600/20 hover:scale-105 transition-all duration-300 rounded-lg p-6 shadow-md flex gap-4 items-start">
                <div className="flex-shrink-0 pt-1">{statusIcon(request.status)}</div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-gray-900 dark:text-gray-100">{request.description}</p>
                    <span
                      className={`px-2 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap ${statusBadgeStyle[request.status]}`}>
                      {request.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap text-xs text-gray-500 dark:text-gray-400 gap-x-4">
                    <span>Reported on {formatDate(request.createdAt)}</span>
                    {request.priority && (
                      <span className={priorityColor[request.priority]}>
                        Priority: {request.priority.toUpperCase()}
                      </span>
                    )}
                    {request.serviceType && (
                      <span className="text-gray-400">
                        Type: {request.serviceType.charAt(0).toUpperCase() + request.serviceType.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MaintananceRequestsPage;
