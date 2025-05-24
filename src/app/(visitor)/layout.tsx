import { Header } from '@/components/header';
import { getUser } from '@/lib/auth';
import React from 'react';

export default async function VisitorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <div>
      <Header user={user} />
      <div className={'w-full h-16'}></div>
      <div>{children}</div>
    </div>
  );
}
