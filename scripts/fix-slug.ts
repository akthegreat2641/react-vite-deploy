import { prisma } from "@/lib/prisma"

async function main() {
    const badSlug = "iit-bombayiit-bombay"
    const correctSlug = "iit-bombay"

    const page = await prisma.collegePage.findFirst({
        where: { slug: badSlug }
    })

    if (page) {
        console.log("Found bad slug, fixing...")
        await prisma.collegePage.update({
            where: { id: page.id },
            data: { slug: correctSlug }
        })
        console.log("Fixed slug to:", correctSlug)
    } else {
        console.log("No page found with bad slug.")
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
