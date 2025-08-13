'use client';

import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import Lenis from 'lenis';

const useSmoothScroll = () => {
  const [lenis, setLenis] = useState<Lenis | null>();
  const reqIdRef = useRef<ReturnType<typeof requestAnimationFrame>>(null);

  useEffect(() => {
    const animate = (time: DOMHighResTimeStamp) => {
      lenis?.raf(time);
      reqIdRef.current = requestAnimationFrame(animate);
    };
    reqIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqIdRef.current as number);
  }, [lenis]);

  useLayoutEffect(() => {
    // インスタンスを生成
    const lenis = new Lenis({
      duration: 1.2, // アニメーションの継続時間
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 特定の値の変化率を指定
      touchMultiplier: 2,
    });
    setLenis(lenis);

    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);
};

export default useSmoothScroll;
