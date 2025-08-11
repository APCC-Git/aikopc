import { Header, NavItem } from '@/components/visitor/Header';
import { Footer } from '@/components/visitor/Footer';
import { getUser } from '@/lib/auth';
import React from 'react';

export default async function VisitorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems: NavItem[] = [
    {
      title: 'Home',
      href: '/#top',
    },
    {
      title: 'About',
      href: '/#about',
    },
    {
      title: 'Activity',
      href: '/#activity',
    },
  ];

  const user = await getUser();
  return (
    <div
      className={
        'bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] bg-fixed'
      }
    >
      <Header user={user} items={navItems} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
