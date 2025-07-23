'use client';
import { useEffect, useState } from 'react';
//import HeaderSvg from '@/components/HeaderSvg';

type Props = {
  rainbow?: boolean; //true:レインボー false:単色
  textColor?: string;
  color?: string;
  bg?: string;
  singleColor?: string;
};

export default function Header({
  bg = 'black',
  color = 'white',
  rainbow = false,
  singleColor = 'orange',
  textColor = 'white',
}: Props) {
  const padding = 6;
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const [colorStates, setColorStates] = useState<boolean[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [pointColor, setPointColor] = useState<string>(bg);
  const [isOpen, setIsOpen] = useState(false);

  //ドロワーメニュー開閉
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
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
    <header className={`h-40 overflow-hidden`} style={{ backgroundColor: color }}>
      <div className={'relative h-full'}>
        <div className={'absolute h-full w-full'}>
          {/*中抜き*/}
          <div className={'flex h-full w-full flex-col'}>
            {/*一段目*/}
            <div className={'flex h-20 w-full'} style={{ padding: `${padding}px` }}>
              <div className={'h-full w-full'} style={{ backgroundColor: bg }}>
                {/*ナビゲーション*/}
                <div className={'flex h-full w-full justify-between'}>
                  <div
                    className={'font-Saiba z-80 ml-1 text-7xl xl:text-8xl'}
                    style={{ color: textColor }}
                  >
                    AIKOPC
                  </div>

                  <div className={'flex w-full justify-end'}>
                    <div
                      className={'font-Saiba z-80 hidden text-7xl text-white lg:block'}
                      style={{ color: textColor }}
                    >
                      ABOUT
                    </div>
                    <div
                      className={'font-Saiba z-80 ml-3 hidden text-7xl text-white lg:block'}
                      style={{ color: textColor }}
                    >
                      BLOG
                    </div>
                    <button
                      className={'z-50 ml-2 h-full w-16 p-2 sm:flex sm:flex-col lg:hidden'}
                      onClick={toggleMenu}
                    >
                      <div className={'h-1/3 w-full p-1'}>
                        <div
                          className={'h-full w-full'}
                          style={{
                            backgroundColor: color,
                            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 6% 100%, 0 50%)',
                          }}
                        ></div>
                      </div>
                      <div className={'h-1/3 w-full p-1'}>
                        <div
                          className={'h-full w-full'}
                          style={{
                            backgroundColor: color,
                            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 6% 100%, 0 50%)',
                          }}
                        ></div>
                      </div>
                      <div className={'h-1/3 w-full p-1'}>
                        <div
                          className={'h-full w-full'}
                          style={{
                            backgroundColor: color,
                            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 6% 100%, 0 50%)',
                          }}
                        ></div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className={'flex h-full w-10 flex-col'}>
                <div
                  className={'relative -left-[1px] h-3/4 w-full'}
                  style={{ backgroundColor: bg }}
                ></div>
                <div
                  className={'relative -left-[1px] h-1/4 w-full'}
                  style={{
                    backgroundColor: bg,
                    clipPath: 'polygon(0 0, 100% 0, 78% 100%, 0 100%)',
                  }}
                ></div>
              </div>
            </div>
            {/*二段目*/}
            <div
              className={'z-40 flex h-10 w-full'}
              style={{ padding: `${padding}px`, paddingTop: '0px' }}
            >
              <div className={'h-full w-full'}>
                <div
                  className={'relative -top-[11px] h-11 w-full'}
                  style={{ backgroundColor: bg }}
                ></div>
              </div>
              <div className={'justify-left flex h-full w-32'}>
                <div
                  className={'relative -top-[11px] -left-[1px] h-11 w-24'}
                  style={{
                    backgroundColor: bg,
                    clipPath: 'polygon(0 0, 87% 0, 64% 100%, 0 100%)',
                  }}
                ></div>
                <div className={'h-full w-8'}></div>
              </div>
            </div>
            {/*三段目*/}
            <div className={'z-40 flex h-10 w-full'}>
              <div className={'flex h-full w-[25%]'}>
                <div
                  className={'flex h-full w-full'}
                  style={{ padding: `${padding}px`, paddingTop: '0px' }}
                >
                  <div className={'relative -top-[11px] flex h-11 w-10 flex-col'}>
                    <div className={'h-1/4 w-10'} style={{ backgroundColor: bg }}></div>
                    <div
                      className={'h-3/4 w-10'}
                      style={{
                        backgroundColor: bg,
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 42% 100%)',
                      }}
                    ></div>
                  </div>
                  <div
                    className={'relative -top-[11px] h-11 w-full'}
                    style={{ backgroundColor: bg }}
                  ></div>
                </div>
              </div>
              <div className={'h-full w-[75%]'}>
                <div
                  className={`relative -top-[11px] -left-2 h-11 w-10`}
                  style={{
                    clipPath: 'polygon(0 0, 100% 0%, 50% 100%, 0% 100%)',
                    backgroundColor: bg,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className={'absolute bottom-0 left-0 h-10 w-[25%]'}>
          <div className={'flex h-full w-full'}>
            <div
              className={`absolute h-10 w-5`}
              style={{ clipPath: 'polygon(0 0, 0% 100%, 100% 100%)', backgroundColor: bg }}
            ></div>
            <div className={'z-50 flex h-full w-full'}>
              <div
                className={'absolute -top-[7px] left-[8px] h-9 w-10'}
                style={{
                  backgroundColor: pointColor,
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 47% 100%)',
                }}
              ></div>
              <div
                className={
                  '3xl:w-[96%] 4xl:w-[98%] 5xl:w-[100%] absolute -top-[7px] left-[31px] h-9 w-[76%] md:w-[88%] lg:w-[90%] xl:w-[92%] 2xl:w-[94%]'
                }
                style={{ backgroundColor: pointColor }}
              ></div>
              <div
                className={'absolute -top-[7px] -right-[25px] h-9 w-10'}
                style={{
                  backgroundColor: pointColor,
                  clipPath: 'polygon(0 0, 100% 0, 59% 100%, 0% 100%)',
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
            const attachColor = rainbow ? `hsl(${hue}, 100%, 60%)` : isActive ? singleColor : color;

            return (
              <div
                key={index}
                className={`absolute -top-[6px] z-60 h-9 w-10 transition-colors duration-300`}
                style={{
                  backgroundColor: attachColor,
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
