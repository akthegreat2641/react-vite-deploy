import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const scholarship = await prisma.scholarship.findUnique({
      where: { id: params.id },
    })

    if (!scholarship) {
      return NextResponse.json({ error: "Scholarship not found" }, { status: 404 })
    }

    return NextResponse.json(scholarship)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch scholarship" }, { status: 500 })
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
    const { name, featured } = body

    const scholarship = await prisma.scholarship.update({
      where: { id: params.id },
      data: {
        name,
        featured,
      },
    })

    return NextResponse.json(scholarship)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update scholarship" }, { status: 500 })
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

    await prisma.scholarship.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Scholarship deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete scholarship" }, { status: 500 })
  }
}

