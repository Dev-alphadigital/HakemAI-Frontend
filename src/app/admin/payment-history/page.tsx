"use client";

import PaymentCard from "@/components/Admin/PaymentCard";
import PaymentTable from "@/components/Admin/PaymentTable";
import AdminTopbar from "@/components/Admin/AdminTopbar";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllUsers, getUserPaymentProof, User } from "@/app/lib/adminApi";
import { useAdminAuth } from "@/context/AdminAuthContext";

interface PaymentData {
    userId: string;
    username: string;
    email: string;
    paymentProof?: any;
    date: string;
    plan: string;
    status: string;
}

export default function PaymentHistoryPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isAuthenticated } = useAdminAuth();
    const [payments, setPayments] = useState<PaymentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/admin/login");
            return;
        }

        fetchPayments();
    }, [isAuthenticated, router]);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const userId = searchParams.get("userId");
            
            if (userId) {
                // Fetch payment proof for specific user
                const users = await getAllUsers();
                const user = users.find((u: User) => (u._id || (u as any).id) === userId);
                
                if (user) {
                    const userIdValue = user._id || (user as any).id || '';
                    try {
                        const paymentProof = await getUserPaymentProof(userId);
                        setPayments([{
                            userId: userIdValue,
                            username: user.username,
                            email: user.email,
                            paymentProof,
                            date: new Date(user.createdAt).toLocaleDateString("en-US", { 
                                month: "short", 
                                day: "numeric", 
                                year: "numeric" 
                            }),
                            plan: user.subscription?.plan || "No Plan",
                            status: user.isActive ? "Active" : "Inactive"
                        }]);
                    } catch (err) {
                        console.error("Error fetching payment proof:", err);
                        setPayments([{
                            userId: userIdValue,
                            username: user.username,
                            email: user.email,
                            date: new Date(user.createdAt).toLocaleDateString("en-US", { 
                                month: "short", 
                                day: "numeric", 
                                year: "numeric" 
                            }),
                            plan: user.subscription?.plan || "No Plan",
                            status: user.isActive ? "Active" : "Inactive"
                        }]);
                    }
                }
            } else {
                // Fetch all users and their payment proofs
                const users = await getAllUsers();
                const paymentsData = users.map((user: User) => ({
                    userId: user._id || (user as any).id || '',
                    username: user.username,
                    email: user.email,
                    date: new Date(user.createdAt).toLocaleDateString("en-US", { 
                        month: "short", 
                        day: "numeric", 
                        year: "numeric" 
                    }),
                    plan: user.subscription?.plan || "No Plan",
                    status: user.isActive ? "Active" : "Inactive"
                }));
                setPayments(paymentsData);
            }
        } catch (err: any) {
            console.error("Error fetching payments:", err);
            setError(err?.message || "Failed to load payment data");
            if (err?.statusCode === 401) {
                router.push("/admin/login");
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div>
                <AdminTopbar />
                <main className="min-h-screen">
                    <div className="flex items-center justify-center h-96">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
                            <p className="text-gray-500">Loading payment history...</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div>
            <AdminTopbar />
            <main className="min-h-screen">
                <section className="p-4 md:px-10 space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Payment History</h2>
                        <p className="text-gray-600 text-sm">
                            Track all payments made by customers, including plan details and status.
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                            {error}
                        </div>
                    )}

                    {/* Desktop Table */}
                    <div className="hidden md:block">
                        <h3 className="font-semibold text-gray-800 mb-2">
                            All payments{" "}
                            <span className="text-gray-500 font-normal">{payments.length}</span>
                        </h3>
                        <PaymentTable payments={payments} />
                    </div>

                    {/* Mobile Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                        {payments.map((p, i) => (
                            <PaymentCard key={i} payment={p} />
                        ))}
                    </div>

                    {payments.length === 0 && !loading && !error && (
                        <div className="text-center py-12 text-gray-500">
                            No payment history found.
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
