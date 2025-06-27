import React from "react";

const TenantSettingsPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6 max-w-xl">
      <h1 className="text-2xl font-semibold text-primary">Settings</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-muted mb-1">Full Name</label>
          <input
            type="text"
            defaultValue="John Doe"
            className="w-full p-2 border rounded-xl bg-white"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-1">Email</label>
          <input
            type="email"
            defaultValue="john@example.com"
            className="w-full p-2 border rounded-xl bg-white"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-1">Phone Number</label>
          <input
            type="tel"
            defaultValue="+254712345678"
            className="w-full p-2 border rounded-xl bg-white"
          />
        </div>

        <button className="bg-primary text-white px-4 py-2 rounded-xl mt-4 hover:opacity-90 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default TenantSettingsPage;
