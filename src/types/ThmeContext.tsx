'use client';

import React, { createContext } from 'react';

export type Theme = 'dark' | 'light' | 'system';

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
};

export const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  isDark: false,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
