"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { FiEdit2, FiTrash2, FiSearch, FiPlus } from "react-icons/fi";

export default function CompanyTeamAccess() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const teamMembers = [
        { name: "Team Member 1", email: "Email Address" },
        { name: "Team Member 2", email: "Email Address" },
        { name: "Team Member 3", email: "Email Address" },
    ];

    return (
        <main className="min-h-screen flex bg-[#fdfcf8] text-gray-900 lg:bg-[#e8f1ed]">
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            <div className="flex-1 flex flex-col">
                <Topbar setMobileOpen={setMobileOpen} />

                {/* PAGE HEADER */}
                <div className="px-6 md:px-8 mt-4 lg:mt-[5.5rem]">
                    <h1 className="text-2xl font-bold text-gray-800 xl:text-3xl">
                        Team’s Access
                    </h1>
                    <p className="text-gray-500 mb-6">
                        Manage your team members here
                    </p>
                </div>

                {/* MAIN CARD */}
                <div className="px-4 md:px-8">
                    <div className="bg-white shadow-md rounded-xl p-4 md:p-6">

                        {/* COMPANY NAME + EDIT ICON */}
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                                    Company Name
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Company Description
                                </p>
                            </div>

                            <button className="text-gray-600 hover:text-gray-800 transition cursor-pointer">
                                <FiEdit2 size={20} />
                            </button>
                        </div>

                        {/* SEARCH BAR */}
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-[#e7e7e7] text-gray-700 rounded-md py-2 pl-10 pr-4 outline-none"
                            />
                            <FiSearch
                                className="absolute left-3 top-2.5 text-gray-500"
                                size={18}
                            />
                        </div>

                        {/* TEAM MEMBERS LIST */}
                        <div className="space-y-4">
                            {teamMembers.map((member, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between border-b border-gray-300 pb-3"
                                >
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            className="mt-1 w-4 h-4 accent-[#1A6A5B]"
                                        />

                                        <div>
                                            <p className="text-gray-800 font-medium">
                                                {member.name}
                                            </p>
                                            <p className="text-sm text-gray-500 -mt-1">
                                                {member.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button className="text-gray-600 hover:text-gray-800 transition cursor-pointer">
                                            <FiEdit2 size={18} />
                                        </button>
                                        <button className="text-gray-600 hover:text-red-600 transition cursor-pointer">
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ADD MEMBER */}
                        <button className="flex items-center gap-2 text-gray-800 mt-4 hover:opacity-80 transition cursor-pointer">
                            <FiPlus size={18} />
                            <span className="font-medium">Add Team Member</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}