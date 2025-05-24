'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { ModeToggle } from '@/components/mode-toggle';
import Image from 'next/image';
import type { JwtPayload } from 'jsonwebtoken';

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
      title: 'Blog',
      href: '/blog',
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
          'fixed top-0 w-full z-40 transition-all duration-300 flex items-center justify-center p-2',
          isHidden ? '-translate-y-full' : 'translate-y-0',
          'h-20',
          className
        )}
      >
        <div className="container flex items-center justify-between rounded-full shadow-lg px-7 h-full w-full bg-background/80 backdrop-blur-sm border border-gray-200/50">
          <div className="hidden md:flex items-center gap-6 md:gap-10">
            <Link href="/" className="hidden md:flex items-center space-x-2">
              <Image src="/logo.png" alt="logo" width={35} height={35} priority />
              <span className="font-bold text-2xl inline-block ml-1">Aikopc.net</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <Link href="/" className="flex md:hidden items-center space-x-2">
            <Image src="/logo.png" alt="logo" width={36} height={36} priority />
          </Link>
          <Link href="/" className="flex md:hidden items-center space-x-2">
            <span className="font-bold text-2xl text-center inline-block">Aikopc.net</span>
          </Link>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex gap-2">
              <ModeToggle />
              {!user ? (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              ) : (
                <Button variant="outline" size="sm" asChild>
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
              <SheetContent side="left" className="pl-0">
                <div className="px-7 py-3 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
                        <SheetTitle>
                          <span className="font-bold text-2xl text-center">Aikopc.net</span>
                        </SheetTitle>
                      </Link>
                    </div>
                    <nav className="mt-10 flex flex-col gap-4">
                      {navItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={cn(
                            'text-sm font-medium transition-colors hover:text-primary',
                            item.disabled && 'cursor-not-allowed opacity-80'
                          )}
                          onClick={() => setOpen(false)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    {!user ? (
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/login" onClick={() => setOpen(false)}>
                          Login
                        </Link>
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard" onClick={() => setOpen(false)}>
                          Dashboard
                        </Link>
                      </Button>
                    )}
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
