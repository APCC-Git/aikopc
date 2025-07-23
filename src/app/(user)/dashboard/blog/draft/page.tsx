'use client';

import { DashboardBreadcrumb } from '@/components/dashboard/DashboardBreadcrumb';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
// import { formatDistanceToNow } from 'date-fns';
// import { ja } from 'date-fns/locale';

type Draft = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const response = await fetch('/api/blog/draft');
        if (!response.ok) {
          throw new Error('下書きの取得に失敗しました');
        }
        const data = await response.json();
        // @ts-ignore
        setDrafts(data);
      } catch (error) {
        console.error('下書き取得エラー:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrafts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('この下書きを削除してもよろしいですか？')) {
      return;
    }

    try {
      const response = await fetch(`/api/blog/draft/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('下書きの削除に失敗しました');
      }

      setDrafts(drafts.filter(draft => draft.id !== id));
    } catch (error) {
      console.error('削除エラー:', error);
      alert('下書きの削除に失敗しました');
    }
  };

  return (
    <div className={'w-full flex flex-col overflow-y-scroll'}>
      <DashboardBreadcrumb
        items={[
          { label: 'ダッシュボード', href: '/dashboard' },
          { label: 'ブログ', href: '/dashboard/blog' },
          { label: '下書き' },
        ]}
      />
      <div className="w-full h-full max-h-full p-2 md:p-10 absolute z-10 overflow-y-scroll">
        <div className={'w-full h-16'}></div>
        <div className="flex justify-between items-center space-y-6">
          <h1 className="text-2xl font-bold">下書き一覧</h1>
          <Link href="/dashboard/blog/create">
            <Button>新規作成</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-10">読み込み中...</div>
        ) : drafts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">下書きはまだありません</div>
        ) : (
          <div className="grid gap-4">
            {drafts.map(draft => (
              <div
                key={draft.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors max-w-full"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">{draft.title}</h2>
                    <p className="text-sm text-gray-500">
                      最終更新: {dayjs(draft.updatedAt).format('YYYY-MM-DD')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/blog/edit/${draft.id}`}>
                      <Button variant="outline" size="sm">
                        編集
                      </Button>
                    </Link>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(draft.id)}>
                      削除
                    </Button>
                  </div>
                </div>
                {/*<p className="mt-2 text-gray-600 line-clamp-2 text-wrap">{draft.content}</p>*/}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
