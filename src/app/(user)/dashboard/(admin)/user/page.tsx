'use client';

import { DashboardBreadcrumb } from '@/components/DashboardBreadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Download } from 'lucide-react';

interface UserData {
  userId: string;
  username: string;
  password: string;
}

// レスポンスの型定義
interface BulkRegisterResponse {
  success: boolean;
  summary: {
    total: number;
    successful: number;
    failed: number;
    failedUsers: {
      userId: string;
      username?: string;
      error: string;
    }[];
  };
}

export default function Page() {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          username,
          password,
        }),
      });
      if (response.ok) {
        alert('ユーザーが正常に追加されました');
        setUserId('');
        setUsername('');
        setPassword('');
      } else {
        alert('ユーザー追加に失敗しました');
      }
    } catch (error) {
      alert('エラーが発生しました');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleDownloadSample = () => {
    // サンプルファイルのダウンロード
    const link = document.createElement('a');
    link.href = '/csv/users.csv';
    link.download = '/csv/users.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('ファイルを選択してください');
      return;
    }

    setLoading(true);
    try {
      const users: UserData[] = [];
      const text = await file.text();
      const rows = text.split('\n');

      // ヘッダー行をスキップし、2行目から処理
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i].trim();
        if (row) {
          const [userId, username, password] = row.split(',');
          users.push({ userId, username, password });
        }
      }

      const response = await fetch('/api/auth/bulk-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users }),
      });

      const data: BulkRegisterResponse = await response.json();

      if (response.ok && data.success) {
        alert('すべてのユーザーが正常に登録されました');
        setFile(null);
        // ファイル入力をリセット
        const fileInput = document.getElementById('csv-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        // エラー詳細の表示
        let errorMessage = '一括登録中にエラーが発生しました:\n\n';
        if (data.summary && data.summary.failedUsers) {
          data.summary.failedUsers.forEach(failedUser => {
            errorMessage += `${failedUser.userId}: ${failedUser.error}\n`;
          });
        }
        alert(errorMessage);
      }
    } catch (error) {
      alert('エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={'w-full flex flex-col overflow-y-scroll'}>
      <DashboardBreadcrumb
        items={[{ label: 'ダッシュボード', href: '/dashboard' }, { label: 'ユーザー管理' }]}
      />
      <div className="w-full h-full max-h-full p-2 md:p-10 absolute z-10 overflow-scroll">
        <div className={'w-full h-16'}></div>
        <div className={'w-full flex flex-col gap-8'}>
          {/* 単一ユーザー追加フォーム */}
          <div>
            <h2 className={'font-bold text-xl mb-4'}>単一ユーザーを追加</h2>
            <form onSubmit={handleSingleSubmit} className={'grid gap-4 max-w-md'}>
              <div className="grid gap-2">
                <Label htmlFor="userId">生徒番号</Label>
                <Input
                  id="userId"
                  placeholder=""
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">ユーザー名</Label>
                <Input
                  id="username"
                  placeholder=""
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">追加</Button>
            </form>
          </div>

          {/* 一括追加フォーム */}
          <div>
            <h2 className={'font-bold text-xl mb-4'}>CSVファイルで一括追加</h2>
            <form onSubmit={handleBulkSubmit} className={'grid gap-4 max-w-md'}>
              <div className="grid gap-2">
                <Label htmlFor="csv-upload">CSVファイルをアップロード</Label>
                <div className="flex items-center gap-2" style={{ width: '100%' }}>
                  <Input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={handleDownloadSample}
                  >
                    <Download size={16} />
                    サンプルCSV
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  CSVフォーマット: 生徒番号,ユーザー名,パスワード
                </p>
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? '処理中...' : '一括登録'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
