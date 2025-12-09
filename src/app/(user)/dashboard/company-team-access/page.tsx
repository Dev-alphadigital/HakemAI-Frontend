"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import GeneratingModal from "@/components/GeneratingModal";

export default function CompanyTeamAccess() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const API_BASE = process.env.NEXT_PUBLIC_FASTAPI_API;

    return (
        <main className="min-h-screen flex bg-[#fdfcf8] text-gray-900 lg:bg-[#e8f1ed]">
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            <div className="flex-1 flex flex-col">
                <Topbar setMobileOpen={setMobileOpen} />

                <div className="p-6 md:p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2 lg:mt-[3.5rem] xl:text-3xl">
                        Company Team Access
                    </h1>
                    <p className="text-gray-500 mb-6">
                        Manage who can access your company account and collaborate on insurance reports.
                    </p>
                </div>
            </div>

            {showModal && (
                <GeneratingModal
                    onCancel={() => setShowModal(false)}
                    onComplete={() => { }}
                />
            )}
        </main>
    );
}
