import Image from 'next/image';
import SmoothScroll from '@/features/common/SmoothScroll';
import Scene from '@/components/Scene';

export default function Home() {
  return (
    <SmoothScroll>
      <div className="h-full flex flex-col overflow-auto">
        <div className="text-8xl p-4 font-work">
          <p>
            Blackbird singing in the dead of <span>night</span>
            <br />
            Take these broken <span>wings</span> and learn to fly
            <br />
            All your life
            <br />
            You were only <span>waiting</span> for this moment to arise
            <br />
            Blackbird <span>singing</span> in the dead of night
            <br />
            Take these sunken eyes and <span>learn</span> to see
            <br />
            All your life
            <br />
            You were only waiting for this <span>moment</span> to be free
            <br />
            Blackbird fly, blackbird fly
            <br />
            Into the light of a <span>dark</span> black night
            <br />
            Blackbird fly, blackbird fly
            <br />
            Into the light of a dark <span>black</span> night
            <br />
            Blackbird <span>singing</span> in the dead of night
            <br />
            Take these broken wings and <span>learn</span> to fly
            <br />
            All your life
            <br />
            You were only <span>waiting</span> for this moment to arise
            <br />
            You were only waiting for this <span>moment</span> to arise
            <br />
            You were only waiting for this moment to <span>arise</span>
            <br />
          </p>
        </div>
      </div>
    </SmoothScroll>
  );
}

{
  /* メタデータ */
}
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'パソコン部' };
