// "use client";

// import { useState } from "react";
// import Sidebar from "@/components/Sidebar";
// import Topbar from "@/components/Topbar";
// import Image from "next/image";
// import { FaPen, FaEyeSlash, FaCreditCard } from "react-icons/fa";
// import DeleteAccountModal from "@/components/DeleteAccountModal"; // 👈 Import the modal

// export default function SettingsPage() {
//     const [mobileOpen, setMobileOpen] = useState(false);
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 👈 modal state

//     const handleDeleteAccount = () => {
//         console.log("Account permanently deleted! (Add backend logic here)");
//         setIsDeleteModalOpen(false);
//     };

//     return (
//         <main className="flex min-h-screen bg-[#e8f1ed] text-gray-900">

//             {/* Sidebar */}
//             <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

//             {/* Main Content */}
//             <div className="flex-1 flex flex-col">
//                 <Topbar />

//                 {/* Page Content */}
//                 <section className="px-8 pt-10 pb-16 w-full 2xl:px-12">
//                     {/* ===== Page Header ===== */}
//                     <h1 className="text-2xl xl:text-3xl font-bold text-[#1B1C1D] mt-[3.5rem]">
//                         My Profile
//                     </h1>
//                     <p className="text-gray-600 text-sm mt-1 mb-8">
//                         Manage your personal details and account preferences in one place.
//                     </p>

//                     {/* ===== PROFILE CARD ===== */}
//                     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
//                         <div className="flex justify-between items-start mb-6">
//                             <div className="flex items-center gap-4">
//                                 <Image
//                                     src="/images/profile.png"
//                                     alt="Profile"
//                                     width={70}
//                                     height={70}
//                                     className="rounded-full"
//                                 />
//                                 <div>
//                                     <h2 className="font-semibold text-lg">James Smith</h2>
//                                     <p className="text-gray-500 text-sm">james.smith@mail.com</p>
//                                 </div>
//                             </div>


//                             {/* ===== DELETE BUTTON ===== */}
//                             <div className="mt-2 text-center">
//                                 <button
//                                     onClick={() => setIsDeleteModalOpen(true)} // 👈 open modal
//                                     className="bg-[#d32f2f] cursor-pointer text-white text-xs font-medium px-4 py-2 rounded-md hover:opacity-90 transition"
//                                 >
//                                     Delete account permanently
//                                 </button>
//                             </div>
//                         </div>

//                         <h3 className="text-base font-semibold mb-3 text-[#1B1C1D]">
//                             Profile
//                         </h3>
//                         <div className="grid grid-cols-2 gap-4">
//                             {/* Username */}
//                             <div>
//                                 <label className="text-sm text-gray-600">Username</label>
//                                 <div className="p-[1px] mt-1 rounded-md bg-gradient-to-r from-[#f3c21e] to-[#178474]">
//                                     <div className="rounded-md bg-gradient-to-r from-[#fbecbc] to-[#c0dbd3] px-3 py-2">
//                                         <input
//                                             type="text"
//                                             defaultValue="james.smith"
//                                             className="w-full bg-transparent outline-none text-gray-900"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Email */}
//                             <div>
//                                 <label className="text-sm text-gray-600">Email</label>
//                                 <div className="p-[1px] mt-1 rounded-md bg-gradient-to-r from-[#f3c21e] to-[#178474]">
//                                     <div className="rounded-md bg-gradient-to-r from-[#fbecbc] to-[#c0dbd3] px-3 py-2">
//                                         <input
//                                             type="email"
//                                             defaultValue="james.smith@mail.com"
//                                             className="w-full bg-transparent outline-none text-gray-900"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Phone Number */}
//                             <div>
//                                 <label className="text-sm text-gray-600">Phone Number</label>
//                                 <div className="p-[1px] mt-1 rounded-md bg-gradient-to-r from-[#f3c21e] to-[#178474]">
//                                     <div className="rounded-md bg-gradient-to-r from-[#fbecbc] to-[#c0dbd3] px-3 py-2">
//                                         <input
//                                             type="text"
//                                             defaultValue="+1 123 123 1234"
//                                             className="w-full bg-transparent outline-none text-gray-900"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* ===== PASSWORD CARD ===== */}
//                     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
//                         <div className="flex justify-between items-center mb-6">
//                             <div>
//                                 <h2 className="font-semibold text-lg text-[#1B1C1D]">
//                                     Password
//                                 </h2>
//                                 <p className="text-gray-500 text-sm">
//                                     Change your current password
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-2 gap-4">
//                             {/* Current Password */}
//                             <div>
//                                 <label className="text-sm text-gray-600">Current Password</label>
//                                 <div className="relative mt-1 p-[1px] rounded-md bg-gradient-to-r from-[#f3c21e] to-[#178474]">
//                                     <div className="rounded-md bg-gradient-to-r from-[#fbecbc] to-[#c0dbd3] px-3 py-2">
//                                         <input
//                                             type="password"
//                                             placeholder="Enter Your Current Password"
//                                             className="w-full bg-transparent outline-none text-gray-900 pr-10"
//                                         />
//                                     </div>
//                                     <FaEyeSlash className="absolute right-3 top-3 text-gray-600 text-sm" />
//                                 </div>
//                             </div>

