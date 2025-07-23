'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import Image from 'next/image';
import type { JwtPayload } from 'jsonwebtoken';
import ThemeToggle from './ThemeToggle';

interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export function Header({
  items,
  user,
  className,
}: {
  items?: NavItem[];
  className?: string;
  user: string | JwtPayload | null;
}) {
  const [open, setOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // ページトップは表示
      if (currentScrollY < 10) {
        setIsHidden(false);
      }
      // 下にスクロールしたら非表示
      else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHidden(true);
      }
      // 上にスクロールしたら表示
      else if (currentScrollY < lastScrollY - 5) {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = items ?? [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ];

  return (
    <>
      <header
        className={cn(
          'font-figtree sticky top-0 z-40 flex w-full items-center justify-center p-2 transition-all duration-300',
          isHidden ? '-translate-y-full' : 'translate-y-0',
          'h-20',
          className
        )}
      >
        <div className="bg-background/80 container flex h-full w-full items-center justify-between rounded-full border border-gray-200/50 px-7 shadow-lg backdrop-blur-sm dark:border-gray-700/50">
          <div className="hidden items-center gap-6 md:flex md:gap-10">
            <Link href="/public" className="hidden items-center space-x-2 md:flex">
              <Image
                src="/logos/logo.png"
                alt="logo"
                width={35}
                height={35}
                priority
                className="dark:hidden"
              />
              <Image
                src="/logos/logo-white.png"
                alt="logo"
                width={35}
                height={35}
                priority
                className="hidden dark:block"
              />
              <span className="ml-1 inline-block text-2xl font-bold">Aikopc.net</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    'hover:text-primary text-sm font-medium transition-colors',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <Link href="/public" className="flex items-center space-x-2 md:hidden">
            <Image
              src="/logos/logo.png"
              alt="logo"
              width={36}
              height={36}
              priority
              className="dark:hidden"
            />
            <Image
              src="/logos/logo-white.png"
              alt="logo"
              width={36}
              height={36}
              priority
              className="hidden dark:block"
            />
          </Link>
          <Link href="/public" className="flex items-center space-x-2 md:hidden">
            <span className="inline-block text-center text-2xl font-bold">Aikopc.net</span>
          </Link>

          {/* 右寄せ要素 */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 md:flex">
              <ThemeToggle />
              {!user ? (
                <Button variant="outline" size="sm" className={'h-10 rounded-full'} asChild>
                  <Link href="/login">Login</Link>
                </Button>
              ) : (
                <Button variant="outline" size="sm" className={'h-10 rounded-full'} asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              )}
            </div>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="rounded-r-3xl pl-0 [&>button:first-of-type]:hidden"
              >
                <div className="flex h-full flex-col justify-between px-3 py-4 md:px-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <Link
                        href="/public"
                        className="flex items-center"
                        onClick={() => setOpen(false)}
                      >
                        <SheetTitle>
                          <span className="text-center text-3xl font-bold">Aikopc.net</span>
                        </SheetTitle>
                      </Link>
                      <div className={'flex items-center gap-2'}>
                        <button
                          onClick={() => setOpen(false)}
                          className={'bg-secondary rounded-full p-2 transition-colors'}
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                    <nav className="mt-10 flex flex-col gap-4">
                      {navItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={cn(
                            'hover:text-primary text-lg font-medium transition-colors',
                            item.disabled && 'cursor-not-allowed opacity-80'
                          )}
                          onClick={() => setOpen(false)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <ThemeToggle />
                    <div className={'h-full w-full p-[0.5px]'}>
                      {!user ? (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className={'h-full w-full rounded-full'}
                        >
                          <Link href="/login" onClick={() => setOpen(false)}>
                            Login
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className={'h-full w-full rounded-full'}
                        >
                          <Link href="/dashboard" onClick={() => setOpen(false)}>
                            Dashboard
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
