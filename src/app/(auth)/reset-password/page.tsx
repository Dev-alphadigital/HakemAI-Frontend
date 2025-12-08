"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function SignupPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    /** ADD THIS ABOVE return() **/
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!token) {
            setError("Reset link is invalid or missing token.");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_BASE}/api/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token,
                    newPassword,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Reset failed. Try again.");
                setLoading(false);
                return;
            }

            // Success 🎉
            alert("Password reset successful! Please log in.");
            router.replace("/login");

        } catch (err) {
            console.error(err);
            setError("Something went wrong.");
        }

        setLoading(false);
    };

    return (
        <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
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
                            Reset Password
                        </h2>

                        {/* Error */}
                        {error && (
                            <p className="text-red-500 text-center font-medium">{error}</p>
                        )}

                        {/* ===== FORM ===== */}
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {/* New Password */}
                            <div className="relative p-[1px] rounded-lg bg-gradient-to-r from-[#fdc431] via-[#d7b84c] to-[#04786b]">
                                <div className="rounded-md bg-gradient-to-r from-[#f7ecc0] to-[#c1dbd3] relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 rounded-md bg-transparent text-gray-800 placeholder-gray-500 font-semibold focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="w-5 h-5" />
                                        ) : (
                                            <FaEye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm New Password */}
                            <div className="relative p-[1px] rounded-lg bg-gradient-to-r from-[#fdc431] via-[#d7b84c] to-[#04786b]">
                                <div className="rounded-md bg-gradient-to-r from-[#f7ecc0] to-[#c1dbd3] relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 rounded-md bg-transparent text-gray-800 placeholder-gray-500 font-semibold focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="w-5 h-5" />
                                        ) : (
                                            <FaEye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-[#fdc431] to-[#04786b] text-white font-semibold py-3 rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:opacity-95 transition cursor-pointer"
                            >
                                {loading ? "Loading..." : "Reset Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </Suspense>
    );
}