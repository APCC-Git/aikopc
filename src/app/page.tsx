import Image from 'next/image';
import SmoothScroll from '@/features/common/SmoothScroll';
import Header from '@/components/HeaderSvg';
import Footer from '@/components/Footer';
import Window from '@/components/Window';
import WindowSvg from '@/components/WindowSvgTest';

export default function Home() {
  const bg = 'black';

  return (
    <div className={''} style={{ backgroundColor: bg }}>
      <Header rainbow={false} singleColor={'#000000'} bg={bg} color={'white'} textColor={'white'} />
      <WindowSvg></WindowSvg>
      <WindowSvg></WindowSvg>
      <Footer></Footer>
    </div>
  );
}

// メタデータ
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'パソコン部' };
