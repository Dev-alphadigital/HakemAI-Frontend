"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Signup Data:", formData);
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
                            className="w-full bg-gradient-to-r from-[#fdc431] to-[#04786b] text-white font-semibold py-3 rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:opacity-95 transition cursor-pointer"
                        >
                            Admin Login
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}