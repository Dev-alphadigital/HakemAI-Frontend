"use client";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { useState } from "react";
import { MoreVertical } from "lucide-react";

export default function MyDocumentsPage() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState<number | null>(null);

    const documents = [
        { name: "Quote 1", date: "Oct 12, 2025" },
        { name: "Quote 2", date: "Oct 12, 2025" },
        { name: "Quote 3", date: "Oct 12, 2025" },
        { name: "Quote 4", date: "Oct 12, 2025" },
    ];

    return (
        <main className="min-h-screen flex bg-[#fdfcf8] text-gray-900 lg:bg-[#e8f1ed] relative z-0">
            {/* Sidebar */}
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            {/* Main content area */}
            <div className="flex-1 flex flex-col relative z-0">
                <Topbar setMobileOpen={setMobileOpen} />

                <div className="p-6 md:p-8 space-y-6 lg:mt-[3.5rem]">
                    {/* Header */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 xl:text-3xl">
                            My Documents
                        </h1>
                        <p className="text-gray-500 mt-1">
                            View and manage all your uploaded PDFs for quick comparison.
                        </p>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 relative z-0">
                        <table className="w-full text-left border-collapse relative">
                            <thead className="bg-[#d9d9d9] text-gray-600 text-sm">
                                <tr>
                                    <th className="py-3 px-6 font-semibold">File name</th>
                                    <th className="py-3 px-6 font-semibold">Upload date</th>
                                    <th className="py-3 px-6 font-semibold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800">
                                {documents.map((doc, i) => (
                                    <tr
                                        key={i}
                                        className="border-t border-gray-100 hover:bg-gray-50 transition relative"
                                    >
                                        <td className="py-3 px-6 cursor-pointer hover:text-[#04786b]">
                                            {doc.name}
                                        </td>
                                        <td className="py-3 px-6">{doc.date}</td>
                                        <td className="py-3 px-6 text-right relative cursor-pointer">
                                            <button
                                                onClick={() =>
                                                    setOpenMenu(openMenu === i ? null : i)
                                                }
                                                className="p-1.5 rounded hover:bg-gray-100"
                                            >
                                                <MoreVertical className="w-4 h-4 text-gray-600 cursor-pointer" />
                                            </button>

                                            {/* Dropdown menu */}
                                            {openMenu === i && (
                                                <div
                                                    className={`absolute right-6 bg-white shadow-md border border-gray-200 rounded-md w-28 z-50 ${i === documents.length - 1
                                                        ? "bottom-8"
                                                        : "top-8"
                                                        }`}
                                                >
                                                    <button className="block w-full cursor-pointer text-left px-3 py-2 text-sm hover:bg-gray-100 transition">
                                                        View
                                                    </button>
                                                    <button className="block w-full cursor-pointer text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 transition">
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View - Card Layout */}
                    <div className="grid grid-cols-1 gap-4 lg:hidden">
                        {documents.map((doc, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium text-gray-800 hover:text-[#04786b] cursor-pointer">
                                            {doc.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">{doc.date}</p>
                                    </div>
                                    <div className="relative">
                                        <button
                                            onClick={() =>
                                                setOpenMenu(openMenu === i ? null : i)
                                            }
                                            className="p-1.5 rounded hover:bg-gray-100"
                                        >
                                            <MoreVertical className="w-4 h-4 text-gray-600" />
                                        </button>

                                        {openMenu === i && (
                                            <div
                                                className={`absolute right-0 bg-white shadow-md border border-gray-200 rounded-md w-28 z-50 ${i === documents.length - 1 ? "bottom-8" : "top-6"
                                                    }`}
                                            >
                                                <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition">
                                                    View
                                                </button>
                                                <button className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 transition">
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
