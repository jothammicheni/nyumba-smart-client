/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

interface AddRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (roomData: any) => Promise<boolean>; // assume async returns success/fail
  propertyId: string;
}

const AddRoomModal: React.FC<AddRoomModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  propertyId,
}) => {
  const [roomChips, setRoomChips] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({
    status: "vacant",
    price: "",
    deposit: "", // ✅ New field
    type: "bedsitter",
    bathrooms: "1",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toast, setToast] = useState<{ type: "error" | "success"; message: string } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const addChip = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !roomChips.includes(trimmed)) {
      setRoomChips([...roomChips, trimmed]);
      setInputValue("");
      if (errors.room_number) {
        setErrors((prev) => ({ ...prev, room_number: "" }));
      }
    }
  };

  const removeChip = (chip: string) => {
    setRoomChips(roomChips.filter((c) => c !== chip));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addChip();
    }
  };

  const handleInputBlur = () => {
    addChip();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "room_number") return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (roomChips.length === 0) {
      newErrors.room_number = "Please add at least one room number";
    }
    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    }
    if (!formData.deposit.trim()) {
      newErrors.deposit = "Deposit is required";
    }
    if (!formData.type.trim()) {
      newErrors.type = "Type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addChip();

    if (!validate()) {
      setToast({ type: "error", message: "Please fix the errors before submitting." });
      return;
    }

    setIsSubmitting(true);

    try {
      const roomPayloads = roomChips.map((roomNum) => ({
        ...formData,
        room_number: roomNum,
        property_id: propertyId,
      }));

      const success = await onSubmit(roomPayloads);

      if (success) {
        setToast({ type: "success", message: "Rooms added successfully!" });
        setRoomChips([]);
        setInputValue("");
        setFormData({
          status: "vacant",
          price: "",
          deposit: "",
          type: "bedsitter",
          bathrooms: "1",
        });
        setErrors({});
        onClose();
      } else {
        setToast({ type: "error", message: "Failed to add rooms. Please try again." });
      }
    } catch {
      setToast({ type: "error", message: "An error occurred while adding rooms." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {toast && (
        <div
          className={`fixed top-5 right-5 z-60 px-4 py-2 rounded shadow-md text-white font-semibold ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 transition-opacity bg-gray-900 opacity-75" />

          <div className="inline-block align-bottom bg-white dark:bg-gray-950 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add New Room</h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
                disabled={isSubmitting}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="px-6 py-4">
                {/* Room numbers */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Room Numbers
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {roomChips.map((chip) => (
                      <div key={chip} className="flex items-center space-x-1 bg-primary-600 text-white rounded-full px-3 py-1 text-sm">
                        <span>{chip}</span>
                        <button
                          type="button"
                          onClick={() => removeChip(chip)}
                          disabled={isSubmitting}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleInputKeyDown}
                      onBlur={handleInputBlur}
                      className={`flex-1 block w-full px-3 py-2 border ${
                        errors.room_number ? "border-red-500" : "border-gray-300 dark:border-gray-800/50"
                      } rounded-md shadow-sm sm:text-sm bg-white dark:bg-gray-800/40 text-gray-900 dark:text-white`}
                      placeholder="Type room number and press Enter"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        addChip();
                        inputRef.current?.focus();
                      }}
                      className="px-3 py-2 bg-primary-600 text-white rounded-md"
                      disabled={isSubmitting}
                    >
                      Add
                    </button>
                  </div>
                  {errors.room_number && <p className="mt-1 text-sm text-red-500">{errors.room_number}</p>}
                </div>

                {/* Price */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${
                      errors.price ? "border-red-500" : "border-gray-300 dark:border-gray-800/50"
                    } rounded-md shadow-sm sm:text-sm bg-white dark:bg-gray-800/40 text-gray-900 dark:text-white`}
                    placeholder="Enter price"
                    disabled={isSubmitting}
                  />
                  {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                </div>

                {/* Deposit */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Deposit
                  </label>
                  <input
                    type="number"
                    name="deposit"
                    value={formData.deposit}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${
                      errors.deposit ? "border-red-500" : "border-gray-300 dark:border-gray-800/50"
                    } rounded-md shadow-sm sm:text-sm bg-white dark:bg-gray-800/40 text-gray-900 dark:text-white`}
                    placeholder="Enter deposit amount"
                    disabled={isSubmitting}
                  />
                  {errors.deposit && <p className="mt-1 text-sm text-red-500">{errors.deposit}</p>}
                </div>

                {/* Type */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${
                      errors.type ? "border-red-500" : "border-gray-300 dark:border-gray-800/50"
                    } rounded-md sm:text-sm bg-white dark:bg-gray-800/40 text-gray-900 dark:text-white`}
                    disabled={isSubmitting}
                  >
                    <option value="bedsitter">Bedsitter</option>
                    <option value="1 bedroom">1 Bedroom</option>
                    <option value="2 bedroom">2 Bedroom</option>
                    <option value="3 bedroom">3 Bedroom</option>
                  </select>
                  {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
                </div>

                {/* Bathrooms */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    min="1"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-800/50 rounded-md sm:text-sm bg-white dark:bg-gray-800/40 text-gray-900 dark:text-white"
                    placeholder="Number of bathrooms"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Status */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-800/50 rounded-md sm:text-sm bg-white dark:bg-gray-800/40 text-gray-900 dark:text-white"
                    disabled={isSubmitting}
                  >
                    <option value="vacant">Vacant</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="reserved">Reserved</option>
                  </select>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 dark:bg-primary-600/10 flex justify-end">
                <button
                  type="button"
                  className="mr-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md text-white bg-primary-600 hover:bg-primary-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding rooms..." : "Add Room"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRoomModal;
