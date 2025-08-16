import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import {
    verifyPassword,
    generateToken,
    type User as UserType,
} from "@/lib/auth";

export const runtime = "nodejs";

const USERS_FILE = ""; // Not used anymore

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validation
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        await dbConnect();

        console.log("[v0] Login API - looking for email:", email);

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            console.log("[v0] Login API - user not found");
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Verify password
        const isValidPassword = await verifyPassword(password, user.password);
        console.log("[v0] Login API - password valid:", isValidPassword);

        if (!isValidPassword) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Generate token and return user (without password)
        const userWithoutPassword: UserType = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            createdAt: user.createdAt.toISOString(),
        };

        const token = await generateToken(userWithoutPassword);

        return NextResponse.json({
            user: userWithoutPassword,
            token,
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Failed to login" }, { status: 500 });
    }
}
