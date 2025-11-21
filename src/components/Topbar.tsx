// "use client";
// import { useState } from "react";
// import {
//     FaBars,
//     FaBell,
//     FaPlus,
//     FaFilter,
//     FaSearch,
//     FaChevronDown,
// } from "react-icons/fa";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// interface TopbarProps {
//     setMobileOpen?: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export default function Topbar({ setMobileOpen }: TopbarProps) {
//     const router = useRouter();
//     const [filterOpen, setFilterOpen] = useState(false);

//     return (
//         <>
//             {/* ===== FIXED TOP ICON BAR ===== */}
//             <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b lg:border-none border-gray-200 lg:bg-[#e8f1ed]">
//                 {/* ===== MOBILE VIEW ===== */}
//                 <div className="flex lg:hidden items-center justify-between px-6 py-3 md:px-9">
//                     <FaBars
//                         className="text-gray-800 text-xl cursor-pointer"
//                         onClick={() => setMobileOpen && setMobileOpen(true)}
//                     />

//                     <div className="flex items-center gap-4">
//                         {/* <FaPlus className="text-gray-700 text-lg cursor-pointer" />
//                         <FaBell className="text-gray-700 text-lg cursor-pointer" /> */}
//                         <Image
//                             src="/images/profile.png"
//                             alt="User"
//                             width={44}
//                             height={44}
//                             className="rounded-full cursor-pointer"
//                             onClick={() => router.push("/dashboard/profile")}
//                         />
//                     </div>
//                 </div>

//                 {/* ===== DESKTOP VIEW ===== */}
//                 <div className="hidden lg:grid grid-cols-3 items-center px-6 py-4 w-full">
//                     {/* LEFT SECTION */}
//                     <div className="flex items-center gap-5">
//                         {/* Logo */}
//                         <div className="flex items-center gap-3">
//                             <Image
//                                 src="/logo/logo.svg"
//                                 alt="Logo"
//                                 width={45}
//                                 height={45}
//                                 className="rounded-full"
//                             />
//                             <h1 className="text-xl font-semibold lg:font-bold tracking-wide text-gray-800">
//                                 HAKEM.AI
//                             </h1>
//                         </div>
//                     </div>

//                     {/* CENTER SECTION (Centered Search Bar) */}
//                     <div className="flex justify-center">
//                         <div className="relative flex items-center bg-[#d9d9d9] rounded-md px-3 py-3 w-96 xl:w-[30rem] 2xl:w-[36rem] shadow-sm">
//                             <div
//                                 className="flex items-center gap-1 text-gray-600 text-sm cursor-pointer select-none pr-2 border-r border-gray-600"
//                                 onClick={() => setFilterOpen(!filterOpen)}
//                             >
//                                 <span>All</span>
//                                 <FaChevronDown className="text-xs" />
//                             </div>

//                             <input
//                                 type="text"
//                                 placeholder="Search"
//                                 className="bg-transparent ml-3 text-sm outline-none flex-1 text-gray-700"
//                             />
//                             <FaSearch className="text-gray-500 text-sm cursor-pointer" />

//                             {/* Filter Dropdown */}
//                             {filterOpen && (
//                                 <div className="absolute top-11 left-2 bg-white border border-gray-200 shadow-md rounded-md p-2 text-sm w-36">
//                                     <label className="flex items-center gap-2 cursor-pointer py-1 px-2 hover:bg-gray-50 rounded">
//                                         <input type="checkbox" checked readOnly /> All
//                                     </label>
//                                     <label className="flex items-center gap-2 cursor-pointer py-1 px-2 hover:bg-gray-50 rounded">
//                                         <input type="checkbox" /> Providers
//                                     </label>
//                                     <label className="flex items-center gap-2 cursor-pointer py-1 px-2 hover:bg-gray-50 rounded">
//                                         <input type="checkbox" /> Documents
//                                     </label>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* RIGHT SECTION */}
//                     <div className="flex items-center justify-end gap-6">
//                         {/* <FaPlus className="text-gray-700 text-lg cursor-pointer" /> */}
//                         {/* <FaBell className="text-gray-700 text-lg cursor-pointer" /> */}
//                         <div className="flex items-center gap-2">
//                             <Image
//                                 src="/images/profile.png"
//                                 alt="User"
//                                 width={44}
//                                 height={44}
//                                 className="rounded-full cursor-pointer"
//                                 onClick={() => (router.push("/dashboard/settings"))}
//                             />
//                             <div className="flex flex-col leading-tight">
//                                 <span className="text-gray-800 font-medium text-sm">James</span>
//                                 <span className="text-gray-500 text-xs">user</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </header>

