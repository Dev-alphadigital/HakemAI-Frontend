// "use client";

// import { useState, useEffect } from "react";
// import ProviderCard from "./ProviderCard";
// import ChartSection from "@/app/(user)/dashboard/charts/ChartSection";
// import DataTable from "./DataTable";
// import KeyDifferences from "./KeyDifferences";
// import PdfReport from "./PdfReport";
// import SideBySide from "./SideBySide";
// import { loadComparisonData } from "@/utils/comparisonSync";
// import BenefitsTab from "./BenefitsTab";

// export default function TabsSection({ showAllTabs }: { showAllTabs: boolean }) {
//     const [activeTab, setActiveTab] = useState("Summary");
//     const [comparison, setComparison] = useState<any>(null);
//     const [lastUpdateTime, setLastUpdateTime] = useState<number>(Date.now());

//     const normalizeName = (name: string) =>
//         name?.toLowerCase().replace(/[^a-z0-9]/g, "").trim();

//     const extractCompanyName = (text: string) => {
//         if (!text) return "";

//         const companies: string[] = comparison.summary.ranking.map((p: any) =>
//             normalizeName(p.company)
//         );

//         const cleaned: string = normalizeName(text);

//         const match = companies.find((c: string) => cleaned.includes(c));

//         return match || "";
//     };


//     useEffect(() => {
//         const loadComparison = async () => {
//             try {
//                 console.log('🔄 TabsSection: Loading comparison data...');
//                 const data = await loadComparisonData();
//                 console.log('📊 TabsSection: Loaded data:', data ? 'Data found' : 'No data');
//                 console.log('📦 TabsSection: Data structure:', data ? Object.keys(data) : 'null');

//                 if (data) {
//                     setComparison(data);
//                     setLastUpdateTime(Date.now());
//                     console.log('✅ TabsSection: Comparison set successfully');
//                     console.log('✅ Provider cards count:', data.provider_cards?.length || 0);
//                 } else {
//                     console.error('❌ TabsSection: No comparison data available');
//                     // Set a fallback message
//                     setComparison(null);
//                 }
//             } catch (error) {
//                 console.error('❌ TabsSection: Error loading comparison:', error);
//                 setComparison(null);
//             }
//         };

//         // Load immediately
//         loadComparison();

//         // Auto-refresh every 30 seconds to check for new comparisons
//         const intervalId = setInterval(() => {
//             console.log('🔄 Auto-refresh: Checking for new comparisons...');
//             loadComparison();
//         }, 30000); // 30 seconds

//         // Cleanup interval on unmount
//         return () => clearInterval(intervalId);
//     }, []);

//     if (!comparison) {
//         return (
//             <div className="text-center py-20">
//                 <p className="text-gray-600 mb-4">Loading comparison...</p>
//                 <p className="text-sm text-gray-500">
//                     If this takes too long, try refreshing the page or clicking the "Refresh Now" button above.
//                 </p>
//                 <button
//                     onClick={() => window.location.reload()}
//                     className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700"
//                 >
//                     Refresh Page
//                 </button>
//             </div>
//         );
//     }

//     // ✅ SUMMARY DATA
//     const summaryData = comparison?.summary?.ranking?.map((item: any) => ({
//         name: item.company,
//         score: `${item.score.toFixed(2)}%`,
//         premium: `SAR ${item.premium.toLocaleString()}`,
//         rate: item.rate,
//         active: item.recommendation_badge === "Recommended",
//         strengths: item.key_advantages || [],
//         warranties: item.unique_warranties || [],
//         subjectivities: item.unique_subjectivities || [],
//     })) || [];

//     const recommendedName = comparison.key_differences.recommendation;

//     const keyDiffData =
//         comparison?.summary?.ranking
//             ?.map((p: any) => {
//                 const recommendedRaw = comparison.key_differences.recommendation;
//                 const recommended = extractCompanyName(recommendedRaw);


//                 return {
//                     name: p.company,
//                     score: `${p.score.toFixed(2)}%`,
//                     premium: `SAR ${p.premium.toLocaleString()}`,
//                     rate: p.rate,

//                     // ✅ FIXED
//                     active: normalizeName(p.company) === recommended,

//                     strengths: p.key_advantages || [],
//                     warranties: p.unique_warranties || [],
//                     subjectivities: p.unique_subjectivities || [],
//                 };
//             })
//             .sort((a: any, b: any) => (b.active ? 1 : 0) - (a.active ? 1 : 0));




