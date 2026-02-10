import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log("Checking pages with category 'Exam'...")
    const exams = await prisma.page.findMany({
        where: { category: 'Exam' },
        select: { id: true, title: true, category: true }
    })
    console.log("Exact match 'Exam':", exams)

    const pluralExams = await prisma.page.findMany({
        where: { category: 'Exams' },
        select: { id: true, title: true, category: true }
    })
    console.log("Exact match 'Exams':", pluralExams)

    const looseExams = await prisma.page.findMany({
        where: { category: { contains: 'xam' } },
        select: { id: true, title: true, category: true }
    })
    console.log("Contains 'xam':", looseExams)
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })
