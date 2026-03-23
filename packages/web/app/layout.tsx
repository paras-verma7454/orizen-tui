import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { Nav } from '@/components/nav'
import './globals.css'

export const metadata: Metadata = {
  title: 'Orizen TUI - Terminal UI Components',
  description: 'A component library for building terminal user interfaces. Themeable, accessible, and optimized for 60fps rendering in Node.js CLI apps.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  twitter: {
    card: 'summary',
    title: 'Orizen TUI - Terminal UI Components',
    description:
      'A component library for building terminal user interfaces. Themeable, accessible, and optimized for 60fps rendering in Node.js CLI apps.',
    images: ['/icon.svg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" className={GeistMono.variable} suppressHydrationWarning>
      <head>
        <script
          // Set theme before hydration to avoid flash.
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var saved = localStorage.getItem('orizen-theme');
                  var theme = (saved === 'light' || saved === 'dark')
                    ? saved
                    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.dataset.theme = theme;
                } catch (e) {
                  document.documentElement.dataset.theme = 'dark';
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-zinc-50 font-mono antialiased">
        <Nav />
        {children}
      </body>
    </html>
  )
}
