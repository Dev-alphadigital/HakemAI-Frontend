// "use client";

// import { useState } from "react";
// import Sidebar from "@/components/Sidebar";
// import Topbar from "@/components/Topbar";
// import { FiEdit2, FiTrash2, FiSearch, FiPlus } from "react-icons/fi";

// export default function CompanyTeamAccess() {
//     const [mobileOpen, setMobileOpen] = useState(false);

//     const teamMembers = [
//         { name: "Team Member 1", email: "Email Address" },
//         { name: "Team Member 2", email: "Email Address" },
//         { name: "Team Member 3", email: "Email Address" },
//     ];

//     return (
//         <main className="min-h-screen flex bg-[#fdfcf8] text-gray-900 lg:bg-[#e8f1ed]">
//             <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

//             <div className="flex-1 flex flex-col">
//                 <Topbar setMobileOpen={setMobileOpen} />

//                 {/* PAGE HEADER */}
//                 <div className="px-6 md:px-8 mt-4 lg:mt-[5.5rem]">
//                     <h1 className="text-2xl font-bold text-gray-800 xl:text-3xl">
//                         Team’s Access
//                     </h1>
//                     <p className="text-gray-500 mb-6">
//                         Manage your team members here
//                     </p>
//                 </div>

//                 {/* MAIN CARD */}
//                 <div className="px-4 md:px-8">
//                     <div className="bg-white shadow-md rounded-xl p-4 md:p-6">

//                         <div className="mb-2">Plan:</div>

//                         {/* COMPANY NAME + EDIT ICON */}
//                         <div className="flex items-start justify-between mb-4">
//                             <div>
//                                 <h2 className="text-lg md:text-xl font-semibold text-gray-800">
//                                     Company Name
//                                 </h2>
//                                 <p className="text-sm text-gray-500">
//                                     Company Description
//                                 </p>
//                             </div>

//                             <button className="text-gray-600 hover:text-gray-800 transition cursor-pointer">
//                                 <FiEdit2 size={20} />
//                             </button>
//                         </div>

//                         {/* SEARCH BAR */}
//                         <div className="relative mb-4">
//                             <input
//                                 type="text"
//                                 placeholder="Search"
//                                 className="w-full bg-[#e7e7e7] text-gray-700 rounded-md py-2 pl-10 pr-4 outline-none"
//                             />
//                             <FiSearch
//                                 className="absolute left-3 top-2.5 text-gray-500"
//                                 size={18}
//                             />
//                         </div>

//                         {/* TEAM MEMBERS LIST */}
//                         <div className="space-y-4">
//                             {teamMembers.map((member, index) => (
//                                 <div
//                                     key={index}
//                                     className="flex items-center justify-between border-b border-gray-300 pb-3"
//                                 >
//                                     <div className="flex items-start gap-3">
//                                         <input
//                                             type="checkbox"
//                                             className="mt-1 w-4 h-4 accent-[#1A6A5B]"
//                                         />

//                                         <div>
//                                             <p className="text-gray-800 font-medium">
//                                                 {member.name}
//                                             </p>
//                                             <p className="text-sm text-gray-500 -mt-1">
//                                                 {member.email}
//                                             </p>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-center gap-3">
//                                         <button className="text-gray-600 hover:text-gray-800 transition cursor-pointer">
//                                             <FiEdit2 size={18} />
//                                         </button>
//                                         <button className="text-gray-600 hover:text-red-600 transition cursor-pointer">
//                                             <FiTrash2 size={18} />
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* ADD MEMBER */}
//                         <button className="flex items-center gap-2 text-gray-800 mt-4 hover:opacity-80 transition cursor-pointer">
//                             <FiPlus size={18} />
//                             <span className="font-medium">Add Team Member</span>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// }

"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { FiTrash2, FiSearch } from "react-icons/fi";

export default function CompanyTeamAccess() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [teamMembers, setTeamMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [token, setToken] = useState<string | null>(null);

    /** Load token only once from localStorage */
    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        setToken(storedToken);
    }, []);

    useEffect(() => {
        if (!token) return;

        const ensureCompany = async () => {
            try {
                await fetch(`${API_BASE}/api/company/mine`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } catch (err) {
                console.log("❌ Ensure company error:", err);
            }
        };

        ensureCompany();
    }, [token]);

    /** Fetch team members */
    const fetchTeam = async () => {
        if (!token) return;

        try {
            const res = await fetch(`${API_BASE}/api/company/team`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            console.log("🔍 Team API Response:", data);

            setTeamMembers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.log("❌ Team fetch error:", err);
            setTeamMembers([]);
        }
    };

    /** Fetch team after token loads */
    useEffect(() => {
        if (token) fetchTeam();
    }, [token]);

    /** Live Search */
    const handleSearch = async (value: string) => {
        setSearchQuery(value);

        if (!token || value.length < 2) {
            setSearchResults([]);
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/api/company/search-users?q=${value}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            setSearchResults(Array.isArray(data) ? data : []);
        } catch (error) {
            console.log("❌ Search Error:", error);
        }
    };

    /** Add member */
    const handleAddMember = async (email: string) => {
        if (!token) return;

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/company/add-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ email }),
            });

            const result = await res.json();

            if (!res.ok) {
                alert(result.message);
                return;
            }

            setSearchQuery("");
            setSearchResults([]);
            fetchTeam();
        } catch (err) {
            console.log("❌ Add user error:", err);
        } finally {
            setLoading(false);
        }
    };

    /** Remove Member */
    const removeTeamMember = async (userId: string) => {
        if (!token) return;

        setLoading(true);
        try {
            await fetch(`${API_BASE}/api/company/remove-user/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchTeam();
        } catch (err) {
            console.log("❌ Remove user error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex bg-[#fdfcf8] text-gray-900 lg:bg-[#e8f1ed]">
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            <div className="flex-1 flex flex-col">
                <Topbar setMobileOpen={setMobileOpen} />

                <div className="px-6 md:px-8 mt-4 lg:mt-[5.5rem]">
                    <h1 className="text-2xl font-bold text-gray-800 xl:text-3xl">
                        Team’s Access
                    </h1>
                    <p className="text-gray-500 mb-6">
                        Manage your team members here
                    </p>
                </div>

                <div className="px-4 md:px-8">
                    <div className="bg-white shadow-md rounded-xl p-4 md:p-6">

                        {/* Search */}
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Search email..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full bg-[#e7e7e7] text-gray-700 rounded-md py-2 pl-10 pr-4 outline-none"
                            />
                            <FiSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
                        </div>

                        {/* Search Dropdown */}
                        {searchResults.length > 0 && (
                            <div className="bg-white border shadow-md rounded-md mb-3 p-2">
                                {searchResults.map((user: any) => (
                                    <button
                                        key={user._id}
                                        onClick={() => handleAddMember(user.email)}
                                        disabled={loading}
                                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                                    >
                                        <p className="font-medium">{user.name || "Unknown"}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Team List */}
                        <div className="space-y-4 mt-4">
                            {teamMembers.map((member: any) => (
                                <div
                                    key={member._id}
                                    className="flex items-center justify-between border-b border-gray-300 pb-3"
                                >
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {member.user?.username}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {member.user?.email}
                                        </p>
                                    </div>

                                    {member.role !== "admin" && (
                                        <button
                                            onClick={() => removeTeamMember(member.user._id)}
                                            disabled={loading}
                                            className="text-gray-600 hover:text-red-600"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}