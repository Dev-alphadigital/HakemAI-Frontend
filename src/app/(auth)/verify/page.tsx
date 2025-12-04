"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
    const router = useRouter();
    const { refreshUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

    return (
        <main className="min-h-screen flex flex-col lg:flex-row bg-[#fdfcf8] relative">

            {/* ===== LEFT SIDE (Desktop only) ===== */}
            <div className="hidden lg:flex w-7/15 items-center justify-center relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[75%] w-[1px] bg-gray-300"></div>

                <div className="flex flex-col items-center space-y-4">
                    <Image
                        src="/logo/logo.svg"
                        alt="Hakem AI Logo"
                        width={150}
                        height={150}
                        className="object-contain rounded-full"
                        priority
                    />
                    <h1 className="text-lg font-semibold text-gray-800 tracking-wide">
                        HAKEM.AI
                    </h1>
                </div>
            </div>

            {/* ===== RIGHT SIDE ===== */}
            <div className="flex flex-1 flex-col justify-center items-center px-8 md:px-16 py-10 lg:py-0">
                <div className="w-full max-w-lg space-y-8">

                    {/* Mobile Logo */}
                    <div className="flex justify-center lg:hidden mb-4">
                        <div className="w-24 h-24 flex items-center justify-center">
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

                    {/* ===== HEADING ===== */}
                    <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900">
                        Verify Your Account
                    </h2>

                    <div className="text-center text-sm text-gray-400 -mt-4">Insert 5 digits code that we sent on your email</div>

                    {/* Error */}
                    {error && (
                        <p className="text-red-500 text-center font-medium">{error}</p>
                    )}

                    {/* ===== FORM ===== */}
                    <form className="space-y-4">
                        {/* OTP Code Inputs */}
                        <div className="flex justify-center gap-3 mt-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    maxLength={1}
                                    className="
                w-12 h-12 md:w-14 md:h-14
                rounded-lg text-center text-xl font-semibold
                bg-gradient-to-r from-[#f9ebbc] to-[#b7d7cf]
                text-gray-900 border-none outline-none
                focus:ring-2 focus:ring-[#2d8659]
                shadow-md
            "
                                    onChange={(e) => {
                                        const value = e.target.value.slice(-1);
                                        if (value && i < 4) {
                                            const next = document.getElementById(`otp-${i + 1}`);
                                            next && next.focus();
                                        }
                                    }}
                                    id={`otp-${i}`}
                                />
                            ))}
                        </div>

                        {/* Submit */}
                        <div className="flex item-center justify-center mt-8">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-72 bg-gradient-to-r from-[#fdc431] to-[#04786b] text-white font-semibold py-3 rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:opacity-95 transition cursor-pointer"
                            >
                                {loading ? "Confirming..." : "Confirm"}
                            </button>
                        </div>
                    </form>

                    {/* Forgot password Link */}
                    <p className="text-center text-sm mt-10 text-gray-700">
                        <Link href="/forgot-password"
                            className="text-[#04786b] font-semibold hover:underline"
                        >
                            Resend Code
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
