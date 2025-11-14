"use client";

import PaymentCard from "@/components/Admin/PaymentCard";
import PaymentTable from "@/components/Admin/PaymentTable";
import AdminTopbar from "@/components/Admin/AdminTopbar";

const payments = [
    {
        invoice: "Invoice-003",
        image: "image3.png",
        date: "Oct 20th, 2025",
        access: "Starter",
        status: "Success",
    },
    {
        invoice: "Invoice-002",
        image: "image2.png",
        date: "Oct 18th, 2025",
        access: "Starter",
        status: "Failed",
    },
    {
        invoice: "Invoice-001",
        image: "image1.png",
        date: "Oct 15th, 2025",
        access: "Professional",
        status: "Success",
    },
];

export default function PaymentHistoryPage() {
    return (
        <div>
            <AdminTopbar />
            <main className="min-h-screen">
                <section className="p-4 md:px-10  space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Payment History</h2>
                        <p className="text-gray-600 text-sm">
                            Track all payments made by this customer, including plan details,
                            amounts, and status.
                        </p>
                    </div>

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
                </section>
            </main>
        </div>
    );
}
