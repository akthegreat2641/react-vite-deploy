import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const author = await prisma.author.findUnique({
            where: { id: params.id },
        })
        if (!author) {
            return NextResponse.json({ error: "Author not found" }, { status: 404 })
        }
        return NextResponse.json(author)
    } catch (error) {
        console.error("Failed to fetch author:", error)
        return NextResponse.json({ error: "Failed to fetch author" }, { status: 500 })
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json()
        const {
            name,
            image,
            description,
            designation,
            facebook,
            twitter,
            linkedin,
            instagram,
        } = body

        const author = await prisma.author.update({
            where: { id: params.id },
            data: {
                name,
                image,
                description,
                designation,
                facebook,
                twitter,
                linkedin,
                instagram,
            },
        })

        return NextResponse.json(author)
    } catch (error) {
        console.error("Failed to update author:", error)
        return NextResponse.json({ error: "Failed to update author" }, { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.author.delete({
            where: { id: params.id },
        })
        return NextResponse.json({ message: "Author deleted" })
    } catch (error) {
        console.error("Failed to delete author:", error)
        return NextResponse.json({ error: "Failed to delete author" }, { status: 500 })
    }
}
