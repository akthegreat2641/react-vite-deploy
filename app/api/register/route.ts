import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

// Validation Schema
const registerSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    mobile: z.string().min(10, "Invalid mobile number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    stream: z.string().optional(),
    level: z.string().optional()
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const result = registerSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json(
                { message: "Invalid input", errors: result.error.flatten() },
                { status: 400 }
            )
        }

        const { name, email, mobile, password, stream, level } = result.data

        // Check if user exists (Check ID/Email/Mobile)
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { mobile }
                ]
            }
        })

        if (existingUser) {
            if (existingUser.email === email) {
                return NextResponse.json({ message: "Email already exists" }, { status: 409 })
            }
            if (existingUser.mobile === mobile) {
                return NextResponse.json({ message: "Mobile number already exists" }, { status: 409 })
            }
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create User
        const user = await prisma.user.create({
            data: {
                name,
                email,
                mobile,
                password: hashedPassword,
                stream,
                level,
                role: "user"
            }
        })

        // Exclude password from response
        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json(
            { message: "User registered successfully", user: userWithoutPassword },
            { status: 201 }
        )

    } catch (error) {
        console.error("Registration Error:", error)
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}
