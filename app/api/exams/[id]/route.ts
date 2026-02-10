import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const exam = await prisma.exam.findUnique({
      where: { id: params.id },
    })

    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 })
    }

    return NextResponse.json(exam)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch exam" }, { status: 500 })
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
    const { name, category, image, featured } = body

    const exam = await prisma.exam.update({
      where: { id: params.id },
      data: {
        name,
        category,
        image,
        featured,
      },
    })

    return NextResponse.json(exam)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update exam" }, { status: 500 })
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

    await prisma.exam.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Exam deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete exam" }, { status: 500 })
  }
}

