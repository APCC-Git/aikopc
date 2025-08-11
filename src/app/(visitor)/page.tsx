import { Top } from './_components/Top';
import { About } from './_components/About';
import { Activity } from './_components/Activity';
import { Members } from './_components/Members';

export default function Home() {
  return (
    <div className={'min-h-[100dvh] w-full overflow-x-hidden transition-colors'}>
      <Top />
      <About />
      <Activity />
      {/*<Members />*/}
    </div>
  );
}

// メタデータ
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Aikopc.net' };
