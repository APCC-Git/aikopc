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

const figTree = Figtree({
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
  description: '愛光学園パソコン部の公式ホームページ',
  keywords: ['パソコン部', 'パソコン', '愛光学園', '中学校', '高校', '愛媛', `Aikopc`],
  openGraph: {
    title: `Aikopc.net`,
    images: [
      {
        url: '/images/ogp.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${workSans.variable} ${figTree.variable} ${notoSansJP.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
