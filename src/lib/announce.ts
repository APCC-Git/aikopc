'use client';

import { useEffect } from 'react';

export const announce = () => {
  useEffect(() => {
    console.log(
      'このサイトが何でできてるか気になった君！Githubでソースを公開してるからぜひ見てくれ！\nhttps://github.com/APCC-Git/aikopc'
    );
  }, []);
};
