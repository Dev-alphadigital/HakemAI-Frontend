"use client";

import { FaFileInvoice, FaCalendarAlt } from "react-icons/fa";

export default function PaymentCard({ payment }: { payment: any }) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 relative">
            <h3 className="text-sm font-semibold">{payment.invoice}</h3>
            <p className="text-xs text-gray-600">{payment.access}</p>

            <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                <FaCalendarAlt className="text-gray-400" /> {payment.date}
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                <FaFileInvoice className="text-gray-400" />{" "}
                <a href="#" className="text-teal-700 underline">
                    {payment.image}
                </a>
            </div>

            {/* Status Dot */}
            <span
                className={`absolute top-4 right-4 w-2.5 h-2.5 rounded-full ${payment.status === "Success" ? "bg-green-500" : "bg-red-500"
                    }`}
            ></span>
        </div>
    );
}
