import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const cities = await prisma.city.findMany({
            orderBy: { createdAt: "desc" },
        })
        return NextResponse.json(cities)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch cities" },
            { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    try {
        const json = await req.json()
        const city = await prisma.city.create({
            data: json,
        })
        return NextResponse.json(city)
    } catch (error) {
        console.error("Error creating city:", error)
        return NextResponse.json(
            { error: "Failed to create city" },
            { status: 500 }
        )
    }
}
