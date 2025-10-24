"use client";
import ProviderCard from "@/components/ProviderCard";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function AllProvidersPage() {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <main className="min-h-screen flex bg-[#fdfcf8] text-gray-900 lg:bg-[#e8f1ed]">
            {/* Sidebar (only visible on lg+) */}
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <Topbar setMobileOpen={setMobileOpen} />

                {/* Page Content */}
                <div className="p-6 md:p-8 space-y-6 lg:mt-[3.5rem]">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            {/* Back button only for mobile */}
                            <button
                                onClick={() => router.back()}
                                className="p-2 rounded-full hover:bg-gray-100 transition lg:hidden"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-800" />
                            </button>

                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 xl:text-3xl">
                                    All Providers
                                </h1>
                                <p className="text-sm text-gray-600 mt-1 hidden lg:block">
                                    Browse and compare all available providers to find the best match for your needs.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Providers Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-5">
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
                </div>
            </div>
        </main>
    );
}
