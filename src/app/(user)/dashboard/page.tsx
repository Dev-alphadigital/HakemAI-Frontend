"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import ProviderCard from "@/components/ProviderCard";
import TabsSection from "@/components/TabsSection";
import RecommendedProviderCard from "@/components/RecommendedProviderCard";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showAllTabs, setShowAllTabs] = useState(false);
    const router = useRouter();

    const handleAllProvidersClick = () => {
        router.push('/dashboard/all-providers');
    };

    return (
        <main className="min-h-screen flex bg-[#fdfcf8] text-gray-900 lg:bg-[#e8f1ed]">
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            <div className="flex-1 flex flex-col">
                <Topbar setMobileOpen={setMobileOpen} />

                <div className="p-6 md:p-8 space-y-6">
                    {/* Providers Section */}
                    <section>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="font-bold text-2xl">Providers</h2>
                            <button className="text-gray-400 text-sm font-medium hover:underline" onClick={handleAllProvidersClick}>
                                See All
                            </button>
                        </div>

                        <RecommendedProviderCard />
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