import React from "react";

interface Document {
  id: number;
  name: string;
  uploaded: string;
}

const TenantDocumentsPage: React.FC = () => {
  const documents: Document[] = [
    { id: 1, name: "Lease Agreement", uploaded: "2024-05-20" },
    { id: 2, name: "Payment Receipt - July", uploaded: "2024-07-01" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-primary">My Documents</h1>
      <ul className="space-y-4">
        {documents.map((doc) => (
          <li
            key={doc.id}
            className="flex justify-between items-center p-4 bg-white rounded-2xl shadow border border-gray-200"
          >
            <div>
              <h2 className="text-base font-medium text-secondary">{doc.name}</h2>
              <p className="text-sm text-muted">Uploaded: {doc.uploaded}</p>
            </div>
            <button className="text-sm text-blue-600 hover:underline">Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TenantDocumentsPage;
