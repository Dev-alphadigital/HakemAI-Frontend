// "use client";

// import { FaTrash } from "react-icons/fa";

// interface DeleteAccountModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onDelete: () => void;
// }

// export default function DeleteAccountModal({
//     isOpen,
//     onClose,
//     onDelete,
// }: DeleteAccountModalProps) {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//             <div className="bg-[#2E2E2E] text-white w-[90%] max-w-sm rounded-2xl overflow-hidden shadow-lg">
//                 {/* Modal content */}
//                 <div className="flex flex-col items-center p-6 space-y-3">
//                     {/* Gradient Trash Icon */}
//                     <div className="bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C] p-[10px] rounded-full">
//                         <FaTrash className="text-white text-lg" />
//                     </div>

//                     <h3 className="text-lg font-bold">Are you sure?</h3>
//                     <p className="text-sm text-gray-300 text-center">
//                         You want to delete your account permanently?
//                     </p>
//                 </div>

//                 {/* Buttons */}
//                 <div className="grid grid-cols-2 border-t border-gray-700">
//                     <button
//                         onClick={onDelete}
//                         className="py-3 text-red-400 font-semibold border-r border-gray-700 cursor-pointer hover:bg-gray-700 transition"
//                     >
//                         Delete
//                     </button>
//                     <button
//                         onClick={onClose}
//                         className="py-3 text-white font-semibold hover:bg-gray-700 cursor-pointer transition"
//                     >
//                         Keep Account
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }
"use client";

import { useState } from "react";
import { FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: (password: string) => void; // accepts password
}

export default function DeleteAccountModal({
    isOpen,
    onClose,
    onDelete,
}: DeleteAccountModalProps) {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen) return null;

    const handleDeleteClick = () => {
        onDelete(password); // pass password manually
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#2E2E2E] text-white w-[90%] max-w-sm rounded-2xl overflow-hidden shadow-lg">

                {/* Content */}
                <div className="flex flex-col items-center p-6 space-y-4">
                    <div className="bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C] p-[10px] rounded-full">
                        <FaTrash className="text-white text-lg" />
                    </div>

                    <h3 className="text-lg font-bold">Delete Your Account</h3>
                    <p className="text-sm text-gray-300 text-center">
                        Enter your password to confirm deletion.
                    </p>

                    {/* Password Input */}
                    <div className="w-full">
                        <label className="text-sm text-gray-300">Password</label>
                        <div className="relative mt-1 p-[1px] rounded-md bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C]">
                            <div className="flex items-center bg-[#3A3A3A] rounded-md px-3 py-2">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="bg-transparent outline-none text-white flex-1"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="ml-2 text-gray-300"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 border-t border-gray-700">
                    <button
                        onClick={handleDeleteClick} // <-- FIXED
                        className="py-3 text-red-400 font-semibold border-r border-gray-700 hover:bg-gray-700 transition"
                    >
                        Delete
                    </button>

                    <button
                        onClick={onClose}
                        className="py-3 text-white font-semibold hover:bg-gray-700 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
