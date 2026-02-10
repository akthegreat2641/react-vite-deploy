import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const category = searchParams.get("category")

        if (!category) {
            return NextResponse.json({ error: "Category is required" }, { status: 400 })
        }

        const slug = `${category.toLowerCase()}-header`

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
        console.error("Error fetching sub-content:", error)
        return NextResponse.json({ error: "Failed to fetch sub-content" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { category, sections } = body

        if (!category) {
            return NextResponse.json({ error: "Category is required" }, { status: 400 })
        }

        const slug = `${category.toLowerCase()}-header`

        // Upsert the page
        const page = await prisma.page.upsert({
            where: { slug },
            update: {
                // We delete existing sections and recreate them to handle reordering/deletions easily
                sections: {
                    deleteMany: {},
                    create: sections.map((s: any, index: number) => ({
                        title: s.title || `Section ${index + 1}`,
                        content: s.content,
                        order: index,
                        type: "INFO", // Default type
                    })),
                },
            },
            create: {
                title: `${category} Header`,
                slug,
                category: "System", // Mark as system page
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
        console.error("Error saving sub-content:", error)
        return NextResponse.json({ error: "Failed to save sub-content" }, { status: 500 })
    }
}
