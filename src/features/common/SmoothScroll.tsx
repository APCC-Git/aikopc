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
        smooth: 1.5,
        effects: true,
      });
    }
  }, []);

  return (
    <div ref={wrapper} id="smooth-wrapper" className="h-full overflow-hidden min-h-screen">
      <div ref={content} id="smooth-content">
        {props.children}
      </div>
    </div>
  );
}
