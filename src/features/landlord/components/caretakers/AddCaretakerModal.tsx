/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  propertyOptions: { id: string; name: string }[];
}

const PERMISSIONS = ["property", "finance", "tenants", "maintenance", "reports"];

const AddCaretakerModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, propertyOptions }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    property: "",
    permissions: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (permission: string) => {
    setFormData(prev => {
      const alreadySelected = prev.permissions.includes(permission);
      return {
        ...prev,
        permissions: alreadySelected
          ? prev.permissions.filter(p => p !== permission)
          : [...prev.permissions, permission],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        propertyAccessIds: formData.property === "all" ? [] : [formData.property],
        hasFullAccess: formData.property === "all",
      };

      await onSubmit(payload); // 🔥 Pass data to parent
      toast.success("Caretaker added successfully!");

      // Reset and close
      setFormData({ name: "", email: "", phone: "", password: "", property: "", permissions: [] });
      onClose();
    } catch (err) {
      console.error("Submit error", err);
      toast.error("Failed to add caretaker");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 dark:text-gray-400 hover:text-black"
          >
            <X size={20} />
          </button>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Add Caretaker</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {["name", "email", "phone", "password"].map(field => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {field}
                </label>
                <input
                  type={field === "email" ? "email" : field === "password" ? "password" : "text"}
                  name={field}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm placeholder-gray-400
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={(formData as any)[field]}
                  onChange={handleChange}
                  placeholder={field === "phone" ? "e.g. 0712345678" : ""}
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Property Access</label>
              <select
                name="property"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm
                  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.property}
                onChange={handleChange}
              >
                <option value="">Select Property</option>
                <option value="all">All (Full Access)</option>
                {propertyOptions.map(prop => (
                  <option key={prop.id} value={prop.id}>
                    {prop.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Permissions</label>
              <div className="grid grid-cols-2 gap-2">
                {PERMISSIONS.map(permission => (
                  <label key={permission} className="inline-flex items-center text-sm text-gray-800 dark:text-white">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(permission)}
                      onChange={() => handleCheckboxChange(permission)}
                      className="mr-2"
                    />
                    {permission.charAt(0).toUpperCase() + permission.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center px-6 py-2 text-white font-semibold rounded-md shadow-md
                  ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                {isSubmitting ? "Sending..." : "Add Caretaker"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCaretakerModal;
