
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function DELETE(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await auth()

        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        if (!params.id) {
            return NextResponse.json({ error: "User ID required" }, { status: 400 })
        }

        // Prevent deleting self
        if (session.user.id === params.id) {
            return NextResponse.json(
                { error: "Cannot delete your own account" },
                { status: 400 }
            )
        }

        await prisma.user.delete({
            where: { id: params.id },
        })

        return new NextResponse(null, { status: 204 })
    } catch (error: any) {
        console.error("Failed to delete user (Detailed):", error)
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        )
    }
}

export async function PATCH(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await auth()

        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { isBlocked, role } = body

        // Prevent blocking self
        if (session.user.id === params.id && isBlocked === true) {
            return NextResponse.json(
                { error: "Cannot block your own account" },
                { status: 400 }
            )
        }

        const updateData: any = {}
        if (typeof isBlocked === "boolean") updateData.isBlocked = isBlocked
        if (role) updateData.role = role

        const user = await prisma.user.update({
            where: { id: params.id },
            data: updateData,
        })

        return NextResponse.json(user)
    } catch (error: any) {
        console.error("Failed to update user (Detailed):", error)
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        )
    }
}
