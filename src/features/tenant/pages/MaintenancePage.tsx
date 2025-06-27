import React from "react";

interface MaintenanceRequest {
  id: number;
  issue: string;
  submitted: string;
  status: "Resolved" | "In Progress";
}

const TenantMaintenancePage: React.FC = () => {
  const requests: MaintenanceRequest[] = [
    {
      id: 1,
      issue: "Leaking faucet",
      submitted: "2024-08-05",
      status: "In Progress",
    },
    {
      id: 2,
      issue: "Broken window lock",
      submitted: "2024-08-01",
      status: "Resolved",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-primary">Maintenance Requests</h1>
      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="p-4 bg-white rounded-2xl shadow border border-gray-200"
          >
            <h2 className="font-semibold text-secondary">{req.issue}</h2>
            <p className="text-sm text-muted">Submitted: {req.submitted}</p>
            <p
              className={`text-sm mt-1 ${
                req.status === "Resolved" ? "text-green-600" : "text-yellow-600"
              }`}
            >
              Status: {req.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantMaintenancePage;
