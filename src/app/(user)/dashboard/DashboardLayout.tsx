"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#fdfcf8] text-gray-900">
            {/* ===== TOPBAR ===== */}
            <Topbar setMobileOpen={setMobileOpen} />

            {/* ===== MAIN WRAPPER ===== */}
            <div className="flex">
                {/* ===== SIDEBAR ===== */}
                <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

                {/* ===== MAIN CONTENT ===== */}
                <main className="flex-1 lg:ml-20 p-6 md:p-8 mt-[72px] transition-all duration-300">
                    {children}
                </main>
            </div>
        </div>
    );
}
