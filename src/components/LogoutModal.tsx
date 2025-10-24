"use client";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
            <div className="bg-[#333333] text-white w-[90%] max-w-sm rounded-2xl shadow-xl relative p-6 text-center">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-gray-300 hover:text-white cursor-pointer"
                    onClick={onClose}
                >
                    <FaTimes className="text-lg" />
                </button>

                {/* Icon */}
                <div className="flex items-center justify-center mx-auto mb-5">
                    <Image
                        src="/images/logout-icon.png"
                        alt="Logout Icon"
                        width={56}
                        height={56}
                        className="object-contain"
                    />
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold mb-2">Logout?</h2>
                <p className="text-gray-300 text-sm mb-6">
                    Are you sure you want to logout? You'll have to sign in again.
                </p>

                {/* Buttons */}
                <div className="flex justify-center gap-3">
                    {/* Cancel Button — Gradient Border */}
                    <div className="p-[1px] rounded-lg bg-gradient-to-r from-[#fdc431] to-[#04786b]">
                        <button
                            onClick={onClose}
                            className="px-5.5 py-2.5 rounded-lg cursor-pointer font-medium text-white bg-[#333333] hover:bg-[#3d3d3d] transition w-full"
                        >
                            Cancel
                        </button>
                    </div>

                    {/* Logout Button — Gradient Background */}
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2.5 rounded-lg cursor-pointer font-medium text-white bg-gradient-to-r from-[#fdc431] to-[#04786b] hover:opacity-90 transition"
                    >
                        Yes, logout
                    </button>
                </div>
            </div>
        </div>
    );
}
