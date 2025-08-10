'use client';

import { useState, useEffect } from 'react';

export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('lg');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const getBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1536) return '2xl';
      if (width >= 1280) return 'xl';
      if (width >= 1024) return 'lg';
      if (width >= 768) return 'md';
      if (width >= 640) return 'sm';
      return 'base'; // Tailwindでsm未満
    };

    const update = () => {
      setBreakpoint(getBreakpoint());
      if (window.innerWidth < 768) setIsMobile(true);
    };

    // 初回実行
    update();

    // リサイズ時に更新
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return breakpoint;
}
