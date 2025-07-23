import { ReactNode } from 'react';
import { LogoutButton } from '@/components/ui/logoutButton';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
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
        <div className="text-center flex flex-col justify-center mt-20">
          <div className="flex items-center flex-col">
            セッション期限が切れています。再度ログインしてください
            <LogoutButton />
          </div>
        </div>
      );
    }
  } catch {
    return (
      <div className="text-center flex flex-col justify-center mt-20">
        <div className="flex items-center flex-col">
          セッション期限が切れています。再度ログインしてください
          <LogoutButton />
        </div>
      </div>
    );
  }
}
