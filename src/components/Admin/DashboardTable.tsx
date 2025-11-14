"use client";

import { useState, useRef, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import {
    FaLock,
    FaClockRotateLeft,
    FaDownload,
    FaSnowflake,
    FaChevronDown,
    FaChevronUp,
} from "react-icons/fa6";
import FreezeAccountModal from "./FreezeAccountModal";
import { useRouter } from "next/navigation";

export default function DashboardTable({ users }: { users: any[] }) {
    const router = useRouter();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [accessOpen, setAccessOpen] = useState(false);
    const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [freezeOpen, setFreezeOpen] = useState(false);

    useEffect(() => {
        if (openIndex !== null && buttonRefs.current[openIndex]) {
            const rect = buttonRefs.current[openIndex]!.getBoundingClientRect();
            const dropdownHeight = 240;
            const shouldOpenUp = rect.bottom + dropdownHeight > window.innerHeight;
            setDropdownPos({
                top: shouldOpenUp ? rect.top - dropdownHeight - 8 : rect.bottom + 8,
                left: rect.left - 200,
            });
        }
    }, [openIndex]);

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto border border-gray-100">
            <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-200 text-gray-600 font-medium">
                    <tr>
                        <th className="p-3">User name</th>
                        <th className="p-3">Phone number</th>
                        <th className="p-3">Invoice</th>
                        <th className="p-3">Access</th>
                        <th className="p-3">Date joined</th>
                        <th className="p-3 text-right"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {users.map((user, i) => (
                        <tr key={i} className="hover:bg-gray-100">
                            <td className="p-3">
                                <div className="flex flex-col">
                                    <span className="font-semibold">{user.name}</span>
                                    <span className="text-gray-500 text-xs">{user.email}</span>
                                </div>
                            </td>
                            <td className="p-3">{user.phone}</td>
                            <td className="p-3 text-teal-700 underline cursor-pointer">
                                {user.invoice}
                            </td>
                            <td className="p-3">{user.plan}</td>
                            <td className="p-3">{user.date}</td>
                            <td className="p-3 text-right relative">
                                <button
                                    ref={(el) => {
                                        buttonRefs.current[i] = el;
                                    }}
                                    onClick={() => {
                                        setAccessOpen(false);
                                        setOpenIndex(openIndex === i ? null : i);
                                    }}
                                    className="p-2 rounded-full cursor-pointer hover:bg-gray-100"
                                >
                                    <FaEllipsisV />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Fixed dropdown */}
            {openIndex !== null && (
                <div
                    style={{ top: dropdownPos.top, left: dropdownPos.left }}
                    className="fixed z-50 w-56 bg-white border border-gray-200 rounded-xl shadow-lg text-sm overflow-hidden"
                >
                    <ul className="text-gray-700 text-left">
                        {/* Access item */}
                        <li
                            onClick={() => setAccessOpen(!accessOpen)}
                            className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                        >
                            <div className="flex items-center gap-2">
                                <FaLock className="text-gray-500 text-xs" />
                                <span className="font-medium">Access</span>
                            </div>
                            {accessOpen ? (
                                <FaChevronUp className="text-gray-500 text-xs" />
                            ) : (
                                <FaChevronDown className="text-gray-500 text-xs" />
                            )}
                        </li>

                        {/* Nested access levels */}
                        {accessOpen && (
                            <div className="pl-9 pr-4 py-2 space-y-2 border-b border-gray-100">
                                {[
                                    "No access",
                                    "Starter – SAR 599",
                                    "Professional – SAR 999",
                                    "Premium – SAR 1,875",
                                ].map((plan, idx) => (
                                    <label
                                        key={idx}
                                        className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-teal-700"
                                    >
                                        <input
                                            type="radio"
                                            name="access"
                                            className="accent-teal-600"
                                            defaultChecked={idx === 0}
                                        />
                                        <span>{plan}</span>
                                    </label>
                                ))}
                            </div>
                        )}

                        {/* Other actions */}
                        <li onClick={() => { router.push("/admin/payment-history"); }} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 cursor-pointer">
                            <FaClockRotateLeft className="text-gray-500 text-xs" />
                            <span>Payment history</span>
                        </li>
                        <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 cursor-pointer">
                            <FaDownload className="text-gray-500 text-xs" />
                            <span>Download receipt</span>
                        </li>
                        <li onClick={() => setFreezeOpen(true)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-red-600 cursor-pointer">
                            <FaSnowflake className="text-red-500 text-xs" />
                            <span>Freeze account</span>
                        </li>
                    </ul>
                </div>
            )}
            <FreezeAccountModal
                isOpen={freezeOpen}
                onClose={() => setFreezeOpen(false)}
                onConfirm={() => console.log("Account frozen")}
                userName={
                    openIndex !== null && users[openIndex] ? users[openIndex].name : undefined
                }
            />
        </div>
    );
}
