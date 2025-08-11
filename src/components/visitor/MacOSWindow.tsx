'use client';

import React, { useState } from 'react';

interface MacOSWindowProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  width?: string;
  height?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

export const MacOSWindow: React.FC<MacOSWindowProps> = ({
  title = 'Untitled',
  children,
  className = '',
  onClose,
  onMinimize,
  onMaximize,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-[#333333] dark:bg-[#333333] ${className}`}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3 select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Traffic Light Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onClose}
            className={`h-3 w-3 rounded-full bg-red-500 transition-all duration-200 hover:bg-red-600 ${
              isHovered ? 'shadow-sm' : ''
            }`}
            title="Close"
          >
            {isHovered && (
              <div className="flex h-full w-full items-center justify-center">
                <svg width="6" height="6" viewBox="0 0 6 6" className="text-red-800">
                  <path
                    d="M1 1l4 4M5 1L1 5"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
          </button>
          <button
            onClick={onMinimize}
            className={`h-3 w-3 rounded-full bg-yellow-500 transition-all duration-200 hover:bg-yellow-600 ${
              isHovered ? 'shadow-sm' : ''
            }`}
            title="Minimize"
          >
            {isHovered && (
              <div className="flex h-full w-full items-center justify-center">
                <svg width="6" height="2" viewBox="0 0 6 2" className="text-yellow-800">
                  <path d="M1 1h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
            )}
          </button>
          <button
            onClick={onMaximize}
            className={`h-3 w-3 rounded-full bg-green-500 transition-all duration-200 hover:bg-green-600 ${
              isHovered ? 'shadow-sm' : ''
            }`}
            title="Maximize"
          >
            {isHovered && (
              <div className="flex h-full w-full items-center justify-center">
                <svg width="6" height="6" viewBox="0 0 6 6" className="text-green-800">
                  <path
                    d="M1 3l1.5 1.5L5 1.5"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
            )}
          </button>
        </div>

        {/* Window Title */}
        <div className="font-figtree transform text-sm font-bold text-gray-700">{title}</div>

        {/* Right side spacer for balance */}
        <div className="w-16"></div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-white dark:bg-[#333333]">{children}</div>
    </div>
  );
};
