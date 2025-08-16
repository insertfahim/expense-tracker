import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function middleware(request: NextRequest) {
    // Only protect API routes that require authentication
    if (request.nextUrl.pathname.startsWith("/api/expenses")) {
        const authHeader = request.headers.get("authorization");

        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        const token = authHeader.substring(7);
        const user = await verifyToken(token);

        if (!user) {
            return NextResponse.json(
                { error: "Invalid or expired token" },
                { status: 401 }
            );
        }

        // Add user info to headers for API routes to use
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-user-id", user.id);
        requestHeaders.set("x-user-email", user.email);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/expenses/:path*"],
};
