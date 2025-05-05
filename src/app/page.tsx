import Image from 'next/image';
import SmoothScroll from '@/features/common/SmoothScroll';
import Header from '@/components/HeaderOutline';
import Window from '@/components/Window';
import WindowSvg from '@/components/WindowSvgTest';

export default function Home() {
  const bg = 'black';

  return (
    <div className={'min-h-screen'} style={{ backgroundColor: bg }}>
      <div className={'w-full h-full fixed flex items-center z-0'}>
        <div className={'w-full h-1/2 flex'}></div>
      </div>
      <Header rainbow={true} singleColor={'orange'} bg={bg} color={'white'} textColor={'white'} />
      <WindowSvg></WindowSvg>
      <WindowSvg></WindowSvg>
      <div className={'h-20 w-full mt-20'}></div>
    </div>
  );
}

// メタデータ
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'パソコン部' };
