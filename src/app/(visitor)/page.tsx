import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CodeAnimation from '@/components/macos/effect/CodeAnimation/CodeAnimation';
// import Tabs

export default function Home() {
  return (
    <div
      className={
        'block h-[calc(100vh-5rem)] w-full items-center justify-center lg:flex lg:h-[calc(100vh-6rem)]'
      }
    >
      <div className={'flex h-full flex-col items-center justify-center space-y-8 p-8 lg:w-1/2'}>
        <div className={'space-y-4'}>
          <h1 className={'font-figtree text-center text-6xl font-black md:text-8xl 2xl:text-9xl'}>
            Aikopc.net
          </h1>
          <h2 className={'font-figtree text-center text-2xl font-bold md:text-4xl 2xl:text-5xl'}>
            APCC <span className={'font-noto'}>- 愛光学園パソコン部</span>
          </h2>
        </div>
        <div className={'space-y-5'}>
          <div
            className={
              'font-noto px-7 text-center text-lg text-gray-600 md:text-xl 2xl:text-2xl dark:text-gray-400'
            }
          >
            愛光学園パソコン部では、競技プログラミング、Webデザイン、ゲーム制作、自作PCなど、
            幅広い分野でのIT技術の習得と実践を行っています。
          </div>
          <div className={'flex w-full items-center justify-center space-x-4'}>
            <Link
              href={'https://github.com/APCC-Git'}
              target={'_blank'}
              rel={'noopener  noreferrer'}
            >
              <Button className={'font-figtree text-md rounded-full 2xl:text-lg'} size={'lg'}>
                See on Github
              </Button>
            </Link>
            <Link href={'https://x.com/APCC_'} target={'_blank'} rel={'noopener  noreferrer'}>
              <Button
                className={'font-figtree text-md rounded-full 2xl:text-lg'}
                variant={'outline'}
                size={'lg'}
              >
                See on X (Twitter)
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={'hidden h-full w-1/2 items-center justify-between p-12 py-14 lg:flex 2xl:py-24'}
      >
        <CodeAnimation />
      </div>
    </div>
  );
}

// メタデータ
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Aikopc.net' };
