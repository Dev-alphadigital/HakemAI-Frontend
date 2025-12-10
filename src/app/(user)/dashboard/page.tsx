"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import ProviderCard from "@/components/ProviderCard";
import TabsSection from "@/components/TabsSection";
import RecommendedProviderCard from "@/components/RecommendedProviderCard";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { syncComparisonsFromBackend } from "@/utils/comparisonSync";

export default function DashboardPage() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showAllTabs, setShowAllTabs] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    const handleRefreshComparisons = async () => {
        setRefreshing(true);
        await syncComparisonsFromBackend();
        setRefreshing(false);
        window.location.reload(); // Reload to show updated data
    };

    const handleAllProvidersClick = () => {
        router.push('/dashboard/all-providers');
    };

    return (
        <main className="min-h-screen flex bg-[#fdfcf8] text-gray-900 lg:bg-[#e8f1ed]">
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            <div className="flex-1 flex flex-col">
                <Topbar setMobileOpen={setMobileOpen} />

                <div className="p-6 md:p-8 space-y-6">
                    {/* Sub-User Info Banner */}
                    {user?.isSubUser && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between lg:mt-[3.2rem]">
                            <div className="flex items-start">
                                <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <div className="">
                                    <h3 className="text-sm font-medium text-blue-800">Team Member View</h3>
                                    <p className="text-sm text-blue-700 mt-1">
                                        Viewing comparisons from your company. Auto-refreshing every 30 seconds. Click refresh for immediate update.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleRefreshComparisons}
                                disabled={refreshing}
                                className={`ml-4 px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer whitespace-nowrap ${refreshing
                                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                {refreshing ? 'Refreshing...' : 'Refresh Now'}
                            </button>
                        </div>
                    )}

                    {/* Providers Section */}
                    <section className="w-full">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-bold text-2xl">Providers</h2>
                            <button className="text-gray-400 text-sm font-medium hover:underline" onClick={handleAllProvidersClick}>
                                See All
                            </button>
                        </div>

                        <div className="w-full">
                            <RecommendedProviderCard />
                        </div>
                    </section>

                    {/* Comparison Section */}
                    <section>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-bold text-2xl lg:hidden">Comparison</h2>

                            {/* 👇 “See All” button only for mobile */}
                            <button
                                onClick={() => setShowAllTabs((prev) => !prev)}
                                className="text-gray-400 text-sm font-medium hover:underline md:hidden"
                            >
                                {showAllTabs ? "Show Less" : "See All"}
                            </button>
                        </div>

                        <TabsSection showAllTabs={showAllTabs} />
                    </section>
                </div>
            </div>
        </main>
    );
}