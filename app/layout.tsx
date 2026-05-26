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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'OROKRT.ai',
  url: 'https://orokrt.ai',
  description: 'AI operator that replaces your entire e-commerce ops stack across Amazon, eBay, and Shopify. PPC, listings, B2B, launches, reviews — built from 5 years of real seller operations.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '199', priceCurrency: 'GBP', priceSpecification: { '@type': 'UnitPriceSpecification', price: '199', priceCurrency: 'GBP', unitText: 'MONTH' } },
  creator: { '@type': 'Organization', name: 'Orokrt Retail Ltd', url: 'https://orokrt.ai' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body style={{ background: '#000', margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
