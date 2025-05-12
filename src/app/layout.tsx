import type { Metadata } from 'next';
import { Work_Sans, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/ui/header';
import { getUser } from '@/lib/auth';

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

export const metadata: Metadata = {
  metadataBase: new URL('http://aikopc.net'),
  title: 'Aikopc.net',
  description: '愛光学園パソコン部の公式ホームページ',
  keywords: ['パソコン部', 'パソコン', '愛光学園', '中学校', '高校', '愛媛', `Aikopc`],
  openGraph: {
    title: `Aikopc.net`,
    images: [
      {
        url: '/images/sample1.jpg',
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
  const user = await getUser();
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${workSans.variable} antialiased`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
