import { ReactNode } from 'react';
import { LogoutButton } from '@/components/ui/logoutButton';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { getUser } from '@/lib/auth';
import { User } from '@/types/prisma';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  try {
    const payload = await getUser();

    // 型ガードで判定
    if (payload) {
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
