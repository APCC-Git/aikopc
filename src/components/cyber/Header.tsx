'use client';
import { useEffect, useState } from 'react';
//import HeaderSvg from '@/components/HeaderSvg';

type Props = {
  rainbow?: boolean; //true:レインボー false:単色
  color?: string;
  bg?: string;
  singleColor?: string;
};

export default function Header({
  bg = 'oklch(87.2% .01 258.338)',
  color = 'black',
  rainbow = false,
  singleColor = 'orange',
}: Props) {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const [colorStates, setColorStates] = useState<boolean[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [pointColor, setPointColor] = useState<string>(bg);

  // 装飾部分描画
  // ブロック数を画面幅から決定
  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;
      const maxWidth = width / 1.08;
      const boxWidth = 40;
      const num = Math.floor(Math.min(width, maxWidth) / boxWidth);
      setCount(num);
      setColorStates(new Array(num).fill(false));
      setCurrentIndex(0);
      setIsFadingOut(false);
    };

    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  // レインボー
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 1); // 1 tick ごとに時間を進める
    }, 100); // 100ms 間隔で色変化
    return () => clearInterval(interval);
  }, []);

  // 単色
  useEffect(() => {
    setPointColor(rainbow ? `hsl(${(time * 10 + count * 8) % 360}, 100%, 60%)` : singleColor);
    const interval = setInterval(() => {
      setColorStates(prev => {
        const newStates = [...prev];

        if (isFadingOut) {
          if (currentIndex < count) {
            newStates[currentIndex] = false;
          }
        } else {
          if (currentIndex < count) {
            newStates[currentIndex] = true;
          }
        }
        return newStates;
      });

      //一周したら白に戻す
      setCurrentIndex(prev => {
        if (prev + 1 >= count) {
          setIsFadingOut(!isFadingOut);
          return 0;
        }
        return prev + 1;
      });
    }, 50); // 変化スピード(小さいほうがはやい)

    return () => clearInterval(interval);
  }, [count, currentIndex, isFadingOut]);
  return (
    <header className={`h-32 overflow-hidden`} style={{ backgroundColor: color }}>
      <div className={'relative h-full'}>
        <div className={'absolute bottom-0 left-0 h-10 w-[25%]'}>
          <div className={'flex h-full w-full'}>
            <div
              className={`absolute h-10 w-10`}
              style={{ clipPath: 'polygon(0 0, 0% 100%, 50% 100%)', backgroundColor: bg }}
            ></div>
            <div
              className={`h-10 w-10 opacity-0`}
              style={{ clipPath: 'polygon(0 0, 0% 100%, 50% 100%)' }}
            ></div>
            <div className={`h-9 w-full`} style={{ backgroundColor: pointColor }}>
              <div
                className={`absolute -right-[25px] z-40 h-9 w-10`}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 55% 100%, 0 100%)',
                  backgroundColor: pointColor,
                }}
              ></div>
              <div
                className={`absolute left-[10px] z-40 h-9 w-10`}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 45% 100%)',
                  backgroundColor: pointColor,
                }}
              ></div>
              <div
                className={`absolute -top-5 left-[0px] z-40 h-5 w-[22.22px]`}
                style={{
                  clipPath: 'polygon(0 0, 55% 0, 100% 100%, 45% 100%)',
                  backgroundColor: pointColor,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className={`absolute right-0 bottom-0 h-10 w-[75%]`} style={{ backgroundColor: bg }}>
          <div
            className={`absolute bottom-0 -left-1 h-10 w-10`}
            style={{ clipPath: 'polygon(0 0, 100% 0%, 50% 100%, 0% 100%)', backgroundColor: color }}
          ></div>
          <div
            className={`absolute bottom-0 left-[14px] h-9 w-10`}
            style={{
              clipPath: 'polygon(65.655% 0, 100% 0%, 100% 100%, 20% 100%)',
              backgroundColor: color,
            }}
          ></div>
          <div
            className={`absolute bottom-0 left-[50px] z-30 h-9 w-full`}
            style={{ backgroundColor: color }}
          ></div>
          <div
            className={`absolute right-0 bottom-0 z-30 h-10 w-12`}
            style={{ backgroundColor: bg }}
          ></div>
          <div
            className={`absolute right-[30px] bottom-0 z-40 h-9 w-10`}
            style={{ clipPath: 'polygon(0 0, 100% 0%, 55% 100%, 0% 100%)', backgroundColor: color }}
          ></div>
          <div
            className={`absolute -top-8 right-[12px] z-30 h-9 w-10`}
            style={{
              clipPath: 'polygon(45% 0, 100% 0%, 55% 100%, 0% 100%)',
              backgroundColor: color,
            }}
          ></div>
        </div>
        <div className={`absolute right-0 bottom-0 h-20 w-20`} style={{ backgroundColor: bg }}>
          <div
            className={`absolute top-0 -left-2 h-10 w-10`}
            style={{ clipPath: 'polygon(0 0, 100% 0%, 50% 100%, 0% 100%)', backgroundColor: color }}
          ></div>
          <div
            className={`absolute -top-8 -right-[28px] z-30 h-9 w-10`}
            style={{ clipPath: 'polygon(45% 0, 100% 0%, 55% 100%, 0% 100%)', backgroundColor: bg }}
          ></div>
          {Array.from({ length: count }).map((_, index) => {
            const isActive = colorStates[index];
            const hue = (time * 10 + index * 8) % 360;
            const color = rainbow ? `hsl(${hue}, 100%, 60%)` : isActive ? singleColor : bg;

            return (
              <div
                key={index}
                className={`absolute top-0 z-30 h-9 w-10 transition-colors duration-300`}
                style={{
                  backgroundColor: color,
                  clipPath: 'polygon(55% 0, 100% 0%, 55% 100%, 10% 100%)',
                  right: `${60 + index * 30}px`,
                }}
              />
            );
          })}
        </div>
        {/*<input type={'checkbox'} onChange={() => setMode(!mode)} />*/}
      </div>
    </header>
  );
}
