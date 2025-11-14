"use client";

import DashboardCard from "@/components/Admin/DashboardCard";
import DashboardTable from "@/components/Admin/DashboardTable";
import { useState, useEffect } from "react";
import AdminTopbar from "@/components/Admin/AdminTopbar";

export default function AdminDashboard() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Mock data (replace with API later)
    const users = [
        {
            name: "Ahmad",
            email: "ahmad.123@gmail.com",
            phone: "123 123 1234",
            invoice: "invoice.png",
            plan: "Starter",
            date: "Oct 19th, 2025",
        },
        {
            name: "Ahmad",
            email: "ahmad.123@gmail.com",
            phone: "123 123 1234",
            invoice: "invoice.png",
            plan: "Professional",
            date: "Oct 19th, 2025",
        },
        {
            name: "Ahmad",
            email: "ahmad.123@gmail.com",
            phone: "123 123 1234",
            invoice: "invoice.png",
            plan: "Starter",
            date: "Oct 19th, 2025",
        },
        {
            name: "Ahmad",
            email: "ahmad.123@gmail.com",
            phone: "123 123 1234",
            invoice: "invoice.png",
            plan: "Professional",
            date: "Oct 19th, 2025",
        },
    ];

    return (
        <div>
            <AdminTopbar />
            <main className="min-h-screen px-4 md:px-10 text-gray-900">
                <h2 className="text-2xl font-bold mt-8">Admin Dashboard</h2>
                <p className="text-gray-500 mb-6">
                    Track user activity and payment records in one place.
                </p>

                {isMobile ? (
                    // Mobile Card Layout
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-5">
                        {users.map((user, i) => (
                            <DashboardCard key={i} user={user} />
                        ))}
                    </div>
                ) : (
                    // Desktop Table Layout
                    <DashboardTable users={users} />
                )}
            </main>
        </div>
    );
}
