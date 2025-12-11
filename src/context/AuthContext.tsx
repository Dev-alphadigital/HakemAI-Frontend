"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
    _id?: string;  // MongoDB user ID (optional - from profile endpoint)
    id?: string;   // User ID from login response
    username: string;
    email: string;
    phoneNumber: string;
    role: string;
    isSubUser?: boolean;  // ✅ NEW: True if user is a team member (view-only)
    companyId?: string;   // ✅ NEW: Company ID for sub-users
    accountStatus?: string; // Account status (active, pending, frozen)
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    refreshUser: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

    const refreshUser = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            const res = await fetch(`${API_BASE}/api/auth/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            setUser(data);

            // Update cookies and localStorage with fresh user data
            // This ensures middleware has the latest user info (including isSubUser, accountStatus)
            localStorage.setItem("user", JSON.stringify(data));
            document.cookie = `user=${encodeURIComponent(JSON.stringify(data))}; path=/; max-age=604800`;
        } catch (err) {
            console.error("Profile load failed:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
