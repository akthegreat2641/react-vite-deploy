import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const category = searchParams.get("category")
        const featured = searchParams.get("featured") === "true"

        const whereClause: any = {}
        if (category) {
            if (category.includes(',')) {
                whereClause.category = { in: category.split(',') }
            } else {
                whereClause.category = category
            }
        }
        if (featured) whereClause.featured = true

        const pages = await prisma.page.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
            include: {
                author: true
            }
        })
        return NextResponse.json(pages)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch pages" },
            { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const {
            title,
            slug,
            headerBgImage,
            description,
            sections,
            faqs,
            published,
            featured,
            headerLogo,
            authorId,
            publishDate,
            locationLabel,
            headerBtn1Text,
            headerBtn1Link,
            headerBtn2Text,
            headerBtn2Link,
            category,
            popular,
            cardImage,
            headerTitle,
            showBtn1,
            showBtn2,
            showHeaderLogo,
            courseDuration,
            avgFees,
            branch,
            level,
            boardType,
            program,
            careerType,
            state,
            degree,
            programType,
            collegeType,
            courseType,
            instituteType,
            examAccepted,
            genderAccepted,
            totalFees,
            cdRank,
            placementAverage,
            placementHighest,
            totalFeesVal,
            applicationDate,
            examDate,
            resultDate,
            examLevel,
            examMode,
            seoMetaTitle,
            metaDescription
        } = body

        if (!title || !slug) {
            return NextResponse.json(
                { error: "Title and Slug are required" },
                { status: 400 }
            )
        }

        const page = await prisma.page.create({
            data: {
                title,
                slug,
                headerBgImage,
                description,
                published: published || false,
                featured: featured || false,
                popular: popular || false,
                headerLogo,
                authorId: (authorId === "none" || !authorId) ? null : authorId,
                publishDate: publishDate ? new Date(publishDate) : null,
                locationLabel,
                headerBtn1Text,
                headerBtn1Link,
                headerBtn2Text,
                headerBtn2Link,
                category,
                cardImage,
                headerTitle,
                showBtn1: showBtn1 !== undefined ? showBtn1 : true,
                showBtn2: showBtn2 !== undefined ? showBtn2 : true,
                showHeaderLogo: showHeaderLogo !== undefined ? showHeaderLogo : true,
                courseDuration,
                avgFees,
                branch,
                level,
                boardType,
                program,
                careerType,
                state,
                degree,
                programType,
                collegeType,
                courseType,
                instituteType,
                examAccepted,
                genderAccepted,
                totalFees,
                cdRank: cdRank ? parseInt(cdRank) : undefined,
                placementAverage: placementAverage ? parseInt(placementAverage) : undefined,
                placementHighest: placementHighest ? parseInt(placementHighest) : undefined,
                totalFeesVal: totalFeesVal ? parseInt(totalFeesVal) : undefined,
                applicationDate,
                examDate,
                resultDate,
                examLevel,
                examMode,
                seoMetaTitle,
                metaDescription,
                sections: {
                    create: sections?.map((s: any) => ({
                        title: s.title,
                        content: s.content,
                        order: s.order,
                        type: s.type,
                    })) || [],
                },
                faqs: {
                    create: faqs?.map((f: any) => ({
                        title: f.title,
                        question: f.question,
                        answer: f.answer,
                        order: f.order,
                    })) || [],
                },
            },
        })

        return NextResponse.json(page, { status: 201 })
    } catch (error) {
        console.error("Error creating page:", error)
        return NextResponse.json(
            { error: "Failed to create page" },
            { status: 500 }
        )
    }
}
