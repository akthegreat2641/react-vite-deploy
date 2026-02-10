import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import { Providers } from '@/components/providers'
import { prisma } from "@/lib/prisma"
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'College Referral Website',
  description: 'Find the best colleges and courses',
  generator: 'v0.app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const adConfig = await prisma.adConfig.findUnique({
    where: { id: "ads" }
  })

  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {adConfig?.isEnabled && adConfig?.autoAds && (
          <div dangerouslySetInnerHTML={{ __html: adConfig.autoAds }} />
        )}
        <Providers>
          {children}
          <Toaster />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
