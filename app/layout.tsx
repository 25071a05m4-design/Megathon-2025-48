import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import {
  Noto_Nastaliq_Urdu,
  Noto_Sans_Bengali,
  Noto_Sans_Devanagari,
  Noto_Sans_Gujarati,
  Noto_Sans_Gurmukhi,
  Noto_Sans_Kannada,
  Noto_Sans_Malayalam,
  Noto_Sans_Oriya,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
  Space_Grotesk,
  Syne,
} from 'next/font/google'
import './globals.css'

const devanagari = Noto_Sans_Devanagari({ weight: ['400', '700'], display: 'swap', preload: false, subsets: ['devanagari'], variable: '--font-deva' })
const telugu = Noto_Sans_Telugu({ weight: ['400', '700'], display: 'swap', preload: false, subsets: ['telugu'], variable: '--font-telu' })
const tamil = Noto_Sans_Tamil({ weight: ['400', '700'], display: 'swap', preload: false, subsets: ['tamil'], variable: '--font-taml' })
const bengali = Noto_Sans_Bengali({ weight: ['400', '700'], display: 'swap', preload: false, subsets: ['bengali'], variable: '--font-beng' })
const kannada = Noto_Sans_Kannada({ weight: ['400', '700'], display: 'swap', preload: false, subsets: ['kannada'], variable: '--font-knda' })
const malayalam = Noto_Sans_Malayalam({ weight: ['400', '700'], display: 'swap', preload: false, subsets: ['malayalam'], variable: '--font-mlym' })
const gujarati = Noto_Sans_Gujarati({ weight: ['400', '700'], display: 'swap', preload: false, subsets: ['gujarati'], variable: '--font-gujr' })
const gurmukhi = Noto_Sans_Gurmukhi({ weight: ['400', '700'], display: 'swap', preload: false, subsets: ['gurmukhi'], variable: '--font-guru' })
const oriya = Noto_Sans_Oriya({ weight: ['400', '700'], display: 'swap', preload: false, subsets: ['oriya'], variable: '--font-orya' })
const urdu = Noto_Nastaliq_Urdu({ weight: ['400', '700'], display: 'swap', preload: false, subsets: ['arabic'], variable: '--font-urdu' })
const indicVars = [devanagari, telugu, tamil, bengali, kannada, malayalam, gujarati, gurmukhi, oriya, urdu]
  .map((f) => f.variable)
  .join(' ')

const display = Syne({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display-face',
})

const body = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'YATRA — Travel Beyond Language',
  description:
    'A multimodal AI travel companion for India. See, speak, understand, listen and explore — OCR, speech, translation and voice in one seamless experience.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0e0d0c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${indicVars} bg-background`}>
      <body className="grain antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
