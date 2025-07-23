import { DashboardBreadcrumb } from '@/components/dashboard/DashboardBreadcrumb';
import { Card } from '@/components/ui/card'; // 要実装
import { Calendar, Bell, CheckSquare } from 'lucide-react'; // アイコンはインストール済み

export default function Page() {
  return (
    <div className={'flex w-full flex-col overflow-y-scroll'}>
      <DashboardBreadcrumb items={[{ label: 'ダッシュボード' }]} />

      <div className={'h-16 w-full'}></div>
      {/* サマリーカードセクション */}
      <div className="mb-6 w-full p-4 md:p-10">
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <div className="flex items-center p-4">
              <CheckSquare className="mr-3 h-8 w-8 text-blue-600" />
              <div>
                <h3 className="text-lg font-bold">タスク</h3>
                <p className="text-gray-600">未完了 5件</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center p-4">
              <Calendar className="mr-3 h-8 w-8 text-green-600" />
              <div>
                <h3 className="text-lg font-bold">今日の予定</h3>
                <p className="text-gray-600">2件のイベント</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center p-4">
              <Bell className="mr-3 h-8 w-8 text-yellow-600" />
              <div>
                <h3 className="text-lg font-bold">お知らせ</h3>
                <p className="text-gray-600">新着 3件</p>
              </div>
            </div>
          </Card>
        </div>

        {/* アクティビティフィード */}
        <div className="mb-6">
          <h2 className="mb-4 text-xl font-bold">最近の活動</h2>
          <Card>
            <div className="p-4">
              {/* ここにアクティビティリストを実装 */}
              <p className="text-gray-600">アクティビティはまだありません</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
