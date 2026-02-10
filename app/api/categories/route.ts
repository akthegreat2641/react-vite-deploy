import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: "asc",
            },
        })
        return NextResponse.json(categories)
    } catch (error) {
        console.error("Failed to fetch categories:", error)
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, icon } = body

        if (!name) {
            return NextResponse.json(
                { error: "Name is required" },
                { status: 400 }
            )
        }

        const category = await prisma.category.create({
            data: {
                name,
                icon,
            },
        })

        return NextResponse.json(category)
    } catch (error: any) {
        console.error("Failed to create category:", error)
        return NextResponse.json(
            { error: "Failed to create category", details: error.message },
            { status: 500 }
        )
    }
}
