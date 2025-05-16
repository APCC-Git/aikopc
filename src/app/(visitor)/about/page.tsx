import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className={'w-full p-4 md:p-10'}>
      <div className={'text-6xl 2xl:text-8xl font-bold mb-8'}>About</div>

      {/* 活動内容セクション */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">活動内容</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-lg">
              愛光学園パソコン部では、競技プログラミングやWebデザイン、ゲーム制作、自作PCなど、
              幅広い分野でのIT技術の習得と実践を行っています。
            </p>
            <p className="text-lg">
              初心者から経験者まで、それぞれのレベルに合わせた活動を通じて、
              技術力の向上とクリエイティブな思考力の育成を目指しています。
            </p>
          </div>
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <Image src="/images/sample1.jpg" alt="活動の様子" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* 活動環境セクション */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">活動環境</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-100 rounded-lg">
            <h3 className="text-xl font-bold mb-2">充実した機材</h3>
            <p>一人一台PCと開発環境を完備し、快適な開発作業が可能です。</p>
          </div>
          <div className="p-6 bg-slate-100 rounded-lg">
            <h3 className="text-xl font-bold mb-2">技術サポート</h3>
            <p>先輩部員による丁寧な指導体制、プログラミング講座を整えています。</p>
          </div>
          <div className="p-6 bg-slate-100 rounded-lg">
            <h3 className="text-xl font-bold mb-2">プロジェクト活動</h3>
            <p>実践的なプロジェクトを通じて、チーム開発の経験を積めます。</p>
          </div>
        </div>
      </section>

      {/* 入部案内セクション */}
      <section>
        <h2 className="text-3xl font-bold mb-4">入部案内</h2>
        <div className="bg-slate-100 p-6 rounded-lg">
          <p className="text-lg mb-4">
            パソコン部では随時、新入部員を募集しています。
            プログラミングの経験がない方も大歓迎です。
          </p>
          <Link href="/contact">
            <Button className="text-lg">お問い合わせ</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

// メタデータ
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'About | パソコン部' };
