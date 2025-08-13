'use client';
import { useTheme } from 'next-themes';
import { useResponsive } from './useResponsive';
import { useState, useEffect } from 'react';

export const useSVG = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const breakpoint = useResponsive();

  useEffect(() => {
    setMounted(true);
  }, []);

  // マウント前はテーマ判定しない
  const isDark = mounted ? (theme === 'system' ? systemTheme : theme) === 'dark' : false;

  const baseSize =
    breakpoint === 'base'
      ? 270
      : breakpoint === 'sm'
        ? 300
        : breakpoint === 'md'
          ? 330
          : breakpoint === 'lg'
            ? 360
            : breakpoint === 'xl'
              ? 400
              : 500;

  const svgColor = isDark ? '#a3ff00' : '#ffbb32';

  return {
    svgColor,
    baseSize,
  };
};
