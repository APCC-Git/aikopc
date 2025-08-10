//SVGと同サイズのdiv要素

'use client';

import { SvgProps } from '@/types/SvgProps';
import { useSVG } from '@/hooks/useSVG';

interface Props extends SvgProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const EmptyBox = ({ scale = 1, className = '', children }: Props) => {
  const { baseSize } = useSVG();
  const size = baseSize * scale;
  return (
    <div className={className} style={{ height: size, width: size }}>
      {children}
    </div>
  );
};
