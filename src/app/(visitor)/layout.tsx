import { Header } from '@/components/header';
import { getUser } from '@/lib/auth';
import TransitionLayout from '@/components/TransitionLayout';
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
      <TransitionLayout>{children}</TransitionLayout>
    </div>
  );
}
