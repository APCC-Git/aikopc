'use client';
import React, { useEffect, useRef, useState } from 'react';

export const Tabs = ({
  items,
  activeItem,
  onTabClick,
}: {
  items: string[];
  activeItem: string;
  onTabClick: (item: string) => void;
}) => {
  const tabsRef = useRef<HTMLDivElement>(null); // タブコンテナの参照
  const [highlightStyle, setHighlightStyle] = useState({}); // ハイライトのスタイル状態

  useEffect(() => {
    if (tabsRef.current) {
      // 現在アクティブなタブ要素を見つける
      // activeTabではなくactiveItemを使用するように修正
      const activeTabElement = tabsRef.current.querySelector(`[data-tab-name="${activeItem}"]`);

      if (activeTabElement) {
        // アクティブなタブ要素のoffsetLeftとoffsetWidthを取得
        const left = activeTabElement.clientLeft;
        const width = activeTabElement.clientWidth;

        // ハイライトのスタイルを設定
        setHighlightStyle({
          left: `${left}px`,
          width: `${width}px`,
          opacity: 1, // ハイライトを表示
        });
      }
    }
  }, [activeItem, items]); // activeTabではなくactiveItemを依存配列に追加

  return (
    <div
      ref={tabsRef}
      className="relative flex overflow-hidden rounded-full bg-white p-1 shadow-md"
    >
      {/* スライドするハイライト要素 */}
      <div
        className="absolute top-1 bottom-1 rounded-full bg-gray-200 shadow transition-all duration-300 ease-in-out"
        style={highlightStyle}
      ></div>

      {items.map(item => (
        <button
          key={item}
          data-tab-name={item} // ハイライトの位置計算のためにカスタムデータ属性を追加
          // 現在選択されているタブに応じてスタイルを適用
          className={`relative z-10 flex-1 rounded-full px-4 py-2 text-center text-sm font-medium transition-colors duration-300 ease-in-out ${
            activeItem === item // activeTabではなくactiveItemを使用するように修正
              ? 'text-gray-800' // アクティブなタブのテキスト色
              : 'text-gray-600 hover:text-gray-900' // 非アクティブなタブのテキスト色
          } `}
          onClick={() => onTabClick(item)} // クリック時にアクティブなタブを更新
        >
          {item}
        </button>
      ))}
    </div>
  );
};
