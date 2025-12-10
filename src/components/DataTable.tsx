"use client";
import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { loadComparisonData } from "@/utils/comparisonSync";

export default function DataTable() {
    const [search, setSearch] = useState("");
    const [tableData, setTableData] = useState<any[]>([]);

    useEffect(() => {
        const loadTableData = async () => {
            try {
                const response = await loadComparisonData();
                if (!response) return;

                const providers = response.provider_cards || [];

                // Find Coverage chart
                const coverageChart = response.analytics?.charts?.find(
                    (chart: any) => chart.title === "Coverage Features Comparison"
                );

                const coverageData = coverageChart?.data || [];

                const transformed = providers.map((provider: any) => {
                    const coverage = coverageData.find(
                        (item: any) => item.provider === provider.provider_name
                    );

                    return {
                        name: provider.provider_name,
                        score: `${provider.score.toFixed(1)}%`,
                        premium: provider.premium.replace("SAR ", ""),
                        rate: provider.rate.replace("‰", "").replace("%", ""),
                        coverage: provider.coverage_limit || "N/A",
                        benefits: coverage?.benefits || 0,
                        exclusions: coverage?.exclusions || 0,
                        warranties: coverage?.warranties || 0,
                        rank: provider.rank,
                    };
                });

                setTableData(transformed);
            } catch (err) {
                console.error("Error loading table data:", err);
            }
        };

        loadTableData();
    }, []);

    const filteredData = tableData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

            {/* ===== Table Header ===== */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-gray-200 gap-3">
                <h2 className="font-semibold text-lg text-gray-800">Data Table</h2>

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
                            <th className="px-4 py-3">Provider</th>
                            <th className="px-4 py-3">Score</th>
                            <th className="px-4 py-3">Premium</th>
                            <th className="px-4 py-3">Rate</th>
                            {/* <th className="px-4 py-3">Coverage</th> */}
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
                                <td className="px-4 py-3 font-semibold">{row.premium} SAR</td>
                                <td className="px-4 py-3">{row.rate}</td>
                                {/* <td className="px-4 py-3">{row.coverage}</td> */}
                                <td className="px-4 py-3">{row.benefits}</td>
                                <td className="px-4 py-3">{row.exclusions}</td>
                                <td className="px-4 py-3">{row.warranties}</td>
                                <td className="px-4 py-3">{row.rank}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ===== Mobile Cards ===== */}
            <div className="block md:hidden divide-y divide-gray-200">
                {filteredData.map((row, idx) => (
                    <div key={idx} className="p-4 hover:bg-[#f9fdfa] transition">

                        <div className="grid grid-cols-2 gap-y-1 text-sm text-gray-700">
                            <p className="font-bold">Name:</p>
                            <p className="font-bold">{row.name}</p>

                            <p className="font-medium">Score:</p>
                            <p>{row.score}</p>

                            <p className="font-medium">Premium:</p>
                            <p className="font-semibold">{row.premium} SAR</p>

                            <p className="font-medium">Rate:</p>
                            <p>{row.rate}</p>

                            {/* <p className="font-medium">Coverage:</p> */}
                            {/* <p>{row.coverage}</p> */}

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
