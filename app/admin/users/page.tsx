
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import UsersClient from "@/components/users-client"

export default async function UsersPage() {
    const session = await auth()

    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            name: true,
            email: true,
            mobile: true,
            role: true,
            isBlocked: true,
            createdAt: true
        }
    })

    return <UsersClient initialUsers={users} />
}
