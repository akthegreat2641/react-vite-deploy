import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const news = await prisma.news.findUnique({
      where: { id: params.id },
    })

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 })
    }

    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Temporarily disabled auth check
    // const session = await auth()
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    const body = await req.json()
    const { title, content, author, image, featured, published } = body

    const news = await prisma.news.update({
      where: { id: params.id },
      data: {
        title,
        content,
        author,
        image,
        featured,
        published,
      },
    })

    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update news" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Temporarily disabled auth check
    // const session = await auth()
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    await prisma.news.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "News deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete news" }, { status: 500 })
  }
}

