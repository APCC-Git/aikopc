import ScrollFloat from '@/components/bits/ScrollFloat';

export const JoinUs = () => {
  return (
    <div id={'joinUs'} className={'flex w-full h-[40vh] flex-col items-center pb-8 pt-0'}>
      <ScrollFloat
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="top bottom+=50%"
        scrollEnd="bottom bottom-=30%"
        stagger={0.03}
        textClassName="font-figtree text-center text-6xl font-black md:text-8xl 2xl:text-9xl px-8 lg:pb-8"
      >
        Join Us!
      </ScrollFloat>
      <div className={'text-center font-noto md:text-xl 2xl:text-2xl px-5'}>
        パソコン部では随時、新入部員を募集しています。 プログラミングの経験がない方も大歓迎です。
        <br />
        愛光学園パソコン部で一緒に未来を切り開きましょう！
      </div>
    </div>
  );
};
