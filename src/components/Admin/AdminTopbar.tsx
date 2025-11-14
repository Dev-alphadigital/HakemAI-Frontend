"use client";

import Image from "next/image";
import { FaBell } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

export default function AdminTopbar() {
    return (
        <header className="w-full bg-[#e8f1ed] flex items-center justify-between px-4 md:px-10 py-3 border-b border-gray-200 relative">
            {/* Left: Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
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
                <span className="text-lg md:text-xl font-bold text-gray-900 whitespace-nowrap">
                    Admin Portal
                </span>
            </div>

            {/* Right: Notification + Profile */}
            <div className="flex items-center gap-5 flex-shrink-0">
                <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow-sm hover:shadow-md transition cursor-pointer">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                            src="/images/profile.png"
                            alt="Admin Avatar"
                            width={32}
                            height={32}
                            className="object-cover"
                        />
                    </div>
                    <div className="hidden sm:flex flex-col leading-tight">
                        <span className="text-sm font-semibold text-gray-900">James</span>
                        <span className="text-xs text-gray-500">Admin</span>
                    </div>
                    <FaChevronDown className="text-gray-500 text-xs" />
                </div>
            </div>
        </header>
    );
}
