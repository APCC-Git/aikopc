import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <div className={'w-full p-4 md:p-10'}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold mb-6">お問い合わせ</h1>

        <form className="space-y-6">
          {/* お名前 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              お名前
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {/* メールアドレス */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {/* 件名 */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              件名
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {/* お問い合わせ内容 */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              お問い合わせ内容
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled>
            現在準備中です
          </Button>
        </form>
      </div>
    </div>
  );
}

// メタデータ
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Contact | パソコン部' };
