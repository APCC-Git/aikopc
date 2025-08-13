'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const tabsRef = useRef<HTMLDivElement>(null); // タブコンテナの参照
  const [highlightStyle, setHighlightStyle] = useState({}); // ハイライトのスタイル状態
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (tabsRef.current) {
      const activeTabElement = tabsRef.current.querySelector(
        `[data-tab-name="${theme}"]`
      ) as HTMLElement;

      if (activeTabElement) {
        const left = activeTabElement.offsetLeft;
        const width = activeTabElement.offsetWidth;

        setHighlightStyle({
          left: `${left}px`,
          width: `${width}px`,
          opacity: 1,
        });
      }
    }
  }, [theme]);

  const toggleTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div
        className={
          'bg-secondary dark:bg-secondary relative flex items-center gap-2 rounded-full p-1'
        }
        ref={tabsRef}
      >
        <div
          className="bg-accent-primary-200 dark:bg-accent-primary-600 absolute top-1 bottom-1 z-10 rounded-full shadow transition-all duration-300 ease-in-out hover:bg-slate-300 dark:hover:bg-slate-700"
          style={highlightStyle}
        ></div>
        <button
          onClick={() => toggleTheme('light')}
          data-tab-name={'light'}
          className={'z-20 rounded-full p-2 transition-colors'}
          title="ライトモード"
        >
          <Sun size={20} />
        </button>
        <button
          onClick={() => toggleTheme('dark')}
          data-tab-name={'dark'}
          className={'z-20 rounded-full p-2 transition-colors'}
          title="ダークモード"
        >
          <Moon size={20} />
        </button>
        <button
          onClick={() => toggleTheme('system')}
          data-tab-name={'system'}
          className={'z-20 rounded-full p-2 transition-colors'}
          title="システム設定に従う"
        >
          <Laptop size={20} />
        </button>
      </div>
    </div>
  );
}
