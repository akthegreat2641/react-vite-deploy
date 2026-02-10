import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const page = await prisma.page.findUnique({
            where: { id },
            include: {
                sections: { orderBy: { order: "asc" } },
                faqs: { orderBy: { order: "asc" } },
                author: true,
            },
        })

        if (!page) {
            return NextResponse.json({ error: "Page not found" }, { status: 404 })
        }

        return NextResponse.json(page)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch page" },
            { status: 500 }
        )
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await req.json()
        const {
            title,
            slug,
            headerBgImage,
            description,
            sections,
            faqs,
            published,
            headerLogo,
            authorId,
            publishDate,
            locationLabel,
            headerBtn1Text,
            headerBtn1Link,
            headerBtn2Text,
            headerBtn2Link,
            category,
            featured,
            popular,
            cardImage,
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
            headerTitle,
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
            metaDescription,
        } = body

        // Delete existing sections/faqs to replace them
        await prisma.pageSection.deleteMany({ where: { pageId: id } })
        await prisma.pageFaq.deleteMany({ where: { pageId: id } })

        const page = await prisma.page.update({
            where: { id },
            data: {
                title,
                slug,
                headerBgImage,
                description,
                published,
                headerTitle,
                headerLogo,
                authorId: (authorId === "none" || !authorId) ? null : authorId,
                publishDate: publishDate ? new Date(publishDate) : null,
                locationLabel,
                headerBtn1Text,
                headerBtn1Link,
                headerBtn2Text,
                headerBtn2Link,
                category,
                featured: featured || false,
                popular: popular || false,
                cardImage,
                showBtn1: showBtn1 !== undefined ? showBtn1 : true,
                showBtn2: showBtn2 !== undefined ? showBtn2 : true,
                showHeaderLogo: showHeaderLogo !== undefined ? showHeaderLogo : true,
                sections: {
                    create: sections?.map((section: any, index: number) => ({
                        title: section.title,
                        content: section.content,
                        order: index,
                        type: section.type || "INFO"
                    }))
                },
                faqs: {
                    create: faqs?.map((faq: any, index: number) => ({
                        title: faq.title,
                        question: faq.question,
                        answer: faq.answer,
                        order: index
                    }))
                },
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
                cdRank: cdRank ? parseInt(cdRank.toString()) : null,
                placementAverage: placementAverage ? parseInt(placementAverage.toString()) : null,
                placementHighest: placementHighest ? parseInt(placementHighest.toString()) : null,
                totalFeesVal: totalFeesVal ? parseInt(totalFeesVal.toString()) : null,
                applicationDate,
                examDate,
                resultDate,
                examLevel,
                examMode,
                seoMetaTitle,
                metaDescription,
            },
        })

        return NextResponse.json(page)
    } catch (error) {
        console.error("Error updating page:", error)
        return NextResponse.json(
            { error: "Failed to update page" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        await prisma.page.delete({
            where: { id },
        })

        return NextResponse.json({ message: "Page deleted successfully" })
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete page" },
            { status: 500 }
        )
    }
}
