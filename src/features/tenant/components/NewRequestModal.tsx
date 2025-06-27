/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { createMaintananceRequests } from "../../../services/maintananceService";

interface NewRequestModalProps {
  onRequestCreated: () => void;
}

const NewRequestModal = ({ onRequestCreated }: NewRequestModalProps) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!description.trim()) {
      alert("Description is required.");
      return;
    }

    try {
      await createMaintananceRequests({ description });
      setDescription("");
      setOpen(false);
      onRequestCreated();
    } catch (err) {
      console.log("Failed to submit maintenance request.",err);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
      >
        New Request
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">New Maintenance Request</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                rows={4}
                placeholder="Describe the issue"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewRequestModal;
