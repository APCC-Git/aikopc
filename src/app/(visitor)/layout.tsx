import { Header } from '@/components/common/Header';
import { getUser } from '@/lib/auth';
import React from 'react';

export default async function VisitorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <>
      <Header user={user} />
      <div className={''}>{children}</div>
    </>
  );
}
