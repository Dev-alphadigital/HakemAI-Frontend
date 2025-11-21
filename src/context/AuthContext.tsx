"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
    username: string;
    email: string;
    phoneNumber: string;
    role: string;
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

    const refreshUser = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            const res = await fetch("http://localhost:5000/api/auth/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            setUser(data);
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
