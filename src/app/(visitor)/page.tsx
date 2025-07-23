import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import CodeAnimation from '@/components/macos/effect/CodeAnimation/CodeAnimation';

const slidesData = [
  {
    content: (
      <Image
        src="/images/sample1.jpg"
        fill
        className="object-cover bg-[rgb(199 199 199)] absolute"
        alt="Placeholder Image"
      />
    ),
  },
  {
    content: (
      <Image
        src="/images/sample2.jpg"
        fill
        className="object-cover bg-[rgb(199 199 199)]"
        alt="Placeholder Image"
      />
    ),
  },
  {
    content: (
      <Image
        src="/images/sample3.jpg"
        fill
        className="object-cover bg-[rgb(199 199 199)]"
        alt="Placeholder Image"
      />
    ),
  },
];

export default function Home() {
  return (
    <div className={'h-[calc(100vh-5rem)] w-full block lg:flex items-center justify-center'}>
      <div className={'h-full lg:w-1/2 p-8 space-y-8 flex flex-col items-center justify-center'}>
        <div className={'space-y-4'}>
          <div className={'font-figtree text-8xl text-center 2xl:text-9xl'}>Aikopc.net</div>
          <div className={'font-noto text-4xl text-center 2xl:text-5xl'}>
            APCC - 愛光学園パソコン部
          </div>
        </div>
        <div className={'space-y-4'}>
          <div className={'text-center text-xl 2xl:text-2xl text-gray-600 dark:text-gray-400'}>
            愛光学園パソコン部では、競技プログラミング、Webデザイン、ゲーム制作、自作PCなど、
            幅広い分野でのIT技術の習得と実践を行っています
          </div>
          <div className={'flex w-full items-center justify-center space-x-4'}>
            <Link
              href={'https://github.com/APCC-Git'}
              target={'_blank'}
              rel={'noopener  noreferrer'}
            >
              <Button className={'rounded-full text-md 2xl:text-lg'}>See on Github</Button>
            </Link>
            <Link href={'https://x.com/APCC_'} target={'_blank'} rel={'noopener  noreferrer'}>
              <Button className={'rounded-full text-md 2xl:text-lg'} variant={'outline'}>
                See on X (Twitter)
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className={'hidden lg:flex h-full w-1/2 p-8 items-center justify-between'}>
        <CodeAnimation />
      </div>
    </div>
  );
}

// メタデータ
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Aikopc.net' };
