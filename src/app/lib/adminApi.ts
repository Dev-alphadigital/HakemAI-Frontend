export const API_BASE = "http://localhost:5000/api";

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
        const res = await fetch(`${API_BASE}/admin/login`, {
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
    const res = await fetch(`${API_BASE}/admin/statistics`, {
        headers: getAuthHeaders(),
    });
    return handleResponse<Statistics>(res);
}

// ============= USER MANAGEMENT =============
export async function getAllUsers(): Promise<User[]> {
    const res = await fetch(`${API_BASE}/admin/allusers`, {
        headers: getAuthHeaders(),
    });
    const data = await handleResponse<any>(res);
    // Handle both array response and object with data property
    return Array.isArray(data) ? data : (data.users || data.data || []);
}

export async function getPendingUsers(): Promise<User[]> {
    const res = await fetch(`${API_BASE}/admin/pending-users`, {
        headers: getAuthHeaders(),
    });
    const data = await handleResponse<any>(res);
    // Handle both array response and object with data property
    return Array.isArray(data) ? data : (data.users || data.data || []);
}

export async function getUserById(userId: string): Promise<User> {
    const res = await fetch(`${API_BASE}/admin/users/${userId}`, {
        headers: getAuthHeaders(),
    });
    return handleResponse<User>(res);
}

// ============= ACCOUNT ACTIONS =============
export async function activateAccount(userId: string, plan?: SubscriptionPlan): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/users/${userId}/activate`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ plan }),
    });
    return handleResponse(res);
}

export async function assignPlan(userId: string, plan: SubscriptionPlan): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/users/${userId}/assign-plan`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ plan }),
    });
    return handleResponse(res);
}

export async function freezeAccount(userId: string): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/users/${userId}/freeze`, {
        method: "POST",
        headers: getAuthHeaders(),
    });
    return handleResponse(res);
}

export async function unfreezeAccount(userId: string): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/users/${userId}/unfreeze`, {
        method: "POST",
        headers: getAuthHeaders(),
    });
    return handleResponse(res);
}

// ============= PAYMENT PROOF =============
export async function getUserPaymentProof(userId: string): Promise<PaymentProof> {
    const res = await fetch(`${API_BASE}/admin/users/${userId}/payment-proof`, {
        headers: getAuthHeaders(),
    });
    return handleResponse<PaymentProof>(res);
}

export async function downloadPaymentProof(userId: string): Promise<Blob> {
    const token = getAdminToken();
    const res = await fetch(`${API_BASE}/admin/users/${userId}/payment-proof/download`, {
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
    return `${API_BASE}/admin/users/${userId}/payment-proof/download`;
}

