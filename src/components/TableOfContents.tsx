'use client';

import { useEffect } from 'react';
import tocbot from 'tocbot';

export function TableOfContents() {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.js-toc',
      contentSelector: '.prose',
      headingSelector: 'h1, h2, h3',
      hasInnerContainers: true,
      collapseDepth: 6,
      headingsOffset: 100,
      tocScrollOffset: 100,
      scrollSmoothOffset: 170,
    });

    return () => tocbot.destroy();
  }, []);

  return null;
}
