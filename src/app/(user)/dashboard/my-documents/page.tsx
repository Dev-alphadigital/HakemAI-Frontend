"use client";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";

interface Document {
    id: string;
    original_filename: string;
    uploaded_at: string;
    file_size?: number;
}

export default function MyDocumentsPage() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState<number | null>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const API_BASE = process.env.NEXT_PUBLIC_FASTAPI_API;

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const storedUser = localStorage.getItem("user");

                if (!token || !storedUser) {
                    setError("User not authenticated");
                    setLoading(false);
                    return;
                }

                const userId = JSON.parse(storedUser).id;

                const res = await fetch(`${API_BASE}/api/my-documents`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "X-User-Id": userId,
                    },
                });

                const data = await res.json();

                if (!res.ok) {
                    setError(data.detail || "Failed to fetch documents");
                    setLoading(false);
                    return;
                }

                setDocuments(data.documents || []);
                console.log("Docs from API:", documents);
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Something went wrong while loading documents.");
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    const handleDownload = async (documentId: string, filename: string) => {
        try {
            const token = localStorage.getItem("accessToken");
            const storedUser = localStorage.getItem("user");

            if (!token || !storedUser) {
                alert("User not authenticated");
                return;
            }

            const userId = JSON.parse(storedUser).id;

            const response = await fetch(
                `http://ai.hakem.ai/api/my-documents/${documentId}/download`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "X-User-Id": userId
                    }
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Download failed");
            }

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = filename;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download error:", error);
            alert("Failed to download document.");
        }
    };

    const handleDelete = async (documentId: string) => {
        try {
            const token = localStorage.getItem("accessToken");
            const storedUser = localStorage.getItem("user");

            if (!token || !storedUser) {
                alert("User not authenticated");
                return;
            }

            const userId = JSON.parse(storedUser).id;

            const confirmDelete = confirm("Are you sure you want to delete this document?");
            if (!confirmDelete) return;

            const response = await fetch(
                `http://ai.hakem.ai/api/my-documents/${documentId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "X-User-Id": userId
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Failed to delete document");
            }

            // ✅ Remove from UI instantly
            setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== documentId));

            alert("Document deleted successfully ✅");

        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete document.");
        }
    };

    function formatDate(dateString: string) {
        if (!dateString) return "Invalid Date";

        // Replace +00:00 with Z for better JS compatibility
        const normalized = dateString.replace("+00:00", "Z");

        const date = new Date(normalized);

        if (isNaN(date.getTime())) return "Invalid Date";

        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    }

    return (
        <main className="min-h-screen flex bg-[#fdfcf8] text-gray-900 lg:bg-[#e8f1ed] relative z-0">
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            <div className="flex-1 flex flex-col relative z-0">
                <Topbar setMobileOpen={setMobileOpen} />

                <div className="p-6 md:p-8 space-y-6 lg:mt-[3.5rem]">

                    {/* Header */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 xl:text-3xl">
                            My Documents
                        </h1>
                        <p className="text-gray-500 mt-1">
                            View and manage all your uploaded PDFs for quick comparison.
                        </p>
                    </div>

                    {/* Loading / Error */}
                    {loading && (
                        <div className="text-center py-10 text-gray-500">
                            Loading your documents...
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-10 text-red-600 font-medium">
                            {error}
                        </div>
                    )}

                    {/* No Documents */}
                    {!loading && !error && documents.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            No documents uploaded yet.
                        </div>
                    )}

                    {/* Desktop Table */}
                    {!loading && !error && documents.length > 0 && (
                        <div className=" lg:block bg-white rounded-xl shadow-sm border border-gray-200 relative z-0">
                            <table className="w-full text-left border-collapse relative">
                                <thead className="bg-[#d9d9d9] text-gray-600 text-sm">
                                    <tr>
                                        <th className="py-3 px-6 font-semibold">File name</th>
                                        <th className="py-3 px-6 font-semibold">Upload date</th>
                                        <th className="py-3 px-6 font-semibold text-right">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {documents.map((doc, i) => (
                                        <tr key={doc.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                                            <td className="py-3 px-6 hover:text-[#04786b]">
                                                {doc.original_filename}
                                            </td>

                                            <td className="py-3 px-6">
                                                {formatDate(doc.uploaded_at)}
                                            </td>

                                            <td className="py-3 px-6 text-right relative">
                                                <button
                                                    onClick={() => setOpenMenu(openMenu === i ? null : i)}
                                                    className="p-1.5 rounded hover:bg-gray-100"
                                                >
                                                    <MoreVertical className="w-4 h-4 text-gray-600 cursor-pointer" />
                                                </button>

                                                {openMenu === i && (
                                                    <div
                                                        className="absolute right-6 top-8 bg-white shadow-md border border-gray-200 rounded-md w-28 z-50"
                                                    >
                                                        <button
                                                            onClick={() => handleDownload(doc.id, doc.original_filename)}
                                                            className="block w-full cursor-pointer text-left px-3 py-2 text-sm hover:bg-gray-100"
                                                        >
                                                            Download
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(doc.id)}
                                                            className="block w-full cursor-pointer text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}