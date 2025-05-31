import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import KeenCarousel from '@/components/ui/KeenCarousel';
import { CarouselPlugin } from '@/components/Carousel';
import { SiGithub, SiX } from '@icons-pack/react-simple-icons';

const slidesData = [
  {
    content: (
      <Image
        src="/images/sample1.jpg"
        fill
        className="object-cover bg-[rgb(199 199 199)]"
        alt="Placeholder Image"
      />
    ),
  },
  {
    content: (
      <Image
        src="/images/sample2.jpg"
        fill
        className="object-cover bg-[rgb(199 199 199)]"
        alt="Placeholder Image"
      />
    ),
  },
  {
    content: (
      <Image
        src="/images/sample3.jpg"
        fill
        className="object-cover bg-[rgb(199 199 199)]"
        alt="Placeholder Image"
      />
    ),
  },
];

export default function Home() {
  return (
    <div className={'w-full min-h-[calc(100vh-90px)] p-4 lg:p-10 block lg:flex'}>
      <div className={'mb-5 lg:mr-10 xl:mr-20 p-4 text-center lg:text-left'}>
        <div className={'text-6xl 2xl:text-8xl font-bold'}>Aikopc.net</div>
        <div className={'text-md 2xl:text-3xl mt-4'}>愛光学園パソコン部のホームページ</div>
        <div className={'mt-6 w-full flex justify-center lg:justify-start'}>
          <Link href="/about">
            <Button className="rounded-full inline-block 2xl:text-xl 2xl:h-12">活動について</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" className="rounded-full ml-3 2xl:text-xl 2xl:h-12">
              部員ログイン
            </Button>
          </Link>
        </div>
        <div className="mt-4 md:mt-8 flex justify-center lg:justify-start space-x-8">
          <Link href="https://github.com/APCC-Git" target="_blank" rel="noopener noreferrer">
            <SiGithub size={24} />
          </Link>
          <Link href="https://x.com/APCC_" target="_blank" rel="noopener noreferrer">
            <SiX className={'w-full h-full'} size={24} />
          </Link>
        </div>
      </div>
      <div
        className={
          'w-full min-h-[500px] rounded-2xl bg-[rgb(170 170 170)] overflow-hidden shadow-lg'
        }
      >
        <KeenCarousel
          slides={slidesData}
          loop={true}
          slidesPerView={1}
          spacing={20}
          autoplayInterval={3000} // 3秒ごとに自動再生
          className={'w-full h-full min-h-[500px] bg-[rgb(170 170 170)] rounded-2xl'}
        />
      </div>
    </div>
  );
}

// メタデータ
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Aikopc.net' };