//                             {/* New Password */}
//                             <div>
//                                 <label className="text-sm text-gray-600">New Password</label>
//                                 <div className="relative mt-1 p-[1px] rounded-md bg-gradient-to-r from-[#f3c21e] to-[#178474]">
//                                     <div className="rounded-md bg-gradient-to-r from-[#fbecbc] to-[#c0dbd3] px-3 py-2">
//                                         <input
//                                             type="password"
//                                             placeholder="Enter Your New Password"
//                                             className="w-full bg-transparent outline-none text-gray-900 pr-10"
//                                         />
//                                     </div>
//                                     <FaEyeSlash className="absolute right-3 top-3 text-gray-600 text-sm" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* ===== PAYMENT DETAILS CARD ===== */}
//                     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                         <div className="flex justify-between items-center mb-6">
//                             <div>
//                                 <h2 className="font-semibold text-lg text-[#1B1C1D]">
//                                     Payment Details
//                                 </h2>
//                                 <p className="text-gray-500 text-sm">
//                                     Modify your payment details
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-2 gap-4">
//                             {/* Cardholder Name */}
//                             <div>
//                                 <label className="text-sm text-gray-600">Cardholder name</label>
//                                 <div className="p-[1px] mt-1 rounded-md bg-gradient-to-r from-[#f3c21e] to-[#178474]">
//                                     <div className="rounded-md bg-gradient-to-r from-[#fbecbc] to-[#c0dbd3] px-3 py-2">
//                                         <input
//                                             type="text"
//                                             defaultValue="James Smith"
//                                             className="w-full bg-transparent outline-none text-gray-900"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Expiry */}
//                             <div>
//                                 <label className="text-sm text-gray-600">Expiry</label>
//                                 <div className="p-[1px] mt-1 rounded-md bg-gradient-to-r from-[#f3c21e] to-[#178474]">
//                                     <div className="rounded-md bg-gradient-to-r from-[#fbecbc] to-[#c0dbd3] px-3 py-2">
//                                         <input
//                                             type="text"
//                                             defaultValue="11 / 28"
//                                             className="w-full bg-transparent outline-none text-gray-900"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Card Number */}
//                             <div>
//                                 <label className="text-sm text-gray-600">Card number</label>
//                                 <div className="p-[1px] mt-1 rounded-md bg-gradient-to-r from-[#f3c21e] to-[#178474]">
//                                     <div className="flex items-center rounded-md bg-gradient-to-r from-[#fbecbc] to-[#c0dbd3] px-3 py-2">
//                                         <FaCreditCard className="text-[#E52C2C] mr-2 text-lg" />
//                                         <input
//                                             type="text"
//                                             defaultValue="1234 1324 1234 1234"
//                                             className="flex-1 bg-transparent outline-none text-gray-900"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* CVV */}
//                             <div>
//                                 <label className="text-sm text-gray-600">CVV</label>
//                                 <div className="p-[1px] mt-1 rounded-md bg-gradient-to-r from-[#f3c21e] to-[#178474]">
//                                     <div className="rounded-md bg-gradient-to-r from-[#fbecbc] to-[#c0dbd3] px-3 py-2">
//                                         <input
//                                             type="password"
//                                             defaultValue="•••"
//                                             className="w-full bg-transparent outline-none text-gray-900"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {/* ===== SAVE BUTTON ===== */}
//                     <div className="mt-8 text-center">
//                         <button
//                             onClick={() => setIsDeleteModalOpen(true)} // 👈 open modal
//                             className="bg-gradient-to-r cursor-pointer from-[#FFD54F] to-[#1B7F5C] text-white font-semibold px-8 py-3 rounded-md hover:opacity-90 transition"
//                         >
//                             Save Changes
//                         </button>
//                     </div>
//                 </section>
//             </div>

//             {/* ===== DELETE ACCOUNT MODAL ===== */}
//             <DeleteAccountModal
//                 isOpen={isDeleteModalOpen}
//                 onClose={() => setIsDeleteModalOpen(false)}
//                 onDelete={handleDeleteAccount}
//             />
//         </main>
//     );
// }


"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Image from "next/image";
import { FaPen, FaEyeSlash, FaEye, FaCreditCard } from "react-icons/fa";
import DeleteAccountModal from "@/components/DeleteAccountModal"; // 👈 Import the modal

