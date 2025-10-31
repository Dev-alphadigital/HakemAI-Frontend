// "use client";
// import { useState } from "react";
// import { Search, Filter } from "lucide-react";

// export default function DataTable() {
//     const [search, setSearch] = useState("");

//     const data = [
//         {
//             name: "Provider 1",
//             score: "77.0%",
//             premium: "516,335",
//             rate: "0.33%",
//             coverage: "1,555,222,333",
//             benefits: 0,
//             exclusions: 13,
//             warranties: 4,
//             rank: 1,
//         },
//         {
//             name: "Provider 2",
//             score: "77.0%",
//             premium: "516,335",
//             rate: "0.33%",
//             coverage: "1,555,222,333",
//             benefits: 0,
//             exclusions: 13,
//             warranties: 4,
//             rank: 2,
//         },
//         {
//             name: "Provider 3",
//             score: "77.0%",
//             premium: "516,335",
//             rate: "0.33%",
//             coverage: "1,555,222,333",
//             benefits: 0,
//             exclusions: 13,
//             warranties: 4,
//             rank: 3,
//         },
//     ];

//     const filteredData = data.filter((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
//             {/* ===== Table Header ===== */}
//             <div className="flex justify-between items-center p-4 border-b border-gray-200">
//                 <h2 className="font-semibold text-lg text-gray-800">Data Table</h2>

//                 {/* Search and Filter */}
//                 <div className="flex items-center gap-2">
//                     <div className="relative">
//                         <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
//                         <input
//                             type="text"
//                             placeholder="Search"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             className="pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#04786b]"
//                         />
//                     </div>
//                     <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition">
//                         <Filter className="w-4 h-4 text-gray-600" />
//                     </button>
//                 </div>
//             </div>

//             {/* ===== Table ===== */}
//             <div className="overflow-x-auto">
//                 <table className="w-full text-left text-sm text-gray-700">
//                     <thead className="bg-[#f5f7f6] text-gray-600">
//                         <tr>
//                             <th className="px-4 py-3">Provider Name</th>
//                             <th className="px-4 py-3">Score</th>
//                             <th className="px-4 py-3">Premium</th>
//                             <th className="px-4 py-3">Rate</th>
//                             <th className="px-4 py-3">Coverage</th>
//                             <th className="px-4 py-3">Benefits</th>
//                             <th className="px-4 py-3">Exclusions</th>
//                             <th className="px-4 py-3">Warranties</th>
//                             <th className="px-4 py-3">Rank</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {filteredData.map((row, idx) => (
//                             <tr
//                                 key={idx}
//                                 className="border-t border-gray-200 hover:bg-[#f9fdfa] transition"
//                             >
//                                 <td className="px-4 py-3 font-medium text-[#04786b]">{row.name}</td>
//                                 <td className="px-4 py-3">{row.score}</td>
//                                 <td className="px-4 py-3 font-semibold">{row.premium}</td>
//                                 <td className="px-4 py-3">{row.rate}</td>
//                                 <td className="px-4 py-3">{row.coverage}</td>
//                                 <td className="px-4 py-3">{row.benefits}</td>
//                                 <td className="px-4 py-3">{row.exclusions}</td>
//                                 <td className="px-4 py-3">{row.warranties}</td>
//                                 <td className="px-4 py-3">{row.rank}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }
"use client";
import { useState } from "react";
import { Search, Filter } from "lucide-react";

export default function DataTable() {
    const [search, setSearch] = useState("");

    const data = [
        {
            name: "Provider 1",
            score: "77.0%",
            premium: "516,335",
            rate: "0.33%",
            coverage: "1,555,222,333",
            benefits: 0,
            exclusions: 13,
            warranties: 4,
            rank: 1,
        },
        {
            name: "Provider 2",
            score: "77.0%",
            premium: "516,335",
            rate: "0.31%",
            coverage: "1,555,222,333",
            benefits: 0,
            exclusions: 13,
            warranties: 4,
            rank: 2,
        },
        {
            name: "Provider 3",
            score: "77.0%",
            premium: "516,335",
            rate: "0.29%",
            coverage: "1,555,222,333",
            benefits: 0,
            exclusions: 13,
            warranties: 4,
            rank: 3,
        },
    ];

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {/* ===== Table Header ===== */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-gray-200 gap-3">
                <h2 className="font-semibold text-lg text-gray-800">Data Table</h2>

                {/* Search and Filter */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 pr-3 py-2 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#04786b]"
                        />
                    </div>
                    <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition">
                        <Filter className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* ===== Desktop Table ===== */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-700">
                    <thead className="bg-[#f5f7f6] text-gray-600">
                        <tr>

                            <th className="px-4 py-3">Provider Name</th>
                            <th className="px-4 py-3">Score</th>
                            <th className="px-4 py-3">Premium</th>
                            <th className="px-4 py-3">Rate</th>
                            <th className="px-4 py-3">Coverage</th>
                            <th className="px-4 py-3">Benefits</th>
                            <th className="px-4 py-3">Exclusions</th>
                            <th className="px-4 py-3">Warranties</th>
                            <th className="px-4 py-3">Rank</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredData.map((row, idx) => (
                            <tr
                                key={idx}
                                className="border-t border-gray-200 hover:bg-[#f9fdfa] transition"
                            >

                                <td className="px-4 py-3 font-medium text-[#04786b]">
                                    {row.name}
                                </td>
                                <td className="px-4 py-3">{row.score}</td>
                                <td className="px-4 py-3 font-semibold">{row.premium}</td>
                                <td className="px-4 py-3">{row.rate}</td>
                                <td className="px-4 py-3">{row.coverage}</td>
                                <td className="px-4 py-3">{row.benefits}</td>
                                <td className="px-4 py-3">{row.exclusions}</td>
                                <td className="px-4 py-3">{row.warranties}</td>
                                <td className="px-4 py-3">{row.rank}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ===== Mobile Responsive Cards ===== */}
            <div className="block md:hidden divide-y divide-gray-200">
                {filteredData.map((row, idx) => (
                    <div key={idx} className="p-4 hover:bg-[#f9fdfa] transition">

                        <div className="grid grid-cols-2 gap-y-1 text-sm text-gray-700">
                            <p className="font-medium">Score:</p>
                            <p>{row.score}</p>
                            <p className="font-medium">Premium:</p>
                            <p className="font-semibold">{row.premium}</p>
                            <p className="font-medium">Rate:</p>
                            <p>{row.rate}</p>
                            <p className="font-medium">Coverage:</p>
                            <p>{row.coverage}</p>
                            <p className="font-medium">Benefits:</p>
                            <p>{row.benefits}</p>
                            <p className="font-medium">Exclusions:</p>
                            <p>{row.exclusions}</p>
                            <p className="font-medium">Warranties:</p>
                            <p>{row.warranties}</p>
                            <p className="font-medium">Rank:</p>
                            <p>{row.rank}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
