import { DashboardBreadcrumb } from '@/components/DashboardBreadcrumb';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';

export default function Page() {
  return (
    <div className={'h-full flex flex-col'}>
      <DashboardBreadcrumb
        items={[
          { label: 'ダッシュボード', href: '/dashboard' },
          { label: 'ブログ', href: '/dashboard/blog' },
          { label: 'ブログ作成' },
        ]}
      />
      <div className="w-full h-full max-h-full p-2 md:p-6">
        <div className="shadow-sm w-full max-h-full">
          <SimpleEditor />
        </div>
      </div>
    </div>
  );
}
