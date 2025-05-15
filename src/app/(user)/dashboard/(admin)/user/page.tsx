'use client';

import { DashboardBreadcrumb } from '@/components/DashboardBreadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';

export default function Page() {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    console.log(username, password, userId);
    await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId,
        username: username,
        password: password,
      }),
    });
  };
  return (
    <div className={'w-full flex flex-col overflow-y-scroll'}>
      <DashboardBreadcrumb
        items={[{ label: 'ダッシュボード', href: '/dashboard' }, { label: 'ユーザー管理' }]}
      />
      <div className="w-full h-full max-h-full p-2 md:p-10 absolute z-10 overflow-scroll">
        <div className={'w-full h-16'}></div>
        <div className={'w-full flex flex-col'}>
          <div className={'font-bold'}>ユーザーを追加</div>
          <div className={'w-full h-96 mt-3'}>
            <form onSubmit={handleSubmit} className={'grid gap-2'}>
              <div className="grid gap-2">
                <Label htmlFor="number">生徒番号</Label>
                <Input
                  placeholder=""
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="number">ユーザー名</Label>
                <Input
                  placeholder=""
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center">
                <Label htmlFor="password">パスワード</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                追加
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
