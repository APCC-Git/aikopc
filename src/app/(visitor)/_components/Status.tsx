import ScrollVelocity from '@/components/bits/ScrollVelocity';
import React from 'react';

export function Status() {
  return (
    <div id={'status'} className={'w-full flex flex-col items-center space-y-8 lg:p-8 '}>
      {/*横に流れるテキスト*/}
      <ScrollVelocity
        texts={['20+ Members', '10+ Projects']}
        velocity={80}
        className="custom-scroll-text font-figtree font-black mb-2"
      />
    </div>
  );
}
