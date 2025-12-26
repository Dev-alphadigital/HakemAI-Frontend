"use client";

import { ArrowLeft, CreditCard, Lock, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import DeleteAccountModal from "@/components/DeleteAccountModal";

export default function ProfilePage() {
    const router = useRouter();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

    const handleDelete = async () => {
        setIsDeleteModalOpen(false);

        try {
            const password = prompt("Please enter your password to confirm deletion:");

            if (!password || password.trim() === "") {
                alert("Password is required to delete your account.");
                return;
            }

            const token =
                typeof window !== "undefined"
                    ? localStorage.getItem("accessToken")
                    : null;

            if (!token) {
                alert("Session expired. Please login again.");
                router.push("/login");
                return;
            }

            const res = await fetch(`${API_BASE}/api/auth/delete-accoun`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    password: password,
                    reason: "other",
                    feedback: "",
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                alert(data?.message || "Failed to delete account");
                return;
            }

            // CLEAR ALL USER DATA
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");

            alert("Your account has been deleted successfully.");

            router.push("/signup"); // or home page
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Try again.");
        }
    };


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token =
                    typeof window !== "undefined"
                        ? localStorage.getItem("accessToken")
                        : null;

                if (!token) {
                    router.push("/login");
                    return;
                }

                const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
                const res = await fetch(
                    `${API_BASE}/api/auth/profile`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    console.log("Profile fetch error:", data);
                    router.push("/login");
                    return;
                }

                setProfile(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching profile:", err);
                router.push("/login");
            }
        };

        fetchProfile();
    }, [router]);

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600 text-lg">Loading profile...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white text-gray-900 flex flex-col items-center p-6">
            {/* Back Button */}
            <div className="relative w-full max-w-md flex items-center justify-center mb-4">
                <button
                    onClick={() => router.back()}
                    className="absolute left-0 p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <p className="text-center text-xl font-bold">My Profile</p>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col items-center text-center mb-6">
                <Image
                    src="/images/profile.png"
                    alt="Profile"
                    width={90}
                    height={90}
                    className="rounded-full mb-3 h-30 w-30"
                />

                {/* REAL USERNAME + EMAIL */}
                <h2 className="text-xl font-semibold">{profile?.username}</h2>
                <p className="text-gray-500 text-sm">{profile?.email}</p>

                <button
                    className="mt-3 px-5 py-2 bg-gradient-to-r from-[#fdc431] to-[#04786b] text-white rounded-full text-sm font-semibold hover:opacity-90 transition"
                    onClick={() => router.push("/dashboard/edit-profile")}
                >
                    Edit Profile
                </button>
            </div>

            {/* Options List */}
            <div className="w-full max-w-md space-y-3">
                {/* <ProfileOption
                    icon={<CreditCard className="w-5 h-5 text-[#04786b]" />}
                    label="Payment Details"
                    onClick={() => router.push("/dashboard/payment-details")}
                /> */}
                <ProfileOption
                    icon={<Lock className="w-5 h-5 text-[#04786b]" />}
                    label="Change Password"
                    onClick={() => router.push("/dashboard/change-password")}
                />
                <ProfileOption
                    icon={<Trash2 className="w-5 h-5 text-[#04786b]" />}
                    label="Delete Account"
                    onClick={() => setIsDeleteModalOpen(true)}
                />
            </div>

            {/* Delete Account Modal */}
            <DeleteAccountModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDelete}
            />
        </main>
    );
}

function ProfileOption({
    icon,
    label,
    onClick,
}: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:bg-gray-50 transition cursor-pointer"
        >
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[#e8f1ed]">{icon}</div>
                <span className="text-gray-800 font-medium">{label}</span>
            </div>
            <span className="text-gray-400 text-lg">›</span>
        </div>
    );
}
