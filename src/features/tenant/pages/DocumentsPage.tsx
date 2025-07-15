import React from "react";
import { FileText, Download } from "lucide-react";

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
    <div className="p-6 space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <div className="border-b pb-4 border-primary-600/20">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Documents</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Access your important housing documents</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 rounded-xl border bg-gray-50 dark:bg-gray-950/40 dark:border-primary-600/5 shadow-sm hover:shadow transition">
            <div className="flex items-center space-x-4">
              <FileText className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">{doc.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Uploaded on {doc.uploaded}</p>
              </div>
            </div>
            <button
              onClick={() => alert(`Downloading ${doc.name}`)}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline rounded-full p-1">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        ))}
      </div>

      {documents.length === 0 && (
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">You have no documents uploaded yet.</p>
      )}
    </div>
  );
};

export default TenantDocumentsPage;
