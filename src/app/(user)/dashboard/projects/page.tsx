import { DashboardBreadcrumb } from '@/components/user/dashboard/DashboardBreadcrumb';

export default function Page() {
  return (
    <div className={'flex w-full flex-col overflow-y-scroll'}>
      <DashboardBreadcrumb
        items={[{ label: 'ダッシュボード', href: '/dashboard' }, { label: 'プロジェクト' }]}
      />
      <div className={'h-16 w-full'}></div>
    </div>
  );
}
