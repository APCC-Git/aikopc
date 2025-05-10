import Image from 'next/image';
import SmoothScroll from '@/features/common/SmoothScroll';
import Header from '@/components/cyber/HeaderOutline';
import Footer from '@/components/cyber/Footer';
import Window from '@/components/cyber/Window';
import WindowSvg from '@/components/cyber/WindowSvg';

export default function Home() {
  const bg = 'black';

  return (
    <div className={''} style={{ backgroundColor: bg }}>
      <Header rainbow={true} singleColor={'orange'} bg={bg} color={'white'} textColor={'white'} />
      <WindowSvg>
        <div className={'w-full h-full p-2'}>
          <div className={'text-5xl text-white font-bold mt-5'}>愛光学園パソコン部</div>
        </div>
      </WindowSvg>
    </div>
  );
}

// メタデータ
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'パソコン部' };
