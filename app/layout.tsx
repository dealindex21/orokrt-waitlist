import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OROKRT.ai — AI Operator for E-commerce',
  description: 'One AI operator replaces your entire ops stack across Amazon, eBay, and Shopify. PPC, listings, B2B, launches, reviews — with you controlling the autonomy.',
  openGraph: {
    title: 'OROKRT.ai — AI Operator for E-commerce',
    description: 'One AI operator replaces your entire ops stack across Amazon, eBay, and Shopify.',
    url: 'https://orokrt.ai',
    siteName: 'OROKRT.ai',
    images: [{ url: 'https://orokrt.ai/og.png', width: 1200, height: 630, alt: 'OROKRT.ai' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OROKRT.ai — AI Operator for E-commerce',
    description: 'One AI operator replaces your entire ops stack across Amazon, eBay, and Shopify.',
    images: ['https://orokrt.ai/og.png'],
  },
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ background: '#000', margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
