import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const category = searchParams.get("category") || "College"

        // Exact match plus plural variations
        const categoryFilter = [category]
        if (category === "College") categoryFilter.push("Colleges")
        if (category === "Exam") categoryFilter.push("Exams")
        if (category === "Course") categoryFilter.push("Courses")

        const items = await prisma.page.findMany({
            where: {
                category: { in: categoryFilter },
                published: true,
            },
            select: {
                branch: true,
            },
        })

        const branchCounts: Record<string, number> = {}

        items.forEach((item: { branch: string | null }) => {
            if (item.branch) {
                // Handle comma-separated branches
                const branches = item.branch.split(",").map((b: string) => b.trim()).filter(Boolean)
                branches.forEach((branch: string) => {
                    branchCounts[branch] = (branchCounts[branch] || 0) + 1
                })
            }
        })

        return NextResponse.json(branchCounts)
    } catch (error) {
        console.error("Failed to fetch branch counts:", error)
        return NextResponse.json(
            { error: "Failed to fetch branch counts" },
            { status: 500 }
        )
    }
}
