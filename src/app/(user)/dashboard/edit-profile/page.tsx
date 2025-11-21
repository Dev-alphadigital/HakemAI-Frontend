// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FaUser, FaEnvelope, FaPhone, FaPen } from "react-icons/fa";
// import { ArrowLeft } from "lucide-react";

// export default function EditProfilePage() {
//     const router = useRouter();
//     const [form, setForm] = useState({
//         username: "james.smith",
//         email: "james.smith@mail.com",
//         phone: "+1 123 123 1234",
//     });

//     return (
//         <div className="flex flex-col items-center min-h-screen bg-[#fffdf8] px-6 py-4 relative">
//             {/* Back button and header */}
//             <div className="relative w-full max-w-md flex items-center justify-center mb-4">
//                 <button
//                     onClick={() => router.back()}
//                     className="absolute left-0 p-2 rounded-full hover:bg-gray-100 transition"
//                 >
//                     <ArrowLeft className="w-5 h-5 text-gray-700" />
//                 </button>
//                 <p className="text-center text-xl font-bold">Edit Profile</p>
//             </div>

//             {/* Profile avatar */}
//             <div className="relative mb-6">
//                 <img
//                     src="/images/profile.png"
//                     alt="Profile"
//                     className="w-24 h-24"
//                 />
//                 <div className="absolute bottom-1 right-1 bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C] p-[6px] rounded-full shadow cursor-pointer">
//                     <FaPen className="text-white text-xs" />
//                 </div>
//             </div>

//             {/* Form fields */}
//             <div className="w-full max-w-sm space-y-4">
//                 {/* Username */}
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Username
//                     </label>
//                     <div className="relative rounded-lg p-[1px] bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C]">
//                         <div className="flex items-center bg-white rounded-lg px-3 py-2">
//                             <FaUser className="text-[#1B7F5C] mr-3" />

//                             {/* Separator line */}
//                             <div className="h-5 w-[1px] bg-gradient-to-b from-[#FFD54F] to-[#1B7F5C] mr-3" />

//                             <input
//                                 type="text"
//                                 value={form.username}
//                                 onChange={(e) => setForm({ ...form, username: e.target.value })}
//                                 className="flex-1 outline-none text-gray-800 placeholder-gray-400 bg-transparent"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Email */}
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Email
//                     </label>
//                     <div className="relative rounded-lg p-[1px] bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C]">
//                         <div className="flex items-center bg-white rounded-lg px-3 py-2">
//                             <FaEnvelope className="text-[#1B7F5C] mr-3" />

//                             {/* Separator line */}
//                             <div className="h-5 w-[1px] bg-gradient-to-b from-[#FFD54F] to-[#1B7F5C] mr-3" />

//                             <input
//                                 type="email"
//                                 value={form.email}
//                                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                                 className="flex-1 outline-none text-gray-800 placeholder-gray-400 bg-transparent"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Phone */}
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Phone Number
//                     </label>
//                     <div className="relative rounded-lg p-[1px] bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C]">
//                         <div className="flex items-center bg-white rounded-lg px-3 py-2">
//                             <FaPhone className="text-[#1B7F5C] mr-3" />

//                             {/* Separator line */}
//                             <div className="h-5 w-[1px] bg-gradient-to-b from-[#FFD54F] to-[#1B7F5C] mr-3" />

//                             <input
//                                 type="text"
//                                 value={form.phone}
//                                 onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                                 className="flex-1 outline-none text-gray-800 placeholder-gray-400 bg-transparent"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Save Button */}
//                 <button
//                     type="button"
//                     className="w-full py-3 mt-4 font-semibold text-white rounded-lg bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C] transition-transform hover:scale-[1.02]"
//                 >
//                     Save
//                 </button>
//             </div>
//         </div>
//     );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaPhone, FaPen } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

export default function EditProfilePage() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        username: "",
        email: "",
        phone: "",
    });

    const [error, setError] = useState("");

    // Fetch user profile on mount
    useEffect(() => {
        async function fetchProfile() {
            const token = localStorage.getItem("accessToken");

            // If no token → redirect to login
            if (!token) {
                router.push("/login");
                return;
            }

            try {
                const res = await fetch("http://localhost:5000/api/auth/profile", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();

                if (!res.ok) {
                    // Token expired / invalid → redirect to login
                    if (res.status === 401) {
                        router.push("/login");
                        return;
                    }

                    setError(data?.message || "Failed to load profile");
                    return;
                }

                // Populate UI with real backend data
                setForm({
                    username: data.username || "",
                    email: data.email || "",
                    phone: data.phone || data.phoneNumber || "",
                });

            } catch (err) {
                setError("Something went wrong");
            }

            setLoading(false);
        }

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#fffdf8]">
                <p className="text-gray-600 font-semibold">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#fffdf8] px-6 py-4 relative">
            {/* Back button and header */}
            <div className="relative w-full max-w-md flex items-center justify-center mb-4">
                <button
                    onClick={() => router.back()}
                    className="absolute left-0 p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <p className="text-center text-xl font-bold">Edit Profile</p>
            </div>

            {/* Profile avatar */}
            <div className="relative mb-6">
                <img
                    src="/images/profile.png"
                    alt="Profile"
                    className="w-24 h-24"
                />
                <div className="absolute bottom-1 right-1 bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C] p-[6px] rounded-full shadow cursor-pointer">
                    <FaPen className="text-white text-xs" />
                </div>
            </div>

            {/* Form fields */}
            <div className="w-full max-w-sm space-y-4">

                {error && (
                    <p className="text-red-500 text-center font-medium">{error}</p>
                )}

                {/* Username */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                    </label>
                    <div className="relative rounded-lg p-[1px] bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C]">
                        <div className="flex items-center bg-white rounded-lg px-3 py-2">
                            <FaUser className="text-[#1B7F5C] mr-3" />

                            <div className="h-5 w-[1px] bg-gradient-to-b from-[#FFD54F] to-[#1B7F5C] mr-3" />

                            <input
                                type="text"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                className="flex-1 outline-none text-gray-800 placeholder-gray-400 bg-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <div className="relative rounded-lg p-[1px] bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C]">
                        <div className="flex items-center bg-white rounded-lg px-3 py-2">
                            <FaEnvelope className="text-[#1B7F5C] mr-3" />

                            <div className="h-5 w-[1px] bg-gradient-to-b from-[#FFD54F] to-[#1B7F5C] mr-3" />

                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="flex-1 outline-none text-gray-800 placeholder-gray-400 bg-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                    </label>
                    <div className="relative rounded-lg p-[1px] bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C]">
                        <div className="flex items-center bg-white rounded-lg px-3 py-2">
                            <FaPhone className="text-[#1B7F5C] mr-3" />

                            <div className="h-5 w-[1px] bg-gradient-to-b from-[#FFD54F] to-[#1B7F5C] mr-3" />

                            <input
                                type="text"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                className="flex-1 outline-none text-gray-800 placeholder-gray-400 bg-transparent"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}