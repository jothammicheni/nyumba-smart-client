/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProperties } from "../../../../services/propertyService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserById, updateUser } from "../../../../services/caretakerService";

const PERMISSIONS = ["property", "finance", "tenants", "maintenance", "reports"];

const EditCaretakerPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [propertyOptions, setPropertyOptions] = useState<{ id: string; name: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "", // NEW password (blank by default)
    property: "",
    permissions: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propsRes, userRes] = await Promise.all([
          getProperties(),
          getUserById(id as string),
        ]);

        const propsArray = propsRes.data;
        if (!Array.isArray(propsArray)) throw new Error("Unexpected props shape");
        setPropertyOptions(propsArray.map((p: any) => ({ id: p._id, name: p.name })));

        const user = userRes.data;
        setFormData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          password: "", // keep password empty (don't pre-fill hashed one)
          property: user.hasFullAccess ? "all" : (user.propertyAccessIds?.[0] || ""),
          permissions: user.caretakerPermissions || [],
        });
      } catch (err) {
        console.error("Load error", err);
        toast.error("Failed to load caretaker info");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (permission: string) => {
    setFormData(prev => {
      const exists = prev.permissions.includes(permission);
      return {
        ...prev,
        permissions: exists
          ? prev.permissions.filter(p => p !== permission)
          : [...prev.permissions, permission],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        propertyAccessIds: formData.property === "all" ? [] : [formData.property],
        hasFullAccess: formData.property === "all",
        caretakerPermissions: formData.permissions,
      };

      // Only add password if the user entered one
      if (formData.password.trim() !== "") {
        payload.password = formData.password;
      }

      console.log('new data',payload)
      await updateUser(id as string, payload);
      toast.success("Caretaker updated successfully!");
      setTimeout(() => navigate(-1), 1000); // Go back
    } catch (err) {
      console.error("Update error", err);
      toast.error("Failed to update caretaker");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-semibold mb-4">Edit Caretaker</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {["name", "email", "phone"].map(field => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={(formData as any)[field]}
              onChange={handleChange}
              placeholder={field === "phone" ? "e.g. 0712345678" : ""}
            />
          </div>
        ))}

        {/* Optional Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password (optional)</label>
          <input
            type="password"
            name="password"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
            placeholder="Change current password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Property Access</label>
          <select
            name="property"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={formData.property}
            onChange={handleChange}
          >
            <option value="">Select Property</option>
            <option value="all">All (Full Access)</option>
            {propertyOptions.map(prop => (
              <option key={prop.id} value={prop.id}>{prop.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
          <div className="grid grid-cols-2 gap-2">
            {PERMISSIONS.map(permission => (
              <label key={permission} className="inline-flex items-center text-sm text-gray-800">
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
            disabled={isSaving}
            className={`inline-flex justify-center px-6 py-2 text-white font-semibold rounded-md shadow-md
              ${isSaving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            {isSaving ? "Saving..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCaretakerPage;
