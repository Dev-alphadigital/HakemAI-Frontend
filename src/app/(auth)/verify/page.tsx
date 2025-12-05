"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function VerifyEmailPage() {
    const router = useRouter();
    const { refreshUser } = useAuth();

    const [code, setCode] = useState(Array(5).fill(""));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const email =
        typeof window !== "undefined"
            ? localStorage.getItem("verifyEmail")
            : null;

    useEffect(() => {
        if (!email) {
            router.push("/verify/success");
        }
    }, [email]);

    const handleChange = (value: string, index: number) => {
        const newCode = [...code];
        newCode[index] = value.slice(-1); // Only 1 digit
        setCode(newCode);

        if (value && index < 4) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const finalCode = code.join("");

        try {
            const res = await fetch(`${API_BASE}/api/auth/verify-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    code: finalCode,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Invalid code");
                setLoading(false);
                return;
            }

            // Optional: refresh logged user
            await refreshUser?.();

            localStorage.removeItem("verifyEmail"); // cleanup

            router.push("/auth/verify/success");
        } catch (err) {
            setError("Something went wrong!");
        }
        setLoading(false);
    };

    const handleResend = async () => {
        setError("");
        try {
            await fetch(`${API_BASE}/api/auth/resend-verification-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

        } catch {
            setError("Failed to resend code. Try again!");
        }
    };

    return (
        <main className="min-h-screen flex flex-col lg:flex-row bg-[#fdfcf8]">
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

            <div className="flex flex-1 flex-col justify-center items-center px-8 md:px-16 py-10 lg:py-0">
                <div className="w-full max-w-lg space-y-8">
                    <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900">
                        Verify Your Account
                    </h2>
                    <div className="text-center text-sm text-gray-400 -mt-4">
                        We sent a 5-digit code to <b>{email}</b>
                    </div>

                    {error && (
                        <p className="text-red-500 text-center font-medium">{error}</p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex justify-center gap-3 mt-4">
                            {code.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={(el) => {
                                        if (el) inputRefs.current[i] = el;
                                    }}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, i)}
                                    type="text"
                                    maxLength={1}
                                    className="w-12 h-12 md:w-14 md:h-14 rounded-lg text-center
                             text-xl font-semibold bg-gradient-to-r 
                             from-[#f9ebbc] to-[#b7d7cf] text-gray-900 border-none
                             focus:ring-2 focus:ring-[#2d8659] shadow-md"
                                />
                            ))}
                        </div>

                        <div className="flex item-center justify-center mt-8">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-72 bg-gradient-to-r from-[#fdc431] to-[#04786b]
                           text-white font-semibold py-3 rounded-md
                           shadow-[0_8px_20px_rgba(0,0,0,0.25)]
                           hover:opacity-95 transition cursor-pointer"
                            >
                                {loading ? "Confirming..." : "Confirm"}
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-sm mt-10 text-gray-700">
                        Didn’t receive it?{" "}
                        <button
                            onClick={handleResend}
                            className="text-[#04786b] font-semibold hover:underline cursor-pointer"
                        >
                            Resend Code
                        </button>
                    </p>
                </div>
            </div>
        </main>
    );
}
