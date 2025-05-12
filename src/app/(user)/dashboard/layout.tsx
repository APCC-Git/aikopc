import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ReactNode, use } from 'react';
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { LogoutButton } from '@/components/ui/logoutButton';
import { Card } from '@/components/ui/card';
import { redirect } from 'next/navigation';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

type User = {
  userId: string;
  userName: string;
  iat: number;
  exp: number;
};

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const token = (await cookies()).get('token')?.value;

  if (!token) redirect('/login');

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    // 型ガードで判定
    if (
      typeof payload === 'object' &&
      payload !== null &&
      typeof payload.userId === 'string' &&
      typeof payload.userName === 'string' &&
      typeof payload.iat === 'number' &&
      typeof payload.exp === 'number'
    ) {
      //console.log(payload);
      return (
        <SidebarProvider>
          <AppSidebar user={payload as User} />
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      );
    } else {
      return (
        <div>
          トークンの形式が不正です
          <LogoutButton />
        </div>
      );
    }
  } catch {
    return (
      <div>
        トークンが無効です
        <LogoutButton />
      </div>
    );
  }
}
