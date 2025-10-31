"use client";

import { FaTrash } from "react-icons/fa";

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

export default function DeleteAccountModal({
    isOpen,
    onClose,
    onDelete,
}: DeleteAccountModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#2E2E2E] text-white w-[90%] max-w-sm rounded-2xl overflow-hidden shadow-lg">
                {/* Modal content */}
                <div className="flex flex-col items-center p-6 space-y-3">
                    {/* Gradient Trash Icon */}
                    <div className="bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C] p-[10px] rounded-full">
                        <FaTrash className="text-white text-lg" />
                    </div>

                    <h3 className="text-lg font-bold">Are you sure?</h3>
                    <p className="text-sm text-gray-300 text-center">
                        You want to delete your account permanently?
                    </p>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 border-t border-gray-700">
                    <button
                        onClick={onDelete}
                        className="py-3 text-red-400 font-semibold border-r border-gray-700 cursor-pointer hover:bg-gray-700 transition"
                    >
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="py-3 text-white font-semibold hover:bg-gray-700 cursor-pointer transition"
                    >
                        Keep Account
                    </button>
                </div>
            </div>
        </div>
    );
}
