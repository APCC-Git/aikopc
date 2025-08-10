import { useState, useEffect } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQueryList = window.matchMedia(query);

    const updateMatch = () => setMatches(mediaQueryList.matches);

    // 初期実行
    updateMatch();

    // イベント登録（両方）
    mediaQueryList.addEventListener('change', updateMatch);
    window.addEventListener('resize', updateMatch);

    // クリーンアップ
    return () => {
      mediaQueryList.removeEventListener('change', updateMatch);
      window.removeEventListener('resize', updateMatch);
    };
  }, [query]);

  return matches;
}
