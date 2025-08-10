'use client';

import { useTheme } from './useTheme';
import { useResponsive } from './useResponsive';

export const useSVG = () => {
  const { isDark } = useTheme();
  const breakpoint = useResponsive();

  // 画面サイズに応じたSVGのベースサイズ
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

  // SVGのライトモード/ダークモードに応じたデフォルトカラー
  const svgColor = isDark ? '#a3ff00' : '#ffbb32';
  return {
    svgColor,
    baseSize,
  };
};
