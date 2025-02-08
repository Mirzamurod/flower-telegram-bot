import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme.provider'
import SessionProvider from '@/components/providers/session.provider'
import LayoutProvider from '@/components/providers/layout.provider'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-spaceGrotesk',
})

export const metadata: Metadata = {
  title: 'Flower Web Telegram Bot',
  description: 'Written by Mirzamurod',
  icons: { icon: 'flower-icon.webp' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={`${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <LayoutProvider>{children}</LayoutProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
