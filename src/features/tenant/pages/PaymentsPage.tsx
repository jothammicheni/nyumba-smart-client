import axios from "axios";
import { AlertTriangle, CheckCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getAuthHeaders } from "../../../services/authService";

interface Payment {
  id: number;
  date: string;
  amount: string;
  status: "Paid" | "Pending";
}

const TenantPaymentsPage: React.FC = () => {
  const [tenantInfo, setTenantInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const payments: Payment[] = [
    { id: 1, date: "2024-07-01", amount: "KSh 35,000", status: "Paid" },
    { id: 2, date: "2024-08-01", amount: "KSh 35,000", status: "Pending" },
    { id: 3, date: "2024-08-01", amount: "KSh 95,000", status: "Paid" },
  ];

  const handleViewReceipt = (id: number) => {
    alert(`Viewing receipt for payment ID: ${id}`);
  };

  const handleMakePayment = (id: number) => {
    alert(`Redirecting to payment portal for payment ID: ${id}`);
  };

  useEffect(() => {
    const fetchTenantInfo = async () => {
      try {
        const response = await axios.get(
          "https://nyumba-smart-server.onrender.com/api/tenants/info",
          {
            headers: getAuthHeaders(),
          }
        );
        setTenantInfo(response.data);
      } catch (error) {
        console.error("Error fetching tenant info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenantInfo();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;

  if (!tenantInfo)
    return (
      <div className="text-center p-4">No tenant information available.</div>
    );
  console.log(tenantInfo);

  return (
    <div className="p-2 space-y-1">
      <div className="lg:flex  md:flex items-center justify-between grid grid-cols-1">
        <h1 className="text-2xl font-semibold text-primary ">My Payments</h1>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {tenantInfo.balance > 0 ? (
              <AlertTriangle className="h-6 w-6 text-red-500" />
            ) : (
              <CheckCircle className="h-6 w-6 text-green-500" />
            )}
          </div>
          <div className="ml-5 w-0 flex-1 sm:pt-5">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Current Balance
              </dt>
              <dd>
                <div
                  className={`text-lg font-medium  ${
                    tenantInfo.balance > 0
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  ksh {tenantInfo.balance}
                </div>
              </dd>
            </dl>
          </div>
        </div>
        {tenantInfo.balance>0?(
          <button className="sm:mt-2 md:mt-2 inline-flex items-center gap-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Lipa Rent na M-Pesa
        </button>
        ):(<p></p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-3   ">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className=" flex gap-5  bg-white shadow rounded-xl border border-gray-100 p-5 space-y-2"
          >
            <div>
              <div className="text-sm text-gray-500">Date</div>
              <div className="font-medium">{payment.date}</div>

              <div className="text-sm text-gray-500">Amount</div>
              <div
                className={`font-semibold text-lg text-gray-900 ${
                  payment.status === "Paid" ? "text-black" : "text-primary-600"
                }`}
              >
                {payment.amount}
              </div>
            </div>

            <div className=" ml-6">
              <div className="text-sm text-gray-500">Status</div>
              <div
                className={`font-medium ${
                  payment.status === "Paid"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {payment.status}
              </div>

              <div className="pt-2">
                {payment.status === "Paid" ? (
                  <button
                    onClick={() => handleViewReceipt(payment.id)}
                    className="text-sm text-primary-600 hover:underline"
                  >
                    View Receipt
                  </button>
                ) : (
                  <button
                    onClick={() => handleMakePayment(payment.id)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantPaymentsPage;
