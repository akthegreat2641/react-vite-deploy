
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
    try {
        const session = await auth()
        console.log("Ads API GET Session:", session) // Test auth in GET

        const config = await prisma.adConfig.findUnique({
            where: { id: "ads" }
        })

        if (!config) {
            // Return default empty config if not found
            return NextResponse.json({
                autoAds: "",
                sidebarAd: "",
                bannerAd: "",
                isEnabled: true
            })
        }

        return NextResponse.json(config)
    } catch (error) {
        console.error("Failed to fetch ad config:", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        console.log("Ads API POST Headers:", Object.fromEntries(req.headers)) // Debug log
        const session = await auth()
        console.log("Ads API POST Session:", session) // Debug log

        if (!session) {
            console.log("Ads API POST: Unauthorized") // Debug log
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const body = await req.json()
        const { autoAds, sidebarAd, bannerAd, isEnabled } = body

        const config = await prisma.adConfig.upsert({
            where: { id: "ads" },
            update: {
                autoAds,
                sidebarAd,
                bannerAd,
                isEnabled
            },
            create: {
                id: "ads",
                autoAds,
                sidebarAd,
                bannerAd,
                isEnabled
            }
        })

        return NextResponse.json(config)
    } catch (error) {
        console.error("Failed to update ad config:", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
