type Props = {
  rainbow?: boolean; //true:レインボー false:単色
  textColor?: string;
  color?: string;
  bg?: string;
  singleColor?: string;
};

export default function Window(props: any) {
  const color = 'white';
  const textColor = 'black';
  const bg = 'black';
  return (
    <div className={'h-180 w-full p-8'}>
      <div className={'relative h-full w-full'} style={{ backgroundColor: color }}>
        {/*マスク*/}
        <div className={'absolute h-full w-full'} id={'mask'}>
          {/*上*/}
          <div className={'absolute h-20 w-full'} style={{ backgroundColor: bg }}>
            <div className={'absolute right-0 h-40 w-1/5'} style={{ backgroundColor: bg }}></div>
          </div>
          {/*左*/}
          <div className={'absolute h-full w-10'} style={{ backgroundColor: bg }}>
            <div
              className={'absolute bottom-0 left-10 h-30 w-30'}
              style={{ backgroundColor: bg, clipPath: 'polygon(0 0, 0% 100%, 100% 100%)' }}
            ></div>
            <div className={'absolute h-60 w-20'} style={{ backgroundColor: bg }}></div>
            <div
              className={'absolute top-60 left-0 h-20 w-20'}
              style={{ backgroundColor: bg, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)' }}
            ></div>
          </div>
          {/*右*/}
          <div className={'absolute right-0 h-full w-10'} style={{ backgroundColor: bg }}>
            <div
              className={'absolute right-0 bottom-0 z-40 h-30 w-30'}
              style={{ backgroundColor: bg, clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }}
            ></div>
          </div>
          {/*下*/}
          <div className={'absolute bottom-0 h-10 w-full'} style={{ backgroundColor: bg }}></div>
        </div>
        {/*装飾*/}
        <div className={'absolute h-full w-full'} id={'deco'}>
          {/*上*/}
          <div className={'absolute flex h-20 w-full'}>
            <div className={'flex h-full w-4/5 flex-col'}>
              {/*上一段目*/}
              <div className={'relative h-6 w-full'}>
                <div
                  className={'absolute right-24 h-6 w-12'}
                  style={{
                    backgroundColor: color,
                    clipPath: 'polygon(0 0, 50% 0, 100% 100%, 0% 100%)',
                  }}
                ></div>
                <div
                  className={'absolute right-30 h-6 w-[calc(50%-136px)]'}
                  style={{
                    backgroundColor: color,
                  }}
                ></div>
                <div
                  className={'absolute right-[calc(50%-40px)] h-6 w-12'}
                  style={{
                    backgroundColor: color,
                    clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0% 100%)',
                  }}
                ></div>
              </div>
              {/*上二段目*/}
              <div className={'relative h-6 w-full'}>
                <div
                  className={'absolute left-14 h-6 w-12'}
                  style={{
                    backgroundColor: color,
                    clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0% 100%)',
                  }}
                ></div>
                <div
                  className={'absolute left-20 h-6 w-[calc(100%-200px)]'}
                  style={{
                    backgroundColor: color,
                  }}
                ></div>
                <div
                  className={'absolute right-24 h-6 w-12'}
                  style={{
                    backgroundColor: color,
                    clipPath: 'polygon(0% 0, 100% 0, 50% 100%, 0% 100%)',
                  }}
                ></div>
              </div>
              {/*上三段目*/}
              <div className={'relative h-8 w-full'}>
                <div
                  className={'absolute right-0 bottom-0 h-14 w-20'}
                  style={{ backgroundColor: color }}
                ></div>
                <div
                  className={'absolute right-6 bottom-0 h-14 w-28'}
                  style={{
                    backgroundColor: color,
                    clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0% 100%)',
                  }}
                ></div>
                <div
                  className={'absolute right-0 bottom-0 h-6 w-[50%]'}
                  style={{ backgroundColor: color }}
                ></div>
                <div
                  className={'absolute right-[calc(50%-24px)] bottom-0 h-6 w-12'}
                  style={{
                    backgroundColor: color,
                    clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0% 100%)',
                  }}
                ></div>
                <div
                  className={'absolute top-0 right-[calc(50%+8px)] h-6 w-12'}
                  style={{
                    backgroundColor: color,
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%, 0% 100%)',
                  }}
                ></div>
                <div
                  className={'absolute right-[calc(50%+32px)] h-6 w-[calc(50%-112px)]'}
                  style={{ backgroundColor: color }}
                ></div>
                <div
                  className={'absolute top-0 left-14 h-6 w-12'}
                  style={{
                    backgroundColor: color,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 100%)',
                  }}
                ></div>
              </div>
            </div>
            <div className={'relative h-40 w-1/5'}>
              <div
                className={
                  'absolute top-[10px] right-[20px] h-[calc(100%-26px)] w-[calc(100%-36px)] p-[3px]'
                }
                style={{
                  backgroundColor: color,
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 65px 100%, 0 calc(100% - 65px))',
                }}
              >
                <div
                  className={'h-full w-full'}
                  style={{
                    backgroundColor: bg,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 65px 100%, 0 calc(100% - 65px))',
                  }}
                >
                  <div
                    className={'absolute right-0 h-[calc(100%-40px)] w-[calc(100%-60px)]'}
                    style={{
                      backgroundColor: color,
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 60px 100%, 0 calc(100% - 60px))',
                    }}
                  >
                    <div
                      className={'font-Saiba absolute top-1 right-1 text-7xl'}
                      style={{ color: textColor }}
                    >
                      001
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={'absolute -bottom-[1px] -left-[1px] aspect-square w-[30%] max-w-20'}
                style={{ backgroundColor: color, clipPath: 'polygon(0 0, 0% 100%, 100% 100%)' }}
              ></div>
            </div>
          </div>
          {/*右*/}
          <div className={'absolute flex h-full w-20'}>
            <div className={'relative h-full w-10'}>
              <div
                className={'absolute top-16 h-20 w-10'}
                style={{
                  backgroundColor: color,
                  clipPath: 'polygon(0 50%, 100% 0, 100% 100%, 0% 100%)',
                }}
              ></div>
              <div className={'absolute top-26 h-30 w-10'} style={{ backgroundColor: color }}></div>
              <div
                className={'absolute top-46 h-20 w-10'}
                style={{
                  backgroundColor: color,
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)',
                }}
              ></div>
            </div>
            <div className={'relative h-full w-10'}>
              <div
                className={'absolute top-16 h-8 w-4'}
                style={{
                  backgroundColor: color,
                  clipPath: 'polygon(0 0, 100% 50%, 100% 100%, 0 100%)',
                }}
              ></div>
              <div className={'absolute top-20 h-40 w-4'} style={{ backgroundColor: color }}></div>
              <div
                className={'absolute top-58 h-8 w-4'}
                style={{
                  backgroundColor: color,
                  clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)',
                }}
              ></div>
            </div>
          </div>
          {/*下*/}
          <div className={'absolute bottom-0 h-10 w-full'}>
            <div
              className={'absolute bottom-0 left-10 h-[110px] w-[110px]'}
              style={{
                backgroundColor: color,
                clipPath: 'polygon(0 30%, 0 0, 100% 100%, 70% 100%)',
              }}
            ></div>
            <div
              className={'absolute bottom-0 left-30 h-2 w-[calc(100%-220px)]'}
              style={{ backgroundColor: color }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
