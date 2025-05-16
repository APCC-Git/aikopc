'use client';

import { DashboardBreadcrumb } from '@/components/DashboardBreadcrumb';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

type Category = {
  id: string;
  name: string;
};

export default function Page() {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/blog/category', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data !== null && typeof data === 'object' && 'contents' in data) {
          setCategories(data.contents as Category[]);
        }
      } else {
        alert('カテゴリの取得に失敗しました');
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/blog/post', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        text: text,
        categoryId: selectedCategory?.id,
      }),
    });
    if (res.ok) {
      alert('投稿が正常に完了しました');
    } else {
      alert('投稿に失敗しました');
    }
  };

  const getCategories = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/blog/category', {
      method: 'POST',
    });
    if (res.ok) {
      console.log(await res.json());
    } else {
      alert('投稿に失敗しました');
    }
  };

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
        <form onSubmit={handleSubmit} className="w-full mb-16 md:mb-5 space-y-10">
          <div className="w-full h-16"></div>
          <div className={'w-full mt-5'}>
            <div className={'font-bold'}>タイトル</div>
            <Input
              placeholder="タイトルを入力"
              className={'mt-3'}
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={'w-full mt-10'}>
            <div className={'font-bold'}>内容</div>
            <div className="shadow-sm w-full max-h-full mt-3 rounded-lg">
              <SimpleEditor setTextAction={setText} />
            </div>
          </div>
          <div className={'w-full mt-5'}>
            <div className={'font-bold'}>アイキャッチ</div>
            <Input placeholder="画像アップローダーを実装予定" className={'mt-3'} />
          </div>
          {/*カテゴリ選択*/}
          <div className={'w-full mt-5'}>
            <div className={'font-bold'}>カテゴリ</div>
            <div className="mt-3">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {selectedCategory ? selectedCategory.name : 'カテゴリを選択'}
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="min-w-[200px] bg-white rounded-md shadow-lg p-1 z-50"
                    align="start"
                  >
                    {categories.map(category => (
                      <DropdownMenu.Item
                        key={category.id}
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category.name}
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </div>
          <div className={'flex justify-start gap-2'}>
            <Button type={'submit'}>投稿</Button>
            <Button type={'button'} variant={'outline'}>
              下書きに保存
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
