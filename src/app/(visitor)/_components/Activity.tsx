import ScrollFloat from '@/components/bits/ScrollFloat';

export const Activity = () => {
  return (
    <div
      id={'activity'}
      className={'min-h-screen w-full flex flex-col items-center space-y-8 p-8 pt-0'}
    >
      <ScrollFloat
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="top bottom+=20%"
        scrollEnd="bottom bottom-=80%"
        stagger={0.03}
        textClassName="font-figtree text-center text-6xl font-black md:text-8xl 2xl:text-9xl"
      >
        Activity
      </ScrollFloat>
    </div>
  );
};
