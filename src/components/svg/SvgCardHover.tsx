'use client';

import { useState, useRef, useEffect } from 'react';
import { LaptopSvg } from '@/components/svg/LaptopSvg';
import { PlanningSvg } from '@/components/svg/PlanningSvg';
import { PresentationSvg } from './PresentationSvg';
import { EmptyBox } from '@/components/svg/EmptyBox';

const contents = {
  laptop: {
    title: '充実した機材',
    describe: '一人一台PCと開発環境を完備し、快適な開発作業が可能です。',
  },
  planning: {
    title: 'プロジェクト活動',
    describe: '実践的なプロジェクトを通じて、チーム開発の経験を積むことができます。',
  },
  web: {
    title: '技術サポート',
    describe: '先輩部員による丁寧な指導体制、プログラミング講座を整えています。',
  },
};

export function SvgCardHover() {
  const [hoverTarget, setHoverTarget] = useState<'laptop' | 'planning' | 'web' | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [describe, setDescribe] = useState<string | null>(null);
  const [cardPos, setCardPos] = useState({ top: 0, left: 30 });

  const cardRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const planningRef = useRef<HTMLDivElement>(null);
  const webRef = useRef<HTMLDivElement>(null);

  // hoverTarget が変わるたびに位置を更新
  useEffect(() => {
    const targetRef =
      hoverTarget === 'laptop'
        ? laptopRef
        : hoverTarget === 'planning'
          ? planningRef
          : hoverTarget === 'web'
            ? webRef
            : null;

    if (hoverTarget) {
      setTitle(contents[hoverTarget].title);
      setDescribe(contents[hoverTarget].describe);
    }

    if (targetRef?.current) {
      const rect = targetRef.current.getBoundingClientRect();
      console.log(rect.top, window.scrollY);
      setCardPos({
        top: 0,
        left: rect.left + rect.width / 2 - 30,
      });
    }
  }, [hoverTarget]);

  return (
    <div className="relative flex w-full flex-1 flex-col items-center justify-center md:space-y-0 lg:flex-row">
      {/* 動く Card */}
      <div
        className="bg-background/80 border-accent-primary-400/50 absolute z-0 -translate-x-1/2 rounded-xl border p-5 transition-all duration-300 ease-in-out"
        style={{
          top: `${cardPos.top}px`,
          left: `${cardPos.left}px`,
          opacity: hoverTarget ? 1 : 0,
        }}
        ref={cardRef}
      >
        <EmptyBox />
        <div className="absolute top-5 left-5 pr-5 font-mono text-2xl font-bold">{title}</div>
        <div className="absolute bottom-5 left-5 pr-5 font-mono text-xl">{describe}</div>
      </div>

      {/* SVG たち */}
      <div ref={laptopRef} onMouseEnter={() => setHoverTarget('laptop')} className={'z-20 p-5'}>
        <EmptyBox className={'flex items-center justify-center'}>
          <LaptopSvg
            scale={hoverTarget === 'laptop' ? 0.7 : 1}
            className={'transition-all duration-300 ease-in-out'}
          />
        </EmptyBox>
      </div>

      <div ref={planningRef} onMouseEnter={() => setHoverTarget('planning')} className={'z-20 p-5'}>
        <EmptyBox className={'flex items-start justify-end'}>
          <PlanningSvg
            scale={hoverTarget === 'planning' ? 0.6 : 1}
            className={'transition-all duration-300 ease-in-out'}
          />
        </EmptyBox>
      </div>

      <div ref={webRef} onMouseEnter={() => setHoverTarget('web')} className={'z-20 p-5'}>
        <EmptyBox className={'flex items-start justify-end'}>
          <PresentationSvg
            scale={hoverTarget === 'web' ? 0.6 : 1}
            className={'transition-all duration-300 ease-in-out'}
          />
        </EmptyBox>
      </div>
    </div>
  );
}
