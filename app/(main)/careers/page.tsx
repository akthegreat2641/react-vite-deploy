import { prisma } from "@/lib/prisma"
import { CareersClient } from "@/components/careers-client"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Careers | College Referral Website",
    description: "Explore various career options and find the right path for you.",
}

export default async function CareersPage() {
    const careerTypes = await prisma.careerType.findMany({
        orderBy: { name: "asc" },
    })

    return <CareersClient initialCareerTypes={careerTypes} />
}
