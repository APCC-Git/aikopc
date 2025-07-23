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
      className={`terminal-window flex flex-col rounded-lg shadow-2xs hover:shadow-xl group transition-all border-1 border-macos-window-border-inactive hover:border-macos-window-border ${className}`}
      ref={ref}
      {...props}
    >
      <div className={'h-full w-full flex flex-col'}>
        <div className="title-bar bg-macos-titlebar-inactive group-hover:bg-macos-titlebar rounded-t-lg px-4 py-2 flex items-center justify-between transition-colors ">
          <div className={'flex items-center space-x-2'}>
            <div className="close w-3 h-3 rounded-full group bg-macos-actionbutton-inactive group-hover:bg-macos-close transition-colors"></div>
            <div className="minimize w-3 h-3 rounded-full group bg-macos-actionbutton-inactive group-hover:bg-macos-minimize transition-colors"></div>
            <div className="zoom w-3 h-3 rounded-full group bg-macos-actionbutton-inactive group-hover:bg-macos-zoom transition-colors"></div>
            <span className="text-macos-title-text-inactive group-hover:text-macos-title-text ml-4 text-sm font-mono transition-colors">
              {title}
            </span>
          </div>
          {showCurrentTime && (
            <div suppressHydrationWarning className="text-terminal-gray text-sm font-mono">
              {currentTime.toLocaleTimeString('ja-JP')}
            </div>
          )}
        </div>
        <div
          className={`bg-terminal-background rounded-b-lg h-[calc(100%-36px)] text-white ${padding}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
