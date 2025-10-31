"use client";
import {
    FaHome,
    FaFileUpload,
    FaFolderOpen,
    FaSyncAlt,
    FaPowerOff,
    FaTimes,
} from "react-icons/fa";
import Image from "next/image";
import React, { useState } from "react";
import LogoutModal from "./LogoutModal";
import { useRouter, usePathname } from "next/navigation";

interface SidebarProps {
    mobileOpen: boolean;
    setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();

    const [isLogoutOpen, setIsLogoutOpen] = useState(false);

    const handleLogout = () => {
        setIsLogoutOpen(false);
        // You can later add logout logic here, e.g. router.push("/auth/login");
        console.log("User logged out!");
    };

    return (
        <>
            {/* ===== Logout Modal ===== */}
            <LogoutModal
                isOpen={isLogoutOpen}
                onClose={() => setIsLogoutOpen(false)}
                onConfirm={handleLogout}
            />

            {/* ===== MOBILE SIDEBAR ===== */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-[#04786b] text-white flex flex-col justify-between z-50 transform transition-transform duration-300 lg:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div>
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/logo/logo.svg"
                                alt="Logo"
                                width={45}
                                height={45}
                                className="rounded-full"
                            />
                            <h2 className="text-xl font-semibold tracking-wide">HAKEM.AI</h2>
                        </div>
                        <FaTimes
                            className="text-xl cursor-pointer"
                            onClick={() => setMobileOpen(false)}
                        />
                    </div>

                    {/* Menu Items */}
                    <nav className="mt-4 space-y-1 px-3">
                        <SidebarItem
                            icon={<FaHome />}
                            label="Home"
                            active={pathname === "/dashboard"}
                            mobile
                            onClick={() => {
                                router.push("/dashboard");
                                setMobileOpen(false);
                            }}
                        />
                        <SidebarItem
                            icon={<FaFileUpload />}
                            label="Upload documents"
                            active={pathname === "/dashboard/fileUploads"}
                            mobile
                            onClick={() => {
                                router.push("/dashboard/fileUploads");
                                setMobileOpen(false);
                            }}
                        />
                        <SidebarItem
                            icon={<FaFolderOpen />}
                            label="My documents"
                            active={pathname === "/dashboard/my-documents"}
                            mobile
                            onClick={() => {
                                router.push("/dashboard/my-documents");
                                setMobileOpen(false);
                            }}
                        />
                        <SidebarItem
                            icon={<FaSyncAlt />}
                            label="Regenerate comparison"
                            active={pathname === "/dashboard/regenerate"}
                            mobile
                            onClick={() => {
                                router.push("/dashboard/regenerate");
                                setMobileOpen(false);
                            }}
                        />
                    </nav>
                </div>

                {/* Logout */}
                <div className="p-4 border-t border-white/10">
                    <SidebarItem
                        icon={<FaPowerOff />}
                        label="Logout"
                        mobile
                        onClick={() => setIsLogoutOpen(true)} // 👈 open modal
                    />
                </div>
            </aside>

            {/* ===== DESKTOP SIDEBAR ===== */}
            <aside
                className="hidden lg:flex sticky top-[72px] left-0 h-[calc(100vh-72px)]
        group bg-[#04786b] text-white flex-col justify-between
        transition-all duration-300 w-20 hover:w-64 overflow-hidden"
            >
                <div>
                    <nav className="mt-3 flex flex-col space-y-2">
                        <SidebarItem
                            icon={<FaHome />}
                            label="Home"
                            active={pathname === "/dashboard"}
                            onClick={() => router.push("/dashboard")}
                        />
                        <SidebarItem
                            icon={<FaFileUpload />}
                            label="Upload documents"
                            active={pathname === "/dashboard/fileUploads"}
                            onClick={() => router.push("/dashboard/fileUploads")}
                        />
                        <SidebarItem
                            icon={<FaFolderOpen />}
                            label="My documents"
                            active={pathname === "/dashboard/my-documents"}
                            onClick={() => router.push("/dashboard/my-documents")}
                        />
                        <SidebarItem
                            icon={<FaSyncAlt />}
                            label="Regenerate comparison"
                            active={pathname === "/dashboard/regenerate"}
                            onClick={() => router.push("/dashboard/regenerate")}
                        />
                    </nav>
                </div>

                {/* Logout */}
                <div className="pb-6">
                    <SidebarItem
                        icon={<FaPowerOff />}
                        label="Logout"
                        onClick={() => setIsLogoutOpen(true)} // 👈 open modal
                    />
                </div>
            </aside>
        </>
    );
}

function SidebarItem({
    icon,
    label,
    active = false,
    mobile = false,
    onClick,
}: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    mobile?: boolean;
    onClick?: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 px-5 py-3 cursor-pointer rounded-md 
      transition-all duration-200 mx-2
      ${active ? "bg-[#fdc431] text-black font-semibold" : "hover:bg-[#066e61] text-white"}
      ${mobile ? "justify-start" : ""}`}
        >
            <span className="text-xl xl:text-2xl">{icon}</span>
            <span
                className={`text-sm whitespace-nowrap ${mobile
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    }`}
            >
                {label}
            </span>
        </div>
    );
}
