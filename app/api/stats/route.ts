import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const stats = await prisma.stat.findMany({
      orderBy: { createdAt: "desc" },
    })

    const statsWithCounts = await Promise.all(
      stats.map(async (stat) => {
        let count = 0;

        // Handle "Colleges" mapping to "College" category if needed, or rely on naming convention
        // Assuming stat.label matches category name exactly roughly
        // But users might select "Colleges" from dropdown, while pages use "College"
        // Let's broaden the search or map it.
        // For now, let's try exact match or simple plural handling

        const categoryName = stat.label;

        // Special case for Colleges -> College if strictly needed, but let's see if we can use 'contains' or similar logic
        // Or simply query pages with that category.

        // If label is "Colleges", we might want "College".
        // If label is "Articles", we might want "Article".
        // Check if page category equals the label

        // Attempt 1: Exact match
        const pages = await prisma.page.findMany({
          where: {
            category: categoryName
          },
          select: {
            title: true,
            headerTitle: true,
            slug: true
          }
        })

        // Attempt 2: If no pages found, try singular/plural variation
        let finalPages = pages;
        if (pages.length === 0 && categoryName.endsWith('s')) {
          finalPages = await prisma.page.findMany({
            where: {
              category: categoryName.slice(0, -1) // remove 's'
            },
            select: {
              title: true,
              headerTitle: true,
              slug: true
            }
          })
        }

        const fetchedPages = finalPages.map(p => ({
          title: p.headerTitle || p.title,
          slug: p.slug
        }));

        // Respect saved order
        // console.log(`[Stats GET] Processing: ${stat.label} | Saved Value: ${stat.value}`)

        const savedOrder = stat.value ? stat.value.split(",").map(s => s.trim()) : [];
        const fetchedPagesMap = new Map(fetchedPages.map(p => [p.title, p])); // Map title -> object
        const finalItems: { title: string, slug: string }[] = [];

        // 1. Add items from saved order if they still exist
        for (const itemTitle of savedOrder) {
          if (fetchedPagesMap.has(itemTitle)) {
            finalItems.push(fetchedPagesMap.get(itemTitle)!);
            fetchedPagesMap.delete(itemTitle);
          }
        }

        // 2. Add any remaining fetched pages (newly added ones)
        fetchedPagesMap.forEach(item => finalItems.push(item));

        const orderedTitles = finalItems.map(i => i.title);

        return {
          ...stat,
          value: orderedTitles.join(", ") || "No pages available",
          items: finalItems
        }
      })
    )

    return NextResponse.json(statsWithCounts)
  } catch (error) {
    console.error("Stats error:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
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
    const { label, value, icon, featured } = body

    // Enforce single stat: Delete all existing stats first
    await prisma.stat.deleteMany({})

    const stat = await prisma.stat.create({
      data: {
        label,
        value,
        icon,
        featured: featured !== undefined ? featured : true,
      },
    })

    return NextResponse.json(stat, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create stat" }, { status: 500 })
  }
}

