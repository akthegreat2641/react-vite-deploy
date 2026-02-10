import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = (user as any).role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
            }
            return session
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const pathname = nextUrl.pathname

            // Admin Authentication Handling
            if (pathname.startsWith('/admin')) {
                // 1. Handle Admin Login Page
                if (pathname === '/admin/login') {
                    if (isLoggedIn) {
                        return Response.redirect(new URL('/admin', nextUrl))
                    }
                    return true // Allow access to login page
                }

                // 2. Protect Admin Routes
                if (!isLoggedIn) {
                    return Response.redirect(new URL('/admin/login', nextUrl))
                }

                // 3. Role Check (Optional but recommended)
                if ((auth?.user as any)?.role !== 'admin') {
                    return Response.redirect(new URL('/', nextUrl)) // Redirect non-admins to home
                }

                return true
            }

            // User Account Handling
            if (pathname.startsWith('/account')) {
                if (isLoggedIn) return true
                return false // Redirect to default login (/login)
            }

            // Allow access to other pages
            return true
        },
    },
    providers: [], // Configured in lib/auth.ts
    cookies: {
        sessionToken: {
            name: `authjs.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    }
} satisfies NextAuthConfig
