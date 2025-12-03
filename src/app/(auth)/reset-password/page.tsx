// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// export default function SignupPage() {
//     const router = useRouter();
//     const [showPassword, setShowPassword] = useState(false);
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });

//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

//     return (
//         <main className="min-h-screen flex flex-col lg:flex-row bg-[#fdfcf8] relative">

//             {/* ⭐ BACK BUTTON (Icon Only, Top-Left) */}
//             <button
//                 type="button"
//                 onClick={() => router.push("/")}
//                 className="absolute top-6 left-6 z-50 cursor-pointer opacity-80 hover:opacity-100 transition"
//             >
//                 <Image
//                     src="/icons/home.png"
//                     alt="Back"
//                     width={44}
//                     height={44}
//                     className="object-contain"
//                 />
//             </button>

//             {/* ===== LEFT SIDE (Desktop only) ===== */}
//             <div className="hidden lg:flex w-7/15 items-center justify-center relative">
//                 <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[75%] w-[1px] bg-gray-300"></div>

//                 <div className="flex flex-col items-center space-y-4">
//                     <Image
//                         src="/logo/logo.svg"
//                         alt="Hakem AI Logo"
//                         width={150}
//                         height={150}
//                         className="object-contain rounded-full"
//                         priority
//                     />
//                     <h1 className="text-lg font-semibold text-gray-800 tracking-wide">
//                         HAKEM.AI
//                     </h1>
//                 </div>
//             </div>

//             {/* ===== RIGHT SIDE ===== */}
//             <div className="flex flex-1 flex-col justify-center items-center px-8 md:px-16 py-10 lg:py-0">
//                 <div className="w-full max-w-lg space-y-8">

//                     {/* Mobile Logo */}
//                     <div className="flex justify-center lg:hidden mb-4">
//                         <div className="w-24 h-24 flex items-center justify-center">
//                             <Image
//                                 src="/logo/logo.svg"
//                                 alt="Hakem AI Logo"
//                                 width={150}
//                                 height={150}
//                                 className="object-contain rounded-full"
//                                 priority
//                             />
//                         </div>
//                     </div>

//                     {/* ===== HEADING ===== */}
//                     <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900">
//                         Forgot Password
//                     </h2>

//                     {/* Error */}
//                     {error && (
//                         <p className="text-red-500 text-center font-medium">{error}</p>
//                     )}

//                     {/* Email */}
//                     <div className="p-[1px] rounded-lg bg-gradient-to-r from-[#fdc431] via-[#d7b84c] to-[#04786b]">
//                         <div className="rounded-md bg-gradient-to-r from-[#f7ecc0] to-[#c1dbd3]">
//                             <input
//                                 type="email"
//                                 name="email"
//                                 placeholder="Email"
//                                 // value={formData.email}
//                                 required
//                                 className="w-full px-4 py-3 rounded-md bg-transparent text-gray-800 placeholder-gray-500 font-semibold focus:outline-none"
//                             />
//                         </div>
//                     </div>

//                     {/* Submit */}
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-gradient-to-r from-[#fdc431] to-[#04786b] text-white font-semibold py-3 rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:opacity-95 transition cursor-pointer"
//                     >
//                         {loading ? "Sending reset link..." : "Send reset link"}
//                     </button>
//                 </div>
//             </div>
//         </main>
//     );
// }

"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!email) {
            setError("Please enter your email");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            // Always show success message for security reasons
            setMessage("If the email exists, you will receive a reset link shortly.");

            setEmail("");

        } catch (err) {
            console.error(err);
            setError("Something went wrong! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex flex-col lg:flex-row bg-[#fdfcf8] relative">

            {/* BACK BUTTON */}
            <button
                type="button"
                onClick={() => router.push("/")}
                className="absolute top-6 left-6 z-50 cursor-pointer opacity-80 hover:opacity-100 transition"
            >
                <Image
                    src="/icons/home.png"
                    alt="Back"
                    width={44}
                    height={44}
                    className="object-contain"
                />
            </button>

            {/* LEFT SECTION */}
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

            {/* RIGHT SECTION */}
            <div className="flex flex-1 flex-col justify-center items-center px-8 md:px-16 py-10 lg:py-0">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-lg space-y-8"
                >
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
                        Forgot Password
                    </h2>

                    {error && <p className="text-red-500 text-center font-medium">{error}</p>}
                    {message && <p className="text-green-600 text-center font-medium">{message}</p>}

                    {/* EMAIL INPUT */}
                    <div className="p-[1px] rounded-lg bg-gradient-to-r from-[#fdc431] via-[#d7b84c] to-[#04786b]">
                        <div className="rounded-md bg-gradient-to-r from-[#f7ecc0] to-[#c1dbd3]">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-md bg-transparent text-gray-800 placeholder-gray-500 font-semibold focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-gradient-to-r from-[#fdc431] to-[#04786b] text-white font-semibold py-3 rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition cursor-pointer
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-95"}
            `}
                    >
                        {loading ? "Sending reset link..." : "Send reset link"}
                    </button>
                </form>
            </div>
        </main>
    );
}