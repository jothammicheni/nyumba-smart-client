import React, { useEffect, useState } from "react";
import { fetchLandlordMaintenanceRequests } from "../../../../services/maintananceService.js";
import { Wrench } from "lucide-react";
import { Link } from "react-router-dom";

interface MaintenanceRequest {
  _id: string;
  tenant: {
    name: string;
  };
  room: {
    property_id: {
      name: string;
    };
  };
  description: string;
  state: string;
  createdAt: string;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

const MaintenanceRequests: React.FC = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await fetchLandlordMaintenanceRequests();
        console.log("hello", data);

        setRequests(data);
      } catch (error) {
        console.error("Failed to fetch maintenance requests", error);
      }
    };

    fetchRequests();
  }, []);
  return (
    <>
      <div className="bg-white dark:bg-gray-950/50 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-600/20">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Maintenance Requests
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
              {requests.length > 0 ? (
                requests.map((req) => (
                  <li key={req._id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                          <Wrench className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {req.tenant?.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {req.room.property_id?.name}
                        </p>
                        <p className="text-sm text-blue-500 dark:text-blue-400 truncate ">
                          Issue: {req.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                          {req.state}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Reported: {formatDate(req.createdAt)}
                        </p>
                        <Link
                          to="properties/requests/:tenantId"
                          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          check
                        </Link>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500 dark:text-gray-400 py-4">
                  No maintenance requests found.
                </li>
              )}
            </ul>
          </div>
          <div className="mt-6">
            <a
              href="/landlord/dashboard/maintenance"
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900">
              View all
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaintenanceRequests;