//     // ✅ SIDE BY SIDE
//     const sideBySideData =
//         comparison?.side_by_side?.providers?.map((item: any) => ({
//             name: item.name,
//             score: `${item.score}%`,
//             premium: `SAR ${item.premium.toLocaleString()}`,
//             rate: item.rate,
//             active: item.name === comparison.side_by_side.winner,
//             strengths: item.strengths || [],
//             warranties: item.unique_warranties || [],
//             subjectivities: item.unique_subjectivities || [],
//         })) || [];

//     // ✅ BENEFITS DATA
//     const benefitsData =
//         comparison?.side_by_side?.providers?.map((item: any) => ({
//             name: item.name,
//             benefits: item.benefits || [],
//             active: item.name === comparison.side_by_side.winner,
//         })) || [];

//     const renderProviderCards = (dataArray: any[]) => (
//         <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
//             {dataArray.map((provider, index) => (
//                 <ProviderCard
//                     key={index}
//                     name={provider.name}
//                     score={provider.score}
//                     premium={provider.premium}
//                     rate={provider.rate}
//                     active={provider.active}
//                     strengths={provider.strengths}
//                     warranties={provider.warranties}
//                     subjectivities={provider.subjectivities}
//                 />
//             ))}
//         </div>
//     );

//     const renderTabContent = () => {
//         switch (activeTab) {
//             case "Summary":
//                 return renderProviderCards(summaryData);

//             case "Key Differences":
//                 return renderProviderCards(keyDiffData);

//             case "Benefits":
//                 return <BenefitsTab data={benefitsData} />;


//             case "Side-by-Side":
//                 return renderProviderCards(sideBySideData);

//             case "Charts":
//                 return <ChartSection />;

//             case "Data Table":
//                 return <DataTable />;

//             case "PDF Report":
//                 return <PdfReport />;

//             default:
//                 return null;
//         }
//     };

//     const tabs = [
//         "Summary",
//         "Key Differences",
//         "Benefits",
//         "Charts",
//         "Data Table",
//         "Side-by-Side",
//         "PDF Report",
//     ];

//     const visibleTabs =
//         typeof window !== "undefined" && window.innerWidth >= 768
//             ? tabs
//             : showAllTabs
//                 ? tabs
//                 : tabs.slice(0, 3);

//     console.log("🔍 Recommended from AI:", comparison.key_differences.recommendation);

//     comparison.summary.ranking.forEach((p: any) => {
//         console.log("✅ Comparing:", normalizeName(p.company), "vs", normalizeName(comparison.key_differences.recommendation));
//     });


//     return (
//         <div className="bg-white shadow-sm p-4">
//             {/* Tabs Header */}
//             <div className="flex flex-wrap gap-2 border-b border-gray-300 pb-3 mb-4">
//                 {visibleTabs.map((tab) => (
//                     <button
//                         key={tab}
//                         onClick={() => setActiveTab(tab)}
//                         className={`px-4 py-2 rounded-md transition-all cursor-pointer
//               ${activeTab === tab
//                                 ? "bg-[#e6f3e9] border-b-2 border-[#04786b] text-[#04786b] font-bold"
//                                 : "text-gray-600 hover:bg-gray-100"
//                             }`}
//                     >
//                         {tab}
//                     </button>
//                 ))}
//             </div>

//             {/* Content */}
//             {renderTabContent()}
//         </div>
//     );
// }



"use client";

import { useState, useEffect } from "react";
import ProviderCard from "./ProviderCard";
import ChartSection from "@/app/(user)/dashboard/charts/ChartSection";
import DataTable from "./DataTable";
import KeyDifferences from "./KeyDifferences";
import PdfReport from "./PdfReport";
import SideBySide from "./SideBySide";
import { loadComparisonData } from "@/utils/comparisonSync";
import BenefitsTab from "./BenefitsTab";