//             {/* ===== MOBILE SEARCH BAR (OUTSIDE FIXED HEADER) ===== */}
//             <div className="lg:hidden px-6 mt-20 md:px-8">
//                 <div className="flex items-center bg-gray-200 rounded-full px-3 py-3 w-full">
//                     <FaSearch className="text-gray-500 text-sm mr-2" />
//                     <input
//                         type="text"
//                         placeholder="Search"
//                         className="bg-transparent text-sm outline-none flex-1 text-gray-700"
//                     />
//                     <FaFilter className="text-gray-500 text-base cursor-pointer" />
//                 </div>
//             </div>
//         </>
//     );
// }


"use client";
import { useState } from "react";
import {
    FaBars,
    FaFilter,
    FaSearch,
    FaChevronDown,
} from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface TopbarProps {
    setMobileOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Topbar({ setMobileOpen }: TopbarProps) {
    const router = useRouter();
    const [filterOpen, setFilterOpen] = useState(false);

    const { user, loading } = useAuth();

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b lg:border-none border-gray-200 lg:bg-[#e8f1ed]">

                {/* MOBILE VIEW */}
                <div className="flex lg:hidden items-center justify-between px-6 py-3 md:px-9">
                    <FaBars
                        className="text-gray-800 text-xl cursor-pointer"
                        onClick={() => setMobileOpen && setMobileOpen(true)}
                    />

                    <div className="flex items-center gap-4">
                        <Image
                            src="/images/profile.png"
                            alt="User"
                            width={44}
                            height={44}
                            className="cursor-pointer"
                            onClick={() => router.push("/dashboard/profile")}
                        />
                    </div>
                </div>

                {/* DESKTOP VIEW */}
                <div className="hidden lg:grid grid-cols-3 items-center px-6 py-4 w-full">

                    {/* LEFT */}
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/logo/logo.svg"
                                alt="Logo"
                                width={45}
                                height={45}
                                className="rounded-full"
                            />
                            <h1 className="text-xl font-semibold lg:font-bold tracking-wide text-gray-800">
                                HAKEM.AI
                            </h1>
                        </div>
                    </div>

                    {/* CENTER */}
                    <div className="flex justify-center">
                        <div className="relative flex items-center bg-[#d9d9d9] rounded-md px-3 py-3 w-96 xl:w-[30rem] 2xl:w-[36rem] shadow-sm">
                            <div
                                className="flex items-center gap-1 text-gray-600 text-sm cursor-pointer select-none pr-2 border-r border-gray-600"
                                onClick={() => setFilterOpen(!filterOpen)}
                            >
                                <span>All</span>
                                <FaChevronDown className="text-xs" />
                            </div>

                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-transparent ml-3 text-sm outline-none flex-1 text-gray-700"
                            />
                            <FaSearch className="text-gray-500 text-sm cursor-pointer" />

                            {filterOpen && (
                                <div className="absolute top-11 left-2 bg-white border border-gray-200 shadow-md rounded-md p-2 text-sm w-36">
                                    <label className="flex items-center gap-2 cursor-pointer py-1 px-2 hover:bg-gray-50 rounded">
                                        <input type="checkbox" checked readOnly /> All
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer py-1 px-2 hover:bg-gray-50 rounded">
                                        <input type="checkbox" /> Providers
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer py-1 px-2 hover:bg-gray-50 rounded">
                                        <input type="checkbox" /> Documents
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center justify-end gap-6">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/images/profile.png"
                                alt="User"
                                width={44}
                                height={44}
                                className="rounded-full cursor-pointer"
                                onClick={() => router.push("/dashboard/settings")}
                            />

                            <div className="flex flex-col leading-tight">
                                <span className="text-gray-800 font-medium text-sm">
                                    {loading ? "…" : user?.username || "User"}
                                </span>
                                <span className="text-gray-500 text-xs capitalize">
                                    {loading ? "…" : user?.role || "user"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* MOBILE SEARCH */}
            <div className="lg:hidden px-6 mt-20 md:px-8">
                <div className="flex items-center bg-gray-200 rounded-full px-3 py-3 w-full">
                    <FaSearch className="text-gray-500 text-sm mr-2" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent text-sm outline-none flex-1 text-gray-700"
                    />
                    <FaFilter className="text-gray-500 text-base cursor-pointer" />
                </div>
            </div>
        </>
    );
}