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
      login: "bg-green-100 text-green-800",
      logout: "bg-gray-100 text-gray-800",
      signup: "bg-blue-100 text-blue-800",
      comparison_created: "bg-purple-100 text-purple-800",
      account_frozen: "bg-red-100 text-red-800",
      account_unfrozen: "bg-green-100 text-green-800",
      password_change: "bg-yellow-100 text-yellow-800",
      subscription_activated: "bg-indigo-100 text-indigo-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminTopbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors cursor-pointer"
          >
            <FaArrowLeft />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
          <p className="mt-2 text-gray-600">View and monitor all user activities</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity Type
              </label>
              <select
                value={activityType}
                onChange={(e) => {
                  setActivityType(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
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
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
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
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Activities</h3>
                    <p className="text-3xl font-bold text-blue-600">{statistics.totalActivities}</p>
                  </div>

                  {/* Activities by Type */}
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">By Type</h3>
                    <div className="space-y-2">
                      {Object.entries(statistics.activitiesByType).map(([type, count]) => (
                        <div key={type} className="flex justify-between">
                          <span className="text-gray-600 capitalize">{type.replace(/_/g, " ")}</span>
                          <span className="font-semibold text-gray-900">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Users */}
                  <div className="bg-green-50 rounded-lg p-4 md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Top Active Users</h3>
                    <div className="space-y-2">
                      {statistics.topUsers.slice(0, 5).map((user, index) => (
                        <div key={user.userId} className="flex justify-between items-center">
                          <span className="text-gray-600">
                            {index + 1}. {user.username}
                          </span>
                          <span className="font-semibold text-gray-900">{user.count} activities</span>
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
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Activity Logs Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No activity logs found
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(log.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{log.username}</div>
                        <div className="text-sm text-gray-500">{log.userEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getActivityTypeColor(log.activityType)}`}>
                          {log.activityType.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {log.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.ipAddress || "N/A"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Page <span className="font-medium">{page}</span> of{" "}
                    <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                    >
                      Next
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

