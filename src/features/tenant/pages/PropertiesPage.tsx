import React from "react";

interface Property {
  id: number;
  name: string;
  location: string;
  rent: string;
  status: "Occupied" | "Vacant";
}

const TenantPropertiesPage: React.FC = () => {
  const properties: Property[] = [
    {
      id: 1,
      name: "Greenview Apartments",
      location: "Westlands, Nairobi",
      rent: "KSh 35,000",
      status: "Occupied",
    },
    {
      id: 2,
      name: "Sunrise Villas",
      location: "Kileleshwa, Nairobi",
      rent: "KSh 40,000",
      status: "Vacant",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-primary">My Properties</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <div
            key={property.id}
            className="rounded-2xl shadow p-4 border border-gray-200 bg-white"
          >
            <h2 className="text-lg font-bold text-secondary">{property.name}</h2>
            <p className="text-sm text-muted">{property.location}</p>
            <p className="text-sm mt-1">Rent: <strong>{property.rent}</strong></p>
            <p
              className={`text-sm mt-1 ${
                property.status === "Occupied" ? "text-green-600" : "text-yellow-600"
              }`}
            >
              Status: {property.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantPropertiesPage;
