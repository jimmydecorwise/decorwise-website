import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Decorwise Paintings | Premium Residential & Commercial Painting Services',
  description: 'Melbourne\'s trusted painting experts. Transform your space with our professional interior & exterior painting services. Free quotes & exceptional results.',
  keywords: 'painting services Melbourne, house painters, interior painting, exterior painting, commercial painting, residential painters, decorwise paintings',
  openGraph: {
    title: 'Decorwise Paintings | Premium Painting Services in Melbourne',
    description: 'Professional painting services for homes and businesses across Melbourne. Quality workmanship, attention to detail, and customer satisfaction guaranteed.',
    url: 'https://decorwisepainting.com',
    siteName: 'Decorwise Paintings',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 600,
        alt: 'Decorwise Paintings - Professional Painting Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decorwise Paintings | Premium Painting Services in Melbourne',
    description: 'Transform your space with our professional painting services. Quality workmanship guaranteed.',
    images: ['/images/logo.png'],
  },
  themeColor: '#1a365d',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#1a365d' },
    ],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Decorwise Paintings',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1a365d" />
      </head>
      <body className={`${inter.className} bg-white text-gray-900`}>
        <Navbar />
        <main className="min-h-[calc(100vh-200px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
