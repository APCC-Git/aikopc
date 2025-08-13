import { DashboardBreadcrumb } from '@/components/user/dashboard/DashboardBreadcrumb';

export default function Page() {
  return (
    <div>
      <DashboardBreadcrumb
        items={[{ label: 'ダッシュボード', href: '/dashboard' }, { label: 'ブログ' }]}
      />
      <div className="w-full overflow-x-auto"></div>
    </div>
  );
}
