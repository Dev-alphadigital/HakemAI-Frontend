const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// ============= TYPES =============
export interface AdminLoginData {
    email: string;
    password: string;
}

export interface AdminLoginResponse {
    accessToken: string;
    refreshToken: string;
    admin: {
        id: string;
        email: string;
        username: string;
        role: string;
    };
}

export interface User {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
    role: string;
    isActive: boolean;
    accountStatus: string;
    subscription?: {
        plan: string;
        status: string;
        startDate?: string;
        endDate?: string;
    };
    createdAt: string;
    updatedAt: string;
    subscriptionPlan: string;
}

export interface Statistics {
    totalUsers: number;
    activeUsers: number;
    pendingUsers: number;
    frozenUsers: number;
    totalRevenue?: number;
}

export interface PaymentProof {
    _id: string;
    userId: string;
    filename: string;
    uploadedAt: string;
    status: string;
    url?: string;
}

export enum SubscriptionPlan {
    STARTER = 'starter',
    PROFESSIONAL = 'professional',
    ENTERPRISE = 'enterprise', // Also displayed as "Premium" in UI
}

// ============= HELPER FUNCTIONS =============
function getAuthHeaders() {
    const token = localStorage.getItem("adminAccessToken");
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
}

async function handleResponse<T>(res: Response): Promise<T> {
    const data = await res.json();
    if (!res.ok) {
        throw {
            message: data?.message || data?.error || "Request failed",
            statusCode: res.status,
            ...data
        };
    }
    return data;
}

