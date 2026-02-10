import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const json = await req.json()
        const board = await prisma.board.update({
            where: { id },
            data: json,
        })
        return NextResponse.json(board)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update board" },
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
        await prisma.board.delete({
            where: { id },
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete board" },
            { status: 500 }
        )
    }
}
