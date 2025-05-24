'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Settings2, Laptop } from 'lucide-react';

export default function ModeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    // ローカルストレージからテーマ設定を読み込む
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    if (
      newTheme === 'dark' ||
      (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <div className={` flex items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2 bg-secondary dark:bg-secondary p-1 rounded-full">
        <button
          onClick={() => toggleTheme('light')}
          className={`p-2 rounded-full transition-colors ${
            theme === 'light' ? 'bg-card shadow-md' : 'hover:bg-purple-200 dark:hover:bg-purple-800'
          }`}
          title="ライトモード"
        >
          <Sun size={20} />
        </button>
        <button
          onClick={() => toggleTheme('dark')}
          className={`p-2 rounded-full transition-colors ${
            theme === 'dark' ? 'bg-card shadow-md' : 'hover:bg-purple-200 dark:hover:bg-purple-800'
          }`}
          title="ダークモード"
        >
          <Moon size={20} />
        </button>
        <button
          onClick={() => toggleTheme('system')}
          className={`p-2 rounded-full transition-colors ${
            theme === 'system'
              ? 'bg-card shadow-md'
              : 'hover:bg-purple-200 dark:hover:bg-purple-800'
          }`}
          title="システム設定に従う"
        >
          <Laptop size={20} />
        </button>
      </div>
    </div>
  );
}
