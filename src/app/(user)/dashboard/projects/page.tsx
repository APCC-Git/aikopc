import { DashboardBreadcrumb } from '@/components/dashboard/DashboardBreadcrumb';

export default function Page() {
  return (
    <div className={'w-full flex flex-col overflow-y-scroll'}>
      <DashboardBreadcrumb
        items={[{ label: 'ダッシュボード', href: '/dashboard' }, { label: 'プロジェクト' }]}
      />
      <div className={'w-full h-16'}></div>
    </div>
  );
}
