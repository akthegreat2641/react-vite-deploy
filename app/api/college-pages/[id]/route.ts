import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/college-pages/[id]
export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  try {
    const page = await prisma.collegePage.findUnique({
      where: { id: params.id },
      include: {
        college: true,
        sections: {
          orderBy: { order: "asc" },
        },
        faqs: {
          orderBy: { order: "asc" },
        },
      },
    })

    if (!page) {
      return NextResponse.json({ error: "College page not found" }, { status: 404 })
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error("Failed to fetch college page:", error)
    return NextResponse.json({ error: "Failed to fetch college page" }, { status: 500 })
  }
}

// PUT /api/college-pages/[id]
// Updates header info, and fully replaces sections and FAQs
export async function PUT(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  try {
    const body = await req.json()
    const {
      headerLogo,
      headerBgImage,
      authorName,
      brochureUrl,
      location,
      publishedAt,
      slug,
      sections = [],
      faqs = [],
    } = body

    const page = await prisma.collegePage.update({
      where: { id: params.id },
      data: {
        headerLogo,
        headerBgImage,
        authorName,
        brochureUrl,
        location,
        slug,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined,
        sections: {
          deleteMany: {},
          create: sections.map((section: any, index: number) => ({
            title: section.title,
            content: section.content,
            order: section.order ?? index,
            type: section.type || "INFO",
          })),
        },
        faqs: {
          deleteMany: {},
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

    return NextResponse.json(page)
  } catch (error) {
    console.error("Failed to update college page:", error)
    return NextResponse.json(
      {
        error: "Failed to update college page",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

// DELETE /api/college-pages/[id]
export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  try {
    await prisma.collegeFaq.deleteMany({ where: { collegePageId: params.id } })
    await prisma.collegePageSection.deleteMany({ where: { collegePageId: params.id } })
    await prisma.collegePage.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "College page deleted successfully" })
  } catch (error) {
    console.error("Failed to delete college page:", error)
    return NextResponse.json({ error: "Failed to delete college page" }, { status: 500 })
  }
}


