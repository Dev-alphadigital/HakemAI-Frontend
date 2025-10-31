"use client";

import { FaCloudDownloadAlt } from "react-icons/fa";

export default function PdfReport() {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Heading */}
            <h2 className="text-lg sm:text-xl font-bold text-[#1B1C1D] mb-2">
                Your PDF file is ready to download
            </h2>

            {/* Subtext */}
            <p className="text-gray-500 text-sm mb-4">
                Click the download button to get your PDF
            </p>

            {/* Download Icon */}
            <FaCloudDownloadAlt className="text-[#1B1C1D] text-8xl xl:text-9xl mb-4" />

            {/* Download Button */}
            <button
                type="button"
                className="px-10 py-3 rounded-md font-semibold cursor-pointer text-white bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C] shadow-md hover:opacity-90 transition-all"
            >
                Download
            </button>
        </div>
    );
}
