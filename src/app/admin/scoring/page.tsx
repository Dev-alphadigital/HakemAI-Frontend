"use client";

import AdminTopbar from "@/components/Admin/AdminTopbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { getAllHakimScores, bulkUpdateHakimScores, initializeHakimScores, HakimScore, BulkScoreUpdateItem } from "@/app/lib/adminApi";
import { FaFilter, FaSearch, FaSave, FaDatabase } from "react-icons/fa";

interface CompanyScore {
    company_name: string;
    score: number; // Display score (0-100)
    originalScore: number; // Original score from API (0.0-1.0)
    id: string;
    hasChanges: boolean;
}

export default function ScoringPage() {
    const router = useRouter();
    const { isAuthenticated } = useAdminAuth();
    const [companies, setCompanies] = useState<CompanyScore[]>([]);
    const [filteredCompanies, setFilteredCompanies] = useState<CompanyScore[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [initializing, setInitializing] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/admin/login");
            return;
        }
        fetchCompanies();
    }, [isAuthenticated, router]);

    useEffect(() => {
        // Filter companies based on search query
        if (!searchQuery.trim()) {
            setFilteredCompanies(companies);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = companies.filter((company) =>
                company.company_name.toLowerCase().includes(query)
            );
            setFilteredCompanies(filtered);
        }
    }, [searchQuery, companies]);

    const fetchCompanies = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await getAllHakimScores("company_name", "asc", true);
            
            const formattedCompanies: CompanyScore[] = response.companies.map((company) => ({
                company_name: company.company_name,
                score: company.score_display || company.score * 100, // Display as 0-100
                originalScore: company.score, // Store original 0.0-1.0 value
                id: company.id,
                hasChanges: false,
            }));
            
            setCompanies(formattedCompanies);
            setFilteredCompanies(formattedCompanies);
        } catch (err: any) {
            console.error("❌ Error fetching companies:", err);
            setError(err?.message || err?.error || "Failed to load companies");
            if (err?.statusCode === 401 || err?.status === 401) {
                router.push("/admin/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleScoreChange = (companyName: string, newScore: number) => {
        // Clamp score between 0 and 100
        const clampedScore = Math.max(0, Math.min(100, newScore));
        
        setCompanies((prev) => {
            const updated = prev.map((company) => {
                if (company.company_name === companyName) {
                    const hasChanges = clampedScore !== company.originalScore * 100;
                    return {
                        ...company,
                        score: clampedScore,
                        hasChanges,
                    };
                }
                return company;
            });
            
            // Check if there are any changes
            const anyChanges = updated.some((c) => c.hasChanges);
            setHasChanges(anyChanges);
            
            return updated;
        });
    };

    const handleInitialize = async () => {
        if (!confirm("Initialize database with default Hakim scores? This will populate the database with all insurance companies and their default scores.")) {
            return;
        }

        try {
            setInitializing(true);
            setError("");
            setSuccess("");

            const response = await initializeHakimScores();

            if (response.success) {
                setSuccess(`Successfully initialized! Created: ${response.created}, Updated: ${response.updated}`);
                // Refresh companies to show the initialized data
                await fetchCompanies();
                setTimeout(() => setSuccess(""), 5000);
            } else {
                setError("Failed to initialize scores");
            }
        } catch (err: any) {
            console.error("❌ Error initializing scores:", err);
            setError(err?.message || err?.error || "Failed to initialize scores");
        } finally {
            setInitializing(false);
        }
    };

    const handleSave = async () => {
        if (!hasChanges) {
            setSuccess("No changes to save");
            setTimeout(() => setSuccess(""), 3000);
            return;
        }

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            // Get only companies with changes
            const companiesWithChanges = companies.filter((c) => c.hasChanges);
            
            // Convert display scores (0-100) back to API format (0.0-1.0)
            const updates: BulkScoreUpdateItem[] = companiesWithChanges.map((company) => ({
                company_name: company.company_name,
                score: company.score / 100, // Convert from 0-100 to 0.0-1.0
            }));

            const response = await bulkUpdateHakimScores(updates);

            if (response.success) {
                setSuccess(`Successfully updated ${response.summary.updated} companies`);
                // Refresh companies to get updated data
                await fetchCompanies();
                setHasChanges(false);
                setTimeout(() => setSuccess(""), 5000);
            } else {
                setError("Failed to save changes");
            }
        } catch (err: any) {
            console.error("❌ Error saving scores:", err);
            setError(err?.message || err?.error || "Failed to save scores");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div>
                <AdminTopbar />
                <main className="min-h-screen px-4 md:px-10 text-gray-900 bg-gray-50">
                    <div className="flex items-center justify-center h-96">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
                            <p className="text-gray-500">Loading companies...</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div>
            <AdminTopbar />
            <main className="min-h-screen px-4 md:px-10 py-8 text-gray-900 bg-gray-50">
                {/* Title Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-2">
                        <button
                            onClick={() => router.push("/admin/dashboard")}
                            className="text-gray-600 hover:text-gray-900 transition"
                        >
                            ← Back to Dashboard
                        </button>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Hakem AI Scoring
                    </h1>
                    <p className="text-gray-600">View and edit company scores.</p>
                </div>

                {/* Error/Success Messages */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4">
                        {success}
                    </div>
                )}

                {/* Empty State - Show Initialize Button */}
                {companies.length === 0 && !loading && (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <FaDatabase className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Companies Found</h3>
                        <p className="text-gray-600 mb-6">
                            The Hakim Score database is empty. Initialize it with default scores to get started.
                        </p>
                        <button
                            onClick={handleInitialize}
                            disabled={initializing}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaDatabase />
                            {initializing ? "Initializing..." : "Initialize Database"}
                        </button>
                    </div>
                )}

                {/* Company List Header */}
                {companies.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <h2 className="text-xl font-bold text-gray-900">
                            All Companies ({companies.length})
                        </h2>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition text-gray-700">
                                <FaFilter className="text-sm" />
                            <span>Filters</span>
                        </button>
                        <div className="relative flex-1 sm:flex-initial">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Company Scores Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        Companies
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        Scores
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredCompanies.length === 0 ? (
                                    <tr>
                                        <td colSpan={2} className="px-6 py-8 text-center text-gray-500">
                                            {searchQuery ? "No companies found matching your search." : "No companies found."}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCompanies.map((company, index) => (
                                        <tr
                                            key={company.id || index}
                                            className={`hover:bg-gray-50 transition ${
                                                company.hasChanges ? "bg-yellow-50" : ""
                                            }`}
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {company.company_name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        step="0.1"
                                                        value={company.score}
                                                        onChange={(e) => {
                                                            const value = parseFloat(e.target.value) || 0;
                                                            handleScoreChange(company.company_name, value);
                                                        }}
                                                        className={`w-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                                                            company.hasChanges
                                                                ? "border-yellow-500 bg-yellow-50"
                                                                : "border-gray-300"
                                                        }`}
                                                    />
                                                    <span className="text-sm text-gray-500">/ 100</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Save Button */}
                {companies.length > 0 && (
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={!hasChanges || saving}
                            className={`flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-white transition ${
                                hasChanges && !saving
                                    ? "bg-teal-600 hover:bg-teal-700 cursor-pointer"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            <FaSave className="text-sm" />
                            <span>{saving ? "Saving..." : "Save"}</span>
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

