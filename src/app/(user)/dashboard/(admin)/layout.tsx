import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getUser } from '@/lib/auth';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getUser();
  if (!user) redirect('/login');
  if (user.role !== 'admin') redirect('/dashboard');
  return <div>{children}</div>;
}
