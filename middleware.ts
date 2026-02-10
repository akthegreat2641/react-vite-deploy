import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"

const { auth } = NextAuth({
  ...authConfig,
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true
})

if (!process.env.NEXTAUTH_SECRET) {
  console.error("Middleware: NEXTAUTH_SECRET is missing!")
}

export default auth((req) => {
  // logic is now handled in auth.config.ts authorized callback
  // but we can add specific redirect logic here if needed
  // or just export the auth middleware directly
})

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"]
}
