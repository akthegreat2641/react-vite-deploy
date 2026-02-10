import { prisma } from "../lib/prisma"

async function main() {
    const pages = await prisma.page.findMany({
        where: {
            category: "Sub College"
        },
        select: {
            id: true,
            title: true,
            slug: true,
            category: true,
            branch: true
        }
    })
    console.log(JSON.stringify(pages, null, 2))
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
