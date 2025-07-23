// /features/common/SmoothScroll.tsx
// スムーズスクロール用コンポーネント
// https://gsap.com/docs/v3/Plugins/ScrollSmoother/
// parallaxも実装可能
// https://codepen.io/GreenSock/pen/jOjMQjr

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScroll(props: any) {
  const wrapper = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      ScrollSmoother.create({
        wrapper: wrapper.current!,
        content: content.current!,
        smooth: 1.0,
        effects: true,
        normalizeScroll: true,
      });
    }
  }, []);

  return (
    <div ref={wrapper} id="smooth-wrapper" className="h-full min-h-screen overflow-hidden">
      <div ref={content} id="smooth-content" className={props.className} style={props.style}>
        {props.children}
      </div>
    </div>
  );
}
