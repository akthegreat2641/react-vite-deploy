import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        const types = await prisma.careerType.findMany({
            orderBy: { name: "asc" },
        })
        return NextResponse.json(types)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch career types" },
            { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    try {
        const { name, image } = await req.json()

        if (!name) {
            return NextResponse.json(
                { error: "Name is required" },
                { status: 400 }
            )
        }

        const type = await prisma.careerType.create({
            data: { name, image },
        })

        return NextResponse.json(type)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create career type" },
            { status: 500 }
        )
    }
}
