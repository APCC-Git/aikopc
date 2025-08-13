import { ReactNode } from 'react';
import { LogoutButton } from '@/components/user/LogoutButton';
import { AppSidebar } from '@/components/user/dashboard/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/common/ui/sidebar';
import { getUser } from '@/lib/auth';
import { User } from '@/types/prisma';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  try {
    const payload = await getUser();

    if (payload) {
      return (
        <SidebarProvider>
          <AppSidebar user={payload as User} />
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      );
    } else {
      return (
        <div className="mt-20 flex flex-col justify-center text-center">
          <div className="flex flex-col items-center">
            セッション期限が切れています。再度ログインしてください
            <LogoutButton />
          </div>
        </div>
      );
    }
  } catch {
    return (
      <div className="mt-20 flex flex-col justify-center text-center">
        <div className="flex flex-col items-center">
          セッション期限が切れています。再度ログインしてください
          <LogoutButton />
        </div>
      </div>
    );
  }
}
