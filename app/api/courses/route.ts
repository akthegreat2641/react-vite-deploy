import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(courses)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
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
    const { name, category, featured } = body

    const course = await prisma.course.create({
      data: {
        name,
        category,
        featured: featured || false,
      },
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
  }
}

