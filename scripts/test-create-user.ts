
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    const email = "testuser_" + Date.now() + "@example.com"
    const password = "password123"

    console.log("Hashing password...")
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("Password hashed.")

    console.log("Creating user...")
    const user = await prisma.user.create({
        data: {
            name: "Test User",
            email,
            password: hashedPassword,
            role: "user",
        },
    })
    console.log("User created:", user)
}

main()
    .catch(e => {
        console.error("Script failed:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
