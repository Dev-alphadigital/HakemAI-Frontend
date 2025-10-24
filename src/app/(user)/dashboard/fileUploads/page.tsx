"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Image from "next/image";

export default function UploadPage() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <main className="min-h-screen flex bg-[#fdfcf8] text-gray-900 lg:bg-[#e8f1ed]">
            {/* Sidebar (visible only on lg and above) */}
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
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 mb-6 bg-gradient-to-r from-[#fdc431]/10 to-[#04786b]/10">
                            <div className="flex flex-col items-center justify-center">
                                {/* Cloud Icon */}
                                <Image
                                    src="/images/upload-cloud.png"
                                    alt="Upload Cloud"
                                    width={64}
                                    height={64}
                                    className="mb-4 lg:h-20 lg:w-20 2xl:h-24 2xl:w-24"
                                />

                                {/* Text */}
                                <div className="text-gray-700 font-semibold text-base">
                                    Select files to upload
                                </div>
                                <p className="text-sm text-gray-400 mt-1">
                                    Supported Format: PDF
                                </p>

                                {/* Select Button */}
                                <button className="mt-4 px-5 py-2 rounded-md bg-gray-200 border-1 border-gray-400 hover:bg-gray-300 cursor-pointer transition text-sm font-semibold">
                                    Select Files
                                </button>
                            </div>
                        </div>

                        <button className="w-full md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[20%] py-2.5 cursor-pointer bg-gradient-to-r from-[#fdc431] to-[#04786b] text-white rounded-lg font-semibold hover:opacity-90 transition">
                            Generate Comparison
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
