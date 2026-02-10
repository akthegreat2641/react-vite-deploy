import { prisma } from "@/lib/prisma"
import { ScholarshipClient } from "@/components/scholarship-client"
import { Metadata } from "next"
import { notFound } from "next/navigation"

interface PageProps {
    params: Promise<{ category: string }>
}

// Map URL slugs to program names in database
const CATEGORY_MAP: Record<string, string> = {
    "undergraduate": "Undergraduate Scholarships",
    "phd": "Ph.D Scholarships",
    "postgraduate": "Postgraduate Scholarships",
    "high-school": "High School Scholarships",
    "higher-secondary": "Higher Secondary Scholarships"
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category } = await params
    const programName = CATEGORY_MAP[category]

    if (!programName) {
        return { title: "Scholarships" }
    }

    return {
        title: `${programName} for Students`,
        description: `Browse all ${programName.toLowerCase()} opportunities`,
    }
}

export default async function ScholarshipCategoryPage({ params }: PageProps) {
    const { category } = await params
    const programName = CATEGORY_MAP[category]

    if (!programName) {
        notFound()
    }

    // Fetch scholarships for this category
    const scholarships = await prisma.page.findMany({
        where: {
            category: {
                in: ["Scholarship", "Scholarships"]
            },
            program: programName
        },
        select: {
            id: true,
            title: true,
            headerTitle: true,
            slug: true,
            description: true,
            cardImage: true,
            author: {
                select: {
                    name: true
                }
            },
            updatedAt: true
        },
        orderBy: {
            updatedAt: "desc"
        }
    })

    return <ScholarshipClient scholarships={scholarships} categoryName={programName} />
}
