import { DashboardBreadcrumb } from '@/components/DashboardBreadcrumb';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { Input } from '@/components/ui/input';

export default function Page() {
  return (
    <div className={'w-full flex flex-col overflow-scroll'}>
      <DashboardBreadcrumb
        items={[
          { label: 'ダッシュボード', href: '/dashboard' },
          { label: 'ブログ', href: '/dashboard/blog' },
          { label: 'ブログ作成' },
        ]}
      />
      <div className="w-full h-full max-h-full p-2 md:p-6 flex flex-col justify-between overflow-scroll">
        <Input placeholder="タイトルを入力" className={"mt-10"}/>
        <Input placeholder="タイトルを入力" className={"mt-10"}/>
        <Input placeholder="タイトルを入力" className={"mt-10"}/>
        <div className="shadow-sm w-full max-h-full mt-10">
          <SimpleEditor />
        </div>
      </div>
    </div>
  );
}
