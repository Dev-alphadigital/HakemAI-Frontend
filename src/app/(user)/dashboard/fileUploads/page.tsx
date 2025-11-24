"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import GeneratingModal from "@/components/GeneratingModal";

export default function UploadPage() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [showModal, setShowModal] = useState(false);
    const API_BASE = process.env.NEXT_PUBLIC_FASTAPI_API;

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const newFiles = Array.from(e.target.files);

        // Append new files to already selected ones
        setSelectedFiles((prev) => [...prev, ...newFiles]);
    };

    const removeFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleGenerateComparison = async () => {
        if (selectedFiles.length === 0) {
            alert("Please select at least one PDF.");
            return;
        }

        const token = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("user");

        let userId = null;
        if (storedUser) {
            userId = JSON.parse(storedUser).id;
        }

        if (!token || !userId) {
            alert("Authentication error. Please login again.");
            return;
        }

        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append("files", file));

        try {
            // ✅ Show modal instantly
            setShowModal(true);

            const res = await fetch(`${API_BASE}/api/compare-quotes`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "X-User-Id": userId,
                },
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                setShowModal(false);
                alert(data.detail || "Upload failed.");
                return;
            }

            // ✅ Store AI result in Local Storage
            localStorage.setItem("comparisonResult", JSON.stringify(data));

            // ✅ Close modal after processing
            setShowModal(false);

            // ✅ Redirect to dashboard
            window.location.href = "/dashboard";

        } catch (error) {
            console.error("Upload error:", error);
            setShowModal(false);
            alert("Something went wrong.");
        }
    };


    return (
        <main className="min-h-screen flex bg-[#fdfcf8] text-gray-900 lg:bg-[#e8f1ed]">
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            <div className="flex-1 flex flex-col">
                <Topbar setMobileOpen={setMobileOpen} />

                <div className="p-6 md:p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2 lg:mt-[3.5rem] xl:text-3xl">
                        Upload Documents
                    </h1>
                    <p className="text-gray-500 mb-6">
                        Upload your PDF files to start comparing.
                    </p>

                    {/* Upload Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">

                        {/* Upload Box */}
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 mb-6 bg-gradient-to-r from-[#fbecbc]/60 to-[#bedbd4]/60">
                            <div className="flex flex-col items-center justify-center">

                                <Image
                                    src="/images/upload-cloud.png"
                                    alt="Upload Cloud"
                                    width={64}
                                    height={64}
                                    className="mb-4 lg:h-20 lg:w-20 2xl:h-24 2xl:w-24"
                                />

                                <div className="text-gray-700 font-semibold text-base">
                                    Select files to upload
                                </div>
                                <p className="text-sm text-gray-400 mt-1">
                                    Supported Format: PDF
                                </p>

                                <input
                                    type="file"
                                    accept="application/pdf"
                                    multiple
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    id="pdf-input"
                                />

                                <label
                                    htmlFor="pdf-input"
                                    className="mt-4 px-5 py-2 rounded-md bg-gray-200 border border-gray-400 hover:bg-gray-300 cursor-pointer transition text-sm font-semibold"
                                >
                                    Select Files
                                </label>
                            </div>
                        </div>

                        {/* FILE LIST */}
                        {selectedFiles.length > 0 && (
                            <div className="mb-6 text-left">
                                <p className="font-semibold mb-3 text-gray-700">
                                    Selected Files:
                                </p>

                                <div className="space-y-2">
                                    {selectedFiles.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between bg-gray-100 rounded-md px-4 py-2 border border-gray-300"
                                        >
                                            <span className="text-gray-700 text-sm truncate w-[80%]">
                                                {file.name}
                                            </span>

                                            <button
                                                onClick={() => removeFile(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Generate Button */}
                        <button
                            onClick={handleGenerateComparison}
                            className="w-full md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[20%] py-2.5 cursor-pointer bg-gradient-to-r from-[#fdc431] to-[#04786b] text-white rounded-lg font-semibold hover:opacity-90 transition"
                        >
                            Generate Comparison
                        </button>

                    </div>
                </div>
            </div>
            {showModal && (
                <GeneratingModal
                    onCancel={() => setShowModal(false)}
                    onComplete={() => { }}
                />
            )}
        </main>
    );
}