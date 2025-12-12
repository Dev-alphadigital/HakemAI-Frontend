// "use client";

// import { createPortal } from "react-dom";
// import { FaSnowflake, FaTimes } from "react-icons/fa";

// interface FreezeAccountModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onConfirm: () => void;
//     userName?: string;
// }

// export default function FreezeAccountModal({
//     isOpen,
//     onClose,
//     onConfirm,
//     userName,
// }: FreezeAccountModalProps) {
//     if (typeof document === "undefined" || !isOpen) return null;

//     return createPortal(
//         <div
//             className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm"
//             onClick={onClose}
//         >
//             {/* Modal Box */}
//             <div
//                 className="relative bg-[#333333] text-white rounded-xl shadow-xl w-[90%] sm:w-[400px] p-6 animate-fadeIn"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 {/* Close Button */}
//                 <button
//                     onClick={onClose}
//                     className="absolute top-3 cursor-pointer right-3 text-gray-400 hover:text-white transition"
//                 >
//                     <FaTimes />
//                 </button>

//                 {/* Icon */}
//                 <div className="flex justify-center mb-4">
//                     <div className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400 to-green-600 flex items-center justify-center">
//                         <FaSnowflake className="text-white text-4xl" />
//                     </div>
//                 </div>

//                 {/* Title */}
//                 <h2 className="text-center text-lg font-bold mb-2">
//                     Freeze Account?
//                 </h2>

//                 {/* Description */}
//                 <p className="text-center text-sm text-gray-300 mb-6">
//                     Are you sure you want to freeze this account? The user will be temporarily blocked from access.
//                 </p>

//                 {/* Buttons */}
//                 <div className="flex justify-center gap-3">
//                     <button
//                         onClick={onClose}
//                         className="border border-gray-400 cursor-pointer text-gray-200 hover:bg-gray-700 px-5 py-2 rounded-md text-sm transition"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={() => {
//                             onConfirm();
//                             onClose();
//                         }}
//                         className="bg-gradient-to-r from-yellow-400 cursor-pointer to-green-700 text-white px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 transition"
//                     >
//                         Yes, Freeze
//                     </button>
//                 </div>
//             </div>

//             {/* Simple fade-in animation */}
//             <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: scale(0.9);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out forwards;
//         }
//       `}</style>
//         </div>,
//         document.body
//     );
// }


"use client";

import { createPortal } from "react-dom";
import { FaSnowflake, FaTimes } from "react-icons/fa";

interface FreezeAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    userName?: string;
    mode: "freeze" | "unfreeze";
}

export default function FreezeAccountModal({
    isOpen,
    onClose,
    onConfirm,
    userName,
    mode,
}: FreezeAccountModalProps) {
    if (typeof document === "undefined" || !isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Modal Box */}
            <div
                className="relative bg-[#333333] text-white rounded-xl shadow-xl w-[90%] sm:w-[400px] p-6 animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 cursor-pointer right-3 text-gray-400 hover:text-white transition"
                >
                    <FaTimes />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400 to-green-600 flex items-center justify-center">
                        <FaSnowflake className="text-white text-4xl" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-center text-lg font-bold mb-2">
                    {mode === "freeze" ? "Freeze Account?" : "Unfreeze Account?"}
                </h2>


                {/* Description */}
                <p className="text-center text-sm text-gray-300 mb-6">
                    {mode === "freeze"
                        ? "Are you sure you want to freeze this account? The user will be temporarily blocked from access."
                        : "Are you sure you want to unfreeze this account? The user will regain access."}
                </p>

                {/* Buttons */}
                <div className="flex justify-center gap-3">
                    <button
                        onClick={onClose}
                        className="border border-gray-400 cursor-pointer text-gray-200 hover:bg-gray-700 px-5 py-2 rounded-md text-sm transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="bg-gradient-to-r from-yellow-400 cursor-pointer to-green-700 text-white px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 transition"
                    >
                        {mode === "freeze" ? "Yes, Freeze" : "Yes, Unfreeze"}
                    </button>
                </div>
            </div>

            {/* Simple fade-in animation */}
            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
        </div>,
        document.body
    );
}