export default function SettingsPage() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 👈 modal state
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleDeleteAccount = () => {
        console.log("Account permanently deleted! (Add backend logic here)");
        setIsDeleteModalOpen(false);
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
                                    <h2 className="font-semibold text-lg">James Smith</h2>
                                    <p className="text-gray-500 text-sm">james.smith@mail.com</p>
                                </div>
                            </div>

                            {/* ===== DELETE BUTTON ===== */}
                            <div className="mt-2 text-center">
                                <button
                                    onClick={() => setIsDeleteModalOpen(true)} // 👈 open modal
                                    className="bg-[#d32f2f] cursor-pointer text-white text-xs font-medium px-4 py-2 rounded-md hover:opacity-90 transition"
                                >
                                    Delete account permanently
                                </button>
                            </div>
                        </div>

                        <h3 className="text-base font-semibold mb-3 text-[#1B1C1D]">
                            Profile
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Username */}
                            <div>
                                <label className="text-sm text-gray-600">Username</label>
                                <div className="p-[1px] mt-1 rounded-md bg-gradient-to-r from-[#f3c21e] to-[#178474]">
                                    <div className="rounded-md bg-gradient-to-r from-[#fbecbc] to-[#c0dbd3] px-3 py-2">
                                        <input
                                            type="text"
                                            defaultValue="james.smith"
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
                                            defaultValue="james.smith@mail.com"
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
                                            defaultValue="+1 123 123 1234"
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
                                            placeholder="Enter Your Current Password"
                                            className="w-full bg-transparent outline-none text-gray-900 pr-10"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowCurrentPassword(!showCurrentPassword)
                                        }
                                        className="absolute right-3 top-3 text-gray-600 text-sm focus:outline-none"
                                    >
                                        {showCurrentPassword ? (
                                            <FaEye className="text-gray-700 cursor-pointer" />
                                        ) : (
                                            <FaEyeSlash className="text-gray-700 cursor-pointer" />
                                        )}
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
                                            placeholder="Enter Your New Password"
                                            className="w-full bg-transparent outline-none text-gray-900 pr-10"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-3 text-gray-600 text-sm focus:outline-none"
                                    >
                                        {showNewPassword ? (
                                            <FaEye className="text-gray-700 cursor-pointer" />
                                        ) : (
                                            <FaEyeSlash className="text-gray-700 cursor-pointer" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== PAYMENT DETAILS CARD ===== */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="font-semibold text-lg text-[#1B1C1D]">
                                    Payment Details
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    Modify your payment details
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Cardholder Name */}
                            <div>
                                <label className="text-sm text-gray-600">Cardholder name</label>
                                <div className="p-[1px] mt-1 rounded-md bg-gradient-to-r from-[#f3c21e] to-[#178474]">
                                    <div className="rounded-md bg-gradient-to-r from-[#fbecbc] to-[#c0dbd3] px-3 py-2">
                                        <input
                                            type="text"
                                            defaultValue="James Smith"
                                            className="w-full bg-transparent outline-none text-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Expiry */}
                            <div>
                                <label className="text-sm text-gray-600">Expiry</label>
                                <div className="p-[1px] mt-1 rounded-md bg-gradient-to-r from-[#f3c21e] to-[#178474]">
                                    <div className="rounded-md bg-gradient-to-r from-[#fbecbc] to-[#c0dbd3] px-3 py-2">
                                        <input
                                            type="text"
                                            defaultValue="11 / 28"
                                            className="w-full bg-transparent outline-none text-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Card Number */}
                            <div>
                                <label className="text-sm text-gray-600">Card number</label>
                                <div className="p-[1px] mt-1 rounded-md bg-gradient-to-r from-[#f3c21e] to-[#178474]">
                                    <div className="flex items-center rounded-md bg-gradient-to-r from-[#fbecbc] to-[#c0dbd3] px-3 py-2">
                                        <FaCreditCard className="text-[#E52C2C] mr-2 text-lg" />
                                        <input
                                            type="text"
                                            defaultValue="1234 1324 1234 1234"
                                            className="flex-1 bg-transparent outline-none text-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* CVV */}
                            <div>
                                <label className="text-sm text-gray-600">CVV</label>
                                <div className="p-[1px] mt-1 rounded-md bg-gradient-to-r from-[#f3c21e] to-[#178474]">
                                    <div className="rounded-md bg-gradient-to-r from-[#fbecbc] to-[#c0dbd3] px-3 py-2">
                                        <input
                                            type="password"
                                            defaultValue="•••"
                                            className="w-full bg-transparent outline-none text-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== SAVE BUTTON ===== */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setIsDeleteModalOpen(true)} // 👈 open modal
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
