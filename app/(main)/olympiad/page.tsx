import { prisma } from "@/lib/prisma"
import { OlympiadClient } from "@/components/olympiad-client"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Olympiad - All Olympiad Pages",
    description: "Browse all olympiad pages and resources",
}

export default async function OlympiadPage() {
    // Fetch all Olympiad pages from database
    const olympiads = await prisma.page.findMany({
        where: {
            category: {
                in: ["Olympiad", "Olympiads"]
            }
        },
        select: {
            id: true,
            title: true,
            headerTitle: true,
            slug: true,
            cardImage: true,
            author: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return <OlympiadClient olympiads={olympiads} />
}
