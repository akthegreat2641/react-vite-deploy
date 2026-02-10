
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const pages = await prisma.page.findMany({
        select: {
            id: true,
            title: true,
            category: true,
            careerType: true
        }
    })

    console.log("--- START DEBUG ---")
    pages.forEach(p => {
        console.log(`ID: ${p.id}, Title: "${p.title}", Category: "${p.category}", CareerType: "${p.careerType}"`)
    })
    console.log("--- END DEBUG ---")
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
