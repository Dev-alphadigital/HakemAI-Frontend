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
    FaDownload,
    FaSnowflake,
    FaChevronDown,
    FaChevronUp,
    FaFire,
} from "react-icons/fa";
import FreezeAccountModal from "./FreezeAccountModal";
import { useRouter } from "next/navigation";
import {
    User,
    assignPlan,
    freezeAccount,
    unfreezeAccount,
    downloadPaymentProof,
    SubscriptionPlan
} from "@/app/lib/adminApi";

interface DashboardCardProps {
    user: User;
    onRefresh: () => void;
}

export default function DashboardCard({ user, onRefresh }: DashboardCardProps) {
    const router = useRouter();
    const [freezeOpen, setFreezeOpen] = useState(false);
    const [unfreezeOpen, setUnfreezeOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [accessOpen, setAccessOpen] = useState(false);
    const [menuPos, setMenuPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const [loading, setLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string>("");

    const btnRef = useRef<HTMLButtonElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Helper to safely get user ID
    const getUserId = (user: User): string => {
        return user._id || (user as any).id || '';
    };

    const userId = getUserId(user);

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

    const handleAssignPlan = async (plan: string) => {
        if (!plan || plan === "No access" || !userId) {
            alert("Error: User ID is missing");
            return;
        }

        try {
            setLoading(true);
            let planEnum: SubscriptionPlan;

            if (plan.includes("Starter")) {
                planEnum = SubscriptionPlan.STARTER;
            } else if (plan.includes("Professional")) {
                planEnum = SubscriptionPlan.PROFESSIONAL;
            } else if (plan.includes("Premium")) {
                planEnum = SubscriptionPlan.ENTERPRISE;
            } else {
                return;
            }

            await assignPlan(userId, planEnum);
            setOpenMenu(false);
            setAccessOpen(false);

            // Refresh to show updated plan
            await onRefresh();
        } catch (err: any) {
            console.error("Error assigning plan:", err);
            alert(err?.message || "Failed to assign plan");
        } finally {
            setLoading(false);
        }
    };

    const handleFreeze = async () => {
        if (!userId) {
            alert("Error: User ID is missing");
            return;
        }
        try {
            setLoading(true);
            await freezeAccount(userId);
            setFreezeOpen(false);
            setOpenMenu(false);

            // Refresh to show updated status
            await onRefresh();
        } catch (err: any) {
            console.error("Error freezing account:", err);
            alert(err?.message || "Failed to freeze account");
        } finally {
            setLoading(false);
        }
    };

    const handleUnfreeze = async () => {
        if (!userId) {
            alert("Error: User ID is missing");
            return;
        }
        try {
            setLoading(true);
            await unfreezeAccount(userId);
            setUnfreezeOpen(false);
            setOpenMenu(false);

            // Refresh to show updated status
            await onRefresh();
        } catch (err: any) {
            console.error("Error unfreezing account:", err);
            alert(err?.message || "Failed to unfreeze account");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPaymentProof = async () => {
        if (!userId) {
            alert("User ID is missing");
            return;
        }
        try {
            setLoading(true);
            const blob = await downloadPaymentProof(userId);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `payment-proof-${userId}.png`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err: any) {
            console.error("Error downloading payment proof:", err);
            alert(err?.message || "Failed to download payment proof");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-3 border border-gray-100 relative">
            {/* Header: name + 3 dots */}
            <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">{user.username}</h3>
                <button
                    ref={btnRef}
                    onClick={() => {
                        setAccessOpen(false);
                        setOpenMenu(!openMenu);
                    }}
                    className="p-2.5 rounded-full hover:bg-gradient-to-r hover:from-teal-50 hover:to-yellow-50 cursor-pointer transition-all duration-200 hover:shadow-md"
                >
                    <FaEllipsisV className="text-gray-600 hover:text-teal-700" />
                </button>
            </div>

            {/* Info Fields */}
            <div className="flex items-center gap-2 text-xs text-gray-600">
                <FaEnvelope className="text-gray-400" /> {user.email}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
                <FaPhone className="text-gray-400" /> {user.phoneNumber || "N/A"}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
                <FaCalendarAlt className="text-gray-400" /> {formatDate(user.createdAt)}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
                <FaFileInvoice className="text-gray-400" />{" "}
                <span onClick={handleDownloadPaymentProof} className="text-teal-700 underline cursor-pointer">
                    View Proof
                </span>
            </div>

            {/* Plan & Status Buttons */}
            <div className="flex gap-2 justify-center mt-4">
                <span className="px-3 py-1 rounded-md text-sm font-medium text-white bg-[#00796b]">
                    {user.subscription?.plan || "No Plan"}
                </span>
                <span className={`px-3 py-1 rounded-md text-xs font-medium ${user.accountStatus === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                        user.accountStatus === 'FROZEN' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                    }`}>
                    {user.accountStatus}
                </span>
            </div>

            {/* Dropdown (rendered via portal) */}
            {openMenu &&
                typeof document !== "undefined" &&
                createPortal(
                    <div
                        ref={dropdownRef}
                        style={{ top: menuPos.top, left: menuPos.left }}
                        className="fixed z-[9999] w-64 bg-white border border-gray-200 rounded-xl shadow-2xl text-sm overflow-hidden"
                    >
                        <ul className="text-gray-700 text-left">
                            {/* Access section */}
                            <li
                                onClick={() => setAccessOpen(!accessOpen)}
                                className="flex items-center justify-between px-4 py-3 hover:bg-gradient-to-r hover:from-teal-50 hover:to-yellow-50 cursor-pointer border-b border-gray-100 transition-all duration-200"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-r from-teal-100 to-yellow-100 rounded-lg">
                                        <FaLock className="text-teal-700 text-sm" />
                                    </div>
                                    <span className="font-semibold text-gray-800">Assign Plan</span>
                                </div>
                                {accessOpen ? (
                                    <FaChevronUp className="text-gray-400 text-xs" />
                                ) : (
                                    <FaChevronDown className="text-gray-400 text-xs" />
                                )}
                            </li>

                            {/* Nested Access Options */}
                            {accessOpen && (
                                <div className="pl-4 pr-4 py-3 space-y-2 border-b border-gray-100 bg-gray-50">
                                    {[
                                        "Starter – SAR 599",
                                        "Professional – SAR 999",
                                        "Premium – SAR 1,875",
                                    ].map((plan, idx) => (
                                        <label
                                            key={idx}
                                            className="flex items-center gap-3 cursor-pointer text-sm text-gray-700 hover:text-teal-700 hover:bg-white p-2 rounded-lg transition-all duration-200"
                                            onClick={() => handleAssignPlan(plan)}
                                        >
                                            <input
                                                type="radio"
                                                name="access"
                                                className="accent-teal-600 w-4 h-4"
                                                checked={selectedPlan === plan}
                                                onChange={() => setSelectedPlan(plan)}
                                            />
                                            <span className="font-medium">{plan}</span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {/* Other menu items */}
                            <li onClick={handleDownloadPaymentProof} className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 cursor-pointer transition-all duration-200">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <FaDownload className="text-blue-600 text-sm" />
                                </div>
                                <span className="font-medium text-gray-800">Download Receipt</span>
                            </li>
                            {user.accountStatus?.toUpperCase() === 'FROZEN' ? (
                                <li onClick={() => setUnfreezeOpen(true)} className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 cursor-pointer transition-all duration-200">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <FaFire className="text-green-600 text-sm" />
                                    </div>
                                    <span className="font-medium text-green-700">Unfreeze Account</span>
                                </li>
                            ) : (
                                <li onClick={() => setFreezeOpen(true)} className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 cursor-pointer transition-all duration-200">
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <FaSnowflake className="text-red-600 text-sm" />
                                    </div>
                                    <span className="font-medium text-red-700">Freeze Account</span>
                                </li>
                            )}
                        </ul>
                    </div>,
                    document.body
                )}
            <FreezeAccountModal
                isOpen={freezeOpen}
                onClose={() => setFreezeOpen(false)}
                onConfirm={handleFreeze}
                userName={user.username}
            />
            <FreezeAccountModal
                isOpen={unfreezeOpen}
                onClose={() => setUnfreezeOpen(false)}
                onConfirm={handleUnfreeze}
                userName={user.username}
            />
        </div>
    );
}
