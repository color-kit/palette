import type { Metadata } from 'next'

// eslint-disable-next-line camelcase
import { Roboto_Mono } from 'next/font/google'

import './globals.css'

const font = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'Welcome to the ColorKit world!',
  icons: [
    { rel: 'icon', sizes: '32x32', url: '/favicon-32x32.png' },
    { rel: 'icon', sizes: '16x16', url: '/favicon-16x16.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/apple-touch-icon.png' },
  ],
  title: 'tailwind-plugin-palette - ColorKit',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="dark" lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
