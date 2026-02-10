import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const colleges = await prisma.college.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(colleges)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch colleges" }, { status: 500 })
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
    const { name, location, image, logo, featured } = body

    const college = await prisma.college.create({
      data: {
        name,
        location,
        image,
        logo,
        featured: featured || false,
      },
    })

    return NextResponse.json(college, { status: 201 })
  } catch (error) {
    console.error("Failed to create college:", error)
    return NextResponse.json({ error: "Failed to create college", details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}

