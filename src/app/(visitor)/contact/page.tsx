import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <div className={'w-full p-4 md:p-10'}>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold md:text-4xl">お問い合わせ</h1>

        <form className="space-y-6">
          {/* お名前 */}
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              お名前
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full rounded-md border px-3 py-2"
              required
            />
          </div>

          {/* メールアドレス */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-md border px-3 py-2"
              required
            />
          </div>

          {/* 件名 */}
          <div>
            <label htmlFor="subject" className="mb-2 block text-sm font-medium">
              件名
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full rounded-md border px-3 py-2"
              required
            />
          </div>

          {/* お問い合わせ内容 */}
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium">
              お問い合わせ内容
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full rounded-md border px-3 py-2"
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
