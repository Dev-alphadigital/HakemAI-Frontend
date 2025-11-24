"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getAdminToken, removeAdminToken } from "@/app/lib/adminApi";

interface AdminUser {
    _id: string;
    username: string;
    email: string;
    role: string;
}

interface AdminAuthContextType {
    admin: AdminUser | null;
    loading: boolean;
    setAdmin: (admin: AdminUser | null) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
    admin: null,
    loading: true,
    setAdmin: () => { },
    logout: () => { },
    isAuthenticated: false,
});

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
    const [admin, setAdmin] = useState<AdminUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if admin token exists
        const token = getAdminToken();
        if (token) {
            // If token exists, we'll set the admin when they login
            // For now, just mark as not loading
            setLoading(false);
        } else {
            setAdmin(null);
            setLoading(false);
        }
    }, []);

    const logout = () => {
        removeAdminToken();
        setAdmin(null);
    };

    const isAuthenticated = admin !== null && getAdminToken() !== null;

    return (
        <AdminAuthContext.Provider value={{ admin, loading, setAdmin, logout, isAuthenticated }}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    return useContext(AdminAuthContext);
}