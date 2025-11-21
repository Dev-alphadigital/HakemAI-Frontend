// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { ArrowLeft } from "lucide-react";

// export default function ChangePasswordPage() {
//     const router = useRouter();
//     const [showOld, setShowOld] = useState(false);
//     const [showNew, setShowNew] = useState(false);
//     const [showConfirm, setShowConfirm] = useState(false);
//     const [form, setForm] = useState({
//         oldPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//     });

//     return (
//         <div className="flex flex-col items-center min-h-screen bg-[#fffdf8] px-6 py-4 relative">
//             {/* Back button + header */}
//             <div className="relative w-full max-w-md flex items-center justify-center mb-8">
//                 <button
//                     onClick={() => router.back()}
//                     className="absolute left-0 p-2 rounded-full hover:bg-gray-100 transition"
//                 >
//                     <ArrowLeft className="w-5 h-5 text-gray-700" />
//                 </button>
//                 <p className="text-center text-xl font-bold text-gray-800">
//                     Change Password
//                 </p>
//             </div>

//             {/* Subtitle */}
//             <p className="w-full max-w-sm text-gray-700 text-lg font-medium mb-4">
//                 Choose a New Password
//             </p>

//             <div className="w-full max-w-sm space-y-4">
//                 {/* Old Password */}
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Old Password
//                     </label>
//                     <div className="relative rounded-lg p-[1px] bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C]">
//                         <div className="flex items-center bg-white rounded-lg px-3 py-2">
//                             <input
//                                 placeholder="*********"
//                                 type={showOld ? "text" : "password"}
//                                 value={form.oldPassword}
//                                 onChange={(e) =>
//                                     setForm({ ...form, oldPassword: e.target.value })
//                                 }
//                                 className="flex-1 outline-none text-gray-800 placeholder-gray-400 bg-transparent"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowOld(!showOld)}
//                                 className="ml-2 text-gray-500"
//                             >
//                                 {showOld ? <FaEyeSlash /> : <FaEye />}
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* New Password */}
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                         New Password
//                     </label>
//                     <div className="relative rounded-lg p-[1px] bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C]">
//                         <div className="flex items-center bg-white rounded-lg px-3 py-2">
//                             <input
//                                 placeholder="*********"
//                                 type={showNew ? "text" : "password"}
//                                 value={form.newPassword}
//                                 onChange={(e) =>
//                                     setForm({ ...form, newPassword: e.target.value })
//                                 }
//                                 className="flex-1 outline-none text-gray-800 placeholder-gray-400 bg-transparent"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowNew(!showNew)}
//                                 className="ml-2 text-gray-500"
//                             >
//                                 {showNew ? <FaEyeSlash /> : <FaEye />}
//                             </button>
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

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

export default function ChangePasswordPage() {
    const router = useRouter();
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);

    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setError("");
        setSuccess("");

        if (form.oldPassword.trim() === "" || form.newPassword.trim() === "") {
            setError("All fields are required");
            return;
        }

        if (form.oldPassword === form.newPassword) {
            setError("New password must be different from old password");
            return;
        }

        setLoading(true);

        try {
            const token =
                typeof window !== "undefined"
                    ? localStorage.getItem("accessToken")
                    : null;

            if (!token) {
                setError("Session expired. Please login again.");
                router.push("/login");
                return;
            }

            const res = await fetch(
                "http://localhost:5000/api/auth/change-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        currentPassword: form.oldPassword,
                        newPassword: form.newPassword,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setLoading(false);
                setError(data?.message || "Password change failed");
                return;
            }

            setSuccess("Password changed successfully!");

            setTimeout(() => {
                router.push("/dashboard/profile");
            }, 1200);
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Try again.");
        }

        setLoading(false);
    };

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

            {/* Error + Success */}
            {error && (
                <p className="text-red-500 text-sm font-medium mb-2">{error}</p>
            )}
            {success && (
                <p className="text-green-600 text-sm font-medium mb-2">
                    {success}
                </p>
            )}

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
                                name="oldPassword"
                                value={form.oldPassword}
                                onChange={handleChange}
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
                                name="newPassword"
                                value={form.newPassword}
                                onChange={handleChange}
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

                {/* Save Button */}
                <button
                    onClick={handleSubmit}
                    type="button"
                    disabled={loading}
                    className="w-full py-3 mt-4 font-semibold text-white rounded-lg bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C] transition-transform hover:scale-[1.02]"
                >
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}
