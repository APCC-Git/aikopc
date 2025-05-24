'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import type { JwtPayload } from 'jsonwebtoken';

type Props = {
  user: string | JwtPayload | null;
};

export function Header({ user }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="w-full max-h-20 border-b shadow-sm mb-2 relative z-50">
      <div className="w-full mx-auto px-4 py-3 md:px-10 flex items-center justify-between">
        {/* ロゴ */}
        <Link href="/" className="text-xl font-bold text-primary">
          <Image src="/logo.png" alt="logo" width={50} height={50} priority />
          {/*AikoPC.net*/}
        </Link>

        {/* PC用ナビゲーション */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-sm 2xl:text-xl hover:underline">
            Home
          </Link>
          <Link href="/about" className="text-sm 2xl:text-xl hover:underline">
            About
          </Link>
          <Link href={'/blog/page/1'} className="text-sm 2xl:text-xl hover:underline">
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* モバイルメニュー切り替えボタン */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          {/* ログインボタン */}
          {!user ? (
            <Link href="/login">
              <Button variant="outline" className="inline-block 2xl:text-xl 2xl:h-12">
                ログイン
              </Button>
            </Link>
          ) : (
            <Link href="/dashboard">
              <Button variant="outline" className="inline-block  2xl:text-xl 2xl:h-12">
                ダッシュボード
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* モバイルメニュー */}
      <div
        className={cn(
          'md:hidden absolute top-full left-0 w-full bg-white px-4 overflow-hidden transition-all duration-300 z-40 rounded-b-sm shadow-sm',
          menuOpen ? 'max-h-[300px] py-3' : 'max-h-0 py-0'
        )}
        style={{ transition: 'all', transitionDuration: '0.2' }}
      >
        <nav className="flex flex-col space-y-2">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-sm hover:underline">
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="text-sm hover:underline"
          >
            About
          </Link>
          <Link
            href={'/blog/page/1'}
            onClick={() => setMenuOpen(false)}
            className="text-sm hover:underline"
          >
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
