import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const stat = await prisma.stat.findUnique({
      where: { id: params.id },
    })

    if (!stat) {
      return NextResponse.json({ error: "Stat not found" }, { status: 404 })
    }

    return NextResponse.json(stat)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stat" }, { status: 500 })
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
    const { label, value, icon, featured } = body

    const stat = await prisma.stat.update({
      where: { id: params.id },
      data: {
        label,
        value,
        icon,
        featured,
      },
    })

    return NextResponse.json(stat)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update stat" }, { status: 500 })
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

    await prisma.stat.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Stat deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete stat" }, { status: 500 })
  }
}

