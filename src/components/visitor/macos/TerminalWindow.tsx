'use client';

import React, { useEffect, useState, useRef } from 'react';
import './style/TerminalWindow.css';
import './style/style.css';

export default function TerminalWindow({
  title,
  children,
  className = '',
  padding = 'p-6',
  showCurrentTime = false,
  activeOnFocus = false,
  threshold = 0.2,
  rootMargin = '-40% 0px -40% 0px',
  ...props
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  padding?: string;
  showCurrentTime?: boolean;
  activeOnFocus?: boolean;
  threshold?: number;
  rootMargin?: string;
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const ref = useRef<HTMLDivElement>(null);
  const [isInCenter, setIsInCenter] = useState(false);

  useEffect(() => {
    if (!showCurrentTime) return;
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [showCurrentTime]);

  useEffect(() => {
    const target = ref.current;
    if (!target || !activeOnFocus) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isInCenter) {
            setIsInCenter(true);
            target.classList.add('active');
          } else if (!entry.isIntersecting && isInCenter) {
            setIsInCenter(false);
            target.classList.remove('active');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [activeOnFocus, isInCenter, rootMargin, threshold]);

  return (
    <div
      className={`terminal-window group border-macos-window-border-inactive hover:border-macos-window-border flex flex-col rounded-lg border-1 shadow-2xs transition-all hover:shadow-xl ${className}`}
      ref={ref}
      {...props}
    >
      <div className={'flex h-full w-full flex-col'}>
        <div className="title-bar bg-macos-titlebar-inactive group-hover:bg-macos-titlebar flex items-center justify-between rounded-t-lg px-4 py-2 transition-colors">
          <div className={'flex items-center space-x-2'}>
            <div className="close group bg-macos-actionbutton-inactive group-hover:bg-macos-close h-3 w-3 rounded-full transition-colors"></div>
            <div className="minimize group bg-macos-actionbutton-inactive group-hover:bg-macos-minimize h-3 w-3 rounded-full transition-colors"></div>
            <div className="zoom group bg-macos-actionbutton-inactive group-hover:bg-macos-zoom h-3 w-3 rounded-full transition-colors"></div>
            <span className="text-macos-title-text-inactive group-hover:text-macos-title-text ml-4 font-mono text-sm transition-colors">
              {title}
            </span>
          </div>
          {showCurrentTime && (
            <div suppressHydrationWarning className="text-terminal-gray font-mono text-sm">
              {currentTime.toLocaleTimeString('ja-JP')}
            </div>
          )}
        </div>
        <div
          className={`bg-terminal-background h-[calc(100%-36px)] rounded-b-lg text-white ${padding}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
