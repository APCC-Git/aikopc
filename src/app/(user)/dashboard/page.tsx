import { DashboardBreadcrumb } from '@/components/DashboardBreadcrumb';
import { Card } from '@/components/ui/card'; // 要実装
import { Calendar, Bell, CheckSquare } from 'lucide-react'; // アイコンはインストール済み

export default function Page() {
  return (
    <div className={'w-full flex flex-col overflow-y-scroll'}>
      <DashboardBreadcrumb items={[{ label: 'ダッシュボード' }]} />

      <div className={'w-full h-16'}></div>
      {/* サマリーカードセクション */}
      <div className="w-full mb-6 p-4 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <div className="p-4 flex items-center">
              <CheckSquare className="w-8 h-8 mr-3 text-blue-600" />
              <div>
                <h3 className="font-bold text-lg">タスク</h3>
                <p className="text-gray-600">未完了 5件</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-4 flex items-center">
              <Calendar className="w-8 h-8 mr-3 text-green-600" />
              <div>
                <h3 className="font-bold text-lg">今日の予定</h3>
                <p className="text-gray-600">2件のイベント</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-4 flex items-center">
              <Bell className="w-8 h-8 mr-3 text-yellow-600" />
              <div>
                <h3 className="font-bold text-lg">お知らせ</h3>
                <p className="text-gray-600">新着 3件</p>
              </div>
            </div>
          </Card>
        </div>

        {/* アクティビティフィード */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">最近の活動</h2>
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
