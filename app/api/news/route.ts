import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // Temporarily disabled auth check
    // const session = await auth()
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    const body = await req.json()
    const { title, content, author, image, featured, published } = body

    const news = await prisma.news.create({
      data: {
        title,
        content,
        author,
        image,
        featured: featured || false,
        published: published !== undefined ? published : true,
      },
    })

    return NextResponse.json(news, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 })
  }
}

