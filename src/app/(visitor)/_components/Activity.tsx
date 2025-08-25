'use client';

import { useRef } from 'react';

import ScrollFloat from '@/components/bits/ScrollFloat';
import { MacOSWindow } from '@/components/visitor/MacOSWindow';

import { ProgrammingSvg } from '@/components/svg/ProgrammingSvg';
import { WebDesignSvg } from '@/components/svg/WebDesignSvg';
import { AiSvg } from '@/components/svg/AiSvg';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export const Activity = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const listItems = [
    {
      title: 'Game Creation',
      content: (
        <div className="flex h-full flex-col overflow-hidden p-4 md:flex-row md:p-5 xl:p-8">
          <div className={'h-full flex-col justify-center space-y-4 md:flex md:w-1/2 md:space-y-8'}>
            <h2 className={'font-noto text-center text-3xl font-bold md:text-left lg:text-4xl'}>
              ゲーム制作
            </h2>
            <a className={'font-noto text-sm md:leading-relaxed lg:text-sm xl:text-xl'}>
              &emsp;HSPやPython、Unity等のゲームエンジンなどを使った本格的なゲーム開発に挑戦します。プログラミングだけでなく、グラフィックデザインやサウンド制作、ストーリー構成など、ゲーム制作の様々な側面を学ぶことができます。
              <br />
              &emsp;個人作品からチーム制作まで、オリジナルゲームを完成させる達成感を味わえます。
            </a>
          </div>
          <div className={'flex h-full items-center justify-center md:w-1/2'}>
            <Image
              src={'/images/controller-o.png'}
              alt={'controller'}
              width={400}
              height={400}
              className={'block dark:hidden'}
            />
            <Image
              src={'/images/controller-g.png'}
              alt={'controller'}
              width={400}
              height={400}
              className={'hidden dark:block'}
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Competitive Programming',
      content: (
        <div className="flex h-full flex-col overflow-hidden p-4 md:flex-row md:p-5 xl:p-8">
          <div className={'h-full flex-col justify-center space-y-4 md:flex md:w-1/2 md:space-y-8'}>
            <h2 className={'font-noto text-center text-3xl font-bold md:text-left lg:text-4xl'}>
              競技プログラミング
            </h2>
            <a className={'font-noto text-sm md:leading-relaxed lg:text-sm xl:text-xl'}>
              &emsp;競技プログラミングとは、与えられた問題を効率的なアルゴリズムで解くスピードと正確さを競う知的スポーツです。
              <br />
              &emsp;部員たちはAtCoderなどのプラットフォームで腕を磨き、論理的思考力とコーディング技術を向上させています。初心者向けのプログラミング講座から、コンテスト参加まで、それぞれのレベルに合わせた活動を行っています。
            </a>
          </div>
          <div className={'flex h-full items-center justify-center md:w-1/2'}>
            <ProgrammingSvg />
          </div>
        </div>
      ),
    },
    {
      title: 'Web Design',
      content: (
        <div className="flex h-full flex-col overflow-hidden p-4 md:flex-row md:p-5 xl:p-8">
          <div className={'h-full flex-col justify-center space-y-4 md:flex md:w-1/2 md:space-y-8'}>
            <h2 className={'font-noto text-center text-3xl font-bold md:text-left lg:text-4xl'}>
              Webデザイン
            </h2>
            <a className={'font-noto text-sm md:leading-relaxed lg:text-sm xl:text-xl'}>
              &emsp;HTMLやCSS、JavaScriptを活用したWebサイト制作を学びます。デザインの基礎からレスポンシブ対応、モダンなフレームワークまで、実践的なスキルを身につけられます。
              <br />
              &emsp;このサイトも部員たちの手で作られており、プロジェクトを通じて企画からデザイン、実装までの一連の流れを経験できます。
            </a>
          </div>
          <div className={'flex h-full items-center justify-center md:w-1/2'}>
            <WebDesignSvg />
          </div>
        </div>
      ),
    },
    {
      title: 'AI',
      content: (
        <div className="flex h-full flex-col overflow-hidden p-4 md:flex-row md:p-5 xl:p-8">
          <div className={'h-full flex-col justify-center space-y-4 md:flex md:w-1/2 md:space-y-8'}>
            <h2 className={'font-noto text-center text-3xl font-bold md:text-left lg:text-4xl'}>
              AI
            </h2>
            <a className={'font-noto text-sm md:leading-relaxed lg:text-sm xl:text-xl'}>
              &emsp;人工知能（AI）技術の基礎から応用までを探求します。機械学習やディープラーニングの基本概念を学び、実際にPythonを使った画像認識や自然言語処理などの実装に挑戦します。
              <br />
              &emsp;最新のAIツールやモデルを活用したプロジェクト開発を通じて、未来を切り拓く技術に触れることができます。
            </a>
          </div>
          <div className={'flex h-full items-center justify-center md:w-1/2'}>
            <AiSvg />
          </div>
        </div>
      ),
    },
  ];

  useGSAP(
    () => {
      const listWrapperEl = document.querySelector('.list-wrapper') as HTMLElement;
      const listEl = document.querySelector('.list-container') as HTMLElement;

      if (!listWrapperEl || !listEl) return;

      // 各アイテムの要素を取得
      const items = listEl.querySelectorAll('.horizontal-item') as NodeListOf<HTMLElement>;
      if (items.length === 0) return;

      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      // 中央に寄せるためのオフセット
      const startOffset = (listWrapperEl.clientWidth - firstItem.clientWidth) / 2;
      const endOffset = (listWrapperEl.clientWidth - lastItem.clientWidth) / 2;

      // 各アイテムのスナップポイントを計算
      const snapPoints: number[] = [];
      let accumulatedWidth = startOffset;

      items.forEach((item, index) => {
        if (index === 0) {
          // 最初のアイテムは開始位置
          snapPoints.push(0);
        } else {
          // 各アイテムの左端位置を計算
          const itemPosition = -accumulatedWidth + startOffset;
          const totalDistance =
            listEl.clientWidth - listWrapperEl.clientWidth + startOffset + endOffset;
          const normalizedPosition = Math.abs(itemPosition) / totalDistance;
          snapPoints.push(normalizedPosition);
        }
        accumulatedWidth += item.clientWidth;
      });

      // 最後のポイント（終端）を追加
      snapPoints.push(1);

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () =>
            `+=${listEl.clientWidth - listWrapperEl.clientWidth + startOffset + endOffset}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: snapPoints, // 計算されたスナップポイントを使用
            duration: { min: 0.3, max: 0.8 },
            delay: 0.03,
            ease: 'power2.inOut',
          },
          onUpdate: function (self) {
            const progress = self.progress;
            // console.log('Progress:', progress);

            // 現在のアイテムインデックスを計算
            // const currentItemIndex = Math.min(
            //   Math.floor(progress * items.length),
            //   items.length - 1
            // );
            // console.log('Current item index:', currentItemIndex);
          },
        },
      });

      // タイムラインにラベルを追加してスナップポイントを明確化
      items.forEach((_, index) => {
        const progress = snapPoints[index];
        tl.addLabel(`item${index}`, progress);
      });

      tl.fromTo(
        listEl,
        {
          x: startOffset, // 最初から中央寄せ
        },
        {
          x: -(listEl.clientWidth - listWrapperEl.clientWidth + endOffset), // 最後も中央寄せ
          ease: 'none', // スクラブ時は線形補間を使用
        }
      );

      // console.log('Snap points:', snapPoints);
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id={'activity'}
      className={'flex h-screen w-full flex-col items-center overflow-x-hidden pt-0 pb-8'}
    >
      <ScrollFloat
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="top bottom+=20%"
        scrollEnd="bottom bottom-=80%"
        stagger={0.03}
        textClassName="font-figtree text-center text-6xl font-black md:text-8xl 2xl:text-9xl px-8 lg:pb-8"
      >
        Activity
      </ScrollFloat>
      <div className={'list-wrapper relative flex h-full w-full'}>
        <div className={'list-container absolute top-3 flex h-full'}>
          {listItems.map((item, index) => (
            <div
              className={
                'horizontal-item flex h-full w-screen p-3 pt-0 lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl 2xl:p-10'
              }
              id={`window${index}`}
              key={index}
            >
              <MacOSWindow
                title={item.title}
                className={'bg-background/80 h-full w-full flex-1 rounded-xl'}
              >
                {item.content}
              </MacOSWindow>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
