"use client";

import { useState, useRef, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import {
    FaLock,
    FaDownload,
    FaSnowflake,
    FaChevronDown,
    FaChevronUp,
    FaFire,
} from "react-icons/fa6";
import FreezeAccountModal from "./FreezeAccountModal";
import { useRouter } from "next/navigation";
import { 
    User, 
    assignPlan, 
    freezeAccount, 
    unfreezeAccount, 
    downloadPaymentProof,
    SubscriptionPlan,
    getPaymentProofUrl
} from "@/app/lib/adminApi";

interface DashboardTableProps {
    users: User[];
    onRefresh: () => void;
}

export default function DashboardTable({ users, onRefresh }: DashboardTableProps) {
    const router = useRouter();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [accessOpen, setAccessOpen] = useState(false);
    const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [freezeOpen, setFreezeOpen] = useState(false);
    const [unfreezeOpen, setUnfreezeOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string>("");

    // Helper to safely get user ID
    const getUserId = (user: User): string => {
        return user._id || (user as any).id || '';
    };

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

    const handleAssignPlan = async (userId: string, plan: string) => {
        if (!plan || plan === "No access" || !userId) {
            console.error("Missing userId or plan", { userId, plan });
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
            
            console.log("Assigning plan:", { userId, planEnum });
            const result = await assignPlan(userId, planEnum);
            console.log("Plan assigned successfully:", result);
            
            // Close dropdown and refresh
            setOpenIndex(null);
            setAccessOpen(false);
            
            // Refresh data to show updated plan
            console.log("Refreshing user data...");
            await onRefresh();
            console.log("User data refreshed");
        } catch (err: any) {
            console.error("Error assigning plan:", err);
            alert(err?.message || "Failed to assign plan");
        } finally {
            setLoading(false);
        }
    };

    const handleFreeze = async () => {
        if (!selectedUser) return;
        
        const userId = getUserId(selectedUser);
        if (!userId) {
            alert("Error: User ID is missing");
            return;
        }
        
        try {
            setLoading(true);
            await freezeAccount(userId);
            setFreezeOpen(false);
            setOpenIndex(null);
            
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
        if (!selectedUser) return;
        
        const userId = getUserId(selectedUser);
        if (!userId) {
            alert("Error: User ID is missing");
            return;
        }
        
        try {
            setLoading(true);
            await unfreezeAccount(userId);
            setUnfreezeOpen(false);
            setOpenIndex(null);
            
            // Refresh to show updated status
            await onRefresh();
        } catch (err: any) {
            console.error("Error unfreezing account:", err);
            alert(err?.message || "Failed to unfreeze account");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPaymentProof = async (userId: string) => {
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
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto border border-gray-100">
            <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-200 text-gray-600 font-medium">
                    <tr>
                        <th className="p-3">User name</th>
                        <th className="p-3">Phone number</th>
                        <th className="p-3">Invoice</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Date joined</th>
                        <th className="p-3 text-right"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {users.map((user, i) => {
                        const userId = getUserId(user);
                        return (
                        <tr key={userId || i} className="hover:bg-gray-100">
                            <td className="p-3">
                                <div className="flex flex-col">
                                    <span className="font-semibold">{user.username}</span>
                                    <span className="text-gray-500 text-xs">{user.email}</span>
                                </div>
                            </td>
                            <td className="p-3">{user.phoneNumber || "N/A"}</td>
                            <td className="p-3 text-teal-700 underline cursor-pointer" onClick={() => handleDownloadPaymentProof(userId)}>
                                View Proof
                            </td>
                            <td className="p-3">
                                <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${
                                    user.accountStatus?.toUpperCase() === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                                    user.accountStatus?.toUpperCase() === 'FROZEN' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {user.accountStatus}
                                </span>
                            </td>
                            <td className="p-3">{formatDate(user.createdAt)}</td>
                            <td className="p-3 text-right relative">
                                <button
                                    ref={(el) => {
                                        buttonRefs.current[i] = el;
                                    }}
                                    onClick={() => {
                                        setAccessOpen(false);
                                        setOpenIndex(openIndex === i ? null : i);
                                        setSelectedUser(user);
                                    }}
                                    className="p-2.5 rounded-full cursor-pointer hover:bg-gradient-to-r hover:from-teal-50 hover:to-yellow-50 transition-all duration-200 hover:shadow-md"
                                >
                                    <FaEllipsisV className="text-gray-600 hover:text-teal-700" />
                                </button>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Fixed dropdown */}
            {openIndex !== null && (
                <div
                    style={{ top: dropdownPos.top, left: dropdownPos.left }}
                    className="fixed z-50 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl text-sm overflow-hidden"
                >
                    <ul className="text-gray-700 text-left">
                        {/* Access item */}
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

                        {/* Nested access levels */}
                        {accessOpen && (
                            <div className="pl-4 pr-4 py-3 space-y-2 border-b border-gray-100 bg-gray-50">
                                {[
                                    "No access",
                                    "Starter – SAR 599",
                                    "Professional – SAR 999",
                                    "Premium – SAR 1,875",
                                ].map((plan, idx) => (
                                    <label
                                        key={idx}
                                        className="flex items-center gap-3 cursor-pointer text-sm text-gray-700 hover:text-teal-700 hover:bg-white p-2 rounded-lg transition-all duration-200"
                                        onClick={() => {
                                            if (openIndex !== null && users[openIndex]) {
                                                const userId = getUserId(users[openIndex]);
                                                console.log("Assigning plan - userId:", userId, "plan:", plan);
                                                if (userId) {
                                                    handleAssignPlan(userId, plan);
                                                } else {
                                                    alert("Error: Cannot find user ID");
                                                }
                                            }
                                        }}
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

                        {/* Other actions */}
                        <li onClick={() => {
                            if (openIndex !== null && users[openIndex]) {
                                const userId = getUserId(users[openIndex]);
                                if (userId) {
                                    handleDownloadPaymentProof(userId);
                                }
                            }
                        }} className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 cursor-pointer transition-all duration-200">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <FaDownload className="text-blue-600 text-sm" />
                            </div>
                            <span className="font-medium text-gray-800">Download Receipt</span>
                        </li>
                        {selectedUser?.accountStatus?.toUpperCase() === 'FROZEN' ? (
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
                </div>
            )}
            <FreezeAccountModal
                isOpen={freezeOpen}
                onClose={() => setFreezeOpen(false)}
                onConfirm={handleFreeze}
                userName={selectedUser?.username}
            />
            <FreezeAccountModal
                isOpen={unfreezeOpen}
                onClose={() => setUnfreezeOpen(false)}
                onConfirm={handleUnfreeze}
                userName={selectedUser?.username}
            />
        </div>
    );
}
