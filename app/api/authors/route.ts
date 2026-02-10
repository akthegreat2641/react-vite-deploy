import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        const authors = await prisma.author.findMany({
            orderBy: { createdAt: "desc" },
        })
        return NextResponse.json(authors)
    } catch (error) {
        console.error("Failed to fetch authors:", error)
        return NextResponse.json({ error: "Failed to fetch authors" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const {
            name,
            image,
            description,
            designation,
            facebook,
            twitter,
            linkedin,
            instagram,
        } = body

        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 })
        }

        const author = await prisma.author.create({
            data: {
                name,
                image,
                description,
                designation,
                facebook,
                twitter,
                linkedin,
                instagram,
            },
        })

        return NextResponse.json(author)
    } catch (error) {
        console.error("Failed to create author:", error)
        return NextResponse.json({ error: "Failed to create author" }, { status: 500 })
    }
}
