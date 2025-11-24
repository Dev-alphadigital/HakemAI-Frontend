"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { adminLogin, saveAdminToken } from "@/app/lib/adminApi";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function SignupPage() {
    const router = useRouter();
    const { setAdmin } = useAdminAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error on input change
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await adminLogin(formData);

            // Validate response structure
            if (!response || !response.accessToken || !response.admin) {
                throw new Error("Invalid response from server");
            }

            // Map backend response to frontend format
            const adminUser = {
                _id: response.admin.id,
                username: response.admin.username,
                email: response.admin.email,
                role: response.admin.role,
            };

            saveAdminToken(response.accessToken);
            setAdmin(adminUser);
            router.push("/admin/dashboard");
        } catch (err: any) {
            console.error("Login error:", err);

            // Better error message handling
            let errorMessage = "Login failed. Please check your credentials.";

            if (err?.message) {
                errorMessage = err.message;
            } else if (err?.error) {
                errorMessage = err.error;
            } else if (typeof err === 'string') {
                errorMessage = err;
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex flex-col lg:flex-row bg-[#fdfcf8]">
            {/* ===== LEFT SIDE ===== */}
            <div className="hidden lg:flex w-7/15 items-center justify-center relative">
                {/* Divider */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[75%] w-[1px] bg-gray-300"></div>

                {/* Logo Section */}
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
                    {/* Mobile avatar */}
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
                        Admin Access Portal
                    </h2>

                    <div className="text-center text-gray-500 text-sm">Sign in to manage users, monitor activities and control AI system settings</div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                            {error}
                        </div>
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
                                    onClick={() => setShowPassword(!showPassword)} // 👈 toggles icon + type
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
                            className="w-full bg-gradient-to-r from-[#fdc431] to-[#04786b] text-white font-semibold py-3 rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:opacity-95 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Logging in..." : "Admin Login"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}