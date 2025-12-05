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

                    <div className="flex item-center justify-center">
                        <Image
                            src="/icons/Verified.svg"
                            alt="Account Verfied"
                            width={100}
                            height={100}
                        />
                    </div>

                    {/* ===== HEADING ===== */}
                    <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900">
                        Account Verified
                    </h2>

                    <div className="text-center text-sm text-gray-400 -mt-4">You can now access the dashboard</div>

                    {/* Error */}
                    {error && (
                        <p className="text-red-500 text-center font-medium">{error}</p>
                    )}

                    {/* Submit */}
                    <div className="flex item-center justify-center mt-8">
                        <button
                            type="submit"
                            onClick={() => router.push("/login")}
                            disabled={loading}
                            className="w-72 bg-gradient-to-r from-[#fdc431] to-[#04786b] text-white font-semibold py-3 rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:opacity-95 transition cursor-pointer"
                        >
                            {loading ? "Redirecting..." : "Go to Login"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}