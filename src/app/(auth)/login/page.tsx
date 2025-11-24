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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setLoading(false);
                setError(data?.message || "Invalid login credentials");
                return;
            }

            // Save tokens + user
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("user", JSON.stringify(data.user));

            document.cookie = `user=${encodeURIComponent(JSON.stringify(data.user))}; path=/; max-age=604800`;
            document.cookie = `accessToken=${data.accessToken}; path=/; max-age=604800`;


            await refreshUser();

            // Check if the user is paid or unpaid and redirect accordingly
            if (data.user.accountStatus === "pending") {
                router.push("/plans-pricing");
            } else {
                router.push("/dashboard");
            }

        } catch (err) {
            setError("Something went wrong. Try again.");
        }

        setLoading(false);
    };

    return (
        <main className="min-h-screen flex flex-col lg:flex-row bg-[#fdfcf8]">
            {/* ===== LEFT SIDE ===== */}
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

                    <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900">
                        Welcome Back!
                    </h2>

                    {/* ❌ Error message */}
                    {error && (
                        <p className="text-red-500 text-center font-medium">{error}</p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div className="p-[1px] rounded-lg bg-gradient-to-r from-[#fdc431] via-[#d7b84c] to-[#04786b]">
                            <div className="rounded-md bg-gradient-to-r from-[#f7ecc0] to-[#c1dbd3]">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-md bg-transparent text-gray-800 placeholder-gray-500 font-semibold focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="relative p-[1px] rounded-lg bg-gradient-to-r from-[#fdc431] via-[#d7b84c] to-[#04786b]">
                            <div className="rounded-md bg-gradient-to-r from-[#f7ecc0] to-[#c1dbd3] relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-[#fdc431] to-[#04786b] text-white font-semibold py-3 rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:opacity-95 transition cursor-pointer"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-700">
                        Don't have an account yet?{" "}
                        <Link href="/signup"
                            className="text-[#04786b] font-semibold hover:underline"
                        >
                            Signup here
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}