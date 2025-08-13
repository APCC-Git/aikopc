import { DashboardBreadcrumb } from '@/components/user/dashboard/DashboardBreadcrumb';

export default function Page() {
  return (
    <div>
      <DashboardBreadcrumb
        items={[
          { label: 'ダッシュボード', href: '/dashboard' },
          { label: '講座', href: '/dashboard/course' },
          { label: '講座一覧' },
        ]}
      />
      <div className="w-full overflow-x-auto"></div>
    </div>
  );
}
