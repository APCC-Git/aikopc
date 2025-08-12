'use client';

import ScrollFloat from '@/components/bits/ScrollFloat';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { SiX, SiGithub } from '@icons-pack/react-simple-icons';

const TwitterFeed = dynamic(() => import('@/components/visitor/TwitterFeed'), {
  ssr: false,
});

export const Social = () => {
  return (
    <div id={'social'} className={'flex w-full flex-col items-center pt-0 pb-8'}>
      <ScrollFloat
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="top bottom+=20%"
        scrollEnd="bottom bottom-=80%"
        stagger={0.03}
        textClassName="font-figtree text-center text-6xl font-black md:text-8xl 2xl:text-9xl px-8 lg:pb-8"
      >
        Social
      </ScrollFloat>
      <div className={'w-full max-w-7xl p-4'}>
        <div className={'shadow-lg md:flex'}>
          <div className={'w-full overflow-x-hidden md:w-1/2'}>
            <TwitterFeed className={'rounded-2xl'} />
          </div>
          <div
            className={
              'hidden w-full flex-col items-center justify-center gap-10 rounded-r-lg bg-[#fafafa] md:flex md:w-1/2'
            }
          >
            <div
              className={
                'font-figtree font-outline-1 text-center text-7xl font-black text-black underline underline-offset-8 transition-colors duration-300 ease-in-out hover:text-white'
              }
            >
              FOLLOW US!
            </div>
            <div className={'flex flex-col gap-6'}>
              <Link
                href={'https://github.com/APCC-Git'}
                target={'_blank'}
                rel={'noopener  noreferrer'}
                className={'flex items-center justify-start gap-4'}
              >
                <SiGithub size={50} className={'text-black'} />
                <span className={'font-figtree text-5xl font-black text-black'}>GitHub</span>
              </Link>
              <Link
                href={'https://x.com/APCC_'}
                target={'_blank'}
                rel={'noopener noreferrer'}
                className={'flex items-center justify-start gap-4'}
              >
                <SiX size={50} className={'text-black'} />
                <span className={'font-figtree text-5xl font-black text-black'}>Twitter</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
