const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('Searching for "IIT Delhi"...')

    // Check Pages
    const pages = await prisma.page.findMany({
        where: { title: { contains: 'IIT Delhi' } }
    })
    console.log('Found Pages:', pages)

    // Check Colleges
    const colleges = await prisma.college.findMany({
        where: { name: { contains: 'IIT Delhi' } }
    })
    console.log('Found Colleges:', colleges)

    if (pages.length > 0) {
        console.log('Deleting Pages...')
        await prisma.page.deleteMany({
            where: { title: { contains: 'IIT Delhi' } }
        })
        console.log('Deleted Pages.')
    }

    if (colleges.length > 0) {
        console.log('Deleting Colleges...')
        await prisma.college.deleteMany({
            where: { name: { contains: 'IIT Delhi' } }
        })
        console.log('Deleted Colleges.')
    }
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
