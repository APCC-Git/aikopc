import Link from 'next/link';
import { WonderingManSvg } from '@/components/svg/WonderingManSvg';
import { Button } from '@/components/common/ui/button';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-fixed bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
      <WonderingManSvg />
      <h1 className="text-3xl font-bold mt-6">ページが見つかりません</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        お探しのページは存在しないか、移動された可能性があります。
      </p>
      <Link href={'/'}>
        <Button
          className={
            'mt-6 font-noto font-bold text-md 2xl:text-lg text-foreground dark:text-background bg-accent-primary-400 hover:bg-accent-primary-500 border-accent-primary-400 dark:border-accent-primary-400'
          }
          size={'lg'}
          variant={'default'}
        >
          ホームへ戻る
        </Button>
      </Link>
    </main>
  );
}
