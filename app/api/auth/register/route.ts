import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import { hashPassword, generateToken, type User as UserType } from "@/lib/auth";

export const runtime = "nodejs";

const USERS_FILE = ""; // Not used anymore

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        // Validation
        if (!name || name.length < 2) {
            return NextResponse.json(
                { error: "Name must be at least 2 characters long" },
                { status: 400 }
            );
        }

        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { error: "Please enter a valid email" },
                { status: 400 }
            );
        }

        if (!password || password.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters long" },
                { status: 400 }
            );
        }

        await dbConnect();

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists with this email" },
                { status: 409 }
            );
        }

        // Hash password and create user
        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        // Return user without password
        const userResponse: UserType = {
            id: savedUser._id.toString(),
            name: savedUser.name,
            email: savedUser.email,
            createdAt: savedUser.createdAt.toISOString(),
        };

        const token = await generateToken(userResponse);

        return NextResponse.json(
            {
                user: userResponse,
                token,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Failed to create user" },
            { status: 500 }
        );
    }
}
