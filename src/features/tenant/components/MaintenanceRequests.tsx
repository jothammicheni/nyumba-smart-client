/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import NewRequestModal from "./NewRequestModal.js";
import { getMaintananceRequests } from "../../../services/maintananceService.js";

interface MaintenanceRequest {
  _id: string;
  description: string
  status: "pending" | "assigned" | "in_progress" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "urgent"
  serviceType?: "plumbing" | "electrical" | "cleaning" | "security" | "wifi" | "other"
  createdAt: string;
}

const MaintananceRequests = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);

  const fetchRequests = async () => {
    try {
      const res = await getMaintananceRequests("");
      setRequests(res.data || []);
      console.log(res.data)

    } catch (err) {
      console.log('failed to load requests')
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Maintenance Requests</h3>
        <NewRequestModal onRequestCreated={fetchRequests} />
      </div>

      <div className="p-4">
        <ul className="divide-y divide-gray-200">
          {requests.map((request) => (
            <li key={request._id} className="py-3 flex items-center space-x-4">
              <div>
                {request.status === "completed" ? (
                  <CheckCircle className="text-green-600" size={24} />
                ) : request.status === "in_progress" ? (
                  <Clock className="text-blue-600" size={24} />
                ) : (
                  <AlertTriangle className="text-yellow-600" size={24} />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{request.description}</p>
                <p className="text-xs text-gray-500">Reported on {formatDate(request.createdAt)}</p>
              </div>
              <div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${request.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : request.status === "in_progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                  {request.status ? request.status.replace("_", " ").toUpperCase() : ""}

                </span>
              </div>
            </li>
          ))}

          {requests.length === 0 && (
            <li className="text-center py-3 text-sm text-gray-500">
              No maintenance requests found.
            </li>
          )}
        </ul>
      </div>
    </div>

  );
};

export default MaintananceRequests;
