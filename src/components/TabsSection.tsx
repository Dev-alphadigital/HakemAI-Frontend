// "use client";
// import { useState } from "react";
// import ProviderCard from "./ProviderCard";
// import ChartSection from "./ChartSection";
// import DataTable from "./DataTable";
// import KeyDifferences from "./KeyDifferences";
// import PdfReport from "./PdfReport";
// import SideBySide from "./SideBySide";

// export default function TabsSection({ showAllTabs }: { showAllTabs: boolean }) {
//     const [activeTab, setActiveTab] = useState("Summary");

//     const allTabs = [
//         "Summary",
//         "Key Differences",
//         "Charts",
//         "Data Table",
//         "Side-by-Side",
//         "PDF Report",
//     ];

//     const visibleTabs =
//         typeof window !== "undefined" && window.innerWidth >= 768
//             ? allTabs
//             : showAllTabs
//                 ? allTabs
//                 : allTabs.slice(0, 3);

//     // 👇 Helper to render tab-specific content
//     const renderTabContent = () => {
//         switch (activeTab) {
//             case "Summary":
//                 return (
//                     <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
//                         {[1, 2].map((i) => (
//                             <ProviderCard
//                                 key={i}
//                                 name={`Provider ${i}`}
//                                 score="77.0%"
//                                 premium="516,335"
//                                 rate="0.33%"
//                                 active={i === 1}
//                             />
//                         ))}
//                     </div>
//                 );

//             case "Key Differences":
//                 return <KeyDifferences />;

//             case "Charts":
//                 return <ChartSection />;

//             case "Data Table":
//                 return <DataTable />;

//             case "Side-by-Side":
//                 return <SideBySide />;

//             case "PDF Report":
//                 return <PdfReport />;

//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="bg-white border-t border-l border-r border-gray-200 rounded-t-lg shadow-sm p-4">
//             {/* Tabs Row */}
//             <div className="flex flex-wrap justify-between items-center border-b border-gray-200 pb-3 mb-4">
//                 <div className="flex flex-wrap gap-2">
//                     {visibleTabs.map((tab) => (
//                         <button
//                             key={tab}
//                             onClick={() => setActiveTab(tab)}
//                             className={`px-4 py-2 text-sm lg:text-base 2xl:text-lg cursor-pointer rounded-md transition-all ${activeTab === tab
//                                 ? "border-b-2 border-[#04786b] text-[#04786b] font-bold bg-[#e6f3e9]"
//                                 : "text-gray-700 hover:bg-gray-100"
//                                 }`}
//                         >
//                             {tab}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Tab Content */}
//             {renderTabContent()}
//         </div>
//     );
// }



"use client";
import { useState } from "react";
import ProviderCard from "./ProviderCard";
import ChartSection from "@/app/(user)/dashboard/charts/ChartSection";
import DataTable from "./DataTable";
import KeyDifferences from "./KeyDifferences";
import PdfReport from "./PdfReport";
import SideBySide from "./SideBySide";

export default function TabsSection({ showAllTabs }: { showAllTabs: boolean }) {
    const [activeTab, setActiveTab] = useState("Summary");

    // 1️⃣ Define different dummy data for each tab
    const summaryData = [
        { name: "Provider 1", score: "77.0%", premium: "516,335", rate: "0.33%", active: true },
        { name: "Provider 2", score: "72.5%", premium: "498,000", rate: "0.35%" },
    ];

    const keyDiffData = [
        { name: "Provider A", score: "82.3%", premium: "525,100", rate: "0.30%", active: true },
        { name: "Provider B", score: "69.4%", premium: "503,800", rate: "0.36%" },
    ];

    const sideBySideData = [
        { name: "Provider Alpha", score: "80.1%", premium: "520,900", rate: "0.31%", active: true },
        { name: "Provider Beta", score: "73.9%", premium: "499,000", rate: "0.34%" },
    ];

    // 2️⃣ Tab list
    const allTabs = [
        "Summary",
        "Key Differences",
        "Charts",
        "Data Table",
        "Side-by-Side",
        "PDF Report",
    ];

    const visibleTabs =
        typeof window !== "undefined" && window.innerWidth >= 768
            ? allTabs
            : showAllTabs
                ? allTabs
                : allTabs.slice(0, 3);

    // 3️⃣ Helper to render cards dynamically per tab
    const renderProviderCards = (dataArray: any[]) => (
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            {dataArray.map((provider, index) => (
                <ProviderCard
                    key={index}
                    name={provider.name}
                    score={provider.score}
                    premium={provider.premium}
                    rate={provider.rate}
                    active={provider.active}
                />
            ))}
        </div>
    );

    // 4️⃣ Render specific section
    const renderTabContent = () => {
        switch (activeTab) {
            case "Summary":
                return renderProviderCards(summaryData);
            case "Key Differences":
                return renderProviderCards(keyDiffData);
            case "Side-by-Side":
                return renderProviderCards(sideBySideData);
            case "Charts":
                return <ChartSection />;
            case "Data Table":
                return <DataTable />;
            case "PDF Report":
                return <PdfReport />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white border-t border-l border-r border-gray-200 rounded-t-lg shadow-sm p-4">
            {/* Tabs Row */}
            <div className="flex flex-wrap justify-between items-center border-b border-gray-200 pb-3 mb-4">
                <div className="flex flex-wrap gap-2">
                    {visibleTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm lg:text-base 2xl:text-lg cursor-pointer rounded-md transition-all ${activeTab === tab
                                ? "border-b-2 border-[#04786b] text-[#04786b] font-bold bg-[#e6f3e9]"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            {renderTabContent()}
        </div>
    );
}
