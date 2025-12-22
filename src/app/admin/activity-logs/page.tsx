"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminTopbar from "@/components/Admin/AdminTopbar";
import { getActivityLogs, getActivityStatistics, getAdminToken } from "@/app/lib/adminApi";
import { FaArrowLeft } from "react-icons/fa";

interface ActivityLog {
  _id: string;
  userId: string;
  userEmail: string;
  username: string;
  activityType: string;
  description: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

interface ActivityStatistics {
  totalActivities: number;
  activitiesByType: Record<string, number>;
  topUsers: Array<{ userId: string; username: string; count: number }>;
  activitiesByDay: Array<{ date: string; count: number }>;
}

export default function ActivityLogsPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [statistics, setStatistics] = useState<ActivityStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [activityType, setActivityType] = useState("");
  const [showStatistics, setShowStatistics] = useState(false);

  useEffect(() => {
    // Check authentication using token directly
    const token = getAdminToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchLogs();
  }, [router, page, search, activityType]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getActivityLogs({ page, limit: 50, search, activityType });
      setLogs(data.logs || []);
      setTotalPages(data.totalPages || 1);
    } catch (err: any) {
      setError(err.message || "Failed to fetch activity logs");
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const stats = await getActivityStatistics();
      setStatistics(stats);
      setShowStatistics(true);
    } catch (err: any) {
      setError(err.message || "Failed to fetch statistics");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getActivityTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      login: "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200",
      logout: "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200",
      signup: "bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 border border-teal-200",
      comparison_created: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200",
      account_frozen: "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200",
      account_unfrozen: "bg-gradient-to-r from-green-100 to-lime-100 text-green-800 border border-green-200",
      password_change: "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200",
      subscription_activated: "bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 border border-indigo-200",
    };
    return colors[type] || "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200";
  };

  return (
    <div className="min-h-screen bg-[#e8f1ed] m-0 p-0">
      <AdminTopbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="flex items-center gap-2 text-teal-700 hover:text-teal-900 mb-4 transition-colors cursor-pointer font-medium"
          >
            <FaArrowLeft />
            <span>Back to Dashboard</span>
          </button>
          <div className="bg-gradient-to-r from-[#1eaca8] to-[#14b8a6] rounded-2xl p-8 shadow-lg">
            <h1 className="text-4xl font-bold text-white mb-2">Activity Logs</h1>
            <p className="text-white/90 text-lg">Monitor all user activities, logins, and key actions in real-time</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-teal-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by email, username..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Activity Type
              </label>
              <select
                value={activityType}
                onChange={(e) => {
                  setActivityType(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 cursor-pointer transition-all"
              >
                <option value="">All Types</option>
                <option value="login">Login</option>
                <option value="logout">Logout</option>
                <option value="signup">Signup</option>
                <option value="comparison_created">Comparison Created</option>
                <option value="account_frozen">Account Frozen</option>
                <option value="account_unfrozen">Account Unfrozen</option>
                <option value="password_change">Password Change</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={fetchStatistics}
                className="w-full px-4 py-3 bg-gradient-to-r from-[#1eaca8] to-[#14b8a6] hover:from-[#189b97] hover:to-[#0d9488] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                View Statistics
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Modal */}
        {showStatistics && statistics && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Activity Statistics</h2>
                  <button
                    onClick={() => setShowStatistics(false)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Total Activities */}
                  <div className="bg-gradient-to-br from-teal-50 to-emerald-100 rounded-xl p-6 border-2 border-[#1eaca8]/20 shadow-md">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      Total Activities
                    </h3>
                    <p className="text-4xl font-bold text-teal-700">{statistics.totalActivities}</p>
                  </div>

                  {/* Activities by Type */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border-2 border-purple-200 shadow-md">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                      By Type
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(statistics.activitiesByType).map(([type, count]) => (
                        <div key={type} className="flex justify-between items-center bg-white rounded-lg px-3 py-2">
                          <span className="text-gray-700 capitalize font-medium">{type.replace(/_/g, " ")}</span>
                          <span className="font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Users */}
                  <div className="bg-gradient-to-br from-green-50 to-lime-100 rounded-xl p-6 md:col-span-2 border-2 border-green-200 shadow-md">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      Top Active Users
                    </h3>
                    <div className="space-y-2">
                      {statistics.topUsers.slice(0, 5).map((user, index) => (
                        <div key={user.userId} className="flex justify-between items-center bg-white rounded-lg px-4 py-3 hover:shadow-md transition-shadow">
                          <span className="text-gray-700 font-medium">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#1eaca8] to-[#14b8a6] text-white font-bold mr-3">
                              {index + 1}
                            </span>
                            {user.username}
                          </span>
                          <span className="font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">{user.count} activities</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Activity Logs Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-teal-100">
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 px-6 py-4 border-b border-teal-100">
            <h3 className="text-lg font-bold text-gray-900">Recent Activities</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-[#1eaca8] to-[#14b8a6]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-200 border-t-teal-600 mb-4"></div>
                        <p className="text-gray-600 font-medium">Loading activity logs...</p>
                      </div>
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-500 font-medium text-lg">No activity logs found</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  logs.map((log, index) => (
                    <tr key={log._id} className={`hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {formatDate(log.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">{log.username}</div>
                        <div className="text-sm text-teal-600">{log.userEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-bold rounded-full ${getActivityTypeColor(log.activityType)} shadow-sm`}>
                          {log.activityType.replace(/_/g, " ").toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {log.description}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 px-4 py-4 flex items-center justify-between border-t-2 border-teal-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-4 py-2 border-2 border-teal-300 text-sm font-semibold rounded-lg text-teal-700 bg-white hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all shadow-sm"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border-2 border-teal-300 text-sm font-semibold rounded-lg text-teal-700 bg-white hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all shadow-sm"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Page <span className="text-teal-600 font-bold text-lg">{page}</span> of{" "}
                    <span className="text-teal-600 font-bold text-lg">{totalPages}</span>
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-lg shadow-sm gap-2">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="relative inline-flex items-center px-4 py-2 rounded-lg border-2 border-teal-300 bg-white text-sm font-semibold text-teal-700 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="relative inline-flex items-center px-4 py-2 rounded-lg border-2 border-teal-300 bg-white text-sm font-semibold text-teal-700 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
                    >
                      Next →
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

