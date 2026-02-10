import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  try {
    const college = await prisma.college.findUnique({
      where: { id: params.id },
    })

    if (!college) {
      return NextResponse.json({ error: "College not found" }, { status: 404 })
    }

    return NextResponse.json(college)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch college" }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  try {
    // Temporarily disabled auth check
    // const session = await auth()
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    const body = await req.json()
    const { name, location, image, logo, featured } = body

    if (!params.id) {
      return NextResponse.json({ error: "Missing college ID" }, { status: 400 })
    }

    const college = await prisma.college.update({
      where: { id: params.id },
      data: {
        name,
        location,
        image,
        logo,
        featured,
      },
    })

    return NextResponse.json(college)
  } catch (error) {
    console.error("Failed to update college:", error)
    return NextResponse.json({ error: "Failed to update college", details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  try {
    // Temporarily disabled auth check
    // const session = await auth()
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    await prisma.college.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "College deleted successfully" })
  } catch (error) {
    console.error("Error deleting college:", error)
    return NextResponse.json({ error: "Failed to delete college", details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}

