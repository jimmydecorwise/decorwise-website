import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Decorwise Paintings | Professional Home & Commercial Painting Services',
  description: 'Transform your space with our professional painting services. Residential and commercial painting experts serving your area with quality workmanship.',
  keywords: 'painting services, home painting, commercial painting, interior painting, exterior painting, decorwise paintings',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
