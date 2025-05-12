import { DashboardBreadcrumb } from '@/components/DashboardBreadcrumb';

export default function Page() {
  return (
    <div>
      <DashboardBreadcrumb
        items={[
          { label: 'ダッシュボード', href: '/dashboard' },
          { label: 'ブログ', href: '/dashboard/blog' },
          { label: '下書き' },
        ]}
      />
      <div className="w-full overflow-x-auto"></div>
    </div>
  );
}
