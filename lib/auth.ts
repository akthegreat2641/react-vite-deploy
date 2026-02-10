import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email or Mobile", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("[Auth] Authorize called with:", credentials?.email)
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("[Auth] Missing credentials")
            return null
          }

          const identifier = credentials.email as string

          // Find user by Email OR Mobile
          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { email: identifier },
                { mobile: identifier }
              ]
            }
          })

          if (!user) {
            console.log("[Auth] User not found")
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          )

          if (!isPasswordValid) {
            console.log("[Auth] Invalid password")
            return null
          }

          console.log("[Auth] User authenticated:", user.id)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error("Authorization error:", error)
          return null
        }
      }
    })
  ]
})

// Export authOptions for backward compatibility if needed
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email or Mobile", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const identifier = credentials.email as string

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: identifier },
              { mobile: identifier }
            ]
          }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/admin/login"
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    }
  }
}

