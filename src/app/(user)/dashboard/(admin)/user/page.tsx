'use client';

import { DashboardBreadcrumb } from '@/components/DashboardBreadcrumb';
import { Button } from '@/components/ui/button';

export default function Page() {
  const handleClick = async () => {
    await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: '69119',
        username: 'Rix',
        password: 'aikopcriku0428',
      }),
    });
  };
  return (
    <div>
      <DashboardBreadcrumb
        items={[{ label: 'ダッシュボード', href: '/dashboard' }, { label: 'ユーザー管理' }]}
      />
      <div className="w-full overflow-x-auto">
        <div className={'w-full h-16'}></div>
        <Button onClick={handleClick}>ユーザー追加</Button>
      </div>
    </div>
  );
}
