/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  createTenant,
  fetchLandlordProperties,
  fetchVacantRooms,
} from "../../../services/tenantService.js";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Loader2 } from "lucide-react";

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
      setRoomId("");
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

      const res = await createTenant(payload);

      if (res.success) {
        onSuccess();
        onClose();
        // Reset form
        setName("");
        setEmail("");
        setPhone("");
        setPropertyId("");
        setRoomId("");
      } else {
        setError(res.message || "Failed to create tenant");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create tenant");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-950 p-6 rounded-lg w-full max-w-md mx-4 border shadow-lg">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Add New Tenant</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              X
            </button>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="name">Full Name</label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white dark:bg-gray-900"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white dark:bg-gray-900"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="phone">Phone Number</label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white dark:bg-gray-900"
                placeholder="+254 700 000000"
              />
            </div>

            <div className="space-y-1">
              <label>Property</label>
              <Select
                value={propertyId}
                onValueChange={setPropertyId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent>
                  {properties.map((prop) => (
                    <SelectItem key={prop._id} value={prop._id}>
                      {prop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label>Room</label>
              <Select
                value={roomId}
                onValueChange={setRoomId}
                disabled={!propertyId}
              >
                <SelectTrigger>
                  <SelectValue placeholder={propertyId ? "Select room" : "Select property first"} />
                </SelectTrigger>
                <SelectContent>
                  {rooms.length > 0 ? (
                    rooms.map((room) => (
                      <SelectItem key={room._id} value={room._id}>
                        Room {room.room_number}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground px-2 py-1.5">
                      {propertyId ? "No vacant rooms available" : "Please select a property first"}
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-primary-600 text-white hover:bg-primary-700"
              disabled={
                loading || !name || !email || !phone || !propertyId || !roomId
              }
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Saving..." : "Save Tenant"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTenantModal;