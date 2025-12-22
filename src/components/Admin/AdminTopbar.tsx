"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useRouter } from "next/navigation";

export default function AdminTopbar() {
    const { admin, logout } = useAdminAuth();
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownOpen]);

    const handleLogout = () => {
        logout();
        router.push("/admin/login");
    };

    return (
        <header className="w-full bg-gradient-to-r from-[#1eaca8] to-[#14b8a6] flex items-center justify-between px-4 md:px-10 py-3 border-b-2 border-teal-500/30 shadow-lg relative m-0">
            {/* Left: Logo */}
            <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer" onClick={() => router.push("/admin/dashboard")}>
                <div className="relative w-12 h-12">
                    <Image
                        src="/logo/logo.svg"
                        alt="Hakem AI Logo"
                        width={150}
                        height={150}
                        className="object-contain rounded-full"
                        priority
                    />
                </div>
            </div>

            {/* Center: Title */}
            <div className="absolute left-1/2 -translate-x-1/2">
                <span className="text-lg md:text-xl font-bold text-white whitespace-nowrap drop-shadow-md">
                    Admin Portal
                </span>
            </div>

            {/* Right: Notification + Profile */}
            <div className="flex items-center gap-5 flex-shrink-0" ref={dropdownRef}>
                <div 
                    className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg hover:shadow-xl transition-all cursor-pointer relative border border-white/50"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center shadow-md">
                        <span className="text-teal-800 font-bold text-sm">
                            {admin?.username?.charAt(0).toUpperCase() || "A"}
                        </span>
                    </div>
                    <div className="hidden sm:flex flex-col leading-tight">
                        <span className="text-sm font-semibold text-gray-900">{admin?.username || "Admin"}</span>
                        <span className="text-xs text-teal-700">{admin?.role || "Admin"}</span>
                    </div>
                    <FaChevronDown className="text-gray-600 text-xs" />

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <div className="p-3 border-b border-gray-100">
                                <p className="text-sm font-semibold text-gray-900">{admin?.username}</p>
                                <p className="text-xs text-gray-500">{admin?.email}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                            >
                                <FaSignOutAlt className="text-xs" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
