/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Users, Search, RefreshCw, User } from "lucide-react";
import { getTenants } from "../../../services/propertyService.js";
import AddTenantModal from "../components/AddTenantModal.js";
import TenantActionsModal from "../components/TenantModals/TenantActionsModal.js";
import RentPaymentModal from "../components/TenantModals/RentPaymentModal.js";
import ConfirmPaymentModal from "../components/TenantModals/ConfirmPaymentModal.js";
import axios from "axios";
import { getAuthHeaders } from "../../../services/authService.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Tenant {
  _id: string;
  user_id: string;
  room_id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  room: {
    _id: string;
    room_number: string;
    property_id: string;
  };
  lease?: {
    balance: number;
    leaseStart?: string;
    leaseEnd?: string;
    dueDate?: number;
  } | null;
  payment?: {
    status: string;
    amount: number;
    timestamp: string;
  } | null;
  lease_status: string;
  join_date: string;
}

const TenantsPage: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);
  const [isRentPaymentOpen, setIsRentPaymentOpen] = useState(false);
  const [paymentTenant, setPaymentTenant] = useState<Tenant | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState<{
    tenant: Tenant;
    amount: number;
    method: string;
    mpesaCode?: string;
  } | null>(null);

  const fetchTenants = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getTenants();
      setTenants(response.data || []);
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || "Failed to fetch tenants";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const filteredTenants = tenants.filter((tenant) => {
    if (!tenant?.user || !tenant?.room) return false;

    const searchLower = searchTerm.toLowerCase();
    const nameMatch =
      tenant.user.name?.toLowerCase().includes(searchLower) ?? false;
    const emailMatch =
      tenant.user.email?.toLowerCase().includes(searchLower) ?? false;
    const roomMatch =
      tenant.room.room_number?.toLowerCase().includes(searchLower) ?? false;

    return nameMatch || emailMatch || roomMatch;
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return "Ksh 0.00";
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "KES",
    });
  };

  const openRentPayment = (tenant: Tenant) => {
    if (!tenant) return;
    setPaymentTenant(tenant);
    setIsRentPaymentOpen(true);
  };

  const handleRentPaymentSubmit = (
    amount: number,
    method: string,
    mpesaCode?: string
  ) => {
    if (!paymentTenant) return;
    setIsRentPaymentOpen(false);
    setConfirmData({
      tenant: paymentTenant,
      amount,
      method,
      mpesaCode,
    });
    setIsConfirmOpen(true);
  };

  const handleConfirmPayment = async () => {
    if (!confirmData?.tenant) {
      toast.error("Invalid payment data");
      return;
    }

    const { tenant, amount, method, mpesaCode } = confirmData;

    try {
      await axios.post(
        "http://localhost:5000/api/payment/update",
        {
          tenantId: tenant.user._id,
          roomId: tenant.room._id,
          propertyId: tenant.room.property_id,
          amount,
          method,
          mpesa_code: mpesaCode,
        },
        { headers: getAuthHeaders() }
      );

      toast.success("Payment confirmed successfully!");
      setIsConfirmOpen(false);
      setConfirmData(null);
      setPaymentTenant(null);
      await fetchTenants();
    } catch (err: any) {
      console.error("Payment failed:", err);
      toast.error(
        "Payment failed: " + (err.response?.data?.error || err.message)
      );
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Tenants
        </h1>
        <button
          onClick={fetchTenants}
          className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Refresh
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Search tenants..."
          />
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-md hover:bg-primary-700"
        >
          Add New Tenant
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded mb-4">{error}</div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredTenants.length === 0 ? (
          <div className="p-6 text-center">
            <Users className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              No tenants found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {searchTerm
                ? "Try adjusting your search terms"
                : "You don't have any tenants yet"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium">
                    Tenant
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium">
                    Rent Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium">
                    Balance
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium">
                    Joined
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTenants.map((tenant) => {
                  if (!tenant?.user || !tenant?.room) return null;

                  const isPaid = tenant.lease?.balance === 0;
                  const balance = tenant.lease?.balance ?? 0;

                  return (
                    <tr key={tenant._id}>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              {tenant.user.name || "N/A"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {tenant.user.email || "N/A"}
                            </div>
                            {tenant.user.phone && (
                              <div className="text-xs text-gray-500">
                                {tenant.user.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {isPaid ? (
                          <span className="text-green-700 bg-green-100 px-2 py-1 rounded text-xs font-semibold">
                            Paid
                          </span>
                        ) : (
                          <>
                            <span className="text-red-700 bg-red-100 px-2 py-1 rounded text-xs font-semibold">
                              Pending
                            </span>
                            <button
                              className="ml-3 text-primary-600 underline text-xs hover:text-primary-700"
                              onClick={() => openRentPayment(tenant)}
                            >
                              Mark as Paid
                            </button>
                          </>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={
                            balance < 0
                              ? "text-green-800 font-semibold" // ✅ dark green for overpaid
                              : balance === 0
                              ? "text-gray-800"
                              : "text-red-700 font-semibold"
                          }
                        >
                          {formatCurrency(balance)}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-sm">
                        {tenant.lease_status || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {formatDate(tenant.join_date)}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => {
                            setSelectedTenant(tenant);
                            setIsActionsModalOpen(true);
                          }}
                          className="text-primary-600 underline text-xs hover:text-primary-700"
                        >
                          Actions
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddTenantModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchTenants}
      />

      {selectedTenant && (
        <TenantActionsModal
          isOpen={isActionsModalOpen}
          onClose={() => setIsActionsModalOpen(false)}
          tenant={selectedTenant}
          onEdit={() => {
            // Implement edit functionality
            setIsActionsModalOpen(false);
            toast.info("Edit functionality coming soon");
          }}
          onDelete={async () => {
            // Implement delete functionality
            setIsActionsModalOpen(false);
            toast.info("Delete functionality coming soon");
          }}
          onMarkPaid={() => {
            setIsActionsModalOpen(false);
            openRentPayment(selectedTenant);
          }}
        />
      )}

      {paymentTenant && (
        <RentPaymentModal
          open={isRentPaymentOpen}
          onClose={() => setIsRentPaymentOpen(false)}
          tenant={paymentTenant}
          onSubmit={handleRentPaymentSubmit}
        />
      )}

      {confirmData && (
        <ConfirmPaymentModal
          open={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          confirmData={confirmData}
          onConfirm={handleConfirmPayment}
        />
      )}
    </div>
  );
};

export default TenantsPage;
