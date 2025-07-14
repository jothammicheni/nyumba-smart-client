/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  createTenant,
  fetchLandlordProperties,
  fetchVacantRooms,
} from "../../../services/tenantService.js";

interface Property {
  _id: string;
  name: string;
}

interface Room {
  _id: string;
  room_number: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddTenantModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setError("");
      fetchLandlordProperties()
        .then(setProperties)
        .catch(() => setError("Failed to fetch properties"));
    }
  }, [isOpen]);

  useEffect(() => {
    if (propertyId) {
      fetchVacantRooms(propertyId)
        .then(setRooms)
        .catch(() => setError("Failed to fetch vacant rooms"));
    } else {
      setRooms([]);
    }
  }, [propertyId]);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const payload = {
        name,
        email,
        phone,
        property_id: propertyId,
        room_id: roomId,
      };

      console.log("📤 Creating tenant with data:", payload);

      const res = await createTenant(payload);

      console.log("✅ Tenant creation response:", res);

      if (res.success) {
        onSuccess();
        onClose();
      } else {
        setError(res.message || "Failed to create tenant");
      }
    } catch (err: any) {
      console.error("❌ Error:", err);
      setError(err.response?.data?.message || "Failed to create tenant");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          🏘️ Add New Tenant
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tenant name"
            className="w-full border px-3 py-2 rounded text-sm focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full border px-3 py-2 rounded text-sm focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="w-full border px-3 py-2 rounded text-sm focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />

          <select
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="">🏢 Select Property</option>
            {properties.map((prop) => (
              <option key={prop._id} value={prop._id}>
                {prop.name}
              </option>
            ))}
          </select>

          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            disabled={!propertyId}
            className="w-full border px-3 py-2 rounded text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="">🚪 Select Room</option>
            {rooms.map((room) => (
              <option key={room._id} value={room._id}>
                Room {room.room_number}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              loading || !name || !email || !phone || !propertyId || !roomId
            }
            className="px-4 py-2 text-sm rounded bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Tenant"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTenantModal;
