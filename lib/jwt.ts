import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
}

// Generate JWT token
export async function generateToken(user: User): Promise<string> {
    return new SignJWT({
        userId: user.id,
        email: user.email,
        name: user.name,
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(JWT_SECRET);
}

// Verify JWT token
export async function verifyToken(token: string): Promise<User | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return {
            id: payload.userId as string,
            email: payload.email as string,
            name: payload.name as string,
            createdAt: "",
        };
    } catch {
        return null;
    }
}

// Get user from request headers
export async function getUserFromRequest(
    request: Request
): Promise<User | null> {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
        return null;
    }

    const token = authHeader.substring(7);
    return verifyToken(token);
}
