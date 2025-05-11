import Link from "next/link";
import Image from "next/image";
import { Header } from '@/components/ui/header';
import { Button } from "@/components/ui/button";
import Carousel from "@/components/ui/carousel"

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
    <div className={"w-full p-4 md:p-10 block md:flex"}>
      <div className={"mb-5 md:mr-10 p-4 text-center md:text-left"}>
        <div className={"text-6xl font-bold"}>Aikopc.net</div>
        <div className={"text-md mt-4"}>愛光学園パソコン部のホームページ</div>
        <div className={"mt-6 w-full flex justify-center md:justify-start"}>
          <Link href="/about">
            <Button className="inline-block">活動について</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" className="inline-block ml-3">部員ログイン</Button>
          </Link>
        </div>
      </div>
      <div className={"w-full min-h-[500px] rounded-lg bg-[rgb(170 170 170)] overflow-hidden"} style={{boxShadow: "rgb(199 199 199) 0px 0px 20px 5px"}}>
        <Carousel
          slides={slidesData}
          loop={true}
          slidesPerView={1}
          spacing={20}
          autoplayInterval={3000} // 3秒ごとに自動再生
          className={"w-full h-[500px] bg-[rgb(170 170 170)]"}
        />
      </div>
    </div>
  );
}

// メタデータ
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Aikopc.net' };
