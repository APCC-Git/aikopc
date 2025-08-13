import type { Metadata } from 'next';
import { Work_Sans, Geist, Geist_Mono, Figtree, Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import React from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
  weight: '900',
});

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
  weight: ['700', '900'],
});
const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aikopc.net'),
  title: 'Aikopc.net',
  description: '愛光学園パソコン部の公式ホームページです。',
  keywords: ['パソコン部', 'パソコン', '愛光学園', '中学校', '高校', '愛媛', `Aikopc`],
  openGraph: {
    title: `Aikopc.net`,
    description: '愛光学園パソコン部の公式ホームページです。',
    url: 'https://aikopc.net',
    siteName: 'Aikopc.net',
    images: [
      {
        url: 'https://aikopc.net/images/ogp.png',
        width: 1920,
        height: 1080,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Aikopc.net`,
    description: '愛光学園パソコン部の公式ホームページです。',
    images: ['https://aikopc.net/images/ogp.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${workSans.variable} ${figtree.variable} ${notoSansJP.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
