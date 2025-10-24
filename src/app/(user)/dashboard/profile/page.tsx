"use client";
import { ArrowLeft, CreditCard, Lock, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
    const router = useRouter();

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
                <h2 className="text-xl font-semibold">James Smith</h2>
                <p className="text-gray-500 text-sm">james.smith@mail.com</p>

                <button className="mt-3 px-5 py-2 bg-gradient-to-r from-[#fdc431] to-[#04786b] text-white rounded-full text-sm font-semibold hover:opacity-90 transition">
                    Edit Profile
                </button>
            </div>

            {/* Options List */}
            <div className="w-full max-w-md space-y-3">
                <ProfileOption
                    icon={<CreditCard className="w-5 h-5 text-[#04786b]" />}
                    label="Payment Details"
                />
                <ProfileOption
                    icon={<Lock className="w-5 h-5 text-[#04786b]" />}
                    label="Change Password"
                />
                <ProfileOption
                    icon={<Trash2 className="w-5 h-5 text-[#04786b]" />}
                    label="Delete Account"
                />
            </div>
        </main>
    );
}

function ProfileOption({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[#e8f1ed]">{icon}</div>
                <span className="text-gray-800 font-medium">{label}</span>
            </div>
            <span className="text-gray-400 text-lg">›</span>
        </div>
    );
}
