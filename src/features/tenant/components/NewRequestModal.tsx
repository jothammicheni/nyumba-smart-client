/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { createMaintananceRequests } from "../../../services/maintananceService.js";

interface NewRequestModalProps {
  onRequestCreated: () => void;
}

const NewRequestModal = ({ onRequestCreated }: NewRequestModalProps) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high" | "urgent">("medium");
  const [serviceType, setServiceType] = useState<"plumbing" | "electrical" | "cleaning" | "security" | "wifi" | "other">("plumbing");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await createMaintananceRequests({
        description,
        priority,
        serviceType
      });
      setDescription("");
      setPriority("medium");
      setServiceType("plumbing");
      setOpen(false);
      onRequestCreated();
    } catch (err) {
      console.error("Failed to submit maintenance request:", err);
      setError("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-primary-600 text-white text-sm rounded hover:bg-primary-700">
        New Request
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-50 z-50">
          <div className="bg-slate-100 p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg text-gray-900 font-semibold mb-4">New Maintenance Request</h2>

            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority <span className="text-primary-600">*</span>
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full text-gray-900 border border-gray-200 bg-slate-50 focus:outline-none focus:ring-primary-600/20 rounded px-3 py-2 text-sm"
                  disabled={isSubmitting}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Type <span className="text-primary-600">*</span>
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as any)}
                  className="w-full text-gray-900 border border-gray-200 bg-slate-50 focus:outline-none focus:ring-primary-600/20 rounded px-3 py-2 text-sm"
                  disabled={isSubmitting}>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="security">Security</option>
                  <option value="wifi">WiFi</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-primary-600">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-gray-900 border border-gray-200 bg-slate-50 focus:outline-none focus:ring-primary-600/20 rounded px-3 py-2 text-sm"
                rows={4}
                placeholder="Describe the issue"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setOpen(false);
                  setError("");
                }}
                className="px-4 py-2 text-sm bg-gray-400 rounded hover:bg-gray-400"
                disabled={isSubmitting}>
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-300"
                disabled={isSubmitting || !description.trim()}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewRequestModal;