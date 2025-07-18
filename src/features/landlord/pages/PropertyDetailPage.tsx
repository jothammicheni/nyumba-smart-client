/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Building,
  ArrowLeft,
  Plus,
  Trash2,
   Pencil,
    Megaphone ,
  User,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import {
  getProperty,
  createRoom,
  deleteRoom,
  assignTenant,
  removeTenant,
} from "../../../services/propertyService.js";
import AddRoomModal from "../components/AddRoomModal.js";
import AssignTenantModal from "../components/AssignTenantModal.js";
import AdvertisePropertyModal from "../components/AdvertisePropertyModal.js";
import { Loader } from "../../../components/Loader.js";
import { toast } from "react-toastify";
import { getAuthHeaders } from "../../../services/authService.js";
import axios from "axios";

interface Room {
  _id: string;
  room_number: string;
  status: string;
  tenant?: any;
  tenantInfo?: {
    name: string;
    email: string;
  };
}

interface Property {
  _id: string;
  name: string;
  city: string;
  area: string;
  rooms: Room[];
}

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdvertiseModalOpen, setIsAdvertiseModalOpen] = useState(false);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [isAssignTenantModalOpen, setIsAssignTenantModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getProperty(id!);
      setProperty(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch property details");
    } finally {
      setLoading(false);
    }
  };

 const handleAddRoom = async (roomData: any): Promise<boolean> => {
  try {
    await createRoom(id!, roomData);
    setIsAddRoomModalOpen(false);
    fetchProperty();
    toast.success("Room added successfully!");
    return true;  // success
  } catch (err: any) {
    const errorMsg = err.response?.data?.error || "Failed to add room";
    setError(errorMsg);
    toast.error(errorMsg);
    return false; // failure
  }
};

  const handleDeleteRoom = async (roomId: string) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await deleteRoom(roomId);
        fetchProperty();
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to delete room");
      }
    }
  };

  const handleAssignTenant = async (userId: string) => {
    try {
      await assignTenant(selectedRoomId, userId);
      setIsAssignTenantModalOpen(false);
      fetchProperty();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to assign tenant");
    }
  };

  const handleRemoveTenant = async (roomId: string) => {
    if (window.confirm("Are you sure you want to remove this tenant?")) {
      try {
        await removeTenant(roomId);
        fetchProperty();
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to remove tenant");
      }
    }
  };

  // Edit Handler
const handleEdit = () => {
  toast.info("Redirecting to edit page...")
  navigate(`/landlord/properties/${property?._id}/edit`)
}

// Delete Handler
const handleDelete = async () => {
  const confirmDelete = window.confirm(`Are you sure you want to delete "${property?.name}"?`)
  if (!confirmDelete) return

  toast.loading("Deleting property...")

  try {
    await axios.delete(
      `https://nyumba-smart-server.onrender.com/api/properties/${property?._id}`,
      {
        headers: getAuthHeaders(),
      }
    )

    toast.dismiss() // Remove loading toast
    toast.success("Property deleted successfully!")
    navigate("/landlord/properties")
  } catch (error) {
    toast.dismiss()
    toast.error("Failed to delete property. Try again.")
    console.error("Delete error:", error)
  }
}

  const openAssignTenantModal = (roomId: string) => {
    setSelectedRoomId(roomId);
    setIsAssignTenantModalOpen(true);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "vacant":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "occupied":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "reserved":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  if (loading) return <div><Loader/></div>

  if (error) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <button
            onClick={() => navigate("/landlord/dashboard/properties")}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </button>
        </div>
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <button
            onClick={() => navigate("/landlord/properties")}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <AlertTriangle className="h-12 w-12 mx-auto text-yellow-500" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
            Property not found
          </h3>
        </div>
      </div>
    );
  }

 return (
  <div className="p-4 sm:p-6">
    {/* Back Button */}
    <div className="mb-6">
      <button
        onClick={() => navigate("/landlord/properties")}
        className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Properties
      </button>
    </div>

    {/* Property Header */}
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow mb-6">
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center">
          <Building className="h-10 w-10 text-primary-600 dark:text-primary-500 mr-4" />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {property.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {property.area}, {property.city}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3 mt-4 sm:mt-0">
  {/* Row for Edit + Delete on all screens */}
  <div className="flex flex-row gap-2">
    <button
      onClick={handleEdit}
      className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow"
    >
      <Pencil className="h-4 w-4 mr-2" />
      Edit
    </button>

    <button
      onClick={handleDelete}
      className="inline-flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md shadow"
    >
      <Trash2 className="h-4 w-4 mr-2" />
      Delete
    </button>
  </div>

  {/* Advertise button appears below on mobile */}
  <button
    onClick={() => setIsAdvertiseModalOpen(true)}
    className="inline-flex items-center justify-center px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-md shadow w-full sm:w-auto"
  >
    <Megaphone className="h-4 w-4 mr-2" />
    Advertise {property.name}
  </button>
</div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-6 pb-6">
        <div className="bg-gray-50 dark:bg-gray-950/80 p-4 rounded-md">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Units
          </div>
          <div className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
            {property.rooms.length}
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-950/80 p-4 rounded-md">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Vacant Units
          </div>
          <div className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
            {
              property.rooms.filter((room) => room.status === "vacant").length
            }
          </div>
        </div>
      </div>
    </div>

    {/* Room Table */}
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-primary-600/30 flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Rooms</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={fetchProperty}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button
            onClick={() => setIsAddRoomModalOpen(true)}
            className="inline-flex items-center px-3 py-2 border border-primary-600 dark:border-primary-500 shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Room
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-primary-600/30">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Room</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Tenant</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-primary-600/10">
            {property.rooms.map((room) => (
              <tr key={room._id}>
                <td className="px-6 py-4 whitespace-nowrap">{room.room_number}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(room.status)}`}
                  >
                    {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {room.status === "occupied" && room.tenantInfo ? (
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {room.tenantInfo.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {room.tenantInfo.email}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400">No tenant assigned</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  {room.status === "occupied" ? (
                    <button
                      onClick={() => handleRemoveTenant(room._id)}
                      className="inline-flex items-center px-2 py-1 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => openAssignTenantModal(room._id)}
                      className="inline-flex items-center px-2 py-1 border border-primary-600 text-primary-600 rounded hover:bg-primary-600 hover:text-white"
                    >
                      <User className="h-4 w-4 mr-1" />
                      Assign
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteRoom(room._id)}
                    className="inline-flex items-center px-2 py-1 border border-gray-400 text-gray-600 rounded hover:bg-gray-400 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Modals */}
    <AddRoomModal
      isOpen={isAddRoomModalOpen}
      onClose={() => setIsAddRoomModalOpen(false)}
      onSubmit={handleAddRoom}
      propertyId={id!}
    />

    <AssignTenantModal
      isOpen={isAssignTenantModalOpen}
      onClose={() => setIsAssignTenantModalOpen(false)}
      onSubmit={handleAssignTenant}
      roomId={selectedRoomId}
    />

    {property && (
      <AdvertisePropertyModal
        isOpen={isAdvertiseModalOpen}
        onClose={() => setIsAdvertiseModalOpen(false)}
        property={{
          _id: property._id,
          name: property.name,
          city: property.city,
          area: property.area,
        }}
        onSuccess={() => alert("Property listed successfully!")}
      />
    )}
  </div>
);

};

export default PropertyDetailPage;
