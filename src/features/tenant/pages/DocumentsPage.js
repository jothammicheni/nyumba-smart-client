import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileText, Download } from "lucide-react";
const TenantDocumentsPage = () => {
    const documents = [
        { id: 1, name: "Lease Agreement", uploaded: "2024-05-20" },
        { id: 2, name: "Payment Receipt - July", uploaded: "2024-07-01" },
    ];
    return (_jsxs("div", { className: "p-6 space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-md", children: [_jsxs("div", { className: "border-b pb-4 border-primary-600/20", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800 dark:text-white", children: "My Documents" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Access your important housing documents" })] }), _jsx("div", { className: "grid gap-4 sm:grid-cols-1 md:grid-cols-2", children: documents.map((doc) => (_jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl border bg-gray-50 dark:bg-gray-950/40 dark:border-primary-600/5 shadow-sm hover:shadow transition", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(FileText, { className: "w-6 h-6 text-primary" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-800 dark:text-white", children: doc.name }), _jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: ["Uploaded on ", doc.uploaded] })] })] }), _jsxs("button", { onClick: () => alert(`Downloading ${doc.name}`), className: "inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline rounded-full p-1", children: [_jsx(Download, { className: "w-4 h-4" }), "Download"] })] }, doc.id))) }), documents.length === 0 && (_jsx("p", { className: "text-sm text-center text-gray-500 dark:text-gray-400", children: "You have no documents uploaded yet." }))] }));
};
export default TenantDocumentsPage;