// ============= ADMIN AUTH =============
export async function adminLogin(loginData: AdminLoginData): Promise<AdminLoginResponse> {
    try {
        const res = await fetch(`${API_BASE}/api/admin/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
        });
        return handleResponse<AdminLoginResponse>(res);
    } catch (err: any) {
        // Handle network errors
        if (err instanceof TypeError && err.message.includes('fetch')) {
            throw {
                message: "Cannot connect to server. Please ensure the backend is running at " + API_BASE,
                statusCode: 0
            };
        }
        throw err;
    }
}

export function saveAdminToken(token: string) {
    localStorage.setItem("adminAccessToken", token);
}

export function getAdminToken(): string | null {
    return localStorage.getItem("adminAccessToken");
}

export function removeAdminToken() {
    localStorage.removeItem("adminAccessToken");
}

// ============= STATISTICS =============
export async function getStatistics(): Promise<Statistics> {
    const res = await fetch(`${API_BASE}/api/admin/statistics`, {
        headers: getAuthHeaders(),
    });
    return handleResponse<Statistics>(res);
}

// ============= USER MANAGEMENT =============
export async function getAllUsers(): Promise<User[]> {
    const res = await fetch(`${API_BASE}/api/admin/allusers`, {
        headers: getAuthHeaders(),
    });
    const data = await handleResponse<any>(res);
    // Handle both array response and object with data property
    return Array.isArray(data) ? data : (data.users || data.data || []);
}

export async function getPendingUsers(): Promise<User[]> {
    const res = await fetch(`${API_BASE}/api/admin/pending-users`, {
        headers: getAuthHeaders(),
    });
    const data = await handleResponse<any>(res);
    // Handle both array response and object with data property
    return Array.isArray(data) ? data : (data.users || data.data || []);
}

export async function getUserById(userId: string): Promise<User> {
    const res = await fetch(`${API_BASE}/api/admin/users/${userId}`, {
        headers: getAuthHeaders(),
    });
    return handleResponse<User>(res);
}

// ============= ACCOUNT ACTIONS =============
export async function activateAccount(userId: string, plan?: SubscriptionPlan): Promise<any> {
    const res = await fetch(`${API_BASE}/api/admin/users/${userId}/activate`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ plan }),
    });
    return handleResponse(res);
}

export async function assignPlan(userId: string, plan: SubscriptionPlan): Promise<any> {
    const res = await fetch(`${API_BASE}/api/admin/users/${userId}/assign-plan`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ plan }),
    });
    return handleResponse(res);
}

export async function freezeAccount(userId: string): Promise<any> {
    const res = await fetch(`${API_BASE}/api/admin/users/${userId}/freeze`, {
        method: "POST",
        headers: getAuthHeaders(),
    });
    return handleResponse(res);
}

export async function unfreezeAccount(userId: string): Promise<any> {
    const res = await fetch(`${API_BASE}/api/admin/users/${userId}/unfreeze`, {
        method: "POST",
        headers: getAuthHeaders(),
    });
    return handleResponse(res);
}

// ============= PAYMENT PROOF =============
export async function getUserPaymentProof(userId: string): Promise<PaymentProof> {
    const res = await fetch(`${API_BASE}/api/admin/users/${userId}/payment-proof`, {
        headers: getAuthHeaders(),
    });
    return handleResponse<PaymentProof>(res);
}

export async function downloadPaymentProof(userId: string): Promise<Blob> {
    const token = getAdminToken();
    const res = await fetch(`${API_BASE}/api/admin/users/${userId}/payment-proof/download`, {
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!res.ok) {
        const data = await res.json();
        throw data;
    }

    return res.blob();
}

export function getPaymentProofUrl(userId: string): string {
    return `${API_BASE}/api/admin/users/${userId}/payment-proof/download`;
}

// ============= HAKIM SCORES =============
export interface HakimScore {
    id: string;
    company_name: string;
    score: number; // 0.0 to 1.0
    score_display: number; // 0 to 100 (for display)
    tier?: string;
    rank?: number;
    aliases?: string[];
    is_zero?: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface BulkScoreUpdateItem {
    company_name: string;
    score: number; // 0.0 to 1.0
}

export interface BulkScoreUpdateRequest {
    updates: BulkScoreUpdateItem[];
}

export interface HakimScoresResponse {
    success: boolean;
    count: number;
    total_companies: number;
    companies: HakimScore[];
    sort_by?: string;
    sort_order?: string;
}

export interface BulkScoreUpdateResponse {
    success: boolean;
    message: string;
    summary: {
        updated: number;
        failed: number;
        total: number;
    };
    results: Array<{
        company_name: string;
        status: string;
        success: boolean;
        error?: string;
    }>;
}

/**
 * Get all Hakim scores (companies and their scores)
 * Note: Hakim scores API is on FastAPI, not NestJS backend
 */
export async function getAllHakimScores(
    sortBy: string = "company_name",
    sortOrder: string = "asc",
    includeZero: boolean = true
): Promise<HakimScoresResponse> {
    const FASTAPI_BASE = process.env.NEXT_PUBLIC_FASTAPI_API || "http://localhost:8000";
    const params = new URLSearchParams({
        sort_by: sortBy,
        sort_order: sortOrder,
        include_zero: includeZero.toString(),
    });
    
    const res = await fetch(`${FASTAPI_BASE}/api/admin/hakim-scores?${params.toString()}`, {
        headers: {
            "Content-Type": "application/json",
            // Note: FastAPI endpoints may not require auth, but if they do, add token here
        },
    });
    return handleResponse<HakimScoresResponse>(res);
}

/**
 * Bulk update Hakim scores (optimized for scoring page)
 * Note: Hakim scores API is on FastAPI, not NestJS backend
 */
export async function bulkUpdateHakimScores(
    updates: BulkScoreUpdateItem[]
): Promise<BulkScoreUpdateResponse> {
    const FASTAPI_BASE = process.env.NEXT_PUBLIC_FASTAPI_API || "http://localhost:8000";
    const res = await fetch(`${FASTAPI_BASE}/api/admin/hakim-scores/bulk-update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            // Note: FastAPI endpoints may not require auth, but if they do, add token here
        },
        body: JSON.stringify({ updates }),
    });
    return handleResponse<BulkScoreUpdateResponse>(res);
}

