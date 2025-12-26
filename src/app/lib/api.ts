// Use environment variables with fallback for development
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
const FASTAPI_BASE = process.env.NEXT_PUBLIC_FASTAPI_API || "http://localhost:8000";

export async function apiPost(path: string, body: any) {
    const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) throw data;
    return data;
}

// ============= ACTIVITY LOGGING =============
export interface ActivityLogData {
    userId: string;
    activityType: string;
    description: string;
    userEmail?: string;
    username?: string;
    ipAddress?: string;
    userAgent?: string;
    metadata?: Record<string, any>;
}

/**
 * Log user activity to FastAPI backend
 * This is a fire-and-forget function - errors are logged but not thrown
 */
export async function logActivity(activityData: ActivityLogData): Promise<void> {
    try {
        await fetch(`${FASTAPI_BASE}/api/activity-logs/create`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify(activityData),
        });
        // Don't throw errors - activity logging should not break user flow
    } catch (error) {
        console.error("Failed to log activity:", error);
    }
}