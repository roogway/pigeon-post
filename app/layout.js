import './globals.css'

export const metadata = {
  title: 'Pigeon Post',
  description: 'Send tiny pixel gifts to your friends via carrier pigeon',
  manifest: '/manifest.json',
  themeColor: '#06A2EB',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>{children}</body>
    </html>
  )
}
