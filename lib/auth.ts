import bcrypt from "bcryptjs";
export {
    generateToken,
    verifyToken,
    getUserFromRequest,
    type User,
} from "./jwt";

export interface UserWithPassword {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    password: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

// Verify password
export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}
