'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/common/ui/button';
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
    <header className="relative z-50 mb-2 max-h-20 w-full border-b shadow-sm">
      <div className="mx-auto flex w-full items-center justify-between px-4 py-3 md:px-10">
        {/* ロゴ */}
        <Link href="/public" className="text-primary text-xl font-bold">
          <Image src="/logo.png" alt="logo" width={50} height={50} priority />
          {/*AikoPC.net*/}
        </Link>

        {/* PC用ナビゲーション */}
        <nav className="hidden space-x-6 md:flex">
          <Link href="/public" className="text-sm hover:underline 2xl:text-xl">
            Home
          </Link>
          <Link href="/about" className="text-sm hover:underline 2xl:text-xl">
            About
          </Link>
          <Link href={'/blog/page/1'} className="text-sm hover:underline 2xl:text-xl">
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* モバイルメニュー切り替えボタン */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          {/* ログインボタン */}
          {!user ? (
            <Link href="/login">
              <Button variant="outline" className="inline-block 2xl:h-12 2xl:text-xl">
                ログイン
              </Button>
            </Link>
          ) : (
            <Link href="/dashboard">
              <Button variant="outline" className="inline-block 2xl:h-12 2xl:text-xl">
                ダッシュボード
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* モバイルメニュー */}
      <div
        className={cn(
          'absolute top-full left-0 z-40 w-full overflow-hidden rounded-b-sm bg-white px-4 shadow-sm transition-all duration-300 md:hidden',
          menuOpen ? 'max-h-[300px] py-3' : 'max-h-0 py-0'
        )}
        style={{ transition: 'all', transitionDuration: '0.2' }}
      >
        <nav className="flex flex-col space-y-2">
          <Link
            href="/public"
            onClick={() => setMenuOpen(false)}
            className="text-sm hover:underline"
          >
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
