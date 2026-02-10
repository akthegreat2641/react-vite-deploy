import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params
        const id = params.id
        if (!id) {
            return NextResponse.json(
                { error: "Category ID is required" },
                { status: 400 }
            )
        }

        await prisma.category.delete({
            where: {
                id,
            },
        })

        return NextResponse.json({ message: "Category deleted successfully" })
    } catch (error: any) {
        console.error("Failed to delete category:", error)
        return NextResponse.json(
            { error: "Failed to delete category", details: error.message },
            { status: 500 }
        )
    }
}
