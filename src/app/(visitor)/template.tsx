'use client';

import React from 'react';
import useSmoothScroll from '@/hooks/useSmoothScroll';

export default function Template({ children }: { children: React.ReactNode }) {
  useSmoothScroll();
  return children;
}
