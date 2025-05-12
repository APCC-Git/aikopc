import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { LogoutButton } from '@/components/ui/logoutButton';
import { Card } from '@/components/ui/card';
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const token = (await cookies()).get('token')?.value;

  if (!token) redirect("/login");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    // 型ガードで判定
    if (typeof payload === 'object' && payload !== null && 'userId' in payload) {
      return (
        <div>{children}</div>
      )
    } else {
      return <div>トークンの形式が不正です</div>;
    }
  } catch {
    return <div>トークンが無効です</div>;
  }
}

function SidebarLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        'block px-4 py-2 rounded hover:bg-gray-200 transition-colors text-gray-700 font-medium'
      )}
    >
      {children}
    </Link>
  )
}
