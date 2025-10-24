"use client";
import { useState } from "react";
import ProviderCard from "./ProviderCard";

export default function TabsSection({ showAllTabs }: { showAllTabs: boolean }) {
    const [activeTab, setActiveTab] = useState("Summary");

    const allTabs = [
        "Summary",
        "Key Differences",
        "Charts",
        "Data Table",
        "Side-by-Side",
        "PDF Report",
    ];

    // 👇 Restrict tabs for small screens
    const visibleTabs =
        typeof window !== "undefined" && window.innerWidth >= 768
            ? allTabs
            : showAllTabs
                ? allTabs
                : allTabs.slice(0, 3);

    return (
        <div
            className="
        bg-white border-t border-l border-r border-gray-200
        rounded-t-lg shadow-sm p-4
      "
        >
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

            {/* Summary Grid */}
            {activeTab === "Summary" && (
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <ProviderCard
                            key={i}
                            name={`Provider ${i}`}
                            score="77.0%"
                            premium="516,335"
                            rate="0.33%"
                            active={i === 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}