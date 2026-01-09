import './globals.css'
import { Pixelify_Sans, Balsamiq_Sans } from 'next/font/google'

const pixelify = Pixelify_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-pixelify',
})

const balsamiq = Balsamiq_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-balsamiq',
})

export const metadata = {
  metadataBase: new URL('https://pigeon-post-omega.vercel.app'),
  title: 'Pigeon Post',
  description: 'Send tiny pixel gifts to your friends via carrier pigeon',
  manifest: '/manifest.json',
  themeColor: '#87CEEB',
  openGraph: {
    title: 'Pigeon Post',
    description: 'Someone sent you a pixel gift via carrier pigeon! 🐦',
    url: 'https://pigeon-post-omega.vercel.app',
    siteName: 'Pigeon Post',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pigeon Post - Send pixel gifts via carrier pigeon',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pigeon Post',
    description: 'Someone sent you a pixel gift via carrier pigeon! 🐦',
    images: ['/og-image.png'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${pixelify.variable} ${balsamiq.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={balsamiq.className}>{children}</body>
    </html>
  )
}
