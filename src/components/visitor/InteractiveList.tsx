'use client';

import React, { useState, useEffect, useRef } from 'react';
import { EmptyBox } from '@/components/svg/EmptyBox';
import { useSVG } from '@/hooks/useSVG';
import { useResponsive } from '@/hooks/useResponsive';

export interface Item {
  name: string;
  title: string;
  describe: string;
  content: React.ReactNode;
}

interface Props {
  items: Item[];
  className?: string;
  cardClassName?: string;
  itemClassName?: string;
  titleClassName?: string;
  describeClassName?: string;
  contentClassName?: string;
  duration?: number;
  initialState?: number | null;
}

export const InteractiveList = ({
  items,
  className,
  cardClassName = 'p-4 bg-gray-200 border-black border rounded-xl',
  itemClassName,
  titleClassName = 'top-5 left-5',
  describeClassName = 'bottom-5 left-5',
  contentClassName,
  duration = 300,
  initialState = null,
}: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const { baseSize } = useSVG();
  const breakPoint = useResponsive();

  // コンポーネントがマウントされた後、contentsの数に合わせてrefの配列を初期化
  useEffect(() => {
    // 既存のrefをクリアし、新しいrefの配列を作成
    itemRefs.current = items.map((_, i) => itemRefs.current[i] ?? null);
    if (initialState !== null && initialState <= items.length - 1) {
      updateCardPosition(initialState);
    }
  }, [items, baseSize, initialState]);

  // Cardの位置を更新
  const updateCardPosition = (index: number) => {
    if (itemRefs.current[index] && cardRef.current) {
      setTargetIndex(index);
      const rect = itemRefs.current[index]!.getBoundingClientRect();
      cardRef.current.style.top = `${rect.top + window.scrollY}px`;
      cardRef.current.style.left = `${rect.left + window.scrollX}px`;
    }
  };

  // IntersectionObserverでスクロール監視（モバイル用）
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      entries => {
        const viewportCenter = window.innerHeight / 2;
        let closestIndex: number | null = null;
        let closestDistance = Infinity;

        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.getAttribute('data-index'));
          const rect = entry.target.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        if (closestIndex !== null && window.innerWidth < 1024) {
          updateCardPosition(closestIndex);
        }
      },
      {
        root: null,
        threshold: 1, // 要素の一部が見えたら検知
      }
    );

    itemRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  return (
    <div className={`w-full flex flex-col lg:flex-row items-center justify-center ${className}`}>
      <div
        ref={cardRef}
        className={`absolute transition-all ease-in-out ${cardClassName} ${
          targetIndex !== null ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDuration: `${duration}ms` }}
      >
        <EmptyBox />
      </div>
      {items.map((item, i) => {
        return (
          <div
            ref={el => {
              itemRefs.current[i] = el;
            }}
            data-index={i}
            className={`group relative item ${itemClassName}`}
            onMouseEnter={() => updateCardPosition(i)}
            onFocus={() => updateCardPosition(i)}
            key={i}
            tabIndex={0}
          >
            <div
              className={`${titleClassName} absolute transition-all ease-in-out ${
                targetIndex == i ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDuration: `${duration}ms` }}
            >
              {item.title}
            </div>
            <div
              className={`${describeClassName} absolute transition-all ease-in-out ${
                targetIndex == i ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDuration: `${duration}ms` }}
            >
              {item.describe}
            </div>
            <div
              className={`${contentClassName} transition-all ease-in-out ${
                targetIndex == i ? 'scale-75' : 'scale-100'
              }`}
              style={{ transitionDuration: `${duration}ms` }}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};
