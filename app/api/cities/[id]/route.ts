import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const json = await req.json()
        const city = await prisma.city.update({
            where: { id },
            data: json,
        })
        return NextResponse.json(city)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update city" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        await prisma.city.delete({
            where: { id },
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete city" },
            { status: 500 }
        )
    }
}
