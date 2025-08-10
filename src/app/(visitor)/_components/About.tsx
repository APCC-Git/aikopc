import ScrollFloat from '@/components/bits/ScrollFloat';
import { InteractiveList, type Item } from '@/components/visitor/InteractiveList';
import { LaptopSvg } from '@/components/svg/LaptopSvg';
import { PlanningSvg } from '@/components/svg/PlanningSvg';
import { PresentationSvg } from '@/components/svg/PresentationSvg';
import React from 'react';

const items: Item[] = [
  {
    name: 'laptop',
    title: '充実した機材',
    describe: '一人一台PCと開発環境を完備し、快適な開発作業が可能です。',
    content: <LaptopSvg />,
  },
  {
    name: 'planning',
    title: 'プロジェクト活動',
    describe: '実践的なプロジェクトを通じて、チーム開発の経験を積むことができます。',
    content: <PlanningSvg />,
  },
  {
    name: 'presentation',
    title: '技術サポート',
    describe: '先輩部員による丁寧な指導体制、プログラミング講座を整えています。',
    content: <PresentationSvg />,
  },
];

export const About = () => {
  return (
    <div
      id={'about'}
      className={'min-h-screen w-full flex flex-col items-center space-y-8 lg:p-8 pt-0'}
    >
      <ScrollFloat
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="top bottom+=20%"
        scrollEnd="bottom bottom-=80%"
        stagger={0.03}
        textClassName="font-figtree text-center text-6xl font-black md:text-8xl 2xl:text-9xl"
      >
        About
      </ScrollFloat>
      <div
        className={'font-noto text-center text-xs text-gray-600 md:text-xl 2xl:text-2xl p-8 pb-0'}
      >
        愛光学園パソコン部では、競技プログラミングやWebデザイン、ゲーム制作、自作PCなど、
        幅広い分野でのIT技術の習得と実践を行っています。
        <br />
        初心者から経験者まで、それぞれのレベルに合わせた活動を通じて、
        技術力の向上とクリエイティブな思考力の育成を目指しています。
      </div>
      <InteractiveList
        className={'lg:mt-6'}
        cardClassName={'p-4 bg-background/80 border-accent-primary-400/50 border rounded-xl'}
        itemClassName={'focus:outline-none rounded-xl'}
        titleClassName={'top-3 left-3 lg:top-5 lg:left-5 text-xl lg:text-2xl font-noto font-bold'}
        describeClassName={
          'bottom-3 left-3 lg:bottom-5 lg:left-5 text-sm pr-3 lg:pr-5 lg:text-lg font-noto font-normal'
        }
        contentClassName={'p-4'}
        items={items}
        initialState={0}
      />
    </div>
  );
};
