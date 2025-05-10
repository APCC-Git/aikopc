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
    <div className={'w-full h-180 p-8'}>
      <div className={'w-full h-full relative'} style={{ backgroundColor: color }}>
        {/*マスク*/}
        <div className={'w-full h-full absolute'} id={'mask'}>
          {/*上*/}
          <div className={'w-full h-20 absolute'} style={{ backgroundColor: bg }}>
            <div className={'w-1/5 h-40 right-0 absolute'} style={{ backgroundColor: bg }}></div>
          </div>
          {/*左*/}
          <div className={'h-full w-10 absolute'} style={{ backgroundColor: bg }}>
            <div
              className={'h-30 w-30 absolute bottom-0 left-10'}
              style={{ backgroundColor: bg, clipPath: 'polygon(0 0, 0% 100%, 100% 100%)' }}
            ></div>
            <div className={'h-60 w-20 absolute'} style={{ backgroundColor: bg }}></div>
            <div
              className={'h-20 w-20 absolute top-60 left-0'}
              style={{ backgroundColor: bg, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)' }}
            ></div>
          </div>
          {/*右*/}
          <div className={'h-full w-10 absolute right-0'} style={{ backgroundColor: bg }}>
            <div
              className={'w-30 h-30 right-0 bottom-0 absolute z-40'}
              style={{ backgroundColor: bg, clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }}
            ></div>
          </div>
          {/*下*/}
          <div className={'w-full h-10 bottom-0 absolute'} style={{ backgroundColor: bg }}></div>
        </div>
        {/*装飾*/}
        <div className={'w-full h-full absolute'} id={'deco'}>
          {/*上*/}
          <div className={'w-full h-20 absolute flex'}>
            <div className={'w-4/5 h-full flex flex-col'}>
              {/*上一段目*/}
              <div className={'w-full h-6 relative'}>
                <div
                  className={'w-12 h-6 absolute right-24'}
                  style={{
                    backgroundColor: color,
                    clipPath: 'polygon(0 0, 50% 0, 100% 100%, 0% 100%)',
                  }}
                ></div>
                <div
                  className={'w-[calc(50%-136px)] h-6 absolute right-30'}
                  style={{
                    backgroundColor: color,
                  }}
                ></div>
                <div
                  className={'w-12 h-6 absolute right-[calc(50%-40px)]'}
                  style={{
                    backgroundColor: color,
                    clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0% 100%)',
                  }}
                ></div>
              </div>
              {/*上二段目*/}
              <div className={'w-full h-6 relative'}>
                <div
                  className={'w-12 h-6 absolute left-14'}
                  style={{
                    backgroundColor: color,
                    clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0% 100%)',
                  }}
                ></div>
                <div
                  className={'w-[calc(100%-200px)] h-6 absolute left-20'}
                  style={{
                    backgroundColor: color,
                  }}
                ></div>
                <div
                  className={'w-12 h-6 absolute right-24'}
                  style={{
                    backgroundColor: color,
                    clipPath: 'polygon(0% 0, 100% 0, 50% 100%, 0% 100%)',
                  }}
                ></div>
              </div>
              {/*上三段目*/}
              <div className={'w-full h-8 relative'}>
                <div
                  className={'w-20 h-14 absolute right-0 bottom-0'}
                  style={{ backgroundColor: color }}
                ></div>
                <div
                  className={'w-28 h-14 absolute right-6 bottom-0'}
                  style={{
                    backgroundColor: color,
                    clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0% 100%)',
                  }}
                ></div>
                <div
                  className={'w-[50%] h-6 absolute right-0 bottom-0'}
                  style={{ backgroundColor: color }}
                ></div>
                <div
                  className={'w-12 h-6 absolute right-[calc(50%-24px)] bottom-0'}
                  style={{
                    backgroundColor: color,
                    clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0% 100%)',
                  }}
                ></div>
                <div
                  className={'w-12 h-6 absolute right-[calc(50%+8px)] top-0'}
                  style={{
                    backgroundColor: color,
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%, 0% 100%)',
                  }}
                ></div>
                <div
                  className={'w-[calc(50%-112px)] h-6 absolute right-[calc(50%+32px)]'}
                  style={{ backgroundColor: color }}
                ></div>
                <div
                  className={'w-12 h-6 absolute left-14 top-0'}
                  style={{
                    backgroundColor: color,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 100%)',
                  }}
                ></div>
              </div>
            </div>
            <div className={'w-1/5 h-40 relative'}>
              <div
                className={
                  'w-[calc(100%-36px)] h-[calc(100%-26px)] absolute top-[10px] right-[20px] p-[3px]'
                }
                style={{
                  backgroundColor: color,
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 65px 100%, 0 calc(100% - 65px))',
                }}
              >
                <div
                  className={'w-full h-full'}
                  style={{
                    backgroundColor: bg,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 65px 100%, 0 calc(100% - 65px))',
                  }}
                >
                  <div
                    className={'w-[calc(100%-60px)] h-[calc(100%-40px)] absolute right-0'}
                    style={{
                      backgroundColor: color,
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 60px 100%, 0 calc(100% - 60px))',
                    }}
                  >
                    <div
                      className={'font-Saiba text-7xl absolute right-1 top-1'}
                      style={{ color: textColor }}
                    >
                      001
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={'w-[30%] aspect-square max-w-20 absolute -bottom-[1px] -left-[1px]'}
                style={{ backgroundColor: color, clipPath: 'polygon(0 0, 0% 100%, 100% 100%)' }}
              ></div>
            </div>
          </div>
          {/*右*/}
          <div className={'w-20 h-full absolute flex'}>
            <div className={'w-10 h-full relative'}>
              <div
                className={'w-10 h-20 absolute top-16'}
                style={{
                  backgroundColor: color,
                  clipPath: 'polygon(0 50%, 100% 0, 100% 100%, 0% 100%)',
                }}
              ></div>
              <div className={'w-10 h-30 absolute top-26'} style={{ backgroundColor: color }}></div>
              <div
                className={'w-10 h-20 absolute top-46'}
                style={{
                  backgroundColor: color,
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)',
                }}
              ></div>
            </div>
            <div className={'w-10 h-full relative'}>
              <div
                className={'w-4 h-8 absolute top-16'}
                style={{
                  backgroundColor: color,
                  clipPath: 'polygon(0 0, 100% 50%, 100% 100%, 0 100%)',
                }}
              ></div>
              <div className={'w-4 h-40 absolute top-20'} style={{ backgroundColor: color }}></div>
              <div
                className={'w-4 h-8 absolute top-58'}
                style={{
                  backgroundColor: color,
                  clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)',
                }}
              ></div>
            </div>
          </div>
          {/*下*/}
          <div className={'w-full h-10 absolute bottom-0'}>
            <div
              className={'w-[110px] h-[110px] absolute bottom-0 left-10'}
              style={{
                backgroundColor: color,
                clipPath: 'polygon(0 30%, 0 0, 100% 100%, 70% 100%)',
              }}
            ></div>
            <div
              className={'w-[calc(100%-220px)] h-2 absolute bottom-0 left-30'}
              style={{ backgroundColor: color }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
