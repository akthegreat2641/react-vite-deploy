import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: params.id },
      include: {
        sections: true,
        author: true
      }
    })

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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

    // Transaction to handle article update and section replacement
    const article = await prisma.$transaction(async (tx) => {
      // 1. Update main article fields
      const updatedArticle = await tx.article.update({
        where: { id: params.id },
        data: {
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
          postDate: postDate ? new Date(postDate) : null,
          noIndex,
          sendToSEO,
          isNews,
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
          subscriptionBox,
          subscriptionBoxDetails,
          cutOffButtonText,
          cutOffButtonLink,
          predictButtonText,
          predictButtonLink,
          authorId: authorId === "none" ? null : authorId,
        },
      })

      // 2. Handle Sections: Delete existing and create new (simplest approach for ordering)
      if (sections) {
        await tx.articleSection.deleteMany({
          where: { articleId: params.id }
        })

        if (sections.length > 0) {
          await tx.articleSection.createMany({
            data: sections.map((s: any) => ({
              articleId: params.id,
              title: s.title,
              content: s.content,
              order: s.order || 0
            }))
          })
        }
      }

      return updatedArticle
    })

    return NextResponse.json(article)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Temporarily disabled auth check
    // const session = await auth()
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    await prisma.article.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Article deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 })
  }
}

