"use client";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import Image from "next/image";

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            alert("Please upload a PDF file before generating.");
            return;
        }

        // TODO: Send file to backend API
        console.log("Uploaded file:", file.name);
    };

    return (
        <main className="min-h-screen flex flex-col lg:flex-row bg-[#fdfcf8] text-gray-800">
            {/* ===== LEFT SIDE ===== */}
            <div className="hidden lg:flex w-7/16 items-center justify-center relative">
                {/* Divider */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[80%] w-[1px] bg-gray-300"></div>

                {/* Logo + Name */}
                <div className="flex flex-col items-center space-y-6">
                    <Image
                        src="/logo/logo.svg"
                        alt="Hakem AI Logo"
                        width={150}
                        height={150}
                        className="object-contain rounded-full"
                        priority
                    />

                    {/* Name below logo */}
                    <span className="text-xl font-semibold text-gray-800 tracking-wide">
                        HAKEM.AI
                    </span>
                </div>

            </div>

            {/* ===== RIGHT SIDE ===== */}
            <div className="flex flex-1 flex-col justify-center items-center px-8 md:px-16 py-10 lg:py-0">
                {/* Mobile logo */}
                <div className="flex justify-center lg:hidden mb-6">
                    <div className="w-24 h-24 flex items-center justify-center">
                        <Image
                            src="/logo/logo.svg"
                            alt="Hakem AI Logo"
                            width={150}
                            height={150}
                            className="object-contain rounded-full"
                            priority
                        />
                    </div>
                </div>

                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        Upload Insurance Quotes
                    </h1>
                    <p className="text-gray-600">
                        Please upload your PDF files for comparison
                    </p>
                </div>

                {/* Upload Card */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-xl space-y-6 flex flex-col items-center"
                >
                    <label
                        htmlFor="file-upload"
                        className="w-full h-52 rounded-lg border-2 border-dashed cursor-pointer bg-gradient-to-r from-[#fff9e6] to-[#eaf6f1] border-[#04786b]/40 hover:border-[#04786b] hover:shadow-md transition relative flex flex-col justify-center items-center text-center"
                    >

                        <div className="absolute inset-[1px] bg-gradient-to-r from-[#f8ecc0] to-[#bedbd4] rounded-lg flex flex-col justify-center items-center z-10">
                            <FaUpload className="text-gray-600 text-3xl mb-3" />
                            <p className="font-semibold text-gray-700">
                                Select files to upload
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Supported Format: <span className="font-medium">PDF</span>
                            </p>

                            <div className="mt-4 px-4 py-1.5 border border-gray-400 rounded-full flex items-center space-x-2 bg-white hover:bg-gray-50 transition">
                                <FaUpload className="text-gray-600 text-sm" />
                                <span className="text-sm font-semibold text-gray-700">
                                    {file ? file.name : "Select Files"}
                                </span>
                            </div>
                            <input
                                id="file-upload"
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                    </label>

                    {/* Generate Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#fdc431] to-[#04786b] text-white font-semibold py-3 rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:opacity-95 transition text-lg"
                    >
                        GENERATE
                    </button>
                </form>
            </div>
        </main>
    );
}
