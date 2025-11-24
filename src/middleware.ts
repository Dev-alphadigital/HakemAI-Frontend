import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("accessToken")?.value;
    const userCookie = req.cookies.get("user")?.value;

    const { pathname } = req.nextUrl;

    // ✅ Public routes (no auth required)
    const publicRoutes = ["/login", "/signup", "/"];

    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // ❌ No token → redirect to login
    if (!token) {
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    let user = null;

    // Try parsing user cookie
    try {
        user = userCookie ? JSON.parse(decodeURIComponent(userCookie)) : null;
    } catch {
        console.log("Failed to parse user cookie");
    }

    // ✅ If user is pending → Only allow plans-pricing
    if (user?.accountStatus === "pending") {
        if (!pathname.startsWith("/plans-pricing")) {
            const redirectUrl = new URL("/plans-pricing", req.url);
            return NextResponse.redirect(redirectUrl);
        }
        return NextResponse.next();
    }

    // ✅ User active → full access
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/plans-pricing",
        "/dashboard",
        "/dashboard/fileUploads",
        "/dashboard/my-documents",
    ],
};
