import type { Metadata } from 'next';
import { Work_Sans, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

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
  title: 'パソコン部',
  description: '愛光学園パソコン部の公式ホームページ',
  keywords: ['パソコン部', 'パソコン', '愛光学園', '中学校', '高校', '愛媛'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${workSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
