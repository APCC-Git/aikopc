//TIPS: dynamic importで使用することを推奨

'use client';

import { useEffect, useRef } from 'react';

const TwitterFeed = ({ className = '' }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;

    // バナーの削除
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            if (element.nodeName === 'A') {
              containerRef.current?.removeChild(element);
            }
          }
        });
      });
    });

    observer.observe(containerRef.current, { childList: true });

    return () => observer.disconnect();
  }, []);
  return (
    <div className={className}>
      <script
        src="https://static.elfsight.com/platform/platform.js"
        async
        suppressHydrationWarning
      ></script>
      <div
        ref={containerRef}
        className="elfsight-app-9f30d950-e712-4c7e-8296-62fc5acf59c3"
        data-elfsight-app-lazy={true}
        suppressHydrationWarning
      ></div>
    </div>
  );
};

export default TwitterFeed;
