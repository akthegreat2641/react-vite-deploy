import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const scholarships = await prisma.scholarship.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(scholarships)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch scholarships" }, { status: 500 })
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
    const { name, featured } = body

    const scholarship = await prisma.scholarship.create({
      data: {
        name,
        featured: featured || false,
      },
    })

    return NextResponse.json(scholarship, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create scholarship" }, { status: 500 })
  }
}

