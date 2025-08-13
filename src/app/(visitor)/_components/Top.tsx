'use client';
import TextType from '@/components/bits/TextType';
import Link from 'next/link';
import { Button } from '@/components/common/ui/button';
import { CodingSvg } from '@/components/svg/CodingSvg';
import ScrollHint from '@/components/visitor/ScrollHint';
import { announce } from '@/lib/announce';

export const Top = () => {
  announce();
  return (
    <div id={'top'} className={'w-full items-center justify-center lg:flex'}>
      <div className={'flex h-screen flex-col items-center justify-center space-y-8 p-8 lg:w-1/2'}>
        <div className={'space-y-4'}>
          <h1 className={'font-figtree text-center text-6xl font-black md:text-8xl 2xl:text-9xl'}>
            Aikopc.net
          </h1>
          <h2 className={'font-figtree text-center text-2xl font-bold md:text-4xl 2xl:text-5xl'}>
            APCC <span className={'font-noto'}>- 愛光学園パソコン部</span>
          </h2>
        </div>
        <div className={'flex w-full flex-col items-center justify-center space-y-5'}>
          <TextType
            text={['Welcome to Our Site!', 'Scroll Down to See More!']}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="▎"
            className="font-figtree mx-auto px-7 text-center text-lg md:text-2xl 2xl:text-3xl"
          />
          <div
            className={
              'flex w-full flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4'
            }
          >
            <Link
              href={'https://github.com/APCC-Git'}
              target={'_blank'}
              rel={'noopener  noreferrer'}
              tabIndex={-1}
            >
              <Button
                className={
                  'font-figtree text-md text-foreground dark:text-background bg-accent-primary-400 hover:bg-accent-primary-500 border-accent-primary-400 dark:border-accent-primary-400 2xl:text-lg'
                }
                size={'lg'}
                variant={'default'}
              >
                See on Github
              </Button>
            </Link>
            <Link
              href={'https://x.com/APCC_'}
              target={'_blank'}
              rel={'noopener noreferrer'}
              tabIndex={-1}
            >
              <Button
                className={
                  'font-figtree text-md border-accent-primary-400 dark:border-accent-primary-400 2xl:text-lg'
                }
                size={'lg'}
                variant={'outline'}
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
        <CodingSvg scale={1.5} />
      </div>
      <ScrollHint />
    </div>
  );
};
