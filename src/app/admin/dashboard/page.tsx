"use client";

import DashboardCard from "@/components/Admin/DashboardCard";
import DashboardTable from "@/components/Admin/DashboardTable";
import { useState, useEffect } from "react";
import AdminTopbar from "@/components/Admin/AdminTopbar";
import { getAllUsers, getStatistics, User, Statistics } from "@/app/lib/adminApi";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { FaHistory } from "react-icons/fa";

export default function AdminDashboard() {
    const router = useRouter();
    const { isAuthenticated } = useAdminAuth();
    const [isMobile, setIsMobile] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [statistics, setStatistics] = useState<Statistics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        // Check authentication
        if (!isAuthenticated) {
            router.push("/admin/login");
            return;
        }

        fetchData();
    }, [isAuthenticated, router]);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError("");
            console.log("🔄 Fetching users and statistics...");
            const [usersData, statsData] = await Promise.all([
                getAllUsers(),
                getStatistics(),
            ]);
            // Ensure users is always an array
            const usersArray = Array.isArray(usersData) ? usersData : [];
            
            // Debug: Log first user structure
            if (usersArray.length > 0) {
                console.log('✅ User structure:', usersArray[0]);
                console.log('User subscription:', usersArray[0].subscription);
                console.log('User accountStatus:', usersArray[0].accountStatus);
            }
            
            setUsers(usersArray);
            setStatistics(statsData);
        } catch (err: any) {
            console.error("❌ Error fetching data:", err);
            setUsers([]); // Set empty array on error
            setError(err?.message || err?.error || "Failed to load data");
            if (err?.statusCode === 401 || err?.status === 401) {
                router.push("/admin/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const refreshData = () => {
        fetchData();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#e8f1ed] m-0 p-0">
                <AdminTopbar />
                <main className="px-4 md:px-10 text-gray-900 pt-4">
                    <div className="flex items-center justify-center h-96">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
                            <p className="text-gray-500">Loading dashboard...</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#e8f1ed] m-0 p-0">
            <AdminTopbar />
            <main className="px-4 md:px-10 text-gray-900 pt-4">
                <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                <p className="text-gray-500 mb-2">
                    Track user activity and payment records in one place.
                </p>

                {/* Statistics */}
                {statistics && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-sm">Total Users</p>
                            <p className="text-2xl font-bold text-gray-900">{statistics.totalUsers}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-sm">Active Users</p>
                            <p className="text-2xl font-bold text-green-600">{statistics.activeUsers}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-sm">Pending Users</p>
                            <p className="text-2xl font-bold text-yellow-600">{statistics.pendingUsers}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-sm">Frozen Users</p>
                            <p className="text-2xl font-bold text-red-600">{statistics.frozenUsers}</p>
                        </div>
                    </div>
                )}

                {/* Activity Logs Access */}
                <div className="mb-8">
                    <button
                        onClick={() => router.push("/admin/activity-logs")}
                        className="w-full bg-gradient-to-br from-[#1eaca8] to-[#14b8a6] hover:from-[#189b97] hover:to-[#0d9488] text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                                    <FaHistory className="text-3xl" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-xl font-bold mb-1">Activity Logs</h3>
                                    <p className="text-white/90 text-sm">
                                        Monitor all user activities, logins, and key actions in real-time
                                    </p>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                        {error}
                    </div>
                )}

                {isMobile ? (
                    // Mobile Card Layout
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-5">
                        {users.map((user) => (
                            <DashboardCard key={user._id} user={user} onRefresh={refreshData} />
                        ))}
                    </div>
                ) : (
                    // Desktop Table Layout
                    <DashboardTable users={users} onRefresh={refreshData} />
                )}

                {users.length === 0 && !loading && !error && (
                    <div className="text-center py-12 text-gray-500">
                        No users found.
                    </div>
                )}
            </main>
        </div>
    );
}
