"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
    FaEnvelope,
    FaPhone,
    FaCalendarAlt,
    FaFileInvoice,
    FaEllipsisV,
    FaLock,
    FaHistory,
    FaDownload,
    FaSnowflake,
    FaChevronDown,
    FaChevronUp,
} from "react-icons/fa";
import FreezeAccountModal from "./FreezeAccountModal";
import { useRouter } from "next/navigation";

export default function DashboardCard({ user }: { user: any }) {
    const router = useRouter();
    const [freezeOpen, setFreezeOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [accessOpen, setAccessOpen] = useState(false);
    const [menuPos, setMenuPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    const btnRef = useRef<HTMLButtonElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // calculate dropdown position
    useEffect(() => {
        if (openMenu && btnRef.current) {
            const rect = btnRef.current.getBoundingClientRect();
            const dropdownHeight = 260;
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;

            const shouldOpenUp = rect.bottom + dropdownHeight > viewportHeight;
            const safeLeft = Math.min(rect.left, viewportWidth - 230);

            setMenuPos({
                top: shouldOpenUp ? rect.top - dropdownHeight - 8 : rect.bottom + 8,
                left: safeLeft,
            });
        }
    }, [openMenu]);

    // close dropdown only if clicked outside BOTH button & dropdown
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            const clickedButton = btnRef.current?.contains(target);
            const clickedDropdown = dropdownRef.current?.contains(target);
            if (!clickedButton && !clickedDropdown) {
                setOpenMenu(false);
                setAccessOpen(false);
            }
        };
        if (openMenu) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openMenu]);

    return (
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-3 border border-gray-100 relative">
            {/* Header: name + 3 dots */}
            <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <button
                    ref={btnRef}
                    onClick={() => {
                        setAccessOpen(false);
                        setOpenMenu(!openMenu);
                    }}
                    className=" rounded-full hover:bg-gray-100 cursor-pointer"
                >
                    <FaEllipsisV className="text-gray-600" />
                </button>
            </div>

            {/* Info Fields */}
            <div className="flex items-center gap-2 text-xs text-gray-600">
                <FaEnvelope className="text-gray-400" /> {user.email}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
                <FaPhone className="text-gray-400" /> {user.phone}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
                <FaCalendarAlt className="text-gray-400" /> {user.date}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
                <FaFileInvoice className="text-gray-400" />{" "}
                <a href="#" className="text-teal-700 underline">
                    {user.invoice}
                </a>
            </div>

            {/* Plan Button */}
            <div className="flex justify-center mt-4">
                <button
                    className={`px-3 py-1 rounded-md text-sm font-medium text-white ${user.plan === "Starter" ? "bg-[#00796b]" : "bg-[#00796b]"
                        }`}
                >
                    {user.plan}
                </button>
            </div>

            {/* Dropdown (rendered via portal) */}
            {openMenu &&
                typeof document !== "undefined" &&
                createPortal(
                    <div
                        ref={dropdownRef}
                        style={{ top: menuPos.top, left: menuPos.left }}
                        className="fixed z-[9999] w-56 bg-white border border-gray-200 rounded-xl shadow-lg text-sm overflow-hidden"
                    >
                        <ul className="text-gray-700 text-left">
                            {/* Access section */}
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

                            {/* Nested Access Options */}
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

                            {/* Other menu items */}
                            <li onClick={() => { router.push("/admin/payment-history"); }} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 cursor-pointer">
                                <FaHistory className="text-gray-500 text-xs" />
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
                    </div>,
                    document.body
                )}
            <FreezeAccountModal
                isOpen={freezeOpen}
                onClose={() => setFreezeOpen(false)}
                onConfirm={() => console.log("Account frozen")}
                userName={user.name}
            />
        </div>
    );
}
