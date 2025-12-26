// "use client";

// import { FaCloudDownloadAlt } from "react-icons/fa";

// export default function PdfReport() {
//     return (
//         <div className="flex flex-col items-center justify-center text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
//             {/* Heading */}
//             <h2 className="text-lg sm:text-xl font-bold text-[#1B1C1D] mb-2">
//                 Your PDF file is ready to download
//             </h2>

//             {/* Subtext */}
//             <p className="text-gray-500 text-sm mb-4">
//                 Click the download button to get your PDF
//             </p>

//             {/* Download Icon */}
//             <FaCloudDownloadAlt className="text-[#1B1C1D] text-8xl xl:text-9xl mb-4" />

//             {/* Download Button */}
//             <button
//                 type="button"
//                 className="px-10 py-3 rounded-md font-semibold cursor-pointer text-white bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C] shadow-md hover:opacity-90 transition-all"
//             >
//                 Download
//             </button>
//         </div>
//     );
// }
"use client";

import { FaCloudDownloadAlt } from "react-icons/fa";
import { useState } from "react";
import { getUserId } from "@/utils/auth";

export default function PdfReport() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDownload = async () => {
        setLoading(true);
        setError(null);

        try {
            // 1. Get comparison data from localStorage
            const comparisonRaw = localStorage.getItem("comparisonResult");
            if (!comparisonRaw) throw new Error("Comparison data not found");

            const comparisonData = JSON.parse(comparisonRaw);

            // 2. Extract comparison_id
            const comparisonId = comparisonData?.comparison_id;
            if (!comparisonId) throw new Error("Comparison ID missing");

            // 3. Get user ID
            const userId = getUserId();
            if (!userId) throw new Error("User ID missing");

            // 4. Call backend PDF endpoint to get both PDFs
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_FASTAPI_API}/api/comparison/${comparisonId}/pdf?report_type=both`,
                {
                    method: "GET",
                    headers: {
                        "X-User-Id": userId,
                    },
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to download PDFs: ${errorText}`);
            }

            // 5. Check if response is JSON (both PDFs) or blob (single PDF)
            const contentType = response.headers.get("content-type");
            
            if (contentType && contentType.includes("application/json")) {
                // Both PDFs returned as JSON with base64 data
                const data = await response.json();
                
                if (data.success && data.reports) {
                    // Helper function to decode base64 and trigger download
                    const downloadBase64PDF = (base64Data: string, filename: string) => {
                        // Convert base64 to binary
                        const binaryString = atob(base64Data);
                        const bytes = new Uint8Array(binaryString.length);
                        for (let i = 0; i < binaryString.length; i++) {
                            bytes[i] = binaryString.charCodeAt(i);
                        }
                        const blob = new Blob([bytes], { type: 'application/pdf' });
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = filename;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                    };

                    // Download strategic memo
                    const strategicData = data.reports.strategic_memo;
                    downloadBase64PDF(strategicData.data, strategicData.filename);

                    // Wait a bit before downloading the second PDF
                    await new Promise(resolve => setTimeout(resolve, 300));

                    // Download detailed comparison
                    const detailedData = data.reports.detailed_comparison;
                    downloadBase64PDF(detailedData.data, detailedData.filename);
                } else {
                    throw new Error("Invalid response format from server");
                }
            } else {
                // Single PDF blob response (fallback)
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `HAKEM_Comparison_${comparisonId}.pdf`;
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

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

            {/* Error */}
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            {/* Download Button */}
            <button
                type="button"
                onClick={handleDownload}
                disabled={loading}
                className={`px-10 py-3 rounded-md font-semibold cursor-pointer text-white 
                    bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C] shadow-md 
                    hover:opacity-90 transition-all disabled:opacity-50`}
            >
                {loading ? "Downloading..." : "Download"}
            </button>
        </div>
    );
}
