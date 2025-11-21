"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Image from "next/image";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import DeleteAccountModal from "@/components/DeleteAccountModal";

export default function SettingsPage() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Profile data from backend
    const [profile, setProfile] = useState({
        username: "",
        email: "",
        phone: "",
    });

    // Password fields
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
    });

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    // Fetch profile on load
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) return;

                const res = await fetch("http://localhost:5000/api/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await res.json();

                setProfile({
                    username: data.username || "",
                    email: data.email || "",
                    phone: data.phone || data.phoneNumber || "",
                });
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    // Save profile + password update
    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return alert("Session expired");

            // 1. Update profile
            await fetch("http://localhost:5000/api/users/update-profile", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(profile),
            });

            // 2. Change password (if filled)
            if (passwordForm.currentPassword && passwordForm.newPassword) {
                await fetch("http://localhost:5000/api/auth/change-password", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        currentPassword: passwordForm.currentPassword,
                        newPassword: passwordForm.newPassword,
                    }),
                });
            }

            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating:", error);
            alert("Something went wrong.");
        }
    };

    // Delete account logic
    const handleDeleteAccount = async (password: string) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return;

            const res = await fetch("http://localhost:5000/api/auth/delete-account", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                localStorage.clear();
                alert("Account deleted");
                window.location.href = "/signup";
            } else {
                const data = await res.json();
                alert(data.message || "Failed to delete account");
            }

            setIsDeleteModalOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main className="flex min-h-screen bg-[#e8f1ed] text-gray-900">
            {/* Sidebar */}
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <Topbar />

                {/* Page Content */}
                <section className="px-8 pt-10 pb-16 w-full 2xl:px-12">
                    {/* ===== Page Header ===== */}
                    <h1 className="text-2xl xl:text-3xl font-bold text-[#1B1C1D] mt-[3.5rem]">
                        My Profile
                    </h1>
                    <p className="text-gray-600 text-sm mt-1 mb-8">
                        Manage your personal details and account preferences in one place.
                    </p>

                    {/* ===== PROFILE CARD ===== */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <Image
                                    src="/images/profile.png"
                                    alt="Profile"
                                    width={70}
                                    height={70}
                                    className="rounded-full"
                                />
                                <div>
                                    <h2 className="font-semibold text-lg">{profile.username}</h2>
                                    <p className="text-gray-500 text-sm">{profile.email}</p>
                                </div>
                            </div>

                            {/* Delete Button */}
                            <div className="mt-2 text-center">
                                <button
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className="bg-[#d32f2f] cursor-pointer text-white text-xs font-medium px-4 py-2 rounded-md hover:opacity-90 transition"
                                >
                                    Delete account permanently
                                </button>
                            </div>
                        </div>

                        <h3 className="text-base font-semibold mb-3 text-[#1B1C1D]">Profile</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Username */}
                            <div>
                                <label className="text-sm text-gray-600">Username</label>
                                <div className="p-[1px] mt-1 rounded-md bg-gradient-to-r from-[#f3c21e] to-[#178474]">
                                    <div className="rounded-md bg-gradient-to-r from-[#fbecbc] to-[#c0dbd3] px-3 py-2">
                                        <input
                                            type="text"
                                            value={profile.username}
                                            onChange={(e) =>
                                                setProfile({ ...profile, username: e.target.value })
                                            }
                                            className="w-full bg-transparent outline-none text-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-sm text-gray-600">Email</label>
                                <div className="p-[1px] mt-1 rounded-md bg-gradient-to-r from-[#f3c21e] to-[#178474]">
                                    <div className="rounded-md bg-gradient-to-r from-[#fbecbc] to-[#c0dbd3] px-3 py-2">
                                        <input
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) =>
                                                setProfile({ ...profile, email: e.target.value })
                                            }
                                            className="w-full bg-transparent outline-none text-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="text-sm text-gray-600">Phone Number</label>
                                <div className="p-[1px] mt-1 rounded-md bg-gradient-to-r from-[#f3c21e] to-[#178474]">
                                    <div className="rounded-md bg-gradient-to-r from-[#fbecbc] to-[#c0dbd3] px-3 py-2">
                                        <input
                                            type="text"
                                            value={profile.phone}
                                            onChange={(e) =>
                                                setProfile({ ...profile, phone: e.target.value })
                                            }
                                            className="w-full bg-transparent outline-none text-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== PASSWORD CARD ===== */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="font-semibold text-lg text-[#1B1C1D]">
                                    Password
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    Change your current password
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Current Password */}
                            <div>
                                <label className="text-sm text-gray-600">Current Password</label>
                                <div className="relative mt-1 p-[1px] rounded-md bg-gradient-to-r from-[#f3c21e] to-[#178474]">
                                    <div className="rounded-md bg-gradient-to-r from-[#fbecbc] to-[#c0dbd3] px-3 py-2">
                                        <input
                                            type={showCurrentPassword ? "text" : "password"}
                                            value={passwordForm.currentPassword}
                                            onChange={(e) =>
                                                setPasswordForm({
                                                    ...passwordForm,
                                                    currentPassword: e.target.value,
                                                })
                                            }
                                            placeholder="Enter Your Current Password"
                                            className="w-full bg-transparent outline-none text-gray-900 pr-10"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="absolute right-3 top-3 text-gray-600 text-sm"
                                    >
                                        {showCurrentPassword ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="text-sm text-gray-600">New Password</label>
                                <div className="relative mt-1 p-[1px] rounded-md bg-gradient-to-r from-[#f3c21e] to-[#178474]">
                                    <div className="rounded-md bg-gradient-to-r from-[#fbecbc] to-[#c0dbd3] px-3 py-2">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            value={passwordForm.newPassword}
                                            onChange={(e) =>
                                                setPasswordForm({
                                                    ...passwordForm,
                                                    newPassword: e.target.value,
                                                })
                                            }
                                            placeholder="Enter Your New Password"
                                            className="w-full bg-transparent outline-none text-gray-900 pr-10"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-3 text-gray-600 text-sm"
                                    >
                                        {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== SAVE BUTTON ===== */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={handleSaveChanges}
                            className="bg-gradient-to-r cursor-pointer from-[#FFD54F] to-[#1B7F5C] text-white font-semibold px-8 py-3 rounded-md hover:opacity-90 transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </section>
            </div>

            {/* ===== DELETE ACCOUNT MODAL ===== */}
            <DeleteAccountModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDeleteAccount}
            />
        </main>
    );
}