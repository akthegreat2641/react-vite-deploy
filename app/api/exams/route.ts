import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const exams = await prisma.exam.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(exams)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch exams" }, { status: 500 })
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
    const { name, category, image, featured } = body

    const exam = await prisma.exam.create({
      data: {
        name,
        category,
        image,
        featured: featured || false,
      },
    })

    return NextResponse.json(exam, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create exam" }, { status: 500 })
  }
}

