import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blacksider — Landing',
  description: 'Nova landing page Blacksider',
  metadataBase: new URL('https://example.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn('min-h-[100dvh] bg-background font-sans antialiased overflow-x-hidden')}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

