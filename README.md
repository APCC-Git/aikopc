# AikoPC.net

> **開発中**  
> アイデアは [ここ](#アイデア)

誰かNext書けるようになってや(´;ω;｀)

## Getting Started
```shell
npm install
npm run dev
```

## ホスト
Cloudflare Pagesにホストする予定

## ディレクトリ構成
```
├── app          ... ルーティングに関するコンポーネント
├── features     ... ロジック + コンポーネントをまとめたもの
│   ├── common   ... 共通部分
│   └── routes   ... 特定のページで使うもの
├── components   ... ロジックがない共通コンポーンネント
├── hooks        ... 共通ロジックの内、React Hooksが「ある」もの
├── utils        ... 共通ロジックの内、React Hooksが「ない」もの
└── constants    ... 定数を定義したファイル
```
 - `app`内では`'use client'`を使わない  
 - 詳しくは[ここ](https://qiita.com/miumi/items/359b8a77bbb6f9666950)

## アイデア
- gsap
- three.js (R3F)