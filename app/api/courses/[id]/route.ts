import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: params.id },
    })

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json(course)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 })
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
    const { name, category, featured } = body

    const course = await prisma.course.update({
      where: { id: params.id },
      data: {
        name,
        category,
        featured,
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 })
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

    await prisma.course.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Course deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 })
  }
}

