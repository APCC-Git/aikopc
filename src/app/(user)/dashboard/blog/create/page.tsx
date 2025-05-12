import { DashboardBreadcrumb } from '@/components/DashboardBreadcrumb';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';

export default function Page() {
  return (
    <div>
      <DashboardBreadcrumb
        items={[
          { label: 'ダッシュボード', href: '/dashboard' },
          { label: 'ブログ', href: '/dashboard/blog' },
          { label: 'ブログ作成' },
        ]}
      />
      <div className="w-full overflow-x-auto p-2 md:p-4">
        <SimpleEditor></SimpleEditor>
      </div>
    </div>
  );
}
