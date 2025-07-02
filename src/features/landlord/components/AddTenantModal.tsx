/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState } from 'react';
import {
  createTenant,
  fetchLandlordProperties,
  fetchVacantRooms
} from '../../../services/tenantService.js';

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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch properties on modal open
  useEffect(() => {
    if (isOpen) {
      fetchLandlordProperties()
        .then(setProperties)
        .catch(() => setError('Failed to fetch properties'));
    }
  }, [isOpen]);

  // Fetch vacant rooms when propertyId changes
  useEffect(() => {
    if (propertyId) {
      fetchVacantRooms(propertyId)
        .then(setRooms)
        .catch(() => setError('Failed to fetch rooms'));
    } else {
      setRooms([]); // Reset room options when no property is selected
    }
  }, [propertyId]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await createTenant({
        name,
        email,
        phone,
        property_id: propertyId,
        room_id: roomId
      });

      if (res.success) {
        onSuccess();
        onClose();
      } else {
console.error("Create tenant failed:", error);
  return res.status(400).json({ message: error });      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create tenant');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Add New Tenant</h2>
        {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tenant name"
          className="mb-3 w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="mb-3 w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          className="mb-3 w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
        />

        <select
          value={propertyId}
          onChange={(e) => setPropertyId(e.target.value)}
          className="mb-3 w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select Property</option>
          {properties.map((prop) => (
            <option key={prop._id} value={prop._id}>{prop.name}</option>
          ))}
        </select>

        <select
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="mb-3 w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
          disabled={!propertyId}
        >
          <option value="">Select Vacant Room</option>
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>{room.room_number}</option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 text-sm">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 rounded bg-primary-600 text-white text-sm">
            {loading ? 'Saving...' : 'Save Tenant'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTenantModal;
