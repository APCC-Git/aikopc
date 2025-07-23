'use client';

import React, { useState, useEffect, useRef } from 'react';
import TerminalWindow from '../../TerminalWindow';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark, a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from '@/components/common/ThemeProvider';
import { codes } from './codes';

const CodeAnimation: React.FC = () => {
  const [displayedCode, setDisplayedCode] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const codeIndex = Math.floor(Math.random() * codes.length);

  const CODE = codes[codeIndex].code;
  const TITLE = codes[codeIndex].title;
  const LANG = codes[codeIndex].lang;

  const { isDark } = useTheme();

  const startAnimation = () => {
    setIsAnimating(true);
    setDisplayedCode('');
    setCurrentIndex(0);

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        if (nextIndex <= CODE.length) {
          setDisplayedCode(CODE.slice(0, nextIndex));
          return nextIndex;
        } else {
          setIsAnimating(false);
          return prevIndex;
        }
      });
    }, 20); // 20ms間隔でタイピング効果
  };

  // 自動スクロール機能
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedCode]);

  // コンポーネントマウント時にアニメーション開始
  useEffect(() => {
    startAnimation();
  }, []);

  // カーソルの点滅効果
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <TerminalWindow title={'Coding'} className={'h-full w-full'} activeOnFocus padding={'p-0'}>
      <style jsx>{`
        div::-webkit-scrollbar,
        pre::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div ref={scrollRef} className={'h-full overflow-x-hidden overflow-y-auto'}>
        <div
          className="rounded-lg p-0"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex items-start">
            <SyntaxHighlighter
              showLineNumbers
              language={LANG}
              style={isDark ? a11yDark : a11yLight}
              customStyle={{ background: 'transparent', scrollbarWidth: 'none' }}
            >
              {displayedCode}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </TerminalWindow>
  );
};

export default CodeAnimation;
