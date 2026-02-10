import { prisma } from "@/lib/prisma"

async function main() {
    const pages = await prisma.collegePage.findMany({
        select: { slug: true, college: { select: { name: true } } }
    })
    console.log("College Pages:", JSON.stringify(pages, null, 2))
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
