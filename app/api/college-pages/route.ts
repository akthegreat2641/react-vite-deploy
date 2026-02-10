import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/college-pages?collegeId=...&slug=...
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const collegeId = searchParams.get("collegeId")
    const slug = searchParams.get("slug")

    const where: any = {}
    if (collegeId) where.collegeId = collegeId
    if (slug) where.slug = slug

    const pages = await prisma.collegePage.findMany({
      where: Object.keys(where).length ? where : undefined,
      include: {
        college: true,
        sections: {
          orderBy: { order: "asc" },
        },
        faqs: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    // If slug is provided, return a single page
    if (slug) {
      return NextResponse.json(pages[0] || null)
    }

    return NextResponse.json(pages)
  } catch (error) {
    console.error("Failed to fetch college pages:", error)
    return NextResponse.json({ error: "Failed to fetch college pages" }, { status: 500 })
  }
}

// POST /api/college-pages
// Creates a new college page with header, sections and FAQs
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      collegeId,
      slug,
      headerLogo,
      headerBgImage,
      authorName,
      brochureUrl,
      location,
      publishedAt,
      sections = [],
      faqs = [],
    } = body

    if (!collegeId || !slug) {
      return NextResponse.json({ error: "collegeId and slug are required" }, { status: 400 })
    }

    const page = await prisma.collegePage.create({
      data: {
        collegeId,
        slug,
        headerLogo,
        headerBgImage,
        authorName,
        brochureUrl,
        location,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        sections: {
          create: sections.map((section: any, index: number) => ({
            title: section.title,
            content: section.content,
            order: section.order ?? index,
            type: section.type || "INFO",
          })),
        },
        faqs: {
          create: faqs.map((faq: any, index: number) => ({
            title: faq.title,
            question: faq.question,
            answer: faq.answer,
            order: faq.order ?? index,
          })),
        },
      },
      include: {
        college: true,
        sections: true,
        faqs: true,
      },
    })

    return NextResponse.json(page, { status: 201 })
  } catch (error) {
    console.error("Failed to create college page:", error)
    return NextResponse.json({ error: "Failed to create college page", details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}




