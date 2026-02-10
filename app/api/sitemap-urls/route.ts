import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const urls = await prisma.sitemapUrl.findMany({
            orderBy: { createdAt: "desc" },
        })
        return NextResponse.json(urls)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch URLs" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const { url, lastModified } = await req.json()
        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 })
        }

        const newUrl = await prisma.sitemapUrl.create({
            data: {
                url,
                lastModified: lastModified ? new Date(lastModified) : new Date(),
            },
        })
        return NextResponse.json(newUrl)
    } catch (error) {
        return NextResponse.json({ error: "Failed to create URL" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 })
        }

        await prisma.sitemapUrl.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete URL" }, { status: 500 })
    }
}
