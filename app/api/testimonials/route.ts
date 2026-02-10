import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(testimonials)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
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
    const { name, content, image, rating, featured } = body

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        content,
        image,
        rating: rating || 5,
        featured: featured || false,
      },
    })

    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}

