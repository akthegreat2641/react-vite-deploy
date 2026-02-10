import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const boards = await prisma.board.findMany({
            orderBy: { createdAt: "desc" },
        })
        return NextResponse.json(boards)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch boards" },
            { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    try {
        const json = await req.json()
        const board = await prisma.board.create({
            data: json,
        })
        return NextResponse.json(board)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create board" },
            { status: 500 }
        )
    }
}
