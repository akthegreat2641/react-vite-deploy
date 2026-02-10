import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const slug = searchParams.get("slug")

        if (!slug) {
            return NextResponse.json({ error: "Slug is required" }, { status: 400 })
        }

        const page = await prisma.page.findUnique({
            where: { slug },
            include: {
                sections: {
                    orderBy: { order: "asc" },
                },
            },
        })

        if (!page) {
            return NextResponse.json([])
        }

        return NextResponse.json(page.sections)
    } catch (error) {
        console.error("Error fetching slug-content:", error)
        return NextResponse.json({ error: "Failed to fetch slug-content" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { slug, sections, title } = body

        if (!slug) {
            return NextResponse.json({ error: "Slug is required" }, { status: 400 })
        }

        // Upsert the page
        const page = await prisma.page.upsert({
            where: { slug },
            update: {
                sections: {
                    deleteMany: {},
                    create: sections.map((s: any, index: number) => ({
                        title: s.title || `Section ${index + 1}`,
                        content: s.content,
                        order: index,
                        type: "INFO",
                    })),
                },
            },
            create: {
                title: title || `${slug} Content`,
                slug,
                category: "System",
                published: true,
                sections: {
                    create: sections.map((s: any, index: number) => ({
                        title: s.title || `Section ${index + 1}`,
                        content: s.content,
                        order: index,
                        type: "INFO",
                    })),
                },
            },
            include: {
                sections: true,
            },
        })

        return NextResponse.json(page.sections)
    } catch (error) {
        console.error("Error saving slug-content:", error)
        return NextResponse.json({ error: "Failed to save slug-content" }, { status: 500 })
    }
}