export default function TabsSection({ showAllTabs }: { showAllTabs: boolean }) {
    const [activeTab, setActiveTab] = useState("Summary");
    const [comparison, setComparison] = useState<any>(null);
    const [lastUpdateTime, setLastUpdateTime] = useState<number>(Date.now());

    const normalizeName = (name: string) =>
        name?.toLowerCase().replace(/[^a-z0-9]/g, "").trim();

    const extractCompanyName = (text: string) => {
        if (!text) return "";

        const companies: string[] = comparison.summary.ranking.map((p: any) =>
            normalizeName(p.company)
        );

        const cleaned: string = normalizeName(text);

        const match = companies.find((c: string) => cleaned.includes(c));

        return match || "";
    };


    useEffect(() => {
        const loadComparison = async () => {
            try {
                console.log('🔄 TabsSection: Loading comparison data...');
                const data = await loadComparisonData();
                console.log('📊 TabsSection: Loaded data:', data ? 'Data found' : 'No data');
                console.log('📦 TabsSection: Data structure:', data ? Object.keys(data) : 'null');

                if (data) {
                    setComparison(data);
                    setLastUpdateTime(Date.now());
                    console.log('✅ TabsSection: Comparison set successfully');
                    console.log('✅ Provider cards count:', data.provider_cards?.length || 0);
                } else {
                    console.error('❌ TabsSection: No comparison data available');
                    // Set a fallback message
                    setComparison(null);
                }
            } catch (error) {
                console.error('❌ TabsSection: Error loading comparison:', error);
                setComparison(null);
            }
        };

        // Load immediately
        loadComparison();

        // Auto-refresh every 30 seconds to check for new comparisons
        const intervalId = setInterval(() => {
            console.log('🔄 Auto-refresh: Checking for new comparisons...');
            loadComparison();
        }, 30000); // 30 seconds

        // Cleanup interval on unmount
        return () => clearInterval(intervalId);
    }, []);

    if (!comparison) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-600 mb-4">Loading comparison...</p>
                <p className="text-sm text-gray-500">
                    If this takes too long, try refreshing the page or clicking the "Refresh Now" button above.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700"
                >
                    Refresh Page
                </button>
            </div>
        );
    }

    // ✅ SUMMARY DATA
    const summaryData = comparison?.summary?.ranking?.map((item: any) => ({
        name: item.company,
        score: `${item.score.toFixed(2)}%`,
        premium: `SAR ${item.premium.toLocaleString()}`,
        rate: item.rate,
        active: item.recommendation_badge === "Recommended",
        strengths: item.key_advantages || [],
        warranties: item.unique_warranties || [],
        subjectivities: item.unique_subjectivities || [],
    })) || [];

    const recommendedName = comparison.key_differences.recommendation;

    const keyDiffData =
        comparison?.summary?.ranking
            ?.map((p: any) => {
                const recommendedRaw = comparison.key_differences.recommendation;
                const recommended = extractCompanyName(recommendedRaw);


                return {
                    name: p.company,
                    score: `${p.score.toFixed(2)}%`,
                    premium: `SAR ${p.premium.toLocaleString()}`,
                    rate: p.rate,

                    // ✅ FIXED
                    active: normalizeName(p.company) === recommended,

                    warranties: p.unique_warranties || [],
                    exclusions: p.unique_exclusions || [],
                    subjectivities: p.unique_subjectivities || [],
                };
            })
            .sort((a: any, b: any) => (b.active ? 1 : 0) - (a.active ? 1 : 0));




    // ✅ SIDE BY SIDE
    const sideBySideData =
        comparison?.side_by_side?.providers?.map((item: any) => ({
            name: item.name,
            score: `${item.score}%`,
            premium: `SAR ${item.premium.toLocaleString()}`,
            rate: item.rate,
            active: item.name === comparison.side_by_side.winner,
            strengths: item.strengths || [],
            warranties: item.unique_warranties || [],
            subjectivities: item.unique_subjectivities || [],
        })) || [];

    // ✅ BENEFITS DATA
    const benefitsData =
        comparison?.side_by_side?.providers?.map((item: any) => ({
            name: item.name,
            benefits: item.benefits || [],
            active: item.name === comparison.side_by_side.winner,
        })) || [];

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
                    strengths={provider.strengths}
                    warranties={provider.warranties}
                    subjectivities={provider.subjectivities}
                />
            ))}
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case "Summary":
                return renderProviderCards(summaryData);

            case "Key Differences":
                return <KeyDifferences data={keyDiffData} />;


            case "Benefits":
                return <BenefitsTab data={benefitsData} />;


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

    const tabs = [
        "Summary",
        "Key Differences",
        "Benefits",
        "Charts",
        "Data Table",
        "Side-by-Side",
        "PDF Report",
    ];

    const visibleTabs =
        typeof window !== "undefined" && window.innerWidth >= 768
            ? tabs
            : showAllTabs
                ? tabs
                : tabs.slice(0, 3);

    console.log("🔍 Recommended from AI:", comparison.key_differences.recommendation);

    comparison.summary.ranking.forEach((p: any) => {
        console.log("✅ Comparing:", normalizeName(p.company), "vs", normalizeName(comparison.key_differences.recommendation));
    });


    return (
        <div className="bg-white shadow-sm p-4">
            {/* Tabs Header */}
            <div className="flex flex-wrap gap-2 border-b border-gray-300 pb-3 mb-4">
                {visibleTabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-md transition-all cursor-pointer
              ${activeTab === tab
                                ? "bg-[#e6f3e9] border-b-2 border-[#04786b] text-[#04786b] font-bold"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            {renderTabContent()}
        </div>
    );
}
