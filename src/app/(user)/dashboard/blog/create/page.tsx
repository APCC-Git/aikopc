import { DashboardBreadcrumb } from '@/components/DashboardBreadcrumb';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { Input } from '@/components/ui/input';

export default function Page() {
  return (
    <div className={'w-full flex flex-col overflow-y-scroll'}>
      <DashboardBreadcrumb
        items={[
          { label: 'ダッシュボード', href: '/dashboard' },
          { label: 'ブログ', href: '/dashboard/blog' },
          { label: 'ブログ作成' },
        ]}
      />
      <div className="w-full h-full max-h-full p-2 md:p-6 absolute z-10 overflow-scroll">
        <div className="w-full mb-16 md:mb-5">
          <div className="w-full h-16"></div>
          <div className={"w-full mt-5"}>
            <div className={"font-bold"}>タイトル</div>
            <Input placeholder="タイトルを入力" className={"mt-3"}/>
          </div>
          <div className={"w-full mt-10"}>
            <div className={"font-bold"}>内容</div>
            <div className="shadow-sm w-full max-h-full mt-3 rounded-lg">
              <SimpleEditor />
            </div>
          </div>
          <div className={"w-full mt-5"}>
            <div className={"font-bold"}>アイキャッチ</div>
            <Input placeholder="画像アップローダーを実装予定" className={"mt-3"}/>
          </div>
          <div className={"w-full mt-5"}>
            <div className={"font-bold"}>カテゴリ</div>
            <Input placeholder="APIでカテゴリ取得→選択" className={"mt-3"}/>
          </div>
          </div>
        </div>
    </div>
  );
}
