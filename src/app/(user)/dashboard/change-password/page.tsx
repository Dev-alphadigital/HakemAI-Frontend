"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

export default function ChangePasswordPage() {
    const router = useRouter();
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#fffdf8] px-6 py-4 relative">
            {/* Back button + header */}
            <div className="relative w-full max-w-md flex items-center justify-center mb-8">
                <button
                    onClick={() => router.back()}
                    className="absolute left-0 p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <p className="text-center text-xl font-bold text-gray-800">
                    Change Password
                </p>
            </div>

            {/* Subtitle */}
            <p className="w-full max-w-sm text-gray-700 text-lg font-medium mb-4">
                Choose a New Password
            </p>

            <div className="w-full max-w-sm space-y-4">
                {/* Old Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Old Password
                    </label>
                    <div className="relative rounded-lg p-[1px] bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C]">
                        <div className="flex items-center bg-white rounded-lg px-3 py-2">
                            <input
                                placeholder="*********"
                                type={showOld ? "text" : "password"}
                                value={form.oldPassword}
                                onChange={(e) =>
                                    setForm({ ...form, oldPassword: e.target.value })
                                }
                                className="flex-1 outline-none text-gray-800 placeholder-gray-400 bg-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => setShowOld(!showOld)}
                                className="ml-2 text-gray-500"
                            >
                                {showOld ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* New Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                    </label>
                    <div className="relative rounded-lg p-[1px] bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C]">
                        <div className="flex items-center bg-white rounded-lg px-3 py-2">
                            <input
                                placeholder="*********"
                                type={showNew ? "text" : "password"}
                                value={form.newPassword}
                                onChange={(e) =>
                                    setForm({ ...form, newPassword: e.target.value })
                                }
                                className="flex-1 outline-none text-gray-800 placeholder-gray-400 bg-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                className="ml-2 text-gray-500"
                            >
                                {showNew ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                    </label>
                    <div className="relative rounded-lg p-[1px] bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C]">
                        <div className="flex items-center bg-white rounded-lg px-3 py-2">
                            <input
                                placeholder="*********"
                                type={showConfirm ? "text" : "password"}
                                value={form.confirmPassword}
                                onChange={(e) =>
                                    setForm({ ...form, confirmPassword: e.target.value })
                                }
                                className="flex-1 outline-none text-gray-800 placeholder-gray-400 bg-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="ml-2 text-gray-500"
                            >
                                {showConfirm ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <button
                    type="button"
                    className="w-full py-3 mt-4 font-semibold text-white rounded-lg bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C] transition-transform hover:scale-[1.02]"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
