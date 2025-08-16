import { NextRequest } from "next/server";

// Simple in-memory store for rate limiting (use Redis in production)
const requests = new Map<string, { count: number; resetTime: number }>();

export interface RateLimitConfig {
    windowMs: number; // Time window in milliseconds
    max: number; // Max requests per window
    message?: string;
}

export const rateLimitConfigs = {
    auth: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 5, // 5 attempts per window
        message: "Too many login attempts, please try again later",
    },
    api: {
        windowMs: 60 * 1000, // 1 minute
        max: 60, // 60 requests per minute
        message: "Too many API requests, please slow down",
    },
};

export function createRateLimit(config: RateLimitConfig) {
    return (request: NextRequest): { allowed: boolean; message?: string } => {
        const key = getClientIdentifier(request);
        const now = Date.now();

        // Clean up expired entries
        for (const [k, v] of requests.entries()) {
            if (now > v.resetTime) {
                requests.delete(k);
            }
        }

        const clientData = requests.get(key);

        if (!clientData || now > clientData.resetTime) {
            // First request or window expired
            requests.set(key, {
                count: 1,
                resetTime: now + config.windowMs,
            });
            return { allowed: true };
        }

        if (clientData.count >= config.max) {
            return { allowed: false, message: config.message };
        }

        // Increment count
        clientData.count++;
        requests.set(key, clientData);

        return { allowed: true };
    };
}

function getClientIdentifier(request: NextRequest): string {
    // In production, use a more sophisticated method
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";
    const userAgent = request.headers.get("user-agent") || "";

    return `${ip}-${userAgent.substring(0, 50)}`;
}

export const authRateLimit = createRateLimit(rateLimitConfigs.auth);
export const apiRateLimit = createRateLimit(rateLimitConfigs.api);
