import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [articles, pages] = await Promise.all([
      prisma.article.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.page.findMany({
        where: {
          category: "Article",
          published: true
        },
        orderBy: { createdAt: "desc" },
      })
    ])

    // Map pages to match Article interface
    const mappedPages = (pages as any[]).map(p => ({
      id: p.id,
      title: p.title,
      category: p.category || "Article",
      colleges: 0,
      image: p.cardImage || p.headerBgImage,
      featured: p.featured || false,
      popular: p.popular || false,
      isPage: true,
      slug: p.slug
    }))

    const combined = [...articles, ...mappedPages].sort((a, b) => {
      // Sort by some criteria if needed, or just return merged
      return 0
    })

    return NextResponse.json(combined)
  } catch (error) {
    console.error("Failed to fetch combined articles:", error)
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 })
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
    const {
      title,
      category,
      content,
      image,
      colleges,
      featured,
      popular,
      published,
      postType,
      examCategory,
      genericGroup,
      exam,
      secondary,
      subjects,
      postAs,
      userEmail,
      location,
      specifyPostDate,
      postDate,
      noIndex,
      sendToSEO,
      isNews,
      excerpt,
      faqTitle,
      metaDescription,
      featuredContentType,
      featuredVideo,
      caption,
      linkReplacement,
      introductoryText,
      seoMetaTitle,
      slug,
      canonical,
      redirect,
      keywords,
      subscriptionBox,
      subscriptionBoxDetails,
      cutOffButtonText,
      cutOffButtonLink,
      predictButtonText,
      predictButtonLink,
      authorId,
      sections,
    } = body

    const article = await prisma.article.create({
      data: {
        title,
        category,
        content,
        image,
        colleges: colleges || 0,
        featured: featured || false,
        popular: popular || false,
        published: published || false,
        postType,
        examCategory,
        genericGroup: genericGroup || false,
        exam,
        secondary,
        subjects,
        postAs: postAs || "Me",
        userEmail,
        location,
        specifyPostDate: specifyPostDate || false,
        postDate: postDate ? new Date(postDate) : null,
        noIndex: noIndex || false,
        sendToSEO: sendToSEO || false,
        isNews: isNews || false,
        excerpt,
        faqTitle,
        metaDescription,
        featuredContentType,
        featuredImage: image,
        featuredVideo,
        caption,
        linkReplacement,
        introductoryText,
        seoMetaTitle,
        slug,
        canonical,
        redirect,
        keywords,
        subscriptionBox: subscriptionBox || false,
        subscriptionBoxDetails,
        cutOffButtonText,
        cutOffButtonLink,
        predictButtonText,
        predictButtonLink,
        authorId: authorId === "none" ? null : authorId,
        sections: {
          create: (sections || []).map((s: any) => ({
            title: s.title,
            content: s.content,
            order: s.order || 0
          }))
        }
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error("Error creating article:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to create article"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

