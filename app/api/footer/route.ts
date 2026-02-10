import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        let footer = await prisma.footerConfig.findFirst()
        if (!footer) {
            // Create default if not exists
            footer = await prisma.footerConfig.create({
                data: { id: "footer" }
            })
        }
        return NextResponse.json(footer)
    } catch (error) {
        console.error("GET Footer Error:", error)
        return NextResponse.json({ error: "Failed to fetch footer config" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Remove id if present to avoid prisma error on upsert/update
        const { id, ...data } = body

        const footer = await prisma.footerConfig.upsert({
            where: { id: "footer" },
            update: data,
            create: { ...data, id: "footer" }
        })
        return NextResponse.json(footer)
    } catch (error) {
        console.error("POST Footer Error:", error)
        return NextResponse.json({ error: "Failed to update footer config" }, { status: 500 })
    }
}
